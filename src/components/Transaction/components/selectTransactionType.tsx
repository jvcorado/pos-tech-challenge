import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/models/TransactionType";

const types: { label: string; type: TransactionType, value: string  }[] = [
  { label: "DOC/TED", type: TransactionType.EXPENSE, value: "doc_ted" },
  { label: "Pagamento de Boleto", type: TransactionType.EXPENSE, value: "boleto" },
  { label: "Câmbio de Moeda", type: TransactionType.INCOME, value: "cambio" },
  { label: "Empréstimo e Financiamento", type: TransactionType.INCOME, value: "emprestimo" },
  { label: "Depósito", type: TransactionType.INCOME, value: "deposito" },
  { label: "Transferencia", type: TransactionType.EXPENSE, value: "transferencia" },
];

const SelectTransactionType = ({}) => (
  <Select>
    <SelectTrigger className="inline-flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md shadow-sm">
      <SelectValue placeholder="Tipo de transação" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {types.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SelectTransactionType;
