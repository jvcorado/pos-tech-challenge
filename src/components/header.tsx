"use client";

import { CircleUserRound, LogOut, Menu } from "lucide-react";
import React, { useState } from "react";
import { useBank } from "@/context/BankContext";
import { useAuth } from "@/context/AuthContext";
import MenuWrapper from "./menuWrapper";
import { usePathname } from "next/navigation";
;

export default function Header() {
  const { account } = useBank();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
const [isMenuIconOpen, setIsMenuIconOpen] = useState(false);
  return (
    <header className="bg-[#004D61] h-24 flex items-center justify-between px-6 sticky top-0 left-0 z-50">
      <span className="text-white font-bold text-base capitalize">
        {account.name}
      </span>
         {isDashboard && (
          <div className="hidden lg:block left-0">
            <Menu
              strokeWidth={1}
              color="#ffffff"
              size={28}
              className="cursor-pointer"
              onClick={() => setIsMenuIconOpen((prev) => !prev)}
            />

            {isMenuIconOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded shadow z-50">
                <MenuWrapper />
              </div>
            )}
          </div>
        )}
      

      <div className="relative flex items-center gap-4 cursor-pointer">
        <CircleUserRound
          strokeWidth={1}
          color="#FF5031"
          size={40}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />

        {/* Menu Dropdown no mobile */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded shadow z-50 ">
            <div className="block lg:hidden">
              <MenuWrapper />
            </div>
            

            {/* Logout no menu (opcional, redundante) */}
            <div className="border-t p-2 ">
              <button
                onClick={logout}
                className="text-red-500  flex items-center gap-2 w-full text-center text-sm  cursor-pointer"
              >
                <LogOut /> Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
