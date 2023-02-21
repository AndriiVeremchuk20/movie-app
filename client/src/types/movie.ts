export interface Movie {
  id: string;
  name: string;
  posterPath: string;
  postedAt: string;
}

export interface MovieAllInfo extends Movie {
  description: string;
  moviePath: string;
  likes: number;
  recommendations: Array<Movie>;
}
