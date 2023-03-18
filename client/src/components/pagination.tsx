import React from "react";

interface PropPagination {
  pages: number;
  currentPage: number;
}

const Pagination: React.FC<PropPagination> = ({ pages, currentPage }) => {
  const arr = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div className="mt-3 flex w-full justify-center text-2xl font-bold text-white">
      <div className="flex ">
        <div className="flex">
          {arr.map((i) => (
            <div
              key={i}
              className={`cursor-pointer m-1  bg-neutral-700 p-2 rounded-sm ${
                i === currentPage ? "bg-cyan-800" : "hover:bg-neutral-500"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
