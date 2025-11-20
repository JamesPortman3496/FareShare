export default function HomePage() {
  return (
    <section className="flex w-full flex-col gap-6 md:flex-row">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Organise shared costs without the spreadsheet chaos.
        </h1>
        <p className="text-sm text-text-3 md:text-base">
          FareShare helps you and your group keep track of who&apos;s paid for
          what, split expenses fairly, and stay aligned on budgets — whether
          it&apos;s trips, team events, or house shares.
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-primary-1 px-4 py-2 text-sm font-medium text-background-1 hover:bg-primary-2">
            Go to dashboard
          </button>
          <button className="rounded-lg border border-border px-4 py-2 text-sm text-text-2 hover:bg-background-3">
            Create a demo group
          </button>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-text-3">
          <li>• Create groups for trips, teams, or households.</li>
          <li>• Log expenses and see who owes what at a glance.</li>
          <li>• Keep a shared, transparent history of payments.</li>
        </ul>
      </div>

      <aside className="mt-6 flex-1 rounded-xl border border-border bg-background-3 p-4 text-sm text-text-2 md:mt-0">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-3">
          Example group snapshot
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Barcelona Trip</span>
            <span className="text-success">+ £120 settled</span>
          </div>
          <div className="flex justify-between text-xs text-text-3">
            <span>4 members · 18 expenses</span>
            <span>2 outstanding</span>
          </div>

          <hr className="my-2 border-border" />

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Alex → group</span>
              <span>£40 (accommodation)</span>
            </div>
            <div className="flex justify-between">
              <span>Sam → group</span>
              <span>£25 (dinner)</span>
            </div>
            <div className="flex justify-between">
              <span>You → Alex</span>
              <span className="text-warning">£15 due</span>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
