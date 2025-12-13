"use client";

import PageNavigation from "./PageNavigation";
import ColorModeMenu from "./ColorModeMenu";
import NotificationMenu from "./NotificationMenu";
import SignInButton from "./SignInButton";

export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background-2/70 backdrop-blur">
      <div className={["mx-auto flex items-center justify-between px-4 py-3", "max-w-8xl"].join(" ")}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-1 text-sm font-bold text-background-1">
            FS
          </span>
          <div>
            <div className="text-sm font-semibold">FareShare</div>
            <div className="text-xs text-text-2">Share costs. Stay in sync.</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PageNavigation />
          <NotificationMenu />
          <SignInButton />
          <ColorModeMenu />
        </div>
      </div>
    </header>
  );
}
