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
      className={`w-13 h-13 mr-4 cursor-pointer rounded-full bg-slate-700 px-4 text-4xl shadow-md shadow-black hover:animate-pulse dark:bg-slate-300`}
    >
      <BiArrowBack className=" text-lime-500 dark:text-indigo-900" />
    </button>
  );
};

export default BackButton;
