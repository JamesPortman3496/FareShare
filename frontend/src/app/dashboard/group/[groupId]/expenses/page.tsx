import { use } from "react";
import ExpensesList from "@/components/dashboard/ExpensesList";

export default function ExpensesPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);

  return (
    <div className="flex h-full flex-1 min-h-0 flex-col rounded-2xl border border-border bg-background-1/80 p-4 shadow-inner">
      <div className="flex-1 min-h-0 overflow-hidden">
        <ExpensesList groupId={groupId} />
      </div>
    </div>
  );
}
