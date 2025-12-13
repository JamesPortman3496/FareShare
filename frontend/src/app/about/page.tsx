"use client";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-text-1">About FareShare</h1>
        <p className="text-text-2">
          FareShare makes it easy to track shared expenses, keep balances clear, and settle up without awkwardness.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-text-1">What we value</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-text-2">
            <li>Clarity on who owes what, in real time.</li>
            <li>Lightweight flows that stay out of your way.</li>
            <li>Privacy-first data handling.</li>
          </ul>
        </div>
        <div className="space-y-2 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-text-1">Who we serve</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-text-2">
            <li>Friends splitting trips and events.</li>
            <li>Housemates sharing recurring bills.</li>
            <li>Teams tracking one-off reimbursements.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
