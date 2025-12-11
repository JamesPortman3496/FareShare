export type OwesEntry = {
  email: string;
  amount: number; // value in major currency units
};

export type Expense = {
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
  owes: OwesEntry[];
  createdAt: string; // ISO datetime
};
