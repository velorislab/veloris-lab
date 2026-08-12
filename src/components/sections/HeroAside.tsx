import { HERO_ASIDE, tx, type LabLang } from "@/site/labData";

/* =============================================================================
   The four artefacts leaning into the first screen from its edges.

   THE TEMPLATE PUT ITS OWN PRODUCT HERE and the raster never came across, so
   these are drawn: a bot thread, a metric card, a deal row and a run
   notification. They are what the work this studio sells looks like on a screen,
   which is the one thing the fold could not otherwise show.

   THE GUTTER IS NARROWER THAN IT LOOKS, and that decides the whole layout.
   Measured on the rendered page: the copy column is 1101px, so a 1440 viewport
   leaves 162px each side and the 1320 breakpoint leaves 102px. Nothing fits
   whole. Every card is therefore anchored to the viewport edge with a negative
   offset and runs off it, exactly as the reference does: what the reader sees is
   a fragment, and the fragment is the point. The hero already clips at
   `overflow-hidden`, so the bleed costs nothing.

   OUT OF FLOW AND OUT OF THE WAY. `absolute inset-0` sets no height, so the
   "hero is exactly one viewport" rule is untouched. `pointer-events-none` keeps
   the cards from eating a click meant for the page, and `aria-hidden` keeps four
   fake interfaces out of the accessibility tree, where they would read as a
   wall of nouns between the headline and the buttons.

   DESKTOP ONLY. Below 1320px the gutter is gone entirely and a card would land
   on the copy.
   ========================================================================== */

/** Shared card shell: white plate, hairline, the soft shadow the site uses. */
function Plate({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-[18px] bg-surface shadow-[0_0_0_1px_var(--color-line-soft),0_18px_40px_-12px_rgba(70,85,120,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export function HeroAside({ lang }: { lang: LabLang }) {
  const L = (v: Parameters<typeof tx>[0]) => tx(v, lang);
  const { bot, board, deal, run } = HERO_ASIDE;

  /* Seven bars, and the shape is fixed rather than random: a random walk redrawn
     on every render would flicker between the server's HTML and the client's. */
  const bars = [38, 52, 46, 70, 58, 84, 66];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden desktop:block"
    >
      {/* ---------------------------------------------------- left: the bot */}
      {/* A phone, cut off by the left edge. `-left-[96px]` on a 300px frame
          leaves about 200px on screen at 1440 and 140px at 1320, which is enough
          to read two bubbles and know what it is. */}
      <Plate className="top-[13%] -left-[96px] w-[300px] -rotate-[7deg] p-4">
        <div className="flex items-center gap-[10px] border-b border-line-soft pb-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[13px] font-semibold text-accent">
            VL
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] leading-4 font-semibold text-ink-800">
              {L(bot.name)}
            </span>
            <span className="block text-[11px] leading-4 text-accent">
              {L(bot.status)}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-[6px] pt-3">
          <span className="max-w-[86%] self-start rounded-[14px] rounded-bl-[4px] bg-surface-muted px-3 py-2 text-[12px] leading-[17px] text-ink-500">
            {L(bot.in1)}
          </span>
          <span className="max-w-[80%] self-end rounded-[14px] rounded-br-[4px] bg-accent px-3 py-2 text-[12px] leading-[17px] text-white">
            {L(bot.out)}
          </span>
          <span className="max-w-[86%] self-start rounded-[14px] rounded-bl-[4px] bg-surface-muted px-3 py-2 text-[12px] leading-[17px] text-ink-500">
            {L(bot.in2)}
          </span>
        </div>

        <div className="mt-3 flex items-center rounded-pill bg-surface-subtle px-3 py-2 text-[11px] leading-4 text-ink-100">
          {L(bot.input)}
        </div>
      </Plate>

      {/* ------------------------------------------ left: the run notification */}
      <Plate className="bottom-[15%] -left-[54px] w-[236px] rotate-[5deg] px-4 py-[14px]">
        <div className="flex items-center gap-[10px]">
          <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-accent/12">
            <svg viewBox="0 0 14 14" className="size-[13px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 7.4 5.6 10.5 11.5 3.9" className="text-accent" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[12px] leading-4 font-medium text-ink-800">
              {L(run.title)}
            </span>
            <span className="block text-[11px] leading-4 text-ink-100">
              {L(run.meta)}
            </span>
          </span>
        </div>
      </Plate>

      {/* ------------------------------------------------ right: the dashboard */}
      <Plate className="top-[16%] -right-[88px] w-[292px] rotate-[6deg] p-[18px]">
        <span className="block text-[11px] leading-4 font-medium tracking-[0.06em] text-ink-100 uppercase">
          {L(board.title)}
        </span>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-numeric text-[30px] leading-9 font-semibold text-ink-900">
            {board.value}
          </span>
          <span className="text-[12px] leading-4 text-ink-250">
            {L(board.caption)}
          </span>
        </div>

        {/* Bars as flex children with a percentage height: no chart library, and
            nothing to load. The last one is the accent so the eye lands on the
            present rather than on the tallest. */}
        <div className="mt-4 flex h-[62px] items-end gap-[6px]">
          {bars.map((h, i) => (
            <span
              key={h + "-" + i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-[3px] ${
                i === bars.length - 1 ? "bg-accent" : "bg-accent/18"
              }`}
            />
          ))}
        </div>
      </Plate>

      {/* ------------------------------------------------- right: the deal row */}
      <Plate className="bottom-[13%] -right-[62px] w-[262px] -rotate-[5deg] p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] leading-4 font-semibold text-ink-800">
            {L(deal.title)}
          </span>
          <span className="shrink-0 rounded-pill bg-accent/10 px-[9px] py-[2px] text-[11px] leading-4 text-accent">
            {L(deal.status)}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-[6px]">
          {[
            [L(deal.rowA), deal.rowAValue],
            [L(deal.rowB), L(deal.rowBValue)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 border-t border-line-soft pt-[6px] first:border-0 first:pt-0">
              <span className="text-[11px] leading-4 text-ink-100">{k}</span>
              <span className="font-numeric text-[12px] leading-4 text-ink-700">{v}</span>
            </div>
          ))}
        </div>
      </Plate>
    </div>
  );
}
