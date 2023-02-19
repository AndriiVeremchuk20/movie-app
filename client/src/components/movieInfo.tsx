import { currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React from "react";
import NewMark from "./newMark";

const MovieInfo = () => {
  const [movie] = useAtom(currentMovieAtom);

  if (movie)
    return (
      <div className="bg-slate-300 text-black dark:text-white dark:bg-slate-900 flex justify-center rounded-lg">
        <div>
          <NewMark date={movie.postedAt} />
        </div>
        <img
          alt={movie.name}
          src={getMediaPath(movie.posterPath)}
          className={` w-80 h-auto rounded-l-lg`}
        />

        <div className={` w-3/4 divide-y mx-5`}>
          <div className={`flex justify-between mx-3 my-2 mt-4`}>
            <div className="text-3xl font-bold">{movie.name}</div>
            <div className="text-sm">{movie.postedAt.slice(0, 10)}</div>
          </div>
          <div className="text-justify overflow-y-auto">
            <div className={`my-5`}>{movie.description}</div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default React.memo(MovieInfo);
