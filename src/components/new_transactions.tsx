"use client";

import { useState } from "react";
import { Transaction } from "@/models/Transaction";
import { TransactionType } from "@/models/TransactionType";

import Select from "./select";
import Input from "./input";
import Button from "./button";
import { useBank } from "@/context/BankContext";

export default function NewTransactions() {
  const { addTransaction, refresh } = useBank();

  const [type, setType] = useState<TransactionType>(TransactionType.INCOME);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    const parsedAmount = parseFloat(amount.replace(",", "."));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Valor inválido.");
      return;
    }

    try {
      setError(null);
      const tx = new Transaction("Nova transação", parsedAmount, type);
      await addTransaction(tx);
      setAmount(""); // limpa campo
      setType(TransactionType.INCOME); // opcional
      refresh(); //
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  }

  return (
    <div className="flex flex-col w-full items-start gap-6 bg-[#CBCBCB] p-8 rounded-[8px]">
      <p className="text-[#ffffff] text-2xl font-normal">Nova transação</p>

      <div className="w-96">
        <Select
          value={type}
          onChange={(val: string) => setType(val as TransactionType)}
        />
      </div>

      <p className="text-[#ffffff] text-xl font-normal">Valor</p>

      <div className="w-64">
        <Input
          placeholder="00,00"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Button colors="green" text="Concluir" onClick={handleSubmit} />
    </div>
  );
}
