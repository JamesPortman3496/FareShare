"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
