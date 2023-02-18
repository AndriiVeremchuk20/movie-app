import { currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import DownloadButton from "./downloadButton";
import LikeButton from "./likeButton";
import ShareButton from "./shareButton";
import WatchLaterButton from "./watchLaterButton";

const Video = () => {
  const [movie] = useAtom(currentMovieAtom);

  if (movie)
    return (
      <div className={`h-auto`}>
        <video className={`w-full h-auto outline-none rounded-t-lg`} controls>
          <source src={getMediaPath(movie.moviePath)} type="video/mp4" />
        </video>
        <div
          className={`bg-black text-white flex text-xl font-bold justify-around rounded-b-lg py-4`}
        >
          <div className="hover:animate-pulse">
            <LikeButton />
          </div>
          <div>
            <WatchLaterButton movieId={movie.id} />
          </div>
          <div className="hover:animate-pulse">
            <DownloadButton
              id={movie.id}
              movieURL={getMediaPath(movie.moviePath)}
            />
          </div>
          <div className="hover:animate-pulse">
            <ShareButton />
          </div>
        </div>
      </div>
    );
  return null;
};

export default React.memo(Video);
