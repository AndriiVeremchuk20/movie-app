import watchLater from "@/api/watchLater";
import { appUserAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { MdAdd, MdDone } from "react-icons/md";

interface PropsLikeButton {
  movieId: string;
}

const AddButton: React.FC<PropsLikeButton> = ({ movieId }) => {
  const [user,setUser] = useAtom(appUserAtom);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const router = useRouter();

  const addToWatchLaterMutation = useMutation(watchLater.add,{
    onSuccess(data){
      console.log(data);
      if(user){
        setIsAdded(true);
        //setUser(()=>({...user, watchLater: [...user.watchLater]}));
      }
    },
    onError(e){
    
    }
  });

  const removeFromWatchLaterMutation = useMutation(watchLater.remove,{
    onSuccess(data){
      console.log(data);
      if(user){
        setIsAdded(false);
        //setUser(()=>({...user, watchLater: user.watchLater.filter(()=>true)}));
      }
    },
    onError(e){
    
    }
  });

  const onAddClick = useCallback(() => {
    if (user) {
      if(isAdded){
        removeFromWatchLaterMutation.mutate(movieId);
      }else{
        addToWatchLaterMutation.mutate(movieId);
      }
      setIsAdded((prev) => !prev);
    } else {
      const text = "To add movie to watchlist please log in.";
      if (confirm(text)) {
        router.push("/login");
      }
    }
  }, [user, isAdded]);

  useEffect(()=>{
    if(user){
      setIsAdded(user.watchLater.some(movie=>movie.id===movieId));
    }
  },[user]);

  return (
    <button
      onClick={onAddClick}
      className={`text-4xl m-1 flex justify-center text-blue-600 w-8 h-8`}
    >
      {isAdded ? <MdDone className=" text-green-600"/> : <MdAdd />}
    </button>
  );
};

export default React.memo(AddButton);
