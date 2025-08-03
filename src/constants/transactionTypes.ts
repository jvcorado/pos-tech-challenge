import { TransactionType } from "@/models/TransactionType";

export const transactionTypes: { label: string; type: TransactionType, subtype: string  }[] = [
  { label: "DOC/TED", type: TransactionType.EXPENSE, subtype: "doc_ted" },
  { label: "Boleto", type: TransactionType.EXPENSE, subtype: "boleto" },
  { label: "Câmbio de Moeda", type: TransactionType.INCOME, subtype: "cambio" },
  { label: "Empréstimo e Financiamento", type: TransactionType.INCOME, subtype: "emprestimo" },
  { label: "Depósito", type: TransactionType.INCOME, subtype: "deposito" },
  { label: "Transferência", type: TransactionType.EXPENSE, subtype: "transferencia" },
];