import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Virello team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="py-20">
          <div className="mx-auto max-w-md px-6">
            <h1 className="font-display text-3xl font-semibold tracking-tight">Get in touch</h1>
            <p className="mt-3 text-text-dim">
              Questions about billing, a bug, or a feature request, send it over.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
