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
import { useAuth } from "./AuthContext";


interface BankContextData {
  account: Account;
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
  Totalexpenses: number;
  refresh: () => Promise<void>;
  addTransaction: (tx: Transaction) => Promise<void>;
  updateTransaction: (tx: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const BankContext = createContext<BankContextData | undefined>(undefined);

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const { account } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance ] = useState(0);
  const [Totalexpenses, setExpenses ] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!account) return;
    setLoading(true);
    setError(null);
    try {
      const txs = await account.getTransactions();
      const bal = await account.getBalance();
      const exp = await account.getExpenses();
      setTransactions(txs);
      setBalance(bal);
      setExpenses(exp)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [account]);

  const addTransaction = async (tx: Transaction) => {
    if (!account) throw new Error("Conta não disponível.");
    await account.addTransaction(tx);
    await refresh();
  };

  const updateTransaction = async (tx: Transaction) => {
    if (!account) throw new Error("Conta não disponível.");
    await account.updateTransaction(tx);
    await refresh();
  };

  const deleteTransaction = async (id: number) => {
    if (!account) throw new Error("Conta não disponível.");
    await account.deleteTransaction(id);
    await refresh();
  };

    
  useEffect(() => {
    if (account) refresh();
  }, [refresh, account]);

  // Se não houver conta, ainda renderiza — apenas não fornece contexto útil
  if (!account) {
    return <>{children}</>;
  }

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
        Totalexpenses,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error(
      "useBank must be used within a BankProvider (com usuário logado)"
    );
  }
  return context;
};
