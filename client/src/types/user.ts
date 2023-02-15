import { Like } from "./like";

export interface User {
    firstName: String;
    lastName: String;
    age: Number;
    email: String;
    likes: Array<Like>;
    dislikes: Array<Like>;
}
