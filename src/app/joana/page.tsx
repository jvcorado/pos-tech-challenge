// src/app/joana/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { Account } from "@/models/Account";
import { Transaction } from "@/models/Transaction";
import { TransactionType } from "@/models/TransactionType";

export default function JoanaPage() {
  const account = useMemo(() => new Account("joana"), []);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [form, setForm] = useState({ description: "", amount: "", type: "INCOME" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    const txs = account.getTransactions();
    setTransactions(txs);
    setBalance(account.getBalance());
  }

  function handleSubmit() {
    const amount = parseFloat(form.amount);
    if (!form.description || isNaN(amount)) return;

    try {
      const tx = new Transaction(form.description, amount, form.type as TransactionType);

      if (editingId) {
        tx.id = editingId;
        tx.date = new Date();
        account.updateTransaction(tx);
        setEditingId(null);
      } else {
        account.addTransaction(tx);
      }

      setForm({ description: "", amount: "", type: "INCOME" });
      refresh();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleEdit(tx: Transaction) {
    setForm({ description: tx.description, amount: String(tx.amount), type: tx.type });
    setEditingId(tx.id);
  }

  function handleDelete(id: string) {
    account.deleteTransaction(id);
    refresh();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Conta de Joana</h1>
      <p className="text-lg mb-4">Saldo atual: R$ {balance.toFixed(2)}</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Nova Transação</h2>
        <input
          className="block w-full p-2 border rounded mt-2"
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          className="block w-full p-2 border rounded mt-2"
          placeholder="Valor"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <select
          className="block w-full p-2 border rounded mt-2"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          {editingId ? "Salvar Edição" : "Adicionar"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Extrato</h2>
      <ul className="space-y-2">
        {[...transactions].reverse().map(tx => (
          <li key={tx.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <div className="font-semibold">{tx.description}</div>
              <div className="text-sm text-gray-500">
                {tx.date.toLocaleDateString()} — R$ {tx.amount.toFixed(2)} [{tx.type}]
              </div>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(tx)} className="text-blue-600 hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(tx.id)} className="text-red-600 hover:underline">
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
