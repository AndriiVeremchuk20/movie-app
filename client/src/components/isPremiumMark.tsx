import React from 'react'

interface PropIsPremiumMark {
    isForPremium: boolean
}

const IsPremiumMark: React.FC<PropIsPremiumMark> = ({isForPremium}) => {
  return (
    <>
     {
        isForPremium?<div className=" absolute bg-amber-400 text-black font-bold p-1">Premium</div>:null
      }
    </>
  )
};

export default React.memo(IsPremiumMark);
