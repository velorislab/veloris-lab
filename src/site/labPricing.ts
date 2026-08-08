/* ======================================================================
   Veloris Lab, calculator price table.

   EVERY NUMBER IN THIS FILE IS A STRUCTURAL PLACEHOLDER, NOT A QUOTE.
   They exist so the calculator has something to compute while the real
   rates are being decided. Replace them, then flip PRICING_IS_DRAFT to
   false. While the flag is true the page prints a loud draft notice on
   the calculator and the estimate is labelled as a demo, so nothing can
   be published by accident.

   This is the only file that has to change to reprice the calculator.
   ====================================================================== */

import type { LS } from './labData'

/** Set to false only once the numbers below are yours. */
export const PRICING_IS_DRAFT = true

export const CURRENCY = { symbol: '$', position: 'before' as const }

export interface WorkType {
  key: string
  label: LS
  /** Floor for this kind of work, before readiness and add-ons. */
  from: number
  /** Delivery window in weeks, shown next to the estimate. */
  weeks: [number, number]
}

/** Step 1. Exactly the six services the bureau sells, in the same order. */
export const WORK_TYPES: WorkType[] = [
  { key: 'agent',   label: { en: 'AI agent or process automation', ru: 'AI-агент или автоматизация процесса' }, from: 2500, weeks: [2, 4] },
  { key: 'integr',  label: { en: 'Integration and data pipeline',  ru: 'Интеграция систем, пайплайн данных' },   from: 2000, weeks: [2, 3] },
  { key: 'parsing', label: { en: 'Parsing and reverse engineering', ru: 'Парсинг, реверс-инжиниринг источника' }, from: 1800, weeks: [1, 3] },
  { key: 'dash',    label: { en: 'Dashboard and analytics',         ru: 'Дашборд и аналитика' },                  from: 2200, weeks: [2, 4] },
  { key: 'mvp',     label: { en: 'MVP or full product',             ru: 'MVP или продукт под ключ' },             from: 6000, weeks: [6, 10] },
  { key: 'billing', label: { en: 'Payments and billing',            ru: 'Платежи и биллинг' },                    from: 3000, weeks: [3, 5] },
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

/** Step 3. Additive, independent of the work type. */
export const ADDONS: Addon[] = [
  { key: 'db',      label: { en: 'Database',                    ru: 'База данных' },                       add: 600 },
  { key: 'auth',    label: { en: 'Accounts and roles',          ru: 'Авторизация и роли' },                add: 700 },
  { key: 'admin',   label: { en: 'Admin panel',                 ru: 'Админка' },                           add: 900 },
  { key: 'pay',     label: { en: 'Payments',                    ru: 'Оплата' },                            add: 1200 },
  { key: 'notify',  label: { en: 'Telegram or email alerts',    ru: 'Уведомления в Telegram или почту' },  add: 400 },
  { key: 'crm',     label: { en: 'CRM integration',             ru: 'Интеграция с CRM' },                  add: 800 },
  { key: 'scrape',  label: { en: 'Scraping external sources',   ru: 'Парсинг внешних источников' },        add: 1000 },
  { key: 'ai',      label: { en: 'AI API and LLM features',     ru: 'AI API и LLM-функции' },              add: 1100 },
  { key: 'ops',     label: { en: 'Deploy and monitoring',       ru: 'Деплой и мониторинг' },               add: 500 },
]

/** Monthly support, shown under the estimate. */
export const SUPPORT_FROM = 150

/** Estimates are meaningless at single-dollar precision, so round hard. */
const STEP = 100

export interface Estimate {
  total: number
  weeks: [number, number]
  support: number
}

/**
 * base(type) x factor(readiness) + sum(add-ons), rounded up to STEP.
 * Add-ons also stretch the delivery window, one extra week per three of them.
 */
export function estimate(typeKey: string | null, readinessKey: string | null, addonKeys: string[]): Estimate | null {
  const type = WORK_TYPES.find((t) => t.key === typeKey)
  if (!type) return null

  const factor = READINESS.find((r) => r.key === readinessKey)?.factor ?? 1
  const extras = addonKeys.reduce((sum, k) => sum + (ADDONS.find((a) => a.key === k)?.add ?? 0), 0)
  const total = Math.ceil((type.from * factor + extras) / STEP) * STEP

  const stretch = Math.floor(addonKeys.length / 3)
  return {
    total,
    weeks: [type.weeks[0] + stretch, type.weeks[1] + stretch],
    support: SUPPORT_FROM,
  }
}

/** "$2,500" with a thin space, so the number reads the same in both locales. */
export function money(n: number): string {
  return CURRENCY.symbol + n.toLocaleString('en-US')
}
