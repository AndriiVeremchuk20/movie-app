import Token from "@/utils/token";
import client from ".";
import { BaseMovie, Movie } from "../types/movie";

const paths = {
  getMovies: "/media/",
  getMovieById: (id: string) => `/media/${id}`, 
  searchMovies: (text: string) => `/media/search?search_query=${text}`,
};

const getMovies = async () => {
  const response = await client.get<Array<BaseMovie>>(paths.getMovies);
  return response.data;
};

const getMovieById = async (id: string) => {
  const token = Token.get() ?? "";
  const response = await client.get<Movie>(paths.getMovieById(id), {
    headers: {Authorization: `${token}`}
  });
  return response.data;
};

const searchMovies = async (keyWord: string) => {
  const response = await client.get<Array<BaseMovie>>(
    paths.searchMovies(keyWord)
  );
  return response.data;
};

const movies = {
  getMovies,
  getMovieById,
  searchMovies,
};

export default movies;
