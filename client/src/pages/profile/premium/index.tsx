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
import React, { useEffect, useState } from "react";

import ua from "@/locales/ua/translation";
import en from "@/locales/en/translation";

export const Premium = () => {
  const [user] = useAtom(appUserAtom);
  const [movies, setMovies] = useState<Array<BaseMovie>>([]);
  const router = useRouter();
  const t = router.locale === "en"? en: ua;

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
          <title>{t.premiumPage.title}</title>
        </Head>
        <div className="flex max-h-fit min-h-screen justify-center  bg-[url('/img/bg-login-light.jpg')] bg-cover dark:bg-[url('/img/bg-login-dark.jpg')] dark:bg-cover">
          <div className="mb-10 mt-36 flex w-screen flex-col  bg-neutral-500 bg-opacity-40 pb-10 dark:bg-neutral-800 dark:bg-opacity-50 md:w-3/4">
            <div className="flex h-fit w-full bg-yellow-600 py-3 text-6xl font-bold text-white">
              {t.premiumPage.title}
            </div>
            <div className="ml-4 mt-3 text-2xl text-white">
              {!user.isPremium
                ? t.premiumPage.msgForNotPremium
                : t.premiumPage.msgForPremium}
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
                <div className="mx-10 bg-neutral-200 p-2 text-xl text-black dark:bg-neutral-700 dark:text-white">
                  {t.premiumPage.textForPremium(user.firstName)}
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
