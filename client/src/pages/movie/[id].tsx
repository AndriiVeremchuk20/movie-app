import movies from "@/api/movies";
import { Movie } from "@/types/movie";
import MovieInfo from "@/components/movieInfo";
import Video from "@/components/video";
//import getMediaPath from "@/utils/getMediaPath";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentMovieAtom } from "@/atom";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);
  const getMovieByIdMutation = useMutation(movies.getMoviesById, {
    onSuccess(data) {
      setCurrentMovie(data);
      console.log(data);
    },
    onError(e) {},
  });

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      getMovieByIdMutation.mutate(id);
    }
  }, [id]);

  if (currentMovie)
    return (
      <div
        className={`min-h-screen max-h-fit flex justify-center bg-lime-100 dark:bg-sky-900`}
      >
        <div className={`w-3/4  mt-32 flex flex-col`}>
          <MovieInfo/>
          <div className={`w-full h-auto my-10`}>
            <Video/>
          </div>

        </div>
      </div>
    );

  return (
    <div
      className={`min-h-screen max-h-fit flex justify-center bg-lime-100 dark:bg-sky-900`}
    >
      Movie not found
    </div>
  );
};

export default MoviePage;
