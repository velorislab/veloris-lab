import Image from "next/image";

import { Marquee, MarqueeColumn } from "@/components/ui/Marquee";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { testimonials, type Testimonial } from "@/data/home";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative flex w-full flex-col gap-5 overflow-hidden rounded-panel border border-line p-6 shadow-[var(--shadow-ring)]">
      <Image
        src="/images/illustrations/testimonial-card-bg.png"
        alt=""
        fill
        sizes="386px"
        className="rounded-panel object-cover"
      />
      <Image
        src="/images/icons/stars-5.svg"
        alt="Five out of five"
        width={108}
        height={20}
        className="relative h-5 w-[108px]"
      />
      <blockquote className="relative text-[16px] leading-6 text-ink-400 tablet:text-[17px] tablet:leading-[25.5px]">
        {item.quote}
      </blockquote>
      <figcaption className="relative flex items-center gap-3">
        <Image
          src={item.avatar}
          alt=""
          width={55}
          height={55}
          className="size-[55px] rounded-pill object-cover"
        />
        <span className="flex flex-col">
          <span className="font-display text-[18px] leading-[27px] text-ink-700">
            {item.name}
          </span>
          <span className="text-[16px] leading-6 text-ink-300">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * "Hear from Our Users" — three vertically scrolling columns.
 * The middle column travels the opposite way, as in the source.
 */
export function Testimonials() {
  const columns = [
    testimonials.items.filter((_, index) => index % 3 === 0),
    testimonials.items.filter((_, index) => index % 3 === 1),
    testimonials.items.filter((_, index) => index % 3 === 2),
  ];

  return (
    <section
      id="testimonial"
      className="section-shell gap-[10px] pt-20 desktop:pt-[150px]"
    >
      <div className="relative flex w-full flex-col items-center gap-4">
        {/* Heart-shaped backdrop with the Aston glyph, sitting above the badge. */}
        {/* Positioned, so it must be pushed behind the static heading —
            otherwise it paints over it and punches a hole in the text. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[220px] left-1/2 -z-10 hidden size-[336px] -translate-x-1/2 desktop:block"
        >
          <Image
            src="/images/backgrounds/testimonial-heart.svg"
            alt=""
            fill
            sizes="336px"
            className="rounded-[5px] object-cover"
          />

          {/* Two 131×58 avatar tickers slide past behind the glyph — the right
              one travelling right, the left one left, both at 30 px/s. The
              badge sits on top, so only their outer edges stay visible. */}
          <div className="absolute top-[118px] left-[166px] z-[1] h-[58px] w-[131px]">
            <Marquee speed={30} direction="right" gap={14}>
              {testimonials.avatarStrip.slice(0, 4).map((avatar) => (
                <Image
                  key={avatar}
                  src={avatar}
                  alt=""
                  width={54}
                  height={54}
                  className="size-[54px] shrink-0 rounded-pill object-cover"
                />
              ))}
            </Marquee>
          </div>
          <div className="absolute top-[118px] left-[39px] z-[1] h-[58px] w-[131px]">
            <Marquee speed={30} direction="left" gap={14}>
              {testimonials.avatarStrip.slice(4, 8).map((avatar) => (
                <Image
                  key={avatar}
                  src={avatar}
                  alt=""
                  width={54}
                  height={54}
                  className="size-[54px] shrink-0 rounded-pill object-cover"
                />
              ))}
            </Marquee>
          </div>

          <div className="absolute top-[93px] left-1/2 z-[1] flex size-[112px] -translate-x-1/2 items-center rounded-pill bg-[rgba(102,163,255,0.2)] p-[14px]">
            <div className="relative flex size-[84px] items-center justify-center overflow-hidden rounded-pill p-[18px] shadow-[0_7px_9.3px_0_rgba(131,124,124,0.06),inset_0_2.3px_2.3px_0_#81b1fb,inset_2.3px_0_2.3px_0_#81b1fb]">
              <Image
                src="/images/backgrounds/testimonial-logo-plate.svg"
                alt=""
                fill
                sizes="84px"
                className="rounded-pill object-cover"
              />
              <Image
                src="/images/logos/aston-mark-testimonial.svg"
                alt=""
                width={47}
                height={47}
                className="relative size-[47px]"
              />
            </div>
          </div>
        </div>

        <SectionBadge {...testimonials.badge} />
        <div className="flex w-full max-w-[700px] flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
            {testimonials.title}
          </h2>
          <p className="max-w-[540px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]">
            {testimonials.description}
          </p>
        </div>
      </div>

      <div className="flex h-[866px] w-full items-start justify-end gap-5">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`h-full flex-1 ${index === 2 ? "hidden desktop:block" : ""} ${
              index === 1 ? "hidden tablet:block" : ""
            }`}
          >
            <MarqueeColumn
              gap={27}
              speed={30}
              direction={index === 1 ? "down" : "up"}
            >
              {column.map((item) => (
                <TestimonialCard key={item.name} item={item} />
              ))}
            </MarqueeColumn>
          </div>
        ))}
      </div>
    </section>
  );
}
