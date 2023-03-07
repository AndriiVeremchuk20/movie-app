import { BaseMovie } from "@/types/movie";
import Token from "@/utils/token";
import client from ".";

const paths = {
  getPremiumMovies: "/user/premium",
  buyPremium: "/user/premium",
};

const buyPremium = async () => {
  const token = Token.get();
  const response = await client.put<any>(paths.buyPremium, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getPremiumMovies = async () => {
  const response = await client.get<Array<BaseMovie>>(paths.getPremiumMovies);
  return response.data;
};

const premium = {
  buyPremium,
  getPremiumMovies,
};

export default premium;
