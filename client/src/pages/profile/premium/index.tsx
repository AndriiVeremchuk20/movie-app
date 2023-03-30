import premium from "@/api/premium";
import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import PaymentForm from "@/components/paymentForm";
import Recommendations from "@/components/recommendations";
import { BaseMovie } from "@/types/movie";
import { isAuthed } from "@/utils/isAuthed";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

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
      <>
        <Head>
          <title>Premium</title>
        </Head>
        <div className="flex max-h-fit min-h-screen justify-center  bg-[url('/img/bg-login-light.jpg')] bg-cover dark:bg-[url('/img/bg-login-dark.jpg')] dark:bg-cover">
          <div className="mt-36 mb-10 flex w-screen flex-col  bg-neutral-500 bg-opacity-40 pb-10 dark:bg-neutral-800 dark:bg-opacity-50 md:w-3/4">
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
            <div>
              {!user.isPremium ? (
                <div className="flex w-full flex-col">
                  <div className="m-auto my-5 text-5xl text-white">18$</div>
                  <div className="flex w-full justify-center">
                    <PaymentForm />
                  </div>
                </div>
              ) : (
                <div className="mx-10 text-xl text-black dark:text-white">
                  Dear {user.firstName},<br/> We would like to take this opportunity
                  to express our sincere gratitude for choosing Get Movie as
                  your preferred streaming service. <br/> We appreciate your decision
                  to upgrade to our premium subscription and trust that you will
                  enjoy the enhanced benefits that come with it. At Get Movie,
                  we are committed to providing our customers with the best
                  possible streaming experience. <br/> We take pride in our extensive
                  collection of movies and TV shows, which is constantly updated
                  to ensure that you have access to the latest and greatest
                  content. Your decision to upgrade to our premium subscription
                  not only helps us to continue providing you with high-quality
                  content but also supports our ongoing efforts to improve our
                  services. Once again, thank you for choosing Get Movie, and we
                  hope that you will enjoy your premium subscription to the
                  fullest. Sincerely, GetMovie
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );

  return null;
};

export default Premium;
