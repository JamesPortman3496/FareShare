"use client";

import { ReactNode, useEffect, useState } from "react";
import MainNav from "./MainNav";
import ColorModeMenu from "./ColorModeMenu";

interface AppShellProps {
  children: ReactNode;
}

type Mode = "system" | "light" | "dark";

export default function AppShell({ children }: AppShellProps) {
  const [mode, setMode] = useState<Mode>("system");

  // Initialise theme on mount using simple `localStorage.theme` semantics.
  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem("theme"); // 'light' | 'dark' | null
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      // mode: explicit stored theme -> use that, otherwise 'system'
      const initialMode: Mode = storedTheme === "light" || storedTheme === "dark" ? (storedTheme as Mode) : "system";

      setMode(initialMode);

      // Apply the `.dark` class per the simple rule used across many sites:
      // localStorage.theme === 'dark' || (no explicit theme && prefers-color-scheme: dark)
      document.documentElement.classList.toggle("dark", storedTheme === "dark" || (storedTheme === null && prefersDark));
    } catch {
      // If storage is unavailable, default to dark to avoid visual breakage
      document.documentElement.classList.add("dark");
      setMode("dark");
    }
  }, []);

  // When in `system` mode, listen for changes to the OS colour scheme
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    function handleChange(e: MediaQueryListEvent | MediaQueryList) {
      if (mode !== "system") return;
      const prefersDark = "matches" in e ? e.matches : mql.matches;
      const next = prefersDark ? "dark" : "light";
      // Only adjust the html class if the user hasn't stored an explicit theme
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme === null) {
        document.documentElement.classList.toggle("dark", next === "dark");
      }
    }
    // Older browsers use addListener, newer support addEventListener
    if (typeof mql.addEventListener === "function") {
      // @ts-ignore - DOM types vary by environment
      mql.addEventListener("change", handleChange);
    } else if (typeof mql.addListener === "function") {
      // @ts-ignore
      mql.addListener(handleChange);
    }

    return () => {
      if (typeof mql.removeEventListener === "function") {
        // @ts-ignore
        mql.removeEventListener("change", handleChange);
      } else if (typeof mql.removeListener === "function") {
        // @ts-ignore
        mql.removeListener(handleChange);
      }
    };
  }, [mode]);

  const setModeAndApply = (m: Mode) => {
    setMode(m);
    try {
      if (m === "system") {
        // Remove explicit theme so system preference applies
        window.localStorage.removeItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next = prefersDark ? "dark" : "light";
        document.documentElement.classList.toggle("dark", next === "dark");
      } else {
        // Explicit light/dark preference: persist and apply immediately
        window.localStorage.setItem("theme", m === "dark" ? "dark" : "light");
        const next = m === "dark" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", next === "dark");
      }
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background-2 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-1 text-sm font-bold text-background-1">
              FS
            </span>
            <div>
              <div className="text-sm font-semibold">FareShare</div>
              <div className="text-xs text-text-2">
                Share costs. Stay in sync.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MainNav />
            <ColorModeMenu mode={mode} onChange={setModeAndApply} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-border bg-background-2 text-xs text-text-2">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span>© {new Date().getFullYear()} FareShare</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
