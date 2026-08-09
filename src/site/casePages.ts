/* ======================================================================
   Copy for the case pages, /cases/<slug> and /ru/cases/<slug>.

   THE TEMPLATE IS DELIBERATELY SHORTER THAN THE REFERENCE'S.

   Theirs carries twenty-seven fields. Ours can fill seventeen honestly, and a
   template with ten empty fields reads worse than a short one that is full, so
   the other ten are cut rather than padded. What went, and why:

     h1 price       their cases are their own priced products; ours are client
                    work whose price we cannot publish. Printing the parent
                    service's floor under a case implies that is what the case
                    cost. It moves to "similar work from X", which is true.
     timeline       nobody wrote down that Cowee took four weeks in four named
                    phases. Inventing phase names is exactly the thing this file
                    does not do.
     price drivers  belongs on the service page, where it is a required field.
     per-case FAQ   four cases times three questions is twelve pairs duplicating
                    the service pages. The case links to its parent instead.
     market anchor  they print «Рынок: 2-4 млн ₽» next to their own figure. We
                    have no sourced agency ranges, and an unsourced anchor is
                    just a bigger number printed next to a smaller one.

   `difficulties` is OPTIONAL on purpose. It is the field with the highest
   invention risk: writing three plausible-sounding obstacles is easy and none
   of them would be true. It is filled only where labData already asserts enough
   to draw them from, and the section does not render otherwise.
   ====================================================================== */

import type { LS } from './labData'

export interface Difficulty {
  t: LS
  d: LS
}

export interface CasePage {
  /** URL segment. */
  slug: string
  /** Matches CASES[].title in English. The join, so reordering cannot repoint. */
  match: string
  /** Which service page this case belongs under, a WORK_TYPES key. */
  parentService: string
  /** Two mono tokens: domain and kind. */
  eyebrow: LS
  /** Who it was built for, one sentence. Not who the client is: what they do. */
  audience: LS
  /** Only where the source material supports three real ones. */
  difficulties?: [Difficulty, Difficulty, Difficulty]
  /** The closing question, phrased for this case rather than in general. */
  cta: LS
}

export const CASE_PAGES: CasePage[] = [
  {
    slug: 'swiftin',
    match: 'Swiftin',
    parentService: 'mvp',
    eyebrow: { en: 'Browser extension · Own product', ru: 'Расширение браузера · Свой продукт' },
    audience: {
      en: 'Anyone who reads, watches or writes in a language that is not their own, all day, in a browser.',
      ru: 'Тем, кто целый день читает, смотрит и пишет в браузере не на родном языке.',
    },
    difficulties: [
      {
        t: { en: 'Translating a page without breaking it', ru: 'Перевести страницу и не сломать её' },
        d: {
          en: 'A page is not a document. Replacing text inside a live application has to survive the application rewriting that text a second later, and every site does it differently.',
          ru: 'Страница это не документ. Подменять текст внутри живого приложения нужно так, чтобы это пережило момент, когда приложение перерисует его само, а делает это каждый сайт по-своему.',
        },
      },
      {
        t: { en: 'Four surfaces, one product', ru: 'Четыре поверхности, один продукт' },
        d: {
          en: 'Pages, selected text, subtitles and whatever you type in any field are four different problems that have to feel like one feature and share one quota.',
          ru: 'Страницы, выделенный текст, субтитры и то, что вы печатаете в любом поле, это четыре разные задачи, которые обязаны ощущаться одной функцией и делить одну квоту.',
        },
      },
      {
        t: { en: 'Money that must not arrive twice', ru: 'Деньги, которые не должны прийти дважды' },
        d: {
          en: 'Paid plans mean webhooks, and webhooks are delivered more than once. Every one of them has to be safe to replay, or a customer is charged or upgraded twice.',
          ru: 'Платные тарифы означают вебхуки, а вебхуки приходят не по одному разу. Каждый обязан безопасно повторяться, иначе клиента спишут или повысят дважды.',
        },
      },
    ],
    cta: {
      en: 'Thinking about your own product?',
      ru: 'Думаете о своём продукте?',
    },
  },
  {
    slug: 'dashboards',
    match: 'One screen instead of manual exports',
    parentService: 'dash',
    eyebrow: { en: 'Analytics · Client work', ru: 'Аналитика · Работа для клиента' },
    audience: {
      en: 'A business whose numbers lived in several services at once and nowhere together.',
      ru: 'Бизнесу, чьи цифры жили сразу в нескольких сервисах и нигде вместе.',
    },
    // No difficulties: labData asserts the task, the solution and the outcome,
    // and not enough about what fought back. Three plausible obstacles would be
    // three inventions. Founder input turns this on.
    cta: {
      en: 'Want one screen instead of five exports?',
      ru: 'Хотите один экран вместо пяти выгрузок?',
    },
  },
  {
    slug: 'bas-automations',
    match: '20+ automations on BAS',
    parentService: 'agent',
    eyebrow: { en: 'Automation · Client work', ru: 'Автоматизация · Работа для клиента' },
    audience: {
      en: 'A business losing hours a day to hunting tenders and filling product cards by hand.',
      ru: 'Бизнесу, который ежедневно терял часы на поиск тендеров и заполнение карточек руками.',
    },
    cta: {
      en: 'Have a routine worth handing over?',
      ru: 'Есть рутина, которую пора отдать?',
    },
  },
  {
    slug: 'cowee',
    match: 'Cowee',
    parentService: 'mvp',
    eyebrow: { en: 'Telegram · Product', ru: 'Telegram · Продукт' },
    audience: {
      en: 'People who work alone and get more done in a room with others, even a video one.',
      ru: 'Тем, кто работает в одиночку и делает больше в комнате с другими, пусть и видео.',
    },
    difficulties: [
      {
        t: { en: 'Seats that cannot be sold twice', ru: 'Места, которые нельзя продать дважды' },
        d: {
          en: 'Two people booking the last seat at the same moment is the normal case, not the edge case. Allocation has to settle it in the database, not in the code that asked.',
          ru: 'Двое, занимающие последнее место в одну и ту же секунду, это обычный случай, а не край. Решать его должна база, а не код, который спросил.',
        },
      },
      {
        t: { en: 'A room link only the booked may hold', ru: 'Ссылка в комнату только для записавшихся' },
        d: {
          en: 'The link is the product. It has to reach exactly the people with a seat, at the right moment, and a permanent ban has to be enforced where access is granted rather than where it was requested.',
          ru: 'Ссылка и есть продукт. Она должна дойти ровно до тех, у кого есть место, в нужный момент, а вечный бан обязан срабатывать там, где выдаётся доступ, а не там, где его попросили.',
        },
      },
      {
        t: { en: 'Releasing without dropping anyone', ru: 'Выпускать релиз, никого не уронив' },
        d: {
          en: 'Sessions are live when you deploy. That is why there are 76 test suites and 26 migrations underneath: both counts are countable, and both exist so a release never lands in the middle of somebody’s hour.',
          ru: 'В момент деплоя сессии идут. Поэтому под капотом 76 наборов тестов и 26 миграций: оба числа счётные, и оба существуют, чтобы релиз не пришёлся на середину чьего-то часа.',
        },
      },
    ],
    cta: {
      en: 'Have a product that lives in Telegram?',
      ru: 'Есть продукт, который живёт в Telegram?',
    },
  },
]

export function casePageBySlug(slug: string): CasePage | undefined {
  return CASE_PAGES.find((c) => c.slug === slug)
}

/** Section headings, shared by all four pages. */
export const CP_LABELS = {
  task: { en: 'The task', ru: 'Исходная задача' },
  audience: { en: 'Who for', ru: 'Для кого' },
  difficulties: { en: 'What fought back', ru: 'Что сопротивлялось' },
  did: { en: 'What we built', ru: 'Что сделали' },
  outcome: { en: 'What came of it', ru: 'Что получилось' },
  stack: { en: 'Stack', ru: 'Стек' },
  similar: { en: 'Similar work', ru: 'Похожая работа' },
  other: { en: 'Other work', ru: 'Другие работы' },
  open: { en: 'See it live', ru: 'Посмотреть вживую' },
}
