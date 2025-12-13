import { cn } from "./cn";

export function AuthProviders({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <button
        type="button"
        className={cn(
          "rounded-full px-4 py-2 text-xs font-semibold transition hover:bg-background-3",
          isSignIn
            ? "border border-text-contrast/70 bg-text-contrast/10 text-text-contrast backdrop-blur"
            : "border border-border bg-background text-text-1",
        )}
      >
        Google
      </button>
    </div>
  );
}
