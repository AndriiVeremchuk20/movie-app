import like from "@/api/likeDislike";
import { appUserAtom, currentMovieAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

interface PropLikeDislikeButton {
  id: string;
  numLikes: number;
  numDislikes: number;
}

const LikeDislikeButton: React.FC<PropLikeDislikeButton> = ({
  id,
  numLikes,
  numDislikes,
}) => {
  const [user, setUser] = useAtom(appUserAtom);
  const [likes, setLikes] = useState<number>(numLikes);
  const [dislikes, setDislikes] = useState<number>(numDislikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  const likeMutation = useMutation(like.likeMovie, {
    onSuccess(data) {
      setIsLiked(true);
      setLikes(prev=>prev+1);
      setDislikes(prev=>prev-1);
      setIsDisliked(false);
      if (user) {
        setUser(() => ({ ...user, likes: [...user.likes, data]}));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const dislikeMutation = useMutation(like.dislikeMovie, {
    onSuccess(data) {
      setIsLiked(false);
      setIsDisliked(true);
      setDislikes(prev=>prev+1);
      if (user) {
        setUser(() => ({ ...user, dislikes: [...user.dislikes, data] }));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const deleteLikeMutation = useMutation(like.deleteLike, {
    onSuccess(data) {
      setIsLiked(false);
      setIsDisliked(false);
      setLikes(prev=>prev-1);
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

  const deleteDislikeMutation = useMutation(like.deleteDislike, {
    onSuccess(data) {
      setIsLiked(false);
      setIsDisliked(false);
      setDislikes(prev=>prev-1);

      if (user) {
        setUser(() => ({
          ...user,
          dislikes: [
            ...user.dislikes.filter((dislike) => dislike.id !== data.id),
          ],
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
      }  else {
        likeMutation.mutate(id);
      }
    }
  }, []);

  const onDisikeClick = useCallback(() => {
    if (user) {
      if (isDisliked) {
        deleteDislikeMutation.mutate(id);
      }  else {
        dislikeMutation.mutate(id);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsLiked(user.likes.some((like) => like.movieId === id));
      setIsDisliked(user.dislikes.some((dislike) => dislike.movieId === id));
    }
  }, [user]);

  return (
    <div className={`text-3xl flex`}>
      <>{console.log("isLiked: " + isLiked + " isDisliked: " + isDisliked)}</>
      <button
        onClick={onLikeClick}
        className={`flex ${isLiked ? "text-green-700" : ""}`}
      >
        <div>{likes}</div>
        <AiFillLike />
      </button>
      /
      <button
        onClick={onDisikeClick}
        className={`flex ${isDisliked ? "text-red-700" : ""}`}
      >
        <div>{dislikes}</div>
        <AiFillDislike />
      </button>
    </div>
  );
};

export default React.memo(LikeDislikeButton);
