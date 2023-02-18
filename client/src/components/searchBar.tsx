import movies from "@/api/movies";
import { Movie } from "@/types/movie";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AutocompleteMoviesSearch from "./autocompleteMoviesSearch";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [foundMovies, setFoundMovies] = useState<Array<Movie>>([]);
  const debounce = useDebounce(searchText, 1000);
  const router = useRouter();

  const searchMutation = useMutation(movies.searchMovies, {
    onSuccess(data) {
      console.log(data);
      setFoundMovies(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onInputChange = useCallback(
    (e: any) => {
      const { value } = e.target;
      if (!value) {
        setFoundMovies([]);
      }
      setSearchText(value);
    },
    [searchText]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchText !== "") {
        setSearchText("");
        router.push(`/?query=${searchText}`);
      }
    },
    [searchText]
  );

  useEffect(() => {
    if (debounce) searchMutation.mutate(debounce);
  }, [debounce]);

  return (
    <div className={``}>
      <form
        onSubmit={onSubmit}
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
          type="submit"
          className={`w-16 flex justify-center text-2xl hover:animate-pulse`}
        >
          <FaSearch className="m-auto bg-lime" />
        </button>
      </form>
      {searchText ? <AutocompleteMoviesSearch movies={foundMovies} /> : null}
    </div>
  );
};
