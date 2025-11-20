export default function GroupsPage() {
  const groups = [
    { name: "House share", members: 3, expenses: 27 },
    { name: "Barcelona trip", members: 4, expenses: 18 },
    { name: "Team offsite", members: 8, expenses: 42 },
  ];

  return (
    <section className="w-full space-y-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
          <p className="text-sm text-text-3">
            Manage the groups where you&apos;re sharing costs.
          </p>
        </div>
        <button className="rounded-lg border border-border px-3 py-2 text-xs text-text-2 hover:bg-background-3">
          Create group
        </button>
      </header>

      <div className="overflow-hidden rounded-xl border border-border bg-background-3">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase text-text-3">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Members</th>
              <th className="px-4 py-2">Expenses</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {groups.map((group) => (
              <tr key={group.name}>
                <td className="px-4 py-2">{group.name}</td>
                <td className="px-4 py-2 text-text-3">
                  {group.members}
                </td>
                <td className="px-4 py-2 text-text-3">
                  {group.expenses}
                </td>
                <td className="px-4 py-2 text-xs">
                  <button className="rounded-md px-2 py-1 text-text-3 hover:bg-background-3">
                    View
                  </button>
                  <button className="ml-1 rounded-md px-2 py-1 text-text-3 hover:bg-background-3">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}