import { currentMovieAtom } from "@/atom";
import getMediaPath from "@/utils/getMediaPath";
import { useAtom } from "jotai";
import React from "react";
import DownloadButton from "./downloadButton";
import LikeDislikeButton from "./likeDislikeButton";
import ShareButton from "./shareButton";

const Video = () => {

  const [movie] = useAtom(currentMovieAtom);

  if(movie)
  return (
    <div className={`h-auto`}>
      <video className={`w-full h-auto outline-none rounded-t-lg`} controls >
        <source src={getMediaPath(movie.moviePath)} type="video/mp4" />
      </video>
      <div
        className={`bg-black text-white flex text-xl font-bold justify-around rounded-b-lg pb-4 pt-1`}
      >
        <div>
          <LikeDislikeButton/>
        </div>
        <div>
          <DownloadButton id={movie.id} movieURL={getMediaPath(movie.moviePath)} />
        </div>
        <div>
          <ShareButton />
        </div>
      </div>
    </div>
  );
  return null;
};

export default React.memo(Video);
