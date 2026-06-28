"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PLATFORM_LIST, adaptForPlatform, type Platform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/icons/platforms";
import { Button } from "@/components/ui/button";
import { ImagePlus, X as XIcon, Clock } from "lucide-react";

interface ConnectedAccount {
  id: string;
  platform: Platform;
  handle: string;
}

export function ComposeBox({ connectedAccounts }: { connectedAccounts: ConnectedAccount[] }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState<Platform[]>(
    connectedAccounts.length > 0
      ? Array.from(new Set(connectedAccounts.map((a) => a.platform)))
      : ["x", "instagram", "linkedin"]
  );
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ shareId: string; status: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePlatform = (p: Platform) => {
    setSelected((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  function handleMockUpload(kind: "image" | "video") {
    // No real object storage is wired up in this environment. This generates a
    // stable placeholder URL so the media-required validation and previews are real;
    // swap in S3 / Cloudflare R2 / Vercel Blob here for actual uploads.
    setMediaUrl(`https://picsum.photos/seed/${Date.now()}/800/800`);
    setMediaType(kind);
  }

  const previews = useMemo(
    () =>
      selected.map((id) => {
        const platform = PLATFORM_LIST.find((p) => p.id === id)!;
        return { platform, text: adaptForPlatform(body, id) };
      }),
    [selected, body]
  );

  async function handleSubmit() {
    setError(null);
    if (!body.trim()) {
      setError("Write something first");
      return;
    }
    if (selected.length === 0) {
      setError("Pick at least one platform");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body,
          mediaUrl,
          mediaType,
          platforms: selected,
          scheduledAt: scheduleEnabled && scheduledAt ? new Date(scheduledAt).toISOString() : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't publish that post");
        setLoading(false);
        return;
      }
      setSuccess({ shareId: data.shareId, status: data.status });
      setLoading(false);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald/30 bg-emerald/10 p-8 text-center">
        <p className="font-display text-xl font-semibold text-emerald">
          {success.status === "scheduled" ? "Scheduled" : "Published"} to {selected.length} platform
          {selected.length > 1 ? "s" : ""}
        </p>
        <p className="mt-2 text-sm text-text-dim">Your result page is live and ready to share.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setSuccess(null);
              setBody("");
              setMediaUrl(null);
              setMediaType(null);
            }}
          >
            Write another
          </Button>
          <Button onClick={() => router.push(`/r/${success.shareId}`)}>View result page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="rounded-2xl border border-border bg-ink-card p-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder="What do you want to say? Write it once, we'll adapt it for every platform you pick."
            className="w-full resize-none bg-transparent text-base text-text placeholder:text-text-dim focus:outline-none"
            autoFocus
          />
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="font-mono text-xs text-text-dim">{body.length} characters</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleMockUpload("image")}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-dim transition-colors hover:bg-ink hover:text-text"
              >
                <ImagePlus size={14} />
                Add image
              </button>
            </div>
          </div>
          {mediaUrl && (
            <div className="relative mt-3 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl} alt="Attached media preview" className="h-24 w-24 rounded-lg object-cover" />
              <button
                onClick={() => {
                  setMediaUrl(null);
                  setMediaType(null);
                }}
                className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-text-dim hover:text-rose"
                aria-label="Remove media"
              >
                <XIcon size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-text">Publish to</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PLATFORM_LIST.map((p) => {
              const active = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-violet bg-violet/15 text-text"
                      : "border-border text-text-dim hover:text-text"
                  }`}
                >
                  <PlatformIcon platform={p.id} size={13} />
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={() => setScheduleEnabled((v) => !v)}
            className="flex items-center gap-2 text-sm text-text-dim hover:text-text"
          >
            <Clock size={15} />
            {scheduleEnabled ? "Scheduling for later" : "Schedule for later instead of posting now"}
          </button>
          {scheduleEnabled && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="mt-2 rounded-lg border border-border bg-ink-card px-3 py-2 text-sm text-text focus:border-violet focus:outline-none"
            />
          )}
        </div>

        {error && <p className="mt-4 text-sm text-rose">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading} size="lg" className="mt-6 w-full">
          {loading
            ? "Publishing…"
            : scheduleEnabled
              ? "Schedule post"
              : `Publish to ${selected.length} platform${selected.length === 1 ? "" : "s"} now`}
        </Button>
      </div>

      <div>
        <p className="text-sm font-medium text-text">Live preview</p>
        <div className="mt-2.5 space-y-3">
          {previews.length === 0 && (
            <p className="text-sm text-text-dim">Pick a platform to see how your post will look.</p>
          )}
          {previews.map(({ platform, text }) => {
            const overLimit = platform.charLimit !== null && body.length > platform.charLimit;
            const missingMedia = platform.requiresMedia && !mediaUrl;
            return (
              <div key={platform.id} className="rounded-xl border border-border bg-ink-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={platform.id} size={15} />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                  {platform.charLimit && (
                    <span className={`font-mono text-xs ${overLimit ? "text-rose" : "text-text-dim"}`}>
                      {Math.min(body.length, platform.charLimit)}/{platform.charLimit}
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-text-dim">
                  {text || "Your adapted caption will show up here."}
                </p>
                {missingMedia && (
                  <p className="mt-2 text-xs text-amber">Needs an image or video attached.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
