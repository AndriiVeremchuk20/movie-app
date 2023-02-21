import movies from "@/api/movies";
import { Movie } from "@/types/movie";
import MovieInfo from "@/components/movieInfo";
import Video from "@/components/video";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { currentMovieAtom } from "@/atom";
import Recommendations from "@/components/recommendations";
import MovieComment from "@/components/movieComment";

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
    return () => {
      setCurrentMovie(null);
    };
  }, [id]);

  if (currentMovie)
    return (
      <div
        className={`flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900`}
      >
        <div className={`mt-32  flex w-3/4 flex-col`}>
          <MovieInfo />
          <div className={`my-10 h-auto w-full`}>
            <Video />
          </div>
          <div>
            <Recommendations movies={currentMovie.recommendations}/>
          </div>
          <div>
            <MovieComment/>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className={`flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900`}
    >
      Movie not found
    </div>
  );
};

export default MoviePage;
