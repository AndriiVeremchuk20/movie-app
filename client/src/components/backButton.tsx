import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const router = useRouter();

  const onBackClick = useCallback(() => {
    router.back();
  }, []);

  return (
    <button
      onClick={onBackClick}
      className={`mr-4 text-4xl w-13 h-13 rounded-full bg-slate-700 shadow-black shadow-md hover:animate-pulse dark:bg-slate-300 px-4 cursor-pointer`}
    >
      <BiArrowBack className=" text-lime-500 dark:text-indigo-900" />
    </button>
  );
};

export default BackButton;
