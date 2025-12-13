"use client";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-text-1">Privacy</h1>
        <p className="text-text-2">We keep your data minimal, secure, and only use it to run FareShare.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm text-sm text-text-2">
        <p>We collect only what is needed to manage groups, members, and expenses.</p>
        <p>We do not sell your data. Access is limited to operating the app and improving reliability.</p>
        <p>You can request deletion of your data at any time by emailing hello@fareshare.app.</p>
      </div>
    </div>
  );
}
