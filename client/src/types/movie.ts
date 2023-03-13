import { Comment } from "./comment";

export interface BaseMovie {
  id: string;
  name: string;
  posterPath: string;
  postedAt: string;
  isForPremium: boolean;
  genre: string;
}

export interface Movie extends BaseMovie {
  description: string;
  moviePath: string;
  likes: number;
  recommendations: Array<Movie>;
  comments: Array<Comment>;
}
