import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { COMPETITORS, getCompetitor } from "@/lib/competitors";
import { PLANS, formatNaira } from "@/lib/billing/plans";
import { Check, X as XIcon } from "lucide-react";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  return {
    title: `Virello vs ${competitor.name} — Which is right for you in 2026?`,
    description: `An honest comparison of Virello and ${competitor.name}: pricing, platform coverage, and where each tool genuinely wins.`,
    alternates: { canonical: `/vs/${slug}` },
  };
}

export default async function VersusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const creatorPlan = PLANS.creator;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is Virello cheaper than ${competitor.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Virello's Creator plan is ${formatNaira(creatorPlan.monthlyPriceKobo)}/month flat for unlimited posts across all 7 platforms. ${competitor.name} starts at ${competitor.startingPrice}.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I switch from ${competitor.name} to Virello?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Connect your accounts in the Virello dashboard and start composing posts. There's no migration lock-in since Virello doesn't import a proprietary content library format.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight">
              Virello vs {competitor.name}
            </h1>
            <p className="mt-4 text-text-dim">{competitor.oneLiner}, compared honestly.</p>
            <div className="mt-8 flex justify-center gap-4">
              <ButtonLink href="/signup" size="lg">
                Try Virello free
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-ink-card p-6">
                <h2 className="font-display text-lg font-medium">Where {competitor.name} is strong</h2>
                <ul className="mt-4 space-y-2.5">
                  {competitor.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-text-dim">
                      <Check size={15} className="mt-0.5 shrink-0 text-text-dim" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-violet/40 bg-violet/5 p-6">
                <h2 className="font-display text-lg font-medium text-cyan">Where Virello wins</h2>
                <ul className="mt-4 space-y-2.5">
                  {competitor.whereWeWin.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-text">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-ink-card p-6">
              <h2 className="font-display text-lg font-medium">
                Honest tradeoffs with {competitor.name}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {competitor.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-text-dim">
                    <XIcon size={15} className="mt-0.5 shrink-0 text-rose" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-text-dim">
                    <th className="py-3 font-medium">Pricing & coverage</th>
                    <th className="py-3 font-medium text-cyan">Virello</th>
                    <th className="py-3 font-medium">{competitor.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-4 font-medium">Starting price</td>
                    <td className="py-4 text-emerald">Free, 15 posts/mo</td>
                    <td className="py-4 text-text-dim">{competitor.startingPrice}</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-4 font-medium">Unlimited plan</td>
                    <td className="py-4 text-emerald">{formatNaira(creatorPlan.monthlyPriceKobo)}/mo flat</td>
                    <td className="py-4 text-text-dim">Varies, often per-seat or per-channel</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-4 font-medium">Platforms on free plan</td>
                    <td className="py-4 text-emerald">All 7</td>
                    <td className="py-4 text-text-dim">Usually limited</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-4 font-medium">Shareable result pages</td>
                    <td className="py-4 text-emerald">Every post</td>
                    <td className="py-4 text-text-dim">Not typically offered</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 space-y-5">
              <h2 className="font-display text-lg font-medium">FAQ</h2>
              <div>
                <h3 className="font-medium text-text">Is Virello cheaper than {competitor.name}?</h3>
                <p className="mt-1.5 text-sm text-text-dim">
                  Virello's Creator plan is {formatNaira(creatorPlan.monthlyPriceKobo)}/month flat for
                  unlimited posts across all 7 platforms. {competitor.name} starts at{" "}
                  {competitor.startingPrice}.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-text">
                  Can I switch from {competitor.name} to Virello?
                </h3>
                <p className="mt-1.5 text-sm text-text-dim">
                  Yes. Connect your accounts in the Virello dashboard and start composing posts.
                  There's no migration lock-in since Virello doesn't use a proprietary content
                  library format.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-ink-raised p-8 text-center">
              <p className="font-display text-xl font-medium">
                Try the free plan, see for yourself
              </p>
              <ButtonLink href="/signup" className="mt-5">
                Start free
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
