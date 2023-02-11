import getMediaPath from "@/utils/getMediaPath";
import React from "react";

interface PropsVideo {
  subPath: string;
}

const Video: React.FC<PropsVideo> = ({ subPath }) => {
  return (
    <div>
    
      <video width="750" height="500" controls>
        <source src={getMediaPath(subPath)} type="video/mp4" />
      </video>
    </div>
  );
};

export default React.memo(Video);
