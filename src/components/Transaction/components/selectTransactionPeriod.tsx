import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { periods } from "@/constants/period";

const SelectTransactionPeriod = ({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => {

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="inline-flex items-center justify-between w-full px-4 py-2 bg-white border rounded-md shadow-sm">
        <SelectValue placeholder="Período" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTransactionPeriod;
