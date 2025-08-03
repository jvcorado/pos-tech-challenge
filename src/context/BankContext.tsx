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
  totalTransactions: number;
  currentPage: number;
  balance: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addTransaction: (tx: Transaction) => Promise<void>;
  updateTransaction: (tx: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  changePage: (page: number) => Promise<void>;
}

const BankContext = createContext<BankContextData | undefined>(undefined);

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const { account } = useAuth();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(
    async (page = currentPage) => {
      if (!account) return;
      setLoading(true);
      setError(null);
      try {
        const { transactions: txs, pagination } =
          await account.getTransactionsPaginated(page);
        const bal = await account.getBalance();
        setTransactions(txs);
        // setPagination(pagination);
        setTotalTransactions(pagination.totalItems);
        setBalance(bal);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [account, currentPage]
  );

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

  const changePage = async (page: number) => {
    await refresh(page);
    setCurrentPage(page);
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
        totalTransactions,
        currentPage,
        balance,
        loading,
        error,
        refresh,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        changePage,
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
