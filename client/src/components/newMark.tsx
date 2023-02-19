import isNewMovie from "@/utils/isNewMovie";
import React, { useState } from "react";

interface PropNewMark {
  date: string;
}

const NewMark: React.FC<PropNewMark> = ({ date }) => {
  const show = isNewMovie(date);

  if (show) {
    return (
      <div className={`absolute w-14 h-8 text-2xl font-bold bg-orange-500`}>
        New
      </div>
    );
  }

  return null;
};

export default React.memo(NewMark);
