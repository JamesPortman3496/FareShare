import { redirect } from "next/navigation";

interface Props {
  params: { groupId: string };
}

export default function GroupRedirectPage({ params }: Props) {
  redirect(`/dashboard/group/${params.groupId}/overview`);
}
