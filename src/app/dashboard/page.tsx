"use client";

import React, { useEffect, useState } from "react";
import WelcomeSection from "@/views/WelcomeSection";
import { Account } from "@/models/Account";

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function fetchBalance() {
        const account = new Account("joana");
        const bal = await account.getBalance();
        setBalance(bal);
    }

    fetchBalance();
  }, []);

  return (
    <div className="mt-4 ml-6 mr-6 md md:ml-15 md:mr-15">
      <WelcomeSection balance={balance} />
    </div>
  );
}
