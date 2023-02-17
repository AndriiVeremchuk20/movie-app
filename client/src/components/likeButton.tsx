import like from "@/api/likeDislike";
import { appUserAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

interface PropLikeDislikeButton {
  id: string;
  numLikes: number;
}

const LikeDislikeButton: React.FC<PropLikeDislikeButton> = ({
  id,
  numLikes,
}) => {
  const [user, setUser] = useAtom(appUserAtom);
  const [likes, setLikes] = useState<number>(numLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();

  const likeMutation = useMutation(like.likeMovie, {
    onSuccess(data) {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
      if (user) {
        setUser(() => ({ ...user, likes: [...user.likes, data] }));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const deleteLikeMutation = useMutation(like.deleteLike, {
    onSuccess(data) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
      if (user) {
        setUser(() => ({
          ...user,
          likes: [...user.likes.filter((like) => like.id !== data.id)],
        }));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const onLikeClick = useCallback(() => {
    if (user) {
      if (isLiked) {
        deleteLikeMutation.mutate(id);
      } else {
        likeMutation.mutate(id);
      }
    }
    else{
      const text = "To like this movie please log in."
      if(confirm(text)){
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsLiked(user.likes.some((like) => like.movieId === id));
    }
  }, [user]);

  return (
    <div className={`text-3xl flex`}>
      <>{console.log("isLiked: " + isLiked )}</>
      <button
        onClick={onLikeClick}
        className={`flex ${isLiked ? "text-green-700" : ""}`}
      >
        <div>{likes}</div>
        <AiFillLike />
      </button>
    </div>
  );
};

export default React.memo(LikeDislikeButton);
