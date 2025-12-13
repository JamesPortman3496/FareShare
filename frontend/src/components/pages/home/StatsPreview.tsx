"use client";

export default function StatsPreview() {
  return (
    <div className="relative rounded-2xl border border-border bg-background-2/80 p-6 shadow-lg backdrop-blur">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-text-1">Barcelona Trip</div>
            <div className="text-xs text-text-3">4 members · 18 expenses</div>
          </div>
          <div className="rounded-lg bg-success/15 px-3 py-1 text-xs font-semibold text-success">+ £120 settled</div>
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
          <PreviewRow title="Alex → Group" subtitle="Accommodation" value="£40" />
          <PreviewRow title="Sam → Group" subtitle="Dinner" value="£25" />
          <PreviewRow title="You → Alex" subtitle="Transfer due" value="£15 due" highlight />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-background-3/60 px-4 py-3 text-xs text-text-3">
          <span>Sync updates instantly with your group.</span>
          <span className="text-primary-1">Invite teammates →</span>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({
  title,
  subtitle,
  value,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-semibold text-text-1">{title}</span>
        <span className="text-xs text-text-3">{subtitle}</span>
      </div>
      <span
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold",
          highlight ? "bg-warning/15 text-warning" : "bg-background-3",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
