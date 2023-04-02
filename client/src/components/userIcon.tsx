import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { AiOutlineUser, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import Token from "@/utils/token";
import UserAvatar from "./userAvatar";
import appRoutes from "@/appRoutes";
import { AiFillCrown } from "react-icons/ai";
import { Role } from "@/types/user";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/router";

import en from "@/locales/en/translation";
import ua from "@/locales/ua/translation";

export const UserIcon = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const [showDropMenu, setShowDropMenu] = useState<boolean>(false);
  const router = useRouter();
  const t = router.locale==="en"?en:ua;

  const onIconClick = useCallback(() => {
    setShowDropMenu((prev) => !prev);
  }, []);

  const onLogoutClick = useCallback(() => {
    setUser(null);
    Token.clear();
  }, [user]);

  if (user) {
    return (
      <div
        onClick={onIconClick}
        className={`flex h-auto w-44 ${
          showDropMenu ? "" : "hover:animate-pulse"
        } cursor-pointer px-4  dark:text-white`}
      >
        <div className="flex">
          <div className=" my-1 h-auto w-16">
            <UserAvatar avatarPath={user.avatarPath} />
          </div>
          <div className="text-1xl mt-1 pl-2">
            {(user.firstName + " " + user.lastName).slice(0, 18)}
          </div>
        </div>
        {showDropMenu ? (
          <div className="text-1xl absolute top-24 right-3 h-auto w-72 cursor-pointer rounded-md bg-neutral-500 text-white shadow-sm shadow-black child-hover:bg-neutral-800">
            {user && user.role === Role.admin ? (
              <>
                <Link
                  className="flex w-full rounded-t-md bg-red-500 px-3 py-3 text-xl"
                  href={appRoutes.admin.admin}
                >
                  <MdOutlineAdminPanelSettings className="text-3xl" /> Stats
                  Panel
                </Link>
                <Link
                  className="flex w-full rounded-t-md bg-red-500 px-3 py-3 text-xl"
                  href={appRoutes.admin.movies}
                >
                  <MdOutlineAdminPanelSettings className="text-3xl" /> Add Movie
                </Link>
                <Link
                  className="flex w-full bg-red-500 px-3 py-3 text-xl"
                  href={appRoutes.admin.users}
                >
                  <MdOutlineAdminPanelSettings className="text-3xl" /> Users
                  Panel
                </Link>
              </>
            ) : null}

            <Link
              href={appRoutes.profile.index}
              className="flex w-full px-3 py-3 text-xl "
            >
              <AiOutlineUser className="mx-3 text-2xl" /> <div>{t.userIcon.profile}</div>
            </Link>
            <Link
              href={appRoutes.profile.watchLater}
              className="flex w-full px-3 py-3 text-xl text-white"
            >
              <AiOutlineEye className="mx-3 text-2xl text-white" />{" "}
              <div>{t.userIcon.watchLater}</div>
            </Link>
            <Link
              href={appRoutes.profile.liked}
              className="flex w-full px-3 py-3 text-xl text-white"
            >
              <AiFillHeart className="mx-3 text-2xl text-white" />{" "}
              <div>{t.userIcon.likedMovies}</div>
            </Link>

            <div
              onClick={onLogoutClick}
              className="flex w-full px-3 py-3 text-xl"
            >
              <RiLogoutBoxLine className="mx-3 text-2xl" /> <div>{t.userIcon.logout}</div>
            </div>
            {user && !user.isPremium ? (
              <Link
                href={appRoutes.premium}
                className="flex w-full rounded-b-md bg-yellow-600 px-3 py-3 text-xl"
              >
                <AiFillCrown /> {t.userIcon.premium}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="my-auto flex text-xl">
      <Link
        href={appRoutes.login}
        className="text-blue-600 underline dark:text-blue-300"
      >
        {t.userIcon.login}
      </Link>
      /
      <Link
        className="text-blue-600 underline dark:text-blue-300"
        href={appRoutes.registration}
      >
        {t.userIcon.reg}
      </Link>
    </div>
  );
};
