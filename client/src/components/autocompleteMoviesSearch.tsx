import { Movie } from "@/api/types/movie";
import React from "react";
import AutocompleteCard from "./autocompleteCard";

interface PropsAutocompleteMovieSearch {
  movies: Array<Movie>;
}

const AutocompleteMoviesSearch: React.FC<PropsAutocompleteMovieSearch> = ({
  movies,
}) => {
  if (movies.length > 0) {
    return (
      <div
        className={`flex flex-col w-10/12 ml-3 overflow-y-auto min-h-fit max-h-72 bg-slate-400 rounded-sm divide-y-2`}
      >
        {movies.map((movie) => (
          <AutocompleteCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

  return null;
};

export default React.memo(AutocompleteMoviesSearch);
