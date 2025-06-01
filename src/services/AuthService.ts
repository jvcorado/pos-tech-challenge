// services/AuthService.ts
import { Account } from "@/models/Account";

const BASE_URL = "http://localhost:3001/accounts";

export class AuthService {
    // Simula login: busca conta pelo nome
    static async login(name: string): Promise<Account> {
        const res = await fetch(`${BASE_URL}?name=${name.toLowerCase()}`);
        if (!res.ok) throw new Error("Erro ao buscar conta");

        const data = await res.json();

        if (data.length === 0) {
            throw new Error("Conta não encontrada.");
        }

        return Account.fromJSON(data[0]);
    }

    // Simula registro: verifica se já existe e cria se não
    static async register(name: string): Promise<Account> {
        const existing = await fetch(`${BASE_URL}?name=${name.toLowerCase()}`);
        const existingData = await existing.json();

        if (existingData.length > 0) {
            throw new Error("Essa conta já existe.");
        }

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.toLowerCase() }),
        });

        if (!res.ok) throw new Error("Erro ao registrar conta.");

        const data = await res.json();
        return Account.fromJSON(data);
    }
}
