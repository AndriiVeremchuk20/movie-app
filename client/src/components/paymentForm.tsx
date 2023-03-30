import React, { useCallback, useEffect, useState } from "react";
import premium from "@/api/premium";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface CreditCard {
  num: string;
  data: string;
  ccv: string;
}

const PaymentForm: React.FC = () => {
  const [card, setCard] = useState<CreditCard>({ num: "", data: "", ccv: "" });
  const [isDisabledDutton, setIsDisabledButton] = useState<boolean>(true);

  const router = useRouter();

  const buyPremium = useMutation(premium.buyPremium, {
    onSuccess() {
      router.reload();
    },
    onError() {},
  });

  const onCardChange = useCallback((e: any) => {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onBuyPremiumClick = () => {
    buyPremium.mutate();
  };

  useEffect(() => {
    if (
      /^\d{16}$/.test(card.num) &&
      /^\d{4}$/.test(card.data) &&
      /^\d{3}$/.test(card.ccv)
    ) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [card]);

  return (
    <div className="h-auto w-[550px] rounded-3xl border-[4px] border-inherit border-black bg-[url('/img/bg-credit-card.jpg')] bg-cover">
      <div className="flex w-full flex-wrap gap-2 p-3">
        <label className="relative flex w-full flex-col">
          <span className="mb-3 text-xl font-bold text-white">Card number</span>
          <input
            className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
            type="text"
            name="num"
            placeholder="0000 0000 0000 0000"
            maxLength={16}
            onChange={onCardChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </label>

        <div className=" mt-[100px] mb-8 flex w-full justify-around pr-5">
          <label className="relative flex w-36 flex-col">
            <span className="mb-3 text-xl font-bold text-white">
              Expire date
            </span>
            <input
              className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
              type="text"
              placeholder="MM/YY"
              name="data"
              maxLength={4}
              onChange={onCardChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>

          <label className="relative flex w-24 flex-col">
            <span className="mb-3 flex items-center gap-3 text-xl font-bold text-white">
              CVC/CVV
              <span className="group relative">
                <span className="absolute -right-2 top-1/2 hidden w-max translate-x-full -translate-y-1/2 transform items-center justify-center bg-black px-2 py-1 text-xs text-white group-hover:flex">
                  {" "}
                  Hey ceci est une infobulle !
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </span>
            <input
              className="peer rounded-md border-2 border-gray-200 py-2 pl-12 pr-2 placeholder-gray-300"
              type="text"
              placeholder="&bull;&bull;&bull;"
              maxLength={3}
              name="ccv"
              onChange={onCardChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 -mb-0.5 h-6 w-6 translate-x-1/2 -translate-y-1/2 transform text-black peer-placeholder-shown:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </label>
        </div>
        <div className="h-10 w-full">
          <button
            type="submit"
            disabled={isDisabledDutton}
            onClick={onBuyPremiumClick}
            className="h-full w-full rounded-b-2xl bg-orange-400 text-xl font-bold text-white hover:bg-orange-600 disabled:bg-gray-500"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
