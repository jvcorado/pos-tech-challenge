"use client";

import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Pencil, Trash2, Loader } from "lucide-react";

import TransactionItem from "@/components/transactionItem";
import ActionButton from "@/components/actionButton";
import EditTransactionDialog from "@/components/editTransactionDialog";
import Input from "@/components/input";
import { useBank } from "@/context/BankContext";
import { Transaction } from "@/models/Transaction";
import { TransactionType } from "@/models/TransactionType";

type EditableTransaction = {
  id?: number;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;
};

export default function TransactionsSection() {
  const { transactions, updateTransaction, deleteTransaction, loading } =
    useBank();
  const [isEditTransactionItem, setIsEditTransactionItem] = useState(false);
  const [isDeleteTransactionItem, setIsDeleteTransactionItem] = useState(false);
  const [editableTransaction, setEditableTransaction] = useState<
    EditableTransaction | undefined
  >(undefined);
  const [isSelectingTransactionItem, setIsSelectingTransactionItem] =
    useState(false);

  const handleEditTransaction = () => {
    setIsEditTransactionItem(true);
    setIsDeleteTransactionItem(false);
  };

  const handleDeleteTransaction = () => {
    setIsDeleteTransactionItem(true);
    setIsEditTransactionItem(false);
  };

  const handleSelectTransactionItem = (transaction: Transaction) => {
    setEditableTransaction({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
    });

    setIsSelectingTransactionItem(true);
  };

  const handleConfirmEditTransaction = () => {
    if (editableTransaction) {
      const updatedTransaction = new Transaction(
        editableTransaction.description,
        editableTransaction.amount,
        editableTransaction.type,
        editableTransaction.id,
        editableTransaction.date
      );
      updateTransaction(updatedTransaction);
      setIsSelectingTransactionItem(false);
      setIsEditTransactionItem(false);
      setEditableTransaction(undefined);
    }
  };

  const handleConfirmDeleteTransaction = () => {
    if (editableTransaction) {
      deleteTransaction(editableTransaction.id!);

      setIsSelectingTransactionItem(false);
      setIsDeleteTransactionItem(false);
      setEditableTransaction(undefined);
    }
  };

  if (transactions.length === 0 && loading) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 h-50 lg:h-10 lg:min-w-[250px]">
        <p className="text-[16px] font-bold">Carregando transações</p>
        <Loader size={20} color="#47A138" />
      </div>
    );
  }

  if (transactions.length === 0 && !loading) {
    return (
      <div className="flex flex-wrap items-center justify-center h-50 lg:h-10 min-w-[250px]">
        <h1 className="text-[25px] font-bold">Extrato</h1>
        <p className="text-[16px]">Nenhuma transação foi realizada</p>
      </div>
    );
  }

  return (
    <div className="h-auto w-auto max-h-full overflow-y-auto custom-scroll md:p-6 m relative bg-white h-96 flex flex-col items-center rounded-md pt-10 pb-10 justify-between">
      <div className="flex flex-col w-fit text-center md:text-left gap-[24px]">
        <div className="flex flex-rol justify-between">
          <h1 className="text-[25px] font-bold">Extrato</h1>
          <div className="flex gap-3">
            <ActionButton
              onClick={handleEditTransaction}
              content={<Pencil size={22} />}
              colors="blue"
              size="default"
            />
            <ActionButton
              onClick={handleDeleteTransaction}
              content={<Trash2 size={22} />}
              colors="blue"
              size="default"
            />
          </div>
        </div>
        {transactions.map((transaction, index) => (
          <div key={index}>
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
            <TransactionItem
              key={index}
              date={transaction.date}
              transactionDescription={transaction.description}
              transactionType={transaction.type}
              value={transaction.amount}
            />
          </div>
        ))}
      </div>
      <EditTransactionDialog
        title={`${isEditTransactionItem ? "Editar" : "Deletar"} transação`}
        description={`${
          isEditTransactionItem
            ? "Edite os dados da transação"
            : "Você tem certeza que deseja deletar essa transação?"
        }`}
        onConfirmAction={
          isEditTransactionItem
            ? handleConfirmEditTransaction
            : handleConfirmDeleteTransaction
        }
        open={isSelectingTransactionItem}
        onOpenChange={setIsSelectingTransactionItem}
      >
        {isEditTransactionItem && (
          <div className="flex flex-col gap-2 mt-4">
            <label
              htmlFor="description"
              className="text-[#47A138] text-[13px] font-bold"
            >
              Descrição
            </label>
            <Input
              id="description"
              value={editableTransaction?.description || ''}
              onChange={(e) => {
                setEditableTransaction((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev
                );
              }}
            />
            <label
              htmlFor="amount"
              className="text-[#47A138] text-[13px] font-bold"
            >
              Valor
            </label>
            <NumericFormat
              id="amount"
              value={editableTransaction?.amount}
              onValueChange={(values) => {
                const rawValue = Number(values.value);

                setEditableTransaction((prev) =>
                  prev ? { ...prev, amount: rawValue } : prev
                );
              }}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
            />
          </div>
        )}
      </EditTransactionDialog>
    </div>
  );
}
