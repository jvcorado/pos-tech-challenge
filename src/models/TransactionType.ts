// models/TransactionType.ts
export enum TransactionType {
  INCOME = "INCOME", // Entrada
  EXPENSE = "EXPENSE", // Saída
}

export enum TransactionSubtype {
  DOC_TED = "DOC_TED",
  BOLETO = "BOLETO",
  CAMBIO = "CAMBIO",
  EMPRESTIMO = "EMPRESTIMO",
  DEPOSITO = "DEPOSITO",
  TRANSFERENCIA = "TRANSFERENCIA",
}