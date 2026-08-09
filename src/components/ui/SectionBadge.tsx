import Image from "next/image";

interface SectionBadgeProps {
  /** Path to the 24×24 badge icon. */
  icon: string;
  label: string;
  /** Dark sections invert the badge fill. */
  tone?: "light" | "dark";
}

/**
 * The small pill that opens every section. Framer values: 6px/10px padding,
 * 4px gap, #F1F7FC fill, 100px radius, 3px white ring plus a soft drop shadow.
 */
export function SectionBadge({ icon, label, tone = "light" }: SectionBadgeProps) {
  return (
    <div
      className={`flex w-fit items-center gap-1 rounded-pill px-[10px] py-[6px] ${
        tone === "light"
          ? "hairline bg-surface-tint shadow-[0_2px_3px_0_rgba(182,182,182,0.1),0_0_0_3px_#ffffff]"
          : "bg-white/10"
      }`}
    >
      <Image src={icon} alt="" width={24} height={24} className="size-6" />
      <span
        className={`text-[17px] leading-[25.5px] ${
          tone === "light" ? "text-ink-500" : "text-white"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
