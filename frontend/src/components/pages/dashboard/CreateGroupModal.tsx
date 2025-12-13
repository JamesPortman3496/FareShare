"use client";

import { useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateGroup: (input: { name: string; members: string[] }) => Promise<void> | void;
};

export default function CreateGroupModal({ open, onClose, onCreateGroup }: Props) {
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inviteLink = useMemo(() => {
    const slug = groupName.trim().toLowerCase().replace(/\s+/g, "-") || "new-group";
    if (typeof window === "undefined") return `https://fareshare.app/join/${slug}`;
    return `${window.location.origin}/join/${slug}`;
  }, [groupName]);

  const addMember = () => {
    const trimmed = memberInput.trim();
    if (!trimmed) return;
    setMembers((prev) => Array.from(new Set([...prev, trimmed])));
    setMemberInput("");
  };

  if (!open) return null;

  const handleCreate = async () => {
    const name = groupName.trim();
    if (!name) {
      setError("Group name is required");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onCreateGroup({ name, members });
      setGroupName("");
      setMembers([]);
      setMemberInput("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create group");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background-1 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-3">New group</div>
            <h2 className="text-xl font-semibold text-text-1">Create a group</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <label className="flex flex-col gap-1 text-sm text-text-2">
            Group name
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Summer Roadtrip"
              className="w-full rounded-md border border-border bg-background-1 px-3 py-2 text-text-1 outline-none ring-primary-1/50 focus:ring-2"
            />
          </label>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-2">Members</div>
            <div className="flex gap-2">
              <input
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="name or email"
                className="flex-1 rounded-md border border-border bg-background-1 px-3 py-2 text-text-1 outline-none ring-primary-1/50 focus:ring-2"
              />
              <button
                type="button"
                onClick={addMember}
                className="rounded-md bg-primary-1 px-3 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2"
              >
                Add
              </button>
            </div>
            {members.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {members.map((m) => (
                  <span
                    key={m}
                    className="flex items-center gap-2 rounded-full bg-background-3 px-3 py-1 text-xs text-text-2"
                  >
                    {m}
                    <button
                      onClick={() => setMembers((prev) => prev.filter((x) => x !== m))}
                      className="text-text-3 hover:text-text-1"
                      aria-label={`Remove ${m}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-2">Share link</div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-background-2 px-3 py-2 text-sm text-text-1">
              <span className="truncate">{inviteLink}</span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(inviteLink)}
                className="flex-shrink-0 rounded-md border border-border px-2 py-1 text-xs text-text-2 hover:bg-background-3"
              >
                Copy
              </button>
            </div>
          </div>

          {error ? <div className="text-sm text-warning">{error}</div> : null}

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 text-sm text-text-2 hover:bg-background-3"
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-primary-1 px-4 py-2 text-sm font-semibold text-background-1 hover:bg-primary-2 disabled:opacity-60"
              onClick={handleCreate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create group"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
