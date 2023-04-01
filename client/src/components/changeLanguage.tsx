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
    <select defaultValue={locale} onChange={changeLanguage}>
      <option hidden>eee</option>
      <option value={"ua"}>UA</option>
      <option value={"en"}>EN</option>
    </select>
  );
};
