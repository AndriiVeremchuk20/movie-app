import appRoutes from '@/appRoutes';
import { appUserAtom } from '@/atom';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react'

interface PropIsPremiumMark {
    isForPremium: boolean
}

const IsPremiumMark: React.FC<PropIsPremiumMark> = ({isForPremium}) => {

  const [user] = useAtom(appUserAtom);

  return (
    <>
       {
        isForPremium&&user&&!user.isPremium?<Link href={appRoutes.premium} className=" absolute bg-amber-400 text-black font-bold p-1">Premium</Link>:null
      }
    </>
  )
};

export default React.memo(IsPremiumMark);
