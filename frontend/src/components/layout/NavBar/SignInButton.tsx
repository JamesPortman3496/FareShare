"use client";

import Link from "next/link";

export default function SignInButton() {
  return (
    <Link
      href="/sign-in"
      className="rounded-md border border-border bg-background-1 px-3 py-1.5 text-sm font-semibold text-text-1 shadow-sm transition hover:bg-background-3"
    >
      Sign in
    </Link>
  );
}
