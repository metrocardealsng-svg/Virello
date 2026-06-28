import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { COMPETITORS } from "@/lib/competitors";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Virello vs. every major scheduling tool",
  description:
    "Honest, side-by-side comparisons of Virello against Buffer, Hootsuite, Later, Metricool, Publer, SocialBee, Sprout Social, and Typefully.",
  alternates: { canonical: "/vs" },
};

export default function VsIndexPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight">
              How Virello compares
            </h1>
            <p className="mt-4 text-text-dim">
              Honest comparisons. We tell you where each tool is genuinely strong, not just where
              we win.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto grid max-w-4xl gap-3 px-6">
            {COMPETITORS.map((c) => (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-ink-card p-5 transition-colors hover:border-violet/50"
              >
                <div>
                  <p className="font-display font-medium">Virello vs {c.name}</p>
                  <p className="mt-1 text-sm text-text-dim">{c.oneLiner}</p>
                </div>
                <ArrowRight size={18} className="text-text-dim" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
