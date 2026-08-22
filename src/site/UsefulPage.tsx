import Image from 'next/image'

import staticImageLoader from '../../image-loader'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

import { USEFUL, USEFUL_GROUPS } from './useful'
import { UI, tx, type LabLang } from './labData'

/* =============================================================================
   Useful things.

   A LINK LIST IS WORTHLESS AND THIS IS NOT ONE, which is the whole design of the
   page. Anybody can paste forty URLs. What takes an afternoon and is what a
   reader actually wants is the line under each one saying what it charges, and
   the line after that saying what the condition is. Both of those are on every
   card here, and neither was copied from anywhere: each site was opened and read.

   THE CARDS ARE CARDS, and that is not a contradiction of the solution pages
   going the other way. A directory is a set of genuinely comparable items that a
   reader scans across rather than reads down, which is the one shape a card is
   for. The grammar is otherwise the site's: one heading size, left-aligned, the
   same hairline ring, and no shadow.

   THE ICON IS THE SITE'S OWN MARK, copied into `public/images/useful` once. It
   is doing a real job rather than decorating: in a grid of nine, the mark is
   what a reader recognises before they have read a word, and a directory without
   marks is a wall of identical rectangles.
   ========================================================================== */

export default function UsefulPage({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        <section className="section-shell gap-8 pt-10 tablet:pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-5 text-center">
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(UI.usefulLabel)}
            </h1>
            <p className="max-w-[820px] text-[17px] leading-[28px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(UI.usefulSub)}
            </p>
          </div>
        </section>

        {USEFUL_GROUPS.map((g) => {
          const inGroup = USEFUL.filter((t) => t.group === g.key)
          if (inGroup.length === 0) return null
          return (
            <section key={g.key} className="section-shell gap-6">
              <div className="flex w-full max-w-[1180px] flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">
                    {L(g.title)}
                  </h2>
                  <p className="max-w-[780px] text-[16px] leading-[26px] text-ink-300">{L(g.lead)}</p>
                </div>

                <ul className="grid grid-cols-1 gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3">
                  {inGroup.map((t) => (
                    <li key={t.key} className="h-full">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col gap-4 rounded-card bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                      >
                        {/* Mark, name, and the price in the corner. The price is
                            the first thing scanned and the last thing that needs
                            a heading over it: four words up here let a reader
                            compare a whole grid without reading one card.

                            THE ROW WRAPS, AND THE NAME HAS A FLOOR. It did not,
                            and the price is not always four words: fifteen of
                            the sixty-four entries carry a whole clause there
                            («бесплатно, нарушает условия провайдера» is 291px
                            of a 303px row on a phone). The pill was `shrink-0`
                            and the name was `min-w-0`, so every one of those
                            fifteen names was squeezed to between 0 and 16px and
                            spelled itself down the card one letter per line.
                            Measured, not guessed: free-claude-code reported a
                            name box 0px wide. With `flex-wrap` and a 7rem floor
                            the short prices still sit in the corner where they
                            are meant to be scanned, and a long one drops to its
                            own line instead of taking the name's room. */}
                        <span className="flex flex-wrap items-start gap-x-3 gap-y-2">
                          {/* Unoptimised: these are small third-party marks in
                              mixed formats — nineteen .ico and ten .svg of the
                              sixty-four — and the default optimiser refuses SVG
                              without `dangerouslyAllowSVG`, which is not a flag
                              to turn on for files fetched from other people's
                              domains.

                              AND THAT IS WHY THE PATH GOES THROUGH THE LOADER BY
                              HAND. `unoptimized` bypasses the loader, and the
                              loader is the one thing that prepends `basePath` —
                              which is the exact bug `image-loader.ts` was written
                              to fix and whose comment says so in the first
                              paragraph. Set per image rather than in the config,
                              it reintroduced it: every one of these sixty-four
                              marks asked for `/images/useful/...` and got a 404
                              from Pages, which serves this site from
                              `/veloris-lab`. Verified on the deployed page, not
                              inferred — `naturalWidth` was 0 and the same path
                              with the prefix answered 200.

                              Calling the loader as a function keeps the rule in
                              the one file that owns it. It is idempotent, so a
                              path that already carries the prefix is left
                              alone. */}
                          <Image
                            src={staticImageLoader({ src: t.icon, width: 28 })}
                            alt=""
                            width={28}
                            height={28}
                            unoptimized
                            className="mt-[2px] h-7 w-7 shrink-0 rounded-[6px] object-contain"
                          />
                          {/* The name alone. The domain used to sit under it and
                              was saying nothing the card did not: the whole card
                              is the link, and a reader who wants the address has
                              the status bar and the icon beside the name. */}
                          <span className="min-w-[7rem] flex-1 text-[17px] leading-7 text-ink-900">
                            {t.name}
                          </span>
                          <span className="ml-auto shrink-0 rounded-pill bg-surface-tint px-3 py-1 text-right font-numeric text-[13px] leading-5 text-ink-700">
                            {L(t.price)}
                          </span>
                        </span>

                        {/* One block of prose, always the same three sentences.
                            The labelled Cost and Worth-knowing blocks that used
                            to sit here made every card a small form to fill in
                            with the eye; the facts they carried are inside the
                            description now, which is where they read. */}
                        <span className="text-[15px] leading-[24px] text-ink-500">{L(t.what)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </main>
      <Footer lang={lang} />
    </>
  )
}
