import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { PLATFORM_LIST } from "@/lib/platforms";
import { PlatformIcon } from "@/components/icons/platforms";

export const metadata: Metadata = {
  title: "Features — everything in one compose flow",
  description:
    "Caption adaptation per platform, scheduling, shareable result pages, usage analytics, and native publishing to 7 platforms.",
  alternates: { canonical: "/features" },
};

const FEATURES = [
  {
    title: "One compose flow, 7 platforms",
    body: "Write your post once. Pick which platforms to publish to. Each one gets a version adapted to its actual character limit and media requirements, automatically.",
  },
  {
    title: "Real per-platform validation",
    body: "TikTok needs video. Instagram needs an image or video. We check before you publish, not after a failed post tells you the hard way.",
  },
  {
    title: "Shareable result pages",
    body: "Every published post gets a permanent, branded result page with one-tap sharing to X, Facebook, LinkedIn, WhatsApp, and Reddit, plus a dynamic preview card.",
  },
  {
    title: "Scheduling that respects timezones",
    body: "Set a future publish time for any post. It goes out automatically, no need to be online when it fires.",
  },
  {
    title: "Post history with per-platform status",
    body: "See exactly which platforms a post reached and when. No guessing whether something actually went out.",
  },
  {
    title: "A free tier that's actually usable",
    body: "15 posts a month, all 7 platforms included, no card required. Most tools gate platforms behind paid tiers. We don't.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight">
              Everything you need, nothing you don't
            </h1>
            <p className="mt-4 text-text-dim">Built around one job: write once, publish everywhere.</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-text-dim">
              {PLATFORM_LIST.map((p) => (
                <PlatformIcon key={p.id} platform={p.id} size={18} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-ink-card p-6">
                <h2 className="font-display text-lg font-medium">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-ink-raised py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <ButtonLink href="/signup" size="lg">
              Try it free
            </ButtonLink>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
