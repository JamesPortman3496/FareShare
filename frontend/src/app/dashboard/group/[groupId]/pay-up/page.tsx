import { use } from "react";
import PayUpList from "@/components/pages/dashboard/PayUpList";

export default function PayUpPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);

  return (
    <div className="rounded-2xl border border-border bg-background-1/80 p-4 shadow-inner">
      <PayUpList groupId={groupId} />
    </div>
  );
}
