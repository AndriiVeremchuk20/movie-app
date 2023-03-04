import client from ".";
import { BaseMovie, Movie } from "../types/movie";

const paths = {
  getMovies: "/media/",
  searchMovies: (text: string) => `/media/search?search_query=${text}`,
};

const getMovies = async () => {
  const response = await client.get<Array<BaseMovie>>(paths.getMovies);
  return response.data;
};

const getMoviesById = async (id: string) => {
  const response = await client.get<Movie>(paths.getMovies + id);
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
  getMoviesById,
  searchMovies,
};

export default movies;
