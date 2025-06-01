"use client";

import React, { useState } from "react";

const Menu = () => {
  const [activeItem, setActiveItem] = useState("Início");

  const menuItems = [
    { name: "Início" },
    { name: "Transferências" },
    { name: "Investimentos" },
    { name: "Outros serviços" },
  ];

  return (
    <div className="w-full p-4 lg:p-2">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${
              activeItem === item.name
                ? "text-[#47A138] font-bold border-b-2 pb-4 border-[#47A138]"
                : "text-gray-600 border-b-2 pb-4 border-transparent"
            } cursor-pointer hover:text-[#47A138] text-center lg:text-left`}
            onClick={() => setActiveItem(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
