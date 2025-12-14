import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AuthDivider } from "./AuthDivider";
import { AuthProviders } from "./AuthProviders";
import { cn } from "./cn";
import { FormField } from "./FormField";
import { SignInExtras } from "./SignInExtras";
import { SubmitButton } from "./SubmitButton";
import type { AuthMode } from "./types";
import { ToggleVisibility } from "./ToggleVisibility";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isSignIn = mode === "signin";
  const labelColor = isSignIn ? "text-text-contrast" : "text-text-1";
  const mutedColor = isSignIn ? "text-text-contrast/80" : "text-text-3";
  const inputStyles = isSignIn
    ? "rounded-xl border border-surface-contrast/70 bg-surface-contrast px-4 py-3 text-sm text-text-1 outline-none ring-text-contrast/50 transition placeholder:text-text-3 focus:ring-2"
    : "rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-1 outline-none ring-primary-1/60 transition placeholder:text-text-3 focus:ring-2";
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string) || "";
    const name = (formData.get("name") as string) || undefined;
    const confirmPassword = (formData.get("confirmPassword") as string) || "";

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      name,
      mode,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Unable to sign in. Please check your details and try again.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form className="relative z-10 mx-auto w-full max-w-xl space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" && (
        <FormField
          label="Name"
          placeholder="Jane Doe"
          name="name"
          inputClassName={inputStyles}
          labelClassName={labelColor}
        />
      )}

      <FormField
        label="Email"
        type="email"
        placeholder="you@example.com"
        name="email"
        inputClassName={inputStyles}
        labelClassName={labelColor}
      />

      <FormField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder={isSignIn ? "At least 8 characters" : "Create a strong password"}
        name="password"
        inputClassName={inputStyles}
        labelClassName={labelColor}
        minLength={8}
        trailingSlot={
          <ToggleVisibility
            pressed={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            ariaLabel={showPassword ? "Hide password" : "Show password"}
          />
        }
      />

      {mode === "signup" && (
        <FormField
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat your password"
          name="confirmPassword"
          inputClassName={inputStyles}
          labelClassName={labelColor}
          minLength={8}
          trailingSlot={
            <ToggleVisibility
              pressed={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              ariaLabel={showConfirm ? "Hide password" : "Show password"}
            />
          }
        />
      )}

      {isSignIn && <SignInExtras />}

      <SubmitButton isSignIn={isSignIn} disabled={submitting} />

      <AuthDivider isSignIn={isSignIn} />

      <AuthProviders isSignIn={isSignIn} />

      {error ? <p className="text-sm text-danger">{error}</p> : null}

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
