import commentApi from "@/api/comments";
import { currentMovieAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { FormEvent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";

interface Comment {
  text: string;
}

const WriteComment = () => {
  const [movie] = useAtom(currentMovieAtom);
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Comment>();

  const commentMutation = useMutation(commentApi.post, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const onSubmit: SubmitHandler<Comment> = (data) => {
    if (movie) commentMutation.mutate({ text: data.text, movieId: movie.id });
    reset();
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="Write comment"
          className="h-20 w-full resize-none p-2 outline-none"
          {...register("text", {
            required: true,
            minLength: 10,
            maxLength: 1000,
          })}
        />
        <button
          type="submit"
          className="flex h-auto w-16 bg-blue-600 text-white hover:bg-blue-400"
        >
          <MdSend className="m-auto" />
        </button>
      </form>
      {errors.text && (
        <span className="text-md m-3 rounded-md border-2 border-red-700 bg-red-400 p-2 text-red-700">
          Invalind comment
        </span>
      )}
    </div>
  );
};

export default React.memo(WriteComment);
