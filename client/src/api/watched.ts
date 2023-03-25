import getUserIP from "@/utils/getUserIP";
import Token from "@/utils/token";
import client from ".";

const paths = {
  main: (id: string) => `media/watched/${id}`,
};

const add = async (movieId: string) => {
  const token = Token.get() ?? "";
  const currUserIP = await getUserIP() ?? "";
 
  const resporse = await client.post<any>(
    paths.main(movieId),
    {
      ip: currUserIP,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return resporse.data;
};

const watched = {
  add,
};

export default watched;
