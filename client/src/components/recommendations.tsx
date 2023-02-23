import { BaseMovie } from "@/types/movie";
import React from "react";
import MovieCard from "./movieCard";

interface PropsRecommendations {
  movies: Array<BaseMovie>;
}

const Recommendations: React.FC<PropsRecommendations> = ({ movies }) => {
  if (movies.length > 0)
    return (
      <div className="mt-2 mb-4 w-full">
        <div className="mb-1 text-2xl">Recomendations:</div>
        <div className="relative flex overflow-x-scroll">
          {movies.map((movie) => (
            <div key={movie.id} className="mx-2 h-auto w-auto flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  return null;
};

export default React.memo(Recommendations);
