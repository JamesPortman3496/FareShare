import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";
import AppProviders from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "FareShare",
  description: "Coordinate and share costs with friends, teams, or communities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
