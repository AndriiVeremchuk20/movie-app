import { darkModeAtom } from "@/atom";
import { useAtom } from "jotai";
import React, { memo, useCallback, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const ChangeTheme =  () => {
  const [isDark, setIsDark] = useAtom(darkModeAtom);

  const onButtonClick = useCallback(() => {
    setIsDark(prev=>!prev);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [isDark]);

  return (
    <button onClick={onButtonClick} className="rounded-full outline-none text-2xl p-4 bg-lime-200 dark:bg-indigo-500 fixed top-28 left-20">
      {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default memo(ChangeTheme);
