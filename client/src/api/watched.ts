import { BaseMovie } from "@/types/movie";
import getUserIP from "@/utils/getUserIP";
import Token from "@/utils/token";
import client from ".";

const paths = {
  addWatched: (id: string) => `media/watched/${id}`,
  getWatched: "media/watched",
};

const addWatch = async (movieId: string) => {
  const token = Token.get() ?? "";
  const currUserIP = (await getUserIP()) ?? "";

  const resporse = await client.post<any>(
    paths.addWatched(movieId),
    {
      ip: currUserIP,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return resporse.data;
};

const getWatched = async () => {
  const token = Token.get();
  const resporse = await client.get<Array<BaseMovie>>(paths.getWatched, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resporse.data;
};

const watched = {
  addWatch,
  getWatched,
};

export default watched;
