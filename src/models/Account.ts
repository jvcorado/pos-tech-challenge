// models/Account.ts
import { Transaction } from "./Transaction";
import { TransactionService } from "@/services/TransactionService";
import { TransactionType } from "./TransactionType";
import type { PaginationMeta } from "@/types/Pagination";

export class Account {
  public id?: number;
  public name: string;

  constructor(name: string, id?: number) {
    this.name = name.toLowerCase();
    if (id !== undefined) this.id = id;
  }

  static fromJSON(data: { name: string; id?: number }): Account {
    return new Account(data.name, data.id);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  // Busca todas as transações relacionadas a esta conta
  async getTransactions(): Promise<Transaction[]> {
    return await TransactionService.getAllByAccount(this.name);
  }

  async getTransactionsPaginated(
    page = 1
  ): Promise<{ transactions: Transaction[]; pagination: PaginationMeta }> {
    return await TransactionService.getAllByAccountPaginated({
      accountName: this.name,
      page,
    });
  }

  // Busca uma transação específica pelo ID
  async getTransactionById(id: number): Promise<Transaction | undefined> {
    const tx = await TransactionService.getById(id);
    return tx?.id ? tx : undefined;
  }

  // Calcula saldo somando receitas e despesas da conta
  async getBalance(): Promise<number> {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, tx) => {
      if (tx.type === TransactionType.INCOME) {
        return acc + tx.amount;
      } else if (tx.type === TransactionType.EXPENSE) {
        return acc - tx.amount;
      }
      return acc;
    }, 0);
  }

  // Valida transação antes de adicionar ou atualizar
  private async validateTransaction(
    amount: number,
    type: TransactionType
  ): Promise<boolean> {
    if (type === TransactionType.INCOME && amount <= 0) {
      throw new Error("O valor de adição deve ser maior que zero.");
    }

    // if (type === TransactionType.EXPENSE && amount > balance) {
    //   throw new Error("O valor da remoção não pode ser maior que o saldo atual.");
    // }

    return true;
  }

  // Adiciona nova transação (salva via API)
  async addTransaction(tx: Transaction): Promise<void> {
    await this.validateTransaction(tx.amount, tx.type);
    await TransactionService.addTransactionWithFile(tx, this.name, this.id);
  }

  // Atualiza transação existente (salva via API)
  async updateTransaction(tx: Transaction): Promise<void> {
    if (!tx.id) throw new Error("Transação precisa de ID para atualizar.");
    await this.validateTransaction(tx.amount, tx.type);
    await TransactionService.update(tx);
  }

  // Deleta transação pelo ID (via API)
  async deleteTransaction(id: number): Promise<void> {
    await TransactionService.delete(id);
  }
}
