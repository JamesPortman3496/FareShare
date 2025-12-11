import { NextResponse } from "next/server";

type Expense = {
  id: string;
  groupId: string;
  date: string; // ISO date of expense
  description: string;
  amount: number;
  currency: string;
  paidBy: {
    email: string;
    name?: string;
  };
  owes: { email: string; amount: number }[];
  createdAt: string; // ISO datetime
};

let MOCK_EXPENSES: Record<string, Expense[]> = {
  "693d1183-dd55-4292-a1af-e2ef8aa8db97": [
    {
      id: "exp-1",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-10",
      description: "Airbnb weekend stay",
      amount: 450,
      currency: "GBP",
      paidBy: { email: "james.portman3496@gmail.com", name: "James" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 90 },
        { email: "hcooney98@gmail.com", amount: 90 },
        { email: "adam.deegan@gmail.com", amount: 90 },
        { email: "charlie.haslam@gmail.com", amount: 90 },
        { email: "krystof.gora@gmail.com", amount: 90 },
      ],
      createdAt: "2024-11-10T09:30:00.000Z",
    },
    {
      id: "exp-2",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-08",
      description: "Boat tour tickets",
      amount: 180,
      currency: "GBP",
      paidBy: { email: "hcooney98@gmail.com", name: "Hannah" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 45 },
        { email: "hcooney98@gmail.com", amount: 45 },
        { email: "adam.deegan@gmail.com", amount: 45 },
        { email: "charlie.haslam@gmail.com", amount: 45 },
        { email: "krystof.gora@gmail.com", amount: 45 },
      ],
      createdAt: "2024-11-08T14:10:00.000Z",
    },
    {
      id: "exp-3",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-06",
      description: "Dinner out",
      amount: 240,
      currency: "GBP",
      paidBy: { email: "james.portman3496@gmail.com", name: "James" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 60 },
        { email: "hcooney98@gmail.com", amount: 60 },
        { email: "adam.deegan@gmail.com", amount: 60 },
        { email: "charlie.haslam@gmail.com", amount: 60 },
        { email: "krystof.gora@gmail.com", amount: 60 },
      ],
      createdAt: "2024-11-06T20:15:00.000Z",
    },
    {
      id: "exp-4",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-03",
      description: "Car rental",
      amount: 300,
      currency: "GBP",
      paidBy: { email: "adam.deegan@gmail.com", name: "Adam" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 60 },
        { email: "hcooney98@gmail.com", amount: 60 },
        { email: "adam.deegan@gmail.com", amount: 60 },
        { email: "charlie.haslam@gmail.com", amount: 60 },
        { email: "krystof.gora@gmail.com", amount: 60 },
      ],
      createdAt: "2024-11-03T11:00:00.000Z",
    },
    {
      id: "exp-5",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-02",
      description: "Groceries run",
      amount: 120,
      currency: "GBP",
      paidBy: { email: "charlie.haslam@gmail.com", name: "Charlie" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 30 },
        { email: "hcooney98@gmail.com", amount: 30 },
        { email: "adam.deegan@gmail.com", amount: 30 },
        { email: "charlie.haslam@gmail.com", amount: 30 },
        { email: "krystof.gora@gmail.com", amount: 30 },
      ],
      createdAt: "2024-11-02T16:30:00.000Z",
    },
    {
      id: "exp-6",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-11-01",
      description: "Museum tickets",
      amount: 90,
      currency: "GBP",
      paidBy: { email: "krystof.gora@gmail.com", name: "Krystof" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 18 },
        { email: "hcooney98@gmail.com", amount: 18 },
        { email: "adam.deegan@gmail.com", amount: 18 },
        { email: "charlie.haslam@gmail.com", amount: 18 },
        { email: "krystof.gora@gmail.com", amount: 18 },
      ],
      createdAt: "2024-11-01T13:05:00.000Z",
    },
    {
      id: "exp-7",
      groupId: "693d1183-dd55-4292-a1af-e2ef8aa8db97",
      date: "2024-10-30",
      description: "Petrol top-up",
      amount: 60,
      currency: "GBP",
      paidBy: { email: "hcooney98@gmail.com", name: "Hannah" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 12 },
        { email: "hcooney98@gmail.com", amount: 12 },
        { email: "adam.deegan@gmail.com", amount: 12 },
        { email: "charlie.haslam@gmail.com", amount: 12 },
        { email: "krystof.gora@gmail.com", amount: 12 },
      ],
      createdAt: "2024-10-30T08:40:00.000Z",
    },
  ],
  "c9a10066-8903-4e1c-aaeb-1bd5160b67aa": [
    {
      id: "exp-hs-1",
      groupId: "c9a10066-8903-4e1c-aaeb-1bd5160b67aa",
      date: "2024-10-30",
      description: "Weekly groceries",
      amount: 120,
      currency: "GBP",
      paidBy: { email: "james.portman3496@gmail.com", name: "James" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 60 },
        { email: "hcooney98@gmail.com", amount: 60 },
      ],
      createdAt: "2024-10-30T18:45:00.000Z",
    },
    {
      id: "exp-hs-2",
      groupId: "c9a10066-8903-4e1c-aaeb-1bd5160b67aa",
      date: "2024-10-25",
      description: "Electricity bill",
      amount: 90,
      currency: "GBP",
      paidBy: { email: "hcooney98@gmail.com", name: "Hannah" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 45 },
        { email: "hcooney98@gmail.com", amount: 45 },
      ],
      createdAt: "2024-10-25T10:15:00.000Z",
    },
  ],
  "c26025a5-954d-4c3c-b200-02521f5a53a2": [
    {
      id: "exp-wa-1",
      groupId: "c26025a5-954d-4c3c-b200-02521f5a53a2",
      date: "2024-09-20",
      description: "Campsite booking",
      amount: 90,
      currency: "GBP",
      paidBy: { email: "hcooney98@gmail.com", name: "Hannah" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 45 },
        { email: "hcooney98@gmail.com", amount: 45 },
      ],
      createdAt: "2024-09-20T12:20:00.000Z",
    },
    {
      id: "exp-wa-2",
      groupId: "c26025a5-954d-4c3c-b200-02521f5a53a2",
      date: "2024-09-21",
      description: "Supplies",
      amount: 60,
      currency: "GBP",
      paidBy: { email: "james.portman3496@gmail.com", name: "James" },
      owes: [
        { email: "james.portman3496@gmail.com", amount: 30 },
        { email: "hcooney98@gmail.com", amount: 30 },
      ],
      createdAt: "2024-09-21T16:45:00.000Z",
    },
  ],
};

// Support legacy slug IDs used earlier in the UI
const GROUP_ID_ALIASES: Record<string, string> = {
  "holiday-trip": "693d1183-dd55-4292-a1af-e2ef8aa8db97",
  "house-share": "c9a10066-8903-4e1c-aaeb-1bd5160b67aa",
  "weekend-away": "c26025a5-954d-4c3c-b200-02521f5a53a2",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const resolvedParams = await params;
  const rawId = decodeURIComponent(resolvedParams.groupId);
  const groupId = GROUP_ID_ALIASES[rawId] ?? rawId;
  return NextResponse.json(MOCK_EXPENSES[groupId] ?? []);
}
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const resolvedParams = await params;
  const rawId = decodeURIComponent(resolvedParams.groupId);
  const groupId = GROUP_ID_ALIASES[rawId] ?? rawId;
  const body = await req.json().catch(() => null);

  const description = (body?.description as string | undefined)?.trim();
  const amount = Number(body?.amount);
  const currency = (body?.currency as string | undefined)?.trim() || "GBP";
  const date = (body?.date as string | undefined)?.trim() || new Date().toISOString().slice(0, 10);
  const paidBy = body?.paidBy as Expense["paidBy"] | undefined;
  const owes = Array.isArray(body?.owes) ? (body.owes as Expense["owes"]) : [];

  if (!description) {
    return NextResponse.json({ error: "description is required" }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "amount must be greater than 0" }, { status: 400 });
  }
  if (!paidBy?.email) {
    return NextResponse.json({ error: "paidBy.email is required" }, { status: 400 });
  }

  const newExpense: Expense = {
    id: crypto.randomUUID(),
    groupId,
    date,
    description,
    amount,
    currency,
    paidBy,
    owes: owes.map((o) => ({ email: o.email, amount: Number(o.amount) || 0 })),
    createdAt: new Date().toISOString(),
  };

  if (!MOCK_EXPENSES[groupId]) {
    MOCK_EXPENSES[groupId] = [];
  }
  MOCK_EXPENSES[groupId] = [...MOCK_EXPENSES[groupId], newExpense];

  return NextResponse.json(newExpense, { status: 201 });
}
