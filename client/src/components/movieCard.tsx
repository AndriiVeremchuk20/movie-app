import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import { BaseMovie } from "@/types/movie";
import getMediaPath from "@/utils/getMediaPath";
import getShortName from "@/utils/getShortName";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import IsPremiumMark from "./isPremiumMark";
import NewMark from "./newMark";
import WatchLaterButton from "./watchLaterButton";

interface PropsMovieCard {
  movie: BaseMovie;
}

const cutName = (name: string, maxSpaces: number) => {
  return name.split(" ").length > maxSpaces
    ? name.split(" ").slice(0, 3).join(" ") + "..."
    : name;
};

const MovieCard: React.FC<PropsMovieCard> = ({ movie }) => {
  const router = useRouter();
  const [user] = useAtom(appUserAtom);

  const onCardClick = useCallback(() => {
    router.push(appRoutes.movie(movie.id));
  }, []);

  return (
    <div
      className={`h-fit w-60 cursor-pointer bg-neutral-900 bg-opacity-70 pb-2 shadow-sm shadow-blue-800 hover:bg-neutral-800 hover:shadow-none`}
    >
      <NewMark date={movie.postedAt} />
      <IsPremiumMark isForPremium={movie.isForPremium} />
      <img
        onClick={onCardClick}
        src={getMediaPath(movie.posterPath)}
        alt={movie.name}
        className={`h-72 w-full`}
      />
      <div className="mx-2 mt-1 flex justify-between">
        <div onClick={onCardClick} className={`text-white`}>
          <div className={`text-md`}>{getShortName(movie.name, 13)}</div>
          <div className="text-sm">{movie.genre}</div>
          <div className={`text-sm`}>{movie.postedAt.slice(0, 4)}</div>
        </div>
        <div className="my-auto">
          <WatchLaterButton movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
