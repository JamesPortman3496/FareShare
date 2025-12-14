import { cn } from "./cn";

export function SubmitButton({ isSignIn, disabled }: { isSignIn: boolean; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "w-full rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.99]",
        isSignIn
          ? "bg-surface-contrast text-primary-2 shadow-md hover:bg-surface-contrast/90"
          : "bg-primary-1 text-text-contrast shadow-md hover:bg-primary-2",
        disabled ? "cursor-not-allowed opacity-70" : "",
      )}
    >
      {isSignIn ? "Sign in" : "Create account"}
    </button>
  );
}
