import React, { useCallback, useState } from 'react'

export const ScrollBar = () => {

  const [value, setValue] = useState<number>(
    document.documentElement.scrollTop / document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  );

  const handleScroll = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setValue((winScroll / height) * 100);
  }, []);

  window.addEventListener("scroll", handleScroll);  

  return (
    <div className='w-full h-1'>
     <div className={`bg-blue-600 h-full`} style={{width: `${value}%`}}>
    </div>   
    </div>
  )
}

export default React.memo(ScrollBar);
