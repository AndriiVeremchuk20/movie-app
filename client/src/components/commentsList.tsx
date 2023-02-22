import React from 'react'
import { Comment } from '@/types/comment'
import CommentCard from './commentCard'

interface PropCommentsList {
  comments: Array<Comment>
}

const CommentsList: React.FC<PropCommentsList> = ({comments}) => {
  return (
    <div className='flex flex-col my-6 gap-6'>
      {
        comments.map(comment => <CommentCard  key={comment.id} comment={comment}/>)
      }
    </div>
  )
}

export default React.memo(CommentsList);
