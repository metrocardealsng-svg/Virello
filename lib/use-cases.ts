export interface UseCase {
  slug: string;
  title: string;
  headline: string;
  description: string;
  painPoints: string[];
  benefits: string[];
}

export const USE_CASES: Record<string, UseCase> = {
  creators: {
    slug: "creators",
    title: "Virello for creators",
    headline: "One upload, every platform you actually post to",
    description:
      "You're already making the content. Virello handles the repetitive part: adapting and publishing it everywhere your audience is.",
    painPoints: [
      "Re-uploading the same video to TikTok, Reels, and Shorts separately",
      "Rewriting captions by hand for each platform's character limit",
      "Losing track of what's been posted where",
    ],
    benefits: [
      "Upload once, publish to all 7 platforms from one screen",
      "Automatic caption adaptation per platform's actual limits",
      "A shareable result page for every post, built-in distribution",
    ],
  },
  agencies: {
    slug: "agencies",
    title: "Virello for agencies",
    headline: "Manage client accounts without the per-seat tax",
    description:
      "Agency plans that don't punish you for connecting more accounts, with white-label share pages your clients will actually want.",
    painPoints: [
      "Per-seat and per-account pricing that scales faster than client revenue",
      "Juggling separate logins per client per platform",
      "No easy way to show clients proof of what went out and when",
    ],
    benefits: [
      "Unlimited connected accounts on the Agency plan, no per-account fee",
      "Multi-brand workspaces to keep clients separated cleanly",
      "White-label result pages clients can point to as proof of work",
    ],
  },
  "small-business": {
    slug: "small-business",
    title: "Virello for small business",
    headline: "Consistent posting without hiring a marketing person",
    description:
      "A free plan generous enough to actually run a small business's social presence, no card required to start.",
    painPoints: [
      "No time to learn 5 different platform dashboards",
      "Inconsistent posting because the manual process keeps getting skipped",
      "Paying enterprise prices for tools built for marketing teams, not solo owners",
    ],
    benefits: [
      "15 free posts a month across all 7 platforms, genuinely usable at zero cost",
      "One compose screen, no separate logins per platform",
      "Flat pricing if you grow past free, not per-seat or per-channel",
    ],
  },
};
