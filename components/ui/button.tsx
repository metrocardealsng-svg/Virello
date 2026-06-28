import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet to-cyan text-ink font-semibold hover:opacity-90 shadow-[0_0_30px_-8px_rgba(124,58,237,0.6)]",
  secondary: "bg-ink-card border border-border text-text hover:border-violet/60",
  ghost: "text-text-dim hover:text-text",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
