// services/AccountService.ts
import { Account } from "@/models/Account";

const BASE_URL = "http://localhost:3001/accounts";

export class AccountService {
  // Busca todas as contas
  static async getAll(): Promise<Account[]> {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data.map(Account.fromJSON);
  }

  // Busca conta por ID
  static async getById(id: number): Promise<Account> {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    return Account.fromJSON(data);
  }

  // Cria uma nova conta (não envia id, json-server gera)
  static async create(account: Account): Promise<Account> {
    const body = { name: account.name };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Account.fromJSON(data);
  }

  // Atualiza conta existente pelo ID
  static async update(account: Account): Promise<Account> {
    if (!account.id) throw new Error("Conta precisa de ID para atualizar.");

    const res = await fetch(`${BASE_URL}/${account.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account.toJSON()),
    });

    const data = await res.json();
    return Account.fromJSON(data);
  }

  // Deleta conta pelo ID
  static async delete(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  }
}
