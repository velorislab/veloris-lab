/* ======================================================================
   Veloris Lab, calculator price table.

   WHERE THESE NUMBERS COME FROM. The owner set the price level by reference to
   the rouble market for the same work, and on 2026-08-10 asked for the same
   additive shape: product categories, design and server as lines rather than
   multipliers, and a support ladder. The rouble figures were converted at
   82 RUB/USD, the rate both exchangerate-api.com and open.er-api.com reported on
   2026-08-08. The reference itself stays out of this repository; it is recorded
   where the rest of the market research is.

     Лендинг под рекламу        20 000 ₽  ->  $244
     Корпоративный сайт         50 000 ₽  ->  $610
     Telegram-бот               50 000 ₽  ->  $610
     iOS / Android приложение  100 000 ₽  ->  $1 220
     Интернет-магазин          120 000 ₽  ->  $1 463
     ИИ-ассистент              120 000 ₽  ->  $1 463
     Backend и API             150 000 ₽  ->  $1 829
     iOS + Android             150 000 ₽  ->  $1 829
     CRM и личный кабинет      200 000 ₽  ->  $2 439
     Приложение с backend      250 000 ₽  ->  $3 049
     Поддержка            4 900-39 900 ₽  ->  $60-$487 / month

   THE ONE THING WORTH KNOWING ABOUT THEIR CALCULATOR, and it is not in the
   numbers: they run fifteen niche presets (blogger, psychologist, estate agent,
   fitness coach, online school, sleep-diary app, DICOM viewer, and so on) and
   NOT ONE OF THEM TOUCHES THE PRICE. A niche changes the wording of the
   questions and which feature checkboxes are offered; the money comes entirely
   from the product type underneath. It is a programmatic-SEO device with one
   engine behind it, not a pricing dimension. Verified by extracting every
   occurrence of `price` from their bundle: it appears only in the base table and
   in the one function that sums it.

   WHAT IS OURS AND NOT THEIRS:

   - The six categories they have no line for: integration, parsing, dashboards,
     payments, MVP and browser extensions. Priced against the nearest thing on
     their table, noted per line. The extension is the one that was our own
     omission rather than an inherited one: the studio's own product is one.
   - Every delivery window. Their longest quote is "3-5 недель" for a
     two-platform app with a backend, and a week count is a promise somebody has
     to keep. The windows here are ours and are deliberately longer.
   - The support tier names and their contents. Theirs are named products, so
     copying the names would be copying identifiers, and two of their bullets
     ("приоритетная команда") describe a company with staff. Ours say what one
     person can actually hold to.
   - Three add-ons they do not sell: a database, scraping, deploy and
     monitoring.

   RE-VERIFIED 2026-08-12, against the source rather than against the screen.
   Their published list at /ceny/ and the price table inside their calculator
   bundle both still carry the figures above, so nothing here has drifted. Two
   rows of theirs were not in the table when it was first read:

     Telegram Mini App        100 000 ₽    twice their bot, and we had one row
                                           covering both at the bot's price
     Две платформы с backend  300 000 ₽    above our own ceiling; no row added,
                                           `mvp` remains the top of this table

   The rate was checked the same day: 82.55 RUB/USD against the 82 the figures
   above were converted at, a drift of 0.7%. Below the rounding step, so the
   base numbers stay as they are.

   WE ARE DELIBERATELY DEARER THAN THEM, and `SCALE` is where that lives. The
   owner asked for 15-20% above their level, so the multiplier is 1.15 rather
   than 1.20: `priced()` only ever rounds up, which adds about three points on
   top of whatever the multiplier does. Measured across all sixteen rows, 1.15
   lands at a mean of +18%, 1.20 lands at +22% and is outside what was asked
   for. The three rows that still read +23% at 1.15 are the small ones, where a
   $50 step is a bigger share of the number than the multiplier is.

   This is the only file that has to change to reprice anything.
   ====================================================================== */

import type { LS } from './labData'

/**
 * Multiplier applied to every figure below, at the moment it is used.
 *
 * The base numbers are deliberately left at the converted rouble level so they
 * stay auditable against the table in the header: every one of them is a figure
 * the reference publishes, and none of them is a figure we charge. What we
 * charge is that level plus this multiplier, and keeping the two apart is what
 * makes the comparison checkable a year from now.
 *
 * 1.15, for the reason argued in the header: the rounding is one-directional,
 * so the multiplier has to sit at the bottom of the 15-20% band for the printed
 * prices to land inside it.
 */
export const SCALE = 1.15

/**
 * False now that the numbers are a decision rather than a placeholder. While it
 * was true the calculator printed a loud draft notice, so nothing could ship by
 * accident. Flip it back if the table ever returns to being provisional.
 */
export const PRICING_IS_DRAFT = false

export const CURRENCY = { symbol: '$', position: 'before' as const }

/** Estimates are meaningless at single-dollar precision, so round hard. */
const STEP = 50

/**
 * THREE ROUNDING STEPS, because a $50 step is only right for one of the three
 * kinds of figure on this site, and each of the other two was measurably wrong
 * under it.
 *
 * A $50 step is right for a project total: nobody quotes $1 463. Applied to
 * support it turned their cheapest tier, 4 900 ₽ = $60, into $100 — a 67% rise
 * invented by a rounding rule. Monthly money rounds to $10.
 *
 * The third came out of the repricing. An individual line of an estimate is
 * small money, and on small money a $50 step swamps the multiplier: at SCALE
 * 1.15 the payments add-on went from $183 to $250, a 37% rise where 15-20% was
 * asked for, and the admin panel and the AI line both landed on +31%. On a $10
 * step the same three come out at +20%, +18% and +18%. The step has to be
 * smaller than the decision it is rounding.
 *
 * STEP_LINE and STEP_MONTHLY are the same number today and are still two
 * constants, because they answer different questions: one is "how precise is a
 * component of a quote", the other is "how precise is a subscription".
 */
const STEP_MONTHLY = 10
/** Exported because the calculator's count-up has to round mid-flight values on
 *  the same grid the total sits on. It rounded to 50 while every total was a
 *  multiple of 50, and the readout stayed exact by accident; the moment totals
 *  moved onto this finer grid, a $1,640 estimate would have settled reading
 *  $1,650 over a breakdown that summed to $1,640. */
export const STEP_LINE = 10

/** SCALE applied and rounded up to STEP. Every one-off figure the reader sees
 *  goes through here, so the scale can never be applied to some of them and not
 *  others. */
export function priced(n: number): number {
  return Math.ceil((n * SCALE) / STEP) * STEP
}

/** The same, for anything charged per month. */
export function monthly(n: number): number {
  return Math.ceil((n * SCALE) / STEP_MONTHLY) * STEP_MONTHLY
}

/**
 * The same, for one line of an estimate: an add-on, the design line, the server,
 * the complexity bump.
 *
 * EVERY PUBLISHED LINE GOES THROUGH HERE AND SO DOES THE TOTAL, which is what
 * makes the breakdown add up. It did not before: each line was rounded up to $50
 * on its own and the total was rounded up to $50 separately, so a bot with three
 * features printed «from $1,350» over lines that summed to $1,450 against a
 * published floor of $650. The result screen is the one place on this site that
 * asks to be checked with a pencil, so it has to survive being checked.
 */
export function line(n: number): number {
  return Math.ceil((n * SCALE) / STEP_LINE) * STEP_LINE
}

/** What the client already has drawn, which is a real cost difference and is
 *  why it is a line in the estimate rather than a multiplier on it. */
export type DesignKey = 'ready' | 'prototype' | 'needed'

export interface WorkType {
  key: string
  label: LS
  /** Floor for this kind of work, before design, server and features. */
  from: number
  /** Monthly support for this kind of work. Theirs scales with the package
   *  rather than being one flat figure, which is the better model. */
  support: number
  /** Delivery window in weeks. Ours, not theirs. */
  weeks: [number, number]
  /** What finishing the design costs on top, per state. Theirs varies by
   *  product: a landing needs none, a two-platform app needs the most. */
  design: Record<DesignKey, number>
  /**
   * True when this kind of work cannot exist without a server, so the server
   * line is already in `from` and must not be offered twice.
   *
   * Theirs is `backend | crm | ai`. Ours adds integration, parsing, dashboards,
   * payments and MVP, all of which are server work by definition. A shop is
   * deliberately NOT on the list, matching them: a storefront on a hosted
   * platform is a real thing people buy.
   */
  serverIncluded: boolean
}

/**
 * Step 1. Their eleven product categories, in their order, then the six of ours
 * they have no line for.
 *
 * Eleven and not ten because their calculator offers ten and their published
 * list at /ceny/ carries fourteen; the Mini App is on the list and not in the
 * calculator, and it is a thing this studio actually sells.
 *
 * Their «ИИ-ассистент» is not repeated: it is the same work as our `agent`, at
 * within $40 of the same price, so the two are one row carrying our label and
 * their figure.
 *
 * THE SIX KEYS `agent`, `integr`, `parsing`, `dash`, `mvp` AND `billing` ARE
 * LOAD-BEARING. Service pages, case pages, the home service cards, the schema
 * offers and the metadata all join on them by string. Renaming one silently
 * empties a page rather than failing a build.
 */
export const WORK_TYPES: WorkType[] = [
  // ---------------------------------------------------------------- theirs
  { key: 'landing',  label: { en: 'Landing page',                 ru: 'Лендинг' },
    from: 244,  support: 60,  weeks: [1, 2],
    design: { ready: 0, prototype: 0, needed: 0 }, serverIncluded: false },

  { key: 'site',     label: { en: 'Company website',               ru: 'Корпоративный сайт' },
    from: 610,  support: 96,  weeks: [2, 3],
    design: { ready: 0, prototype: 122, needed: 244 }, serverIncluded: false },

  { key: 'store',    label: { en: 'Online store',                  ru: 'Интернет-магазин' },
    from: 1463, support: 243, weeks: [3, 5],
    design: { ready: 0, prototype: 122, needed: 244 }, serverIncluded: false },

  { key: 'ios',      label: { en: 'iOS app',                       ru: 'iOS-приложение' },
    from: 1220, support: 121, weeks: [4, 7],
    design: { ready: 0, prototype: 183, needed: 366 }, serverIncluded: false },

  { key: 'android',  label: { en: 'Android app',                   ru: 'Android-приложение' },
    from: 1220, support: 121, weeks: [4, 7],
    design: { ready: 0, prototype: 183, needed: 366 }, serverIncluded: false },

  { key: 'mobile',   label: { en: 'iOS and Android',               ru: 'iOS + Android' },
    from: 1829, support: 182, weeks: [6, 9],
    design: { ready: 0, prototype: 244, needed: 488 }, serverIncluded: false },

  { key: 'backend',  label: { en: 'Backend and API',               ru: 'Backend и API' },
    from: 1829, support: 365, weeks: [3, 5],
    design: { ready: 0, prototype: 0, needed: 0 }, serverIncluded: true },

  { key: 'telegram', label: { en: 'Telegram bot',                   ru: 'Telegram-бот' },
    from: 610,  support: 243, weeks: [1, 3],
    design: { ready: 0, prototype: 61, needed: 122 }, serverIncluded: true },

  // SPLIT OUT OF THE ROW ABOVE, because merging them was underpricing the half
  // of it we sell most. This row used to read «Telegram bot or Mini App» and
  // charge 50 000 ₽, the bot's price, for both. Their list prices the Mini App
  // at 100 000 ₽, twice the bot, and it is the honest figure: a Mini App is an
  // interface with states and a store listing, a bot is a conversation. One row
  // meant quoting a Mini App at 39% BELOW the reference on a table that is
  // supposed to sit 15-20% above it.
  //
  // The design line is theirs for a corporate site, 10 000 / 20 000 ₽, not
  // theirs for a bot: what has to be drawn here is screens, and the bot's
  // 5 000 / 10 000 ₽ is priced for a message flow.
  { key: 'miniapp',  label: { en: 'Telegram Mini App',              ru: 'Telegram Mini App' },
    from: 1220, support: 243, weeks: [3, 6],
    design: { ready: 0, prototype: 122, needed: 244 }, serverIncluded: true },

  { key: 'crm',      label: { en: 'CRM or client portal',          ru: 'CRM или личный кабинет' },
    from: 2439, support: 487, weeks: [4, 7],
    design: { ready: 0, prototype: 183, needed: 366 }, serverIncluded: true },

  // Their ИИ-ассистент, 120 000 ₽, which is the one line on their table that
  // does the same job as this one. Our label, their number.
  { key: 'agent',    label: { en: 'AI agent or process automation', ru: 'AI-агент или автоматизация процесса' },
    from: 1463, support: 487, weeks: [2, 4],
    design: { ready: 0, prototype: 61, needed: 122 }, serverIncluded: true },

  // ------------------------------------------------------------------ ours
  // Their Backend и API, 150 000 ₽. An integration is backend work with someone
  // else's contract attached to it, so it sits at the same floor.
  { key: 'integr',   label: { en: 'Integration and data pipeline',  ru: 'Интеграция систем, пайплайн данных' },
    from: 1829, support: 365, weeks: [2, 3],
    design: { ready: 0, prototype: 0, needed: 0 }, serverIncluded: true },

  // No equivalent on their table at all. Left at the level it has carried since
  // the price list was settled, which is their iOS/Android tier: a scoped piece
  // of server work against a source we do not own.
  { key: 'parsing',  label: { en: 'Parsing and reverse engineering', ru: 'Парсинг, реверс-инжиниринг источника' },
    from: 1200, support: 250, weeks: [1, 3],
    design: { ready: 0, prototype: 0, needed: 0 }, serverIncluded: true },

  // Their Интернет-магазин level, 120 000 ₽: a real interface over real data.
  { key: 'dash',     label: { en: 'Dashboard and analytics',         ru: 'Дашборд и аналитика' },
    from: 1463, support: 243, weeks: [2, 4],
    design: { ready: 0, prototype: 122, needed: 244 }, serverIncluded: true },

  // Their Приложение с backend, 250 000 ₽, the closest thing they list to a
  // whole product built from nothing.
  { key: 'mvp',      label: { en: 'MVP or full product',             ru: 'MVP или продукт под ключ' },
    from: 3049, support: 365, weeks: [6, 10],
    design: { ready: 0, prototype: 244, needed: 488 }, serverIncluded: true },

  // Their CRM и личный кабинет, 200 000 ₽. Money moving through it is why this
  // sits above a plain integration.
  { key: 'billing',  label: { en: 'Payments and billing',            ru: 'Платежи и биллинг' },
    from: 2439, support: 487, weeks: [3, 5],
    design: { ready: 0, prototype: 183, needed: 366 }, serverIncluded: true },

  // NOTHING ON THEIR LIST, AND THE ONE OMISSION THAT WAS OURS RATHER THAN
  // INHERITED: the studio's own product is a browser extension with a Chrome Web
  // Store listing, and the price table had no row for the thing it is best known
  // for. Anyone asking for one had to be quoted off a table that did not contain
  // it.
  //
  // Priced between their one-platform app (100 000 ₽) and their two-platform one
  // (150 000 ₽), and the argument is the review cycle rather than the code: an
  // extension is one target, which is their lower figure, plus a store listing
  // and a rejection-and-resubmit loop that a web build never has. 1 650 is that
  // midpoint, and it is ours, so it carries no rouble figure of theirs.
  //
  // No server by default. An extension that only rewrites the page it is on
  // needs none, and the ones that do need one are asked the question like
  // everything else on this table.
  { key: 'extension', label: { en: 'Browser extension',              ru: 'Браузерное расширение' },
    from: 1650, support: 121, weeks: [2, 4],
    design: { ready: 0, prototype: 122, needed: 244 }, serverIncluded: false },
]

export interface DesignState {
  key: DesignKey
  label: LS
}

/**
 * Step 2. THE MONEY IS NOT HERE, and that is the change.
 *
 * This used to be a multiplier on the base, x1.2 / x1.0 / x0.8, published on
 * /pricing as the estimator's own workings. It is now an addition that varies by
 * product type, which is their model and the more honest one: finishing the
 * design of a two-platform app is not the same amount of work as finishing a
 * landing page, and a percentage of the base pretended it was. The figures live
 * on each `WorkType.design`.
 */
export const DESIGN_STATES: DesignState[] = [
  { key: 'ready',     label: { en: 'Design is done',            ru: 'Дизайн готов' } },
  { key: 'prototype', label: { en: 'There is a prototype',      ru: 'Есть прототип' } },
  { key: 'needed',    label: { en: 'Design from scratch',       ru: 'Дизайн нужен с нуля' } },
]

/** What a server costs when the chosen type does not already include one.
 *  Their 150 000 ₽, the single largest line in their calculator. */
export const SERVER_ADD = 1829

export interface Addon {
  key: string
  label: LS
  add: number
}

/**
 * Step 3. Additive, independent of the work type.
 *
 * Nine of these are theirs, converted, and their figures are a good deal lower
 * than the ones this file used to carry: accounts went from $450 to $122, an
 * admin panel from $600 to $305, payments from $800 to $183. That is the price
 * level that was asked for, not a slip.
 *
 * Three are ours, kept at our own numbers because they have no counterpart: a
 * database, scraping, and deploy with monitoring.
 */
export const ADDONS: Addon[] = [
  { key: 'auth',    label: { en: 'Accounts and roles',        ru: 'Авторизация и роли' },               add: 122 },
  { key: 'pay',     label: { en: 'Payments',                  ru: 'Оплата' },                          add: 183 },
  { key: 'admin',   label: { en: 'Admin panel',               ru: 'Админка' },                         add: 305 },
  { key: 'notify',  label: { en: 'Telegram or email alerts',  ru: 'Уведомления в Telegram или почту' }, add: 122 },
  { key: 'crm',     label: { en: 'CRM integration',           ru: 'Интеграция с CRM' },                add: 183 },
  { key: 'maps',    label: { en: 'Maps and geolocation',      ru: 'Карты и геолокация' },              add: 183 },
  { key: 'chat',    label: { en: 'Chat or live messaging',    ru: 'Чат или переписка' },               add: 244 },
  { key: 'files',   label: { en: 'File and document storage', ru: 'Файлы и документы' },               add: 122 },
  { key: 'ai',      label: { en: 'AI API and LLM features',   ru: 'AI API и LLM-функции' },            add: 305 },
  // ------------------------------------------------------------------ ours
  { key: 'db',      label: { en: 'Database',                  ru: 'База данных' },                     add: 400 },
  { key: 'scrape',  label: { en: 'Scraping external sources', ru: 'Парсинг внешних источников' },      add: 650 },
  { key: 'ops',     label: { en: 'Deploy and monitoring',     ru: 'Деплой и мониторинг' },             add: 350 },
]

/**
 * The complexity bump, read out of what the client typed.
 *
 * Theirs scans the free-text description for nine words and adds money when it
 * finds them. It is a blunt instrument and it is also the most useful thing in
 * their calculator, because it means the number moves when somebody describes a
 * marketplace with video and geolocation, without anyone having to add a
 * checkbox for it.
 *
 * Both languages are matched, since ours is a bilingual site and theirs is not.
 * The stems are deliberately short so they catch inflections: «финанс» covers
 * финансы, финансовый, финансами.
 */
export const COMPLEXITY_STEMS = [
  'маркетплейс', 'видео', 'онлайн', 'real-time', 'реальном времени', 'нейросет',
  'медицин', 'финанс', 'офлайн', 'геолокац',
  'marketplace', 'video', 'realtime', 'real time', 'neural', 'medical', 'health',
  'financ', 'offline', 'geoloc',
] as const

/** Their +50 000 ₽ and +20 000 ₽. */
export const COMPLEXITY_ADD = { high: 610, some: 244 } as const

export interface SupportTier {
  key: string
  label: LS
  perMonth: number
  includes: LS[]
}

/**
 * After launch. Their four-step ladder, our names and our promises.
 *
 * The shape is theirs and it is a good one: the price follows what has to be
 * watched, and a server costs more to keep alive than a page does. The names are
 * not, because theirs are product names and copying those would be copying
 * identifiers. Nor are the contents: two of their bullets describe a company
 * with staff on a rota, and every line here has to be one that one person can
 * hold to on a bad week.
 */
export const SUPPORT_TIERS: SupportTier[] = [
  {
    key: 'watch',
    label: { en: 'Kept running', ru: 'Присмотр' },
    perMonth: 96,
    includes: [
      { en: 'For sites and interfaces with no server logic', ru: 'Для сайтов и интерфейсов без серверной логики' },
      { en: 'Dependency and security updates',               ru: 'Обновления зависимостей и безопасности' },
      { en: 'Uptime checks',                                 ru: 'Проверка доступности' },
      { en: 'Up to 3 hours of changes',                       ru: 'До 3 часов правок' },
      { en: 'A reply the same working day',                   ru: 'Ответ в тот же рабочий день' },
    ],
  },
  {
    key: 'duty',
    label: { en: 'On call', ru: 'Дежурство' },
    perMonth: 365,
    includes: [
      { en: 'For apps, APIs, bots and databases',   ru: 'Для приложений, API, ботов и баз данных' },
      { en: 'Monitoring with alerts to a phone',    ru: 'Мониторинг с оповещением на телефон' },
      { en: 'Backups, checked by restoring them',   ru: 'Резервные копии с проверкой восстановления' },
      { en: 'Up to 8 hours of changes',             ru: 'До 8 часов правок' },
      { en: 'Same-day start on anything down',      ru: 'Начинаем в тот же день, если что-то лежит' },
    ],
  },
  {
    key: 'grow',
    label: { en: 'Kept growing', ru: 'Развитие' },
    perMonth: 731,
    includes: [
      { en: 'Everything in On call',        ru: 'Всё из «Дежурства»' },
      { en: 'Up to 20 hours of development', ru: 'До 20 часов разработки' },
      { en: 'A monthly call about the product', ru: 'Ежемесячный созвон по продукту' },
      { en: 'Analytics and what to try next',   ru: 'Аналитика и что пробовать дальше' },
    ],
  },
  {
    key: 'stream',
    label: { en: 'Reserved capacity', ru: 'Выделенный поток' },
    perMonth: 1463,
    includes: [
      { en: 'Everything in Kept growing',        ru: 'Всё из «Развития»' },
      { en: 'Up to 50 hours, booked in advance', ru: 'До 50 часов, забронированных заранее' },
      { en: 'Weekly releases',                   ru: 'Еженедельные релизы' },
      { en: 'Your work goes first',              ru: 'Ваши задачи идут первыми' },
    ],
  },
]

/** The floor a server puts under monthly support, whatever the product type
 *  says. Their rule, their figure: `max(base, 29 900 ₽)`. */
const SUPPORT_FLOOR_WITH_SERVER = 365

/**
 * One line of the breakdown.
 *
 * KEYS, NOT SENTENCES. Their result screen lists what went into the number in
 * words, which is the reason the figure reads as a calculation rather than as an
 * assertion, and it is worth having. But this file has no idea which language
 * the reader is in and must not learn: it is imported by the metadata builder
 * and by llms.txt as well as by the calculator. So the shape travels and the
 * wording is looked up at the call site, from CALC in labData.
 */
export interface EstimateFactor {
  kind: 'design' | 'server' | 'features' | 'complexity'
  /** What this line added, already scaled and rounded the same way the total is. */
  add: number
  /** How many features, for the one line that counts things. */
  count?: number
  /** Which of the two complexity bumps landed. */
  level?: 'high' | 'some'
}

export interface Estimate {
  total: number
  weeks: [number, number]
  support: number
  /** What is in the number, in the order it was added. */
  factors: EstimateFactor[]
  /** True once the description is long enough to be worth anything. Theirs
   *  calls the estimate «предварительная» below 80 characters. */
  described: boolean
}

export interface EstimateInput {
  typeKey: string | null
  designKey: DesignKey | null
  /** The client wants a server and the type does not already include one. */
  server?: boolean
  addonKeys?: string[]
  description?: string
}

/** How many of the complexity stems appear in what they typed. */
export function complexityHits(description: string): number {
  const text = description.toLowerCase()
  return COMPLEXITY_STEMS.filter((s) => text.includes(s)).length
}

/**
 * base(type) + design(type, state) + server + sum(features) + complexity.
 *
 * Every term is an addition now; nothing multiplies. Each term that costs money
 * also stretches the window, because the thing that makes a project dearer is
 * the same thing that makes it longer.
 */
export function estimate(input: EstimateInput): Estimate | null {
  const type = WORK_TYPES.find((t) => t.key === input.typeKey)
  if (!type) return null

  const addonKeys = [...new Set(input.addonKeys ?? [])]
  const description = input.description ?? ''
  const factors: EstimateFactor[] = []

  /* THE TOTAL IS BUILT OUT OF THE FIGURES THAT GET PRINTED, not out of the raw
     ones with a single rounding at the end. Same arithmetic, one difference
     that matters: what the result screen itemises now sums to what it announces.
     See `line()` for the defect this replaces. */
  let total = priced(type.from)
  let weeks: [number, number] = [type.weeks[0], type.weeks[1]]

  /* Design. A state is always chosen by the time this matters, and `ready`
     costs nothing everywhere, so an unanswered step behaves as done. */
  const design = input.designKey ? type.design[input.designKey] : 0
  if (design > 0) {
    const add = line(design)
    total += add
    weeks = [weeks[0] + 1, weeks[1] + 2]
    factors.push({ kind: 'design', add })
  }

  /* A server, unless this kind of work is already one. */
  const server = Boolean(input.server) && !type.serverIncluded
  if (server) {
    const add = line(SERVER_ADD)
    total += add
    weeks = [weeks[0] + 1, weeks[1] + 2]
    factors.push({ kind: 'server', add })
  }

  /* Each add-on is rounded the way /pricing prints it and only then summed, so
     a reader adding the published figures by hand lands on this same number. */
  let extras = 0
  for (const key of addonKeys) {
    const addon = ADDONS.find((a) => a.key === key)
    if (addon) extras += line(addon.add)
  }
  total += extras
  if (addonKeys.length) {
    factors.push({ kind: 'features', add: extras, count: addonKeys.length })
  }
  /* One extra week per three features, which is ours and predates this rewrite;
     theirs stretches the window on the complexity bump alone. */
  const stretch = Math.floor(addonKeys.length / 3)
  weeks = [weeks[0] + stretch, weeks[1] + stretch]

  const hits = complexityHits(description)
  if (hits >= 2 || addonKeys.length >= 5) {
    const add = line(COMPLEXITY_ADD.high)
    total += add
    weeks = [weeks[0] + 1, weeks[1] + 2]
    factors.push({ kind: 'complexity', add, level: 'high' })
  } else if (hits === 1 || addonKeys.length >= 3) {
    const add = line(COMPLEXITY_ADD.some)
    total += add
    weeks = [weeks[0] + 1, weeks[1] + 1]
    factors.push({ kind: 'complexity', add, level: 'some' })
  }

  const hasServer = server || type.serverIncluded
  const support = hasServer ? Math.max(type.support, SUPPORT_FLOOR_WITH_SERVER) : type.support

  return {
    total,
    weeks,
    support: monthly(support),
    factors,
    described: description.trim().length >= 80,
  }
}

/** "$2,500" with a thin space, so the number reads the same in both locales. */
export function money(n: number): string {
  return CURRENCY.symbol + n.toLocaleString('en-US')
}
