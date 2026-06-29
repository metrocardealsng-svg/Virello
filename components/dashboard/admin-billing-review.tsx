"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/billing/plans";
import { Check, X as XIcon } from "lucide-react";

interface BillingRequestRow {
  id: string;
  user_id: string;
  email: string;
  name: string;
  plan: string;
  billing_cycle: string;
  amount_kobo: number;
  method: string;
  status: string;
  created_at: string;
}

export function AdminBillingReview({ initialRequests }: { initialRequests: BillingRequestRow[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(requestId: string, action: "approve" | "reject") {
    setError(null);
    setBusyId(requestId);
    try {
      const res = await fetch("/api/admin/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setBusyId(null);
        return;
      }
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r))
      );
    } catch {
      setError("Couldn't reach the server");
    }
    setBusyId(null);
  }

  const pending = requests.filter((r) => r.status === "pending");
  const reviewed = requests.filter((r) => r.status !== "pending");

  return (
    <div>
      {error && <p className="mb-4 text-sm text-rose">{error}</p>}

      <h2 className="font-display text-lg font-medium">
        Pending ({pending.length})
      </h2>
      {pending.length === 0 ? (
        <p className="mt-3 text-sm text-text-dim">No pending payment claims right now.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {pending.map((r) => (
            <div key={r.id} className="rounded-xl border border-amber/30 bg-amber/5 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-text">{r.name}</p>
                  <p className="text-sm text-text-dim">{r.email}</p>
                </div>
                <p className="font-mono text-lg font-semibold text-text">
                  {formatNaira(r.amount_kobo)}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-text-dim">
                <span>Plan: <span className="text-text">{r.plan}</span></span>
                <span>·</span>
                <span>Cycle: <span className="text-text">{r.billing_cycle}</span></span>
                <span>·</span>
                <span>Via: <span className="text-text">{r.method}</span></span>
                <span>·</span>
                <span>{new Date(r.created_at).toLocaleString()}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleAction(r.id, "approve")}
                  disabled={busyId === r.id}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald/15 px-3.5 py-2 text-sm font-medium text-emerald transition-opacity hover:opacity-80 disabled:opacity-40"
                >
                  <Check size={15} />
                  Confirm payment received, activate plan
                </button>
                <button
                  onClick={() => handleAction(r.id, "reject")}
                  disabled={busyId === r.id}
                  className="flex items-center gap-1.5 rounded-lg bg-rose/15 px-3.5 py-2 text-sm font-medium text-rose transition-opacity hover:opacity-80 disabled:opacity-40"
                >
                  <XIcon size={15} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewed.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-medium">History</h2>
          <div className="mt-3 divide-y divide-border rounded-xl border border-border">
            {reviewed.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="text-text">{r.name} <span className="text-text-dim">({r.email})</span></p>
                  <p className="text-xs text-text-dim">
                    {r.plan} · {r.billing_cycle} · {formatNaira(r.amount_kobo)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    r.status === "approved" ? "bg-emerald/15 text-emerald" : "bg-rose/15 text-rose"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
