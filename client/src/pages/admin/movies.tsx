import admin from "@/api/admin";
import appRoutes from "@/appRoutes";
import { Loader } from "@/components/loader";
import { isAuthed } from "@/utils/isAuthed";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
  isPremium: boolean;
  postedAt: string;
  genre: string;
};

const Movies = () => {
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onPosterChange = useCallback((e: any) => {
    setPosterFile(e.target.files[0]);
  }, []);

  const onMovieChange = useCallback((e: any) => {
    setMovieFile(e.target.files[0]);
  }, []);

  const addMovie = useMutation(admin.movies.addMovie, {
    onSuccess(data) {
      console.log(data);
      reset();
    },
    onError() {},
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (movieFile && posterFile) {
      const body = new FormData();
      body.append("movie", movieFile);
      body.append("poster", posterFile);
      body.append("name", data.name);
      body.append("isPremium", data.isPremium + "");
      body.append("description", data.description);
      body.append("postedAt", data.postedAt);

      addMovie.mutate(body);
    }
  };

  useEffect(() => {
    if (!isAuthed()) {
      router.replace(appRoutes.login);
    }
  }, []);
  
  return (
    <div className={`flex h-screen w-full bg-sky-600`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={` m-auto mt-24  w-auto rounded-md bg-cyan-700 p-2`}
      >
        <div className={`text-3xl font-bold`}>Add Movie</div>
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
              {...register("name", { required: "name Required" })}
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
              {...register("description", { required: "name description" })}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="poster"
            className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
          >
            Poster file:
          </label>
          <input
            type="file"
            id="poster"
            className={`block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400`}
            onChange={onPosterChange}
          />
        </div>
        <div>
          <label
            htmlFor="movie"
            className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
          >
            Movie file:
            <input
              type="file"
              id="movie"
              className={`block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400`}
              onChange={onMovieChange}
            />
          </label>
        </div>

        <div className="flex">
          <div className="mr-1">Genre:</div>
          <select {...register("genre", {required: "Genre requiured"})}>
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
            {...register("isPremium")}
          />
        </div>
        <div className="frex mb-2">
          <label htmlFor="postedAt" className={``}>
            Posted date:
          </label>
          <input type="date" id="postedAt" {...register("postedAt")} />
        </div>
        <div className="flex w-full flex-col">
          <button
            type="submit"
            className={`m-1 flex w-full justify-center bg-lime-600 p-1 font-bold text-white hover:bg-lime-800`}
          >
            {addMovie.isLoading ? <Loader /> : "Post"}
          </button>
          <button
            type="reset"
            className={`m-1 w-full bg-lime-600 p-1 font-bold text-white hover:bg-lime-800`}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Movies;
