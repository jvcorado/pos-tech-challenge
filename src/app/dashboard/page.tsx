"use client";

import WelcomeSection from "@/views/WelcomeSection";
import NewTransactions from "@/components/newTransaction";
import TransactionsSection from "@/views/TransactionsSection";
import MenuWrapper from "@/components/menuWrapper";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 py-6 px-4 w-full  md:h-[calc(100vh_-_6rem)] max-w-screen-xl mx-auto mb-6 lg:mb-0 h-full">
      {/* Menu lateral (vira horizontal em telas menores) */}
      <div className="bg-white w-full max-w-[282px] h-full rounded-[8px] hidden lg:block">
        <MenuWrapper />
      </div>

      {/* Seção principal */}
      <div className="flex flex-col justify-between  h-full flex-1 gap-9 w-full">
        <WelcomeSection />
        <NewTransactions />

        {/* TransactionsSection em mobile */}
        <div className="block lg:hidden bg-white rounded-[8px] w-full p-4">
          <TransactionsSection />
        </div>
      </div>

      {/* TransactionsSection fixo em desktop */}
      <div className="hidden lg:block bg-white  w-full max-w-[282px] h-full rounded-[8px] p-4">
        <TransactionsSection />
      </div>
    </div>
  );
}
