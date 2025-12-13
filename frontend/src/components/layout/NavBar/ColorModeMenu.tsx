"use client";

import { useEffect, useRef, useState } from "react";
type Mode = "system" | "light" | "dark";

export default function ColorModeMenu() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("system");
  const [isDark, setIsDark] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    function initTheme() {
      try {
        const storedTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial: Mode = storedTheme === "light" || storedTheme === "dark" ? (storedTheme as Mode) : "system";
        setMode(initial);
        const enabled = storedTheme === "dark" || (storedTheme === null && prefersDark);
        document.documentElement.classList.toggle("dark", enabled);
        setIsDark(enabled);
      } catch {
        setMode("dark");
        document.documentElement.classList.add("dark");
        setIsDark(true);
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
      setIsDark(next === "dark");
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
    document.addEventListener("click", onDoc, { capture: true });
    return () => document.removeEventListener("click", onDoc, { capture: true } as any);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setSpinning(true);
    const timeout = window.setTimeout(() => setSpinning(false), 450);
    return () => window.clearTimeout(timeout);
  }, [isDark]);

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    setMode(next);
  }

  return (
    <div className="relative flex items-center gap-1" ref={ref}>
      <button
        type="button"
        onClick={toggleTheme}
        className={[
          "flex items-center justify-center rounded-full p-2 text-text-1 hover:text-primary-1 transition",
          spinning ? "animate-[spin_0.45s_linear]" : "",
        ].join(" ")}
        aria-label="Toggle color mode"
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>

      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full p-2 text-text-1 hover:text-primary-1"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Settings"
      >
        <CogIcon className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-md border border-border bg-background-2 p-3 shadow-md">
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

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07-1.41 1.41M7.34 16.66l-1.41 1.41m0-13.48 1.41 1.41m10.32 10.32 1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function CogIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.51 1.1 1.65 1.65 0 0 1-3 0A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.1-1.51 1.65 1.65 0 0 1 0-3A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.51-1.1 1.65 1.65 0 0 1 3 0A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.38.16.72.4 1.01.69.9.9.9 2.36 0 3.27-.29.29-.63.53-1.01.69Z" />
    </svg>
  );
}
