import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { transactionTypes } from "@/constants/transactionTypes";

const SelectTransactionType = ({
  value,
  onChange,
}: {
  value?: string | undefined;
  onChange?: (value: string) => void;
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="inline-flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md shadow-sm">
      <SelectValue placeholder="Tipo de transação" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {transactionTypes.map((type) => (
          <SelectItem key={type.subtype} value={type.subtype}>
            {type.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SelectTransactionType;
