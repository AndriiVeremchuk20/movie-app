import { Dislike, Like } from "./like";

export interface Movie {
  id: string;
  name: string;
  description: string;
  moviePath: string;
  posterPath: string;
  postedAt: string;
  likes: number;
}
