import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import AppShell from "../../components/AppShell";
import Providers from "../../components/providers";

export const metadata: Metadata = {
  title: "FareShare",
  description: "Coordinate and share costs with friends, teams, or communities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <AppShell>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
