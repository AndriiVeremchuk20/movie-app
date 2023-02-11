import client from "."
import { Movie } from "./types/movie";

const paths = {
    getMovies: "/media/",
}

const getMovies = async () => { 
    const response = await client.get<Array<Movie>>(paths.getMovies);
    return response.data;
}

const getMoviesById = async (id: string) => { 
    const response = await client.get<Movie>(paths.getMovies+id);
    return response.data;
}

const movies = {
    getMovies,
    getMoviesById,
}

export default movies;
