"use client";

import { useEffect, useRef, useState } from "react";

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full p-2 text-text-1 hover:text-primary-1"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Notifications"
      >
        <span className="relative flex items-center">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary-1" aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-md border border-border bg-background-2 p-3 shadow-md">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-3">
            Notifications
          </div>

          <ul className="space-y-2 text-sm text-text-1">
            <li className="rounded-md border border-border bg-background-1 p-3">
              <div className="text-xs uppercase tracking-wide text-text-3">Today</div>
              <div className="mt-1">No new notifications.</div>
            </li>
            <li className="rounded-md border border-border bg-background-1 p-3">
              <div className="text-xs uppercase tracking-wide text-text-3">Earlier</div>
              <div className="mt-1 text-text-2">
                Keep an eye on group activity here when expenses update.
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 19a3 3 0 1 1-6 0" />
      <path d="M18 15V11a6 6 0 0 0-12 0v4l-1.6 2.4a1 1 0 0 0 .8 1.6h13.6a1 1 0 0 0 .8-1.6Z" />
    </svg>
  );
}
