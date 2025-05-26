import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { formatCurrencyBRL } from "@/lib/formatCurrency";
import { TransactionType } from "@/models/TransactionType";

type TransactionItemProps = {
  date: Date;
  transactionDescription: string;
  transactionType: TransactionType;
  value: number;
};
export default function TransactionItem({
  date,
  transactionDescription,
  transactionType,
  value,
}: TransactionItemProps) {
  const monthName = format(date, "MMMM", { locale: ptBR });
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });

  return (
    <div className="flex flex-col gap-2 w-[240px]">
      <p className="self-start text-[#47A138] text-[13px] font-bold">
        {capitalizedMonth}
      </p>
      <div className="flex flex-row items-center justify-between">
        <p className="text-black text-base">{transactionDescription}</p>
        <p className="text-[#8B8B8B] text-[13px] text-sm">{formattedDate}</p>
      </div>
      <p className="self-start text-black text-base font-bold">{`${
        transactionType === TransactionType.EXPENSE ? "-" : ""
      }${formatCurrencyBRL(value)} `}</p>
      <div className="border-b-2 pb-4 border-[#47A138] opacity-50 w-[180px]" />
    </div>
  );
}
