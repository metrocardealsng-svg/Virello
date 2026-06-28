import Link from "next/link";
import { VirelloLogo } from "@/components/icons/logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/vs/buffer", label: "Virello vs Buffer" },
      { href: "/vs/hootsuite", label: "Virello vs Hootsuite" },
      { href: "/vs/later", label: "Virello vs Later" },
      { href: "/vs", label: "All comparisons" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { href: "/use-cases/creators", label: "For creators" },
      { href: "/use-cases/agencies", label: "For agencies" },
      { href: "/use-cases/small-business", label: "For small business" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-ink-raised">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <VirelloLogo />
            <p className="mt-4 max-w-xs text-sm text-text-dim">
              Create once. Reach everywhere. One post, adapted and published across 7 platforms.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-medium text-text">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-dim transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-text-dim sm:flex-row">
          <span>© {new Date().getFullYear()} Virello. All rights reserved.</span>
          <span>Built for creators who'd rather create than copy-paste.</span>
        </div>
      </div>
    </footer>
  );
}
