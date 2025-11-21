"use client";

import Link from "next/link";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

type Group = { id: string; name: string; members: number; balance: string };

interface Props {
  groups: Group[];
  activeGroup: Group | null;
}

export default function GroupSidebar({ groups, activeGroup }: Props) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <aside className="w-full max-w-xs flex-shrink-0 rounded-2xl border border-border bg-background-2/80 p-4 shadow-sm backdrop-blur md:w-72">
        <div className="text-sm font-semibold text-text-1">Groups</div>
        <div className="mt-3 space-y-2">
          {groups.map((group) => {
            const active = activeGroup ? group.id === activeGroup.id : false;
            return (
              <Link
                key={group.id}
                href={`/dashboard/group/${group.id}`}
                className={[
                  "flex w-full flex-col rounded-xl border px-3 py-3 text-left transition",
                  active
                    ? "border-primary-1 bg-primary-1/10 text-text-1 shadow-sm"
                    : "border-border bg-background-1/80 text-text-2 hover:border-primary-1/60 hover:bg-background-3",
                ].join(" ")}
              >
                <span className="text-sm font-semibold text-text-1">{group.name}</span>
                <span className="text-xs text-text-3">{group.members} members</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="mt-4 w-full rounded-xl border border-dashed border-primary-1/60 bg-primary-1/10 px-3 py-3 text-sm font-semibold text-primary-1 shadow-sm hover:border-primary-1 hover:bg-primary-1/15"
        >
          Create group
        </button>
      </aside>

      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  );
}
