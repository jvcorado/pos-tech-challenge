"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Account } from "@/models/Account";
import { Transaction } from "@/models/Transaction";

interface BankContextData {
  account: Account;
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addTransaction: (tx: Transaction) => Promise<void>;
  updateTransaction: (tx: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const BankContext = createContext<BankContextData | undefined>(undefined);

export const BankProvider: React.FC<{
  children: React.ReactNode;
  accountName: string;
}> = ({ children, accountName }) => {
  const [account] = useState(() => new Account(accountName));
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const txs = await account.getTransactions();
      const bal = await account.getBalance();
      setTransactions(txs);
      setBalance(bal);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [account]);

  const addTransaction = async (tx: Transaction) => {
    await account.addTransaction(tx);
    await refresh();
  };

  const updateTransaction = async (tx: Transaction) => {
    await account.updateTransaction(tx);
    await refresh();
  };

  const deleteTransaction = async (id: number) => {
    await account.deleteTransaction(id);
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <BankContext.Provider
      value={{
        account,
        transactions,
        balance,
        loading,
        error,
        refresh,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
};
