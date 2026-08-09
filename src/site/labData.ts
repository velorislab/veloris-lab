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
  navCases: { en: 'Cases', ru: 'Кейсы' },
  navProcess: { en: 'Process', ru: 'Как работаем' },
  navCalc: { en: 'Estimate', ru: 'Расчёт' },
  navBureau: { en: 'Bureau', ru: 'О бюро' },
  ctaCalc: { en: 'Price your project', ru: 'Рассчитать проект' },
  cta: { en: 'Discuss your task', ru: 'Обсудить задачу' },
  // The strong CTA names the free thing instead of asking for a generic contact.
  // It is honest: step 01 of PROCESS really is a free costing call that can end
  // the project, so the button only says out loud what already happens.
  ctaFree: { en: 'Get your task scoped free', ru: 'Разобрать задачу бесплатно' },
  viewCases: { en: 'See cases', ru: 'Смотреть кейсы' },
  copied: { en: 'copied', ru: 'скопировано' },
  copyHint: { en: 'Click to copy', ru: 'Нажмите, чтобы скопировать' },
  founderLink: { en: 'About the founder', ru: 'Об основателе' },
  productLink: { en: 'Our product', ru: 'Наш продукт' },
}

export const HERO = {
  h1: {
    en: 'We take the routine off your team and hand it to machines',
    ru: 'Снимаем с команды рутину, которую можно отдать машине',
  },
  sub: {
    en: 'AI agents, integrations and data pipelines. We build the system, ship it to production and keep it running, instead of leaving you with a prototype.',
    ru: 'AI-агенты, интеграции и пайплайны данных. Собираем систему, доводим до прода и поддерживаем, а не оставляем вас с прототипом.',
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
  factsLabel: { en: 'What you get', ru: 'Что вы получаете' },
  facts: [
    { k: { en: 'Price', ru: 'Цена' }, v: { en: 'before we start', ru: 'до старта работ' }, hot: true },
    { k: { en: 'Scoping call', ru: 'Разбор задачи' }, v: { en: 'free', ru: 'бесплатно' }, hot: true },
    { k: { en: 'First reply', ru: 'Первый ответ' }, v: { en: 'same working day', ru: 'в тот же день' }, hot: false },
    { k: { en: 'Shipped projects', ru: 'Проектов сдано' }, v: '15+', hot: false },
    { k: { en: 'Automations built', ru: 'Автоматизаций' }, v: '20+', hot: false },
    { k: { en: 'Own product live', ru: 'Свой продукт в проде' }, v: { en: 'Swiftin, 1000+ users', ru: 'Swiftin, 1000+' }, hot: true },
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

export const SERVICES_LABEL = { en: 'What we take off your team', ru: 'Что снимаем с вашей команды' }
export const SERVICES_SUB = {
  en: 'Six things we do end to end, from the first call to a system your team uses every day.',
  ru: 'Шесть направлений, которые закрываем целиком: от первого звонка до системы, которой команда пользуется каждый день.',
}

/*
 * There is no EYEBROW map any more, and no section label above any heading.
 *
 * There used to be one over every section, each saying its own heading back in
 * mono caps: "What we do" over "What we take off your team", "How it runs" over
 * "How the work runs, step by step". Trimming them to three that carried a
 * count only exposed the next problem, because the counts were already in the
 * paragraph directly underneath: the cases label read "Four projects" over a
 * sentence starting "Four projects we can talk about openly".
 *
 * A heading that needs a label over it is a heading that is not doing its job.
 * Section topic lives in the heading, counts live in the sentence under it.
 */

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
      en: 'When somebody repeats the same chain of steps by hand every day.',
      ru: 'Когда одну и ту же цепочку действий кто-то повторяет руками каждый день.',
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
      en: 'When the data already exists in three systems and only meets inside somebody’s head.',
      ru: 'Когда данные уже есть в трёх системах, а сходятся только в чьей-то голове.',
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
      en: 'When the numbers are right there on screen and there is nowhere to export them from.',
      ru: 'Когда нужные данные видно на экране, а выгрузить их неоткуда.',
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
      en: 'When the answer to «how are we doing» is a spreadsheet somebody assembles by hand.',
      ru: 'Когда на вопрос «как идут дела» отвечают таблицей, которую кто-то собирает руками.',
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
      en: 'When the idea is clear and there is still nothing to put in front of a first customer.',
      ru: 'Когда идея понятна, а показать первому клиенту всё ещё нечего.',
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
      en: 'When it is time to take money, not just collect enquiries.',
      ru: 'Когда пора принимать деньги, а не собирать заявки.',
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
export const CASES_LABEL = { en: 'What we have already built and shipped', ru: 'Что уже собрали и запустили' }
export const CASES_SUB = {
  en: 'Four projects we can talk about openly. Work under NDA is discussed on a call.',
  ru: 'Четыре проекта, о которых можем говорить открыто. Работы под NDA обсуждаем на созвоне.',
}
export const CASE_KEYS = {
  task: { en: 'Task', ru: 'Задача' },
  sol: { en: 'Solution', ru: 'Решение' },
  res: { en: 'Result', ru: 'Результат' },
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
    title: { en: 'Dashboards and analytics', ru: 'Дашборды и аналитика' },
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
      en: 'The team sees key metrics in real time and decides on data instead of guesswork.',
      ru: 'Команда видит ключевые метрики в реальном времени и принимает решения по данным, а не на глаз.',
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

export const PROCESS_LABEL = { en: 'How the work actually goes, step by step', ru: 'Как идёт работа, шаг за шагом' }
export const PROCESS_SUB = {
  en: 'Five steps, in this order. The first one can end the project, and that is the point of it.',
  ru: 'Пять шагов, именно в таком порядке. Первый может закончить проект, и в этом его смысл.',
}

export const PROCESS: Step[] = [
  {
    t: { en: 'Scoping', ru: 'Разбор задачи' },
    d: {
      en: 'We measure what the process costs you today, in hours and in money. If automation will not pay that back, you hear it on the first call.',
      ru: 'Считаем, во что процесс обходится сейчас, в часах и в деньгах. Если автоматизация это не отобьёт, вы услышите об этом на первом созвоне.',
    },
  },
  {
    t: { en: 'Architecture and estimate', ru: 'Архитектура и смета' },
    d: {
      en: 'We show what the system is made of, what it costs and how long it takes, before any code is written.',
      ru: 'Показываем, из чего состоит система, сколько стоит и сколько займёт, до того как написана первая строка.',
    },
  },
  {
    t: { en: 'Build', ru: 'Сборка' },
    d: {
      en: 'We work in iterations, so you watch progress instead of waiting in silence until the deadline.',
      ru: 'Работаем итерациями, вы видите прогресс, а не ждёте в тишине до дедлайна.',
    },
  },
  {
    t: { en: 'Launch', ru: 'Запуск' },
    d: {
      en: 'We deploy on your data and your accounts, then walk your team through using it.',
      ru: 'Ставим на ваши данные и ваши доступы, показываем команде, как этим пользоваться.',
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

export const WHY_LABEL = { en: 'Why this is safe to hand us', ru: 'Почему это можно доверить нам' }
export const WHY_SUB = {
  en: 'Five claims, all of them checkable.',
  ru: 'Пять утверждений, и все можно проверить.',
}

export const WHY: Reason[] = [
  {
    t: { en: 'Our own product in production', ru: 'Свой продукт в проде' },
    d: {
      en: 'Swiftin: 1000+ users, paid subscriptions, live in the Chrome Web Store. We have walked the whole route, not just the client-facing pieces of it.',
      ru: 'Swiftin: 1000+ пользователей, платные подписки, живёт в Chrome Web Store. Мы прошли весь путь, а не только клиентские его куски.',
    },
  },
  {
    t: { en: 'One contractor for the whole chain', ru: 'Один подрядчик на всю цепочку' },
    d: {
      en: 'Architecture, code, infrastructure, payments, launch. Nothing gets lost in a handover between teams.',
      ru: 'Архитектура, код, инфраструктура, платежи, запуск. Ничего не теряется при передаче между командами.',
    },
  },
  {
    t: { en: 'We take the no-API work', ru: 'Берём то, где нет API' },
    d: {
      en: 'Reverse engineering and parsing outside the happy path, and unfamiliar stacks without flinching.',
      ru: 'Реверс-инжиниринг и парсинг вне «счастливого» сценария, и незнакомые стеки без страха.',
    },
  },
  {
    t: { en: 'We finish what we start', ru: 'Доводим до конца' },
    d: {
      en: 'No quitting halfway. We ship it and then we keep it alive.',
      ru: 'Не бросаем на полпути. Запускаем и потом поддерживаем.',
    },
  },
  {
    t: { en: 'Straight about risks', ru: 'Честно про риски' },
    d: {
      en: 'If a task will not fit the deadline or will not pay for itself, you hear that before the work starts, not after.',
      ru: 'Если задача не влезает в срок или не окупается, вы услышите это до начала работ, а не после.',
    },
  },
]

export const BUREAU = {
  label: { en: 'Who is behind this', ru: 'Кто за этим стоит' },
  // The lead describes the bureau, not the man in the photograph, so it reads as
  // the section standfirst rather than as card copy. Moving it out is also what
  // lets the card hold only what a person card should: a name, a role, one
  // paragraph, a row of ways to reach him.
  lead: {
    en: 'Veloris Lab is a small engineering bureau. Small is the feature: nothing is thrown over a wall between departments.',
    ru: 'Veloris Lab, небольшое инженерное бюро. Небольшое, и это преимущество: здесь нечего перебрасывать через забор между отделами.',
  },
  name: { en: 'Denys Kandyba', ru: 'Денис Кандыба' },
  // One string for both locales: the Russian copy uses the English term as-is,
  // and it is a job title rather than a sentence.
  role: 'forward deployed engineer',
  // The clause that used to open this ("Behind it is Denys Kandyba, a forward
  // deployed engineer:") is gone, because the heading and the role line
  // immediately above now say exactly that. Paste it back to revert.
  body: {
    en: 'The same person designs the system, writes it, and picks up the phone when something breaks. First code in 2014, automation from 2023, working with AI full time since 2024.',
    ru: 'Один человек проектирует систему, пишет её и выходит на связь, когда что-то ломается. Первый код в 2014-м, автоматизация с 2023-го, полный день с AI с 2024-го.',
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
  en: 'What you pay for separately',
  ru: 'За что вы платите отдельно',
}
export const SEPARATE_SUB = {
  en: 'These are billed to you by the provider, not by us, and never with a margin on top. The estimate covers the work, not somebody else’s subscription.',
  ru: 'Это счета от провайдеров, а не от нас, и без наценки сверху. Смета покрывает работу, а не чужую подписку.',
}
export const SEPARATE: { k: LS; d: LS }[] = [
  {
    k: { en: 'Hosting and servers', ru: 'Хостинг и серверы' },
    d: {
      en: 'The provider invoices you directly. We do not resell capacity.',
      ru: 'Счёт приходит вам напрямую от провайдера. Мы не перепродаём мощности.',
    },
  },
  {
    k: { en: 'Domain', ru: 'Домен' },
    d: {
      en: 'Registered to your business, not to us. This one matters more than it looks.',
      ru: 'Оформляется на ваш бизнес, а не на нас. Это важнее, чем кажется.',
    },
  },
  {
    k: { en: 'AI model usage', ru: 'Обращения к AI-моделям' },
    d: {
      en: 'Paid per use at the provider’s published rate. We size it before we build.',
      ru: 'Оплата по факту использования, по публичному тарифу провайдера. Объём считаем до сборки.',
    },
  },
  {
    k: { en: 'Payment provider fees', ru: 'Комиссии платёжных систем' },
    d: {
      en: 'A percentage of each transaction, taken by the provider or the network.',
      ru: 'Процент с каждой операции забирает платёжная система или сеть.',
    },
  },
  {
    k: { en: 'Store accounts', ru: 'Аккаунты магазинов' },
    d: {
      en: 'Chrome Web Store, App Store and Google Play each charge a developer fee.',
      ru: 'Chrome Web Store, App Store и Google Play берут свой взнос с разработчика.',
    },
  },
  {
    k: { en: 'Mail and messaging', ru: 'Письма и сообщения' },
    d: {
      en: 'Delivery services bill by volume once you outgrow their free tier.',
      ru: 'Сервисы доставки считают по объёму, как только перерастаете бесплатный лимит.',
    },
  },
]

export const CONTACT = {
  label: { en: 'Contact', ru: 'Контакты' },
  // Names the free deliverable AND the possible negative verdict. Backed by
  // PROCESS step 01, so it promises nothing the process does not already do.
  h: {
    en: 'We will cost your task free and tell you straight whether it pays off',
    ru: 'Посчитаем вашу задачу бесплатно и честно скажем, окупится ли она',
  },
  sub: {
    en: 'Write on Telegram or by email. We usually reply the same working day, timezone UTC+4.',
    ru: 'Напишите в Telegram или на почту. Обычно отвечаем в тот же рабочий день, часовой пояс UTC+4.',
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
export const ENTRY_LABEL = { en: 'You can start from wherever you are', ru: 'Начать можно с любой точки' }
export const ENTRY_SUB = {
  en: 'No finished spec required. Show what you have and we will work from there.',
  ru: 'Готовое ТЗ не нужно. Покажите, что уже есть, и дальше пойдём от этого.',
}
export const ENTRY: { t: LS; d: LS }[] = [
  {
    t: { en: 'There is an idea', ru: 'Есть идея' },
    d: { en: 'We break it down to a first version, pick the one scenario worth building first, and show the price before any code.', ru: 'Разложим её до первой версии, выберем один сценарий, который стоит собрать первым, и покажем цену до кода.' },
  },
  {
    t: { en: 'There is a process, done by hand', ru: 'Есть процесс, но руками' },
    d: { en: 'We count what the manual version costs per month, then say plainly whether automating it pays for itself.', ru: 'Посчитаем, во что ручной вариант обходится в месяц, и прямо скажем, окупится ли автоматизация.' },
  },
  {
    t: { en: 'There is a running system', ru: 'Есть работающая система' },
    d: { en: 'We read the code and the architecture, find the limits, and propose the next release without a rewrite.', ru: 'Прочитаем код и архитектуру, найдём ограничения и предложим следующий релиз без переписывания с нуля.' },
  },
]

/** Stack, grouped. Same set as the founder page, so the two never disagree. */
export const STACK_LABEL = { en: 'We do not sell one stack for every task', ru: 'Не продаём один стек под любую задачу' }
export const STACK_SUB = {
  en: 'The stack follows the task. These are the tools already used in shipped work, not a wish list.',
  ru: 'Стек идёт за задачей. Это инструменты из уже сданных работ, а не список пожеланий.',
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
  ru: 'Короткие ответы. Каждый подтверждается чем-то выше на этой странице.',
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
        en: 'A small bureau. The task is not handed between teams: whoever scoped it takes it to production and stays for support.',
        ru: 'Небольшое бюро. Задача не передаётся между командами: кто её разбирал, тот доводит до прода и остаётся на поддержке.',
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
    en: 'Price it here, before the first call',
    ru: 'Посчитайте цену здесь, до первого созвона',
  },
  sub: {
    // Five, not four: the calculator's own progress line says "Step 1 of 5",
    // and the copy contradicting the control the reader is looking at is worse
    // than either number on its own. STEPS in Calculator.tsx is the source.
    en: 'Five steps. The estimate accounts for the kind of work, what you already have, and what the thing needs inside.',
    ru: 'Пять шагов. Расчёт учитывает тип работы, что у вас уже готово и что понадобится внутри.',
  },
  stepOf: { en: 'Step', ru: 'Шаг' },
  stepOfMid: { en: 'of', ru: 'из' },

  q1: { en: 'What needs building?', ru: 'Что нужно сделать?' },
  q2: { en: 'What do you already have?', ru: 'Что у вас уже есть?' },
  q3: { en: 'What will it need inside?', ru: 'Что понадобится внутри?' },
  q3hint: { en: 'Pick any that apply, or none.', ru: 'Отметьте, что подходит, или ничего.' },
  q4: { en: 'Describe the task in your own words', ru: 'Опишите задачу своими словами' },
  q4ph: {
    en: 'For example: every morning a manager copies orders from email into a spreadsheet and then into the CRM.',
    ru: 'Например: каждое утро менеджер вручную переносит заказы из почты в таблицу, а потом в CRM.',
  },
  q4hint: { en: 'Optional, but it makes the first reply far more useful.', ru: 'Необязательно, но с ним первый ответ будет куда полезнее.' },
  q5: { en: 'Where should we send the estimate?', ru: 'Куда прислать расчёт?' },
  namePh: { en: 'Your name', ru: 'Как вас зовут' },
  contactPh: { en: 'Telegram or email', ru: 'Telegram или почта' },

  back: { en: 'Back', ru: 'Назад' },
  next: { en: 'Next', ru: 'Дальше' },
  restart: { en: 'Start over', ru: 'Начать заново' },

  resultLbl: { en: 'Build', ru: 'Разработка' },
  termLbl: { en: 'Timeline', ru: 'Срок' },
  supportLbl: { en: 'Support', ru: 'Поддержка' },
  perMonth: { en: '/mo', ru: '/мес' },
  weeksShort: { en: 'weeks', ru: 'нед.' },
  waiting: { en: 'Pick the kind of work to see a number', ru: 'Выберите тип работы, чтобы увидеть цифру' },

  // The honest hedge that makes publishing a number safe: it is a floor, and
  // the binding figure comes from the free scoping call that is step 01.
  disclaimer: {
    en: 'A floor, not a quote. The binding figure is fixed after we scope the task, and that scoping is free.',
    ru: 'Это ориентир, а не смета. Точную цифру фиксируем после разбора задачи, а разбор бесплатный.',
  },

  sendTg: { en: 'Send on Telegram', ru: 'Отправить в Telegram' },
  sendMail: { en: 'Send by email', ru: 'Отправить почтой' },
  copied: { en: 'Brief copied. Paste it into the chat.', ru: 'Бриф скопирован. Вставьте его в чат.' },
  mailSubject: { en: 'Veloris Lab, project estimate', ru: 'Veloris Lab, расчёт проекта' },

  // Labels used to assemble the brief that goes into Telegram or the mail body.
  bfTask: { en: 'Task', ru: 'Задача' },
  bfHave: { en: 'Already have', ru: 'Уже есть' },
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
    en: 'Veloris Lab, engineering bureau. AI development, automation and integrations.',
    ru: 'Veloris Lab, инженерное бюро. AI-разработка, автоматизация и интеграции.',
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
