import { Comment } from "./comment";

export interface BaseMovie {
  id: string;
  name: string;
  posterPath: string;
  postedAt: string;
  isForPremium: boolean;
  genre:
    | "ALL"
    | "ACTION"
    | "ADVENTURE"
    | "ANIMATION"
    | "COMEDY"
    | "CRIME"
    | "DRAMA"
    | "FANTASY"
    | "HORROR"
    | "MYSTERY"
    | "ROMANCE"
    | "SCIENCE_FICTION"
    | "THRILLER"
    | "WESTERN";
}

export interface Movie extends BaseMovie {
  description: string;
  moviePath: string;
  likes: number;
  watched: number;
  recommendations: Array<Movie>;
  comments: Array<Comment>;
}
