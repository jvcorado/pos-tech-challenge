// models/Transaction.ts
import { TransactionType } from "./TransactionType";

export class Transaction {
  public id?: number;
  public description: string;
  public amount: number;
  public type: TransactionType;
  public date: Date;

  constructor(
    description: string,
    amount: number,
    type: TransactionType,
    id?: number,
    date?: Date
  ) {
    this.description = description;
    this.amount = amount;
    this.type = type;
    if (id !== undefined) this.id = id;
    this.date = date ?? new Date();
  }

  // Cria uma instância de Transaction a partir de um objeto JSON
  static fromJSON(data: any): Transaction {
    return new Transaction(
      data.description,
      data.amount,
      data.type,
      data.id,
      new Date(data.date)
    );
  }

  // Converte a instância para um objeto JSON para envio ao backend
  toJSON() {
    return {
      id: this.id,
      description: this.description,
      amount: this.amount,
      type: this.type,
      date: this.date.toISOString(),
    };
  }
}
