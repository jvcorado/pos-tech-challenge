"use client";

import React, { Suspense } from "react";
import Menu from "./menu";

export default function MenuWrapper() {
  return (
    <Suspense fallback={<div>Carregando menu...</div>}>
      <Menu />
    </Suspense>
  );
}
