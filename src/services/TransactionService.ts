// services/TransactionService.ts
import { Transaction } from "@/models/Transaction";

const BASE_URL = "http://localhost:3002/transactions";

export class TransactionService {
  // Busca todas as transações associadas a uma conta pelo nome
  static async getAllByAccount(accountName: string): Promise<Transaction[]> {
    const res = await fetch(`${BASE_URL}?account=${accountName}`);
    const data = await res.json();
    return data.map(Transaction.fromJSON);
  }

  static async getAllByAccountPaginated({
    accountName,
    page = 1,
  }: {
    accountName: string;
    page: number;
  }) {
    const res = await fetch(`${BASE_URL}?account=${accountName}&_page=${page}`);
    const response = await res.json();

    return {
      transactions: response.data.map(Transaction.fromJSON),
      pagination: {
        currentPage: page,
        nextPage: response.next,
        prevPage: response.prev,
        totalPages: response.pages,
        totalItems: response.items,
      },
    };
  }

  // Busca transação por ID
  static async getById(id: number): Promise<Transaction> {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    return Transaction.fromJSON(data);
  }

  // Cria nova transação (não envia id para json-server gerar)
  static async create(
    transaction: Transaction,
    accountName: string,
    accountId?: number
  ): Promise<Transaction> {
    const body = {
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      subtype: transaction.subtype,
      date: transaction.date.toISOString(),
      document: transaction.document || null,
      accountId: accountId,
      account: accountName,
    };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Transaction.fromJSON(data);
  }

  static async addTransactionWithFile(
    transaction: Transaction,
    accountName: string,
    accountId?: number
  ): Promise<Transaction> {
    const formData = new FormData();

    formData.append("description", transaction.description);
    formData.append("amount", String(transaction.amount));
    formData.append("type", transaction.type);
    formData.append("subtype", transaction.subtype);
    formData.append("date", transaction.date.toISOString());
    formData.append("account", accountName);

    if (accountId !== undefined) {
      formData.append("accountId", accountId.toString());
    }

    if (transaction.document) {
      formData.append("document", transaction.document);
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar transação");
    }

    const data = await response.json();
    return Transaction.fromJSON(data);
  }

  // Atualiza transação existente pelo ID
  static async update(transaction: Transaction): Promise<Transaction> {
    if (!transaction.id)
      throw new Error("Transação precisa de ID para atualizar.");

    const res = await fetch(`${BASE_URL}/${transaction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction.toJSON()),
    });

    const data = await res.json();
    return Transaction.fromJSON(data);
  }

  // Deleta transação pelo ID
  static async delete(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  }
}
