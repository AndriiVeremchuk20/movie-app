import { appUserAtom } from "@/atom";
import { Comment } from "@/types/comment";
import { useAtom } from "jotai";
import React from "react";
import UserAvatar from "./userAvatar";

interface PropCommentCard {
  comment: Comment;
}

const CommentCard: React.FC<PropCommentCard> = ({ comment }) => {
  const [user] = useAtom(appUserAtom);

  return (
    <div
      className={`m-auto flex h-fit w-11/12 ${
        user && user.id === comment.User.id ? "flex-row-reverse" : ""
      } content-center`}
    >
      <div className=" m-2 flex flex-col">
        <div className=" h-20 w-20">
          <UserAvatar avatarPath={comment.User.avatarPath} />
        </div>
        <div className="m-auto">{comment.User.firstName.slice(0, 10)}</div>
      </div>
      <div
        className={`flex h-fit w-fit flex-col rounded-lg p-4 text-xl
      ${
        user && user.id === comment.User.id
          ? " flex-row-reverse bg-slate-400 pr-10"
          : "bg-slate-200"
      }
      
      justify-between shadow-md hover:shadow-black`}
      >
        <div>{comment.text}</div>
        <div className="text-sm">{comment.posted_at.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default React.memo(CommentCard);
