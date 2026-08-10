/* ======================================================================
   Veloris Lab (/lab) content. Edit copy here; the page renders from this.

   Localized fields are objects: { en, ru }. The active language comes from
   the ROUTE segment (English on the bare `/lab`, Russian on `/ru/lab`), not
   from client state, so both languages are separately indexable.

   Every number in this file is a real, verifiable fact. Client logos and
   testimonials are deliberately absent: LOGOS and REVIEWS below are empty
   and their sections do not render until there is genuine material to put
   in them. Do not seed them with placeholders.
   ====================================================================== */

/** Routing locales this page has real copy for. Everything else falls back to `en`. */
export type LabLang = 'en' | 'ru'

/** Localized string: one string for both languages, or per-language variants. */
export type LS = string | { en: string; ru: string }

/** Resolve a localized value for the active language. */
export function tx(v: LS | undefined, lang: LabLang): string {
  if (v == null) return ''
  return typeof v === 'object' ? (v[lang] ?? v.en) : v
}

/** Map a routing locale onto the languages this page actually ships. */
export function pickLabLang(lang: string): LabLang {
  return lang === 'ru' ? 'ru' : 'en'
}

export const BRAND = 'Veloris Lab'
export const EMAIL = 'velorislab@gmail.com'
export const TELEGRAM = 'https://t.me/samweyd'
export const TELEGRAM_HANDLE = 't.me/samweyd'
/** Copied from the founder's own portfolio data, where it is also published in
 *  the page's schema.org `sameAs`. The full slug matters: the shortened
 *  `/in/denys-kandyba` does not resolve. */
export const LINKEDIN = 'https://www.linkedin.com/in/denys-kandyba-721b803a4/'
export const INSTAGRAM = 'https://www.instagram.com/veloris_dev/'
export const SWIFTIN = 'https://swiftin.dev/'

/** The founder's long-form page. Absolute, because it lives on the Swiftin site
 *  and this project is a separate deployment: a bare `/about` here is a 404. */
export const ABOUT_URL = 'https://swiftin.dev/about'

/**
 * Social profiles for the founder card, in the order they are shown.
 *
 * All three are addresses the owner supplied. The row renders only entries with
 * a `url`, which is how it stayed correct while Instagram was still missing.
 * Never guess a profile URL. A wrong link in a contact row is worse than a
 * missing one, because the reader believes it.
 */
export const SOCIAL: { key: 'instagram' | 'telegram' | 'linkedin'; label: string; url: string }[] = [
  { key: 'instagram', label: 'Instagram', url: INSTAGRAM },
  { key: 'telegram', label: 'Telegram', url: TELEGRAM },
  { key: 'linkedin', label: 'LinkedIn', url: LINKEDIN },
]
export const CWS = 'https://chromewebstore.google.com/detail/swiftin/fhfnfmakgcoolkaalffgdijedkdgegad'

/** UI chrome strings. */
export const UI: Record<string, LS> = {
  navServices: { en: 'Services', ru: 'Услуги' },
  navPricing: { en: 'Pricing', ru: 'Цены' },
  navCases: { en: 'Cases', ru: 'Кейсы' },
  navProcess: { en: 'Process', ru: 'Как работаем' },
  navCalc: { en: 'Estimate', ru: 'Расчёт' },
  navBureau: { en: 'Studio', ru: 'О студии' },
  ctaCalc: { en: 'Get the price in a minute', ru: 'Узнать цену за минуту' },
  /**
   * The one button on all 22 routes, and it now names the free thing instead
   * of asking for a generic sales call.
   *
   * There used to be a second string here, `ctaFree`, carrying exactly this
   * idea under a three-line comment about why it was the strong CTA. It was
   * referenced nowhere: `grep -rn ctaFree src/` returned its own definition and
   * nothing else. The unique offer of the whole business existed as dead code.
   * Rather than wire up a second button, this one absorbed it.
   */
  cta: { en: 'Free scoping call', ru: 'Бесплатный разбор' },
  ctaTg: { en: 'Message on Telegram', ru: 'Написать в Telegram' },
  sendMailDirect: { en: 'Write by email', ru: 'Написать на почту' },
  /* Mid-page anchors back to the calculator, so the objection-handling half of
     the page stops being a corridor with no doors. */
  startScoping: { en: 'See the number without sending anything', ru: 'Посмотреть цифру, ничего не отправляя' },
  /* The two halves of the hero's mono line. Both figures are read from
     labPricing at render time; neither is typed anywhere. */
  heroFloor: { en: 'Projects from', ru: 'Проекты от' },
  /** Just the preposition, for the hero cards where the noun is in the caption
   *  underneath rather than in the figure. */
  heroFloorShort: { en: 'from', ru: 'от' },
  heroSpeed: { en: 'first version from', ru: 'первая версия от' },
  moreOn: { en: 'What is included', ru: 'Что входит' },
  readCase: { en: 'How it was built', ru: 'Как это устроено' },
  priceList: { en: 'Open the full price list', ru: 'Открыть полный прайс' },
  founderLink: { en: 'About the founder', ru: 'Об основателе' },
  productLink: { en: 'Our product', ru: 'Наш продукт' },
}

/* The capability word ticker that used to sit under the old hero is not here.
   The template runs its own marquee and PlatformHighlight already drives it with
   our stack, so the strip exists; a second one listing «AI-агенты,
   Автоматизация, Интеграции…» would sit directly above six cards that say the
   same six things with a price and a window attached. Restoring it is a
   thirteen-word array and two lines in AstonHome if that trade ever looks worth
   making. */

export const HERO = {
  /**
   * The headline states the OFFER, not the category.
   *
   * It used to be «Снимаем с команды рутину, которую можно отдать машине»,
   * which describes one of the six things sold here and excludes the two
   * dearest: an MVP and a payments system are not routine coming off a team,
   * and a founder with no team cannot be its subject.
   *
   * What it says now is the one claim this bureau can make that the market
   * leader cannot make better, and it is already true everywhere else on the
   * site: PROCESS[1] fixes the figure «до того как написана первая строка»,
   * the calculator performs it, and /pricing publishes every line the estimator
   * adds rather than only its totals.
   *
   * The last word used to carry a plaque, which is why both locales are written
   * to end on a word worth marking. That component went with the old design;
   * the sentences are better for the constraint and were left alone.
   */
  /**
   * A fixed phrase with one word cycling inside it.
   *
   * `h1` stays as the plain sentence: it is what search engines, the OG tag and
   * a reader with JavaScript disabled get, and it has to be a complete, true
   * sentence on its own. `rotator` is what the hero renders instead when it can.
   *
   * The list is the founder's, with two corrections. Every entry is genitive
   * plural, because «Студия полного цикла мобильное приложение» does not agree;
   * and the English is not a translation of the Russian, it is the phrase an
   * English buyer would search for.
   */
  h1: {
    en: 'Full-cycle development studio for startups',
    ru: 'Студия разработки полного цикла стартапов',
  },
  rotator: {
    /**
     * «Студия разработки полного цикла» plus the GENITIVE, which reverses an
     * earlier call of mine.
     *
     * I had argued that a genitive after this lead chains three of them,
     * разработки / цикла / приложений, and broke the chain with a colon and the
     * nominative. That was over-cautious. «Разработки полного цикла» behaves as
     * one fixed attributive block, and the genitive that follows attaches to
     * «разработки», not to «цикла», which is how the phrase is actually used in
     * the market. The founder asked for it twice; he was right and the colon is
     * gone.
     *
     * Every entry is genitive plural so it agrees with «разработки», and every
     * entry is something this studio actually sells: the six priced WORK_TYPES
     * in labPricing.ts (agent, integr, dash, mvp, billing) plus mobile apps,
     * which are not in the price table but which the founder confirmed we do.
     * Do not add a line here that the price table and the services pages cannot
     * back.
     *
     * English is not a translation, it is the phrase an English buyer searches.
     */
    lead: {
      en: 'Full-cycle development studio for',
      ru: 'Студия разработки полного цикла',
    },
    words: {
      en: [
        'startups',
        'SaaS products',
        'AI agents',
        'mobile apps',
        'backend systems',
        'dashboards and analytics',
        'payment systems',
      ],
      ru: [
        'стартапов',
        'SaaS-продуктов',
        'AI-агентов',
        'мобильных приложений',
        'серверных систем',
        'дашбордов и аналитики',
        'платёжных систем',
      ],
    },
  },
  /**
   * The sub carries PROOF first and the offer second, in that order.
   *
   * It used to list the six services, which is what the rotating word above
   * already says. It then carried the offer alone. The reach figure goes first
   * now because the fold has nothing else standing for competence since the
   * credential badge came out of it, and a number a stranger can weigh does
   * more work in that position than a promise does. The offer still follows in
   * the same breath, because price certainty is the one claim this business can
   * make that the market leader cannot make better, and dropping it would leave
   * the fold selling nothing.
   *
   * THE FIGURE IS THE FOUNDER'S AND IS NOT DERIVED FROM ANYTHING IN THIS REPO.
   * Site data holds one user count, Swiftin's 1000+; ten thousand is the total
   * across everything built here, confirmed by the founder on 2026-08-10. It is
   * the kind of claim a prospect can ask about, so it moves only on their word.
   *
   * The gap in «10 000» is a non-breaking space, so the number cannot be split
   * across two lines.
   */
  /**
   * The three cards under the buttons.
   *
   * They replace a single mono line, «Проекты от $250 · первая версия от 1 нед.»,
   * which said two of these three things in half the space and none of them
   * loudly. Three plates give the fold what a first screen has to answer: what
   * it costs to start (nothing), what it costs to build (the floor), and what it
   * costs to keep (the cheapest support tier).
   *
   * NOT ONE FIGURE IS TYPED HERE. `content.ts` reads all three out of
   * labPricing, so a repricing moves the fold with everything else. Only the
   * words are here.
   */
  marks: {
    freeValue:   { en: 'Free',    ru: 'Бесплатно' },
    freeCap:     { en: 'Scoping the task, with the price and the timeline before we start',
                   ru: 'Разбор задачи, цена и срок до старта' },
    priceCap:    { en: 'Projects end to end, first version in',
                   ru: 'Проекты под ключ, первая версия от' },
    supportCap:  { en: 'Support after launch, for as long as you want it',
                   ru: 'Сопровождение после запуска, сколько нужно' },
  },
  sub: {
    en: 'More than 10,000 people use the products we have built. You know the price and the timeline before we start, and the scoping is free.',
    ru: 'Продуктами, которые мы собрали, пользуются больше 10 000 человек. Цену и срок вы узнаете до старта, разбор задачи бесплатный.',
  },
  /**
   * The facts strip, directly under the dark band. Every row is checkable
   * somewhere else on this page, so the opening proves instead of promising.
   *
   * These used to sit in the hero's right rail while a separate PROOF constant
   * repeated the first three of them word for word in a strip below. The rail
   * is gone, the strip is these, and the duplicate is deleted.
   *
   * `hot` marks the values that carry the accent. Keep it to three or the
   * accent stops meaning anything.
   */
  factsLabel: { en: 'Known in advance', ru: 'Что известно заранее' },
  facts: [
    { k: { en: 'Price', ru: 'Цена' }, v: { en: 'before we start', ru: 'до старта работ' }, hot: true },
    { k: { en: 'Scoping call', ru: 'Разбор задачи' }, v: { en: 'free', ru: 'бесплатно' }, hot: true },
    { k: { en: 'First reply', ru: 'Первый ответ' }, v: { en: 'same working day', ru: 'в тот же рабочий день' }, hot: false },
    { k: { en: 'Projects shipped', ru: 'Проектов сдано' }, v: '15+', hot: false },
    { k: { en: 'Automations built', ru: 'Автоматизаций' }, v: '20+', hot: false },
    /* NOTHING RENDERS THIS ONE any more. It was the hero's credential badge and
       that badge is gone; the claim itself still reaches the reader from the
       Swiftin case page and the services copy. Kept because the indices above
       are referenced positionally and because the fact is true and may want a
       home again, not because it is on screen. */
    { k: { en: 'Own product', ru: 'Свой продукт' }, v: { en: 'Swiftin, 1000+ users', ru: 'Swiftin, 1000+ пользователей' }, hot: true },
  ] as { k: LS; v: LS; hot: boolean }[],
}

export interface Service {
  /** Joins to WORK_TYPES[].key in labPricing. This is the whole reason a card can
   *  show a price without a number ever being typed into a component. */
  key: string
  t: LS
  d: LS
  /** The recognition line. Their scenario catalogue works because a reader finds
   *  their own situation described in it; one sentence per service buys most of
   *  that effect without fifty-six priced entries nobody can maintain. */
  when: LS
}

/* Section headings are written as spoken phrases, not category labels: the page
   says "what we take off your team", not "Services". Nav items stay short, since
   a nav is a set of labels by nature. */

/**
 * Section eyebrows: one word above each heading.
 *
 * THIS REVERSES A DOCUMENTED DECISION, so here is the whole argument.
 *
 * There used to be an eyebrow over every section and it was deleted, correctly.
 * Each one said its own heading back in mono caps: "What we do" over "What we
 * take off your team", "How it runs" over "How the work runs, step by step".
 * Trimming them to the three that carried a count only exposed the next
 * problem, because those counts were already in the paragraph underneath. A
 * heading that needs a label over it is a heading that is not doing its job.
 *
 * That argument stands, and these pass it. They are not the heading restated:
 * every heading here is now a spoken sentence («Поддержка это пятый шаг, а не
 * допродажа», «Это можно проверить без нас», «Каждый инструмент здесь уже был
 * в проде») and not one of them names its own topic. The eyebrow carries the
 * topic so the heading does not have to, which is exactly what buys the
 * heading its voice. On a page this long that word is also the scan layer a
 * reader uses to find the section they came for.
 *
 * The test, if a tenth is ever added: if the eyebrow and its heading could be
 * swapped without loss, the eyebrow is decoration and goes.
 *
 * One or two words, never more. Deliberately NOT above the closing block: a
 * «Контакты» kicker over «Разберём бесплатно и скажем как есть» adds nothing,
 * and that ban was argued once already and has no exceptions.
 */
export const EYEBROW: Record<string, LS> = {
  services: { en: 'Services', ru: 'Услуги' },
  cases: { en: 'Cases', ru: 'Кейсы' },
  entry: { en: 'Starting point', ru: 'Точка входа' },
  calc: { en: 'Estimate', ru: 'Расчёт' },
  process: { en: 'Process', ru: 'Процесс' },
  stack: { en: 'Tools', ru: 'Инструменты' },
  why: { en: 'Proof', ru: 'Доказательства' },
  bureau: { en: 'Studio', ru: 'Студия' },
  faq: { en: 'Questions', ru: 'Вопросы' },
}

/**
 * The blue block under the hero, and its own heading.
 *
 * It first reused CONTACT.h, which put «Разберём бесплатно и скажем как есть»
 * at the top of the page and again at the bottom of it. This line is written
 * for the slot instead, and the three figures underneath are what back it:
 * fifteen projects shipped, twenty automations, four cases still running.
 */
export const MOTTO_TITLE = {
  en: 'We have done this before, and it is still running',
  ru: 'Мы это уже делали, и оно до сих пор работает',
}

/* The old heading, «Что снимаем с вашей команды», echoed the old hero almost
   verbatim AND mislabelled its own grid: dashboards, MVPs and billing are not
   routine coming off a team. */
export const SERVICES_LABEL = { en: 'Six kinds of work. Yours is one of them', ru: 'Шесть направлений. Ваша задача в одном из них' }
/* This described the interface rather than the work: «на каждой карточке то-то и
   то-то» is a caption for a table of contents. A reader who has got this far
   wants to know whether we have done the thing, not how to read the row. */
export const SERVICES_SUB = {
  en: 'Not a price-list line each: every one of these we have taken all the way to production. The card says what people arrive with, what ships, where the price starts and how long the first version runs.',
  ru: 'Это не строчки в прайсе: каждое направление мы доводили до прода. На карточке то, с чем к нам приходят, что в итоге уезжает в прод, с чего начинается цена и сколько идёт первая версия.',
}


/* The ticker under the hero used to be MARQUEE, thirteen capability words kept
   by hand in two languages. It now derives from WORK_TYPES so it carries the six
   floors instead, and a hand-kept list that could disagree with the price table
   is one fewer thing to forget. */

export const SERVICES: Service[] = [
  {
    key: 'agent',
    t: { en: 'AI agents and automation', ru: 'AI-агенты и автоматизация' },
    d: {
      en: 'Autonomous flows that close manual steps end to end, instead of prompting a human to do them.',
      ru: 'Автономные сценарии, которые закрывают ручные шаги целиком, а не подсказывают человеку, что сделать.',
    },
    when: {
      en: 'Every morning somebody opens the same tabs and copies the same fields into the same forms.',
      ru: 'Каждое утро кто-то открывает те же вкладки и переносит те же поля в те же формы.',
    },
  },
  {
    key: 'integr',
    t: { en: 'Integrations and data pipelines', ru: 'Интеграции и пайплайны данных' },
    d: {
      en: 'CRM, webhooks, messengers, APIs and databases wired into one working loop.',
      ru: 'CRM, вебхуки, мессенджеры, API и базы данных, связанные в один рабочий контур.',
    },
    when: {
      en: 'The same order sits in the inbox, in a spreadsheet and in the CRM, and a person reconciles all three.',
      ru: 'Один и тот же заказ лежит в почте, в таблице и в CRM, а сводит всё это человек.',
    },
  },
  {
    key: 'parsing',
    t: { en: 'Parsing and reverse engineering', ru: 'Парсинг и реверс-инжиниринг' },
    d: {
      en: 'We pull data from places with no public API. These are the tasks most teams turn down.',
      ru: 'Достаём данные оттуда, где готового API нет. Это те задачи, от которых обычно отказываются.',
    },
    when: {
      en: 'The numbers are on the screen, there is no export button, and somebody retypes them by hand.',
      ru: 'Цифры видно на экране, кнопки «выгрузить» нет, и кто-то переписывает их руками.',
    },
  },
  {
    key: 'dash',
    t: { en: 'Dashboards and analytics', ru: 'Дашборды и аналитика' },
    d: {
      en: 'Metrics from scattered services on one screen, with filters shaped around how your business thinks.',
      ru: 'Метрики из разных сервисов на одном экране, с фильтрами под то, как думает ваш бизнес.',
    },
    when: {
      en: 'The question «how are we doing» ends in a spreadsheet somebody assembles for half a day.',
      ru: 'Вопрос «как идут дела» упирается в таблицу, которую кто-то собирает полдня.',
    },
  },
  {
    key: 'mvp',
    t: { en: 'MVP and product development', ru: 'MVP и продуктовая разработка' },
    d: {
      en: 'From idea and architecture to live users. We have already taken our own product that whole route.',
      ru: 'От идеи и архитектуры до живых пользователей. Свой продукт мы уже провели этим путём целиком.',
    },
    when: {
      en: 'You have explained the idea ten times over, because there is still nothing to show.',
      ru: 'Идею вы объясняете словами уже десятый раз, потому что показать пока нечего.',
    },
  },
  {
    key: 'billing',
    t: { en: 'Payments and billing', ru: 'Платежи и биллинг' },
    d: {
      en: 'Subscriptions, plans and checkout, crypto included. Idempotent webhooks, not the flaky kind.',
      ru: 'Подписки, тарифы и приём оплаты, включая крипту. Идемпотентные вебхуки, а не «работает через раз».',
    },
    when: {
      en: 'A customer is ready to pay right now, and all you can take is an enquiry.',
      ru: 'Клиент готов заплатить прямо сейчас, а вы можете только принять заявку.',
    },
  },
]

export interface CaseLink {
  label: string
  href: string
  primary: boolean
}

export interface Case {
  title: LS
  sub: LS
  /** Live / in-development badge. The section mixes both, so every card says
      which it is rather than letting the heading imply everything has shipped. */
  status: LS
  live: boolean
  tags: string[]
  task: LS
  sol: LS
  res: LS
  links: CaseLink[]
}

// All four are shipped, so the heading can say so. Each card still carries its
// own status badge; if anything unlaunched is ever added here, soften this line
// back to "built" rather than letting one card make the heading lie.
export const CASES_LABEL = { en: 'Three we built for clients, one for ourselves', ru: 'Три сделали для клиентов, один для себя' }
export const CASES_SUB = {
  en: 'Four projects we can talk about openly. Work under NDA is discussed on a call.',
  ru: 'Четыре проекта, о которых можем говорить открыто. Работы под NDA обсуждаем на созвоне.',
}
export const CASE_KEYS = {
  task: { en: 'Task', ru: 'Задача' },
  sol: { en: 'What we actually built', ru: 'Что собрали в итоге' },
  res: { en: 'What came of it', ru: 'Что из этого вышло' },
}

export const CASES: Case[] = [
  {
    title: 'Swiftin',
    sub: {
      en: 'AI translator for the browser: pages, subtitles, documents and what you type, in 100+ languages.',
      ru: 'AI-переводчик для браузера: страницы, субтитры, документы и то, что вы печатаете, на 100+ языках.',
    },
    status: { en: 'In production', ru: 'В проде' },
    live: true,
    tags: ['TypeScript', 'Next.js', 'Browser extension', 'Node.js', 'LLMs', 'Payments', 'CI/CD'],
    task: {
      en: 'The language barrier slows down reading and communication across the web, and ordinary translators lose tone and context.',
      ru: 'Языковой барьер мешает читать и общаться в вебе, а обычные переводчики теряют тон и контекст.',
    },
    sol: {
      en: 'One extension that translates web pages, selected text, whatever you type in any field, video subtitles and whole documents, with AI voice on top.',
      ru: 'Одно расширение переводит веб-страницы, выделенный текст, то, что вы печатаете в любом поле, субтитры и целые документы, плюс AI-озвучка.',
    },
    res: {
      en: '1000+ users and growing, live in the Chrome Web Store, with a free plan and paid subscriptions.',
      ru: '1000+ пользователей и растёт, живёт в Chrome Web Store, с бесплатным планом и платными подписками.',
    },
    links: [
      { label: 'swiftin.dev', href: SWIFTIN, primary: true },
      { label: 'Chrome Web Store', href: CWS, primary: false },
    ],
  },
  {
    title: { en: 'One screen instead of manual exports', ru: 'Один экран вместо ручных выгрузок' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Custom dashboards with data collection and analytics for business.',
      ru: 'Кастомные дашборды со сбором и аналитикой данных для бизнеса.',
    },
    tags: ['Dashboards', 'SQL', 'Parsing', 'APIs'],
    task: {
      en: 'Business data sat scattered across services and spreadsheets, with no single place to see what was happening.',
      ru: 'Данные бизнеса были разбросаны по сервисам и таблицам, не было единого места, чтобы видеть картину.',
    },
    sol: {
      en: 'Dashboards that pull from APIs, databases and parsers into one place, with metrics, charts and filters built for that business.',
      ru: 'Дашборды, которые собирают данные из API, баз и парсеров в одно место, с метриками, графиками и фильтрами под этот бизнес.',
    },
    res: {
      en: 'The metrics assemble themselves from APIs, databases and parsers on a schedule, and land on one screen.',
      ru: 'Метрики собираются из API, баз и парсеров сами, по расписанию, и сходятся на одном экране.',
    },
    links: [],
  },
  {
    title: { en: '20+ automations on BAS', ru: '20+ автоматизаций на BAS' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Tender parser, marketplace auto-publishing and data collection on Browser Automation Studio.',
      ru: 'Парсер тендеров, автопубликация на маркетплейсы и сбор данных на Browser Automation Studio.',
    },
    tags: ['BAS', 'Tender parser', 'Marketplaces', 'Scraping'],
    task: {
      en: 'The business lost hours every day: hunting tenders by hand, filling product cards on marketplaces, collecting data manually.',
      ru: 'Бизнес ежедневно терял часы: вручную искал тендеры, заполнял карточки товаров на маркетплейсах, собирал данные руками.',
    },
    sol: {
      en: 'A tender parser that monitors platforms and filters by criteria, auto-publishing that fills product cards, plus 20+ other automations.',
      ru: 'Парсер тендеров, который мониторит площадки и фильтрует по критериям, автопубликация карточек товаров, плюс 20+ других автоматизаций.',
    },
    res: {
      en: 'Tenders are found and sorted automatically, cards go live without manual entry, hours of routine disappeared.',
      ru: 'Тендеры находятся и сортируются автоматически, карточки публикуются без ручного ввода, часы рутины исчезли.',
    },
    links: [],
  },
  {
    // Scope and stack read off the project repo on 2026-08-01. Its own planning
    // doc lags reality, so this describes what is actually in the code and live.
    // The client is deliberately not named, and the counts are countable facts
    // (test suites, migrations), never invented usage numbers.
    title: 'Cowee',
    sub: {
      en: 'Telegram bot for group focus sessions: schedule, seats, video rooms and hosts, in two languages.',
      ru: 'Telegram-бот для групповых фокус-сессий: расписание, места, видеокомнаты и ведущие, на двух языках.',
    },
    status: { en: 'Live', ru: 'Работает' },
    live: true,
    tags: ['Python', 'aiogram', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Docker', 'CI/CD', 'Webhooks', 'Video API', 'Mini App', 'i18n'],
    task: {
      en: 'Working alone is hard and shared focus sessions help, but running them by hand does not scale: the schedule, the seats, the room links and the no-shows eat more time than the sessions themselves.',
      ru: 'Работать в одиночку тяжело, и совместные фокус-сессии помогают, но собирать их руками не выходит: расписание, места, ссылки на комнату и те, кто не пришёл, съедают больше времени, чем сами встречи.',
    },
    sol: {
      en: 'The bot runs the whole loop: onboarding in two languages, booking a slot in the visitor own timezone, seat allocation that cannot double-book, reminders before the session, a video room link issued only to those actually booked, a host flow, post-session feedback, complaints with a permanent ban enforced where access is granted, and an admin panel for slots and attendance.',
      ru: 'Бот ведёт весь цикл: онбординг на двух языках, запись на слот в часовом поясе пользователя, выдача мест без двойных броней, напоминания перед сессией, ссылка на видеокомнату только тем, кто действительно записан, сценарий для ведущего, обратная связь после сессии, жалобы с вечным баном, который срабатывает в момент выдачи доступа, и админ-панель со слотами и посещаемостью.',
    },
    res: {
      en: 'Live in Telegram and running sessions. Underneath: 76 test suites and 26 database migrations, so releases ship without dropping people mid-session, plus scheduled jobs for retention and data erasure.',
      ru: 'Живёт в Telegram и проводит сессии. Под капотом 76 наборов тестов и 26 миграций базы, чтобы релизы выходили, не роняя людей посреди сессии, плюс фоновые задачи на хранение и удаление данных.',
    },
    links: [
      { label: 't.me/cowee_focus_bot', href: 'https://t.me/cowee_focus_bot', primary: true },
    ],
  },
]

export interface Step {
  t: LS
  d: LS
}

/* Drops «шаг за шагом», which the sub directly below already carries, and
   names the two real ends instead. That is information rather than filler:
   support being the far end of the process, not an upsell after it, is the
   thing this section is quietly proving. */
export const PROCESS_LABEL = { en: 'Support is step five, not an upsell', ru: 'Поддержка это пятый шаг, а не допродажа' }
export const PROCESS_SUB = {
  en: 'The order matters. The first step can end the project, and that is the point of it.',
  ru: 'Порядок именно такой. Первый шаг может закончить проект, и в этом его смысл.',
}

export const PROCESS: Step[] = [
  {
    t: { en: 'Scoping', ru: 'Разбор' },
    d: {
      en: 'We measure what the process costs you today, in hours and in money. If automation will not pay that back, you hear it on the first call.',
      ru: 'Считаем, во что процесс обходится сейчас, в часах и в деньгах. Если автоматизация это не отобьёт, вы услышите об этом на первом созвоне.',
    },
  },
  {
    t: { en: 'Estimate', ru: 'Смета' },
    d: {
      en: 'We show what the system is made of, what it costs and how long it takes. The estimate is ready before the build starts.',
      ru: 'Показываем, из чего состоит система, сколько она стоит и сколько займёт. Смета готова до начала сборки.',
    },
  },
  {
    t: { en: 'Build', ru: 'Сборка' },
    d: {
      en: 'We work in iterations. You see progress along the way, not on the day of the deadline.',
      ru: 'Идём итерациями. Прогресс видно по ходу, а не в день дедлайна.',
    },
  },
  {
    t: { en: 'Launch', ru: 'Запуск' },
    d: {
      en: 'We deploy on your data and in your accounts, then walk your team through using it.',
      ru: 'Разворачиваем на ваших данных и аккаунтах, потом показываем команде, как этим пользоваться.',
    },
  },
  {
    t: { en: 'Support', ru: 'Поддержка' },
    d: {
      en: 'We stay reachable. A system that breaks a month later is not a result.',
      ru: 'Остаёмся на связи. Система, которая сломалась через месяц, это не результат.',
    },
  },
]

export interface Reason {
  t: LS
  d: LS
}

/**
 * The heading used to be «Почему это можно доверить нам», the only line on the
 * page that begged rather than spoke, and two of the five claims under it were
 * about character rather than about work: «Доводим до конца» and «Честно про
 * риски» are word for word what the agency that already burned this reader had
 * on its own site. A claim about what kind of people we are cannot be checked,
 * so it cannot do the job this block exists to do.
 *
 * The count lives in the sub rather than in the heading, so a sixth entry
 * breaks one string instead of two.
 */
export const WHY_LABEL = { en: 'You can check all of this without us', ru: 'Это можно проверить без нас' }
export const WHY_SUB = {
  en: 'Five claims about what is already done, not about what we are like.',
  ru: 'Пять утверждений о том, что уже сделано, а не о том, какие мы.',
}

export const WHY: Reason[] = [
  {
    t: { en: 'Our own product in production', ru: 'Свой продукт в проде' },
    d: {
      en: 'Swiftin: 1000+ users, paid subscriptions, live in the Chrome Web Store. We have walked the whole route, not only the stretch a contractor usually gets.',
      ru: 'Swiftin: 1000+ пользователей, платные подписки, живёт в Chrome Web Store. Мы прошли весь путь, а не только тот кусок, который обычно достаётся подрядчику.',
    },
  },
  {
    t: { en: 'One contractor for the whole chain', ru: 'Один подрядчик на всю цепочку' },
    d: {
      en: 'Architecture, code, infrastructure, payments, launch. There is no handover between teams, so there is nothing to lose in one.',
      ru: 'Архитектура, код, инфраструктура, платежи, запуск. Передавать между командами нечего, поэтому и терять нечего.',
    },
  },
  {
    t: { en: 'We take the work with no API', ru: 'Берём задачи, где нет API' },
    d: {
      en: 'Reverse engineering and parsing where the source does not want to be read. An unfamiliar stack is not a reason to pass either.',
      ru: 'Реверс-инжиниринг и парсинг там, где источник не хочет, чтобы его читали. Незнакомый стек тоже не повод отказаться.',
    },
  },
  {
    t: { en: 'Four cases out of four still run', ru: 'Четыре кейса из четырёх работают' },
    d: {
      en: 'Swiftin in the Chrome Web Store, Cowee in Telegram, the dashboards and the BAS automations at their clients. Every case above carries its own status.',
      ru: 'Swiftin в Chrome Web Store, Cowee в Telegram, дашборды и автоматизации на BAS у клиентов. У каждого кейса выше стоит свой статус.',
    },
  },
  {
    /* Deliberately NOT the free-scoping sentence, which by now appears in the
       hero sub, PROCESS_SUB, PROCESS[0].d, the FAQ, CALC.disclaimer and
       CONTACT.h. A seventh copy of one promise is not a fifth reason. This
       claim appears nowhere else and takes one click to verify. */
    t: { en: 'The calculator’s own arithmetic is public', ru: 'Арифметика калькулятора открыта' },
    d: {
      en: 'The pricing page shows every line the calculator adds, not just the totals: the floor per kind of work, what finishing the design costs on each, the price of a server and of each feature. It is exactly what the calculator above runs on, so anyone can check it.',
      ru: 'На странице цен лежит каждая строка, которую прибавляет калькулятор, а не только итоговые суммы: нижняя граница по типу работы, цена доделки дизайна на каждом, цена сервера и каждой функции. По ним и считает калькулятор выше, так что сверить может любой.',
    },
  },
]

export const BUREAU = {
  /* WAS «Отвечает один человек, а не отдел», and it went at the founder's call
     when the whole site moved to a team voice. It was a real selling point for a
     small buyer, so this is a trade rather than a fix: what replaces it keeps
     the part that mattered, which was never the headcount but the absence of a
     relay between the person who understood the task and the person who wrote
     the code. */
  label: { en: 'You talk to the people who write the code', ru: 'Вы говорите с теми, кто пишет код' },
  // The lead describes the bureau, not the man in the photograph, so it reads as
  // the section standfirst rather than as card copy. Moving it out is also what
  // lets the card hold only what a person card should: a name, a role, one
  // paragraph, a row of ways to reach him.
  lead: {
    en: 'Veloris Lab is a full-cycle engineering studio. There is nobody standing between you and the people who write the code.',
    ru: 'Veloris Lab, инженерная студия полного цикла. Между вами и людьми, которые пишут код, нет ни одного посредника.',
  },
  name: { en: 'Denys Kandyba', ru: 'Денис Кандыба' },
  // One string for both locales: the Russian copy uses the English term as-is,
  // and it is a job title rather than a sentence.
  role: 'forward deployed engineer',
  // The clause that used to open this ("Behind it is Denys Kandyba, a forward
  // deployed engineer:") is gone, because the heading and the role line
  // immediately above now say exactly that. Paste it back to revert.
  body: {
    en: 'Designs the architecture and writes the code rather than handing tasks down, and is on the call when something breaks. First code in 2014, automation from 2023, AI full time from 2024.',
    ru: 'Проектирует архитектуру и пишет код сам, а не раздаёт задачи вниз, и выходит на связь, когда что-то ломается. Первый код в 2014-м, автоматизация с 2023-го, с 2024-го AI на полный день.',
  },
  // Describes who is in the frame and where, because the place is a fact the
  // table below repeats. Not "a photo of a man", which tells a screen reader
  // nothing it could not guess from the section it is standing in.
  photoAlt: {
    en: 'Denys Kandyba, founder of Veloris Lab, on a street in Batumi',
    ru: 'Денис Кандыба, основатель Veloris Lab, на улице в Батуми',
  },
  // `mono` marks the values that are measured. Numbers are set in the mono voice
  // everywhere on this page; phrases never are, because mono on a list of
  // language names is a costume. The split is declared here, not guessed from
  // the string at render time.
  facts: [
    { k: { en: 'Working languages', ru: 'Языки работы' }, v: { en: 'Russian, Ukrainian, English', ru: 'русский, украинский, английский' }, mono: false },
    { k: { en: 'Base', ru: 'База' }, v: { en: 'Batumi, Georgia, UTC+4', ru: 'Батуми, Грузия, UTC+4' }, mono: false },
    { k: { en: 'Projects delivered', ru: 'Проектов сдано' }, v: '15+', mono: true },
    { k: { en: 'Full time on AI since', ru: 'Полный день с AI с' }, v: '2024', mono: true },
  ],
}

/**
 * Pass-through costs, stated plainly.
 *
 * Their homepage runs this as «Расходники не прячем в цену разработки» and it is
 * the highest-trust thing on their site per line of copy. Nothing here is a
 * number: these bills come from third parties, they move, and a figure quoted on
 * a landing page is a figure that goes stale silently. What matters is WHO the
 * invoice comes from, which is the part people get burned by.
 *
 * The domain line is the one worth keeping even if the section is ever cut. A
 * business that does not own its own domain is the single most common way an
 * agency relationship goes wrong.
 */
export const SEPARATE_LABEL = {
  en: 'These bills do not come from us',
  ru: 'Эти счета придут не от нас',
}
export const SEPARATE_SUB = {
  en: 'The provider invoices you directly. There is no margin on top, because that money never passes through us.',
  ru: 'Их выставляет провайдер, и выставляет напрямую вам. Наценки сверху нет, потому что через нас эти деньги не проходят.',
}
export const SEPARATE: { k: LS; d: LS }[] = [
  {
    k: { en: 'Hosting and servers', ru: 'Хостинг и серверы' },
    d: {
      en: 'We do not resell capacity, so we earn nothing when your bill grows.',
      ru: 'Мощности мы не перепродаём, поэтому на их росте ничего не зарабатываем.',
    },
  },
  {
    k: { en: 'Domain', ru: 'Домен' },
    d: {
      en: 'Registered to your business, never to ours. Of everything here, it is the one line that outlives any contractor.',
      ru: 'Регистрируется на ваш бизнес, а не на нас. Из всего списка это единственная строка, которая переживёт любого подрядчика.',
    },
  },
  {
    k: { en: 'AI model usage', ru: 'Обращения к AI-моделям' },
    d: {
      en: 'Paid per use, at the model\'s published rate. We size the expected volume before we build, so the monthly bill is not a surprise.',
      ru: 'Оплата по факту, по публичному тарифу модели. Ожидаемый объём считаем до сборки, чтобы счёт за месяц не стал новостью.',
    },
  },
  {
    k: { en: 'Payment provider fees', ru: 'Комиссии платёжных систем' },
    d: {
      en: 'The provider or the network takes a percentage of every transaction. This line grows with your revenue; the others here mostly do not.',
      ru: 'Процент с каждой операции забирает платёжная система или сеть. Эта строка растёт вместе с выручкой, в отличие от остальных.',
    },
  },
  {
    k: { en: 'Store accounts', ru: 'Аккаунты магазинов' },
    d: {
      en: 'Chrome Web Store, App Store and Google Play each charge a developer fee. The account is opened for your business, or the app lives under somebody else\'s name.',
      ru: 'Chrome Web Store, App Store и Google Play берут свой взнос с разработчика. Аккаунт заводится на ваш бизнес, иначе приложение живёт под чужим именем.',
    },
  },
  {
    k: { en: 'Mail and messaging', ru: 'Письма и сообщения' },
    d: {
      en: 'Mail delivery services bill by volume once you outgrow the free tier. The mail goes out from your domain, which is why we verify it during setup.',
      ru: 'Сервисы рассылки считают по объёму, как только вы перерастёте бесплатный лимит. Письма уходят с вашего домена, поэтому его и подтверждаем при настройке.',
    },
  },
]

export const CONTACT = {
  label: { en: 'Contact', ru: 'Контакты' },
  // Names the free deliverable AND the possible negative verdict. Backed by
  // PROCESS step 01, so it promises nothing the process does not already do.
  h: {
    en: 'We will scope it free and tell you straight',
    ru: 'Разберём бесплатно и скажем как есть',
  },
  /* "Describe the task in two sentences" is the highest-leverage instruction
     available on a site that deliberately has no form: it replaces the blank
     page a reader faces when they open a chat with a stranger. */
  sub: {
    en: 'Write on Telegram or by email and describe the task in two sentences. There is no form here on purpose. We usually reply the same working day, timezone UTC+4.',
    ru: 'Напишите в Telegram или на почту и опишите задачу в двух предложениях. Формы здесь нет специально. Обычно отвечаем в тот же рабочий день, часовой пояс UTC+4.',
  },
  /* The close handed out a bare address while the calculator two screens up
     had a properly prefilled mailto. Same treatment now, and the body is three
     prompts rather than an empty window. */
  mailDirectSubject: { en: 'Veloris Lab, a task to look at', ru: 'Veloris Lab, задача на разбор' },
  mailDirectBody: {
    en: 'What I need:\n\nWhat we do by hand today:\n\nWhen I need it:',
    ru: 'Что нужно:\n\nЧто сейчас делаем руками:\n\nК какому сроку:',
  },
}

/* ---------------------------------------------------------------------- */

/**
 * Proof strip under the hero. Every line restates a promise the page itself
 * already keeps further down, so none of it is a new claim: the calculator
 * gives the price, PROCESS step 01 is the free scoping, CONTACT states the
 * reply window. Do not add a fourth line unless the page backs it too.
 */
/**
 * Hero diagram. Four stages of a finished automation, animated as a packet
 * travelling down the rail. It replaces the old static spec panel because it
 * shows what the bureau sells without a sentence of explanation.
 */
export const PIPELINE = {
  label: { en: 'What a finished automation looks like', ru: 'Как выглядит собранная автоматизация' },
  nodes: [
    { t: { en: 'Source', ru: 'Источник' }, d: { en: 'Site, CRM, mailbox, marketplace', ru: 'Сайт, CRM, почта, маркетплейс' } },
    { t: { en: 'Agent', ru: 'AI-агент' }, d: { en: 'Reads it, decides, acts', ru: 'Читает, решает, действует' } },
    { t: { en: 'Systems', ru: 'Системы' }, d: { en: 'Database, CRM, payments', ru: 'База, CRM, платежи' } },
    { t: { en: 'You', ru: 'Вы' }, d: { en: 'Telegram, dashboard, report', ru: 'Telegram, дашборд, отчёт' } },
  ],
}

/** Three entry points. They mirror the calculator's readiness question. */
export const ENTRY_LABEL = { en: 'Where to start when there is no spec', ru: 'С чего начать, если ТЗ ещё нет' }
export const ENTRY_SUB = {
  en: 'An idea will do, or a process still done by hand, or a system that already runs. That is what we work from.',
  ru: 'Подойдёт идея, процесс, который пока делают руками, или система, которая уже работает. От этого и пойдём.',
}
/* THREE FUNNELS, NOT ONE, which is the change here.
   Each of these used to be a title and a paragraph, and the whole section ended
   on the single CTA in the panel beside it. A reader who recognises themselves
   in the third card has to scroll past the other two to act. Each now carries
   the situation it answers, as a numbered label, and its own button. Two point
   at the calculator and one at the conversation, because a running system is not
   something a calculator can price and saying otherwise would waste the click. */
export const ENTRY: { state: LS; t: LS; d: LS; cta: LS; href: string }[] = [
  {
    state: { en: 'You have an idea', ru: 'Есть идея' },
    t: { en: 'We turn the idea into an estimate', ru: 'Соберём смету прямо из идеи' },
    d: { en: 'So far there is only an idea. One short call, and you have one scenario for the first version, its price and its window.', ru: 'Пока есть только идея. Короткий созвон, и у вас на руках один сценарий первой версии, его цена и срок.' },
    cta: { en: 'Price the first version', ru: 'Посчитать первую версию' },
    href: '#estimate',
  },
  {
    state: { en: 'You have a process', ru: 'Есть процесс' },
    t: { en: 'We work out whether it pays for itself', ru: 'Посчитаем, окупится ли автоматизация' },
    d: { en: 'The process already runs, but by hand. We turn the hours into money and say plainly when automating is not worth it.', ru: 'Процесс уже идёт, но руками. Переводим часы в деньги и прямо говорим, когда автоматизировать не стоит.' },
    cta: { en: 'Work out the payback', ru: 'Посчитать окупаемость' },
    href: '#estimate',
  },
  {
    state: { en: 'You have a product', ru: 'Есть продукт' },
    t: { en: 'We plan the next release, no rewrite', ru: 'Предложим релиз без переписывания' },
    d: { en: 'The system already runs. We read the code and the architecture, find where it hits a ceiling, and plan what ships next.', ru: 'Система уже работает. Читаем код и архитектуру, находим, во что она упирается, и планируем следующий релиз.' },
    cta: { en: 'Have the code looked at', ru: 'Показать код на разбор' },
    href: '#contact',
  },
]

/* THE MODEL OF WORK, three facts under the stack.
   A competitor closes their stack section on exactly this and it is the right
   place for it: a reader who has just been shown a hundred and sixty
   technologies is one step from wondering what any of it costs to be tied to.
   Two of these are published elsewhere on the site and read from the price
   table. The third is a contract term, not a figure. */
export const WORK_MODEL_LABEL = {
  en: 'We do not sell an unknown number of hours',
  ru: 'Мы не продаём неизвестное количество часов',
}
export const WORK_MODEL: { k: LS; v: LS }[] = [
  { k: { en: 'Budget', ru: 'Бюджет' }, v: { en: 'before we start', ru: 'до старта работ' } },
  { k: { en: 'Support', ru: 'Поддержка' }, v: { en: '__SUPPORT__', ru: '__SUPPORT__' } },
  { k: { en: 'Code and accounts', ru: 'Код и аккаунты' }, v: { en: '100% yours', ru: '100% ваши' } },
]

/** Stack, grouped. Same set as the founder page, so the two never disagree. */
/* The heading had to change with the list under it. «Каждый инструмент здесь
   уже был в проде» was true of twelve tools and is not true of a capability map,
   and a heading that overclaims by one word discredits the whole section. What
   replaces it is the actual position: the stack is chosen per task. */
export const STACK_LABEL = { en: 'We do not sell one stack for every job', ru: 'Мы не продаём один стек на все задачи' }
/* The lead has to carry the framing, because the list is long enough that a
   reader will otherwise assume half of it is decoration. Two claims, both true:
   every entry is running in Swiftin, Cowee or this site, and the list is not a
   fence. The second half is the same position a competitor's stack page opens
   on, and it is the right one: a studio that only builds in its favourite
   framework is choosing for itself, not for the product. */
export const STACK_SUB = {
  en: 'Full cycle, and that is meant literally: a landing page one week and a product with a server, payments and two mobile platforms the next. We choose by deadline, by load, by what your team can maintain and by what it costs to keep alive in a year. If you already have a codebase, we continue it rather than quoting you a rewrite.',
  ru: 'Полный цикл, и это буквально: на одной неделе лендинг, на другой продукт с сервером, платежами и двумя мобильными платформами. Выбираем по сроку, по нагрузке, по тому, что сможет поддерживать ваша команда, и по тому, сколько это будет стоить держать живым через год. Если код уже есть, мы его продолжаем, а не продаём вам переписывание с нуля.',
}
/* There is no STACK array any more.
 *
 * It held six groups and twenty-eight chips, was exported, and was imported by
 * nothing: ToolGrid renders TOOLS instead. The plan drawn from the competitor
 * teardown proposed reviving it and retiring the grid, and reading the two side
 * by side says the opposite. Every one of the twelve entries in TOOLS carries a
 * note saying where we actually used it; not one of the twenty-eight chips
 * carried anything, and several were capabilities rather than tools.
 *
 * Twelve sourced names beat twenty-eight unsourced ones, and provenance is the
 * one claim a bureau of this size can make that a larger studio cannot. Padding
 * the list to look broader would also have implied a team that does not exist.
 */


/**
 * Tool grid under the stack heading.
 *
 * These are TOOLS WE BUILD WITH, not clients. The bordered-grid pattern is
 * borrowed from logo-cloud layouts, but a bureau with no client logos must not
 * borrow the meaning with it: putting somebody else's mark in a grid on this
 * page would read as "they hired us". Every entry below is used in Swiftin,
 * Cowee, or this site itself, and `note` says where, so the claim is checkable.
 *
 * `logo` is intentionally absent. Add an SVG path per entry to switch a cell
 * from a wordmark to a real mark; the component renders either.
 */
export interface Tool {
  name: string
  note: LS
  logo?: string
}

/* =============================================================================
   THE STACK.

   WHAT THIS PAGE CLAIMS, because it is not the same claim the case pages make
   and the difference is the whole design of this file.

   A case page says «we built this, here is the result» and is answerable to a
   repository. This list says «this is what we work with and choose from», which
   is a claim about capability. Every studio's stack page is that second kind,
   including the competitor this one is modelled on, whose page opens by saying
   they do not force a product to live in the studio's favourite framework and
   will either continue your code or pick by deadline, load, team and cost of
   ownership. That framing is what lets such a list be long.

   So: the lists below are what we take on. The proof that we ship rather than
   list is elsewhere on the site and stays specific — a browser extension in two
   stores, card and crypto billing in production, a Telegram product with tests
   and migrations, this site. Those never move to match a stack list.

   TWO THINGS DELIBERATELY LEFT OUT. 1С and the Russian accounting circuit,
   because this studio prices in dollars for an international buyer and that
   domain is a different business, not a checkbox. And no framework is listed
   twice across groups just to make a group look fuller.
   ========================================================================== */

export interface StackGroup {
  key: string
  /** The small label above the title. */
  kicker: LS
  title: LS
  /** One sentence on what we do with this group, in the team's voice. */
  lead: LS
  items: string[]
}

export const STACK_GROUPS: StackGroup[] = [
  {
    key: 'web',
    kicker: { en: 'Web interfaces', ru: 'Веб-интерфейсы' },
    title: { en: 'From a landing page to a working product', ru: 'От лендинга до рабочего продукта' },
    lead: {
      en: 'A page that has to load fast and a product interface that has to hold state are different jobs, and we pick differently for each.',
      ru: 'Страница, которая обязана быстро открываться, и интерфейс, который держит состояние, это разные задачи, и выбираем мы под каждую отдельно.',
    },
    items: [
      'TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Svelte',
      'SvelteKit', 'Astro', 'Angular', 'SolidJS', 'Remix', 'Preact',
      'Tailwind CSS', 'SCSS', 'CSS Modules', 'Web Components', 'htmx',
      'Vite', 'Webpack', 'Storybook',
    ],
  },
  {
    key: 'api',
    kicker: { en: 'Servers and APIs', ru: 'Серверы и API' },
    title: { en: 'Everything that has to stay up', ru: 'Всё, что должно стоять и не падать' },
    lead: {
      en: 'Validation, auth, limits and structured logs go in with the first endpoint, not in a hardening sprint after the first incident.',
      ru: 'Валидация, авторизация, лимиты и структурные логи ставятся вместе с первым эндпоинтом, а не отдельным спринтом после первого инцидента.',
    },
    items: [
      'Node.js', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Kotlin', 'C#',
      '.NET', 'PHP', 'Express', 'NestJS', 'Fastify', 'Hono', 'FastAPI',
      'Django', 'Flask', 'Laravel', 'Spring Boot', 'Ktor', 'Actix', 'Gin',
      'Bun', 'Deno', 'REST', 'GraphQL', 'gRPC', 'WebSocket', 'очереди', 'cron',
    ],
  },
  {
    key: 'native',
    kicker: { en: 'Native mobile', ru: 'Нативная мобильная разработка' },
    title: { en: 'When the platform itself is the point', ru: 'Когда нужна сама платформа' },
    lead: {
      en: 'Camera, background work, health data, offline and in-app purchases are the reasons to go native, and they are the reasons we do.',
      ru: 'Камера, фоновые процессы, данные здоровья, офлайн и встроенные покупки это причины идти в натив, и мы идём туда за ними.',
    },
    items: [
      'Swift', 'SwiftUI', 'UIKit', 'Core ML', 'StoreKit', 'HealthKit',
      'CloudKit', 'PDFKit', 'Vision', 'Kotlin', 'Jetpack Compose',
      'Coroutines', 'Room', 'WorkManager', 'CameraX', 'Google Play Billing',
      'App Store Connect', 'Google Play Console',
    ],
  },
  {
    key: 'cross',
    kicker: { en: 'One codebase, two stores', ru: 'Один код, два магазина' },
    title: { en: 'When two native teams are not worth it', ru: 'Когда две нативные команды не окупаются' },
    lead: {
      en: 'Most products do not need two codebases. We say so when that is true, and we say the opposite when the platform work is the product.',
      ru: 'Большинству продуктов две кодовые базы не нужны. Мы говорим это прямо, и так же прямо говорим обратное, когда именно платформенная работа и есть продукт.',
    },
    items: [
      'Flutter', 'Dart', 'React Native', 'Expo', 'Expo Router',
      'Kotlin Multiplatform', 'Compose Multiplatform', 'Capacitor', 'Ionic',
      'Tauri', 'Electron',
    ],
  },
  {
    key: 'data',
    kicker: { en: 'Data and storage', ru: 'Данные и хранение' },
    title: { en: 'Chosen for the query, not out of habit', ru: 'Выбираем под запрос, а не по привычке' },
    lead: {
      en: 'Transactions, analytics, search, cache and vectors are five different problems, and putting all five in one database is how a product gets slow.',
      ru: 'Транзакции, аналитика, поиск, кэш и векторы это пять разных задач, и попытка решить все пять одной базой это то, как продукт становится медленным.',
    },
    items: [
      'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'ClickHouse', 'MongoDB',
      'Elasticsearch', 'OpenSearch', 'pgvector', 'Qdrant', 'S3',
      'Supabase', 'Firebase', 'Prisma', 'SQLAlchemy', 'Alembic',
      'Row Level Security', 'миграции', 'резервные копии',
    ],
  },
  {
    key: 'ai',
    kicker: { en: 'AI inside the product', ru: 'AI внутри продукта' },
    title: { en: 'Models doing work, not models in a demo', ru: 'Модели, которые работают, а не показываются' },
    lead: {
      en: 'A model in production needs token accounting, retries, a fallback route and a bill that does not surprise anyone. That part is the work.',
      ru: 'Модель в проде это учёт токенов, повторы, запасной маршрут и счёт, который никого не удивит в конце месяца. Вот это и есть работа.',
    },
    items: [
      'OpenAI API', 'Anthropic API', 'Google Gemini API', 'OpenRouter',
      'RAG', 'эмбеддинги', 'векторный поиск', 'tool calling', 'стриминг',
      'распознавание речи', 'синтез речи', 'компьютерное зрение',
      'Ollama', 'локальные модели', 'учёт токенов', 'запасные маршруты',
    ],
  },
  {
    key: 'pay',
    kicker: { en: 'Payments and billing', ru: 'Платежи и биллинг' },
    title: { en: 'Cards and crypto, both in production', ru: 'Карты и крипта, обе в проде' },
    lead: {
      en: 'Subscriptions, plan changes with proration, and webhooks written so a repeated delivery never charges anyone twice.',
      ru: 'Подписки, смена тарифа с пересчётом и вебхуки, написанные так, что повторная доставка не спишет дважды.',
    },
    items: [
      'Paddle', 'Stripe', 'NOWPayments', 'криптоплатежи', 'подписки',
      'пересчёт при смене тарифа', 'идемпотентные вебхуки',
      'проверка подписи', 'инвойсы', 'налоги и MoR', 'пробные периоды',
    ],
  },
  {
    key: 'ext',
    kicker: { en: 'Browser extensions', ru: 'Расширения браузера' },
    title: { en: 'The part most studios turn down', ru: 'То, от чего обычно отказываются' },
    lead: {
      en: 'A published extension on the current manifest, in two stores, with the injection and permission model that comes with it. Few studios list this because few have done it.',
      ru: 'Опубликованное расширение на актуальном манифесте, в двух магазинах, со всей моделью внедрения и разрешений. Это редко где написано, потому что это редко кто делал.',
    },
    items: [
      'Chrome Manifest V3', 'WebExtensions', 'Firefox Add-ons', 'service worker',
      'content scripts', 'MAIN world', 'Chrome Web Store', 'AMO', 'crxjs',
      'нативные сообщения',
    ],
  },
  {
    key: 'ops',
    kicker: { en: 'Infrastructure', ru: 'Инфраструктура' },
    title: { en: 'Deployed, watched, and yours', ru: 'Развёрнуто, под присмотром и ваше' },
    lead: {
      en: 'Automatic builds, monitoring that reaches a phone, and everything running in your own cloud accounts rather than ours.',
      ru: 'Автоматические сборки, мониторинг, который доходит до телефона, и всё это в ваших облачных аккаунтах, а не в наших.',
    },
    items: [
      'Docker', 'Kubernetes', 'Terraform', 'Nginx', 'Cloudflare', 'AWS',
      'Hetzner', 'DigitalOcean', 'Vercel', 'Railway', 'GitHub Actions',
      'CI/CD', 'Sentry', 'Prometheus', 'Grafana', 'OpenTelemetry', 'PostHog',
      'мониторинг', 'резервное копирование',
    ],
  },
  {
    key: 'qa',
    kicker: { en: 'Quality and security', ru: 'Качество и безопасность' },
    title: { en: 'Checked before it reaches anyone', ru: 'Проверено до того, как это увидят' },
    lead: {
      en: 'A suite that has to be green before a release goes out, and the security work that is cheaper before launch than after a breach.',
      ru: 'Набор тестов, который обязан быть зелёным до выкладки, и та работа по безопасности, которая до запуска стоит дешевле, чем после утечки.',
    },
    items: [
      'Vitest', 'Jest', 'Playwright', 'Cypress', 'pytest', 'TypeScript strict',
      'ESLint', 'OWASP', 'rate limiting', 'JWT', 'OAuth 2.0', '2FA',
      'шифрование', 'аудит доступа',
    ],
  },
]

export const TOOLS: Tool[] = [
  { name: 'TypeScript', note: { en: 'Swiftin, this site', ru: 'Swiftin, этот сайт' } },
  { name: 'React', note: { en: 'Swiftin, this site', ru: 'Swiftin, этот сайт' } },
  { name: 'Next.js', note: { en: 'Swiftin, this site', ru: 'Swiftin, этот сайт' } },
  { name: 'Node.js', note: { en: 'Swiftin backend', ru: 'Бэкенд Swiftin' } },
  { name: 'Python', note: { en: 'Cowee', ru: 'Cowee' } },
  { name: 'PostgreSQL', note: { en: 'Swiftin, Cowee', ru: 'Swiftin, Cowee' } },
  { name: 'Supabase', note: { en: 'Swiftin auth and data', ru: 'Авторизация и данные Swiftin' } },
  { name: 'Docker', note: { en: 'Cowee deploy', ru: 'Деплой Cowee' } },
  { name: 'Vercel', note: { en: 'Swiftin web', ru: 'Веб Swiftin' } },
  { name: 'Railway', note: { en: 'Swiftin backend', ru: 'Бэкенд Swiftin' } },
  { name: 'Telegram', note: { en: 'Cowee, our inbox', ru: 'Cowee, наши заявки' } },
  { name: 'Playwright', note: { en: 'Our own testing', ru: 'Наше тестирование' } },
]

/* ---------------------------------------------------------------------- */

/**
 * FAQ.
 *
 * Every answer here is backed by something else on this page: the calculator,
 * the process steps, the entry points, the cases, or the bureau facts. That is
 * the admission test. Questions whose honest answer is a commercial term the
 * bureau has not fixed yet (contract, deposit, guarantees, code ownership,
 * what happens if a deadline slips, hourly vs fixed) are deliberately absent
 * rather than answered with a plausible invention.
 */
export const FAQ_LABEL = { en: 'What people ask before the first call', ru: 'О чём спрашивают до первого созвона' }
export const FAQ_SUB = {
  en: 'Short answers. Each one is backed by something further up this page.',
  ru: 'Короткие ответы. За каждым стоит что-то выше на этой странице.',
}

export interface FaqItem { q: LS; a: LS }

/** Two rows, scrolled in opposite directions. */
export const FAQ: FaqItem[][] = [
  [
    {
      q: { en: 'How much will it cost?', ru: 'Сколько это будет стоить?' },
      a: {
        en: 'The price is known before work starts. The calculator above gives the floor; the binding figure is fixed after we scope the task.',
        ru: 'Цена известна до начала работ. Калькулятор выше даёт ориентир, точную цифру фиксируем после разбора задачи.',
      },
    },
    {
      q: { en: 'What if it will not pay off?', ru: 'А если это не окупится?' },
      a: {
        en: 'You hear that on the first call. The scoping is free and it can end with us saying the automation is not worth building.',
        ru: 'Вы услышите об этом на первом созвоне. Разбор бесплатный, и он может закончиться тем, что автоматизацию делать не стоит.',
      },
    },
    {
      q: { en: 'Do we need a finished spec?', ru: 'Нужно ли готовое ТЗ?' },
      a: {
        en: 'No. You can start from an idea, from a process that is currently done by hand, or from a system that already runs.',
        ru: 'Нет. Начать можно с идеи, с процесса, который сейчас делается руками, или с уже работающей системы.',
      },
    },
    {
      q: { en: 'Who actually does the work?', ru: 'Кто именно будет делать?' },
      a: {
        en: 'A small studio. The task is not handed between teams: whoever scoped it takes it to production and stays for support.',
        ru: 'Небольшая студия. Задача не передаётся между командами: кто её разбирал, тот доводит до прода и остаётся на поддержке.',
      },
    },
    {
      q: { en: 'How fast do you reply?', ru: 'Как быстро отвечаете?' },
      a: {
        en: 'Usually the same working day. Timezone UTC+4.',
        ru: 'Обычно в тот же рабочий день. Часовой пояс UTC+4.',
      },
    },
  ],
  [
    {
      q: { en: 'Will you work with our stack?', ru: 'Будете работать с нашим стеком?' },
      a: {
        en: 'The stack follows the task. The grid above is what we already ship with, not a closed list.',
        ru: 'Стек идёт за задачей. Сетка выше показывает то, на чём мы уже возим в прод, а не закрытый список.',
      },
    },
    {
      q: { en: 'What happens after launch?', ru: 'Что происходит после запуска?' },
      a: {
        en: 'Support. It is step 05 of the process, not an upsell bolted on at the end.',
        ru: 'Поддержка. Это пятый шаг в разделе о работе, а не допродажа в конце.',
      },
    },
    {
      q: { en: 'Can we see what you have built?', ru: 'Можно посмотреть, что вы делали?' },
      a: {
        en: 'Four cases above, each with the task, the solution and the result. Work under NDA is discussed on a call.',
        ru: 'Четыре кейса выше, у каждого задача, решение и результат. Работы под NDA обсуждаем на созвоне.',
      },
    },
    {
      q: { en: 'What languages do you work in?', ru: 'На каких языках работаете?' },
      a: {
        en: 'Russian, Ukrainian and English.',
        ru: 'Русский, украинский и английский.',
      },
    },
    {
      q: { en: 'How do we start?', ru: 'С чего начать?' },
      a: {
        en: 'Write on Telegram or by email, or run the calculator and send the brief it assembles. Either way the first step is the free scoping.',
        ru: 'Напишите в Telegram или на почту, либо пройдите калькулятор и отправьте собранный им бриф. В любом случае начнём с бесплатного разбора.',
      },
    },
  ],
]

/** Calculator copy. The numbers it works on live in labPricing.ts. */
export const CALC = {
  label: {
    en: 'Price it yourself, right here',
    ru: 'Посчитайте цену сами, прямо здесь',
  },
  sub: {
    // Five, not four: the calculator's own progress line says "Step 1 of 5",
    // and the copy contradicting the control the reader is looking at is worse
    // than either number on its own. STEPS in Calculator.tsx is the source.
    en: 'Five steps, and you can see the number without leaving a contact. The estimate accounts for the kind of work, what you already have and what it will need inside.',
    ru: 'Пять шагов, и увидеть цифру можно без контактов. Расчёт учитывает тип работы, что у вас уже готово и что понадобится внутри.',
  },
  stepOf: { en: 'Step', ru: 'Шаг' },
  stepOfMid: { en: 'of', ru: 'из' },

  q1: { en: 'What needs building?', ru: 'Что нужно сделать?' },
  /* Step 2 asks about the DESIGN now, not about readiness in general.
     «Что у вас уже есть?» went with the x1.2/x1.0/x0.8 multiplier it fed. The
     replacement is narrower on purpose: finishing a design is a specific,
     costable piece of work, and the number it adds depends on the product. */
  qDesign: { en: 'What state is the design in?', ru: 'В каком состоянии дизайн?' },
  qDesignHint: {
    en: 'A finished design adds nothing. Anything unfinished is a line in the estimate.',
    ru: 'Готовый дизайн не добавляет ничего. Всё незаконченное становится строкой в смете.',
  },
  /* Step 3. Only asked when the chosen type does not already imply a server;
     when it does, `serverIncluded` says so instead of offering a choice that
     would charge twice for the same thing. */
  qServer: { en: 'Does it need a server of its own?', ru: 'Нужен свой сервер?' },
  qServerHint: {
    en: 'Accounts, saved data, an API of your own, anything that has to keep running.',
    ru: 'Аккаунты, сохранённые данные, свой API, всё, что должно работать постоянно.',
  },
  serverYes: { en: 'Yes, it needs one', ru: 'Да, нужен' },
  serverNo: { en: 'No, front end only', ru: 'Нет, только интерфейс' },
  serverIncluded: {
    en: 'This kind of work is server work, so it is already in the figure.',
    ru: 'Эта работа и есть серверная, так что сервер уже в цифре.',
  },
  q3: { en: 'What will it need inside?', ru: 'Что понадобится внутри?' },
  q3hint: { en: 'Pick any that apply, or none.', ru: 'Отметьте, что подходит, или ничего.' },
  q4: { en: 'Describe the task in your own words', ru: 'Опишите задачу своими словами' },
  q4ph: {
    en: 'For example: every morning a manager copies orders from email into a spreadsheet and then into the CRM.',
    ru: 'Например: каждое утро менеджер вручную переносит заказы из почты в таблицу, а потом в CRM.',
  },
  q4hint: { en: 'Optional, but it makes the first reply far more useful.', ru: 'Необязательно, но с ним первый ответ будет куда полезнее.' },
  q5: { en: 'Add yourself to the brief, if you like', ru: 'Добавьте себя в бриф, если хотите' },
  q5hint: {
    en: 'The name and the contact are just added to the text you send yourself. Nothing is stored here and nothing goes anywhere without you.',
    ru: 'Имя и контакт просто добавятся в текст, который вы отправите сами. Здесь ничего не сохраняется и ничего не уходит без вас.',
  },
  namePh: { en: 'Your name', ru: 'Как вас зовут' },
  contactPh: { en: 'Telegram or email', ru: 'Telegram или почта' },

  /* The estimate panel used to contain no interactive node at all: the reader
     self-qualified, self-priced, formed intent, and hit a dead end. */
  jumpSend: { en: 'Send this estimate', ru: 'Отправить этот расчёт' },

  back: { en: 'Back', ru: 'Назад' },
  next: { en: 'Next', ru: 'Дальше' },
  restart: { en: 'Start over', ru: 'Начать заново' },

  resultLbl: { en: 'Build', ru: 'Разработка' },
  termLbl: { en: 'Timeline', ru: 'Срок' },
  supportLbl: { en: 'Support', ru: 'Поддержка' },
  perMonth: { en: '/mo', ru: '/мес' },
  weeksShort: { en: 'weeks', ru: 'нед.' },
  /* English needs a singular; Russian «нед.» is an abbreviation and does not.
     The hero's floor line reads the shortest window on the price table, which
     is one week today, so without this it printed "1 weeks". */
  weekShortOne: { en: 'week', ru: 'нед.' },
  waiting: { en: 'Pick the kind of work to see a number', ru: 'Выберите тип работы, чтобы увидеть цифру' },

  // The honest hedge that makes publishing a number safe: it is a floor, and
  // the binding figure comes from the free scoping call that is step 01.
  disclaimer: {
    en: 'A floor, not a quote. The binding figure is fixed after we scope the task, and that scoping is free.',
    ru: 'Это ориентир, а не смета. Точную цифру фиксируем после разбора задачи, а разбор бесплатный.',
  },

  sendTg: { en: 'Send on Telegram', ru: 'Отправить в Telegram' },
  sendMail: { en: 'Send by email', ru: 'Отправить почтой' },
  mailSubject: { en: 'Veloris Lab, project estimate', ru: 'Veloris Lab, расчёт проекта' },

  // Labels used to assemble the brief that goes into Telegram or the mail body.
  /* The breakdown under the figure. `labPricing.estimate()` returns the shape of
     each line and no words, because that file is imported by the metadata
     builder and by llms.txt and has no business knowing the locale. */
  fxDesign: { en: 'design to finish', ru: 'доделать дизайн' },
  fxServer: { en: 'server and database', ru: 'сервер и база данных' },
  fxFeatures: { en: 'features chosen', ru: 'выбранные функции' },
  fxHigh: { en: 'heavier product scenarios', ru: 'повышенная сложность сценариев' },
  fxSome: { en: 'extra product complexity', ru: 'дополнительная сложность' },
  breakdownLbl: { en: "What is in the figure", ru: 'Из чего цифра' },
  /* Their calculator downgrades its own confidence until the reader has written
     something, which is a good way of asking for detail without a required
     field. Eighty characters is their threshold too. */
  roughLbl: { en: 'preliminary, describe the task to firm it up', ru: 'предварительно, опишите задачу и станет точнее' },
  firmLbl: { en: 'based on what you described', ru: 'с учётом вашего описания' },
  bfTask: { en: 'Task', ru: 'Задача' },
  bfHave: { en: 'Design', ru: 'Дизайн' },
  bfServer: { en: 'Own server', ru: 'Свой сервер' },
  bfYes: { en: 'yes', ru: 'да' },
  bfNo: { en: 'no', ru: 'нет' },
  bfNeeds: { en: 'Needs inside', ru: 'Нужно внутри' },
  bfDesc: { en: 'Description', ru: 'Описание' },
  bfEstimate: { en: 'Calculator estimate', ru: 'Расчёт калькулятора' },
  bfFrom: { en: 'from', ru: 'от' },
  bfNone: { en: 'nothing selected', ru: 'ничего не выбрано' },
  bfName: { en: 'Name', ru: 'Имя' },
  bfContact: { en: 'Contact', ru: 'Связь' },

  draftNotice: {
    en: 'Draft rates. These numbers are placeholders, not an offer: replace them in labPricing.ts and set PRICING_IS_DRAFT to false.',
    ru: 'Черновой прайс. Эти числа заглушки, а не предложение: замените их в labPricing.ts и поставьте PRICING_IS_DRAFT в false.',
  },
}

export const FOOTER = {
  line: {
    en: 'Veloris Lab, an engineering studio. The number comes first, then the work.',
    ru: 'Veloris Lab, инженерная студия. Сначала цифра, потом работа.',
  },
}

/**
 * Client logos. Empty on purpose: the section renders only when there are real,
 * permitted logos to show. Shape: { name, src, alt }.
 */
export const LOGOS: { name: string; src: string; alt: string }[] = []

/**
 * Client testimonials. Empty on purpose: never seed this with invented quotes.
 * Shape: { quote: LS, author, role: LS, company }.
 */
export const REVIEWS: { quote: LS; author: string; role: LS; company: string }[] = []
