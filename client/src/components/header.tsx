import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Logo } from "./logo";
import ScrollBar from "./scrollBar";
import { SearchBar } from "./searchBar";
import { UserIcon } from "./userIcon";

export const Header = () => {
  const [isRoot, setIsRoot] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsRoot(router.asPath === "/");
  }, [router.asPath]);

  return (
    <header className="fixed z-10 flex w-full flex-col bg-neutral-300 bg-opacity-90 dark:bg-neutral-900 dark:bg-opacity-90">
      <div className="flex  h-20 w-full content-center justify-between p-3">
        <div className="flex">
          <Logo />
        </div>
        <SearchBar />
        <UserIcon />
      </div>
      <ScrollBar/>
    </header>
  );
};
