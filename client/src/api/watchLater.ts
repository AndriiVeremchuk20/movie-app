// /watchLater
import { Movie } from "@/types/movie";
import { WatchLater } from "@/types/watchLater";
import Token from "@/utils/token";
import client from ".";

const paths = {
  main: "user/watch-later/",
};

//post delete

const add = async (movieId: string) => {
  const token = Token.get();
  const resporse = await client.post<WatchLater>(
    paths.main,
    { movieId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return resporse.data;
};

const remove = async (movieId: string) => {
  const token = Token.get();
  const resporse = await client.delete<WatchLater>(`${paths.main}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resporse.data;
};

const getMovies = async () => {
  const token = Token.get();
  const resporse = await client.get<Array<Movie>>(paths.main, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resporse.data;
};

const watchLater = {
  add,
  remove,
  getMovies,
};

export default watchLater;
