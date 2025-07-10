import { TransactionSubtype, TransactionType } from "./TransactionType";

interface TransactionJSON {
  id?: number;
  description: string;
  amount: number;
  type: TransactionType;
  subtype: TransactionSubtype;
  date: string | Date;
}

export class Transaction {
  public id?: number;
  public description: string;
  public amount: number;
  public type: TransactionType;
  public subtype: TransactionSubtype;
  public date: Date;

  constructor(
    description: string,
    amount: number,
    type: TransactionType,
    subtype: TransactionSubtype,
    id?: number,
    date?: Date
  ) {
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.subtype = subtype;
    if (id !== undefined) this.id = id;
    this.date = date ?? new Date();
  }

  static fromJSON(data: TransactionJSON): Transaction {
    return new Transaction(
      data.description,
      data.amount,
      data.type,
      data.subtype,
      data.id,
      new Date(data.date)
    );
  }

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
