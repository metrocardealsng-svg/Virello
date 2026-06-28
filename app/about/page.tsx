import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "About Virello",
  description: "Why we built Virello and what we believe about cross-platform posting.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-6">
            <h1 className="font-display text-4xl font-semibold tracking-tight">About Virello</h1>
            <div className="mt-8 space-y-5 text-text-dim">
              <p>
                Virello exists because writing one good post and then manually reformatting it
                seven times shouldn't be the bottleneck between an idea and an audience.
              </p>
              <p>
                We built a posting engine that adapts your caption to each platform's actual
                constraints, character limits, media requirements, tone conventions, rather than
                pretending one block of text works identically everywhere.
              </p>
              <p>
                We're a small, independent team. We'd rather ship something genuinely useful than
                something that looks impressive in a demo and falls apart on real use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
