import movies from "@/api/movies";
import { Movie } from "@/api/types/movie";
import Video from "@/components/video";
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

  return (
    <div
      className={`min-h-screen max-h-fit flex justify-center bg-lime-100 dark:bg-sky-900`}
    >
      <div className={`w-11/12 bg-slate-500 mt-32`}>
        {
            currentMovie?<Video subPath={currentMovie.moviePath} />:null
        } 
      </div>
    </div>
  );
};

export default MoviePage;
