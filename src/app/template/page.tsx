import Button from "@/components/button";
import Container from "@/components/container";
import React from "react";
import Favicon48 from "../../../public/Favicon 48px.png";
import Favicon64 from "../../../public/favicon-64px.png";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import MenuWrapper from "@/components/menuWrapper";

export default function template() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold ">Template</h1>
      {/*   <Input />
      <Select /> */}
      <Button text="Concluir transação" />
      <Button colors="green" text="Concluir" />
      <Button colors="outline" text="Já tenho conta" />
      <Button colors="green" text="Abrir minha conta" />

      <div className="bg-red-300">
        <Container className="flex items-center justify-end gap-10 bg-red-100">
          <p className="text-black font-semibold text-sm">
            Joana da Silva Oliveira
          </p>
        </Container>
      </div>

      <div className="flex ">
        <div className="w-14 h-24 bg-[#004D61]"></div>
        <div className="w-14 h-24 gradient"></div>
        <div className="w-14 h-24 bg-[#FF5031]"></div>
        <div className="w-14 h-24 bg-[#DEE9EA]"></div>
        <div className="w-14 h-24 bg-[#F8F8F8]"></div>
      </div>

      <MenuWrapper />

      {/* 25px */}
      <p className="text-black text-2xl  font-normal">
        The quick brown fox jumps over the lazy dog
      </p>

      {/* 20px */}
      <p className="text-black text-xl  font-normal">
        The quick brown fox jumps over the lazy dog
      </p>

      {/* 25px */}
      <p className="text-black text-base font-normal">
        The quick brown fox jumps over the lazy dog
      </p>

      {/* 13px */}
      <p className="text-black text-xs font-normal">
        The quick brown fox jumps over the lazy dog
      </p>

      <Image src={Favicon48} alt="favicon 48" width={48} height={48} />
      <Image src={Favicon64} alt="favicon 64" width={64} height={64} />
      <Image src={Logo} alt="logo" width={150} height={32} />

      <div className="flex flex-col w-60">
        <p className="font-bold text-2xl mb-6">Extrato</p>
        <p className="text-[#47A138] text-xs font-normal mb-2">Novembro</p>
        <div className="flex items-center justify-between">
          <p className="text-base font-normal">Depósito</p>
          <p className="text-[#8B8B8B] text-xs">18/11/2022</p>
        </div>

        <p className="text-base font-semibold">R$ 150</p>
      </div>
    </div>
  );
}
