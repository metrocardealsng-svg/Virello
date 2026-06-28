export interface Competitor {
  slug: string;
  name: string;
  oneLiner: string;
  startingPrice: string;
  strengths: string[];
  weaknesses: string[];
  whereWeWin: string[];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "buffer",
    name: "Buffer",
    oneLiner: "The simplest scheduler, priced per channel",
    startingPrice: "Free for 3 channels, then $6–12/channel/month",
    strengths: ["Clean, simple interface", "Generous free plan for light use", "Good AI Assistant on paid tiers"],
    weaknesses: [
      "Pricing scales per channel, gets expensive fast past 5 accounts",
      "No shareable result pages for individual posts",
      "AI features are basic compared to dedicated tools",
    ],
    whereWeWin: [
      "Flat pricing, not per-channel, so connecting all 7 platforms doesn't multiply your bill",
      "Every published post gets a permanent, shareable result page",
      "All 7 platforms on the free plan, not gated behind 'channel' limits",
    ],
  },
  {
    slug: "hootsuite",
    name: "Hootsuite",
    oneLiner: "The enterprise all-in-one suite",
    startingPrice: "$99/user/month, no free plan",
    strengths: ["Deep team permissions and approval workflows", "Strong social listening", "Broad platform coverage"],
    weaknesses: [
      "No free plan as of 2025, starts at $99/user/month",
      "Steep learning curve for solo users and small teams",
      "Overkill for anyone just trying to post to a few platforms",
    ],
    whereWeWin: [
      "A real free plan, not just a 30-day trial",
      "Built for solo creators and small teams, not enterprise procurement",
      "Set up your first post in under a minute, no onboarding call needed",
    ],
  },
  {
    slug: "later",
    name: "Later",
    oneLiner: "Visual-first planning for Instagram and TikTok",
    startingPrice: "From $18.75/month billed annually",
    strengths: ["Strong visual content calendar and grid preview", "Good Canva integration", "Solid for Instagram-first brands"],
    weaknesses: [
      "Free plan limits monthly posts per profile",
      "Inbox only covers Instagram, Facebook, and TikTok",
      "Less suited to text-first platforms like X, LinkedIn, and Threads",
    ],
    whereWeWin: [
      "Equal depth across all 7 platforms, not just visual-first ones",
      "No per-profile post caps within your plan's monthly total",
      "Caption adaptation per platform's actual character limits, automatically",
    ],
  },
  {
    slug: "metricool",
    name: "Metricool",
    oneLiner: "The analytics-heavy value pick for agencies",
    startingPrice: "Free plan available, paid plans scale with brands managed",
    strengths: ["Strong bundled analytics across social, web, and ads", "Good multi-brand workspace model", "Solid value for agencies"],
    weaknesses: [
      "Engagement and inbox features are lighter than dedicated tools",
      "Dense interface, more built for data-driven managers than quick posting",
      "No native viral share-page mechanic for individual posts",
    ],
    whereWeWin: [
      "Faster path from idea to published post across every platform",
      "Every post becomes its own shareable, indexable result page",
      "Simpler interface focused on the compose-and-publish loop",
    ],
  },
  {
    slug: "publer",
    name: "Publer",
    oneLiner: "The budget-friendly bulk scheduler",
    startingPrice: "Free plan, paid plans from around $12/month for 3 accounts",
    strengths: ["Strong bulk scheduling via CSV", "Auto-recycling of evergreen content", "Good Canva integration"],
    weaknesses: [
      "Pricing model is per social account and per user, can get fragmented",
      "Interface less polished than top-tier competitors",
      "Advanced AI and deep analytics reserved for higher tiers",
    ],
    whereWeWin: [
      "One flat price covers all 7 platforms, no per-account math",
      "AI caption and hashtag generation included on the Creator plan, not gated higher",
      "Built-in viral sharing loop, not just scheduling",
    ],
  },
  {
    slug: "socialbee",
    name: "SocialBee",
    oneLiner: "Category-based evergreen content recycling",
    startingPrice: "From roughly $29/month",
    strengths: ["Strong evergreen content categorization and recycling", "AI Copilot for content strategy", "Good for solo-to-small-agency scale"],
    weaknesses: [
      "Assumes one brand account per platform",
      "Setup friction for solo founders who just want to post a few times a week",
      "Interface feels dated next to newer tools",
    ],
    whereWeWin: [
      "Zero setup friction, write a post and pick platforms, that's it",
      "All 7 platforms supported without separate category configuration",
      "Cleaner, modern interface built for speed",
    ],
  },
  {
    slug: "sprout-social",
    name: "Sprout Social",
    oneLiner: "The enterprise social intelligence platform",
    startingPrice: "From $199–249/seat/month",
    strengths: ["Best-in-class sentiment analysis and reporting", "Deep CRM integration", "Strong for enterprise social listening"],
    weaknesses: [
      "Among the most expensive tools in the category",
      "Built for enterprise reporting, not solo posting speed",
      "Significant overkill for creators and small businesses",
    ],
    whereWeWin: [
      "A fraction of the price for the core job: writing once and publishing everywhere",
      "No per-seat pricing tax as your team grows",
      "Built for speed, not dashboards you need training to read",
    ],
  },
  {
    slug: "typefully",
    name: "Typefully",
    oneLiner: "The X and LinkedIn writing tool for founders",
    startingPrice: "Free tier available, paid plans for advanced scheduling",
    strengths: ["Excellent writing experience for threads and long-form posts", "Strong for founder-led X and LinkedIn content", "Clean, distraction-free editor"],
    weaknesses: [
      "Narrow platform focus, mainly X and LinkedIn",
      "Not built for visual platforms like Instagram, TikTok, or YouTube",
      "No cross-platform fan-out for the same post",
    ],
    whereWeWin: [
      "Full 7-platform coverage, including the visual and video platforms Typefully skips",
      "One write-once flow instead of manually adapting for each platform",
      "Shareable result pages turn published posts into a growth channel",
    ],
  },
];

export function getCompetitor(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}
