import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const SelectTransactionPeriod = ({}) => (
  <Select>
    <SelectTrigger className="inline-flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md shadow-sm">
      <SelectValue placeholder="Período" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="today">Hoje</SelectItem>
        <SelectItem value="yesterday">Ontem</SelectItem>
        <SelectItem value="seven-days">Últimos 7 dias</SelectItem>
        <SelectItem value="fifteen-days">Últimos 15 dias</SelectItem>
        <SelectItem value="month">Último mês</SelectItem>
        <SelectItem value="year">Último ano</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SelectTransactionPeriod;
