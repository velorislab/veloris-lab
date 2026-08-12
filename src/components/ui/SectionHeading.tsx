import type { CSSProperties, ReactNode } from "react";

/* THE BADGE IS GONE, and the `badge` prop with it. It was the template's
   eyebrow: an icon and a one-word label in a pill above every heading, saying
   «Студия» over a heading that already introduces the studio and «Вопросы» over
   a list of questions. A heading that needs a label above it telling you what
   it is about is a heading doing half its job, and nine of them down one page
   read as furniture rather than as structure. Callers pass no badge now;
   `SectionBadge.tsx` is deleted. */

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  /** Renders the title as an h1 — used on the standalone page heroes. */
  as?: "h1" | "h2";
  align?: "center" | "left";
  tone?: "light" | "dark";
  /**
   * Width of the text column. Framer expresses this as horizontal padding on a
   * full-width container; the resulting inner width is what we set here.
   */
  textWidth?: number;
  className?: string;
}

/**
 * Section header: a 56px display title and an optional 18px lede.
 * Type scale is fixed per breakpoint, matching the Framer project.
 */
export function SectionHeading({
  title,
  description,
  as: Tag = "h2",
  align = "center",
  tone = "light",
  textWidth,
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const textStyle: CSSProperties | undefined = textWidth
    ? { maxWidth: textWidth }
    : undefined;

  return (
    <div className={`flex w-full flex-col gap-4 ${alignment} ${className}`}>
      <div
        className={`flex w-full flex-col gap-[14px] ${alignment}`}
        style={textStyle}
      >
        <Tag
          className={`text-[32px] leading-[1.2] tablet:text-[42px] tablet:leading-[1.25] desktop:text-[56px] desktop:leading-[72.8px] ${
            tone === "light" ? "text-ink-900" : "text-white"
          }`}
        >
          {title}
        </Tag>
        {description && (
          <p
            className={`text-[16px] leading-[24px] tablet:text-[18px] tablet:leading-[27px] ${
              tone === "light" ? "text-ink-400" : "text-white/70"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
