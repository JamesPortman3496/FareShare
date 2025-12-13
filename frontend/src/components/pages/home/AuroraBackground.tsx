"use client";

import Aurora from "@/components/ui/Aurora";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Aurora blend={0.5} amplitude={1.0} speed={1.1} />
    </div>
  );
}
