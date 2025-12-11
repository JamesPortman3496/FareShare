import { Expense } from "@/types/expenses";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

export async function fetchExpensesForGroup(groupId: string): Promise<Expense[]> {
  const url = `${API_BASE_URL}/api/groups/${groupId}/expenses`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch expenses (${res.status})`);
  }

  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.expenses)) return data.expenses;
  throw new Error("Expenses response was not in the expected format");
}

export async function createExpense(groupId: string, input: Omit<Expense, "id" | "groupId" | "createdAt">) {
  const url = `${API_BASE_URL}/api/groups/${groupId}/expenses`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create expense (${res.status})`);
  }

  return res.json() as Promise<Expense>;
}
