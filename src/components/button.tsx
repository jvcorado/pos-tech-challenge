import React from "react";
import { Button as ButtonRoot } from "@/components/ui/button";

export default function Button({
  onClick,
  text,
  colors = "orange",
  className,
}: {
  onClick?: () => void;
  text: string;
  colors?: "orange" | "green" | "black" | "outline" | "outline-black";
  className?: string;
}) {
  return (
    <ButtonRoot
      onClick={onClick}
      className={`${className} h-12 text-white hover:opacity-75 cursor-pointer transition-all duration-700 ease-in-out ${
        colors === "orange"
          ? "bg-[#FF5031] hover:bg-[#FF5031] w-full"
          : colors === "green"
          ? "bg-[#47A138] hover:bg-[#47A138] w-[144px]"
          : colors === "black"
          ? "bg-[#000000] hover:bg-[#000000] w-[144px]"
          : colors === "outline-black"
          ? "bg-transparent border border-[#000000] text-[#000000] hover:bg-[#000000] w-[144px]"
          : "bg-transparent border border-[#47A138] text-[#47A138] hover:bg-[#d9f3d542] w-[144px]"
      }`}
    >
      {text}
    </ButtonRoot>
  );
}
