"use client";

type Feature = { title: string; desc: string };

const FEATURES: Feature[] = [
  {
    title: "Fair splits that stay fair",
    desc: "Use percentages, shares, or fixed amounts so every expense is divided correctly, even when costs change.",
  },
  {
    title: "Receipts without the clutter",
    desc: "Attach notes and receipt images so you never have to dig through chats to prove a purchase.",
  },
  {
    title: "Settle up with confidence",
    desc: "See who owes what in real time and get nudges before totals snowball into awkward conversations.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {FEATURES.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-border bg-background-2/70 p-5 shadow-sm backdrop-blur"
        >
          <div className="text-lg font-semibold text-text-1">{item.title}</div>
          <p className="mt-2 text-sm text-text-3">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
