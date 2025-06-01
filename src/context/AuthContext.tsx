"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Account } from "@/models/Account";
import { AuthService } from "@/services/AuthService";

interface AuthContextType {
  account: Account | null;
  loading: boolean;
  login: (name: string) => Promise<void>;
  register: (name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("account");
    if (stored) {
      setAccount(Account.fromJSON(JSON.parse(stored)));
    }
    setLoading(false);
  }, []);

  const login = async (name: string) => {
    const acc = await AuthService.login(name);
    setAccount(acc);
    localStorage.setItem("account", JSON.stringify(acc.toJSON()));
  };

  const register = async (name: string) => {
    const acc = await AuthService.register(name);
    setAccount(acc);
    localStorage.setItem("account", JSON.stringify(acc.toJSON()));
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem("account");
  };

  return (
    <AuthContext.Provider value={{ account, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
