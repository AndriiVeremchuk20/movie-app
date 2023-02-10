import React from "react";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { UserIcon } from "./userIcon";

export const Header = () => {
  return (
    <div className="h-20 p-3 flex content-center justify-between bg-lime-500 dark:bg-indigo-900">
      <Logo/>
      <SearchBar/>
      <UserIcon/>
    </div>
  );
};
