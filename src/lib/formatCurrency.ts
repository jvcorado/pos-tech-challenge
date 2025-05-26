export function formatCurrencyBRL(value: number): string {
  const fractionDigits = Number.isInteger(value) ? 0 : 2;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
