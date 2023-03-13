import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";

interface PropIsPremiumMark {
  isForPremium: boolean;
}

const IsPremiumMark: React.FC<PropIsPremiumMark> = ({ isForPremium }) => {
  const [user] = useAtom(appUserAtom);
  const premiumLink = (
    <Link
      href={appRoutes.premium}
      className=" absolute bg-amber-400 p-1 font-bold text-black"
    >
      Premium
    </Link>
  );

  if (!user && isForPremium) {
    return premiumLink;
  }

  return <>{isForPremium && user && !user.isPremium ? premiumLink : null}</>;
};

export default React.memo(IsPremiumMark);
