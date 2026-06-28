import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { VirelloLogo } from "@/components/icons/logo";
import { AuthForm } from "@/components/marketing/auth-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Start posting to 7 platforms at once, free.",
};

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <Link href="/" className="mb-10">
        <VirelloLogo size={32} />
      </Link>
      <h1 className="font-display text-2xl font-semibold">Start posting everywhere</h1>
      <p className="mt-2 text-sm text-text-dim">15 free posts a month. No card needed.</p>
      <div className="mt-8">
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
