import { Group, Member } from "@/types/groups";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

export async function fetchGroupsForCurrentUser(): Promise<Group[]> {
  const url = `${API_BASE_URL}/api/groups`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch groups (${res.status})`);
  }

  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.groups)) return data.groups;
  throw new Error("Groups response was not in the expected format");
}

export async function createGroup(input: { name: string; members?: string[] }): Promise<Group> {
  const url = `${API_BASE_URL}/api/groups`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Failed to create group (${res.status})`);
  }

  return res.json();
}

export async function updateGroup(input: { id: string; name?: string; members?: Member[] }): Promise<Group> {
  const url = `${API_BASE_URL}/api/groups/${input.id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: input.name, members: input.members }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update group (${res.status})`);
  }
  return res.json();
}

export async function deleteGroup(id: string): Promise<void> {
  const url = `${API_BASE_URL}/api/groups/${id}`;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to delete group (${res.status})`);
  }
}

// You can add more operations later (joinGroup, etc.)
