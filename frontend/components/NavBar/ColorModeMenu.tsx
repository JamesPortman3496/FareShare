"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Mode = "system" | "light" | "dark";

interface Props {
}

export default function ColorModeMenu(_: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("system");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function initTheme() {
      try {
        const storedTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial: Mode = storedTheme === "light" || storedTheme === "dark" ? (storedTheme as Mode) : "system";
        setMode(initial);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark" || (storedTheme === null && prefersDark)
        );
      } catch {
        setMode("dark");
        document.documentElement.classList.add("dark");
      }
    }
    initTheme();
  }, []);

  useEffect(() => {
    try {
      const next = mode === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : mode;
      document.documentElement.classList.toggle("dark", next === "dark");
      if (mode === "system") {
        window.localStorage.removeItem("theme");
      } else {
        window.localStorage.setItem("theme", mode);
      }
    } catch {
      // ignore
    }
  }, [mode]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-md border border-border bg-background-2 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-background-3"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-xs uppercase tracking-wide text-text-2">Account</span>
        <span className="rounded-full bg-primary-1 px-2 py-0.5 text-[10px] font-semibold text-background-1">
          Settings
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-background-2 p-3 shadow-md">
          <div className="mb-3 rounded-lg bg-background-3 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">
              Account
            </div>
            <div className="mt-1 text-sm text-text-2">Sign in to access your groups and payments.</div>
            <Link
              href="/sign-in"
              className="mt-3 flex w-full justify-center rounded-md bg-primary-1 px-3 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">
            Appearance
          </div>
          <form className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-background-3">
              <input
                type="radio"
                name="mode"
                value="system"
                checked={mode === "system"}
                onChange={() => setMode("system")}
              />
              <span className="text-sm text-text-1">System theme</span>
            </label>

            <label className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-background-3">
              <input
                type="radio"
                name="mode"
                value="dark"
                checked={mode === "dark"}
                onChange={() => setMode("dark")}
              />
              <span className="text-sm text-text-1">Dark</span>
            </label>

            <label className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-background-3">
              <input
                type="radio"
                name="mode"
                value="light"
                checked={mode === "light"}
                onChange={() => setMode("light")}
              />
              <span className="text-sm text-text-1">Light</span>
            </label>
          </form>
        </div>
      )}
    </div>
  );
}
