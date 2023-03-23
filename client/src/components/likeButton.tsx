import like from "@/api/like";
import { appUserAtom, currentMovieAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

const LikeButton = () => {
  const [user, setUser] = useAtom(appUserAtom);
  const [movie, setMovie] = useAtom(currentMovieAtom);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();

  const likeMutation = useMutation(like.likeMovie, {
    onSuccess(data) {
      setIsLiked(true);
      if (user && movie) {
        setUser(() => ({ ...user, likes: [...user.likes, data.movieId] }));
        setMovie(() => ({ ...movie, likes: movie.likes + 1 }));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const deleteLikeMutation = useMutation(like.deleteLike, {
    onSuccess(data) {
      setIsLiked(false);
      if (user && movie) {
        setUser(() => ({
          ...user,
          likes: [...user.likes.filter((like) => like !== data.movieId)],
        }));
        setMovie(() => ({ ...movie, likes: movie.likes - 1 }));
      }
    },
    onError() {
      alert("Oh! Something is wrong... please try again later.");
    },
  });

  const onLikeClick = useCallback(() => {
    if (!user) {
      const text = "To like this movie please log in.";
      if (confirm(text)) {
        router.push("/login");
      }
    } else if (user && movie) {
      if (isLiked) {
        deleteLikeMutation.mutate(movie.id);
      } else {
        likeMutation.mutate(movie.id);
      }
    }
  }, [user, movie, isLiked]);

  useEffect(() => {
    if (user && movie) {
      setIsLiked(user.likes.some((like) => like === movie.id));
    }
  }, [user, movie]);

  if (movie)
    return (
      <div className={`flex text-3xl`}>
        <button
          title={`${isLiked?"Hide like":"Like it"}`}
          onClick={onLikeClick}
          className={`flex ${isLiked ? "text-green-600" : ""}`}
        >
          <div>{movie.likes}</div>
          <AiFillLike />
        </button>
      </div>
    );
  return null;
};

export default React.memo(LikeButton);
