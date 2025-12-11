"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteGroup, updateGroup } from "@/lib/api-client/groups";
import { useDashboardContext } from "../../../layout";

type EditableMember = {
  email: string;
  role?: "admin" | "member";
  displayName?: string;
};

export default function GroupSettingsPage() {
  const router = useRouter();
  const { activeGroup, refreshGroups, upsertGroupInState, removeGroupInState } = useDashboardContext();
  const [name, setName] = useState(activeGroup?.name ?? "");
  const [members, setMembers] = useState<EditableMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setName(activeGroup?.name ?? "");
    setMembers(
      activeGroup?.members?.map((m) => ({
        email: m.email,
        role: m.role ?? "member",
        displayName: m.displayName,
      })) ?? []
    );
    setMessage(null);
  }, [activeGroup]);

  const shareLink = useMemo(() => {
    const slug = activeGroup?.id ?? "group";
    if (typeof window === "undefined") return `https://fareshare.app/join/${slug}`;
    return `${window.location.origin}/join/${slug}`;
  }, [activeGroup?.id]);

  const handleSave = async () => {
    if (!activeGroup) return;
    setIsSaving(true);
    setMessage(null);
    try {
      const updated = await updateGroup({
        id: activeGroup.id,
        name: name.trim() || activeGroup.name,
        members,
      });
      upsertGroupInState(updated);
      await refreshGroups();
      setMessage("Changes saved");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!activeGroup) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${activeGroup.name}"? This cannot be undone.`
    );
    if (!confirmed) return;
    setIsDeleting(true);
    setMessage(null);
    try {
      await deleteGroup(activeGroup.id);
      removeGroupInState(activeGroup.id);
      await refreshGroups();
      router.push("/dashboard");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to delete group");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRemoveMember = (email: string) => {
    const confirmed = window.confirm(`Remove ${email} from this group?`);
    if (!confirmed) return;
    setMembers((prev) => prev.filter((m) => m.email !== email));
  };

  const handleAddMember = () => {
    const email = newMemberEmail.trim();
    const displayName = newMemberName.trim();
    if (!email) return;
    setMembers((prev) => {
      if (prev.some((m) => m.email === email)) return prev;
      return [...prev, { email, displayName, role: "member" }];
    });
    setNewMemberEmail("");
    setNewMemberName("");
  };

  if (!activeGroup) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background-1/70 p-6 text-sm text-text-3">
        Select a group to adjust settings.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <label className="flex flex-col gap-1 text-sm text-text-2">
              Group name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-border bg-background-1 px-3 py-2 text-text-1 outline-none ring-primary-1/50 focus:ring-2"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-3">
              <span>Share link:</span>
              <span className="truncate rounded-md border border-border bg-background-2 px-2 py-1 text-text-2">
                {shareLink}
              </span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(shareLink)}
                className="rounded-md border border-border px-2 py-1 text-[11px] text-text-2 hover:bg-background-3"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={handleDeleteGroup}
              disabled={isDeleting}
              className="rounded-md border border-red-400 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete group"}
            </button>
          </div>
        </div>
        {message && <div className="mt-2 text-xs text-text-2">{message}</div>}
      </div>

      <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Add member</div>
            <div className="text-sm text-text-2">Invite teammates to this group</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Name"
              className="w-36 rounded-md border border-border bg-background-1 px-3 py-2 text-sm text-text-1"
            />
            <input
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-52 rounded-md border border-border bg-background-1 px-3 py-2 text-sm text-text-1"
            />
            <button
              onClick={handleAddMember}
              className="rounded-md bg-primary-1 px-3 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">Members</div>
            <div className="text-sm text-text-2">Assign roles within the group</div>
          </div>
        </div>
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.email}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background-2/70 p-3 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="text-sm font-semibold text-text-1">
                {member.displayName ? `${member.displayName} · ${member.email}` : member.email}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-text-2">Role</label>
                <select
                  value={member.role}
                  onChange={(e) =>
                    setMembers((prev) =>
                      prev.map((m) =>
                        m.email === member.email ? { ...m, role: e.target.value as EditableMember["role"] } : m
                      )
                    )
                  }
                  className="rounded-md border border-border bg-background-1 px-3 py-2 text-sm text-text-1"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
                <button
                  onClick={() => handleRemoveMember(member.email)}
                  className="rounded-md border border-red-300 bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {members.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-background-1/60 px-3 py-3 text-sm text-text-3">
              No members listed yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
