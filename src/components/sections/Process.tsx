import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { process, type ProcessStep } from "@/data/home";

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <article className="relative flex flex-col items-end overflow-hidden rounded-[24px] p-[6px] shadow-[0_0_0_1px_var(--color-line),0_0_0_5px_#ffffff]">
      <Image
        src="/images/backgrounds/process-section.png"
        alt=""
        fill
        sizes="(min-width: 1320px) 388px, 100vw"
        className="rounded-[24px] object-fill"
      />

      {/* Artwork well: the phone is oversized and clipped by the well. */}
      <div className="relative aspect-[376/322] w-full overflow-hidden rounded-t-[24px] shadow-[inset_0_2px_0_0_#fff,inset_2px_0_0_0_#fff,inset_-2px_0_0_0_#fff]">
        <Image
          src="/images/backgrounds/process-dots.png"
          alt=""
          fill
          sizes="376px"
          className="object-cover"
        />
        <Image
          src="/images/backgrounds/process-light.png"
          alt=""
          fill
          sizes="376px"
          className="object-cover mix-blend-hard-light"
        />
        {/* Screenshot sits where the device screen does in the source — 240 of
            the well's 376 wide, 40px down. It is taller than the well, so the
            bottom is clipped. */}
        <div className="absolute top-[12.43%] left-1/2 aspect-[240/510.4] w-[63.83%] -translate-x-1/2 overflow-hidden rounded-panel">
          <Image
            src={step.screen}
            alt=""
            fill
            sizes="(min-width: 1320px) 240px, 40vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-3 rounded-b-panel bg-surface px-[30px] py-6 shadow-[0_2px_4px_0_rgba(178,180,187,0.2),0_-2px_6px_0_rgba(182,182,182,0.1)]">
        {/* Notches that tuck the panel under the artwork well. */}
        <Image
          src="/images/backgrounds/process-shape-left.svg"
          alt=""
          width={35}
          height={66}
          aria-hidden
          className="absolute -top-[66px] left-0"
        />
        <Image
          src="/images/backgrounds/process-shape-right.svg"
          alt=""
          width={35}
          height={66}
          aria-hidden
          className="absolute -top-[66px] right-0"
        />
        <span className="rounded-pill border border-line-soft px-[10px] py-[5px] text-[15px] leading-[22.5px] text-ink-500">
          {step.step}
        </span>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="font-display text-[20px] leading-[30px] text-ink-800 tablet:text-[22px] tablet:leading-[33px]">
            {step.title}
          </h3>
          <p className="text-[16px] leading-6 text-ink-300">{step.description}</p>
        </div>
      </div>
    </article>
  );
}

/** "Steps to Start" — three cards and a closing CTA. */
export function Process() {
  return (
    <section className="section-shell items-start gap-10 desktop:gap-[60px]">
      <div className="flex w-full flex-col items-center gap-4">
        <SectionBadge {...process.badge} />
        <h2 className="text-center text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {process.title}
        </h2>
      </div>

      <div className="flex w-full flex-col items-center gap-8 desktop:gap-[50px]">
        <div className="grid w-full grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
          {process.steps.map((step) => (
            <StepCard key={step.step} step={step} />
          ))}
        </div>
        <Button href={process.ctaHref}>{process.ctaLabel}</Button>
      </div>
    </section>
  );
}
