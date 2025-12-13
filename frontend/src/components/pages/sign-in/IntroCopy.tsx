import { cn } from "./cn";

export function IntroCopy({
  eyebrow,
  headline,
  description,
  variant = "base",
}: {
  eyebrow?: string;
  headline: string;
  description: string;
  variant?: "base" | "contrast";
}) {
  const isContrast = variant === "contrast";

  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.24em]",
            isContrast ? "text-text-contrast/80" : "text-primary-1",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <div className="space-y-2">
        <h2
          className={cn(
            "text-4xl font-semibold tracking-tight",
            isContrast ? "text-text-contrast leading-tight" : "text-text-1",
          )}
        >
          {headline}
        </h2>
        <p className={cn("text-sm", isContrast ? "text-text-contrast/80" : "text-text-2")}>{description}</p>
      </div>
    </div>
  );
}
