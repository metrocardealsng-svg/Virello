import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

const SITE_URL = "https://virello.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Virello — Create Once. Reach Everywhere.",
    template: "%s | Virello",
  },
  description:
    "Write one post, publish it natively across X, Instagram, TikTok, LinkedIn, Facebook, YouTube, and Threads. Virello adapts your caption for every platform automatically.",
  keywords: [
    "social media scheduler",
    "cross posting tool",
    "post bridge alternative",
    "schedule social media posts",
    "multi platform posting",
  ],
  authors: [{ name: "Virello" }],
  openGraph: {
    type: "website",
    siteName: "Virello",
    title: "Virello — Create Once. Reach Everywhere.",
    description:
      "Write one post, publish it natively across 7 platforms. Caption adaptation, scheduling, and analytics in one dashboard.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Virello — Create Once. Reach Everywhere.",
    description: "Write one post, publish it natively across 7 platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Virello",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Virello",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Virello",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-text font-body">{children}</body>
    </html>
  );
}
