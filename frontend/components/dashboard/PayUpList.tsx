"use client";

import { useMemo, useState } from "react";

type MemberBalance = {
  name: string;
  amount: number; // positive means they owe you, negative means you owe them
  bank?: string;
};

const MOCK_BALANCES: MemberBalance[] = [
  { name: "Alex", amount: -45, bank: "Sort: 12-34-56, Acc: 12345678" },
  { name: "Sam", amount: 30, bank: "Monzo @sam" },
  { name: "Hannah", amount: -12, bank: "IBAN: GB29 NWBK 6016 1331 9268 19" },
];

export default function PayUpList() {
  const [selected, setSelected] = useState<MemberBalance | null>(null);

  const sorted = useMemo(
    () => MOCK_BALANCES.sort((a, b) => b.amount - a.amount),
    []
  );

  return (
    <>
      <div className="space-y-3 rounded-2xl border border-border bg-background-1/80 p-4 shadow-inner">
        {sorted.map((m) => {
          const youOwe = m.amount < 0;
          const owesYou = m.amount > 0;
          return (
            <div
              key={m.name}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background-2/70 p-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background-3 text-sm font-semibold text-text-2">
                  {m.name.slice(0, 1)}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-text-1">{m.name}</div>
                  <div className="text-xs text-text-3">
                    {youOwe && "You owe them"}{owesYou && "Owes you"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                    youOwe ? "border-warning/50 bg-warning/10 text-warning" : "border-success/50 bg-success/10 text-success",
                  ].join(" ")}
                >
                  {youOwe ? "you owe" : "owes you"} £{Math.abs(m.amount).toFixed(2)}
                </span>
                {youOwe ? (
                  <button
                    onClick={() => setSelected(m)}
                    className="rounded-lg border border-border bg-primary-1/15 px-3 py-2 text-xs font-semibold text-primary-1 hover:bg-primary-1/25"
                  >
                    Pay
                  </button>
                ) : (
                  <button className="rounded-lg border border-border bg-background-1/70 px-3 py-2 text-xs font-semibold text-text-1 hover:bg-background-3">
                    Nudge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background-1 p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Pay popup</div>
                <div className="text-sm font-semibold text-text-1">You owe {selected.name} £{Math.abs(selected.amount).toFixed(2)}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
              >
                Close
              </button>
            </div>

            <div className="mt-3 space-y-2 text-sm text-text-2">
              <div className="rounded-lg border border-border bg-background-2 px-3 py-2">
                <div className="text-xs uppercase tracking-wide text-text-3">User bank details</div>
                <div className="mt-1 text-text-1">{selected.bank || "Bank details not provided"}</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="rounded-md border border-border px-4 py-2 text-sm text-text-2 hover:bg-background-3"
              >
                Cancel
              </button>
              <button className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2">
                Record a payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
