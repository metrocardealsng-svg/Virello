"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const SUPPORT_EMAIL = "support@virello.app";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "Virello site"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-ink-card px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-ink-card px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-text">Message</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-lg border border-border bg-ink-card px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
        />
      </div>
      <Button type="submit" className="w-full">
        Send
      </Button>
      <p className="mt-2 text-center text-xs text-text-dim">
        Opens your email client, addressed to {SUPPORT_EMAIL}
      </p>
    </form>
  );
}
