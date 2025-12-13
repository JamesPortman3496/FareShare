"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboardContext } from "@/components/pages/dashboard/DashboardContext";
import { createExpense } from "@/lib/api-client/expenses";

type CurrencyOption = {
  code: string;
  name: string;
  symbol?: string;
};

type CalendarDay = {
  date: Date;
  label: number;
  isCurrentMonth: boolean;
};

function formatLocalISO(d: Date) {
  const tzOffset = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - tzOffset);
  return local.toISOString().slice(0, 10);
}

function todayISO() {
  return formatLocalISO(new Date());
}

function currencySymbol(code: string) {
  try {
    const parts = new Intl.NumberFormat("en", { style: "currency", currency: code }).formatToParts(1);
    return parts.find((p) => p.type === "currency")?.value;
  } catch {
    return undefined;
  }
}

export default function AddExpenseForm() {
  const { activeGroup } = useDashboardContext();
  const membersList =
    activeGroup?.members?.map((m) => ({
      email: m.email,
      label: m.displayName || m.email,
    })) ?? [];

  const todayDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const todayIso = useMemo(() => formatLocalISO(todayDate), [todayDate]);

  const [description, setDescription] = useState("");
  const [amountCents, setAmountCents] = useState(0);
  const [currency, setCurrency] = useState("GBP");
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([
    { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  ]);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [currencyError, setCurrencyError] = useState<string | null>(null);
  const [date, setDate] = useState(todayIso);
  const formattedDate = useMemo(
    () => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    [date]
  );
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(date));
  const [payer, setPayer] = useState(membersList[0]?.email ?? "");
  const [splitMembers, setSplitMembers] = useState<string[]>(membersList.map((m) => m.email));
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    setPayer(membersList[0]?.email ?? "");
    setSplitMembers(membersList.map((m) => m.email));
    setDate(todayIso);
    setCalendarMonth(new Date());
  }, [activeGroup, membersList.length]);

  const splitLabel = useMemo(() => {
    if (!membersList.length) return "No members";
    if (splitMembers.length === membersList.length) return "Equally";
    if (splitMembers.length === 1) {
      const found = membersList.find((m) => m.email === splitMembers[0]);
      return found?.label ?? splitMembers[0];
    }
    return `${splitMembers.length} selected`;
  }, [splitMembers, membersList]);

  const allSelected = membersList.length > 0 && splitMembers.length === membersList.length;

  useEffect(() => {
    let cancelled = false;
    const loadCurrencies = async () => {
      setIsLoadingCurrencies(true);
      setCurrencyError(null);
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        if (!res.ok) {
          throw new Error(`Currency lookup failed (${res.status})`);
        }
        const payload = (await res.json()) as Record<string, string>;
        const parsed = Object.entries(payload).map(([code, name]) => ({
          code,
          name,
          symbol: currencySymbol(code),
        }));
        parsed.sort((a, b) => a.code.localeCompare(b.code));
        if (!cancelled) {
          setCurrencies(parsed);
        }
      } catch (err) {
        if (!cancelled) {
          setCurrencyError(err instanceof Error ? err.message : "Unable to load currencies");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCurrencies(false);
        }
      }
    };
    loadCurrencies();
    return () => {
      cancelled = true;
    };
  }, []);

  const daysInMonth = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const buildCalendar = (monthDate: Date): CalendarDay[] => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay(); // 0 Sun
    const totalDays = daysInMonth(monthDate);

    const days: CalendarDay[] = [];
    // Previous month fillers
    const prevMonthDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const prevMonthDate = new Date(year, month, 0);
    const prevTotal = prevMonthDate.getDate();
    for (let i = prevTotal - prevMonthDays + 1; i <= prevTotal; i++) {
      days.push({ date: new Date(year, month - 1, i), label: i, isCurrentMonth: false });
    }
    // Current month
    for (let d = 1; d <= totalDays; d++) {
      days.push({ date: new Date(year, month, d), label: d, isCurrentMonth: true });
    }
    // Next month fillers to complete grid
    const nextDaysNeeded = 42 - days.length; // 6 weeks grid
    for (let n = 1; n <= nextDaysNeeded; n++) {
      days.push({ date: new Date(year, month + 1, n), label: n, isCurrentMonth: false });
    }
    return days;
  };

  const toggleMember = (name: string) => {
    setSplitMembers((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  const formattedCost = useMemo(() => {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amountCents / 100);
  }, [amountCents, currency]);

  const submit = async () => {
    if (!activeGroup) {
      setSubmitMessage("Select a group before adding an expense.");
      return;
    }
    if (!description.trim()) {
      setSubmitMessage("Add a description.");
      return;
    }
    if (amountCents <= 0) {
      setSubmitMessage("Enter an amount.");
      return;
    }
    if (!payer) {
      setSubmitMessage("Choose who paid.");
      return;
    }
    if (splitMembers.length === 0) {
      setSubmitMessage("Select at least one person to split with.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    const amount = amountCents / 100;
    const share = amount / splitMembers.length;
    const paidByMember = membersList.find((m) => m.email === payer);

    try {
      await createExpense(activeGroup.id, {
        date,
        description: description.trim(),
        amount,
        currency,
        paidBy: { email: payer, name: paidByMember?.label },
        owes: splitMembers.map((email) => ({
          email,
          amount: Number(share.toFixed(2)),
        })),
      });
      setSubmitMessage("Expense added.");
      setDescription("");
      setAmountCents(0);
      setSplitMembers(membersList.map((m) => m.email));
    } catch (err) {
      setSubmitMessage(err instanceof Error ? err.message : "Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Calendar = ({
    value,
    month,
    onMonthChange,
    onChange,
  }: {
    value: string;
    month: Date;
    onMonthChange: (d: Date) => void;
    onChange: (val: string) => void;
  }) => {
    const days = buildCalendar(month);
    const selectedISO = value;
    const monthLabel = month.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const maxDate = todayDate;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            className="rounded-md border border-border bg-background-2 px-2 py-1 text-sm text-text-2 hover:bg-background-3"
          >
            ←
          </button>
          <div className="text-sm font-semibold text-text-1">{monthLabel}</div>
          <button
            type="button"
            onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            className="rounded-md border border-border bg-background-2 px-2 py-1 text-sm text-text-2 hover:bg-background-3"
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-text-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {days.map((d) => {
            const iso = formatLocalISO(d.date);
            const isSelected = iso === selectedISO;
            const isFuture = d.date.getTime() > maxDate.getTime();
            return (
              <button
                key={`${iso}-${d.isCurrentMonth ? "curr" : "adj"}`}
                onClick={() => {
                  if (isFuture) return;
                  onChange(iso);
                }}
                disabled={isFuture}
                className={[
                  "rounded-md px-0 py-2 transition",
                  d.isCurrentMonth ? "text-text-1" : "text-text-3",
                  isSelected ? "bg-primary-1 text-background-1 font-semibold" : "hover:bg-background-2",
                  isFuture ? "cursor-not-allowed opacity-50" : "",
                ].join(" ")}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-background-1/80 p-6 shadow-inner">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col rounded-3xl border border-border bg-background-1 p-6 shadow-sm">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-text-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Split dinner at Oak"
              className="w-full rounded-2xl border border-border bg-background-2 px-4 py-3 text-sm text-text-1 outline-none ring-primary-1/40 focus:ring-2"
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-text-1">Date</div>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-background-2 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-text-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background-3 text-base">📅</span>
                  <span className="font-semibold">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCalendar((prev) => !prev)}
                      className="rounded-md border border-border bg-background-1 px-3 py-2 text-sm font-semibold text-text-1 hover:bg-background-3"
                    >
                      Choose date
                    </button>
                    {showCalendar && (
                      <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-border bg-background-1 p-3 shadow-2xl">
                        <Calendar
                          value={date}
                          month={calendarMonth}
                          onMonthChange={setCalendarMonth}
                          onChange={(val) => {
                            setDate(val);
                            setCalendarMonth(new Date(val));
                            setShowCalendar(false);
                          }}
                          maxDate={todayDate}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDate(todayIso);
                      setCalendarMonth(new Date());
                    }}
                    className="rounded-md border border-primary-1/60 bg-primary-1/10 px-2 py-2 text-[11px] font-semibold text-primary-1 hover:bg-primary-1/15"
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-text-1">Amount</div>
              <div className="flex w-full items-center overflow-hidden rounded-2xl border border-border bg-background-2 text-sm shadow-sm">
                <select
                  value={currency}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next !== "GBP") return;
                    setCurrency(next);
                  }}
                  className="h-11 min-w-[72px] border-r border-border bg-background-3 px-3 text-xs font-semibold text-text-1 outline-none hover:bg-background-2"
                >
                  {isLoadingCurrencies ? (
                    <option value="GBP" disabled>
                      Loading currencies…
                    </option>
                  ) : (
                    currencies.map((c) => (
                      <option key={c.code} value={c.code} disabled={c.code !== "GBP"}>
                        {c.code}
                      </option>
                    ))
                  )}
                </select>

                <input
                  value={formattedCost}
                  onKeyDown={(e) => {
                    const key = e.key;
                    if (/^[0-9]$/.test(key)) {
                      e.preventDefault();
                      setAmountCents((prev) => Math.min(prev * 10 + Number(key), 999999999));
                      return;
                    }
                    if (key === "Backspace") {
                      e.preventDefault();
                      setAmountCents((prev) => Math.floor(prev / 10));
                      return;
                    }
                    if (key === "Delete") {
                      e.preventDefault();
                      setAmountCents(0);
                      return;
                    }
                    if (["Tab", "ArrowLeft", "ArrowRight"].includes(key)) return;
                    e.preventDefault();
                  }}
                  inputMode="numeric"
                  className="h-11 w-full border-none bg-transparent px-3 text-base font-semibold text-text-1 outline-none"
                  placeholder="0.00"
                  readOnly
                />
              </div>
              <div className="text-right text-[11px] text-text-3">Type digits to fill pennies (e.g. 5672 → £56.72)</div>
              {currencyError && (
                <div className="text-right text-[11px] text-warning">
                  {currencyError}. Showing last available list.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-text-2">
            <span className="font-semibold text-text-1">Paid by</span>
            <select
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              className="rounded-md border border-border bg-background-2 px-3 py-2 text-text-1 outline-none ring-primary-1/40 focus:ring-2"
            >
              {membersList.map((m) => (
                <option key={m.email} value={m.email}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-3xl border border-border bg-background-1 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-text-1">Split between</div>
              <div className="text-xs text-text-3">
                {splitMembers.length === membersList.length
                  ? "Everyone"
                  : splitMembers.length === 0
                  ? "No one selected"
                  : `${splitMembers.length} of ${membersList.length} selected`}
              </div>
            </div>
            <button
              onClick={() => setSplitMembers(allSelected ? [] : membersList.map((m) => m.email))}
              className="rounded-md border border-primary-1/60 bg-primary-1/10 px-2 py-1 text-[11px] font-semibold text-primary-1 hover:bg-primary-1/15"
            >
              {allSelected ? "Deselect all" : "Select all"}
            </button>
          </div>

          <div className="space-y-3">
            {membersList.map((m) => {
              const selected = splitMembers.includes(m.email);
              return (
                <button
                  key={m.email}
                  type="button"
                  onClick={() => toggleMember(m.email)}
                  aria-pressed={selected}
                  className={[
                    "flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition",
                    selected
                      ? "border-primary-1 bg-primary-1/10 text-text-1"
                      : "border-border bg-background-2 text-text-2 hover:bg-background-3",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background-3 text-sm font-semibold text-text-2">
                      {m.label.slice(0, 1)}
                    </div>
                    <span className="text-text-1">{m.label}</span>
                  </div>
                  <span
                    className={[
                      "rounded-md border px-3 py-1 text-[11px] font-semibold",
                      selected
                        ? "border-primary-1 bg-primary-1/20 text-primary-1"
                        : "border-border bg-background-1 text-text-2",
                    ].join(" ")}
                  >
                    {selected ? "Selected" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={submit}
          disabled={isSubmitting}
          className="rounded-md bg-primary-1 px-5 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2 disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add expense"}
        </button>
      </div>
      {submitMessage && <div className="mt-2 text-right text-xs text-text-3">{submitMessage}</div>}
    </div>
  );
}
