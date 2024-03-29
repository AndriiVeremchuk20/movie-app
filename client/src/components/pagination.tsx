import appRoutes from "@/appRoutes";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface PropPagination {
  pages: number;
  currentPage: number;
}

const Pagination: React.FC<PropPagination> = ({ pages, currentPage }) => {
  const arr = Array.from({ length: pages }, (_, i) => i + 1);
  const router = useRouter();

  const onPageClick = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        router.push({
          pathname: appRoutes.home,
          query: { ...router.query, page: page },
        });
      }
    },
    [currentPage, router.query]
  );

  return (
    <div className="mt-3 flex w-full justify-center text-2xl font-bold text-white">
      <div className="flex ">
        <div className="flex">
          {arr.length > 1
            ? arr.map((i) => (
                <div
                  key={i}
                  className={`m-1 cursor-pointer  rounded-sm bg-neutral-700 p-2 ${
                    i === currentPage ? "bg-cyan-800" : "hover:bg-neutral-500"
                  }`}
                  onClick={() => {
                    onPageClick(i);
                  }}
                >
                  {i}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
