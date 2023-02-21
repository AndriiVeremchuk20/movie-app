import React from 'react'
import CommentsList from './commentsList';
import WriteComment from './writeComment';

const MovieComment = () => {
  return (
    <div className='flex flex-col bg-indigo-900 py-5 mb-4 rounded-md  px-20'>
        <div className='w-full flex justify-center'>
            <WriteComment/>
        </div>
        <div>
            <CommentsList/>
        </div>
    </div>
  )
}

export default React.memo(MovieComment);
