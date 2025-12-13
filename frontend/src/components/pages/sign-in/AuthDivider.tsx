import { cn } from "./cn";

export function AuthDivider({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 text-xs", isSignIn ? "text-text-contrast/80" : "text-text-3")}>
      <div className={cn("h-px flex-1", isSignIn ? "bg-text-contrast/50" : "bg-border")} />
      <span>or continue with</span>
      <div className={cn("h-px flex-1", isSignIn ? "bg-text-contrast/50" : "bg-border")} />
    </div>
  );
}
