import { appUserAtom } from "@/atom";
import { isAuthed } from "@/utils/isAuthed";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const Premium = () => {
  const [user] = useAtom(appUserAtom);
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/");
    }
  }, [user]);

  if (user)
    return (
      <div className="flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900">
        <div className="mt-36 mb-10 flex h-auto w-screen flex-col bg-emerald-500 pb-10 dark:bg-gray-800 md:w-3/4">
          <div className="flex h-fit w-full bg-yellow-600 py-2 text-6xl font-bold text-center text-white">
            Premium
          </div>
          <div className="mt-3 ml-4 text-2xl text-white">
            {!user.isPremium
              ? `Buy premium you get access to movies that are only available for premium user.`
              : `You're alredy premium`}
          </div>
          <button className="w-fit bg-yellow-600 px-2 py-1 text-2xl font-bold text-black hover:bg-yellow-700 hover:shadow-sm hover:shadow-yellow-700">
            Buy Premium
          </button>
        </div>
      </div>
    );

  return null;
};

export default Premium;
