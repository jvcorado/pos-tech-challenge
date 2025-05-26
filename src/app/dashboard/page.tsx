"use client";

import WelcomeSection from "@/views/WelcomeSection";
import Menu from "@/components/menu";
import NewTransactions from "@/components/new_transactions";
import TransactionsSection from "@/views/TransactionsSection";

export default function Dashboard() {
  return (
    <div className="flex  justify-center h-[calc(100vh_-_6rem)] gap-6 py-6  w-full">
      <div className="bg-white w-44 rounded-[8px]">
        <Menu />
      </div>
      <div className="flex flex-col items-center gap-9 ">
        <WelcomeSection />
        <NewTransactions />
        <div className="block max-h-[600px] lg:hidden bg-white rounded-[8px] w-full p-4">
          <TransactionsSection />
        </div>
      </div>
      <div className="hidden lg:block bg-white w-[282px] rounded-[8px] p-4">
        <TransactionsSection />
      </div>
    </div>
  );
}
