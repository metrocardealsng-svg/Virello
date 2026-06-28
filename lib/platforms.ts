export type Platform =
  | "x"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "facebook"
  | "youtube"
  | "threads";

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  charLimit: number | null;
  requiresMedia: boolean;
  mediaKind: "image" | "video" | "either" | "none";
  description: string;
  bestPractice: string;
}

export const PLATFORMS: Record<Platform, PlatformConfig> = {
  x: {
    id: "x",
    name: "X",
    color: "#FFFFFF",
    charLimit: 280,
    requiresMedia: false,
    mediaKind: "either",
    description: "Short-form text and threads",
    bestPractice: "Front-load the point. Threads outperform single posts for reach.",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    charLimit: 2200,
    requiresMedia: true,
    mediaKind: "either",
    description: "Visual feed, Reels, and Stories",
    bestPractice: "Needs a real image or video. Caption can run long, first line is the hook.",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    color: "#69C9D0",
    charLimit: 2200,
    requiresMedia: true,
    mediaKind: "video",
    description: "Short-form vertical video",
    bestPractice: "Video only. Caption supports discovery, the hook is in the first 2 seconds.",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    charLimit: 3000,
    requiresMedia: false,
    mediaKind: "either",
    description: "Professional long-form posts",
    bestPractice: "Longer, structured posts with line breaks outperform one-liners.",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    charLimit: 63206,
    requiresMedia: false,
    mediaKind: "either",
    description: "Feed posts, groups, and pages",
    bestPractice: "Native video and links with context perform better than bare links.",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    charLimit: 5000,
    requiresMedia: true,
    mediaKind: "video",
    description: "Shorts and community posts",
    bestPractice: "Video required for Shorts. Title is the first line, description follows.",
  },
  threads: {
    id: "threads",
    name: "Threads",
    color: "#FFFFFF",
    charLimit: 500,
    requiresMedia: false,
    mediaKind: "either",
    description: "Conversational short-form text",
    bestPractice: "Casual tone wins. Replies and quote-posts drive most of the reach.",
  },
};

export const PLATFORM_LIST = Object.values(PLATFORMS);

export function adaptForPlatform(body: string, platform: Platform): string {
  const config = PLATFORMS[platform];
  if (config.charLimit && body.length > config.charLimit) {
    return body.slice(0, config.charLimit - 1).trimEnd() + "…";
  }
  return body;
}
