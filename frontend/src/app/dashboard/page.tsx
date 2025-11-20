export default function DashboardPage() {
  // Later this will be driven by real data
  const groups = [
    { name: "House share", balance: "+£32", status: "In progress" },
    { name: "Ski trip", balance: "-£18", status: "Needs settling" },
    { name: "Team offsite", balance: "+£210", status: "Settled" },
  ];

  return (
    <section className="w-full space-y-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-text-3">
            Overview of your groups and what&apos;s outstanding.
          </p>
        </div>
        <button className="rounded-lg bg-primary-1 px-3 py-2 text-xs font-medium text-background-1 hover:bg-primary-2">
          New group
        </button>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {groups.map((group) => (
          <article
            key={group.name}
            className="rounded-lg border border-border bg-background-3 p-3 text-sm"
          >
            <h2 className="text-sm font-semibold">{group.name}</h2>
            <p className="mt-1 text-xs text-text-3">{group.status}</p>
            <p className="mt-2 text-sm">
              Group balance:{" "}
              <span
                className={
                  group.balance.startsWith("-")
                    ? "text-warning"
                    : "text-success"
                }
              >
                {group.balance}
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}