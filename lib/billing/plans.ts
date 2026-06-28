export type PlanId = "free" | "creator" | "agency";
export type BillingCycle = "monthly" | "annual";

export interface PlanConfig {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPriceKobo: number;
  annualPriceKobo: number;
  postsPerMonth: number | "unlimited";
  connectedAccounts: number | "unlimited";
  features: string[];
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: "free",
    name: "Free",
    tagline: "Try the fan-out, see if it sticks",
    monthlyPriceKobo: 0,
    annualPriceKobo: 0,
    postsPerMonth: 15,
    connectedAccounts: 2,
    features: [
      "15 posts per month",
      "2 connected accounts",
      "All 7 platforms supported",
      "Caption adaptation per platform",
      "Shareable result pages",
    ],
  },
  creator: {
    id: "creator",
    name: "Creator",
    tagline: "For solo creators posting daily",
    monthlyPriceKobo: 1490000,
    annualPriceKobo: 14900000,
    postsPerMonth: "unlimited",
    connectedAccounts: 7,
    features: [
      "Unlimited posts",
      "All 7 platforms, all accounts",
      "AI caption + hashtag generation",
      "Best-time-to-post suggestions",
      "Post history and analytics",
      "Priority support",
    ],
  },
  agency: {
    id: "agency",
    name: "Agency",
    tagline: "For teams managing multiple brands",
    monthlyPriceKobo: 4990000,
    annualPriceKobo: 49900000,
    postsPerMonth: "unlimited",
    connectedAccounts: "unlimited",
    features: [
      "Everything in Creator",
      "Unlimited connected accounts",
      "Multi-brand workspaces",
      "Team seats (up to 5)",
      "White-label share pages",
      "Dedicated onboarding",
    ],
  },
};

export const PLAN_LIST = Object.values(PLANS);

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}

export const PAYMENT_DETAILS = {
  moniepoint: { bank: "Moniepoint MFB", accountNumber: "9073965030", accountName: "Nnabuchi Michel" },
  gtbank: { bank: "GTBank", accountNumber: "0170090958", accountName: "Nnabuchi Michel" },
};
