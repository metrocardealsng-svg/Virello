import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { LiveComposeDemo } from "@/components/marketing/live-compose-demo";
import { ButtonLink } from "@/components/ui/button";
import { PlatformIcon } from "@/components/icons/platforms";
import { PLATFORM_LIST } from "@/lib/platforms";

export const metadata: Metadata = {
  title: "Virello — Create Once. Reach Everywhere.",
  description:
    "Write one post, publish it natively across X, Instagram, TikTok, LinkedIn, Facebook, YouTube, and Threads. Caption adaptation, scheduling, and a shareable result page for every post.",
  alternates: { canonical: "/" },
};

const COMPARISON_POINTS = [
  { label: "Platforms supported", virello: "7, all in the free plan", others: "Often gated behind paid tiers" },
  { label: "Caption adaptation", virello: "Automatic, per-platform limits", others: "Manual copy-paste editing" },
  { label: "Shareable result pages", virello: "Every post gets one, indexable", others: "Not offered" },
  { label: "Pricing transparency", virello: "Flat monthly, no per-seat tax", others: "Often per-account, per-seat" },
];

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #7c3aed, transparent 40%), radial-gradient(circle at 80% 0%, #22d3ee, transparent 40%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan">
                one post → seven platforms
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Create once.
                <br />
                <span className="gradient-text">Reach everywhere.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-text-dim">
                Write a post. Virello adapts the caption, checks every platform's limits, and
                publishes natively to X, Instagram, TikTok, LinkedIn, Facebook, YouTube, and
                Threads, all from one dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/signup" size="lg">
                  Start free, no card needed
                </ButtonLink>
                <ButtonLink href="/vs" variant="secondary" size="lg">
                  See how we compare
                </ButtonLink>
              </div>
              <div className="mt-10 flex items-center gap-3 text-text-dim">
                {PLATFORM_LIST.map((p) => (
                  <PlatformIcon key={p.id} platform={p.id} size={18} />
                ))}
                <span className="ml-2 text-xs">All 7, on the free plan</span>
              </div>
            </div>
            <div className="flex items-center">
              <LiveComposeDemo />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-ink-raised py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-text-dim">
              Why creators are switching
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-dim">
                    <th className="py-3 font-medium">What matters</th>
                    <th className="py-3 font-medium text-cyan">Virello</th>
                    <th className="py-3 font-medium">Most alternatives</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_POINTS.map((row) => (
                    <tr key={row.label} className="border-b border-border/60">
                      <td className="py-4 font-medium text-text">{row.label}</td>
                      <td className="py-4 text-emerald">{row.virello}</td>
                      <td className="py-4 text-text-dim">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                title="Built for all 7 platforms"
                body="Not 3 with the rest 'coming soon.' X, Instagram, TikTok, LinkedIn, Facebook, YouTube, and Threads work today, on every plan including free."
              />
              <FeatureCard
                title="Every result is shareable"
                body="Published posts get a permanent, branded result page you can share anywhere. It's the only scheduler that turns your post history into its own growth loop."
              />
              <FeatureCard
                title="Real per-platform limits"
                body="Character counts, media requirements, and format rules are enforced before you publish, not discovered after a failed post."
              />
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-ink-raised py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Stop re-typing the same post seven times.
            </h2>
            <p className="mt-4 text-text-dim">
              Free plan gives you 15 posts a month across all platforms. No credit card.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <ButtonLink href="/signup" size="lg">
                Start free
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-ink-card p-6">
      <h3 className="font-display text-lg font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-dim">{body}</p>
    </div>
  );
}
