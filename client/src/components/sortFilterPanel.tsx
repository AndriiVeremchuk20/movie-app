import appRoutes from "@/appRoutes";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SelectValues {
  sort?: string;
  filter?: string;
}

const SortFilterPanel = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SelectValues>();

  const onSubmit: SubmitHandler<SelectValues> = (data) => {
    router.push({
      pathname: appRoutes.home,
      query: {
        ...router.query,
        ...data,
      },
    });
  };

  const onResetClick = useCallback(() => {
    router.push({
      pathname: appRoutes.home,
    });
  }, []);

  return (
    <form
      className={`text-md mt-1 flex w-full bg-neutral-500 bg-opacity-70 p-2 child:ml-4`}
      onReset={onResetClick}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex">
        <div className="mr-1">Sort by:</div>
        <select defaultValue={"DATE_DOWN"} {...register("sort")}>
          <option value={"DATE_DOWN"}>Date down</option>
          <option value={"DATE_UP"}>Date up</option>
          <option value={"NAME_UP"}>Name up</option>
          <option value={"NAME_DOWN"}>Name down</option>
          <option value={"LIKES"}>Likes</option>
        </select>
      </div>

      <div className="flex">
        <div className="mr-1">Genre:</div>
        <select defaultValue={"ALL"} {...register("filter")}>
          <option value={"All"}>All</option>
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

      <button type="reset">Reset</button>
      <button type="submit" onClick={onResetClick}>
        Submit
      </button>
    </form>
  );
};

export default React.memo(SortFilterPanel);
