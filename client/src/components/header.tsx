import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import React, { FC } from "react";
import { ChangeLanguage } from "./changeLanguage";
import { Logo } from "./logo";
import ScrollBar from "./scrollBar";
import { SearchBar } from "./searchBar";
import { UserIcon } from "./userIcon";

export const Header: FC = () => {
  const [user] = useAtom(appUserAtom);

  return (
    <header className="fixed z-10 flex w-full flex-col bg-neutral-300 bg-opacity-90 dark:bg-neutral-900 dark:bg-opacity-90">
      <div className="flex  h-20 w-full content-center justify-between p-3">
        <div className="flex">
          <Logo />
        </div>
        <SearchBar />
        <div className="flex">
          <ChangeLanguage />
          <UserIcon />
        </div>
      </div>
      <ScrollBar />
      {user && user.role === "ADMIN" ? (
        <div className="bg-red-500 text-center text-xl font-bold">
          Admin Mode
        </div>
      ) : null}
    </header>
  );
};
