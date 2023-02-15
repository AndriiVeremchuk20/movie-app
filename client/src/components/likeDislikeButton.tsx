import like from '@/api/likeDislike'
import { useMutation } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import {AiFillDislike, AiFillLike} from "react-icons/ai"

interface PropsLikeDislikeButton {
  movieId: string;
}

const LikeDislikeButton: React.FC<PropsLikeDislikeButton> = ({movieId}) => {
  
  const likeMutation = useMutation(like.likeMovie, {
    onSuccess(data){
      console.log(data);
    },
    onError(e){
      
    }
  });

  const dislikeMutation = useMutation(like.dislikeMovie, {
    onSuccess(data){
      console.log(data);
    },
    onError(e){
      
    }
  });

  const deleteLikeMutation = useMutation(like.deleteLike, {
    onSuccess(data){
      console.log(data);
    },
    onError(e){
      
    }
  });

  const deleteDislikeMutation = useMutation(like.deleteDislike, {
    onSuccess(data){
      console.log(data);
    },
    onError(e){
      
    }
  });

  const onLikeClick = useCallback(()=>{
    likeMutation.mutate(movieId);
  }, []);

  const onDisikeClick = useCallback(()=>{
    dislikeMutation.mutate(movieId);
  }, []);

  
  return (
    <div className={`text-3xl`}>
        <button onClick={onLikeClick}>
            <AiFillLike/>
        </button>
        /
        <button onClick={onDisikeClick}>
            <AiFillDislike/>
        </button>
    </div>
  )
}

export default React.memo(LikeDislikeButton);
