import { appUserAtom, currentMovieAtom } from "@/atom";
import { useAtom } from "jotai";
import React from "react";
import CommentsList from "./commentsList";
import WriteComment from "./writeComment";

const MovieComment = () => {
  const [movie] = useAtom(currentMovieAtom);
  const [user] = useAtom(appUserAtom);

  if (movie)
    return (
      <div className="mb-4 flex flex-col rounded-md bg-neutral-900 bg-opacity-40 py-5  px-20">
        {user ? (
          <div className="flex w-full justify-center">
            <WriteComment />
          </div>
        ) : null}
        {movie.comments.length !== 0 ? (
          <div>
            <CommentsList comments={movie.comments} />
          </div>
        ) : null}
      </div>
    );
  return null;
};

export default React.memo(MovieComment);
