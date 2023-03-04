import appRoutes from "@/appRoutes";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { MdMovie } from "react-icons/md";

export const Logo = () => {
  const route = useRouter();

  const onLogoClick = useCallback(() => {
    route.replace(appRoutes.home);
  }, []);

  return (
    <div
      onClick={onLogoClick}
      className="flex h-auto w-auto cursor-pointer rounded-md bg-slate-700 px-4 shadow-md shadow-black hover:animate-pulse  dark:bg-slate-300"
    >
      <MdMovie className="text-6xl font-bold text-lime-500 dark:text-indigo-900" />
      <div className="mt-2 text-4xl font-bold text-lime-500 dark:text-indigo-900">
        Get Movie
      </div>
    </div>
  );
};
