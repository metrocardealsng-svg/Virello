import { getCurrentUser } from "@/lib/auth";

/**
 * Admin access is gated by email, not a role flag in the database, since this is a
 * single-operator product. Set ADMIN_EMAIL in your environment variables (Vercel
 * Settings -> Environment Variables) to the email address you sign up with. Anyone
 * signed in with a different email gets redirected away from /admin entirely.
 */
export async function getAdminUser() {
  const user = await getCurrentUser();
  if (!user) return null;

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail) return null; // fail closed: no admin access until explicitly configured
  if (user.email.toLowerCase().trim() !== adminEmail) return null;

  return user;
}
