import { Like } from "./like";
import { Movie } from "./movie";

export interface User {
    firstName: String;
    lastName: String;
    age: Number;
    email: String;
    likes: Array<Like>;
    vieved: Array<Movie>;
    watchLater: Array<Movie>;
}
