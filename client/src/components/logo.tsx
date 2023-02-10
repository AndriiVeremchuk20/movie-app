import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { MdMovie} from "react-icons/md";

export const Logo = () => {
  const route = useRouter();

  const onLogoClick = useCallback(() => {
    route.push("/");
  }, []);

  return (
    <div
      onClick={onLogoClick}
      className="flex w-auto h-auto bg-slate-700 shadow-black shadow-md hover:animate-pulse dark:bg-slate-300 px-4 rounded-md  cursor-pointer"
    >
      <MdMovie className="text-6xl font-bold text-lime-500 dark:text-indigo-900" />
      <div className="text-4xl font-bold text-lime-500 dark:text-indigo-900 mt-2">
        Get Movie
      </div>
    </div>
  );
};
