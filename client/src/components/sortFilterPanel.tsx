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
  const t = router.locale === "en" ? en : ua;

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
        <div className="mr-1">{t.filterPanel.genre}:</div>
        <select defaultValue={"ALL"} {...register("filter")}>
          <option value={"All"}>{t.genres["ALL"]}</option>
          <option value={"ACTION"}>{t.genres["ACTION"]}</option>
          <option value={"ADVENTURE"}>{t.genres["ADVENTURE"]}</option>
          <option value={"ANIMATION"}>{t.genres["ANIMATION"]}</option>
          <option value={"COMEDY"}>{t.genres["COMEDY"]}</option>
          <option value={"CRIME"}>{t.genres["CRIME"]}</option>
          <option value={"DRAMA"}>{t.genres["DRAMA"]}</option>
          <option value={"FANTASY"}>{t.genres["FANTASY"]}</option>
          <option value={"HORROR"}>{t.genres["HORROR"]}</option>
          <option value={"MYSTERY"}>{t.genres["MYSTERY"]}</option>
          <option value={"ROMANCE"}>{t.genres["ROMANCE"]}</option>
          <option value={"SCIENCE_FICTION"}>
            {t.genres["SCIENCE_FICTION"]}
          </option>
          <option value={"THRILLER"}>{t.genres["THRILLER"]}</option>
          <option value={"WESTERN"}>{t.genres["WESTERN"]}</option>{" "}
        </select>
      </div>
      <div className="flex child:mx-3">
        <button
          type="submit"
          className="text-blue-900 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-900"
        >
          {t.filterPanel.submit}
        </button>
        <button
          type="reset"
          className="text-blue-900 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-900"
        >
          {t.filterPanel.reset}
        </button>
      </div>
    </form>
  );
};

export default React.memo(SortFilterPanel);
