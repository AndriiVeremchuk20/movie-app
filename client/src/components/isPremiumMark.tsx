import appRoutes from "@/appRoutes";
import { appUserAtom } from "@/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import en from "@/locales/en/translation";
import ua from "@/locales/ua/translation";

interface PropIsPremiumMark {
  isForPremium: boolean;
}

const IsPremiumMark: React.FC<PropIsPremiumMark> = ({ isForPremium }) => {
  const router = useRouter();
  const t = router.locale === "en"? en: ua;
  const [user] = useAtom(appUserAtom);
  const premiumLink = (
    <Link
      href={appRoutes.premium}
      className=" absolute bg-amber-400 p-1 font-bold text-black"
    >
      {t.premiumPage.title}
    </Link>
  );

  if (!user && isForPremium) {
    return premiumLink;
  }

  return <>{isForPremium && user && !user.isPremium ? premiumLink : null}</>;
};

export default React.memo(IsPremiumMark);
