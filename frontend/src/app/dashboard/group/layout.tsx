"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import TabNav from "../../../../components/dashboard/TabNav";
import { useDashboardContext } from "../layout";

export default function GroupPageLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const groupId = Array.isArray(params?.groupId) ? params.groupId[0] : params?.groupId;
  const { activeGroup } = useDashboardContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-background-2/70 p-4 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Selected group</div>
          <div className="text-xl font-semibold text-text-1">
            {activeGroup ? activeGroup.name : "Select a group"}
          </div>
        </div>
        <button className="rounded-lg border border-border bg-background-1/70 px-3 py-2 text-xs font-semibold text-text-1 shadow-sm hover:bg-background-3">
          Group settings
        </button>
      </div>
      {groupId ? <TabNav groupId={groupId as string} /> : null}
      {children}
    </div>
  );
}
