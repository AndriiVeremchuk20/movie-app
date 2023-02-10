import { Movie } from "@/api/types/movie";
import React from "react";
import MoviesCard from "./movieCard";

interface PropsMoviesList {
  moviesList: Array<Movie>;
}

const MoviesList: React.FC<PropsMoviesList> = ({ moviesList }) => {
  if (!moviesList.length) {
    return <div>Not found no one movie</div>;
  }

  return (
    <div className={`w-full grid grid-cols-4 gap-4`}>
      {moviesList.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default React.memo(MoviesList);
