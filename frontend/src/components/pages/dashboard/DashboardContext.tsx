"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { createGroup, fetchGroupsForCurrentUser } from "@/lib/api-client/groups";
import { Group } from "@/types/groups";

type DashboardContextValue = {
  groups: Group[];
  activeGroup: Group | null;
  isLoadingGroups: boolean;
  groupsError: string | null;
  refreshGroups: () => Promise<void>;
  upsertGroupInState: (group: Group) => void;
  removeGroupInState: (groupId: string) => void;
  createGroupForUser: (input: { name: string; members: string[] }) => Promise<void>;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboardContext(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardContext must be used within DashboardProvider");
  return ctx;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
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

  const activeGroup = useMemo(() => groups.find((g) => g.id === groupId) ?? null, [groupId, groups]);

  const createGroupForUser = useCallback(async (input: { name: string; members: string[] }) => {
    const newGroup = await createGroup(input);
    setGroups((prev) => [...prev, newGroup]);
  }, []);

  const value: DashboardContextValue = {
    groups,
    activeGroup,
    isLoadingGroups,
    groupsError,
    refreshGroups,
    upsertGroupInState,
    removeGroupInState,
    createGroupForUser,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}
