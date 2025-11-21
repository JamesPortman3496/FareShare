"use client";

import Aurora from "../../components/ui/Aurora";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroMax = 360;
  const heroProgress = Math.min(scrollY / heroMax, 1);
  const heroOpacity = 1 - heroProgress;

  const reveal = (start: number, distance = 80, fadeDistance = 180) => {
    const raw = scrollY - start;
    const progress = Math.min(1, Math.max(0, raw / fadeDistance));
    const translate = Math.max(0, distance * (1 - progress));
    return {
      opacity: progress,
      transform: `translateY(${translate}px)`,
    };
  };

  return (
    <div className="space-y-14">
      <div style={{ width: '100%', height: '100%', position: "fixed", top: 0, left: 0, zIndex: -1 }}>
        <Aurora
          blend={0.5}
          amplitude={1.0}
          speed={1.2}
        />
      </div>

      <div className="h-screen" />

      <div
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-4 text-center"
        style={{ opacity: heroOpacity, transition: "opacity 0.2s linear", transform: "translateY(-8%)" }}
      >
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-tight md:text-8xl">FareShare</h1>
          <p className="text-xl text-text-1 md:text-2xl">
            Split expenses fairly, keep everyone aligned, and settle up without the awkwardness.
          </p>
        </div>
      </div>

      <section
        className="grid gap-5 md:grid-cols-3"
        style={{
          ...reveal(heroMax - 180, 60, 200),
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
        }}
      >
        {[
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
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-background-2/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-1/15 text-primary-1">
              •
            </div>
            <div className="text-lg font-semibold text-text-1">{item.title}</div>
            <p className="mt-2 text-sm text-text-3">{item.desc}</p>
          </div>
        ))}
      </section>

      <section
        className="relative overflow-hidden rounded-3xl border border-border bg-background-1/80 px-6 py-10 shadow-sm md:px-10"
        style={{
          ...reveal(heroMax + 20, 90, 220),
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
        }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-2/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary-1" />
              Settle up without spreadsheets
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Track shared expenses with clarity and zero awkwardness.
            </h1>
            <p className="text-base text-text-3 md:text-lg">
              FareShare keeps every group on the same page: log expenses fast, split them fairly, and settle up with confidence—no messy threads or mystery totals.
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
            <div className="relative rounded-2xl border border-border bg-background-2/80 p-6 shadow-lg backdrop-blur">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-text-1">Barcelona Trip</div>
                    <div className="text-xs text-text-3">4 members · 18 expenses</div>
                  </div>
                  <div className="rounded-lg bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                    + £120 settled
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs text-text-3">
                  <div className="rounded-lg border border-border bg-background-1 p-3">
                    <div className="text-sm font-bold text-text-1">£245</div>
                    <div>Logged</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background-1 p-3">
                    <div className="text-sm font-bold text-text-1">£95</div>
                    <div>Outstanding</div>
                  </div>
                  <div className="rounded-lg border border-border bg-background-1 p-3">
                    <div className="text-sm font-bold text-text-1">£150</div>
                    <div>Settled</div>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-border bg-background-1 p-4 text-sm text-text-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-1">Alex → Group</span>
                      <span className="text-xs text-text-3">Accommodation</span>
                    </div>
                    <span className="rounded-full bg-background-3 px-3 py-1 text-xs font-semibold">£40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-1">Sam → Group</span>
                      <span className="text-xs text-text-3">Dinner</span>
                    </div>
                    <span className="rounded-full bg-background-3 px-3 py-1 text-xs font-semibold">£25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-1">You → Alex</span>
                      <span className="text-xs text-text-3">Transfer due</span>
                    </div>
                    <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">£15 due</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-background-3/60 px-4 py-3 text-xs text-text-3">
                  <span>Sync updates instantly with your group.</span>
                  <span className="text-primary-1">Invite teammates →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col gap-6 rounded-2xl border border-border bg-background-2/60 p-6 md:grid md:items-center"
        style={{
          ...reveal(heroMax + 180, 110, 240),
          transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
        }}
      >
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">How it works</div>
          <h2 className="mt-2 text-2xl font-semibold text-text-1">Three steps to a zero-drama money chat.</h2>
          <p className="mt-1 text-sm text-text-3">
            Set up in minutes, bring your group in, and keep every balance clear.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background-1 p-4">
              <div className="text-xs font-semibold text-text-3">Step 1</div>
              <div className="text-sm font-semibold text-text-1">Create your group</div>
              <p className="mt-1 text-xs text-text-3">Invite housemates, teammates, or trip pals in seconds.</p>
            </div>
            <div className="rounded-xl border border-border bg-background-1 p-4">
              <div className="text-xs font-semibold text-text-3">Step 2</div>
              <div className="text-sm font-semibold text-text-1">Log expenses</div>
              <p className="mt-1 text-xs text-text-3">Split by shares or exact amounts with receipts attached.</p>
            </div>
            <div className="rounded-xl border border-border bg-background-1 p-4">
              <div className="text-xs font-semibold text-text-3">Step 3</div>
              <div className="text-sm font-semibold text-text-1">Settle up</div>
              <p className="mt-1 text-xs text-text-3">Track balances live and nudge before it gets awkward.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
