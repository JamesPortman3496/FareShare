"use server";

import { NextResponse } from "next/server";
import { Member } from "@/types/groups";
import { upsertGroup, removeGroup, findGroup } from "../store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;
  const group = findGroup(groupId);
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(group);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;
  const existing = findGroup(groupId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : existing.name;
  const members = Array.isArray(body?.members)
    ? (body.members as Member[]).map((m) => ({
        email: m.email,
        displayName: m.displayName,
        role: m.role,
      }))
    : existing.members;

  const updated = { ...existing, name, members };
  upsertGroup(updated);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;
  const existing = findGroup(groupId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  removeGroup(groupId);
  return NextResponse.json({ ok: true });
}
