import React from "react";

import TransactionItem from "@/components/Transaction/components/transactionItem";
import ActionButton from "@/components/actionButton";
import { Pencil, Trash2 } from "lucide-react";

import { Transaction } from "@/models/Transaction";

type TransactionListProps = {
  transactions: Transaction[];
  isEditTransactionItem: boolean;
  isDeleteTransactionItem: boolean;
  handleSelectTransactionItem: (transaction: Transaction) => void;
};

const TransactionList = ({
  transactions,
  isEditTransactionItem,
  isDeleteTransactionItem,
  handleSelectTransactionItem,
}: TransactionListProps) => {
  return transactions.length === 0 ? (
    <div className="text-center text-sm text-gray-500 py-8">
      Nenhuma transação encontrada com os filtros selecionados.
    </div>
  ) : (
    <>
      {transactions.map((transaction: Transaction) => (
        <div key={transaction.id} className="pr-1">
          <div className="flex justify-end">
            {isEditTransactionItem && (
              <ActionButton
                onClick={() => handleSelectTransactionItem(transaction)}
                content={<Pencil size={14} />}
                colors="blue"
                size="sm"
              />
            )}
            {isDeleteTransactionItem && (
              <ActionButton
                onClick={() => handleSelectTransactionItem(transaction)}
                content={<Trash2 size={14} />}
                colors="blue"
                size="sm"
              />
            )}
          </div>
          <TransactionItem key={transaction.id} transaction={transaction} />
        </div>
      ))}
    </>
  );
};

export default TransactionList;
