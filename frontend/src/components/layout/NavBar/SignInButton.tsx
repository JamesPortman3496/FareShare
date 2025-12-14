"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-9 w-[88px] animate-pulse rounded-md border border-border bg-background-1/70" />
    );
  }

  if (session?.user) return null;

  return (
    <Link
      href="/sign-in"
      className="rounded-md border border-border bg-background-1 px-3 py-1.5 text-sm font-semibold text-text-1 shadow-sm transition hover:bg-background-3"
    >
      Sign in
    </Link>
  );
}
