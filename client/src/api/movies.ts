import client from "."
import { Movie } from "./types/movie";

const paths = {
    getMovies: "/media",
}

const getMovies = async () => { 
    const response = await client.get<Array<Movie>>(paths.getMovies);
    return response.data;
}

const movies = {
    getMovies,
}

export default movies;
