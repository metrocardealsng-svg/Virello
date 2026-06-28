import type { Platform } from "@/lib/platforms";

interface IconProps {
  size?: number;
  className?: string;
}

function X({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.6 8.7L22.7 22H16l-5.2-6.8L4.9 22H2l8.1-9.3L1.6 2h6.8l4.7 6.2L18.9 2Zm-2.1 18h1.7L7.2 4H5.4l11.4 16Z" />
    </svg>
  );
}

function Instagram({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTok({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 2h-3.2v13.4a3.1 3.1 0 1 1-2.2-3v-3.3a6.3 6.3 0 1 0 5.4 6.2V8.9a7 7 0 0 0 4.3 1.5V7.2c-2.4 0-4.3-1.9-4.3-4.2V2Z" />
    </svg>
  );
}

function LinkedIn({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="9" width="3.6" height="11" rx="0.4" />
      <circle cx="4.8" cy="5" r="2" />
      <path d="M10.4 9h3.4v1.6c.6-1 1.7-1.9 3.4-1.9 3 0 3.8 1.9 3.8 4.6V20h-3.6v-5.9c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.6-.1 1V20h-3.6c0-.1.1-9.7 0-11Z" />
    </svg>
  );
}

function Facebook({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 22v-8h2.7l.5-3.3H14V8.4c0-.9.3-1.6 1.7-1.6h1.6V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.5H7.5v3.3H10v8h4Z" />
    </svg>
  );
}

function YouTube({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" />
    </svg>
  );
}

function Threads({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21c4 0 6.5-2.4 6.5-6.6 0-3-1.2-4.8-3.2-5.7.1-2.4-1.2-3.7-3.2-3.7-1.7 0-2.9.9-3.3 2.3" />
      <path d="M12 21c-4 0-6.5-2.6-6.5-7.4 0-5.6 3-9.6 7.3-9.6" />
      <path d="M9.5 13c.3 1.6 1.6 2.4 3.2 2.2 1.8-.2 2.7-1.4 2.4-3.2-.3-1.7-1.8-2.6-3.8-2.3" />
    </svg>
  );
}

export const PLATFORM_ICONS: Record<Platform, (props: IconProps) => React.ReactElement> = {
  x: X,
  instagram: Instagram,
  tiktok: TikTok,
  linkedin: LinkedIn,
  facebook: Facebook,
  youtube: YouTube,
  threads: Threads,
};

export function PlatformIcon({ platform, ...props }: { platform: Platform } & IconProps) {
  const Icon = PLATFORM_ICONS[platform];
  return <Icon {...props} />;
}
