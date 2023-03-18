import moviesApi from "@/api/movies";
import { appUserAtom } from "@/atom";
import MoviesList from "@/components/moviesList";
import Pagination from "@/components/pagination";
import SortFilterPanel from "@/components/sortFilterPanel";
import { BaseMovie } from "@/types/movie";
import Token from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [moviesList, setMoviesList] = useState<Array<BaseMovie>>([]);
  const router = useRouter();
  const { query } = router.query;
  const [user] = useAtom(appUserAtom);

  const getMoviesMutation = useMutation(moviesApi.getMovies, {
    onSuccess(data) {
      console.log(data);
      setMoviesList(data.movies);
    },
    onError(e) {
      console.log(e);
    },
  });

  const searchMutation = useMutation(moviesApi.searchMovies, {
    onSuccess(data) {
      console.log(data);
      setMoviesList(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    if (query && query.length > 0 && !Array.isArray(query)) {
      searchMutation.mutate(query);
    } else {
      getMoviesMutation.mutate();
    //router.reload();
    }
  }, [query, user]);

  
  return (
    <>
      <Head>
        <title>Get Movie</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-h-fit min-h-screen justify-center bg-[url('/img/bg-lite.jpg')] bg-cover dark:bg-[url('/img/bg-dark.jpg')]">
        <div className=" mt-24 mb-10 flex h-auto justify-center bg-emerald-500 pb-10 dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-40 p-9">
          <div>
            {query ? (
              <div className="m-2 text-2xl">{`Results for "${query}" :`}</div>
            ) : null}
            <SortFilterPanel/>
            <MoviesList moviesList={moviesList} />
            <Pagination pages={10} currentPage={3}/>
          </div>
        </div>
      </div>
    </>
  );
}
