import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { RiMovieFill, RiLogoutBoxLine } from "react-icons/ri";
import Token from "@/utils/token";
import UserAvatar from "./userAvatar";
export const UserIcon = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const [showDropMenu, setShowDropMenu] = useState<boolean>(false);

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
        className={`flex h-auto w-44 bg-slate-700 shadow-md shadow-black ${
          showDropMenu ? "" : "hover:animate-pulse"
        } cursor-pointer rounded-md px-4  dark:bg-slate-300`}
      >
        <div className="flex">
          <div className=" my-1 w-16 h-auto">
            <UserAvatar avatarPath={user.avatarPath} />
          </div>
          <div className="text-1xl mt-2 pl-2 font-bold text-lime-500 dark:text-indigo-900">
            {(user.firstName + " " + user.lastName).slice(0, 18)}
          </div>
        </div>
        {showDropMenu ? (
          <div className="text-1xl absolute top-20 right-3 h-auto w-72 cursor-pointer rounded-md bg-slate-300 shadow-sm shadow-black child-hover:bg-cyan-800">
            <Link href={"/profile"} className="flex w-full px-3 py-3 text-xl ">
              <AiOutlineUser className="mx-3 text-2xl" /> <div>Profile</div>
            </Link>
            <Link
              href={"/watch-later"}
              className="flex w-full px-3 py-3 text-xl"
            >
              <GrView className="mx-3 text-2xl" /> <div>Watch later</div>
            </Link>
            <div className="flex w-full px-3 py-3 text-xl">
              <RiMovieFill className="mx-3 text-2xl" /> <div>Viewed</div>
            </div>
            <div
              onClick={onLogoutClick}
              className="flex w-full px-3 py-3 text-xl"
            >
              <RiLogoutBoxLine className="mx-3 text-2xl" /> <div>Logout</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={"/login"}
      className=" flex h-auto w-44 cursor-pointer justify-center rounded-xl bg-slate-700 px-4 hover:animate-pulse dark:bg-slate-300"
    >
      <div className="mt-2 text-3xl font-bold text-lime-500 dark:text-indigo-900">
        Login
      </div>
    </Link>
  );
};
