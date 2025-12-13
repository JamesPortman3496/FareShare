"use client";

import StatsPreview from "./StatsPreview";

export default function PrimarySection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-background-1/80 px-6 py-10 shadow-sm md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-2/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary-1" />
            Settle up without spreadsheets
          </div>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Track shared expenses with clarity and zero awkwardness.
          </h2>
          <p className="text-base text-text-3 md:text-lg">
            FareShare keeps every group on the same page: log expenses fast, split them fairly, and settle up with
            confidence—no messy threads or mystery totals.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-primary-1 px-5 py-2.5 text-sm font-semibold text-background-1 shadow-sm hover:bg-primary-2">
              Create a demo group
            </button>
            <button className="rounded-lg border border-border bg-background-1/60 px-5 py-2.5 text-sm font-semibold text-text-1 hover:bg-background-3">
              Go to dashboard
            </button>
          </div>
        </div>

        <div className="flex-1">
          <StatsPreview />
        </div>
      </div>
    </section>
  );
}
