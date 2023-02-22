import { BaseMovie } from "@/types/movie";
import React from "react";
import MovieCard from "./movieCard";

interface PropsRecommendations {
  movies: Array<BaseMovie>;
}

const Recommendations: React.FC<PropsRecommendations> = ({ movies }) => {
  if (movies.length > 0)
    return (
      <div className="w-full mt-2 mb-4">
        <div className="text-2xl mb-1">Recomendations:</div>
        <div className="relative flex overflow-x-scroll">{
          movies.map(movie => <div key={movie.id} className="flex-none w-auto h-auto mx-2"><MovieCard movie={movie}/></div>)
          }</div>
      </div>
    );
  return null;
};

export default React.memo(Recommendations);
