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
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-1 px-6 text-center md:hidden">
        <div className="space-y-3 rounded-2xl border border-border bg-background-2/90 px-6 py-8 shadow-2xl backdrop-blur">
          <div className="text-lg font-semibold text-text-1">FareShare</div>
          <p className="text-sm text-text-2">
            Not available on mobile yet. We&apos;re cooking up the mobile app—coming to the App Store soon.
          </p>
        </div>
      </div>

      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar />

        <main className={["mx-auto flex w-full flex-1 min-h-0 px-4 pb-6 pt-14 md:pt-16", containerWidth].join(" ")}>
          {children}
        </main>

        <footer className="border-t border-border bg-background-2 text-xs text-text-2">
          <div className={["mx-auto flex items-center justify-between px-4 py-3", "max-w-8xl"].join(" ")}>
            <span>© {new Date().getFullYear()} FareShare</span>
            <span>Built with Next.js</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
