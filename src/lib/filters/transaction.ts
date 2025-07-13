import { subDays, subMonths, subYears, isSameDay } from "date-fns";
import { Transaction } from "@/models/Transaction";

export function filterTransactionsByPeriod(
  transactions: Transaction[],
  period: string
): Transaction[] {
  const now = new Date();

  return transactions.filter((t) => {
    const txDate = new Date(t.date);
    switch (period) {
      case "today":
        return isSameDay(txDate, now);
      case "yesterday":
        return isSameDay(txDate, subDays(now, 1));
      case "seven-days":
        return txDate >= subDays(now, 7);
      case "fifteen-days":
        return txDate >= subDays(now, 15);
      case "month":
        return txDate >= subMonths(now, 1);
      case "year":
        return txDate >= subYears(now, 1);
      default:
        return true;
    }
  });
}
