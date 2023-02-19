import { currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React from "react";
import NewMark from "./newMark";

const MovieInfo = () => {
  const [movie] = useAtom(currentMovieAtom);

  if (movie)
    return (
      <div className="flex justify-center rounded-lg bg-slate-300 text-black dark:bg-slate-900 dark:text-white">
        <div>
          <NewMark date={movie.postedAt} />
        </div>
        <img
          alt={movie.name}
          src={getMediaPath(movie.posterPath)}
          className={` h-auto w-80 rounded-l-lg`}
        />

        <div className={` mx-5 w-3/4 divide-y`}>
          <div className={`mx-3 my-2 mt-4 flex justify-between`}>
            <div className="text-3xl font-bold">{movie.name}</div>
            <div className="text-sm">{movie.postedAt.slice(0, 10)}</div>
          </div>
          <div className="overflow-y-auto text-justify">
            <div className={`my-5`}>{movie.description}</div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default React.memo(MovieInfo);
