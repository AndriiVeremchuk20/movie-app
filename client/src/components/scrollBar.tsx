import React, { useCallback, useEffect, useState } from "react";

export const ScrollBar = () => {
  const [value, setValue] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setValue((winScroll / height) * 100);
  }, []);

  useEffect(() => {
    setValue(
      document.documentElement.scrollTop /
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    );
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-1 w-full">
      <div
        className={`h-full bg-blue-600`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default React.memo(ScrollBar);
