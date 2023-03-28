import commentApi from "@/api/comments";
import { appUserAtom, currentMovieAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";

interface Comment {
  text: string;
}

const WriteComment = () => {
  const [movie, setMovie] = useAtom(currentMovieAtom);
  const [user] = useAtom(appUserAtom);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Comment>();

  const commentMutation = useMutation(commentApi.post, {
    onSuccess(data) {
      console.log(data);
      if (movie && user) {
        setMovie({
          ...movie,
          comments: [
            {
              id: data.id,
              text: data.text,
              posted_at: data.posted_at,
              User: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarPath: user.avatarPath,
              },
            },
            ...movie.comments,
          ],
        });
      }
      reset();
    },
  });

  const onSubmit: SubmitHandler<Comment> = (data) => {
    if (movie) commentMutation.mutate({ text: data.text, movieId: movie.id });
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="Write comment"
          className="h-20 w-full resize-none p-2 outline-none"
          {...register("text", {
            required: true,
            minLength: 2,
            maxLength: 1000,
          })}
        />
        <button
          type="submit"
          className="flex h-auto w-16 bg-blue-600 text-white hover:bg-blue-700"
        >
          <MdSend className="m-auto text-2xl" />
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
