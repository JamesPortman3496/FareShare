"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useDashboardContext } from "../../../layout";
import { fetchExpensesForGroup } from "@/lib/api-client/expenses";
import { Expense } from "@/types/expenses";

const CURRENT_USER_EMAIL = "james.portman3496@gmail.com";

export default function OverviewPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolved = use(params);
  const { activeGroup, groups, isLoadingGroups, groupsError } = useDashboardContext();
  const group = activeGroup?.id === resolved.groupId ? activeGroup : groups.find((g) => g.id === resolved.groupId) ?? null;
  const membersMap = useMemo(() => {
    return (
      group?.members?.reduce<Record<string, string>>((acc, m) => {
        acc[m.email] = m.displayName ?? m.email;
        return acc;
      }, {}) ?? {}
    );
  }, [group]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [expensesError, setExpensesError] = useState<string | null>(null);
  const [hoverPoint, setHoverPoint] = useState<{
    label: string;
    date: string;
    value: number;
    description: string;
    payer: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoadingExpenses(true);
      setExpensesError(null);
      try {
        const data = await fetchExpensesForGroup(resolved.groupId);
        if (!active) return;
        setExpenses(data);
      } catch (err) {
        if (!active) return;
        setExpensesError(err instanceof Error ? err.message : "Failed to load expenses");
      } finally {
        if (active) setLoadingExpenses(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [resolved.groupId]);

  const summary = useMemo(() => {
    const balances = new Map<string, number>();
    const ensure = (email: string) => {
      if (!balances.has(email)) balances.set(email, 0);
      return balances.get(email)!;
    };

    expenses.forEach((exp) => {
      const payerEmail = exp.paidBy.email;

      if (payerEmail === CURRENT_USER_EMAIL) {
        exp.owes.forEach((o) => {
          if (o.email === CURRENT_USER_EMAIL) return;
          const prev = ensure(o.email);
          balances.set(o.email, prev + o.amount); // they owe you
        });
      } else {
        const yourShare = exp.owes.find((o) => o.email === CURRENT_USER_EMAIL)?.amount ?? 0;
        if (yourShare > 0) {
          const prev = ensure(payerEmail);
          balances.set(payerEmail, prev - yourShare); // you owe them
        }
      }
    });

    let owedToYou = 0;
    let youOwe = 0;
    balances.forEach((amt) => {
      if (amt > 0) owedToYou += amt;
      if (amt < 0) youOwe += Math.abs(amt);
    });

    return {
      owedToYou,
      youOwe,
      net: owedToYou - youOwe,
    };
  }, [expenses]);

  const latest = useMemo(() => expenses.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5), [expenses]);

  const timelineSeries = useMemo(() => {
    if (expenses.length === 0) return [];
    const sorted = expenses.slice().sort((a, b) => (a.date > b.date ? 1 : -1));
    const running = new Map<string, number>();
    const series = new Map<
      string,
      { label: string; points: { date: string; value: number; idx: number; description: string; payer: string }[] }
    >();

    const ensure = (email: string) => {
      if (!running.has(email)) running.set(email, 0);
      if (!series.has(email)) {
          series.set(email, { label: membersMap[email] ?? email, points: [] });
        }
      };

    sorted.forEach((exp, idx) => {
      if (exp.paidBy.email === CURRENT_USER_EMAIL) {
        exp.owes.forEach((o) => {
          if (o.email === CURRENT_USER_EMAIL) return;
          ensure(o.email);
          const prev = running.get(o.email)!;
          const next = prev + o.amount; // they owe you
          running.set(o.email, next);
          series.get(o.email)!.points.push({
            date: exp.date,
            value: next,
            idx,
            description: exp.description,
            payer: exp.paidBy.name ?? exp.paidBy.email,
          });
        });
      } else {
        const yourShare = exp.owes.find((o) => o.email === CURRENT_USER_EMAIL)?.amount ?? 0;
        if (yourShare > 0) {
          const payer = exp.paidBy.email;
          ensure(payer);
          const prev = running.get(payer)!;
          const next = prev - yourShare; // you owe them
          running.set(payer, next);
          series.get(payer)!.points.push({
            date: exp.date,
            value: next,
            idx,
            description: exp.description,
            payer: exp.paidBy.name ?? exp.paidBy.email,
          });
        }
      }
    });

    return Array.from(series.values());
  }, [expenses, membersMap]);

  if (isLoadingGroups) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background-1/70 p-8 text-center text-text-3">
        Loading group overview…
      </div>
    );
  }

  if (groupsError) {
    return (
      <div className="rounded-2xl border border-warning/50 bg-warning/10 p-8 text-center text-warning text-sm">
        {groupsError}
      </div>
    );
  }

  if (!group) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background-1/70 p-8 text-center text-text-3">
        Select a group from the sidebar to view its overview.
      </div>
    );
  }

  const renderMultiLine = () => {
    if (timelineSeries.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-border bg-background-1/60 px-3 py-6 text-center text-xs text-text-3">
          No data yet.
        </div>
      );
    }
    const palette = ["#22c55e", "#6366f1", "#f97316", "#e11d48", "#14b8a6", "#8b5cf6"];
    const width = 820;
    const height = 320;
    const allPoints = timelineSeries.flatMap((s) => s.points);
    const maxIdx = Math.max(...allPoints.map((p) => p.idx));
    const values = allPoints.map((p) => p.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const pad = Math.max((rawMax - rawMin) * 0.1, 5);
    const min = rawMin - pad;
    const max = rawMax + pad;
    const range = max - min || 1;
    const xStep = maxIdx > 0 ? width / maxIdx : width;
    const yTicks = [min, min + range / 2, max];

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3 pb-2 text-xs text-text-3">
          {timelineSeries.map((s, idx) => {
            const color = palette[idx % palette.length];
            const latest = s.points[s.points.length - 1];
            return (
              <span key={s.label} className="flex items-center gap-2 rounded-md border border-border bg-background-1 px-2 py-1">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="font-semibold" style={{ color }}>
                  {s.label}
                </span>
                <span>£{latest.value.toFixed(2)}</span>
              </span>
            );
          })}
        </div>
        <div className="rounded-lg bg-background-1/60 p-3">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full">
            {yTicks.map((tick, i) => {
              const y = height - ((tick - min) / range) * height;
              return (
                <g key={i}>
                  <line x1={0} y1={y} x2={width} y2={y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
                  <text x={0} y={y - 4} className="fill-text-3 text-[10px]">
                    £{tick.toFixed(2)}
                  </text>
                </g>
              );
            })}
            {timelineSeries.map((s, idx) => {
              const color = palette[idx % palette.length];
              const pts = s.points
                .map((p) => {
                const x = p.idx * xStep;
                const y = height - ((p.value - min) / range) * height;
                return `${x},${y}`;
              })
              .join(" ");
              return (
                <polyline
                  key={s.label}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  points={pts}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
            {timelineSeries.map((s, idx) => {
              const color = palette[idx % palette.length];
              return s.points.map((p) => {
                const x = p.idx * xStep;
                const y = height - ((p.value - min) / range) * height;
                return (
                  <circle
                    key={`${s.label}-${p.idx}`}
                    cx={x}
                    cy={y}
                    r={6}
                    fill={color}
                  className="cursor-pointer"
                  onClick={() =>
                    setHoverPoint({
                      label: s.label,
                      date: new Date(p.date).toLocaleDateString("en-GB"),
                      value: p.value,
                      description: p.description,
                      payer: p.payer,
                    })
                  }
                />
              );
            });
          })}
        </svg>
        {hoverPoint ? (
          <div className="mt-2 rounded-lg border border-border bg-background-1 px-3 py-2 text-xs text-text-2 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span
                className="font-semibold"
                style={{ color: palette[timelineSeries.findIndex((s) => s.label === hoverPoint.label) % palette.length] }}
              >
                {hoverPoint.label}
              </span>
              <span className="text-text-3">{hoverPoint.date}</span>
            </div>
            <div className="text-text-1 font-semibold">
              {hoverPoint.value >= 0
                ? `${hoverPoint.label} owes you £${hoverPoint.value.toFixed(2)}`
                : `You owe ${hoverPoint.label} £${Math.abs(hoverPoint.value).toFixed(2)}`}
            </div>
            <div className="text-text-3">
              {hoverPoint.description} — paid by {hoverPoint.payer}
            </div>
          </div>
        ) : (
          <div className="mt-2 h-[84px] rounded-lg border border-dashed border-border bg-background-1/60 px-3 py-2 text-xs text-text-3">
            Click a point to see who paid and who owes whom.
          </div>
        )}
      </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">You’re owed</div>
          <div className="mt-1 text-lg font-semibold text-success">£{summary.owedToYou.toFixed(2)}</div>
          <div className="text-xs text-text-3">Amount others owe you in this group.</div>
        </div>
        <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">You owe</div>
          <div className="mt-1 text-lg font-semibold text-warning">£{summary.youOwe.toFixed(2)}</div>
          <div className="text-xs text-text-3">What you owe others in this group.</div>
        </div>
        <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Net</div>
          <div className={`mt-1 text-lg font-semibold ${summary.net >= 0 ? "text-success" : "text-warning"}`}>
            £{summary.net.toFixed(2)}
          </div>
          <div className="text-xs text-text-3">Positive means you’re owed more than you owe.</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Balance trend</div>
            <div className="text-xs text-text-3">Net over time</div>
          </div>
          {renderMultiLine()}
        </div>

        <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-text-1">Latest activity</div>
          {loadingExpenses && (
            <div className="rounded-md border border-dashed border-border bg-background-1/60 px-3 py-2 text-xs text-text-3">
              Loading expenses…
            </div>
          )}
          {expensesError && (
            <div className="rounded-md border border-warning/50 bg-warning/10 px-3 py-2 text-xs text-warning">
              {expensesError}
            </div>
          )}
          {!loadingExpenses && !expensesError && latest.length === 0 && (
            <div className="rounded-md border border-dashed border-border bg-background-1/60 px-3 py-2 text-xs text-text-3">
              No recent expenses.
            </div>
          )}
          <div className="space-y-2">
            {latest.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-background-2/70 px-3 py-2 text-xs text-text-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-1 font-semibold">{exp.description}</span>
                  <span className="text-text-3">{new Date(exp.date).toLocaleDateString("en-GB")}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-text-3">
                    {exp.paidBy.name ?? exp.paidBy.email} paid {exp.currency} {exp.amount.toFixed(2)}
                  </span>
                  <span className="text-text-1 font-semibold">£{exp.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
