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
    en: 'The whole price list, every line of it',
    ru: 'Цены целиком, до последней строки',
  },
  /** The qualifier sits above the fold, not in a footnote. Every figure on the
   *  page is a floor, and saying so once, early and plainly, is what keeps the
   *  rest of it honest. */
  lead: {
    en: 'Every number here is a floor, not a quote. On top of it go finishing the design, a server if the work needs one, and the features you pick, and every one of those is published further down this page. Nothing is multiplied. The binding figure is fixed after we scope the task, and the scoping is free.',
    ru: 'Каждое число здесь это нижняя граница, а не смета. Сверху прибавляется доделка дизайна, сервер, если он нужен, и выбранные функции, и всё это опубликовано ниже на этой странице. Ничего не умножается. Точную цифру фиксируем после разбора задачи, а разбор бесплатный.',
  },

  /* NOT A COUNT. This said «Шесть направлений» while the table had six rows in
     it, and the table has fifteen now. A heading that counts the rows below it is
     a heading that goes wrong the next time a row is added, so this one does not
     count them. */
  tableLabel: { en: 'Every kind of work, and where each one starts', ru: 'Все направления, и с чего каждое начинается' },
  tableSub: {
    en: 'The timeline is for the first version, not for everything that comes after. Each row carries its own support figure rather than one number standing in for all of them.',
    ru: 'Срок относится к первой версии, а не ко всему, что будет после. У каждой строки своя поддержка, а не одна цифра на всех.',
  },
  colWork: { en: 'Work', ru: 'Работа' },
  colFrom: { en: 'From', ru: 'От' },
  colTerm: { en: 'Timeline', ru: 'Срок' },
  colSupport: { en: 'Support', ru: 'Поддержка' },

  readyLabel: { en: 'What finishing the design adds', ru: 'Что добавляет доделка дизайна' },
  /** Still publishing the estimator's own workings, which is most of why this
   *  section is worth having. What changed is what there is to publish: this
   *  used to be three multipliers on the base, x1.2 / x1.0 / x0.8, and it is now
   *  three additions whose size depends on the product. The framing has to
   *  survive that change: these are inputs to an estimate, not terms of a
   *  contract. The figure on each plate is the LARGEST the addition ever gets,
   *  and it is a landing page's zero at the other end of the range. */
  readySub: {
    en: 'Design is a line in the estimate, not a percentage of it: finishing a two-platform app is not the same work as finishing a landing page. The figure on each plate is the most it ever adds, on the largest product. They feed an estimate, not a contract.',
    ru: 'Дизайн это строка в смете, а не процент от неё: доделать приложение на две платформы и доделать лендинг это разная работа. На плашке стоит максимум, который эта строка добавляет, на самом крупном продукте. Это оценка, а не договор.',
  },
  readyWhy: {
    ready: {
      en: 'Screens exist and are agreed. Nothing is added on any kind of work, which is why the plate reads zero.',
      ru: 'Экраны есть и согласованы. Ни на одном типе работы не добавляется ничего, поэтому на плашке ноль.',
    },
    prototype: {
      en: 'Something is drawn but not finished. What is left is states, edge cases and the screens nobody thought of yet.',
      ru: 'Что-то нарисовано, но не закончено. Остаются состояния, крайние случаи и экраны, о которых ещё не подумали.',
    },
    needed: {
      en: 'Nothing is drawn. On a landing page this is still zero, because the layout is the work; on an app for two platforms it is the largest single line after the build itself.',
      ru: 'Не нарисовано ничего. На лендинге это всё равно ноль, потому что вёрстка и есть работа; на приложении для двух платформ это самая крупная строка после самой сборки.',
    },
  } as Record<string, LS>,

  /* The support ladder. Their four-step shape, our names and our promises: see
     the note on SUPPORT_TIERS in labPricing for why not one word of theirs is
     reused here. */
  supportLadderLabel: { en: 'After launch, if you want it', ru: 'После запуска, если нужно' },
  supportLadderSub: {
    en: 'The price follows what has to be watched. A page that only has to load costs less to keep alive than a server other people depend on. Every line here is one we will hold to on a bad week, which is why none of them promise a number of nines.',
    ru: 'Цена идёт за тем, что нужно держать под присмотром. Страница, которой достаточно открываться, стоит дешевле сервера, от которого зависят люди. Каждый пункт здесь мы выполним и в плохую неделю, поэтому ни в одном не обещаны девятки после запятой.',
  },

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
