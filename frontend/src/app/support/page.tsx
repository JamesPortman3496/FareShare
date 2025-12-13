"use client";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-text-1">Support</h1>
        <p className="text-text-2">Need a hand? We&apos;re here to help you keep shared expenses tidy.</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-text-1">Common questions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-text-2">
          <li>How do I add or remove group members?</li>
          <li>How do I edit or delete an expense?</li>
          <li>How do settlements work?</li>
        </ul>
      </div>

      <div className="space-y-2 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-text-1">Contact</h2>
        <p className="text-sm text-text-2">
          Email us at <a className="text-primary-2 hover:underline" href="mailto:hello@fareshare.app">hello@fareshare.app</a>.
        </p>
      </div>
    </div>
  );
}
