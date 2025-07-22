import React from "react";
import { Button as ButtonRoot } from "@/components/ui/button";

export default function Button({
  onClick,
  type = "button",
  text,
  disabled = false,
  colors = "orange",
  className,
}: {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  disabled?: boolean;
  colors?:
    | "orange"
    | "green"
    | "black"
    | "dark-blue"
    | "outline"
    | "outline-black";
  className?: string;
}) {
  const colorsMap = {
    orange: "bg-[#FF5031] hover:bg-[#FF5031]",
    green: "bg-[#47A138] hover:bg-[#47A138]",
    black: "bg-[#000000] hover:bg-[#000000]",
    "dark-blue": "bg-[#004D61] hover:bg-[#004D61]",
    "outline-black":
      "bg-transparent border border-[#000000] text-[#000000] hover:bg-[#000000]",
    outline:
      "bg-transparent border border-[#47A138] text-[#47A138] hover:bg-[#d9f3d542]",
  };

  return (
    <ButtonRoot
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className} h-12 text-white hover:opacity-75 cursor-pointer transition-all duration-700 ease-in-out ${colorsMap[colors]} w-[144px] 
        disabled:opacity-70 disabled:pointer-events-none`}
    >
      {text}
    </ButtonRoot>
  );
}
