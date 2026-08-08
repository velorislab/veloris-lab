/* ======================================================================
   Veloris Lab, calculator price table.

   WHERE THESE NUMBERS COME FROM. The owner asked for a price level matching
   srazu-ai.ru, converted to dollars and rounded. Their published table was
   read off srazu-ai.ru/ceny on 2026-08-08 and converted at 82 RUB/USD, the
   rate both exchangerate-api.com and open.er-api.com reported that day:

     Лендинг под рекламу        20 000 ₽  ->  $250
     Корпоративный сайт         50 000 ₽  ->  $600
     Frontend-разработка        50 000 ₽  ->  $600
     Telegram-бот               50 000 ₽  ->  $600
     iOS / Android приложение  100 000 ₽  ->  $1 200
     Telegram Mini App         100 000 ₽  ->  $1 200
     Интернет-магазин          120 000 ₽  ->  $1 500
     ИИ-ассистент              120 000 ₽  ->  $1 500
     Backend и API             150 000 ₽  ->  $1 800
     iOS + Android             150 000 ₽  ->  $1 800
     CRM и личный кабинет      200 000 ₽  ->  $2 400
     Приложение с backend      250 000 ₽  ->  $3 000
     Две платформы с backend   300 000 ₽  ->  $3 600
     Поддержка            4 900-39 900 ₽  ->  $60-$500 / month

   Our service list is not theirs, so each of our six is placed against the
   nearest package rather than mapped one to one; the choice is noted on each
   line below.

   WHAT WAS NOT COPIED: their delivery windows. Their whole positioning is
   speed, and the longest thing on their table is "3-5 недель" including a
   two-platform app with a backend. A week count is a promise somebody has to
   keep, so the windows here stay ours.

   ONE CAVEAT, RECORDED RATHER THAN ARGUED. This is a rouble-market price list
   read in dollars. At $250 for a landing page and $1 800 for a backend it is
   low for a bureau selling internationally, which is why SCALE exists: raise
   that one number and the whole table lifts with it, calculator and service
   cards together.

   This is the only file that has to change to reprice anything.
   ====================================================================== */

import type { LS } from './labData'

/**
 * Multiplier applied to every figure below, at the moment it is used.
 *
 * The base numbers are deliberately left as the converted srazu-ai level so
 * they stay auditable against the table in the header. Repricing is this one
 * constant: 1.5 puts the landing-equivalent at $375 and the MVP at $4 500.
 */
export const SCALE = 1

/**
 * False now that the numbers are a decision rather than a placeholder. While it
 * was true the calculator printed a loud draft notice, so nothing could ship by
 * accident. Flip it back if the table ever returns to being provisional.
 */
export const PRICING_IS_DRAFT = false

export const CURRENCY = { symbol: '$', position: 'before' as const }

/** Estimates are meaningless at single-dollar precision, so round hard. */
const STEP = 50

/** SCALE applied and rounded up to STEP. Every figure the reader sees goes
 *  through here, so the scale can never be applied to some of them and not
 *  others. */
export function priced(n: number): number {
  return Math.ceil((n * SCALE) / STEP) * STEP
}

export interface WorkType {
  key: string
  label: LS
  /** Floor for this kind of work, before readiness and add-ons. */
  from: number
  /** Monthly support for this kind of work. Theirs scales with the package
   *  rather than being one flat figure, which is the better model. */
  support: number
  /** Delivery window in weeks. Ours, not theirs. */
  weeks: [number, number]
}

/** Step 1. Exactly the six services the bureau sells, in the same order. */
export const WORK_TYPES: WorkType[] = [
  // Their ИИ-ассистент, 120 000 ₽, which is the one line on their table that
  // does the same job as this one.
  { key: 'agent',   label: { en: 'AI agent or process automation', ru: 'AI-агент или автоматизация процесса' }, from: 1500, support: 500, weeks: [2, 4] },
  // Their Backend и API, 150 000 ₽. An integration is backend work with someone
  // else's contract attached to it.
  { key: 'integr',  label: { en: 'Integration and data pipeline',  ru: 'Интеграция систем, пайплайн данных' },   from: 1800, support: 360, weeks: [2, 3] },
  // No equivalent on their table. Priced at their Telegram Mini App level,
  // 100 000 ₽: a scoped piece of backend work against a source we do not own.
  { key: 'parsing', label: { en: 'Parsing and reverse engineering', ru: 'Парсинг, реверс-инжиниринг источника' }, from: 1200, support: 250, weeks: [1, 3] },
  // Their Интернет-магазин level, 120 000 ₽: a real interface over real data.
  { key: 'dash',    label: { en: 'Dashboard and analytics',         ru: 'Дашборд и аналитика' },                  from: 1500, support: 250, weeks: [2, 4] },
  // Their Приложение с backend, 250 000 ₽, the closest thing they list to a
  // whole product built from nothing.
  { key: 'mvp',     label: { en: 'MVP or full product',             ru: 'MVP или продукт под ключ' },             from: 3000, support: 360, weeks: [6, 10] },
  // Their CRM и личный кабинет, 200 000 ₽. Money moving through it is why this
  // sits above a plain integration.
  { key: 'billing', label: { en: 'Payments and billing',            ru: 'Платежи и биллинг' },                    from: 2400, support: 500, weeks: [3, 5] },
]

export interface Readiness {
  key: string
  label: LS
  /** Multiplier on the base. Below 1 when existing work removes discovery. */
  factor: number
}

/** Step 2. What the client already has decides how much discovery is left. */
export const READINESS: Readiness[] = [
  { key: 'idea',   label: { en: 'Just an idea so far',            ru: 'Ничего, только идея' },            factor: 1.2 },
  { key: 'spec',   label: { en: 'A written process or spec',      ru: 'Есть описание процесса или ТЗ' },  factor: 1.0 },
  { key: 'system', label: { en: 'A running system to extend',     ru: 'Есть система, нужна доработка' },  factor: 0.8 },
]

export interface Addon {
  key: string
  label: LS
  add: number
}

/**
 * Step 3. Additive, independent of the work type.
 *
 * They sell fixed packages and have no add-ons, so there is nothing to convert
 * here. These are scaled to sit against the new bases: with a floor of $1 200 to
 * $3 000, an add-on worth more than about a third of the base stops being an
 * add-on and should be its own line.
 */
export const ADDONS: Addon[] = [
  { key: 'db',      label: { en: 'Database',                    ru: 'База данных' },                       add: 400 },
  { key: 'auth',    label: { en: 'Accounts and roles',          ru: 'Авторизация и роли' },                add: 450 },
  { key: 'admin',   label: { en: 'Admin panel',                 ru: 'Админка' },                           add: 600 },
  { key: 'pay',     label: { en: 'Payments',                    ru: 'Оплата' },                            add: 800 },
  { key: 'notify',  label: { en: 'Telegram or email alerts',    ru: 'Уведомления в Telegram или почту' },  add: 250 },
  { key: 'crm',     label: { en: 'CRM integration',             ru: 'Интеграция с CRM' },                  add: 500 },
  { key: 'scrape',  label: { en: 'Scraping external sources',   ru: 'Парсинг внешних источников' },        add: 650 },
  { key: 'ai',      label: { en: 'AI API and LLM features',     ru: 'AI API и LLM-функции' },              add: 700 },
  { key: 'ops',     label: { en: 'Deploy and monitoring',       ru: 'Деплой и мониторинг' },               add: 350 },
]

export interface Estimate {
  total: number
  weeks: [number, number]
  support: number
}

/**
 * base(type) x factor(readiness) + sum(add-ons), scaled and rounded up.
 * Add-ons also stretch the delivery window, one extra week per three of them.
 */
export function estimate(typeKey: string | null, readinessKey: string | null, addonKeys: string[]): Estimate | null {
  const type = WORK_TYPES.find((t) => t.key === typeKey)
  if (!type) return null

  const factor = READINESS.find((r) => r.key === readinessKey)?.factor ?? 1
  const extras = addonKeys.reduce((sum, k) => sum + (ADDONS.find((a) => a.key === k)?.add ?? 0), 0)

  const stretch = Math.floor(addonKeys.length / 3)
  return {
    total: priced(type.from * factor + extras),
    weeks: [type.weeks[0] + stretch, type.weeks[1] + stretch],
    support: priced(type.support),
  }
}

/** "$2,500" with a thin space, so the number reads the same in both locales. */
export function money(n: number): string {
  return CURRENCY.symbol + n.toLocaleString('en-US')
}
