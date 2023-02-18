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
    <header className="flex flex-col fixed z-10 w-full opacity-90">
      <div className="w-full  h-20 p-3 flex content-center justify-between bg-lime-500 dark:bg-indigo-900">
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
