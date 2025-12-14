export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-background-2/80 px-8 py-16 shadow-sm">
      <div className="mx-auto max-w-5xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-1/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-2">
          FareShare
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-text-1 md:text-6xl">
            Keep every split fair and friendly.
          </h1>
          <p className="text-lg text-text-2 md:text-xl">
            Split expenses fairly, keep everyone aligned, and settle up without the awkwardness—no parallax or overlays
            getting in the way.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="rounded-lg bg-primary-1 px-5 py-2.5 text-sm font-semibold text-background-1 shadow-sm hover:bg-primary-2">
            Get started
          </button>
          <button className="rounded-lg border border-border bg-background-1/60 px-5 py-2.5 text-sm font-semibold text-text-1 hover:bg-background-3">
            View features
          </button>
        </div>
      </div>
    </section>
  );
}
