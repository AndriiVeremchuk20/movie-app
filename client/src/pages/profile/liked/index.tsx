import like from "@/api/like";
import watchLater from "@/api/watchLater";
import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import MoviesList from "@/components/moviesList";
import { BaseMovie } from "@/types/movie";
import { isAuthed } from "@/utils/isAuthed";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const WatchLaterPage = () => {
  const [movieList, setMovieList] = useState<Array<BaseMovie>>([]);
  const [user] = useAtom(appUserAtom);
  const router = useRouter();

  const getMarkedMoviesMutation = useMutation(like.getLikedMovies, {
    onSuccess(data) {
      console.log(data);
      setMovieList(data);
    },
  });

  useEffect(() => {
    getMarkedMoviesMutation.mutate();
  }, []);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace(appRoutes.login);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Liked movies</title>
      </Head>
      <div className="flex max-h-fit min-h-screen justify-center bg-[url('/img/bg-w-l-light.jpg')] bg-cover bg-fixed dark:bg-[url('/img/bg-w-l-dark.jpg')]">
        <div className="mb-10 mt-36 flex h-auto w-fit justify-center bg-neutral-500 bg-opacity-30 px-10 pb-10">
          <div>
            {movieList.length > 0 ? (
              <MoviesList moviesList={movieList} />
            ) : (
              <div>Not found no one saved movie...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(WatchLaterPage);
