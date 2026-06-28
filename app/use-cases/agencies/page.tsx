import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { USE_CASES } from "@/lib/use-cases";
import { Check, X as XIcon } from "lucide-react";

const useCase = USE_CASES.agencies;

export const metadata: Metadata = {
  title: useCase.title,
  description: useCase.description,
  alternates: { canonical: "/use-cases/agencies" },
};

export default function AgenciesPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight">{useCase.headline}</h1>
            <p className="mt-4 text-text-dim">{useCase.description}</p>
            <ButtonLink href="/signup" size="lg" className="mt-7">
              Start free
            </ButtonLink>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-ink-card p-6">
              <h2 className="font-display text-lg font-medium">The problem</h2>
              <ul className="mt-4 space-y-2.5">
                {useCase.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-text-dim">
                    <XIcon size={15} className="mt-0.5 shrink-0 text-rose" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-violet/40 bg-violet/5 p-6">
              <h2 className="font-display text-lg font-medium text-cyan">How Virello helps</h2>
              <ul className="mt-4 space-y-2.5">
                {useCase.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
