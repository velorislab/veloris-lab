import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome } from "@/data/content";
import type { LabLang } from "@/site/labData";

/**
 * "One person answers, not a department" — the photograph on the left, the
 * bureau and the man in it on the right, the checkable facts along the base.
 *
 * FOUR THINGS THE TEMPLATE HAD HERE ARE GONE.
 *
 *   The collage of three student cut-outs, and the testimonial ticker riding
 *   the base of the panel. Both are strangers, and the whole point of this
 *   section is that one named person answers for the work. A row of invented
 *   faces under a real one does not add proof, it removes it.
 *
 *   The Aston glyph badge that floated at the top of the panel: it is their
 *   mark, on their plate.
 *
 *   The panel's own background photograph, which the collage stood in front
 *   of. The panel now holds one image, and it is the founder.
 *
 * The three CountUp figures on the right are replaced by the facts table.
 * Two of the four values are phrases, not numbers, so they get rows rather
 * than the stat treatment; and none of the four should tick upward, because a
 * figure that animates while you read it is a figure nobody can check.
 */
export function About({ lang }: { lang: LabLang }) {
  const { about } = getHome(lang);

  return (
    <section
      id="about"
      className="section-shell flex-col items-center gap-10 desktop:flex-row desktop:gap-[60px]"
    >
      {/* The panel keeps the template's frame exactly: 510/569, 20px radius,
          6px white ring, soft drop. The source is square and the subject sits
          right of centre, so a centred cover crop keeps him whole. */}
      <div className="relative aspect-[510/569] w-full overflow-hidden rounded-panel shadow-[0_17px_24px_0_rgba(178,178,178,0.08),0_0_0_6px_#ffffff] desktop:max-w-[510px] desktop:flex-1">
        <Image
          src={about.photo}
          alt={about.photoAlt}
          fill
          quality={85}
          sizes="(min-width: 1320px) 510px, 100vw"
          className="rounded-panel object-cover"
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-start gap-8 desktop:gap-[50px]">
        <div className="flex w-full flex-col items-start gap-[30px]">
          <div className="flex w-full flex-col items-start gap-4">
            <SectionBadge {...about.badge} />
            <div className="flex flex-col items-start gap-[14px]">
              <h2 className="text-[32px] leading-[1.2] text-ink-900 tablet:text-[38px] desktop:text-[48px] desktop:leading-[57.6px]">
                {about.title}
              </h2>
              <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
                {about.description}
              </p>
            </div>
          </div>

          {/* Name, role, paragraph: the template's own person block, borrowed
              from the team card so the two treatments agree. The heading above
              says a person answers; this is the person. */}
          <div className="flex flex-col items-start gap-[14px]">
            <div className="flex flex-col items-start">
              <p className="font-display text-[18px] leading-[27px] text-ink-700">
                {about.name}
              </p>
              <p className="text-[16px] leading-6 text-ink-250">{about.role}</p>
            </div>
            <p className="text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
              {about.body}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-4">
            <Button href={about.primaryCta.href}>{about.primaryCta.label}</Button>
            <Button href={about.secondaryCta.href} variant="muted">
              {about.secondaryCta.label}
            </Button>
          </div>
        </div>

        {about.facts.length > 0 && (
          <dl className="grid w-full grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-8 tablet:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.k} className="flex flex-col items-start gap-1">
                <dt className="text-[15px] leading-[22.5px] text-ink-300">
                  {fact.k}
                </dt>
                <dd className="font-display text-[18px] leading-[27px] text-ink-800 desktop:text-[20px] desktop:leading-[30px]">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
