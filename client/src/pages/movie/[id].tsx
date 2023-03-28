import movies from "@/api/movies";
import MovieInfo from "@/components/movieInfo";
import Video from "@/components/video";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { appUserAtom, currentMovieAtom } from "@/atom";
import Recommendations from "@/components/recommendations";
import MovieComment from "@/components/movieComment";
import Head from "next/head";
import EditMovieForm from "@/components/editMovieForm";
import admin from "../../api/admin";
import appRoutes from "@/appRoutes";

const MoviePage = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAtom(appUserAtom);
  const [currentMovie, setCurrentMovie] = useAtom(currentMovieAtom);

  const getMovieByIdMutation = useMutation(movies.getMovieById, {
    onSuccess(data) {
      setCurrentMovie(data);
    },
    onError(e) {},
  });

  const deleteMutation = useMutation(admin.movies.deleteMovie, {
    onSuccess(data){
      console.log(data);
      alert("Delete succes");
      setCurrentMovie(null);
      router.replace(appRoutes.home);
    },
    onError(e){
      console.log(e);
    }
  });

  const onDeleteClick = useCallback(()=>{
    if(currentMovie){
      if(confirm("Do you want to delete this movie?")){
        deleteMutation.mutate(currentMovie.id);
      }
    }
  },[currentMovie])

  const onEditClick = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const hideForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      getMovieByIdMutation.mutate(id);
    }
    return () => {
      setCurrentMovie(null);
    };
  }, [id]);

  if (currentMovie)
    return (
      <>
        <Head>
          <title>{currentMovie.name}</title>
        </Head>

        <div
          className={`flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900`}
        >
          <div className={`mt-32  flex w-3/4 flex-col`}>
            <MovieInfo />
            {user && user.role === "ADMIN" ? (
              <div className="mt-10 h-16 w-fit border-[4px] border-red-500">
                <div className="mt-3 flex child:mx-2">
                  <button
                    onClick={onEditClick}
                    className={`bg-orange-500 py-1 px-3 font-bold text-white`}
                  >
                    Edit
                  </button>
                  <button
                    className={`bg-red-600 py-1 px-3 font-bold text-white `}
                    onClick={onDeleteClick}
                  >
                    Delete
                  </button>
                </div>
                {showEditForm ? (
                  <EditMovieForm movie={currentMovie} hideCallback={hideForm} />
                ) : null}
              </div>
            ) : null}
            <div className={`my-10 h-auto w-full`}>
              <Video />
            </div>
            <div>
              <Recommendations movies={currentMovie.recommendations} />
            </div>
            <div>
              <MovieComment />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div
      className={`flex max-h-fit min-h-screen justify-center bg-lime-100 dark:bg-sky-900`}
    >
      Movie not found
    </div>
  );
};

export default MoviePage;
