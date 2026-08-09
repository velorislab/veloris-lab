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
    en: 'The whole price list, multipliers included',
    ru: 'Цены целиком, вместе с коэффициентами',
  },
  /** The qualifier sits above the fold, not in a footnote. Every figure on the
   *  page is a floor, and saying so once, early and plainly, is what keeps the
   *  rest of it honest. */
  lead: {
    en: 'Every number here is a floor, not a quote. The floor is multiplied by how ready you are, then the add-ons go on top, and both are published further down this page. The binding figure is fixed after we scope the task, and the scoping is free.',
    ru: 'Каждое число здесь это нижняя граница, а не смета. Она умножается на вашу готовность, сверху прибавляются надбавки, и то и другое опубликовано ниже на этой странице. Точную цифру фиксируем после разбора задачи, а разбор бесплатный.',
  },

  tableLabel: { en: 'Six kinds of work, and where each one starts', ru: 'Шесть направлений, и с чего каждое начинается' },
  tableSub: {
    en: 'The timeline is for the first version, not for everything that comes after. Each row has its own support figure, not one number for all six.',
    ru: 'Срок относится к первой версии, а не ко всему, что будет после. У каждой строки своя поддержка, а не одна цифра на всех.',
  },
  colWork: { en: 'Work', ru: 'Работа' },
  colFrom: { en: 'From', ru: 'От' },
  colTerm: { en: 'Timeline', ru: 'Срок' },
  colSupport: { en: 'Support', ru: 'Поддержка' },

  readyLabel: { en: 'The number depends on what you already have', ru: 'Цифра зависит от того, что у вас уже есть' },
  /** Publishing the estimator's own multipliers. Nobody does this, which is
   *  most of why it is worth doing. The framing matters: these are inputs to an
   *  estimate, not terms of a contract. */
  readySub: {
    en: 'These are the calculator\'s own multipliers, published rather than hidden. They feed an estimate, not a contract: the real factor is agreed on the scoping call.',
    ru: 'Это собственные коэффициенты калькулятора, опубликованные, а не спрятанные. Они нужны для оценки, а не для договора: настоящий коэффициент согласуем на разборе.',
  },
  readyWhy: {
    idea: {
      en: 'Nothing is written down, so the first part of the work is deciding what the thing is and writing that down.',
      ru: 'Ничего не записано, поэтому первая часть работы это решить, что именно делаем, и записать.',
    },
    spec: {
      en: 'A process or a spec already exists, so the work starts at building instead of at discovery.',
      ru: 'Процесс или ТЗ уже есть, поэтому работа начинается со сборки, а не с исследования.',
    },
    system: {
      en: 'Something already runs, and that is cheaper: the architecture and the data are chosen, and there is nothing left to argue about.',
      ru: 'Что-то уже работает, и это дешевле: архитектура и данные выбраны, спорить не о чем.',
    },
  } as Record<string, LS>,

  addonsLabel: { en: 'What gets added on top, never multiplied', ru: 'Что прибавляется сверху, а не умножается' },
  addonsSub: {
    en: 'Independent of the kind of work. Anything worth more than about a third of its base is not an add-on and gets a line of its own.',
    ru: 'Надбавки не зависят от типа работы. Всё, что дороже примерно трети своей базы, уже не надбавка и получает отдельную строку.',
  },

  estimateLabel: { en: 'Build the number for your own task', ru: 'Соберите цифру под свою задачу' },
  estimateSub: {
    en: 'Five questions. The figure appears without a contact, and the brief at the end is sent by you, if you decide to send it.',
    ru: 'Пять вопросов. Цифру видно без контактов, а бриф в конце отправляете вы сами, если решите отправить.',
  },
}
