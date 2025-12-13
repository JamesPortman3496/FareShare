"use client";

function EmptyPoint({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-primary-1" aria-hidden="true" />
      <span>{text}</span>
    </li>
  );
}

export default function DashboardEmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-border bg-background-2/80">
      <div className="w-full max-w-3xl space-y-4 p-6 text-center text-text-2">
        <h1 className="text-xl font-semibold text-text-1">Select a group to get started</h1>
        <p className="text-sm text-text-3">
          Choose a group from the sidebar to view its overview, expenses, and settings. You can create a new group any time.
        </p>
        <ul className="grid gap-2 rounded-xl border border-border bg-background-1/70 p-4 text-left text-sm text-text-2">
          <EmptyPoint text="Overview: see balances, recent activity, and trends." />
          <EmptyPoint text="Expenses: log and review shared costs by member." />
          <EmptyPoint text="Settings: update group name and members." />
        </ul>
      </div>
    </div>
  );
}
