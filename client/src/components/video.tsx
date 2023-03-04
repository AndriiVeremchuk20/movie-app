import { appUserAtom, currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React from "react";
import DownloadButton from "./downloadButton";
import LikeButton from "./likeButton";
import ShareButton from "./shareButton";
import WatchLaterButton from "./watchLaterButton";

const Video = () => {
  const [movie] = useAtom(currentMovieAtom);
  const [user] = useAtom(appUserAtom);

  if (movie)
    return (
      <div className={`h-auto`}>
        {movie.isForPremium && !user?.isPremium? (
          <div className="flex h-96 w-full rounded-t-lg bg-black">
            <div className="m-auto">
              <div className="flex text-2xl text-white">
                <div className="px-1"> Only for</div>
                <div className="font-bold text-yellow-600">Premium</div>
              </div>
            </div>
          </div>
        ) : (
          <video className={`h-auto w-full rounded-t-lg outline-none`} controls>
            <source src={getMediaPath(movie.moviePath)} type="video/mp4" />
            <source src={getMediaPath(movie.moviePath)} type="video/mkv" />
          </video>
        )}
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
