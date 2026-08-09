/* ======================================================================
   Copy for /pricing and /ru/pricing.

   Named pricingCopy rather than pricingPage because PricingPage.tsx sits beside
   it, and on a case-insensitive filesystem the two names are the same file.

   The page itself is almost entirely assembly: the six floors, the nine
   add-ons and the three readiness multipliers all come from labPricing.ts.
   Only the words around them live here.
   ====================================================================== */

import type { LS } from './labData'

export const PRICING = {
  h1: {
    en: 'What it costs, before we start',
    ru: 'Сколько это стоит, до начала работ',
  },
  /** The qualifier sits above the fold, not in a footnote. Every figure on the
   *  page is a floor, and saying so once, early and plainly, is what keeps the
   *  rest of it honest. */
  lead: {
    en: 'Every number here is a floor, not a quote. It is what the work starts at when the task is clear; the binding figure is fixed after we scope it, and the scoping is free.',
    ru: 'Каждое число здесь это пол, а не смета. Столько работа стоит, когда задача понятна; точную цифру фиксируем после разбора, а разбор бесплатный.',
  },

  tableLabel: { en: 'The six', ru: 'Шесть направлений' },
  tableSub: {
    en: 'What we sell, what each starts at, and how long the first version usually takes.',
    ru: 'Что мы продаём, с чего начинается каждое направление и сколько обычно занимает первая версия.',
  },
  colWork: { en: 'Work', ru: 'Работа' },
  colFrom: { en: 'From', ru: 'От' },
  colTerm: { en: 'Timeline', ru: 'Срок' },
  colSupport: { en: 'Support', ru: 'Поддержка' },

  readyLabel: { en: 'What changes the number', ru: 'Что меняет цифру' },
  /** Publishing the estimator's own multipliers. Nobody does this, which is
   *  most of why it is worth doing. The framing matters: these are inputs to an
   *  estimate, not terms of a contract. */
  readySub: {
    en: 'The floor is multiplied by where you are starting from. These are the calculator’s own numbers, published rather than hidden, and they are estimator inputs rather than contract terms: the real factor is agreed on the scoping call.',
    ru: 'Пол умножается на то, с чего вы начинаете. Это собственные коэффициенты калькулятора, опубликованные, а не спрятанные, и они входные данные оценки, а не условия договора: настоящий коэффициент согласуется на разборе.',
  },
  readyWhy: {
    idea: {
      en: 'Nothing written down yet, so the first part of the work is deciding what the thing is.',
      ru: 'Ничего ещё не записано, поэтому первая часть работы это решить, что именно делаем.',
    },
    spec: {
      en: 'The process or the spec exists, so the work starts at building rather than at discovery.',
      ru: 'Процесс или ТЗ есть, поэтому работа начинается со сборки, а не с исследования.',
    },
    system: {
      en: 'Something already runs, and extending a working system costs less than starting one.',
      ru: 'Что-то уже работает, а дорабатывать живую систему дешевле, чем заводить новую.',
    },
  } as Record<string, LS>,

  addonsLabel: { en: 'Added on top', ru: 'Добавляется сверху' },
  addonsSub: {
    en: 'Independent of the kind of work. Anything worth more than about a third of its base is not an add-on and gets its own line.',
    ru: 'Не зависит от типа работы. Всё, что дороже примерно трети своей базы, уже не надбавка и выносится в отдельную строку.',
  },

  estimateLabel: { en: 'Put your own numbers in', ru: 'Подставьте свои значения' },
  estimateSub: {
    en: 'Five questions, no contact needed to see the figure.',
    ru: 'Пять вопросов, и цифру видно без контактов.',
  },
}
