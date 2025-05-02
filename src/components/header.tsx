import { CircleUserRound } from "lucide-react";
import React from "react";
import Container from "./container";

export default function Header() {
  return (
    <header className="bg-[#004D61] h-24 flex items-center justify-end">
      <Container className="flex items-center justify-end gap-10">
        <p className="text-white font-semibold text-sm">
          Joana da Silva Oliveira
        </p>
        <CircleUserRound strokeWidth={1} color="#FF5031" size={40} />
      </Container>
    </header>
  );
}
