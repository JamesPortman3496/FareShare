"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchExpensesForGroup } from "@/lib/api-client/expenses";
import { Expense } from "@/types/expenses";
import { useDashboardContext } from "@/app/dashboard/layout";

type MemberBalance = {
  email: string;
  name: string;
  amount: number; // positive means they owe you, negative means you owe them
  bank?: string;
};

const CURRENT_USER_EMAIL = "james.portman3496@gmail.com";

export default function PayUpList({ groupId }: { groupId: string }) {
  const { activeGroup, groups } = useDashboardContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<MemberBalance | null>(null);
  const [nudge, setNudge] = useState<MemberBalance | null>(null);

  const membersMap = useMemo(() => {
    const group = activeGroup?.id === groupId ? activeGroup : groups.find((g) => g.id === groupId);
    return (
      group?.members?.reduce<Record<string, string>>((acc, m) => {
        acc[m.email] = m.displayName ?? m.email;
        return acc;
      }, {}) ?? {}
    );
  }, [activeGroup, groupId, groups]);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchExpensesForGroup(groupId);
        if (!active) return;
        setExpenses(data);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load expenses");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [groupId]);

  const balances = useMemo(() => {
    const map = new Map<string, MemberBalance>();
    const reasons = new Map<string, { exp: Expense; amount: number; type: "owed_to_you" | "you_owe" }[]>();

    const ensure = (email: string) => {
      if (!map.has(email)) {
        map.set(email, { email, name: membersMap[email] ?? email, amount: 0 });
      }
      return map.get(email)!;
    };

    expenses.forEach((exp) => {
      const payerEmail = exp.paidBy.email;

      if (payerEmail === CURRENT_USER_EMAIL) {
        // Others owe you
        exp.owes.forEach((o) => {
          if (o.email === CURRENT_USER_EMAIL) return;
          const other = ensure(o.email);
          other.amount += o.amount; // positive = they owe you
          if (!reasons.has(other.email)) reasons.set(other.email, []);
          reasons.get(other.email)!.push({ exp, amount: o.amount, type: "owed_to_you" });
        });
      } else {
        // You owe the payer if you're in owes
        const yourShare = exp.owes.find((o) => o.email === CURRENT_USER_EMAIL)?.amount ?? 0;
        if (yourShare > 0) {
          const payer = ensure(payerEmail);
          payer.amount -= yourShare; // negative = you owe them
          if (!reasons.has(payerEmail)) reasons.set(payerEmail, []);
          reasons.get(payerEmail)!.push({ exp, amount: yourShare, type: "you_owe" });
        }
      }
    });

    // Remove current user entry; we'll only show others
    map.delete(CURRENT_USER_EMAIL);
    return {
      balances: Array.from(map.values()).sort((a, b) => b.amount - a.amount),
      reasons,
    };
  }, [expenses, membersMap]);

  if (loading) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-4 py-3 text-sm text-text-3">
        Loading pay up…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-warning/50 bg-warning/10 px-4 py-3 text-sm text-warning">
        {error}
      </div>
    );
  }

  if (balances.balances.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-4 py-3 text-sm text-text-3">
        No balances yet.
      </div>
    );
  }

  const totals = balances.balances.reduce(
    (acc, b) => {
      if (b.amount > 0) acc.owed += b.amount;
      if (b.amount < 0) acc.owe += Math.abs(b.amount);
      return acc;
    },
    { owed: 0, owe: 0 }
  );
  const net = totals.owed - totals.owe;
  const netLabel =
    net > 0
      ? `You’re owed £${net.toFixed(2)} in total`
      : net < 0
        ? `You owe £${Math.abs(net).toFixed(2)} in total`
        : "You’re settled up";

  return (
    <>
      <div className="space-y-2 rounded-2xl border border-border bg-background-1/80 p-4 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="text-text-1 font-semibold">{netLabel}</div>
          {net > 0 && (
            <button
              onClick={() => setNudge({ email: "all", name: "everyone", amount: net })}
              className="rounded-md border border-border bg-background-2 px-3 py-2 text-xs font-semibold text-text-1 hover:bg-background-3"
            >
              Nudge all
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-3">
          <span className="rounded-md border border-success/50 bg-success/10 px-2 py-1 font-semibold text-success">
            Owed to you: £{totals.owed.toFixed(2)}
          </span>
          <span className="rounded-md border border-warning/50 bg-warning/10 px-2 py-1 font-semibold text-warning">
            You owe: £{totals.owe.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="w-full space-y-3 pt-3">
        {balances.balances.map((m) => {
          const youOwe = m.amount < 0;
          const owesYou = m.amount > 0;
          const amountAbs = Math.abs(m.amount);
          const isExpanded = expanded.has(m.email);
          const breakdown = balances.reasons.get(m.email) ?? [];
          return (
            <div
              key={m.email}
              className="w-full rounded-xl border border-border bg-background-2/70 shadow-sm backdrop-blur"
            >
              <div
                className="flex w-full flex-col gap-2 px-3 py-3 text-left md:flex-row md:items-center md:justify-between"
                onClick={() =>
                  setExpanded((prev) => {
                    const next = new Set(prev);
                    if (next.has(m.email)) next.delete(m.email);
                    else next.add(m.email);
                    return next;
                  })
                }
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
                  {youOwe ? "you owe" : "owes you"} £{amountAbs.toFixed(2)}
                </span>
                <button
                  type="button"
                  className={[
                    "rounded-lg border px-3 py-2 text-xs font-semibold",
                    youOwe
                      ? "border-primary-1/60 bg-primary-1/15 text-primary-1"
                      : "border-border bg-background-1/70 text-text-1",
                  ].join(" ")}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (youOwe) {
                      setModal(m);
                    } else {
                      setNudge(m);
                    }
                  }}
                >
                  {youOwe ? "Pay" : "Nudge"}
                </button>
              </div>
              </div>

              {isExpanded && (
                <div className="border-t border-border bg-background-1/60 px-3 py-3 text-sm text-text-2">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-3">Breakdown</div>
                  <div className="space-y-2">
                    {breakdown.map((item) => (
                    <div
                      key={item.exp.id}
                      className="flex w-full items-center justify-between rounded-md border border-border bg-background-2/70 px-3 py-2 text-xs"
                    >
                        <div className="space-y-0.5">
                          <div className="font-semibold text-text-1">{item.exp.description}</div>
                          <div className="text-text-3">
                            {item.type === "owed_to_you"
                              ? `You paid — ${m.name} owes you £${item.amount.toFixed(2)}`
                              : `${membersMap[item.exp.paidBy.email] ?? item.exp.paidBy.name ?? item.exp.paidBy.email} paid — you owe them £${item.amount.toFixed(2)}`}
                            {" • "}
                            {new Date(item.exp.date).toLocaleDateString("en-GB")}
                          </div>
                        </div>
                        <span
                          className={[
                            "rounded-md border px-2 py-1 font-semibold",
                            item.type === "owed_to_you"
                              ? "border-success/50 bg-success/10 text-success"
                              : "border-warning/50 bg-warning/10 text-warning",
                          ].join(" ")}
                        >
                          {item.type === "owed_to_you" ? "+" : "-"} £{item.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {breakdown.length === 0 && (
                      <div className="rounded-md border border-dashed border-border bg-background-1/50 px-3 py-2 text-xs text-text-3">
                        No expense breakdown available.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background-1 p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Pay popup</div>
                <div className="text-sm font-semibold text-text-1">
                  You owe {modal.name} £{Math.abs(modal.amount).toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
              >
                Close
              </button>
            </div>

            <div className="mt-3 space-y-3 text-sm text-text-2">
              <div className="rounded-lg border border-border bg-background-2 px-3 py-2">
                <div className="text-xs uppercase tracking-wide text-text-3">User bank details</div>
                <div className="mt-1 text-text-1">{modal.bank || "Bank details not provided"}</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
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

      {nudge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background-1 p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Send a nudge</div>
                <div className="text-sm font-semibold text-text-1">
                  Nudge {nudge.name} to pay you £{Math.abs(nudge.amount).toFixed(2)}?
                </div>
              </div>
              <button
                onClick={() => setNudge(null)}
                className="rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
              >
                Close
              </button>
            </div>

            <div className="mt-3 text-sm text-text-2">
              We&apos;ll remind them that they owe you money for this group.
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setNudge(null)}
                className="rounded-md border border-border px-4 py-2 text-sm text-text-2 hover:bg-background-3"
              >
                Cancel
              </button>
              <button
                onClick={() => setNudge(null)}
                className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2"
              >
                Send nudge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
