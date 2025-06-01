import React from "react";
import { Button as ButtonRoot } from "@/components/ui/button";

export default function ActionButton({
  content,
  colors = "blue",
  size,
  onClick,
}: {
  content: React.ReactNode;
  colors?: "orange" | "green" | "black" | "outline" | "outline-black" | "blue";
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "default";
}) {
  return (
    <ButtonRoot
      className={`p-0 text-white rounded-full radius hover:opacity-75 cursor-pointer transition-all duration-700 ease-in-out ${
        colors === "orange"
          ? "bg-[#FF5031] hover:bg-[#FF5031]"
          : colors === "green"
          ? "bg-[#47A138] hover:bg-[#47A138]"
          : colors === "black"
          ? "bg-[#000000] hover:bg-[#000000]"
          : colors === "outline-black"
          ? "bg-transparent border border-[#000000] text-[#000000] hover:bg-[#000000]"
          : colors === "blue"
          ? "bg-[#004D61] hover:bg-[#004D61]"
          : "bg-transparent border border-[#47A138] text-[#47A138] hover:bg-[#d9f3d542]"
      }`}
      actionSize={size}
      onClick={onClick}
    >
      {content}
    </ButtonRoot>
  );
}
