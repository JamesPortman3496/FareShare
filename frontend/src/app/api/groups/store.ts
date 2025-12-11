import { Group, Member } from "@/types/groups";

export let GROUPS: Group[] = [
  {
    id: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
    name: "Holiday Trip",
    members: [
      { email: "james.portman3496@gmail.com", displayName: "James Portman", role: "admin" },
      { email: "hcooney98@gmail.com", displayName: "Hannah Cooney" },
      { email: "adam.deegan@gmail.com", displayName: "Adam Deegan" },
      { email: "charlie.haslam@gmail.com", displayName: "Charlie Haslam" },
      { email: "krystof.gora@gmail.com", displayName: "Krystof Gora" },
    ],
  },
  {
    id: "c9a10066-8903-4e1c-aaeb-1bd5160b67aa",
    name: "House Share",
    members: [
      { email: "james.portman3496@gmail.com", displayName: "James Portman", role: "admin" },
      { email: "hcooney98@gmail.com", displayName: "Hannah Cooney" },
    ],
  },
  {
    id: "c26025a5-954d-4c3c-b200-02521f5a53a2",
    name: "Weekend Away",
    members: [
      { email: "james.portman3496@gmail.com", displayName: "James Portman", role: "admin" },
      { email: "hcooney98@gmail.com", displayName: "Hannah Cooney" },
    ],
  },
];

export function findGroup(id: string) {
  return GROUPS.find((g) => g.id === id);
}

export function upsertGroup(group: Group) {
  const existingIdx = GROUPS.findIndex((g) => g.id === group.id);
  if (existingIdx >= 0) {
    GROUPS[existingIdx] = group;
  } else {
    GROUPS = [...GROUPS, group];
  }
  return group;
}

export function removeGroup(id: string) {
  GROUPS = GROUPS.filter((g) => g.id !== id);
}
