"use client";

import { useSession } from "next-auth/react";

export default function AccountSettingsContent() {
  const { data: session, status } = useSession();

  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";

  if (status === "loading") {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 pb-12 pt-16">
        <div className="h-24 animate-pulse rounded-2xl bg-background-3/60" />
        <div className="h-64 animate-pulse rounded-2xl bg-background-3/60" />
        <div className="h-64 animate-pulse rounded-2xl bg-background-3/60" />
        <div className="h-36 animate-pulse rounded-2xl bg-background-3/60" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-12 pt-16">
      <header className="rounded-2xl border border-border bg-background-2/80 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-1">Account settings</h1>
        <p className="mt-2 text-sm text-text-2">
          Update your profile, security, and notification preferences.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-background-2/80 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text-1">Profile</h2>
          <p className="text-sm text-text-2">Basic details for your account.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-text-1">
            Name
            <input
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Jane Doe"
              defaultValue={name}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-text-1">
            Email
            <input
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="you@example.com"
              defaultValue={email}
              type="email"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 shadow-sm hover:bg-primary-2">
            Save profile
          </button>
          <button className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-text-1 hover:bg-background-3">
            Cancel
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background-2/80 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text-1">Security</h2>
          <p className="text-sm text-text-2">Change your password.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-text-1">
            Current password
            <input
              type="password"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </label>
          <div />
          <label className="flex flex-col gap-2 text-sm font-medium text-text-1">
            New password
            <input
              type="password"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="At least 8 characters"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-text-1">
            Confirm new password
            <input
              type="password"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Repeat new password"
            />
          </label>
        </div>
        <button className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 shadow-sm hover:bg-primary-2">
          Update password
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-background-2/80 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text-1">Notifications</h2>
          <p className="text-sm text-text-2">Choose how you want to be notified.</p>
        </div>
        <div className="space-y-3">
          {[
            { id: "email-updates", label: "Email updates about activity" },
            { id: "reminders", label: "Payment reminders" },
            { id: "product", label: "Product news and tips" },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-border/70 bg-background px-3 py-2 text-sm text-text-1"
            >
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary-1" />
              {item.label}
            </label>
          ))}
        </div>
        <button className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 shadow-sm hover:bg-primary-2">
          Save notifications
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-danger/5 p-6 shadow-sm space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-text-1">Danger zone</h2>
          <p className="text-sm text-text-2">Delete your account and all associated data.</p>
        </div>
        <button className="rounded-md border border-danger bg-danger/10 px-4 py-2 text-sm font-semibold text-danger hover:bg-danger/20">
          Delete account
        </button>
      </section>
    </div>
  );
}
