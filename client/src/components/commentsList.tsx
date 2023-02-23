import React from "react";
import { Comment } from "@/types/comment";
import CommentCard from "./commentCard";

interface PropCommentsList {
  comments: Array<Comment>;
}

const CommentsList: React.FC<PropCommentsList> = ({ comments }) => {
  return (
    <div className="my-6 flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default React.memo(CommentsList);
