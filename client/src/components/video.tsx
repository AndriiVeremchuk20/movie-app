import getMediaPath from "@/utils/getMediaPath";
import React from "react";

interface PropsVideo {
  subPath: string;
}

const Video: React.FC<PropsVideo> = ({ subPath }) => {
  return (
    <div className={`h-auto`}>
      <video className={`w-full h-auto outline-none rounded-t-lg`} controls>
        <source src={getMediaPath(subPath)} type="video/mp4" />
      </video>
      <div className={`bg-black text-white flex text-xl font-bold justify-around rounded-b-lg pb-4 pt-1`}> 
        <div>Like/Dislike</div>
        <div>Download</div>
        <div>Send</div>
      </div>
    </div>
  );
};

export default React.memo(Video);
