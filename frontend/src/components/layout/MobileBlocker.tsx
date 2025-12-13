"use client";

export default function MobileBlocker() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-1 px-6 text-center md:hidden">
      <div className="space-y-3 rounded-2xl border border-border bg-background-2/90 px-6 py-8 shadow-2xl backdrop-blur">
        <div className="text-lg font-semibold text-text-1">FareShare</div>
        <p className="text-sm text-text-2">
          Not available on mobile yet. We&apos;re cooking up the mobile app—coming to the App Store soon.
        </p>
      </div>
    </div>
  );
}
