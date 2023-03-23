import React from "react";
import { RiDownloadFill } from "react-icons/ri";

interface PropDownloadButton {
  movieURL: string;
}

const DownloadButton: React.FC<PropDownloadButton> = ({ movieURL }) => {
  return (
    <a title="Download" className={`text-3xl focus:text-green-600`} href={movieURL} download>
      <RiDownloadFill />
    </a>
  );
};

export default React.memo(DownloadButton);
