"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "expenses", label: "Expenses" },
  { key: "add-expense", label: "Add expense" },
  { key: "pay-up", label: "Pay up" },
];

export default function TabNav({ groupId }: { groupId: string }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {tabs.map((tab) => {
        const href = `/dashboard/group/${groupId}/${tab.key}`;
        const active = pathname?.endsWith(`/${tab.key}`);
        return (
          <Link
            key={tab.key}
            href={href}
            className={[
              "rounded-lg border px-3 py-2 transition",
              active
                ? "border-primary-1 bg-primary-1/15 text-text-1 shadow-sm"
                : "border-border bg-background-1/70 text-text-2 hover:border-primary-1/60 hover:bg-background-3",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
