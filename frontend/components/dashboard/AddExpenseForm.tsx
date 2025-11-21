"use client";

import { useMemo, useState } from "react";

const MOCK_MEMBERS = ["You", "Alex", "Sam", "Hannah", "Chris"];

export default function AddExpenseForm() {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [payer, setPayer] = useState(MOCK_MEMBERS[0]);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitMembers, setSplitMembers] = useState<string[]>([...MOCK_MEMBERS]);

  const splitLabel = useMemo(() => {
    if (splitMembers.length === MOCK_MEMBERS.length) return "Equally";
    if (splitMembers.length === 1) return splitMembers[0];
    return `${splitMembers.length} selected`;
  }, [splitMembers]);

  const toggleMember = (name: string) => {
    setSplitMembers((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  const submit = () => {
    // placeholder submit
    console.log({ description, cost, payer, splitMembers });
  };

  return (
    <div className="rounded-2xl border border-border bg-background-1/80 p-6 shadow-inner">
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <div className="text-lg font-semibold text-text-1">Add expense</div>
          <div className="text-xs text-text-3">Log a cost and decide who splits it.</div>
        </div>

        <div className="space-y-3">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-lg border border-border bg-background-1 px-4 py-3 text-sm text-text-1 outline-none ring-primary-1/40 focus:ring-2"
          />
          <input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Cost"
            className="w-full rounded-lg border border-border bg-background-1 px-4 py-3 text-sm text-text-1 outline-none ring-primary-1/40 focus:ring-2"
          />

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-2">
            <span>Paid by</span>
            <select
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              className="rounded-md border border-border bg-background-1 px-3 py-2 text-text-1 outline-none ring-primary-1/40 focus:ring-2"
            >
              {MOCK_MEMBERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <span>split between</span>
            <button
              type="button"
              onClick={() => setSplitOpen(true)}
              className="rounded-lg border border-border bg-background-2 px-3 py-2 text-xs font-semibold text-text-1 hover:bg-background-3"
            >
              {splitLabel.toLowerCase()}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={submit}
            className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2"
          >
            Add expense
          </button>
        </div>
      </div>

      {splitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background-1 p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-text-1">Select members</div>
              <button
                onClick={() => setSplitOpen(false)}
                className="rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {MOCK_MEMBERS.map((m) => {
                const selected = splitMembers.includes(m);
                return (
                  <div
                    key={m}
                    className={[
                      "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                      selected
                        ? "border-primary-1 bg-primary-1/10 text-text-1"
                        : "border-border bg-background-2 text-text-2",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-3 text-xs font-semibold text-text-2">
                        {m.slice(0, 1)}
                      </div>
                      <span className="text-text-1">{m}</span>
                    </div>
                    <button
                      onClick={() => toggleMember(m)}
                      className={[
                        "rounded-md border px-3 py-1 text-xs font-semibold transition",
                        selected
                          ? "border-primary-1 bg-primary-1/20 text-primary-1"
                          : "border-border bg-background-1 text-text-2 hover:bg-background-3",
                      ].join(" ")}
                    >
                      {selected ? "Selected" : "Select"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
