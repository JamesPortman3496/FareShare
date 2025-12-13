"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboardContext } from "@/components/pages/dashboard/DashboardContext";
import { fetchExpensesForGroup } from "@/lib/api-client/expenses";
import { Expense } from "@/types/expenses";

type Section = {
  monthKey: string;
  monthLabel: string;
  entries: {
    id: string;
    dateLabel: string;
    dateValue: string;
    description: string;
    payer: string;
    amountLabel: string;
    amountValue: number;
    isLent: boolean;
    owes: { email: string; displayName?: string; amount: number; currency: string; isCurrentUser: boolean }[];
    total: string;
    payerName: string;
  }[];
};

function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString("en-GB", { day: "numeric" });
  const month = d.toLocaleDateString("en-GB", { month: "short" });
  return `${month} ${day}`;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatch(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return text;
  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "ig");
  return text.split(regex).map((part, idx) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <mark key={idx} className="rounded bg-primary-1/30 px-0.5 text-text-1">
        {part}
      </mark>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

export default function ExpensesList({ groupId }: { groupId: string }) {
  const CURRENT_USER_EMAIL = "james.portman3496@gmail.com";
  const { groups, activeGroup } = useDashboardContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredExpenses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const normalizedNumeric = query.replace(/[^\d.]/g, "");

    return expenses.filter((exp) => {
      const payerName = exp.paidBy.name ?? "";
      const payerEmail = exp.paidBy.email;
      const description = exp.description;

      const amountMatch =
        normalizedNumeric.length > 0 &&
        (`${exp.amount}`.includes(normalizedNumeric) ||
          formatCurrency(exp.amount, exp.currency).replace(/[^\d.]/g, "").includes(normalizedNumeric));

      const textHaystacks = [payerName.toLowerCase(), payerEmail.toLowerCase(), description.toLowerCase()];

      const textMatch = query ? textHaystacks.some((t) => t.includes(query)) : true;

      return textMatch || amountMatch;
    });
  }, [expenses, searchQuery]);

  const sections: Section[] = useMemo(() => {
    const grouped: Record<string, Section> = {};
    const group = activeGroup?.id === groupId ? activeGroup : groups.find((g) => g.id === groupId);
    const displayNameByEmail: Record<string, string | undefined> =
      group?.members?.reduce<Record<string, string | undefined>>((acc, m) => {
        acc[m.email] = m.displayName;
        return acc;
      }, {}) ?? {};

    filteredExpenses.forEach((exp) => {
      const monthKey = exp.date.slice(0, 7);
      if (!grouped[monthKey]) {
        grouped[monthKey] = { monthKey, monthLabel: formatMonth(exp.date), entries: [] };
      }
      const userShare = exp.owes.find((o) => o.email === CURRENT_USER_EMAIL)?.amount;
      const isPayer = exp.paidBy.email === CURRENT_USER_EMAIL;
      const amountLent = isPayer ? Math.max(exp.amount - (userShare ?? 0), 0) : 0;
      const amountBorrowed = !isPayer ? userShare ?? exp.amount / Math.max(exp.owes.length, 1) : 0;

      const owes = exp.owes.map((o) => ({
        ...o,
        currency: exp.currency,
        displayName: displayNameByEmail[o.email],
        isCurrentUser: o.email === CURRENT_USER_EMAIL,
      }));

      grouped[monthKey].entries.push({
        id: exp.id,
        dateLabel: formatDateLabel(exp.date),
        dateValue: exp.date,
        description: exp.description,
        payer: `${exp.paidBy.name ?? displayNameByEmail[exp.paidBy.email] ?? exp.paidBy.email} paid ${formatCurrency(exp.amount, exp.currency)}`,
        amountLabel:
          (isPayer && amountLent > 0)
            ? `you lent ${formatCurrency(amountLent, exp.currency)}`
            : (!isPayer && amountBorrowed > 0)
              ? `you borrowed ${formatCurrency(amountBorrowed, exp.currency)}`
              : `split ${formatCurrency(exp.amount, exp.currency)}`,
        amountValue: isPayer ? amountLent : amountBorrowed,
        isLent: isPayer,
        owes,
        total: formatCurrency(exp.amount, exp.currency),
        payerName: displayNameByEmail[exp.paidBy.email] ?? exp.paidBy.name ?? exp.paidBy.email,
      });
    });
    const sections = Object.values(grouped).sort((a, b) => (a.monthKey < b.monthKey ? 1 : -1));
    sections.forEach((section) => {
      section.entries.sort((a, b) => (a.dateValue < b.dateValue ? 1 : -1));
    });
    return sections;
  }, [filteredExpenses, activeGroup, groupId, groups]);

  const renderEmptyState = () => {
    if (loading) {
      return (
        <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-4 py-3 text-sm text-text-3">
          Loading expenses…
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
    if (sections.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-4 py-3 text-sm text-text-3">
          {searchQuery.trim() ? "No expenses match your search." : "No expenses yet for this group."}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="mb-3 flex items-center gap-2">
        <div className="relative w-full">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search description, payer, amount, or email"
            className="w-full rounded-lg border border-border bg-background-1 px-3 py-2 text-sm text-text-1 outline-none ring-primary-1/40 focus:ring-2"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-3">⌕</span>
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="rounded-lg border border-border bg-background-1 px-3 py-2 text-sm text-text-2 hover:text-text-1"
          >
            Clear
          </button>
        )}
      </div>

      {renderEmptyState() ? (
        renderEmptyState()
      ) : (
        <div className="flex-1 min-h-0 space-y-6 overflow-y-auto pr-1">
          {sections.map((section) => (
            <div key={section.monthLabel} className="space-y-3">
              <div className="text-sm font-semibold text-text-1">{section.monthLabel}</div>
              <div className="space-y-3">
                {section.entries.map((entry) => {
                  const isExpanded = expanded.has(entry.id);
                  return (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-border bg-background-2/80 shadow-sm backdrop-blur"
                    >
                      <button
                        onClick={() => {
                          setExpanded((prev) => {
                            const next = new Set(prev);
                            if (next.has(entry.id)) next.delete(entry.id);
                            else next.add(entry.id);
                            return next;
                          });
                        }}
                        className="flex w-full flex-col gap-3 p-3 text-left md:flex-row md:items-center md:justify-between"
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
                          <div className="text-sm font-semibold text-text-1">{highlightMatch(entry.description, searchQuery)}</div>
                          <div className="text-xs text-text-3">{highlightMatch(entry.payer, searchQuery)}</div>
                        </div>
                      </div>
                      <div
                        className={[
                          "flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold",
                            entry.isLent
                              ? "border-success/50 bg-success/10 text-success"
                              : "border-warning/40 bg-warning/10 text-warning",
                          ].join(" ")}
                        >
                          {highlightMatch(entry.amountLabel, searchQuery)}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border bg-background-1/60 px-3 py-3 text-sm text-text-2">
                          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-text-3">
                            <span>Breakdown</span>
                            <span className="text-text-2">
                              Total {entry.total} · Payer {entry.payerName}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {entry.owes.map((o) => {
                              const name = o.displayName ?? o.email;
                              const isYou = o.isCurrentUser;
                              return (
                                <div
                                  key={`${entry.id}-${o.email}`}
                                  className={[
                                    "flex items-center justify-between rounded-lg border px-3 py-2 text-xs",
                                    isYou
                                      ? "border-primary-1/60 bg-primary-1/10 text-primary-1"
                                      : "border-border bg-background-2/70 text-text-2",
                                  ].join(" ")}
                                >
                                  <span className="flex items-center gap-2">
                                    <span
                                      className={[
                                        "h-2 w-2 rounded-full",
                                        isYou ? "bg-primary-1" : "bg-border",
                                      ].join(" ")}
                                    />
                                    <span className="text-text-1">
                                      {name}
                                      {isYou ? " (you)" : ""}
                                    </span>
                                  </span>
                                  <span className={isYou ? "font-semibold" : "text-text-2"}>
                                    {formatCurrency(o.amount, o.currency)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
