// models/Transaction.ts
import { v4 as uuidv4 } from "uuid";
import { TransactionType } from "./TransactionType";

export class Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: Date;

  constructor(description: string, amount: number, type: TransactionType) {
    this.id = uuidv4(); // Gerando ID único
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.date = new Date();
  }
}
