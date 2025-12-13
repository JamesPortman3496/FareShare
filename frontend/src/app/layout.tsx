import type { Metadata } from "next";
import { ReactNode } from "react";
import { Manrope } from "next/font/google";

import AppShell from "@/components/layout/AppShell";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FareShare",
  description: "Coordinate and share costs with friends, teams, or communities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen antialiased`}>
        <AppProviders>
          <AppShell>
            {children}
          </AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
