import { cn } from "./cn";

export function FormField({
  label,
  type = "text",
  placeholder,
  inputClassName,
  labelClassName,
  minLength,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  inputClassName: string;
  labelClassName: string;
  minLength?: number;
}) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium", labelClassName)}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className={cn("w-full", inputClassName)}
        required
        minLength={minLength}
      />
    </label>
  );
}
