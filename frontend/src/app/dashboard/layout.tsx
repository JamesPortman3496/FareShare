"use client";

import { ReactNode } from "react";
import GroupSidebar from "@/components/pages/dashboard/GroupSidebar";
import { DashboardProvider, useDashboardContext } from "@/components/pages/dashboard/DashboardContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}

function DashboardShell({ children }: { children: ReactNode }) {
  const { groups, activeGroup, isLoadingGroups, groupsError, createGroupForUser } = useDashboardContext();

  return (
    <section className="relative w-full space-y-4">
      <div className="h-[calc(100vh-140px)] min-h-[700px] overflow-hidden ">
        <div className="flex h-full min-h-0 flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
          <GroupSidebar
            groups={groups}
            activeGroup={activeGroup}
            isLoading={isLoadingGroups}
            error={groupsError}
            onGroupCreated={createGroupForUser}
          />

          <div className="flex-1 min-h-0 min-w-0 overflow-hidden">{children}</div>
        </div>
      </div>
    </section>
  );
}
