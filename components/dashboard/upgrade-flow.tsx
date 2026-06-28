"use client";

import { useState } from "react";
import { PLANS, PAYMENT_DETAILS, formatNaira, type PlanId, type BillingCycle } from "@/lib/billing/plans";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function UpgradeFlow({ currentPlan }: { currentPlan: PlanId }) {
  const [selectedPlan, setSelectedPlan] = useState<"creator" | "agency">(
    currentPlan === "agency" ? "agency" : "creator"
  );
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [method, setMethod] = useState<"moniepoint" | "gtbank">("moniepoint");
  const [step, setStep] = useState<"select" | "pay" | "confirmed">("select");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const plan = PLANS[selectedPlan];
  const amount = cycle === "annual" ? plan.annualPriceKobo : plan.monthlyPriceKobo;
  const details = PAYMENT_DETAILS[method];

  function copyAccount() {
    navigator.clipboard.writeText(details.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function submitRequest() {
    setSubmitting(true);
    await fetch("/api/billing/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: selectedPlan, cycle, method }),
    });
    setSubmitting(false);
    setStep("confirmed");
  }

  if (step === "confirmed") {
    return (
      <div className="rounded-2xl border border-emerald/30 bg-emerald/10 p-8 text-center">
        <p className="font-display text-xl font-semibold text-emerald">Payment confirmation received</p>
        <p className="mt-2 text-sm text-text-dim">
          We'll verify your transfer and activate {plan.name} within 24 hours. You'll get an email
          once it's live.
        </p>
      </div>
    );
  }

  if (step === "pay") {
    return (
      <div className="rounded-2xl border border-border bg-ink-card p-6">
        <button onClick={() => setStep("select")} className="text-xs text-text-dim hover:text-text">
          ← Back
        </button>
        <p className="mt-3 font-display text-lg font-medium">
          Pay {formatNaira(amount)} for {plan.name} ({cycle})
        </p>
        <div className="mt-4 flex gap-2">
          {(["moniepoint", "gtbank"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                method === m ? "border-violet bg-violet/15 text-text" : "border-border text-text-dim"
              }`}
            >
              {m === "moniepoint" ? "Moniepoint" : "GTBank"}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-ink p-5 font-mono text-sm">
          <Row label="Bank" value={details.bank} />
          <Row label="Account number" value={details.accountNumber} copy onCopy={copyAccount} copied={copied} />
          <Row label="Account name" value={details.accountName} />
          <Row label="Amount" value={formatNaira(amount)} />
        </div>

        <p className="mt-4 text-xs text-text-dim">
          After you transfer, tap confirm below. We manually verify transfers and activate your plan,
          usually within a few hours.
        </p>
        <Button onClick={submitRequest} disabled={submitting} className="mt-4 w-full">
          {submitting ? "Submitting…" : "I've sent the transfer"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-ink-card p-6">
      <div className="flex gap-2">
        {(["creator", "agency"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlan(p)}
            className={`flex-1 rounded-lg border px-4 py-3 text-left ${
              selectedPlan === p ? "border-violet bg-violet/10" : "border-border"
            }`}
          >
            <p className="font-display font-medium">{PLANS[p].name}</p>
            <p className="text-xs text-text-dim">{PLANS[p].tagline}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {(["monthly", "annual"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCycle(c)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
              cycle === c ? "border-violet bg-violet/15 text-text" : "border-border text-text-dim"
            }`}
          >
            {c === "annual" ? "Annual (save ~17%)" : "Monthly"}
          </button>
        ))}
      </div>
      <p className="mt-4 font-display text-2xl font-semibold">
        {formatNaira(amount)}
        <span className="text-sm font-normal text-text-dim">/{cycle === "annual" ? "yr" : "mo"}</span>
      </p>
      <Button onClick={() => setStep("pay")} className="mt-4 w-full">
        Continue to payment
      </Button>
    </div>
  );
}

function Row({
  label,
  value,
  copy,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  copy?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-text-dim">{label}</span>
      <span className="flex items-center gap-2 text-text">
        {value}
        {copy && (
          <button onClick={onCopy} aria-label="Copy account number">
            {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
          </button>
        )}
      </span>
    </div>
  );
}
