import { cn } from "./cn";

export function ModeSwitcher({ isSignIn, onToggle }: { isSignIn: boolean; onToggle: () => void }) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 w-1/2 basis-1/2 bg-gradient-to-br from-primary-3 via-primary-1 to-primary-2 text-text-contrast shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition-transform duration-500 ease-out",
        "border-x border-text-contrast/10",
        isSignIn ? "translate-x-full" : "translate-x-0",
      )}
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-14%] top-[-18%] h-[260px] w-[260px] rounded-full bg-text-contrast/12 blur-2xl" />
        <div className="absolute right-10 bottom-10 h-16 w-16 rotate-12 rounded-2xl border border-text-contrast/25" />
        <div className="absolute right-24 top-16 h-14 w-14 rotate-6 rounded-2xl bg-text-contrast/14 blur-md" />
      </div>

      <div className="relative flex h-full flex-col justify-center gap-7 px-16 py-12">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-contrast/80">
            {isSignIn ? "New here?" : "Welcome back"}
          </p>
          <h3 className="text-3xl font-semibold tracking-tight">
            {isSignIn ? "Join the crew" : "Glad to see you"}
          </h3>
          <p className="max-w-md text-sm text-text-contrast/80">
            {isSignIn
              ? "Create an account to start sharing and settling up together."
              : "Sign back in to pick up where you left off."}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="w-fit rounded-full border border-text-contrast/80 bg-text-contrast/10 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:scale-[1.02] hover:bg-text-contrast/20 active:scale-[0.99]"
        >
          {isSignIn ? "Sign up instead" : "Sign in instead"}
        </button>
      </div>
    </div>
  );
}
