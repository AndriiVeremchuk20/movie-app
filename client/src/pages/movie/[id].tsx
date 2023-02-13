import movies from "@/api/movies";
import { Movie } from "@/api/types/movie";
import Video from "@/components/video";
import getMediaPath from "@/utils/getMediaPath";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
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
        <div className={`w-3/4 bg-slate-500 mt-32 flex flex-col`}>
          
          <div className="bg-indigo-400 flex justify-center">
            
            <img
              alt={currentMovie?.name}
              src={getMediaPath(currentMovie?.posterPath)}
              className={` w-80 h-auto`}
            />

            <div className={` w-3/4 divide-y`}>
              <div className={`flex justify-between my-5 mx-3`}>
                <div className="text-3xl font-bold">{currentMovie.name}</div>
                <div className="text-sm overflow-y-auto ">{currentMovie.year.slice(0, 10)}</div>
              </div>
              <div className="text-justify">{currentMovie.description}</div>
            </div>
          </div>

          <div>
            {currentMovie ? <Video subPath={currentMovie.moviePath} /> : null}
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
