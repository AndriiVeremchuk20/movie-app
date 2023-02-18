import { Like } from "./like";
import { Movie } from "./movie";
import { WatchLater } from "./watchLater";

export interface User {
    firstName: String;
    lastName: String;
    age: Number;
    email: String;
    likes: Array<Like>;
    vieved: Array<Movie>;
    watchLater: Array<WatchLater>;
}
