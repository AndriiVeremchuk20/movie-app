import admin from "@/api/requests/admin";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
};

const Movies = () => {
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const {
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

  const addMovie = useMutation(admin.addMovie, {
    onSuccess(data){
      console.log(data);
    },
    onError(){

    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
   
    if(movieFile && posterFile){
      const body = new FormData();
      body.append("movie", movieFile);
      body.append("poster", posterFile);
      body.append("name", data.name);
      body.append("description", data.description);

      addMovie.mutate(body);
    }

  };

  return (
    <div className={`w-full h-screen flex bg-sky-600`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`m-auto  w-auto bg-cyan-700 p-2 rounded-md`}
      >
        <div className={`text-3xl font-bold`}>Add Movie</div>
        <div>
          <label
            htmlFor="name"
            className={`mb-2 p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
          >
            Name:
            <input
              id="name"
              type="text"
              className={`text-xl mx-2 my-1 outline-none rounded-md px-2 py-1 text-black`}
              {...register("name", { required: "name Required" })}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="desc"
            className={`p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
          >
            Descriptions:
            <textarea
              id="desc"
              className={`outline-none resize-none rounded-md w-11/12 h-72 text-sm text-black p-2 m-3`}
              {...register("description", { required: "name description" })}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="poster"
            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
          >
            Poster file:
          </label>
          <input
            type="file"
            id="poster"
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
            onChange={onPosterChange}
          />
        </div>
        <div>
          <label
            htmlFor="movie"
            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
          >
            Movie file:
            <input
              type="file"
              id="movie"
              className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
              onChange={onMovieChange}
            />
          </label>
        </div>
        <div className="w-full flex flex-col">
          <button
            type="submit"
            className={`m-1 p-1 w-full bg-lime-600 text-white hover:bg-lime-800 font-bold`}
          >
            {
              addMovie.isLoading? "Wait": "Post"
            }
          </button>
          <button
            type="reset"
            className={`m-1 p-1 w-full bg-lime-600 text-white hover:bg-lime-800 font-bold`}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Movies;
