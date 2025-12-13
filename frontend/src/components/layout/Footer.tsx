import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-2 text-xs text-text-2">
      <div className="mx-auto flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between max-w-8xl">
        <div className="flex items-center gap-2 text-text-1">
          <span className="font-semibold">FareShare</span>
          <span className="text-text-3">·</span>
          <span>Sharing made simple.</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/about" className="hover:text-text-1">About</Link>
          <span className="text-text-3">/</span>
          <Link href="/support" className="hover:text-text-1">Support</Link>
          <span className="text-text-3">/</span>
          <Link href="/privacy" className="hover:text-text-1">Privacy</Link>
          <span className="text-text-3">/</span>
          <Link href="/terms" className="hover:text-text-1">Terms</Link>
          <span className="text-text-3">/</span>
          <a href="mailto:hello@fareshare.app" className="hover:text-text-1">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} FareShare</span>
          <span className="text-text-3">·</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
