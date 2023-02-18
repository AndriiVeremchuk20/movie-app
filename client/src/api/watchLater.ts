// /watchLater

import Token from "@/utils/token";
import client from ".";

const paths = {
  main: "/watchLater/",
};

//post delete

const add = async (movieId: string) => {
  const token = Token.get();
  const resporse = await client.post(paths.main, {movieId}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resporse.data;
};

const remove = async (movieId: string) => {
  const token = Token.get();
  const resporse = await client.delete(`${paths.main}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return resporse.data;
};

const watchLater = {
  add,
  remove,
};

export default watchLater;
