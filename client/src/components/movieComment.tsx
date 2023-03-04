import { currentMovieAtom } from "@/atom";
import { useAtom } from "jotai";
import React from "react";
import CommentsList from "./commentsList";
import WriteComment from "./writeComment";

const MovieComment = () => {
  const [movie] = useAtom(currentMovieAtom);

  if (movie)
    return (
      <div className="mb-4 flex flex-col rounded-md bg-indigo-900 py-5  px-20">
        <div className="flex w-full justify-center">
          <WriteComment />
        </div>
        <div>
          <CommentsList comments={movie.comments} />
        </div>
      </div>
    );
  return null;
};

export default React.memo(MovieComment);