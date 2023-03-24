import admin from "@/api/admin";
import { EditMovieBody } from "@/api/types/movie";
import { currentMovieAtom } from "@/atom";
import { Movie } from "@/types/movie";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PropEditMovieForm {
  movie: Movie;
  hideCallback: () => void;
}

const EditMovieForm: React.FC<PropEditMovieForm> = ({
  movie,
  hideCallback,
}) => {
  const router = useRouter();
  const [, setCurrMovie] = useAtom(currentMovieAtom);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMovieBody>();

  const editMovieMutation = useMutation(admin.movies.editMovie, {
    onSuccess(data){
      setCurrMovie(data);
      hideCallback();
      router.reload();
    },
    onError(){

    }
  })

  const onSubmit: SubmitHandler<EditMovieBody> = (data) => {
    console.log(data);
    editMovieMutation.mutate({id: movie.id, body: data });
   };

  const onReset = useCallback(()=>{
    reset();
  },[])

  return (
    <div className="fixed top-0 left-0 w-screen h-full z-10 flex bg-gray-500 bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={` m-auto mt-24 w-fit rounded-md bg-cyan-700 p-2`}
      >
        <div className={`text-3xl font-bold`}>Edit Movie</div>
        <div>
          <label
            htmlFor="name"
            className={`mb-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400`}
          >
            Name:
            <input
              id="name"
              type="text"
              className={`mx-2 my-1 rounded-md px-2 py-1 text-xl text-black outline-none`}
              {...register("name", { required: "name Required", value: movie.name })}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="desc"
            className={`block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400`}
          >
            Descriptions:
            <textarea
              id="desc"
              className={`m-3 h-72 w-11/12 resize-none rounded-md p-2 text-sm text-black outline-none`}
              {...register("description", { required: "name description", value: movie.description})}
            />
          </label>
        </div>

        <div className="flex">
          <div className="mr-1">Genre:</div>
          <select {...register("genre", { required: "Genre requiured", value: movie.genre})}>
            <option hidden>Genre</option>
            <option value={"ACTION"}>Action</option>
            <option value={"ADVENTURE"}>Adventure</option>
            <option value={"ANIMATION"}>Animation</option>
            <option value={"COMEDY"}>Comedy</option>
            <option value={"CRIME"}>Crime</option>
            <option value={"DRAMA"}>Drama</option>
            <option value={"FANTASY"}>Fantasy</option>
            <option value={"HORROR"}>Horror</option>
            <option value={"MYSTERY"}>Mystery</option>
            <option value={"ROMANCE"}>Romance</option>
            <option value={"SCIENCE_FICTION"}>Science fiction</option>
            <option value={"THRILLER"}>Thriller</option>
            <option value={"WESTERN"}>Western</option>
          </select>
        </div>

        <div className="frex mb-2">
          <label htmlFor="isPremium" className={``}>
            Is premium:
          </label>
          <input
            type="checkbox"
            id="isPremium"
            className={`ml-2 h-5 w-5`}
            {...register("isForPremium",{value: movie.isForPremium})}
          />
        </div>
        <div className="frex mb-2">
          <label htmlFor="postedAt" className={``}>
            Posted date:
          </label>
          <input type="date" id="postedAt" {...register("postedAt",{value: new Date(movie.postedAt).toDateString()})} />
        </div>
        <div className="flex w-full flex-col">
          <button
            type="submit"
            className={`m-1 flex w-full justify-center bg-lime-600 p-1 font-bold text-white hover:bg-lime-800`}
          >
            Save
          </button>
          <button
            type="button"
            onClick={onReset}
            className={`m-1 w-full bg-lime-600 p-1 font-bold text-white hover:bg-lime-800`}
          >
            Reset
          </button>
          <button
            onClick={hideCallback}
            type="button"
            className={`m-1 w-full bg-lime-600 p-1 font-bold text-white hover:bg-lime-800`}
          >
            Hide
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(EditMovieForm);
