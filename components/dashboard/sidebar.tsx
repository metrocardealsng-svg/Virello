"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { VirelloLogo } from "@/components/icons/logo";
import { LayoutGrid, PenSquare, History, Link2, CreditCard, LogOut } from "lucide-react";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/compose", label: "Compose", icon: PenSquare },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/accounts", label: "Accounts", icon: Link2 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export function DashboardSidebar({ planLabel }: { planLabel: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-ink-raised px-4 py-6">
      <Link href="/" className="px-2">
        <VirelloLogo size={26} />
      </Link>
      <span className="mx-2 mt-2 inline-block w-fit rounded-full bg-violet/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-cyan">
        {planLabel} plan
      </span>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-violet/15 text-text font-medium"
                  : "text-text-dim hover:bg-ink-card hover:text-text"
              }`}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-dim transition-colors hover:bg-ink-card hover:text-text"
      >
        <LogOut size={17} />
        Sign out
      </button>
    </aside>
  );
}
