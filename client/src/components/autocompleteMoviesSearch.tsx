import { BaseMovie } from "@/types/movie";
import React from "react";
import AutocompleteCard from "./autocompleteCard";

interface PropsAutocompleteMovieSearch {
  movies: Array<BaseMovie>;
}

const AutocompleteMoviesSearch: React.FC<PropsAutocompleteMovieSearch> = ({
  movies,
}) => {
  if (movies.length > 0) {
    return (
      <div
        className={`ml-3 flex max-h-72 min-h-fit w-10/12 flex-col divide-y-2 overflow-y-auto rounded-sm bg-neutral-400`}
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
