import { darkModeAtom } from "@/atom";
import { useAtom } from "jotai";
import React, { memo, useCallback, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ChangeTheme = () => {
  const [isDark, setIsDark] = useAtom(darkModeAtom);

  const onButtonClick = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [isDark]);

  return (
    <button
      onClick={onButtonClick}
      className="fixed top-28 left-20 rounded-full bg-lime-200 p-4 text-2xl outline-none dark:bg-indigo-500"
    >
      {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default memo(ChangeTheme);
