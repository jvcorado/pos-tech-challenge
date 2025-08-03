"use client";

import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Loader,
  X,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import TransactionList from "@/components/Transaction/components/transactionList";
import ActionButton from "@/components/actionButton";
import EditTransactionDialog from "@/components/Transaction/components/editTransactionDialog";
import FilterTransactionsDialog from "@/components/Transaction/components/filterTransactionsDialog";
import SelectTransactionPeriod from "@/components/Transaction/components/selectTransactionPeriod";
import Input from "@/components/input";
import { useBank } from "@/context/BankContext";
import { Transaction } from "@/models/Transaction";
import { TransactionSubtype, TransactionType } from "@/models/TransactionType";
import SelectTransactionType from "@/components/Transaction/components/selectTransactionType";
import EditTransactionForm from "@/components/Transaction/components/editTransactionForm";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import PaginationControls from "@/components/paginationControls";
import { useIsMobile } from "@/hooks/useIsMobile";

type EditableTransaction = {
  id?: number;
  description: string;
  amount: number;
  type: TransactionType;
  subtype: TransactionSubtype;
  date: Date;
  document?: File;
};

export default function TransactionsSection() {
  const {
    transactions,
    updateTransaction,
    deleteTransaction,
    loading,
    currentPage,
    totalTransactions,
    changePage,
  } = useBank();
  const isMobile = useIsMobile();
  const [isEditTransactionItem, setIsEditTransactionItem] = useState(false);
  const [isDeleteTransactionItem, setIsDeleteTransactionItem] = useState(false);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState(false);
  const [editableTransaction, setEditableTransaction] = useState<
    EditableTransaction | undefined
  >(undefined);
  const [isSelectingTransactionItem, setIsSelectingTransactionItem] =
    useState(false);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [selectedSubtype, setSelectedSubtype] = useState<string | undefined>(
    undefined
  );
  const [tempPeriod, setTempPeriod] = useState(selectedPeriod);
  const [tempSubtype, setTempSubtype] = useState(selectedSubtype);
  const transactionsPerPage = 10;
  const filteredTransactions = useFilteredTransactions({
    transactions,
    selectedPeriod,
    selectedSubtype,
    search: searchTransaction,
  });

  const handleSelectTransactionItem = (transaction: Transaction) => {
    setEditableTransaction({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      subtype: transaction.subtype,
      date: transaction.date,
      document: transaction.document,
    });

    setIsSelectingTransactionItem(true);
  };

  const handleConfirmEditTransaction = () => {
    if (editableTransaction) {
      const updatedTransaction = new Transaction(
        editableTransaction.description,
        editableTransaction.amount,
        editableTransaction.type,
        editableTransaction.subtype,
        editableTransaction.id,
        editableTransaction.document,
        editableTransaction.date,
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

  const handleOpenFilterDialog = (open: boolean) => {
    setIsOpenFilterDialog(open);
    if (open) {
      setTempPeriod(selectedPeriod);
      setTempSubtype(selectedSubtype);
    }
  };

  const handleConfirmFilters = () => {
    setSelectedPeriod(tempPeriod);
    setSelectedSubtype(tempSubtype);
    setIsOpenFilterDialog(false);
  };

  const handleClearFilters = () => {
    setTempPeriod("year");
    setTempSubtype(undefined);
  
    setSelectedPeriod("year");
    setSelectedSubtype(undefined);
    setSearchTransaction("");
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
      <div className="flex flex-col items-center justify-center h-50 lg:h-10 min-w-[250px]">
        <h1 className="text-[25px] font-bold">Extrato</h1>
        <p className="text-[16px]">Nenhuma transação foi realizada</p>
      </div>
    );
  }

  return (
    <div
      className="h-auto w-auto h-full overflow-y-scroll overflow-x-hidden scrollbar-hidden relative bg-white 
      flex flex-col items-center rounded-md pt-10 pb-10 justify-between md:min-w-[245px]"
    >
      <div className="flex flex-col text-center md:text-left gap-[24px] overflow-y-auto scrollbar-hidden">
        <div className="flex relative w-full gap-2">
          <Input
            icon={<Search size={18} />}
            placeholder="Buscar transação..."
            value={searchTransaction}
            onChange={(e) => setSearchTransaction(e.target.value)}
          />
          <ActionButton
            onClick={() => setIsOpenFilterDialog((prev) => !prev)}
            content={<SlidersHorizontal size={18} />}
            colors="green"
            size="md"
          />
        </div>
        <div className="flex flex-rol justify-between">
          <h1 className="text-[25px] font-bold">Extrato</h1>
          <div className="flex gap-3">
            <ActionButton
              onClick={() => {
                setIsEditTransactionItem((prev) => !prev);
                setIsDeleteTransactionItem(false);
                setIsSelectingTransactionItem(false);
                setEditableTransaction(undefined);
              }}
              content={
                isEditTransactionItem ? <X size={22} /> : <Pencil size={22} />
              }
              colors="blue"
              size="default"
            />

            <ActionButton
              onClick={() => {
                setIsDeleteTransactionItem((prev) => !prev);
                setIsEditTransactionItem(false);
                setIsSelectingTransactionItem(false);
                setEditableTransaction(undefined);
              }}
              content={
                isDeleteTransactionItem ? <X size={22} /> : <Trash2 size={22} />
              }
              colors="blue"
              size="default"
            />
          </div>
        </div>
        <TransactionList
          transactions={filteredTransactions}
          isEditTransactionItem={isEditTransactionItem}
          isDeleteTransactionItem={isDeleteTransactionItem}
          handleSelectTransactionItem={handleSelectTransactionItem}
        />
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
          <EditTransactionForm
            transaction={editableTransaction}
            onChange={setEditableTransaction}
          />
        )}
      </EditTransactionDialog>
      <FilterTransactionsDialog
        open={isOpenFilterDialog}
        title="Filtrar transações"
        description="Selecione os filtros desejados para visualizar as transações."
        onOpenChange={handleOpenFilterDialog}
        onConfirmAction={handleConfirmFilters}
        onClearFilters={handleClearFilters}
        isFullScreen={isMobile}
        showCloseButton
      >
        <div className="flex flex-col gap-4">
          <SelectTransactionPeriod
            value={tempPeriod}
            onChange={setTempPeriod}
          />
          <SelectTransactionType
            value={tempSubtype}
            onChange={setTempSubtype}
          />
        </div>
      </FilterTransactionsDialog>

      <div className="absolute bottom-0 left-0 w-full bg-white shadow-md">
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(totalTransactions / transactionsPerPage)}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
