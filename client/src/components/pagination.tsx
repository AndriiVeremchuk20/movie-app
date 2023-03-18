import React from "react";

interface PropPagination {
  pages: number;
  currentPage: number;
}

const Pagination: React.FC<PropPagination> = ({ pages, currentPage }) => {
  const arr = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div className="flex w-full justify-center mt-3 text-2xl text-white font-bold">
      <div className="flex bg-neutral-700">
        <div className="flex">
          {arr.map((i) => (
            <div key={i} className={`p-2 cursor-pointer border-neutral-800 border-2  ${i===currentPage?"bg-cyan-800":"hover:bg-neutral-600"}`}>
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
