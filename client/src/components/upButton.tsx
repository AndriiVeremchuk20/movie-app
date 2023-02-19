import React, { useCallback, useEffect, useState } from "react";
import { RiArrowUpFill } from "react-icons/ri";

export const UpButton = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setShow(position > 100);
  };

  const onClick = useCallback(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (show) {
    return (
      <div
        onClick={onClick}
        className={`rounded-full outline-none text-2xl p-4 
      bg-lime-200 dark:bg-indigo-500 fixed bottom-28 right-20 animate-bounce`}
      >
        <RiArrowUpFill />
      </div>
    );
  }

  return null;
};
