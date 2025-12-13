"use client";

import DashboardEmptyState from "@/components/pages/dashboard/DashboardEmptyState";

export default function DashboardIndexPage() {
  return (
    <div className="flex h-full w-full items-stretch">
      <DashboardEmptyState />
    </div>
  );
}
