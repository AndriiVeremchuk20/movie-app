import { MovieGenre } from "@prisma/client";

export const getMovieGenreByName = (name: string): MovieGenre | undefined => {
  const genres: Record<string, MovieGenre> = {
    ACTION: MovieGenre.ACTION,
    ADVENTURE: MovieGenre.ADVENTURE,
    ANIMATION: MovieGenre.ANIMATION,
    COMEDY: MovieGenre.COMEDY,
    CRIME: MovieGenre.CRIME,
    DRAMA: MovieGenre.DRAMA,
    FANTASY: MovieGenre.FANTASY,
    HORROR: MovieGenre.HORROR,
    MYSTERY: MovieGenre.MYSTERY,
    ROMANCE: MovieGenre.ROMANCE,
    SCIENCE_FICTION: MovieGenre.SCIENCE_FICTION,
    THRILLER: MovieGenre.THRILLER,
    WESTERN: MovieGenre.WESTERN,
  };

  return genres[name];
};
