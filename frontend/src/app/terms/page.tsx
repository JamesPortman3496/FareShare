"use client";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-text-1">Terms</h1>
        <p className="text-text-2">Simple terms so you know what to expect when using FareShare.</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm text-sm text-text-2">
        <p>FareShare is provided as-is; please keep backups of any critical information.</p>
        <p>You are responsible for the accuracy of the data you enter (amounts, members, and settlements).</p>
        <p>We may update the product periodically; we&apos;ll keep downtime minimal and announce major changes.</p>
        <p>Contact us at hello@fareshare.app with any questions.</p>
      </div>
    </div>
  );
}
