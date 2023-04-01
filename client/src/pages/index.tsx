import moviesApi from "@/api/movies";
import { appUserAtom } from "@/atom";
import MoviesList from "@/components/moviesList";
import Pagination from "@/components/pagination";
import SortFilterPanel from "@/components/sortFilterPanel";
import { BaseMovie } from "@/types/movie";
import { QueryParams } from "@/types/queryParams";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import en from "../../public/locales/en/translation";
import ua from "../../public/locales/ua/translation";

export default function Home() {
  const [moviesList, setMoviesList] = useState<Array<BaseMovie>>([]);
  const [numPages, setNumPages] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [user] = useAtom(appUserAtom);
  const router = useRouter();
  const t = router.locale === "en"? en : ua
  const { query } = router;

  const getMoviesMutation = useMutation(moviesApi.getMovies, {
    onSuccess(data) {
      //console.log(data);
      setMoviesList(data.movies);
      setNumPages(data.pages);
      setCurrPage(data.page);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    const queryParams: QueryParams = {};

    if (query.search) queryParams.search = query.search as string;
    if (query.page) queryParams.page = Number(query.page);
    if (query.sort) queryParams.sort = query.sort as string;
    if (query.filter) queryParams.filter = query.filter as string;

    getMoviesMutation.mutate(queryParams);
  }, [query, user]);

  return (
    <>
      <Head>
        <title>Get Movie</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-h-fit min-h-screen justify-center bg-[url('/img/bg-index-light.jpg')] bg-cover bg-fixed dark:bg-[url('/img/bg-index-dark.jpg')] dark:bg-fixed">
        <div className=" mt-24 mb-10 flex h-auto justify-center bg-neutral-500 bg-opacity-40 p-9 pb-10 dark:bg-neutral-700 dark:bg-opacity-50">
          <div>
            <div>
              {t.search.placeholder}
            </div>
            {query.search ? (
              <div className="m-2 text-2xl">{`Results for "${query.search}" :`}</div>
            ) : null}
            <SortFilterPanel />
            <MoviesList moviesList={moviesList} />
            <Pagination pages={numPages} currentPage={currPage} />
          </div>
        </div>
      </div>
    </>
  );
}
