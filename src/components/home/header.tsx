"use client";
import React, { useState } from "react";
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import Logo from "../../../public/Logo.png";
import LogoTablet from "../../../public/Logo_tablet.png";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-black text-white px-4 md:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Menu Mobile */}
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-4">
          {/* Menu hamburger */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <Menu className="text-green-500" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-green-500 font-bold text-xl"
          >
            {/* Desktop Logo */}
            <Image
              src={Logo}
              alt="logo"
              width={150}
              height={32}
              className="hidden md:hidden lg:block mr-8"
            />
            {/* Tablet Logo */}
            <Image
              src={LogoTablet}
              alt="logo tablet"
              width={20}
              height={20}
              className="hidden md:block lg:hidden mr-8"
            />
            {/* Mobile Logo */}
            <Image
              src={Logo}
              alt="logo mobile"
              width={100}
              height={20}
              className="block md:hidden lg:hidden"
            />
          </Link>
        </div>
        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/sobre" className="hover:text-green-400 transition">
            Sobre
          </Link>
          <Link href="/servicos" className="hover:text-green-400 transition">
            Serviços
          </Link>
        </nav>
        {/* Ações */}
        <div className="hidden md:flex ml-auto gap-2">
          <Button
            colors="green"
            text="Abrir minha conta"
            onClick={() => router.push("/register")}
          />
          <Button
            colors="outline"
            text="Já tenho conta"
            onClick={() => router.push("/login")}
          />
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-4">
            <Link href="/sobre" className="hover:text-green-400 transition">
              Sobre
            </Link>
            <Link href="/servicos" className="hover:text-green-400 transition">
              Serviços
            </Link>
          </nav>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              colors="green"
              text="Abrir minha conta"
              onClick={() => router.push("/register")}
            />
            <Button
              colors="outline"
              text="Já tenho conta"
              onClick={() => router.push("/login")}
            />
          </div>
        </div>
      )}
    </header>
  );
}
