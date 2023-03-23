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
        title="Up"
        onClick={onClick}
        className={`fixed bottom-28 right-20 animate-bounce 
      rounded-full bg-neutral-600 p-4 text-2xl text-opacity-90 outline-none dark:bg-neutral-200`}
      >
        <RiArrowUpFill />
      </div>
    );
  }

  return null;
};
