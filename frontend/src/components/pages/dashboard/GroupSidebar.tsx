"use client";

import Link from "next/link";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

type Group = {
  id: string;
  name: string;
  members?: { email: string; displayName?: string; role?: "admin" }[];
};

interface Props {
  groups: Group[];
  activeGroup: Group | null;
  isLoading?: boolean;
  error?: string | null;
  onGroupCreated?: (group: { name: string; members: string[] }) => Promise<void> | void;
}

const ICONS = ["🌴", "🏠", "🎉", "🧳", "🏕️", "🚐", "🍽️", "🏔️", "🌆", "🌊", "🍻", "💼", "🎒", "🧩", "🧋"];

function iconForGroupName(name: string) {
  if (!name) return "🧾";
  const normalized = name.toLowerCase().trim();

  // Keyword-based picks for more relevant icons
  if (/(home|house|share|flat|apt)/.test(normalized)) return "🏠";
  if (/(trip|travel|holiday|vacation|journey)/.test(normalized)) return "🌴";
  if (/(weekend|camp|cabin|camping|hike)/.test(normalized)) return "🏕️";
  if (/(event|party|celebration|birthday|wedding)/.test(normalized)) return "🎉";
  if (/(food|dinner|lunch|brunch|meal|cook)/.test(normalized)) return "🍽️";
  if (/(work|office|team|project)/.test(normalized)) return "💼";

  const stripped = normalized.replace(/[^a-z0-9]/g, "");
  if (!stripped) return "🧾";

  let hash = 0;
  for (let i = 0; i < stripped.length; i++) {
    hash = (hash << 5) - hash + stripped.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % ICONS.length;
  return ICONS[idx];
}

export default function GroupSidebar({ groups, activeGroup, isLoading, error, onGroupCreated }: Props) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <aside className="h-full w-full max-w-xs flex-shrink-0 overflow-hidden rounded-2xl bg-background-2/80 shadow-sm backdrop-blur md:w-72">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="text-sm font-semibold text-text-1">Groups</div>
          <button
            onClick={() => setShowCreate(true)}
            aria-label="Create group"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-1/60 bg-primary-1/10 text-primary-1 transition hover:border-primary-1 hover:bg-primary-1/15"
          >
            +
          </button>
        </div>
        <div className="mt-3 flex h-[calc(100%-56px)] flex-col gap-3 overflow-hidden px-4 pb-4">
          <div className="space-y-2 overflow-y-auto pr-1">
            {isLoading && (
              <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-3 py-3 text-sm text-text-3">
                Loading your groups…
              </div>
            )}

          {error && !isLoading && (
            <div className="rounded-xl border border-warning/50 bg-warning/10 px-3 py-3 text-sm text-warning">
              {error}
            </div>
          )}

          {!isLoading && !error && groups.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-3 py-3 text-sm text-text-3">
              No groups yet. Create your first one to get started.
            </div>
          )}

            {groups.map((group) => {
              const active = activeGroup ? group.id === activeGroup.id : false;
              const memberCount = group.members?.length ?? 0;
              const icon = iconForGroupName(group.name);
              return (
                <Link
                  key={group.id}
                  href={`/dashboard/group/${group.id}/overview`}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                    active
                      ? "border-primary-1 bg-primary-1/10 text-text-1 shadow-sm"
                      : "border-border bg-background-1/80 text-text-2 hover:border-primary-1/60 hover:bg-background-3",
                  ].join(" ")}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background-2 text-base">
                    {icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-text-1">{group.name}</span>
                    <span className="text-xs text-text-3">{memberCount} members</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <CreateGroupModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreateGroup={async (input) => {
          await onGroupCreated?.(input);
        }}
      />
    </>
  );
}
