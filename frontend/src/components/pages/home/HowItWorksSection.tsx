"use client";

const STEPS = [
  { step: "Step 1", title: "Create your group", desc: "Invite housemates, teammates, or trip pals in seconds." },
  { step: "Step 2", title: "Log expenses", desc: "Split by shares or exact amounts with receipts attached." },
  { step: "Step 3", title: "Settle up", desc: "Track balances live and nudge before it gets awkward." },
];

export default function HowItWorksSection() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-border bg-background-2/60 p-6 md:grid md:items-center">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-text-3">How it works</div>
        <h2 className="mt-2 text-2xl font-semibold text-text-1">Three steps to a zero-drama money chat.</h2>
        <p className="mt-1 text-sm text-text-3">Set up in minutes, bring your group in, and keep every balance clear.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="rounded-xl border border-border bg-background-1 p-4">
              <div className="text-xs font-semibold text-text-3">{item.step}</div>
              <div className="text-sm font-semibold text-text-1">{item.title}</div>
              <p className="mt-1 text-xs text-text-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
