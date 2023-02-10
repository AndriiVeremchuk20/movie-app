import { Movie } from '@/api/types/movie';
import getMediaPath from '@/utils/getMediaPath';
import React from 'react'

interface PropsMovieCard {
  movie: Movie;
}

const MovieCard: React.FC<PropsMovieCard> = ({movie}) => {
  return (
    <div className={`w-72 h-96 bg-slate-900`}>
      <img src={getMediaPath(movie.posterPath)} alt={movie.name} className={`w-full h-80`} />
    </div>
  )
}

export default React.memo(MovieCard);
