import Image from "next/image";

interface PhoneMockProps {
  /** Screenshot shown inside the bezel. */
  screen: string;
  alt?: string;
  /** Sizing/positioning for the outer frame. */
  className?: string;
  sizes?: string;
}

/**
 * Device mock used by the Mobile App card.
 *
 * Source geometry: a 220×442 bezel with 10px/12px padding, a 20px-radius
 * screen, and the 49×14 camera bar centred 7px down. The caller sets the width.
 */
export function PhoneMock({
  screen,
  alt = "",
  className = "",
  sizes = "264px",
}: PhoneMockProps) {
  return (
    <div className={`relative aspect-[220/442] px-3 py-[10px] ${className}`}>
      <Image
        src="/images/backgrounds/phone-frame.svg"
        alt=""
        fill
        sizes={sizes}
        className="object-contain"
      />
      <div className="relative size-full overflow-hidden rounded-panel">
        {/* Top-anchored, as in the source: the screenshot is a hair taller
            than the screen, and the crop comes off the bottom. */}
        <Image
          src={screen}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
        <Image
          src="/images/icons/phone-notch.svg"
          alt=""
          width={49}
          height={14}
          className="absolute top-[7px] left-1/2 h-[14px] w-[49px] -translate-x-1/2"
        />
      </div>
    </div>
  );
}
