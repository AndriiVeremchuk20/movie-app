import { Movie } from "@/api/types/movie";
import React from "react";
import MoviesCard from "./movieCard";

interface PropsMoviesList {
  moviesList: Array<Movie>;
}

const MoviesList: React.FC<PropsMoviesList> = ({ moviesList }) => {
  if (!moviesList.length) {
    return <div className="mt-3 text-4xl">Not found no one movie 🙍‍♀️</div>;
  }

  return (
    <div className={`grid grid-flow-row-dense grid-cols-4 gap-3 mt-3`}>
      {moviesList.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default React.memo(MoviesList);