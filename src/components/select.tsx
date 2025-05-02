import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Select() {
  return (
    <SelectRoot>
      <SelectTrigger className="w-full border-[#47A138] outline-0 cursor-pointer">
        <SelectValue placeholder="Selecione o tipo de transação" />
      </SelectTrigger>
      <SelectContent className="border-[#47A138] outline-0 cursor-pointer ">
        <SelectItem value="light">Câmbio de Moeda</SelectItem>
        <SelectItem value="dark">DOC/TED</SelectItem>
        <SelectItem value="system">Empréstimo e Financiamento</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
}
