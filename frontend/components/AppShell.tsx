"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar/NavBar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const containerWidth = isDashboard ? "max-w-8xl" : "max-w-7xl";

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className={["mx-auto flex w-full flex-1 px-4 pb-6 pt-20 md:pt-24", containerWidth].join(" ")}>
        {children}
      </main>

      <footer className="border-t border-border bg-background-2 text-xs text-text-2">
        <div className={["mx-auto flex items-center justify-between px-4 py-3", "max-w-8xl"].join(" ")}>
          <span>© {new Date().getFullYear()} FareShare</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
