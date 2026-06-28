"use client";

import { useState, useEffect } from "react";
import { Share2, Copy, Check } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled, do nothing
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const fallbacks = [
    { label: "X", href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Reddit", href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet to-cyan px-3.5 py-2 text-sm font-medium text-ink"
        >
          <Share2 size={14} />
          Share
        </button>
      )}
      {fallbacks.map((f) => (
        <a
          key={f.label}
          href={f.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-3 py-2 text-sm text-text-dim transition-colors hover:border-violet/50 hover:text-text"
        >
          {f.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-dim transition-colors hover:text-text"
      >
        {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
