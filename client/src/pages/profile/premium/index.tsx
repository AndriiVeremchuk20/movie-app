import premium from "@/api/premium";
import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import Recommendations from "@/components/recommendations";
import { BaseMovie } from "@/types/movie";
import { isAuthed } from "@/utils/isAuthed";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const Premium = () => {
  const [user] = useAtom(appUserAtom);
  const [movies, setMovies] = useState<Array<BaseMovie>>([]);
  const router = useRouter();

  const getPremiumMovies = useMutation(premium.getPremiumMovies, {
    onSuccess(data) {
      setMovies(data);
    },
    onError() {},
  });

  const buyPremium = useMutation(premium.buyPremium, {
    onSuccess() {
      router.reload();
    },
    onError() {},
  });

  const onBuyPremiumClick = () => {
    buyPremium.mutate();
  };

  useEffect(() => {
    if (!isAuthed()) {
      router.replace(appRoutes.login);
    }
  }, [user]);

  useEffect(() => {
    getPremiumMovies.mutate();
  }, []);

  if (user)
    return (
      <div className="flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900">
        <div className="mt-36 mb-10 flex h-auto w-screen flex-col bg-emerald-500 pb-10 dark:bg-gray-800 md:w-3/4">
          <div className="flex h-fit w-full bg-yellow-600 py-2 text-6xl font-bold text-white">
            Premium
          </div>
          <div className="mt-3 ml-4 text-2xl text-white">
            {!user.isPremium
              ? `Buy premium you get access to movies that are only available for premium user.`
              : `You're alredy premium`}
          </div>
          <div className="m-3">
            <Recommendations movies={movies} />
          </div>
          <div className="flex w-full flex-col">
            <div className="m-auto mb-5 text-5xl text-white">18$</div>
            <button
              onClick={onBuyPremiumClick}
              className="m-auto w-fit rounded-sm bg-yellow-600 px-3 py-2 text-3xl font-bold text-black hover:bg-yellow-700 hover:shadow-sm hover:shadow-yellow-700"
            >
              Buy Premium
            </button>
          </div>
        </div>
      </div>
    );

  return null;
};

export default Premium;
