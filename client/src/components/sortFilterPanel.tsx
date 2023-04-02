import appRoutes from "@/appRoutes";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import ua from "@/locales/ua/translation";
import en from "@/locales/en/translation";

interface SelectValues {
  sort?: string;
  filter?: string;
}

const SortFilterPanel = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SelectValues>();
  const t = router.locale === "en"?en:ua;

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
        <div className="mr-1">{t.filterPanel.sort}:</div>
        <select defaultValue={"DATE_DOWN"} {...register("sort")}>
          <option value={"DATE_DOWN"}>{t.filterPanel.dt_dw}</option>
          <option value={"DATE_UP"}>{t.filterPanel.dt_up}</option>
          <option value={"NAME_UP"}>{t.filterPanel.n_up}</option>
          <option value={"NAME_DOWN"}>{t.filterPanel.n_dw}</option>
          <option value={"LIKES"}>{t.filterPanel.likes}</option>
          <option value={"WATCHED"}>{t.filterPanel.watched}</option>
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
      <div className="flex child:mx-3">
        <button
          type="submit"
          className="text-blue-900 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-900"
        >
          Submit
        </button>
        <button
          type="reset"
          className="text-blue-900 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-900"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default React.memo(SortFilterPanel);
