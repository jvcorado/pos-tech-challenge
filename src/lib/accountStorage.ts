// src/lib/accountStorage.ts
import { Transaction } from "@/models/Transaction";

export class AccountStorage {
  static load(accountName: string): Transaction[] {
    try {
      const data = localStorage.getItem(`account:${accountName}`);
      if (!data) return [];

      const parsed = JSON.parse(data);

      if (!Array.isArray(parsed)) return [];

      return parsed.map(tx => ({
        ...tx,
        date: new Date(tx.date),
      }));
    } catch (e) {
      console.error("Erro ao carregar localStorage:", e);
      return [];
    }
  }

  static save(accountName: string, transactions: Transaction[]): void {
    localStorage.setItem(`account:${accountName}`, JSON.stringify(transactions));
  }

  static add(accountName: string, tx: Transaction): void {
    const transactions = this.load(accountName); // Deve retornar uma lista válida
    transactions.push(tx); // Adiciona nova transação
    this.save(accountName, transactions); // Salva a lista atualizada
  }

  static update(accountName: string, updatedTx: Transaction): void {
    let transactions = this.load(accountName);
    transactions = transactions.map(tx => (tx.id === updatedTx.id ? updatedTx : tx));
    this.save(accountName, transactions);
  }

  static delete(accountName: string, id: string): void {
    const transactions = this.load(accountName).filter(tx => tx.id !== id);
    this.save(accountName, transactions);
  }

  static getBalance(accountName: string): number {
    return this.load(accountName).reduce((total, tx) => {
      return tx.type === "INCOME" ? total + tx.amount : total - tx.amount;
    }, 0);
  }
}
