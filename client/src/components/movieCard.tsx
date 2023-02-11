import { Movie } from "@/api/types/movie";
import getMediaPath from "@/utils/getMediaPath";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import LikeButton from "./likeButton";

interface PropsMovieCard {
  movie: Movie;
}

const cutName = (name: string, maxSpaces: number) => {
  name = name[0].charAt(0).toUpperCase() + name.slice(1); //capitalize first letter
  return name.split(" ").length > maxSpaces
    ? name.split(" ").slice(0, 3).join(" ") + "..."
    : name;
};

const MovieCard: React.FC<PropsMovieCard> = ({ movie }) => {
  const router = useRouter();

  const onCardClick = useCallback(() => {
    router.push(`/movie/${movie.id}`);
  }, []);

  return (
    <div
      className={`w-60 h-96 bg-slate-900 shadow-slate-800 shadow-xl hover:shadow-none cursor-pointer`}
    >
      <img
        onClick={onCardClick}
        src={getMediaPath(movie.posterPath)}
        alt={movie.name}
        className={`w-full h-80`}
      />
      <div className="flex justify-between mt-1 mx-2">
        <div onClick={onCardClick} className={`text-white`}>
          <div className={`text-xl`}>{cutName(movie.name, 3)}</div>
          <div className={`text-sm`}>{movie.year.slice(0, 4)}</div>
        </div>
        <LikeButton isLiked={false} movieId={movie.id} />
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
