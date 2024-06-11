"use client";
import Column from "@/components/Column";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(""); //controls the active element to update styles

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Column active={active} setActive={setActive} />
    </main>
  );
}
