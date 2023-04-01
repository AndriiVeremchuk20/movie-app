import movies from "@/api/movies";
import { BaseMovie } from "@/types/movie";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { FaSearch } from "react-icons/fa";
import AutocompleteMoviesSearch from "./autocompleteMoviesSearch";
import appRoutes from "@/appRoutes";

import ua from "../../public/locales/ua/translation";
import en from "../../public/locales/en/translation";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [foundMovies, setFoundMovies] = useState<Array<BaseMovie>>([]);
  const debounce = useDebounce(searchText, 1000);
  const router = useRouter();
  const t = router.locale === "en" ? en : ua;


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
        //setSearchText("");
        //router.push(`/?search=${searchText}`);
        router.push({
          pathname: appRoutes.home,
          query: {
            ...router.query,
            search: searchText,
          },
        });
      } else {
        if (router.asPath !== appRoutes.home) {
          router.push(appRoutes.home);
        }
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
        className={`flex h-12 w-fit content-center  bg-neutral-600 dark:bg-neutral-700`}
      >
        <input
          type="search"
          value={searchText}
          onChange={onInputChange}
          max={50}
          placeholder={`${t.search.placeholder}`}
          className={`w-96  px-3 py-1 text-xl outline-none`}
        />
        <button
          type="submit"
          className={`flex w-16 justify-center text-2xl hover:animate-pulse`}
        >
          <FaSearch className="bg-lime m-auto" />
        </button>
      </form>
      {searchText ? <AutocompleteMoviesSearch movies={foundMovies} /> : null}
    </div>
  );
};

