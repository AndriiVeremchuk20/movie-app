import movies from "@/api/movies";
import { Movie } from "@/api/types/movie";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

//add autocomplete
//and use debounce hook

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [foundMovies, setFoundMovies] = useState<Array<Movie>>([]);

  const searchMutation = useMutation(movies.searchMovies, {
    onSuccess(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onInputChange = useCallback(
    (e: any) => {
      setSearchText(e.target.value);
    },
    [searchText]
  );

  const onSearchClick = useCallback(() => {
    console.log(searchMutation.mutate(searchText));
  }, [searchText]);

  return (
    <div className={``}>
      <div
        className={`w-fit h-12 flex content-center bg-lime-600 dark:bg-indigo-700 rounded-2xl shadow-stone-700 shadow-md`}
      >
        <input
          type="search"
          value={searchText}
          onChange={onInputChange}
          max={50}
          placeholder={"Search..."}
          className={`w-96 outline-none rounded-l-2xl py-1 px-3 text-xl`}
        />
        <button
          onClick={onSearchClick}
          type="button"
          className={`w-16 flex justify-center text-2xl hover:animate-pulse`}
        >
          <FaSearch className="m-auto bg-lime" />
        </button>
      </div>
    </div>
  );
};
