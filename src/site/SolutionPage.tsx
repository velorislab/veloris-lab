import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Estimate } from '@/components/sections/Estimate'

import { SOLUTIONS, solutionQuote, type Solution } from './solutions'
import { SEPARATE_LABEL, UI, CALC, tx, type LabLang } from './labData'
import { WORK_TYPES, money } from './labPricing'
import { solutionPath, solutionsPath, pricingPath, stackPath } from './routing'

/* =============================================================================
   One solution page.

   THE ORDER IS THE ARGUMENT, AND THE TENSE IS THE POINT. What it is and what it
   costs, who it suits, what is in the first version, how the path through it
   goes, what has to be got right, what to measure, the pass-through costs, the
   questions. That order works because it answers a reader's questions in the
   order they occur to them.

   What is NOT borrowed is any suggestion that these have been built for a named
   client. Every sentence on this page is present tense about a thing we build.
   The proof of work is the case cards and the case pages under them, which stay
   answerable to a repository. Mixing the two would turn a truthful offer page
   into a fabricated credential, which is the one thing on a site like this that
   a buyer checks first.

   NO FIGURE IS TYPED. The price, the window and the support all come from the
   work type this solution sits on, so a solution can never quote a number the
   price table does not hold.

   -----------------------------------------------------------------------------
   THIS PAGE IS READ, NOT SCANNED, AND IT USED TO BE BUILT AS IF IT WERE SOLD.

   Measured on the rendered page before this rewrite: five different container
   treatments across nine content sections (a 100px pill, a 20px panel, a 16px
   tinted card, a 16px white card with a shadow, and a bare rule), nine centred
   headings, three h2 sizes, two h3 sizes, seven paragraph sizes and five section
   gaps. Nothing there was wrong on its own and the whole was a jumble: a reader
   met a new visual grammar every time they scrolled, and had to work out afresh
   what kind of thing they were looking at.

   THREE ROLES NOW, AND EACH MEANS SOMETHING.

     row    a hairline above, no fill, no radius, no shadow. Everything read
            downwards: what decides it works, what to measure, the pass-through
            costs, the questions.
     card   a surface with a hairline ring. Only where items are genuinely
            compared side by side: the three steps of the path, and the
            neighbours at the end.
     chip   a pill. A token rather than a container: what is in the first
            version, and the names of tools.

   ONE COLUMN AND ONE SCALE. Everything sits in `read-col` at a reading measure
   and is left-aligned; the hero is the only centred thing on the page, because
   it is the only part that is selling rather than explaining. Headings are one
   size, and the rhythm is three intervals: 12 inside an item, 24 inside a group,
   40 between sections, with more space above a heading than below it.

   TWO THINGS WERE DELETED RATHER THAN RESTYLED. The English kicker over the h1
   went: DESIGN.md already records why the section badges went the same way, and
   a heading that needs a label saying what it is about is doing half its job.
   The 01-04 numbers over the metrics went too, because four things to measure
   are not a sequence. The three steps of the path keep theirs, because there the
   order IS the information.
   ========================================================================== */

/** A hairline row. The page's default container, and it is not a card. */
function Row({ children }: { children: React.ReactNode }) {
  return <li className="flex flex-col gap-3 border-t border-line pt-5">{children}</li>
}

/** A section: heading, optional standfirst, then content. One rhythm for all. */
function Sec({
  title, sub, children, wide = false,
}: { title: string; sub?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="section-shell gap-6">
      <div className={`${wide ? 'w-full max-w-[1180px]' : 'read-col'} flex flex-col gap-6`}>
        <div className="flex flex-col gap-3">
          <h2 className="text-[26px] leading-[1.2] text-ink-900 tablet:text-[30px]">{title}</h2>
          {sub && <p className="text-[16px] leading-[26px] text-ink-300">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default function SolutionPage({ lang, page }: { lang: LabLang; page: Solution }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang)
  const work = WORK_TYPES.find((w) => w.key === page.base)

  /* Three others, and «near» has to mean something now that the catalogue is
     large. Same kind of work first, because that is what a reader who did not
     find their scenario here is actually looking for, then the list order to
     fill the row. Never itself, and never a duplicate. */
  const near = [
    ...SOLUTIONS.filter((s) => s.slug !== page.slug && s.base === page.base),
    ...SOLUTIONS.filter((s) => s.slug !== page.slug && s.base !== page.base),
  ].slice(0, 3)

  /* THE QUOTE, NOT THE FLOOR. `solutionQuote` runs the calculator's own
     `estimate()`, so a scenario that declares add-ons shows what it actually
     costs rather than the bare floor of its work type, and its window stretches
     the same way the calculator would stretch it. */
  const quote = solutionQuote(page)
  const facts = [
    { k: L(CALC.resultLbl), v: `${L(CALC.bfFrom)} ${money(quote.total)}` },
    { k: L(CALC.termLbl), v: `${quote.weeks[0]}–${quote.weeks[1]} ${L(CALC.weeksShort)}` },
    /* `quote.support` has already been through `monthly()` inside `estimate()`.
       Passing it through again would apply SCALE twice. */
    { k: L(CALC.supportLbl), v: `${L(CALC.bfFrom)} ${money(quote.support)}${L(CALC.perMonth)}` },
  ]

  return (
    <>
      <Header lang={lang} />
      <main id="main-content" className="page-main">
        {/* ------------------------------------------------------------ head */}
        {/* The one centred thing on the page. */}
        <section className="section-shell gap-8 pt-10 tablet:pt-4">
          <div className="flex w-full max-w-[900px] flex-col items-center gap-5 text-center">
            <h1 className="text-[34px] leading-[1.15] font-semibold text-ink-900 tablet:text-[44px] desktop:text-[56px] desktop:leading-[1.15]">
              {L(page.title)}
            </h1>
            <p className="max-w-[760px] text-[17px] leading-[28px] text-ink-400 tablet:text-[19px] tablet:leading-[30px]">
              {L(page.lead)}
            </p>
          </div>

          <ul className="flex w-full max-w-[760px] flex-col items-stretch gap-3 tablet:flex-row tablet:gap-0">
            {facts.map((f, n) => (
              <li
                key={f.k}
                className={
                  'flex flex-1 flex-col items-center gap-1 text-center tablet:px-6 ' +
                  (n > 0 ? 'tablet:border-l tablet:border-line-soft' : '')
                }
              >
                <span className="text-[13px] leading-5 text-ink-200">{f.k}</span>
                <span className="font-display text-[20px] leading-8 font-semibold text-ink-900 tablet:text-[22px]">
                  {f.v}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="#estimate" className="h-[54px] px-6 text-[16px]">
              {L(UI.ctaCalc)}
            </Button>
            <Button href={pricingPath(lang)} variant="muted" className="h-[54px] px-6 text-[16px]">
              {L(UI.priceList)}
            </Button>
          </div>

          <p className="max-w-[760px] text-center text-[16px] leading-[26px] text-ink-300">
            <span className="font-medium text-ink-700">{L(UI.solutionFor)}</span>{' '}
            {L(page.audience)}
          </p>
        </section>

        {/* ---------------------------------------------------- composition */}
        <Sec title={L(UI.solutionComposition)}>
          <ul className="flex flex-wrap gap-[10px]">
            {page.composition.map((c) => (
              <li
                key={L(c)}
                className="rounded-pill bg-surface px-4 py-2 text-[15px] leading-6 text-ink-600 shadow-[0_0_0_1px_var(--color-line-soft)]"
              >
                {L(c)}
              </li>
            ))}
          </ul>
          {/* Says out loud that the figures above are the package this sits on,
              which is the sentence that keeps a solution page from reading as a
              second, competing price list. */}
          {work && (
            <p className="text-[15px] leading-[24px] text-ink-300">
              {L(UI.solutionBase)} <span className="text-ink-700">{L(work.label)}</span>.{' '}
              {L(UI.solutionBaseTail)}
            </p>
          )}
        </Sec>

        {/* ----------------------------------------------------------- flow */}
        {/* A card, because the three are compared against each other and the
            order between them is the information. */}
        <Sec title={L(UI.solutionFlow)}>
          <ol className="grid grid-cols-1 gap-[14px] tablet:grid-cols-3">
            {page.flow.map((f, n) => (
              <li
                key={L(f.t)}
                className="flex flex-col gap-3 rounded-card bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft)]"
              >
                <span className="font-numeric text-[13px] font-medium tracking-[0.08em] text-accent">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[18px] leading-7 text-ink-900">{L(f.t)}</h3>
                <p className="text-[16px] leading-[26px] text-ink-300">{L(f.d)}</p>
              </li>
            ))}
          </ol>
        </Sec>

        {/* ---------------------------------------------------------- watch */}
        {/* The best thinking on the page, so it gets the full measure and no
            container: three columns of it were three narrow gutters of prose. */}
        <Sec title={L(UI.solutionWatch)}>
          <ul className="flex flex-col gap-6">
            {page.watch.map((w) => (
              <Row key={L(w.t)}>
                <h3 className="text-[18px] leading-7 text-ink-900">{L(w.t)}</h3>
                <p className="text-[16px] leading-[26px] text-ink-300">{L(w.d)}</p>
              </Row>
            ))}
          </ul>
        </Sec>

        {/* -------------------------------------------------------- metrics */}
        <Sec title={L(UI.solutionMetrics)}>
          <ul className="grid grid-cols-1 gap-x-[30px] gap-y-4 tablet:grid-cols-2">
            {page.metrics.map((m) => (
              <li key={L(m)} className="border-t border-line pt-3 text-[16px] leading-[26px] text-ink-500">
                {L(m)}
              </li>
            ))}
          </ul>
        </Sec>

        {/* ----------------------------------------------------------- fast */}
        <Sec title={L(UI.solutionFast)}>
          <p className="text-[16px] leading-[26px] text-ink-400">{L(UI.solutionFastBody)}</p>
        </Sec>

        {/* ---------------------------------------------------------- stack */}
        {/* Rows, not cards. A group is a label and its tools, which is a
            definition list, and three of them boxed side by side was a third
            card treatment doing the work a rule does. */}
        <Sec title={L(UI.solutionStack)} sub={L(UI.solutionStackSub)}>
          <ul className="flex flex-col gap-5">
            {page.stack.map((g) => (
              <li key={L(g.t)} className="flex flex-col gap-3 border-t border-line pt-4 tablet:flex-row tablet:gap-8">
                <span className="text-[13px] leading-6 text-ink-200 tablet:w-[180px] tablet:shrink-0">
                  {L(g.t)}
                </span>
                <span className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="rounded-pill bg-surface-muted px-3 py-1 text-[14px] leading-6 text-ink-500">
                      {t}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          {/* THE CLICK THIS SECTION HAS BEEN OWED. Its whole premise is that the
              stack is chosen against the task, which is only credible if there
              is somewhere showing what it is chosen from. */}
          <Link
            href={stackPath(lang)}
            className="-my-2 self-start py-2 text-[15px] leading-6 text-accent underline-offset-4 hover:underline"
          >
            {L(UI.stackSeeAll)}
          </Link>
        </Sec>

        {/* ------------------------------------------------------ estimator */}
        <Estimate lang={lang} seedType={page.base} compact />

        {/* -------------------------------------------------- paid separately */}
        {/* PER SCENARIO, not the shared list. What a provider bills directly is
            not the same set for an assistant that calls a model and a booking
            page that sends an SMS, and the shared block said «AI API» on pages
            that never touch one. The heading stays shared because the argument
            is: we resell no capacity, so we earn nothing on any of these. */}
        <Sec title={L(SEPARATE_LABEL)}>
          <ul className="grid grid-cols-1 gap-x-[30px] gap-y-4 tablet:grid-cols-2">
            {page.notIncluded.map((x, n) => (
              <li key={n} className="border-t border-line pt-3 text-[16px] leading-[26px] text-ink-400">
                {L(x)}
              </li>
            ))}
          </ul>
        </Sec>

        {/* ------------------------------------------------------------ faq */}
        {page.faq.length > 0 && (
          <Sec title={L(UI.solutionFaq)}>
            <dl className="flex flex-col gap-6">
              {page.faq.map((f) => (
                <div key={L(f.q)} className="flex flex-col gap-3 border-t border-line pt-5">
                  <dt className="text-[18px] leading-7 text-ink-900">{L(f.q)}</dt>
                  <dd className="text-[16px] leading-[26px] text-ink-300">{L(f.a)}</dd>
                </div>
              ))}
            </dl>
          </Sec>
        )}

        {/* ---------------------------------------------------- start again */}
        {/* THE FIGURE, REPEATED, AND THAT IS THE POINT. A reader who has come
            this far met the price in the hero and has since read nine sections;
            asking them to scroll back up to remember it is how a page loses the
            person it just convinced. Same three facts, same source, one line. */}
        <section className="section-shell gap-5">
          <div className="read-col flex flex-col items-center gap-5 rounded-panel bg-surface-tint px-6 py-7 text-center">
            <span className="text-[13px] leading-5 text-ink-300">{L(UI.solutionStart)}</span>
            <ul className="flex w-full flex-col items-stretch gap-3 tablet:flex-row tablet:gap-0">
              {facts.map((f, n) => (
                <li
                  key={f.k}
                  className={
                    'flex flex-1 flex-col items-center gap-1 text-center tablet:px-5 ' +
                    (n > 0 ? 'tablet:border-l tablet:border-line-soft' : '')
                  }
                >
                  <span className="text-[13px] leading-5 text-ink-300">{f.k}</span>
                  <span className="font-display text-[20px] leading-8 font-semibold text-ink-900">
                    {f.v}
                  </span>
                </li>
              ))}
            </ul>
            <Button href="#estimate" className="h-[50px] px-6 text-[16px]">
              {L(UI.ctaCalc)}
            </Button>
          </div>
        </section>

        {/* --------------------------------------------------------- nearby */}
        <Sec title={L(UI.solutionNear)}>
          <ul className="grid grid-cols-1 gap-[14px] tablet:grid-cols-3">
            {near.map((s) => (
              <li key={s.slug}>
                <Link
                  href={solutionPath(lang, s.slug)}
                  className="flex h-full flex-col gap-2 rounded-card bg-surface p-5 shadow-[0_0_0_1px_var(--color-line-soft)] transition-colors duration-200 hover:bg-surface-muted"
                >
                  <span className="text-[17px] leading-7 text-ink-900">{L(s.title)}</span>
                  <span className="mt-auto pt-2 font-display text-[16px] text-ink-600">
                    {L(CALC.bfFrom)} {money(solutionQuote(s).total)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={solutionsPath(lang)}
            className="-my-2 self-start py-2 text-[15px] leading-6 text-accent underline-offset-4 hover:underline"
          >
            {L(UI.solutionAll)}
          </Link>
        </Sec>
      </main>
      <Footer lang={lang} />
    </>
  )
}
