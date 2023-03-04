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
        <div className="mt-36 mb-10 flex flex-col h-auto w-screen bg-emerald-500 pb-10 dark:bg-gray-800 md:w-3/4">
          <div className="text-6xl bg-yellow-600 w-full h-fit text-center py-2 font-bold">Premium</div>
            <div className="text-white text-2xl mt-3 ml-4">
            {
                !user.isPremium?
                `Buy premium you get access to movies that are only available for premium user.`: `You're alredy premium` 
            }
            </div>
            <button className="w-fit px-2 py-1 bg-yellow-600 text-2xl text-black font-bold hover:bg-yellow-700 hover:shadow-sm hover:shadow-yellow-700">
                Buy Premium
            </button>
        </div>
      </div>
    );

  return null;
};

export default Premium;
