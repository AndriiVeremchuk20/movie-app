import appRoutes from "@/appRoutes";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const NoPage = () => {
  const router = useRouter();

  const onReloadClic = useCallback(() => {
    router.reload();
  }, []);

  const onBackClick = useCallback(() => {
    router.back();
  }, []);

  const onHomeClick = useCallback(() => {
    router.replace(appRoutes.home);
  }, []);

  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className=" flex h-screen bg-gradient-to-r from-sky-300 to-indigo-300 dark:from-neutral-600 dark:to-neutral-800">
        <div className="m-auto text-black dark:text-white">
          <div className="text-[200px] font-bold">404 :(</div>
          <div className="text-4xl">Page not found..</div>
          <div className="w-96">
            <button
              onClick={onBackClick}
              className="m-1 rounded-md bg-sky-500 px-4 py-3 text-xl text-white hover:bg-blue-700 dark:bg-blue-500"
            >
              Back
            </button>
            <button
              onClick={onHomeClick}
              className="m-1 rounded-md bg-sky-500 px-4 py-3 text-xl text-white hover:bg-blue-700 dark:bg-blue-500"
            >
              Home
            </button>
            <button
              onClick={onReloadClic}
              className="m-1 rounded-md bg-sky-500 px-4 py-3 text-xl text-white hover:bg-blue-700 dark:bg-blue-500"
            >
              Try Reload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
