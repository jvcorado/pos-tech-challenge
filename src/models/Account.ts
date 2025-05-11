// models/Account.ts
import { Transaction } from "./Transaction";
import { AccountStorage } from "@/lib/accountStorage";
import { TransactionType } from "./TransactionType";

export class Account {
  name: string;

  constructor(name: string) {
    this.name = name.toLowerCase(); // Utiliza o nome da conta em minúsculo
    this.initializeStorageIfEmpty();
  }

  private initializeStorageIfEmpty(): void {
  const data = localStorage.getItem(`account:${this.name}`);
  if (!data) {
    AccountStorage.save(this.name, []);
  }
}

  getTransactions(): Transaction[] {
    return AccountStorage.load(this.name);
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.getTransactions().find(tx => tx.id === id);
  }

  getBalance(): number {
    return AccountStorage.getBalance(this.name);
  }

  // Método para validar transações de adição e remoção
  private validateTransaction(amount: number, type: TransactionType): boolean {
    const balance = this.getBalance();

    if (type === TransactionType.INCOME && amount <= 0) {
      throw new Error("O valor de adição deve ser maior que zero.");
    }

    if (type === TransactionType.EXPENSE && amount > balance) {
      throw new Error("O valor da remoção não pode ser maior que o saldo atual.");
    }

    return true;
  }

  // Adiciona uma nova transação, com validação
  addTransaction(tx: Transaction): void {
    if (this.validateTransaction(tx.amount, tx.type)) {
      AccountStorage.add(this.name, tx);
    }
  }

  // Atualiza uma transação existente, com validação
  updateTransaction(updatedTx: Transaction): void {
    if (this.validateTransaction(updatedTx.amount, updatedTx.type)) {
      AccountStorage.update(this.name, updatedTx);
    }
  }

  // Deleta uma transação
  deleteTransaction(id: string): void {
    AccountStorage.delete(this.name, id);
  }
}
