import { currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React from "react";
import IsPremiumMark from "./isPremiumMark";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/router";

import en from "@/locales/en/translation";
import ua from "@/locales/ua/translation";

const MovieInfo = () => {
  const [movie] = useAtom(currentMovieAtom);
  const router = useRouter();
  const t = router.locale === "en" ? en : ua;

  if (movie)
    return (
      <div className="flex justify-center bg-neutral-300 bg-opacity-50 text-black dark:bg-neutral-900 dark:bg-opacity-70 dark:text-white">
        <div>
          <IsPremiumMark isForPremium={movie.isForPremium} />
        </div>
        <img
          alt={movie.name}
          src={getMediaPath(movie.posterPath)}
          className={` h-auto w-80 rounded-l-lg`}
        />

        <div className={` mx-5 w-3/4 divide-y`}>
          <div className={`mx-3 my-2 mt-4 flex justify-between`}>
            <div>
              <div className="flex text-3xl font-bold">
                {movie.name}{" "}
                {movie.isForPremium ? (
                  <AiFillStar className="text-2xl text-yellow-400" />
                ) : null}
              </div>
              <div>{t.genres[movie.genre]}</div>
            </div>

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
