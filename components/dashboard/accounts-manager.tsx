"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORM_LIST, type Platform } from "@/lib/platforms";
import { PlatformIcon } from "@/components/icons/platforms";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Account {
  id: string;
  platform: Platform;
  handle: string;
}

export function AccountsManager({ initialAccounts }: { initialAccounts: Account[] }) {
  const router = useRouter();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [connectingPlatform, setConnectingPlatform] = useState<Platform | null>(null);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const connectedPlatforms = new Set(accounts.map((a) => a.platform));

  async function handleConnect(platform: Platform) {
    setError(null);
    if (!handle.trim()) {
      setError("Enter the account handle");
      return;
    }
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, handle }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Couldn't connect that account");
      return;
    }
    setAccounts((prev) => [...prev, { id: data.id, platform, handle: `@${handle.replace(/^@/, "")}` }]);
    setConnectingPlatform(null);
    setHandle("");
    router.refresh();
  }

  async function handleDisconnect(id: string) {
    await fetch(`/api/accounts?id=${id}`, { method: "DELETE" });
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    router.refresh();
  }

  return (
    <div>
      <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-4 text-sm text-text-dim">
        Connecting an account here links the handle to your dashboard so posts can target it.
        Live OAuth with each platform (the actual login redirect) needs a registered developer app
        per platform, which isn't set up in this environment. Swap this flow for the real OAuth
        redirect once you've registered apps with each platform.
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PLATFORM_LIST.map((platform) => {
          const connected = accounts.filter((a) => a.platform === platform.id);
          const isConnecting = connectingPlatform === platform.id;

          return (
            <div key={platform.id} className="rounded-xl border border-border bg-ink-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <PlatformIcon platform={platform.id} size={18} />
                  <span className="font-medium">{platform.name}</span>
                </div>
                {!isConnecting && (
                  <button
                    onClick={() => setConnectingPlatform(platform.id)}
                    className="text-xs text-cyan hover:underline"
                  >
                    + Connect another
                  </button>
                )}
              </div>

              {connected.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {connected.map((acc) => (
                    <li
                      key={acc.id}
                      className="flex items-center justify-between rounded-lg bg-ink px-3 py-1.5 text-sm"
                    >
                      <span className="font-mono text-text-dim">{acc.handle}</span>
                      <button
                        onClick={() => handleDisconnect(acc.id)}
                        className="text-text-dim hover:text-rose"
                        aria-label="Disconnect"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {connected.length === 0 && !isConnecting && (
                <p className="mt-2 text-xs text-text-dim">Not connected</p>
              )}

              {isConnecting && (
                <div className="mt-3 flex gap-2">
                  <input
                    autoFocus
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@yourhandle"
                    className="flex-1 rounded-lg border border-border bg-ink px-2.5 py-1.5 text-sm text-text focus:border-violet focus:outline-none"
                  />
                  <Button size="sm" onClick={() => handleConnect(platform.id)}>
                    Connect
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="mt-3 text-sm text-rose">{error}</p>}
    </div>
  );
}
