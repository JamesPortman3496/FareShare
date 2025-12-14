"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

type Theme = "light" | "dark";

interface MainNavProps {
}

export default function PageNavigation(_: MainNavProps) {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <div className="flex items-center gap-3 text-sm">
      <nav className="flex items-center gap-2">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href);

          if (link.href === "/dashboard" && status !== "authenticated") {
            return (
              <Link
                key={link.href}
                href="/sign-in"
                className={[
                  "rounded-md px-3 py-1 transition-colors",
                  active
                    ? "bg-primary-1 text-background-1"
                    : "text-text-2 hover:bg-background-3 hover:text-text-1",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "rounded-md px-3 py-1 transition-colors",
                active
                    ? "bg-primary-1 text-background-1"
                      : "text-text-2 hover:bg-background-3 hover:text-text-1",
              ].join(" ")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* placeholder slot for controls; AppShell places color-mode control in header */}
    </div>
  );
}
