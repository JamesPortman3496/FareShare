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
        className="flex items-center gap-2 rounded-md border border-border bg-background-2 px-3 py-1.5 text-sm font-medium text-text-1 hover:bg-background-3"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="relative flex items-center">
          <span className="mr-2 h-2 w-2 rounded-full bg-primary-1" aria-hidden="true" />
          Notifications
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
