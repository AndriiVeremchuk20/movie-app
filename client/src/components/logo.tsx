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
      className="flex h-auto w-auto cursor-pointer px-4 text-black dark:text-white"
    >
      <MdMovie className="text-6xl font-bold" />
      <div className="mt-2 text-4xl font-bold">Get movie</div>
    </div>
  );
};
