import { BaseMovie } from "@/types/movie";
import getMediaPath from "@/utils/getMediaPath";
import getShortName from "@/utils/getShortName";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import NewMark from "./newMark";
import WatchLaterButton from "./watchLaterButton";

interface PropsMovieCard {
  movie: BaseMovie
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
      className={`h-96 w-60 cursor-pointer bg-slate-900 shadow-xl shadow-slate-800 hover:bg-slate-800 hover:shadow-none`}
    >
      <NewMark date={movie.postedAt} />
      <img
        onClick={onCardClick}
        src={getMediaPath(movie.posterPath)}
        alt={movie.name}
        className={`h-80 w-full`}
      />
      <div className="mx-2 mt-1 flex justify-between">
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
