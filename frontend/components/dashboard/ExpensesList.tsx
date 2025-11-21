"use client";

type Entry = {
  id: string;
  dateLabel: string; // e.g. "Nov 10"
  title: string;
  payer: string;
  amount: string;
  type: "lent" | "borrowed";
};

const data: { month: string; entries: Entry[] }[] = [
  {
    month: "November 2024",
    entries: [
      { id: "nov-10", dateLabel: "Nov 10", title: "AirBnb", payer: "you paid £450", amount: "£360", type: "lent" },
      { id: "nov-08", dateLabel: "Nov 8", title: "Boat tour", payer: "Chris paid £100", amount: "£20", type: "borrowed" },
    ],
  },
  {
    month: "October 2024",
    entries: [
      { id: "oct-30a", dateLabel: "Oct 30", title: "Lunch", payer: "you paid £40", amount: "£32", type: "lent" },
      { id: "oct-30b", dateLabel: "Oct 30", title: "Lunch", payer: "Adam paid £50", amount: "£10", type: "borrowed" },
      { id: "oct-28", dateLabel: "Oct 28", title: "Coffee", payer: "Hannah paid £25", amount: "£5", type: "borrowed" },
    ],
  },
];

export default function ExpensesList() {
  return (
    <div className="space-y-6">
      {data.map((section) => (
        <div key={section.month} className="space-y-3">
          <div className="text-sm font-semibold text-text-1">{section.month}</div>
          <div className="space-y-3">
            {section.entries.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-background-2/80 p-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between"
              >
                <div className="flex gap-3 md:items-center">
                  <div className="flex h-14 w-16 flex-col items-center justify-center rounded-lg border border-border bg-background-1 text-xs font-semibold text-text-2">
                    {entry.dateLabel.split(" ").map((part, idx) => (
                      <span key={idx} className={idx === 1 ? "text-text-1 text-sm" : undefined}>
                        {part}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-text-1">{entry.title}</div>
                    <div className="text-xs text-text-3">{entry.payer}</div>
                  </div>
                </div>
                <div
                  className={[
                    "flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold",
                    entry.type === "lent"
                      ? "border-success/50 bg-success/10 text-success"
                      : "border-warning/40 bg-warning/10 text-warning",
                  ].join(" ")}
                >
                  {entry.type === "lent" ? "you lent" : "you borrowed"} {entry.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
