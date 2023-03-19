import React from "react";

const SortFilterPanel = () => {
  return (
    <div className={`mt-2 flex w-full bg-red-500`}>
      <div>
        Sort by:
        <select>
          <option>Date down</option>
          <option>Date up</option>
          <option>Name</option>
          <option>Likes</option>
        </select>
      </div>

      <div>
        Genre:
        <select>
          <option>All</option>
          <option>ACTION</option>
          <option>ADVENTURE </option>
          <option>ANIMATION</option>
          <option>COMEDY</option>
          <option>CRIME</option>
          <option>DRAMA</option>
          <option>FANTASY</option>
          <option>HORROR</option>
          <option>MYSTERY</option>
          <option>ROMANCE</option>
          <option>SCIENCE_FICTION </option>
          <option>THRILLER</option>
          <option>WESTERN</option>
        </select>
      </div>

      <button>Reset</button>
    </div>
  );
};

export default React.memo(SortFilterPanel);
