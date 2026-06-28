import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { VirelloLogo } from "@/components/icons/logo";
import { ButtonLink } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/vs", label: "Compare" },
  { href: "/blog", label: "Blog" },
];

export async function MarketingNav() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Virello home">
          <VirelloLogo />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-dim transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <ButtonLink href="/dashboard" size="sm">
              Dashboard
            </ButtonLink>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm text-text-dim transition-colors hover:text-text sm:block"
              >
                Sign in
              </Link>
              <ButtonLink href="/signup" size="sm">
                Start free
              </ButtonLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
