import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { RiMovieFill, RiLogoutBoxLine } from "react-icons/ri";
import Token from "@/utils/token";
export const UserIcon = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const [showDropMenu, setShowDropMenu] = useState<boolean>(false);

  const onIconClick = useCallback(() => {
    setShowDropMenu((prev) => !prev);
  }, []);

  const onLogoutClick = useCallback(()=>{
    setUser(null);
    Token.clear();
  }, [user]);

  if (user) {
    return (
      <div
        onClick={onIconClick}
        className={`flex w-44 h-auto shadow-black shadow-md bg-slate-700 ${
          showDropMenu ? "" : "hover:animate-pulse"
        } dark:bg-slate-300 px-4 rounded-md  cursor-pointer`}
      >
        <div className="flex">
          <BiUserCircle className="text-6xl font-bold text-lime-500 dark:text-indigo-900" />
          <div className="text-1xl pl-2 font-bold text-lime-500 dark:text-indigo-900 mt-2">
            {(user.firstName + " " + user.lastName).slice(0, 18)}
          </div>
        </div>
        {showDropMenu ? (
          <div className="absolute w-44 h-auto text-1xl top-20 right-3 shadow-black shadow-sm bg-slate-300 rounded-md cursor-pointer child-hover:bg-cyan-800">
            <Link href={"/profile"} className="flex w-full text-xl px-3 py-3 ">
              <AiOutlineUser className="text-2xl mx-3" /> <div>Profile</div>
            </Link>
            <div className="flex w-full text-xl px-3 py-3">
              <GrView  className="text-2xl mx-3" /> <div>View later</div>{" "}
            </div>
            <div className="flex w-full text-xl px-3 py-3">
              <RiMovieFill  className="text-2xl mx-3"/> <div>Viewed</div>
            </div>
            <div onClick={onLogoutClick} className="flex w-full text-xl px-3 py-3">
              <RiLogoutBoxLine  className="text-2xl mx-3"/> <div>Logout</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link href={"/login"} className=" w-44 h-auto flex justify-center bg-slate-700 hover:animate-pulse dark:bg-slate-300 px-4 rounded-xl cursor-pointer">
      <div className="text-3xl mt-2 font-bold text-lime-500 dark:text-indigo-900">Login</div>
    </Link>
  );
};
