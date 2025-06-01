"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const menuItems = [
    { name: "Início", path: "/dashboard" },
    { name: "Transferências", path: "/maintenance?name=Transferências" },
    { name: "Investimentos", path: "/maintenance?name=Investimentos" },
    { name: "Outros serviços", path: "/maintenance?name=Outros serviços" },
  ];

  const currentName =
    pathname === "/dashboard"
      ? "Início"
      : searchParams.get("name") || "Início";

  const handleClick = (item: (typeof menuItems)[number]) => {
    router.push(item.path);
  };

  return (
    <div className="w-full p-4 lg:p-2">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${
              currentName === item.name
                ? "text-[#47A138] font-bold border-b-2 pb-4 border-[#47A138]"
                : "text-gray-600 border-b-2 pb-4 border-transparent"
            } cursor-pointer hover:text-[#47A138] text-center lg:text-left`}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
