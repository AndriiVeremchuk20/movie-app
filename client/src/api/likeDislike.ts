import { Dislike, Like } from "@/types/like";
import Token from "@/utils/token";
import client from "./";

const paths = {
  like: "likes/like",
  dislike: "likes/dislike",
};

const likeMovie = async (movieId: string) => {
  const token = Token.get();
  const response = await client.post<Like>(
    paths.like,
    { movieId: movieId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

const dislikeMovie = async (movieId: string) => {
  const token = Token.get();
  const response = await client.post<Dislike>(
    paths.dislike,
    { movieId: movieId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const deleteLike = async (movieId: string) => {
  const token = Token.get();
  const response = await client.delete<Like>(`${paths.like}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteDislike = async (movieId: string) => {
  const token = Token.get();
  const response = await client.delete<Dislike>(`${paths.dislike}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const like = {
  likeMovie,
  dislikeMovie,
  deleteDislike,
  deleteLike,
};

export default like;
