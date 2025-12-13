"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import MobileBlocker from "./MobileBlocker";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname === "/sign-in";
  const containerWidth = isDashboard ? "max-w-8xl" : "max-w-7xl";

  return (
    <div className="relative min-h-screen">
      <MobileBlocker />

      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar />

        {isAuth ? (
          <main className="flex w-full flex-1 min-h-0 pb-6 pt-14 md:pt-16">{children}</main>
        ) : (
          <main
            className={["mx-auto flex w-full flex-1 min-h-0 pb-6 pt-14 md:pt-16 px-4", containerWidth].join(" ")}
          >
            {children}
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
}
