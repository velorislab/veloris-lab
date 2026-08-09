"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { hero } from "@/data/home";
import { heroVariants, transitions, widgetColumnVariants } from "@/lib/motion";

/** One floating artwork tile in the hero's side columns. */
function Widget({
  src,
  w,
  h,
  top,
  left,
  rotate,
  radius,
  shadow,
}: {
  src: string;
  w: number;
  h: number;
  top: number;
  left: number;
  rotate: number;
  radius: number;
  shadow: string;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        width: w,
        height: h,
        top,
        left,
        borderRadius: radius,
        transform: `rotate(${rotate}deg)`,
        boxShadow: shadow,
      }}
    >
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        className="size-full object-cover"
        style={{ borderRadius: radius }}
      />
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  // Framer animates these once on load; with reduced motion we render the
  // resolved state directly rather than a shortened animation.
  const animate = reduceMotion ? undefined : "visible";
  const initial = reduceMotion ? "visible" : "hidden";

  // The widget columns slide a shorter distance on tablet (±111px vs ±201px),
  // matching the project's per-breakpoint override.
  const [widgetTravel, setWidgetTravel] = useState(201);
  useEffect(() => {
    setWidgetTravel(window.matchMedia("(min-width: 1320px)").matches ? 201 : 111);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex w-full flex-col items-center gap-[50px] overflow-hidden px-4 pt-[160px] pb-[10px] tablet:gap-[70px] tablet:px-10 desktop:gap-[90px] desktop:px-0"
    >
      {/* -------------------------------------------------- decorative layer */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[725px]">
        <motion.div
          variants={heroVariants.lightRayLeft}
          initial={initial}
          animate={animate}
          transition={transitions.lightRay}
          className="absolute top-0 left-0 h-[462px] w-[345px] desktop:h-[725px] desktop:w-[541px]"
        >
          <Image
            src="/images/backgrounds/hero-light-ray-left.jpg"
            alt=""
            fill
            sizes="(min-width: 1320px) 541px, 345px"
            className="object-contain"
            priority
          />
        </motion.div>
        <motion.div
          variants={heroVariants.lightRayRight}
          initial={initial}
          animate={animate}
          transition={transitions.lightRay}
          className="absolute top-0 right-0 h-[462px] w-[345px] desktop:h-[725px] desktop:w-[541px]"
        >
          <Image
            src="/images/backgrounds/hero-light-ray-right.jpg"
            alt=""
            fill
            sizes="(min-width: 1320px) 541px, 345px"
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Widget columns are hidden on phone, matching the Framer variants. */}
        <motion.div
          variants={widgetColumnVariants("left", widgetTravel)}
          initial={initial}
          animate={animate}
          transition={transitions.widgetColumn}
          className="absolute top-0 -left-[90px] hidden h-[725px] w-[217px] tablet:block desktop:left-0"
        >
          {hero.widgets.left.map((widget) => (
            <Widget key={widget.src} {...widget} shadow="var(--shadow-widget)" />
          ))}
          <div className="absolute inset-x-0 top-[300px] h-[345px] bg-linear-to-b from-transparent to-page" />
        </motion.div>

        <motion.div
          variants={widgetColumnVariants("right", widgetTravel)}
          initial={initial}
          animate={animate}
          transition={transitions.widgetColumn}
          className="absolute top-0 -right-[90px] hidden h-[725px] w-[201px] tablet:block desktop:right-0"
        >
          {hero.widgets.right.map((widget) => (
            <Widget key={widget.src} {...widget} shadow="var(--shadow-widget-alt)" />
          ))}
          <div className="absolute top-[300px] right-[-16px] left-0 h-[345px] bg-linear-to-b from-transparent to-page" />
        </motion.div>
      </div>

      {/* ------------------------------------------------------------ content */}
      <div className="relative flex w-full max-w-[1101px] flex-col items-center gap-[50px]">
        <div className="relative flex w-full flex-col items-center gap-10 desktop:px-20">
          <motion.div
            aria-hidden
            variants={heroVariants.riseIn}
            initial={initial}
            animate={animate}
            transition={transitions.grid}
            className="pointer-events-none absolute top-[256px] left-1/2 z-0 h-[85px] w-[549px] -translate-x-1/2 tablet:h-[223px] tablet:w-[1441px]"
          >
            <Image
              src="/images/backgrounds/hero-grid.svg"
              alt=""
              fill
              sizes="(min-width: 810px) 1441px, 549px"
              className="object-cover"
            />
          </motion.div>

          <div className="relative flex w-full max-w-[941px] flex-col items-center gap-4">
            <motion.div
              variants={heroVariants.badge}
              initial={initial}
              animate={animate}
              transition={transitions.badge}
              className="flex items-center gap-[6px] overflow-hidden rounded-pill bg-surface py-2 pr-[14px] pl-2 shadow-[var(--shadow-badge)]"
            >
              <span className="relative flex h-[26px] w-[60px] shrink-0">
                {hero.badge.avatars.map((avatar, index) => (
                  <Image
                    key={avatar}
                    src={avatar}
                    alt=""
                    width={26}
                    height={26}
                    className="absolute top-0 size-[26px] rounded-pill shadow-[0_0_0_2px_#ffffff]"
                    style={{ left: index * 15 }}
                  />
                ))}
              </span>
              <span className="text-[16px] leading-6 text-ink-600">
                {hero.badge.text}
              </span>
            </motion.div>

            <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
              <motion.h1
                variants={heroVariants.heading}
                initial={initial}
                animate={animate}
                transition={transitions.heading}
                className="text-[36px] leading-[1.2] font-semibold text-ink-800 tablet:text-[48px] desktop:text-[64px] desktop:leading-[76.8px]"
              >
                {hero.title}
              </motion.h1>
              <motion.p
                variants={heroVariants.riseIn}
                initial={initial}
                animate={animate}
                transition={transitions.paragraph}
                className="max-w-[581px] text-[16px] leading-6 text-ink-400 tablet:text-[18px] tablet:leading-[27px]"
              >
                {hero.description}
              </motion.p>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-4">
            <motion.div
              variants={heroVariants.riseIn}
              initial={initial}
              animate={animate}
              transition={transitions.button}
            >
              <Button
                href={siteConfig.heroCta.href}
                className="h-[58px] px-6 py-4 text-[17px] leading-[25.5px]"
              >
                {siteConfig.heroCta.label}
              </Button>
            </motion.div>
            <motion.div
              variants={heroVariants.riseIn}
              initial={initial}
              animate={animate}
              transition={transitions.note}
              className="flex items-center justify-center gap-1"
            >
              <Image
                src="/images/icons/figma.svg"
                alt=""
                width={18}
                height={18}
                className="size-[18px]"
              />
              <span className="text-[16px] leading-6 text-ink-250">{hero.note}</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={heroVariants.visual}
          initial={initial}
          animate={animate}
          transition={transitions.visual}
          className="relative w-full"
        >
          <div className="relative w-full overflow-hidden rounded-panel border border-white shadow-[var(--shadow-ring-6)]">
            <Image
              src={hero.visual}
              alt="The Aston learning dashboard"
              width={1101}
              height={578}
              priority
              sizes="(min-width: 1320px) 1101px, (min-width: 810px) 740px, 100vw"
              className="h-auto w-full object-cover"
            />
            <span className="absolute top-1/2 left-1/2 flex size-[47px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Image
                src="/images/icons/play-button.svg"
                alt=""
                width={47}
                height={47}
              />
            </span>
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------- trust + ratings */}
      <div className="relative flex w-full max-w-[1101px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-[30px]">
          <p className="text-center text-[16px] leading-6 text-ink-600 tablet:text-[18px] tablet:leading-[27px]">
            {hero.trustedText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-[14px]">
            {hero.logos.map((logo, index) => (
              <div key={logo} className="flex items-center gap-[14px]">
                {index > 0 && <div aria-hidden className="h-6 w-px bg-line" />}
                <Image
                  src={logo}
                  alt=""
                  width={126}
                  height={42}
                  className="h-[42px] w-[126px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden className="h-px w-[470px] max-w-full bg-line" />

        <div className="flex flex-col items-center gap-6 tablet:flex-row tablet:gap-[50px]">
          {hero.ratings.map((rating, index) => (
            <div key={rating.label} className="flex items-center gap-[50px]">
              {index > 0 && (
                <div aria-hidden className="hidden h-[50px] w-px bg-line tablet:block" />
              )}
              <a
                href={rating.href}
                target="_blank"
                rel="noreferrer noopener"
                /* 229px is the source width; pinning it keeps the pair centred
                   identically regardless of numeral metrics. */
                className="flex items-center gap-[10px] overflow-hidden rounded-card border border-line bg-surface-muted py-[10px] pr-5 pl-[10px] shadow-[var(--shadow-ring)] transition-colors duration-200 hover:bg-surface-subtle desktop:w-[229px]"
              >
                <span className="flex size-[58px] items-center justify-center rounded-[12px] border border-line-soft bg-surface p-[14px]">
                  <Image src={rating.icon} alt="" width={30} height={30} />
                </span>
                <span className="flex flex-col items-start gap-1">
                  <span className="flex items-center gap-2 rounded-pill bg-line-soft py-[2px] pr-3 pl-[2px]">
                    <span className="flex items-center gap-[2px] rounded-[100px_6px_6px_100px] bg-surface px-[6px] py-[2px]">
                      <Image
                        src="/images/icons/star.svg"
                        alt=""
                        width={15}
                        height={14}
                      />
                      <span className="font-numeric text-[15px] leading-[22.5px] font-semibold text-ink-600">
                        {rating.score}
                      </span>
                    </span>
                    <span className="font-numeric text-[15px] leading-[22.5px] font-semibold text-ink-250">
                      {rating.count}
                    </span>
                  </span>
                  <span className="text-[15px] leading-[22.5px] text-ink-400">
                    {rating.label}
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
