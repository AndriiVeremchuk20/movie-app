import watchLater from "@/api/watchLater";
import MoviesList from "@/components/moviesList";
import { Movie } from "@/types/movie";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const WatchLaterPage = () => {
  const [movieList, setMovieList] = useState<Array<Movie>>([]);

  const getMarkedMoviesMutation = useMutation(watchLater.getMovies, {
    onSuccess(data) {
      console.log(data);
      setMovieList(data);
    },
  });

  useEffect(() => {
    getMarkedMoviesMutation.mutate();
  }, []);

  return (
    <div className="flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900">
      <div className="mt-36 mb-10 flex h-auto w-screen justify-center bg-emerald-500 pb-10 dark:bg-sky-800 md:w-3/4">
        <div>
          {movieList.length > 0 ? (
            <MoviesList moviesList={movieList} />
          ) : (
            <div>Not found no one saved movie...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WatchLaterPage);
