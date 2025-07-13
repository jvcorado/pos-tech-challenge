import { useMemo } from "react";
import { filterTransactionsByPeriod } from "@/lib/filters/transaction";
import { Transaction } from "@/models/Transaction";

function normalizeString(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

interface Props {
  transactions: Transaction[];
  selectedPeriod: string;
  selectedSubtype?: string;
  search: string;
}

export function useFilteredTransactions({
  transactions,
  selectedPeriod,
  selectedSubtype,
  search,
}: Props) {
  const transactionsByPeriod = useMemo(() => {
    return filterTransactionsByPeriod(transactions, selectedPeriod);
  }, [transactions, selectedPeriod]);

  const filteredByType = useMemo(() => {
    if (!selectedSubtype) return transactionsByPeriod;
    return transactionsByPeriod.filter(
      (t) => t.subtype.toLowerCase() === selectedSubtype.toLowerCase()
    );
  }, [selectedSubtype, transactionsByPeriod]);

  const finalFiltered = useMemo(() => {
    if (search.length < 4) return filteredByType;

    const normalized = normalizeString(search);
    return filteredByType.filter((t) =>
      normalizeString(t.description).includes(normalized)
    );
  }, [search, filteredByType]);

  return finalFiltered;
}
