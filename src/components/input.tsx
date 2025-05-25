import { Input as InputRoot } from "./ui/input";

export default function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <InputRoot
      className="border-[#47A138] outline-0 "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
