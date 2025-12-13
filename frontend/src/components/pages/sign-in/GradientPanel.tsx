import type { ReactNode } from "react";

export function GradientPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-0 flex basis-1/2 flex-1 flex-col justify-center gap-10 overflow-hidden bg-gradient-to-br from-primary-2 via-primary-1 to-primary-3 px-16 py-12 text-text-contrast">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-28 h-44 w-44 rounded-full bg-text-contrast/12 blur-3xl" />
        <div className="absolute right-6 top-8 h-28 w-28 rotate-12 rounded-2xl bg-text-contrast/12 blur-xl" />
        <div className="absolute bottom-10 left-10 h-12 w-12 rotate-6 rounded-2xl border border-text-contrast/25" />
        <div className="absolute right-20 bottom-24 h-16 w-16 rounded-full bg-text-contrast/8 blur-lg" />
      </div>
      {children}
    </div>
  );
}
