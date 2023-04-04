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
    <select className=" mx-3 bg-inherit dark:text-white text-black outline-none text-xl" defaultValue={locale} onChange={changeLanguage}>
      <option value={"ua"} className="bg-neutral-500 dark:text-white text-black outline-none text-2xl">🇺🇦 UA</option>
      <option value={"en"} className="bg-neutral-500 dark:text-white text-black outline-none text-2xl">🇺🇸 EN</option>
    </select>
  );
};
