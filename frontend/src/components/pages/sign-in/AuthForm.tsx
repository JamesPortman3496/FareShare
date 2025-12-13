import { AuthDivider } from "./AuthDivider";
import { AuthProviders } from "./AuthProviders";
import { cn } from "./cn";
import { FormField } from "./FormField";
import { SignInExtras } from "./SignInExtras";
import { SubmitButton } from "./SubmitButton";
import type { AuthMode } from "./types";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isSignIn = mode === "signin";
  const labelColor = isSignIn ? "text-text-contrast" : "text-text-1";
  const mutedColor = isSignIn ? "text-text-contrast/80" : "text-text-3";
  const inputStyles = isSignIn
    ? "rounded-xl border border-surface-contrast/70 bg-surface-contrast px-4 py-3 text-sm text-text-1 outline-none ring-text-contrast/50 transition placeholder:text-text-3 focus:ring-2"
    : "rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-1 outline-none ring-primary-1/60 transition placeholder:text-text-3 focus:ring-2";

  return (
    <form className="relative z-10 mx-auto w-full max-w-xl space-y-4">
      {mode === "signup" && (
        <FormField
          label="Name"
          placeholder="Jane Doe"
          inputClassName={inputStyles}
          labelClassName={labelColor}
        />
      )}

      <FormField
        label="Email"
        type="email"
        placeholder="you@example.com"
        inputClassName={inputStyles}
        labelClassName={labelColor}
      />

      <FormField
        label="Password"
        type="password"
        placeholder={isSignIn ? "At least 8 characters" : "Create a strong password"}
        inputClassName={inputStyles}
        labelClassName={labelColor}
        minLength={8}
      />

      {mode === "signup" && (
        <FormField
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          inputClassName={inputStyles}
          labelClassName={labelColor}
          minLength={8}
        />
      )}

      {isSignIn && <SignInExtras />}

      <SubmitButton isSignIn={isSignIn} />

      <AuthDivider isSignIn={isSignIn} />

      <AuthProviders isSignIn={isSignIn} />

      <p className={cn("text-xs", mutedColor)}>
        By continuing you agree to our{" "}
        <a className={isSignIn ? "text-text-contrast hover:underline" : "text-primary-1 hover:underline"} href="/terms">
          Terms
        </a>{" "}
        and{" "}
        <a className={isSignIn ? "text-text-contrast hover:underline" : "text-primary-1 hover:underline"} href="/privacy">
          Privacy
        </a>
        .
      </p>
    </form>
  );
}
