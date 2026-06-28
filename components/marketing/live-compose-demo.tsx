"use client";

import { useState, useMemo } from "react";
import { PLATFORM_LIST, adaptForPlatform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/icons/platforms";

const SAMPLE = "Just shipped the feature our users have been asking for since launch. Here's what changed and why it matters:";

export function LiveComposeDemo() {
  const [text, setText] = useState(SAMPLE);
  const [activeCount, setActiveCount] = useState(7);

  const visiblePlatforms = useMemo(() => PLATFORM_LIST.slice(0, activeCount), [activeCount]);

  return (
    <div className="relative">
      <div className="rounded-2xl border border-border bg-ink-card p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="font-mono text-xs text-text-dim">compose.virello</span>
          <span className="font-mono text-xs text-emerald">● live preview</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="mt-4 w-full resize-none rounded-lg border border-border bg-ink p-3 text-sm text-text placeholder:text-text-dim focus:border-violet focus:outline-none"
          placeholder="Write your post once…"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-xs text-text-dim">{text.length} characters</span>
          <div className="flex gap-1">
            {[3, 5, 7].map((n) => (
              <button
                key={n}
                onClick={() => setActiveCount(n)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                  activeCount === n
                    ? "bg-violet/20 text-cyan"
                    : "text-text-dim hover:text-text"
                }`}
              >
                {n} platforms
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visiblePlatforms.map((platform) => {
          const adapted = adaptForPlatform(text, platform.id);
          const overLimit = platform.charLimit !== null && text.length > platform.charLimit;
          return (
            <div
              key={platform.id}
              className="rounded-xl border border-border bg-ink-raised p-3.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-text-dim">
                  <PlatformIcon platform={platform.id} size={14} />
                  <span className="text-xs font-medium text-text">{platform.name}</span>
                </div>
                {platform.charLimit && (
                  <span
                    className={`font-mono text-[10px] ${
                      overLimit ? "text-rose" : "text-text-dim"
                    }`}
                  >
                    {Math.min(text.length, platform.charLimit)}/{platform.charLimit}
                  </span>
                )}
              </div>
              <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-text-dim">
                {adapted || "…"}
              </p>
              {platform.requiresMedia && (
                <span className="mt-2 inline-block rounded bg-amber/10 px-1.5 py-0.5 font-mono text-[9px] text-amber">
                  needs media
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
