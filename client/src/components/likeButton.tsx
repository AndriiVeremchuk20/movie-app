import React from 'react'

interface PropsLikeButton {
    isLiked: boolean;
    movieId: string;
}

const LikeButton:React.FC<PropsLikeButton> = ({isLiked, movieId}) => {
  return (
    <div>likeButton</div>
  )
}

export default React.memo(LikeButton);
