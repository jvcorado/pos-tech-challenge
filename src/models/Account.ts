// models/Account.ts
import { Transaction } from "./Transaction";
import { TransactionService } from "@/services/TransactionService";
import { TransactionType } from "./TransactionType";

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

  //calcula despesas totais
  async getExpenses(): Promise<number> {
    const transactions = await this.getTransactions();
    return transactions.reduce((acc, tx) => {
      if (tx.type === TransactionType.EXPENSE) {
        console.log(acc + tx.amount)
        return acc += tx.amount;
      }
      return acc;
    }, 0);
  }
  
//calcula total de despesas baseado nos meses e categorias 
async getExpensesByCategoryForMonth(month: number, year: number): Promise<Transaction[]> {
  const transactions = await this.getTransactions();
  const filtered = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      tx.type === TransactionType.EXPENSE &&
      txDate.getMonth() + 1 === month &&
      txDate.getFullYear() === year
    );
  });

  const grouped: Record<string, Transaction> = {};

  filtered.forEach((tx) => {
    const category = tx.description || "Outros";

    if (!grouped[category]) {
      
      grouped[category] = Transaction.fromJSON({
        id: tx.id,
        description: category,
        amount: tx.amount,
        type: TransactionType.EXPENSE,
        date: tx.date,
      });
      
    }

    grouped[category].amount += tx.amount;
  });

  return Object.values(grouped);
}


  // Valida transação antes de adicionar ou atualizar
  private async validateTransaction(amount: number, type: TransactionType): Promise<boolean> {
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
    await TransactionService.create(tx, this.name);
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
