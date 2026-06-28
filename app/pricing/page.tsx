import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { PLAN_LIST, formatNaira } from "@/lib/billing/plans";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — flat plans, no per-account tax",
  description:
    "Virello pricing: a real free tier with 15 posts a month across all 7 platforms, then flat Creator and Agency plans. No per-seat surprise fees.",
  alternates: { canonical: "/pricing" },
};

const FAQ = [
  {
    q: "Do I need a credit card for the free plan?",
    a: "No. Sign up with email and start posting. The free plan gives you 15 posts a month across all 7 platforms, not a crippled 1-platform trial.",
  },
  {
    q: "How does billing actually work?",
    a: "Right now, Virello runs on manual bank transfer through Moniepoint or GTBank. You pick a plan, see the transfer details, send the payment, and confirm in your dashboard. We activate your plan once we verify it, usually within a few hours.",
  },
  {
    q: "What happens if I hit my free plan limit?",
    a: "Posting pauses until the next monthly cycle, or you can upgrade to Creator for unlimited posts immediately.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans don't auto-renew with a stored card since billing is manual transfer. Just don't renew next cycle and you'll drop back to Free automatically.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes, annual billing works out to about 17% cheaper than paying monthly.",
  },
];

export default function PricingPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Pricing that doesn't punish growth
            </h1>
            <p className="mt-4 text-text-dim">
              No per-account fees. No platform paywalled behind the top tier. Pick a plan, pay by
              bank transfer, done.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
            {PLAN_LIST.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-7 ${
                  plan.id === "creator"
                    ? "border-violet bg-violet/5 ring-1 ring-violet/40"
                    : "border-border bg-ink-card"
                }`}
              >
                {plan.id === "creator" && (
                  <span className="mb-3 inline-block rounded-full bg-violet/20 px-2.5 py-0.5 text-xs font-medium text-cyan">
                    Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{plan.name}</h2>
                <p className="mt-1 text-sm text-text-dim">{plan.tagline}</p>
                <p className="mt-5 font-display text-3xl font-semibold">
                  {plan.monthlyPriceKobo === 0 ? "Free" : formatNaira(plan.monthlyPriceKobo)}
                  {plan.monthlyPriceKobo > 0 && (
                    <span className="text-sm font-normal text-text-dim">/mo</span>
                  )}
                </p>
                <ButtonLink
                  href={plan.id === "free" ? "/signup" : "/dashboard/billing"}
                  variant={plan.id === "creator" ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {plan.id === "free" ? "Start free" : `Choose ${plan.name}`}
                </ButtonLink>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-dim">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border bg-ink-raised py-20">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-2xl font-semibold">Pricing FAQ</h2>
            <div className="mt-8 space-y-6">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="font-medium text-text">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-text-dim">
              Curious how this stacks up to what you're using now?{" "}
              <Link href="/vs" className="text-cyan hover:underline">
                See the comparisons
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
