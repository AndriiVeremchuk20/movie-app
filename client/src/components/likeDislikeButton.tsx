import React from 'react'
import {AiFillDislike, AiFillLike} from "react-icons/ai"

const LikeDislikeButton = () => {
  return (
    <div className={`text-3xl`}>
        <button>
            <AiFillLike/>
        </button>
        /
        <button>
            <AiFillDislike/>
        </button>
    </div>
  )
}

export default React.memo(LikeDislikeButton);
