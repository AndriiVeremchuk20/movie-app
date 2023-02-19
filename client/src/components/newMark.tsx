import isNewMovie from "@/utils/isNewMovie";
import React, { useState } from "react";

interface PropNewMark {
  date: string;
}

const NewMark: React.FC<PropNewMark> = ({ date }) => {
  const show = isNewMovie(date);

  if (show) {
    return (
      <div className={`absolute h-8 w-14 bg-orange-500 text-2xl font-bold`}>
        New
      </div>
    );
  }

  return null;
};

export default React.memo(NewMark);
