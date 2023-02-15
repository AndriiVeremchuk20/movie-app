import getMediaPath from "@/utils/getMediaPath";
import React from "react";
import DownloadButton from "./downloadButton";
import LikeDislikeButton from "./likeDislikeButton";
import ShareButton from "./shareButton";

interface PropsVideo {
  id: string;
  videoPath: string;
}

const Video: React.FC<PropsVideo> = ({ id, videoPath }) => {
  return (
    <div className={`h-auto`}>
      <video className={`w-full h-auto outline-none rounded-t-lg`} controls >
        <source src={getMediaPath(videoPath)} type="video/mp4" />
      </video>
      <div
        className={`bg-black text-white flex text-xl font-bold justify-around rounded-b-lg pb-4 pt-1`}
      >
        <div>
          <LikeDislikeButton movieId={id} />
        </div>
        <div>
          <DownloadButton id={id} movieURL={getMediaPath(videoPath)} />
        </div>
        <div>
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Video);
