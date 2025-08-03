import React from "react";
import { NumericFormat } from "react-number-format";
import Input from "@/components/input";
import { TransactionSubtype, TransactionType } from "@/models/TransactionType";

type EditableTransaction = {
  id?: number;
  description: string;
  amount: number;
  type: TransactionType;
  subtype: TransactionSubtype;
  date: Date;
};

type EditTransactionFormProps = {
  transaction: EditableTransaction | undefined;
  onChange: (transaction: EditableTransaction) => void;
};

const EditTransactionForm = ({
  transaction,
  onChange,
}: EditTransactionFormProps) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label
        htmlFor="description"
        className="text-[#47A138] text-[13px] font-bold"
      >
        Descrição
      </label>
      <Input
        id="description"
        value={transaction?.description || ""}
        onChange={(e) => {
          if (transaction) {
            onChange({ ...transaction, description: e.target.value });
          }
        }}
      />
      <label htmlFor="amount" className="text-[#47A138] text-[13px] font-bold">
        Valor
      </label>
      <NumericFormat
        id="amount"
        value={transaction?.amount}
        onValueChange={(values) => {
          const rawValue = Number(values.value);
            if (transaction) {
                onChange({ ...transaction, amount: rawValue });
            }
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        allowNegative={false}
        customInput={Input}
      />
    </div>
  );
};

export default EditTransactionForm;
