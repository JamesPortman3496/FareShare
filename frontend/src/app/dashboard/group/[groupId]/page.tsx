import PageContent from "../../pageContent";

export default function GroupDashboardPage() {
  // PageContent will read the active group from the client context; no hook use here
  return <PageContent activeGroup={null} />;
}
