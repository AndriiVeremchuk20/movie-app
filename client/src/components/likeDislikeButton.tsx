import like from "@/api/likeDislike";
import { appUserAtom, currentMovieAtom } from "@/atom";
import { Like } from "@/types/like";
import { Movie } from "@/types/movie";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const LikeDislikeButton = () => {
  const [movie, setMovie] = useAtom(currentMovieAtom);
  const [user, setUser] = useAtom(appUserAtom);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  const likeMutation = useMutation(like.likeMovie, {
    onSuccess(data) {
      setIsLiked(true);
      setIsDisliked(false);
      setUser((prev) => {
        if (prev) {
          return { ...prev, likes: [...prev.likes, data] };
        }
        return null;
      });
      setMovie((prev) => {
        if (prev) {
          return { ...prev, likes: [...prev.likes, data] };
        }
        return null;
      });
    },
    onError(e) {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const dislikeMutation = useMutation(like.dislikeMovie, {
    onSuccess(data) {
      setIsDisliked(true);
      setIsLiked(false);
      setUser((prev) => {
        if (prev) {
          return { ...prev, dislikes: [...prev.dislikes, data] };
        }
        return null;
      });
      setMovie((prev) => {
        if (prev) {
          return { ...prev, dislikes: [...prev.dislikes, data] };
        }
        return null;
      });
    },
    onError(e) {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const deleteLikeMutation = useMutation(like.deleteLike, {
    onSuccess(data) {
      setIsLiked(false);
      setUser((prev) => {
        if (prev) {
          return { ...prev, likes: prev.likes.filter((like)=>like.id!==data.id) };
        }
        return null;
      });
      setMovie((prev) => {
        if (prev) {
          return { ...prev, likes: prev.likes.filter((like)=>like.id!==data.id) };
        }
        return null;
      });
    },
    onError(e) {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const deleteDislikeMutation = useMutation(like.deleteDislike, {
    onSuccess(data) {
      setIsDisliked(false);
      setUser((prev) => {
        if (prev) {
          return { ...prev, likes: prev.likes.filter((like)=>like.id!==data.id) };
        }
        return null;
      });
      setMovie((prev) => {
        if (prev) {
          return { ...prev, dislikes: prev.dislikes.filter((like)=>like.id!==data.id) };
        }
        return null;
      });
    },
    onError(e) {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const onLikeClick = useCallback(() => {
    if (movie) {
      if (isLiked) {
        deleteLikeMutation.mutate(movie.id);
      } else if (isDisliked) {
        deleteDislikeMutation.mutate(movie.id);
        likeMutation.mutate(movie.id);
      } else {
        likeMutation.mutate(movie.id);
      }
    }
  }, [isLiked, isDisliked]);

  const onDisikeClick = useCallback(() => {
    if (movie) {
      if (isDisliked) {
        deleteDislikeMutation.mutate(movie.id);
      } else if (isLiked) {
        deleteLikeMutation.mutate(movie.id);
        dislikeMutation.mutate(movie.id);
      } else {
        dislikeMutation.mutate(movie.id);
      }
    }
  }, [isLiked, isDisliked]);

  useEffect(() => {
    if (movie && user && user.likes) {
      setIsLiked(
        movie.likes.some((like) =>
          user.likes.some((userLike) => userLike.id === like.id)
        )
      );

      setIsDisliked(
        movie.dislikes.some((dislike) =>
          user.dislikes.some((userDisike) => userDisike.id === dislike.id)
        )
      );
    }
  }, [movie, user]);

  if (movie)
    return (
      <div className={`text-3xl flex`}>
        <button
          onClick={onLikeClick}
          className={`flex ${isLiked ? "text-green-700" : ""}`}
        >
          <div>{movie.likes.length}</div>
          <AiFillLike />
        </button>
        /
        <button
          onClick={onDisikeClick}
          className={`flex ${isDisliked ? "text-red-700" : ""}`}
        >
          <div>{movie.dislikes.length}</div>
          <AiFillDislike />
        </button>
      </div>
    );
  return null;
};

export default React.memo(LikeDislikeButton);
