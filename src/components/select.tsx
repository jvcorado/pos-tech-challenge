import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Select({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <SelectRoot value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-[#47A138] outline-0 cursor-pointer">
        <SelectValue placeholder="Selecione o tipo de transação" />
      </SelectTrigger>
      <SelectContent className="border-[#47A138] outline-0 cursor-pointer ">
        <SelectItem value="INCOME">DEPOSITO</SelectItem>
        <SelectItem value="EXPENSE">TRASNFERENCIA</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
}
