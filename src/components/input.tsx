import { Input as InputRoot } from "./ui/input";

export default function Input({
  id,
  placeholder,
  value,
  onChange,
}: {
  id?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <InputRoot
      id={id}
      className="border-[#47A138] outline-0 "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
