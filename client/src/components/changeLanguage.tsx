import { useRouter } from "next/router";
import React from "react";

export const ChangeLanguage = () => {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e: any) => {
    const { value } = e.target;
    console.log(router.pathname, router.asPath);
    router.push(router.pathname, router.asPath, { locale: value });
  };

  return (
    <select
      className=" mx-3 bg-inherit text-xl text-black outline-none dark:text-white"
      defaultValue={locale}
      onChange={changeLanguage}
    >
      <option
        value={"ua"}
        className="bg-neutral-500 text-2xl text-black outline-none dark:text-white"
      >
        🇺🇦 UA
      </option>
      <option
        value={"en"}
        className="bg-neutral-500 text-2xl text-black outline-none dark:text-white"
      >
        🇺🇸 EN
      </option>
    </select>
  );
};
