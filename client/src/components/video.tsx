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
        <video className={`h-auto w-full rounded-t-lg outline-none`} controls>
          <source src={getMediaPath(movie.moviePath)} type="video/mp4" />
        </video>
        <div
          className={`flex justify-around rounded-b-lg bg-black py-4 text-xl font-bold text-white`}
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
