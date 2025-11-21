"use client";

import { useDashboardContext } from "./layout";

type Group = { name: string; balance: string } | null;

export default function PageContent({ activeGroup }: { activeGroup: Group }) {
  const ctx = useDashboardContext();
  const group = activeGroup ?? ctx.activeGroup;

  if (!group) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-background-1/70 p-8 text-center text-text-3">
        Select a group from the sidebar to view its dashboard.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background-2/70 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Selected group</div>
            <div className="text-xl font-semibold text-text-1">{group.name}</div>
          </div>
          <button className="self-start rounded-lg border border-border bg-background-1/70 px-3 py-2 text-xs font-semibold text-text-1 shadow-sm hover:bg-background-3">
            Group settings
          </button>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-lg border border-border bg-background-1 px-3 py-2 text-text-2">
            Balance: <span className={group.balance.startsWith("+") ? "text-success font-semibold" : "text-warning font-semibold"}>{group.balance}</span>
          </span>
        </div>
      </div>

      <div className="min-h-[420px] rounded-2xl border border-border bg-background-1/80 p-4 shadow-inner">
        <div className="space-y-3 text-sm text-text-2">
          <div className="flex items-center justify-between rounded-lg border border-border bg-background-2/70 px-4 py-3">
            <span className="text-text-1 font-semibold">Group balance</span>
            <span className={group.balance.startsWith("+") ? "text-success font-semibold" : "text-warning font-semibold"}>
              {group.balance}
            </span>
          </div>
          <div className="rounded-lg border border-dashed border-border bg-background-1/60 px-4 py-6 text-center text-text-3">
            Quick snapshot of who owes what will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}
