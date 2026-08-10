import Link from "next/link";

import { SectionBadge } from "@/components/ui/SectionBadge";
import { getHome } from "@/data/content";
import { type LabLang } from "@/site/labData";

/**
 * The cases, on the home page, as cards with figures on them.
 *
 * WHAT WAS HERE BEFORE: the number four. The home page carried a heading saying
 * we had done this before, three counters under it, and then moved straight on
 * to the service list. Four real projects with a task, a solution, a result, a
 * status and a set of links sat in `CASES` and reached the reader only as the
 * digit in «4 живых кейса». Proof was the one thing the page had and the one
 * thing it did not show.
 *
 * A competitor opens their home on fourteen of these directly under the hero,
 * and that placement is right for a reason that has nothing to do with taste: a
 * stranger deciding whether to keep reading is asking whether this is real, and
 * a case card answers that question in the time it takes to glance at it. So the
 * cards go here, immediately after the figures panel, before the service list.
 *
 * WHAT EACH CARD CARRIES, and every part of it was already written:
 *   the two lead tags     from `tags`, as the domain marker their cards use
 *   the title and a line  `title` and `sub`
 *   the result           `res`, which is the sentence that actually sells
 *   two labelled facts   the status, and the kind of work it sits under
 *   the links            `links`, the case page and anything public
 *
 * The result line is the one given the most room. It is the only sentence on the
 * card that says what came of the work rather than what the work was.
 */
export function Cases({ lang }: { lang: LabLang }) {
  const { cases } = getHome(lang);
  if (cases.items.length === 0) return null;

  return (
    <section id="cases" className="section-shell scroll-mt-[110px] gap-10 desktop:gap-[60px]">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <SectionBadge {...cases.badge} />
        <h2 className="max-w-[900px] text-[32px] leading-[1.2] text-ink-900 tablet:text-[42px] desktop:text-[56px] desktop:leading-[72.8px]">
          {cases.title}
        </h2>
        <p className="max-w-[760px] text-[16px] leading-6 text-ink-300 tablet:text-[18px] tablet:leading-[27px]">
          {cases.description}
        </p>
      </div>

      <ul className="grid w-full grid-cols-1 gap-[14px] tablet:grid-cols-2">
        {cases.items.map((c) => (
          <li
            key={c.slug}
            className="flex flex-col gap-4 rounded-panel bg-surface p-6 shadow-[0_0_0_1px_var(--color-line-soft),0_2px_6px_0_rgba(182,182,182,0.1)] tablet:p-7"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[12px] font-medium tracking-[0.08em] text-ink-200 uppercase">
                {c.marker}
              </span>
              {/* The status is a fact, not a badge for decoration: this list
                  deliberately mixes shipped work with work still being built,
                  and the heading must not be left to imply otherwise. */}
              <span
                className={
                  "rounded-pill px-[10px] py-[3px] text-[12px] leading-5 " +
                  (c.live
                    ? "bg-accent/10 text-accent"
                    : "bg-surface-muted text-ink-300")
                }
              >
                {c.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] leading-8 text-ink-900 tablet:text-[24px] tablet:leading-9">
                {c.title}
              </h3>
              <p className="text-[15px] leading-[22px] text-ink-300">{c.sub}</p>
            </div>

            {/* The result, given its own plate and the most room on the card,
                because it is the only line here that says what came of the work
                rather than what the work was. */}
            <p className="rounded-card bg-surface-tint px-4 py-3 text-[16px] leading-6 text-ink-700">
              {c.result}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              <Link
                href={c.href}
                className="text-[15px] leading-6 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                {c.readLabel}
              </Link>
              {c.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] leading-6 text-ink-300 underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-ink-800"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
