import { ReactNode } from "react";

// This layout simply passes through; the parent dashboard layout already wraps content
export default function GroupPageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
