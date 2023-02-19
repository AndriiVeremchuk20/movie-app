import { Movie } from "@/types/movie";
import getMediaPath from "@/utils/getMediaPath";
import getShortName from "@/utils/getShortName";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import NewMark from "./newMark";
import WatchLaterButton from "./watchLaterButton";

interface PropsMovieCard {
  movie: Movie;
}

const cutName = (name: string, maxSpaces: number) => {
  return name.split(" ").length > maxSpaces
    ? name.split(" ").slice(0, 3).join(" ") + "..."
    : name;
};

const MovieCard: React.FC<PropsMovieCard> = ({ movie }) => {
  const router = useRouter();

  const onCardClick = useCallback(() => {
    router.push(`/movie/${movie.id}`);
  }, []);

  return (
    <div
      className={`w-60 h-96 bg-slate-900 shadow-slate-800 shadow-xl hover:shadow-none hover:bg-slate-800 cursor-pointer`}
    >
      <NewMark date={movie.postedAt} />
      <img
        onClick={onCardClick}
        src={getMediaPath(movie.posterPath)}
        alt={movie.name}
        className={`w-full h-80`}
      />
      <div className="flex justify-between mt-1 mx-2">
        <div onClick={onCardClick} className={`text-white`}>
          <div className={`text-md`}>{getShortName(movie.name, 13)}</div>
          <div className={`text-sm`}>{movie.postedAt.slice(0, 4)}</div>
        </div>
        <WatchLaterButton movieId={movie.id} />
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
