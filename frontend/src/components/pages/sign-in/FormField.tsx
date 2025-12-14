import { cn } from "./cn";

export function FormField({
  label,
  type = "text",
  placeholder,
  name,
  inputClassName,
  labelClassName,
  minLength,
  trailingSlot,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  inputClassName: string;
  labelClassName: string;
  minLength?: number;
  trailingSlot?: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium", labelClassName)}>
      {label}
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={cn("w-full pr-12", inputClassName)}
          required
          minLength={minLength}
        />
        {trailingSlot ? <div className="absolute inset-y-0 right-3 flex items-center">{trailingSlot}</div> : null}
      </div>
    </label>
  );
}
