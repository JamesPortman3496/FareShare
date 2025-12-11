"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import GroupSidebar from "@/components/dashboard/GroupSidebar";
import { createGroup, fetchGroupsForCurrentUser } from "@/lib/api-client/groups";
import { Group } from "@/types/groups";

interface DashboardContextValue {
  groups: Group[];
  activeGroup: Group | null;
  refreshGroups: () => Promise<void>;
  upsertGroupInState: (group: Group) => void;
  removeGroupInState: (groupId: string) => void;
  isLoadingGroups: boolean;
  groupsError: string | null;
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
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);

  const refreshGroups = useCallback(async () => {
    setIsLoadingGroups(true);
    setGroupsError(null);
    try {
      const data = await fetchGroupsForCurrentUser();
      setGroups(data);
    } catch (err) {
      setGroupsError(err instanceof Error ? err.message : "Failed to load groups");
    } finally {
      setIsLoadingGroups(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      await refreshGroups();
      if (!active) return;
    })();
    return () => {
      active = false;
    };
  }, [refreshGroups]);

  const upsertGroupInState = useCallback((group: Group) => {
    setGroups((prev) => {
      const idx = prev.findIndex((g) => g.id === group.id);
      if (idx === -1) return [...prev, group];
      const next = [...prev];
      next[idx] = group;
      return next;
    });
  }, []);

  const removeGroupInState = useCallback((id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const activeGroup = useMemo(() => {
    const found = groups.find((g) => g.id === groupId);
    return found ?? null;
  }, [groupId, groups]);

  async function handleGroupCreated(input: { name: string; members: string[] }) {
    const newGroup = await createGroup(input);
    setGroups((prev) => [...prev, newGroup]);
  }

  return (
    <DashboardContext.Provider
      value={{ groups, activeGroup, refreshGroups, upsertGroupInState, removeGroupInState, isLoadingGroups, groupsError }}
    >
      <section className="relative w-full space-y-4">
        <div className="h-[calc(100vh-140px)] min-h-[700px] overflow-hidden rounded-3xl bg-background-1/80 shadow-sm">
          <div className="flex h-full min-h-0 flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
            <GroupSidebar
              groups={groups}
              activeGroup={activeGroup}
              isLoading={isLoadingGroups}
              error={groupsError}
              onGroupCreated={handleGroupCreated}
            />

            <div className="flex-1 min-h-0 min-w-0 overflow-hidden">{children}</div>
          </div>
        </div>
      </section>
    </DashboardContext.Provider>
  );
}
