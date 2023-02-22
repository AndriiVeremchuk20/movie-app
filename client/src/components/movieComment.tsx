import { currentMovieAtom } from '@/atom';
import { useAtom } from 'jotai';
import React from 'react'
import CommentsList from './commentsList';
import WriteComment from './writeComment';

const MovieComment = () => {
  const [movie] = useAtom(currentMovieAtom);
  
  if(movie)
  return (
    <div className='flex flex-col bg-indigo-900 py-5 mb-4 rounded-md  px-20'>
        <div className='w-full flex justify-center'>
            <WriteComment/>
        </div>
        <div>
            <CommentsList comments={movie.comments}/>
        </div>
    </div>
  )
  return null;
}

export default React.memo(MovieComment);
