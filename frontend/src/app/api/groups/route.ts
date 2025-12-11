"use server";

import { NextResponse } from "next/server";
import { Group } from "@/types/groups";
import { GROUPS, upsertGroup } from "./store";

export async function GET() {
  return NextResponse.json(GROUPS);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = (body?.name as string | undefined)?.trim();
  const members = Array.isArray(body?.members) ? body.members.filter(Boolean) : [];
  const currentUser = "test@gmail.com";

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const newGroup: Group = {
    id: crypto.randomUUID(),
    name,
    members: Array.from(new Set([currentUser, ...members])).map((email, idx) => ({
      email,
      role: idx === 0 ? "admin" : undefined,
    })),
  };

  upsertGroup(newGroup);
  return NextResponse.json(newGroup, { status: 201 });
}
