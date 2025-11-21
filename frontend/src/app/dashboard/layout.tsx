"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import GroupSidebar from "../../../components/dashboard/GroupSidebar";
import { useParams } from "next/navigation";

type Group = { id: string; name: string; members: number; balance: string };

const GROUPS: Group[] = [
  { id: "holiday-trip", name: "Holiday Trip", members: 4, balance: "+ £120 settled" },
  { id: "house-share", name: "House Share", members: 3, balance: "£45 outstanding" },
  { id: "team-event", name: "Team Event", members: 6, balance: "+ £300 settled" },
];

interface DashboardContextValue {
  groups: Group[];
  activeGroup: Group | null;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboardContext(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used within DashboardLayout");
  }
  return ctx;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const groupId = Array.isArray(params?.groupId) ? params?.groupId[0] : params?.groupId;

  const activeGroup = useMemo(() => {
    const found = GROUPS.find((g) => g.id === groupId);
    return found ?? null;
  }, [groupId]);

  return (
    <DashboardContext.Provider value={{ groups: GROUPS, activeGroup }}>
      <section className="relative w-full min-h-[75vh] space-y-4">
        <div className="h-full overflow-hidden rounded-3xl border border-border bg-background-1/80 shadow-sm">
          <div className="flex h-full flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
            <GroupSidebar
              groups={GROUPS}
              activeGroup={activeGroup}
            />

            <div className="flex-1 min-h-[640px]">{children}</div>
          </div>
        </div>
      </section>
    </DashboardContext.Provider>
  );
}
