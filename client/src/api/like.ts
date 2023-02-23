import { Like } from "@/types/like";
import { BaseMovie } from "@/types/movie";
import Token from "@/utils/token";
import client from ".";

const paths = {
  like: "/user/likes/",
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

const deleteLike = async (movieId: string) => {
  const token = Token.get();
  const response = await client.delete<Like>(`${paths.like}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getLikedMovies = async () => {
  const token = Token.get();
  const response = await client.get<Array<BaseMovie>>(`${paths.like}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const like = {
  likeMovie,
  deleteLike,
  getLikedMovies,
};

export default like;
