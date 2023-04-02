import auth from "@/api/auth";
import { appUserAtom } from "@/atom";
import MoviesList from "@/components/moviesList";
import UploadAvatarForm from "@/components/uploadAvatarForm";
import { BaseMovie } from "@/types/movie";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { isAuthed } from "@/utils/isAuthed";
import appRoutes from "@/appRoutes";
import watched from "@/api/watched";

import en from "@/locales/en/translation";
import ua from "@/locales/ua/translation";

const Profile = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const router = useRouter();
  const [watchedMovies, setWatchedMovies] = useState<Array<BaseMovie>>([]);
  const t = router.locale === "en"? en : ua;

  const deleteAccountMutation = useMutation(auth.deleteAccount, {
    onSuccess(data) {
      alert(data.msg);
      setUser(null);
      router.replace(appRoutes.home);
    },
  });

  const getWatchedMoviesMutation = useMutation(watched.getWatched, {
    onSuccess(data) {
      setWatchedMovies(data);
      console.log(data);
    },
  });

  const onDeleteAccountClick = useCallback(() => {
    deleteAccountMutation.mutate();
  }, []);

  useEffect(() => {
    getWatchedMoviesMutation.mutate();
  }, []);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace(appRoutes.login);
    }
  }, [user]);

  if (user)
    return (
      <>
        <Head>
          <title>{user.firstName}</title>
        </Head>
        <div className="flex max-h-fit min-h-screen w-screen justify-center bg-[url('/img/bg-profile-light.jpg')] bg-cover bg-fixed dark:bg-[url('/img/bg-profile-dark.jpg')] dark:bg-fixed">
          <div className=" mt-28 mb-10 flex h-auto flex-col justify-center bg-neutral-900 bg-opacity-60 pb-10 dark:bg-neutral-900 dark:bg-opacity-60 md:w-3/4">
            <div className="m-auto">
              <div className="mt-6 flex bg-sky-600 bg-opacity-30 p-5 shadow-md shadow-sky-900">
                <UploadAvatarForm />
                <div className="my-5 mx-3 text-2xl text-white">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div>{t.profile.age}: {user.age}</div>
                  <a href={`mailto:${user.email}`}>{t.profile.email}: {user.email}</a>
                  <div>{t.profile.likedMovies}: {user.likes.length}</div>
                  <div>{t.profile.addedwl}: {user.watchLater.length}</div>
                  <div>{t.profile.watched}: {user.watched}</div>
                </div>
                <button
                  onClick={onDeleteAccountClick}
                  className="ml-20 h-fit w-fit rounded-md border-2 border-red-700 bg-red-200 p-4 text-red-700"
                >
                  {t.profile.deleteAccount}
                </button>
              </div>
              <div className="my-3">
                <div className="text-2xl font-bold text-white">
                  {t.profile.watched}:
                </div>
                <MoviesList moviesList={watchedMovies} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return null;
};

export default Profile;
