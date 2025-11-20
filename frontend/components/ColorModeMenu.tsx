"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "system" | "light" | "dark";

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function ColorModeMenu({ mode, onChange }: Props) {
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
        className="rounded-md border border-border px-2 py-1 text-sm bg-background-2 text-foreground"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Colour mode
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-background-2 p-2 shadow-md">
          <form className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                value="system"
                checked={mode === "system"}
                onChange={() => onChange("system")}
              />
              <span className="text-sm text-text-1">System theme</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                value="dark"
                checked={mode === "dark"}
                onChange={() => onChange("dark")}
              />
              <span className="text-sm text-text-1">Dark</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                value="light"
                checked={mode === "light"}
                onChange={() => onChange("light")}
              />
              <span className="text-sm text-text-1">Light</span>
            </label>
          </form>
        </div>
      )}
    </div>
  );
}
