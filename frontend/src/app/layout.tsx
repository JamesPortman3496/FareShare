import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import AppShell from "../../components/AppShell";

export const metadata: Metadata = {
  title: "FareShare",
  description: "Coordinate and share costs with friends, teams, or communities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
          <AppShell>
            {children}
          </AppShell>
      </body>
    </html>
  );
}
