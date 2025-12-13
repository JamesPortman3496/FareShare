"use client";

import { useState } from "react";

import {
  AuthForm,
  BackgroundGlow,
  BrandBadge,
  GradientPanel,
  IntroCopy,
  ModeSwitcher,
  NeutralPanel,
} from "@/components/pages/sign-in";

export default function SignInPage() {
  type AuthMode = "signin" | "signup";
  const [mode, setMode] = useState<AuthMode>("signin");
  const isSignIn = mode === "signin";

  return (
    <section className="relative flex min-h-screen w-screen flex-1 items-center justify-center overflow-hidden bg-background">
      <div className="relative flex min-h-screen w-screen overflow-hidden bg-background bg-opacity-90 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur">
        <BackgroundGlow />

        <div className="relative flex min-h-[700px] w-full">
          <GradientPanel>
            <div className="relative z-10 mx-auto w-full max-w-xl space-y-10">
              <BrandBadge />
              <IntroCopy
                variant="contrast"
                headline="Welcome Back"
                description="Sign in to keep every shared cost, split, and settlement perfectly in sync with your crew."
              />
              <AuthForm mode="signin" />
            </div>
          </GradientPanel>

          <NeutralPanel>
            <div className="relative z-10 mx-auto w-full max-w-xl space-y-10">
              <IntroCopy
                eyebrow="Start sharing"
                headline="Create Account"
                description="Sign up to split expenses with teammates, friends, or family and never lose track of what’s owed."
              />
              <AuthForm mode="signup" />
            </div>
          </NeutralPanel>

          <ModeSwitcher isSignIn={isSignIn} onToggle={() => setMode(isSignIn ? "signup" : "signin")} />
        </div>
      </div>
    </section>
  );
}
