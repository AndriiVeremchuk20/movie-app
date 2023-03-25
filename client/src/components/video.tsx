import watched from "@/api/watched";
import appRoutes from "@/appRoutes";
import { appUserAtom, currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import getUserIP from "@/utils/getUserIP";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import DownloadButton from "./downloadButton";
import LikeButton from "./likeButton";
import ShareButton from "./shareButton";
import WatchLaterButton from "./watchLaterButton";

// for correct counting of views it is
// better to use onEnded event in video tag

const Video = () => {
  const [movie] = useAtom(currentMovieAtom);
  const [user] = useAtom(appUserAtom);
  const [isWatch, setIsWatch] = useState<boolean>(false);

  const onVideoPlay = useCallback(
    (e: any) => {
      console.log("video has been played");

      if (!isWatch&&movie) {
        console.log("play");
        watchedMovieMutation.mutate(movie.id);
      }

      setIsWatch(true);
    },
    [isWatch, movie]
  );

  const watchedMovieMutation = useMutation(watched.add, {
    onSuccess(data){
      console.log(data);
      console.log("Okke")
    },
    onError(){
      console.log("ne Okke")
    }
  })

  if (movie)
    return (
      <div className={`h-auto`}>
        {movie.isForPremium && !user?.isPremium ? (
          <div className="flex h-96 w-full rounded-t-lg bg-black">
            <div className="m-auto">
              <div className="flex text-2xl text-white">
                <div className="px-1"> Only for</div>
                <Link
                  href={appRoutes.premium}
                  className="font-bold text-yellow-600"
                >
                  Premium
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <video
            onPlay={onVideoPlay}
            className={`h-auto w-full rounded-t-lg outline-none`}
            controls
            disablePictureInPicture
          >
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
            <DownloadButton movieURL={getMediaPath(movie.moviePath)} />
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
