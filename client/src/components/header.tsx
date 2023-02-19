import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BackButton from "./backButton";
import { Logo } from "./logo";
import { SearchBar } from "./searchBar";
import { UserIcon } from "./userIcon";

export const Header = () => {
  const [isRoot, setIsRoot] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsRoot(router.asPath === "/");
  }, [router.asPath]);

  return (
    <header className="fixed z-10 flex w-full flex-col opacity-90">
      <div className="flex  h-20 w-full content-center justify-between bg-lime-500 p-3 dark:bg-indigo-900">
        <div className="flex">
          {!isRoot ? <BackButton /> : null}
          <Logo />
        </div>
        <SearchBar />
        <UserIcon />
      </div>
    </header>
  );
};
