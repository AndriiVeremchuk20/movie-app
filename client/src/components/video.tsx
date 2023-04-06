import watched from "@/api/watched";
import appRoutes from "@/appRoutes";
import { appUserAtom, currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import DownloadButton from "./downloadButton";
import LikeButton from "./likeButton";
import ShareButton from "./shareButton";
import WatchLaterButton from "./watchLaterButton";
import { AiFillEye } from "react-icons/ai";
import { useRouter } from "next/router";

import en from "@/locales/en/translation";
import ua from "@/locales/ua/translation";

// for correct counting of views it is
// better to use onEnded event in video tag

const Video = () => {
  const [movie, setMovie] = useAtom(currentMovieAtom);
  const [user] = useAtom(appUserAtom);
  const [isWatch, setIsWatch] = useState<boolean>(false);
  const router = useRouter();
  const t = router.locale === "en" ? en : ua;

  const onVideoPlay = useCallback(() => {
    if (!isWatch && movie) {
      watchedMovieMutation.mutate(movie.id);
    }
    setIsWatch(true);
  }, [isWatch, movie]);

  const watchedMovieMutation = useMutation(watched.addWatch, {
    onSuccess(data) {
      if (movie) {
        setMovie({ ...movie, watched: (movie.watched += 1) });
      }
    },
  });

  if (movie)
    return (
      <div className={`h-auto`}>
        {movie.isForPremium && !user?.isPremium ? (
          <div className="flex h-96 w-full rounded-t-lg bg-black">
            <div className="m-auto">
              <div className="flex text-2xl text-white">
                <div className="px-1">{t.premiumPage.onlyFor}</div>
                <Link
                  href={appRoutes.premium}
                  className="font-bold text-yellow-600"
                >
                  {t.premiumPage.title}
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
          <div className="flex">
            <AiFillEye className="text-3xl" />
            <div>
              {movie.watched % 1000 < 0
                ? (movie.watched % 1000) + "k"
                : movie.watched}
            </div>
          </div>
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
