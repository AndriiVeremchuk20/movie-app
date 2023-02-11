import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface PropsLikeButton {
  isLiked: boolean;
  movieId: string;
}

const LikeButton: React.FC<PropsLikeButton> = ({ isLiked, movieId }) => {
  const [user] = useAtom(appUserAtom);
  const [showLike, setShowLike] = useState<boolean>(isLiked);
  const router = useRouter();

  const onLikeClick = useCallback(() => {
    if (user) {
      setShowLike((prev) => !prev);
    }
    else{
      const text = "To add movie to watchlist please log in."
      if(confirm(text)){
        router.push("/login");
      }
    }
  }, [user]);

  return (
    <button onClick={onLikeClick} className={`text-2xl m-1 flex justify-center text-red-600 w-8 h-8`}>
      {showLike ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default React.memo(LikeButton);
