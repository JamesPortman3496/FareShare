import type { ReactNode } from "react";

export function NeutralPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-0 flex basis-1/2 flex-1 flex-col justify-center gap-10 bg-background-2 px-16 py-12">
      {children}
    </div>
  );
}
