import { Movie } from "@/api/types/movie";
import getMediaPath from "@/utils/getMediaPath";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface PropsAutocompleteCard {
  movie: Movie;
}

const AutocompleteCard: React.FC<PropsAutocompleteCard> = ({ movie }) => {
  const router = useRouter();

  const onCardClick = useCallback(() => {
    router.push(`/movie/${movie.id}`);
  }, []);

  return (
    <div
      key={movie.id}
      className={`flex p-1 cursor-pointer hover:bg-teal-600`}
      onClick={onCardClick}
    >
      <img src={getMediaPath(movie.posterPath)} className={` h-24 w-16`} />
      <div className={`text-xl self-center ml-3`}>{movie.name}</div>
    </div>
  );
};

export default React.memo(AutocompleteCard);
