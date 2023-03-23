import auth from "@/api/auth";
import like from "@/api/like";
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

const Profile = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const router = useRouter();
  const [likedMovies, setLikedMovies] = useState<Array<BaseMovie>>([]);

  const deleteAccountMutation = useMutation(auth.deleteAccount, {
    onSuccess(data) {
      alert(data.msg);
      setUser(null);
      router.replace("/");
    },
  });

  const getLikedMoviesMutation = useMutation(like.getLikedMovies, {
    onSuccess(data) {
      setLikedMovies(data);
      console.log(data);
    },
  });

  const onDeleteAccountClick = useCallback(() => {
    deleteAccountMutation.mutate();
  }, []);

  useEffect(() => {
    getLikedMoviesMutation.mutate();
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
        <div className="flex max-h-fit min-h-screen w-screen justify-center bg-lime-100 dark:bg-sky-900">
          <div className=" mt-28 mb-10 flex h-auto flex-col justify-center bg-emerald-500 pb-10 dark:bg-sky-800 md:w-3/4">
            <div className="m-auto">
              <div className="mt-6 flex rounded-md bg-indigo-900 p-5 shadow-md shadow-indigo-800">
                <UploadAvatarForm />
                <div className="my-5 mx-3 text-2xl text-white">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div>Age: {user.age} y.o.</div>
                  <a href={`mailto:${user.email}`}>Email: {user.email}</a>
                  <div>All liked movies: {user.likes.length}</div>
                  <div>All added to watch later: {user.watchLater.length}</div>
                </div>
                <button
                  onClick={onDeleteAccountClick}
                  className="ml-20 h-fit w-fit rounded-md border-2 border-red-700 bg-red-200 p-4 text-red-700"
                >
                  Delete account
                </button>
              </div>
              <div className="my-3">
                <div className="text-2xl">Liked movies</div>
                <MoviesList moviesList={likedMovies} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return null;
};

export default Profile;
