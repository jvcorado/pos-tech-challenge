"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, EyeClosed } from "lucide-react";

import {
  WelcomeIllustration,
  PixelsOneIllustration,
  PixelsTwoIllustration,
} from "@/assets";

type WelcomeSectionProps = {
  balance: number;
};

export default function WelcomeSection({ balance }: WelcomeSectionProps) {
  const [isShowBalance, setIsShowBalance] = useState(false);
  const currentFormatedDate = format(new Date(), "EEEE, dd/MM/yyyy", {
    locale: ptBR,
  });

  const capitalizedDate =
    currentFormatedDate.charAt(0).toUpperCase() + currentFormatedDate.slice(1);

  return (
    <div className="h-[655px] md:h-[402px] md:p-8 lg:h-[402px] m relative bg-[#004D61] h-96 flex flex-col items-center rounded-md pt-10 pb-10 justify-between">
      <div className="absolute top-0 left-0 md:left-auto md:right-0 lg:hidden h-[142px] w-[142px] md:h-[177px] md:w-[180px]">
        <PixelsOneIllustration className="w-full h-full" />
      </div>
      <div className="mr-[66px] ml-[66px] flex flex-col w-[180px] md:flex-row md:w-full">
        <div className="flex flex-col text-center md:text-left gap-[24px]">
          <p className="text-white text-2xl font-bold">Olá, Joana! :)</p>
          <p className="text-white text-xs font-normal">{capitalizedDate}</p>
        </div>
        <div className="md:ml-[122px] lg:ml-[226px]">
          <div className="flex justify-start mt-10 items-center">
            <p className="text-white text-xl font-normal mr-[25px]">Saldo</p>
            {isShowBalance ? (
              <Eye
                className="text-white lg:text-[#FF5031]"
                onClick={() => setIsShowBalance(!isShowBalance)}
              />
            ) : (
              <EyeClosed
                className="text-white lg:text-[#FF5031]"
                onClick={() => setIsShowBalance(!isShowBalance)}
              />
            )}
          </div>
          <div className="h-[2px] w-[180px] bg-white bg mt-4 mb-4 lg:bg-[#FF5031]" />
          <p className="text-white text-base font-normal">Conta Corrente</p>
          <p className="text-white text-3xl font-normal mt-2">
            {`R$ ${isShowBalance ? balance?.toFixed(2) : "***"}`}
          </p>
        </div>
      </div>
      <div className="md:absolute md:bottom-0 md:left-0 lg:hidden z-10">
        <WelcomeIllustration />
      </div>
      <div className="absolute bottom-0 right-0 md:right-auto md:left-0 lg:hidden h-[142px] w-[142px] md:h-[177px] md:w-[180px]">
        <PixelsTwoIllustration className="w-full h-full" />
      </div>
    </div>
  );
}
