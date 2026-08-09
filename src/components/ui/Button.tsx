import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "muted" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  // Framer: #3384FF fill that lifts to #4C93FF, with the inset glow fading in
  // from transparent to a 8px/6px ring of #3384FF.
  primary:
    "bg-accent text-white shadow-[inset_0_0_20px_8px_rgba(51,132,255,0)] hover:bg-accent-600 hover:shadow-[inset_0_0_8px_6px_#3384ff]",
  // Framer: white fill with a 4px white ring.
  secondary:
    "bg-surface text-ink-500 shadow-[var(--shadow-ring)] hover:bg-surface-muted",
  // Framer: #EFF1F4 fill — the quiet CTA beside the primary one.
  muted: "bg-surface-subtle text-ink-500 hover:bg-surface-alt",
  ghost: "bg-transparent text-ink-600 hover:text-ink-900",
};

const SIZES: Record<Size, string> = {
  md: "h-[46px] px-4 py-[10px] text-[17px] leading-[25.5px]",
  lg: "h-[57.5px] px-6 py-4 text-[17px] leading-[25.5px]",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
}

/** Shared pill button. All buttons in this project are links. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  icon,
  className = "",
  external,
}: ButtonProps) {
  const classes = `inline-flex shrink-0 items-center justify-center gap-1 rounded-pill font-semibold transition-all duration-200 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const isExternal = external ?? /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

export type { ButtonProps, Variant as ButtonVariant };
export type LinkProps = ComponentProps<typeof Link>;
