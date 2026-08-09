/* ======================================================================
   Copy for the six service pages, /services/<slug> and /ru/services/<slug>.

   Separate from labData.ts on purpose. That file is the home page and is
   already long; this one grows with the routes, and keeping them apart is
   what stops either becoming the file nobody wants to open.

   NOT IN HERE: prices, week windows and support figures. Those live in
   labPricing.ts and are read at render time. A page that states a number is
   a page that will disagree with the calculator the first time the table
   moves, and there are twelve of these pages.
   ====================================================================== */

import type { LS } from './labData'

export interface ServicePage {
  /** URL segment. Also the join to WORK_TYPES.key and SERVICES.key. */
  slug: string
  key: string
  /** Two mono tokens above the h1, in the reference's `04 / Web` register. */
  category: LS
  /**
   * Three lines answering "is this me". The first is the recognition sentence
   * already shown on the home card; the other two widen it without repeating.
   */
  when: [LS, LS, LS]
  /** What a first version contains. Chips, not prose: this is a scope list. */
  firstVersion: LS[]
  /**
   * What moves the price, one paragraph, REQUIRED AND NEVER SHARED.
   *
   * Their case pages run one boilerplate paragraph across all of them, and on a
   * construction-website case it talks about App Store subscriptions. That is a
   * copy-paste bug sitting on the exact page where somebody is being asked to
   * accept a number. The type makes a shared string impossible here.
   */
  priceDrivers: LS
  /** The button under the sticky offer. Names the work, not "get a quote". */
  ctaLabel: LS
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'ai-agents',
    key: 'agent',
    category: { en: 'Automation', ru: 'Автоматизация' },
    when: [
      {
        en: 'When somebody repeats the same chain of steps by hand every day.',
        ru: 'Когда одну и ту же цепочку действий кто-то повторяет руками каждый день.',
      },
      {
        en: 'When the rules are known but nobody has written them down anywhere a machine could read.',
        ru: 'Когда правила известны, но нигде не записаны так, чтобы их могла прочитать машина.',
      },
      {
        en: 'When the work is not hard, only constant, and it is quietly eating a salary.',
        ru: 'Когда работа не сложная, а просто постоянная, и тихо съедает чью-то зарплату.',
      },
    ],
    firstVersion: [
      { en: 'One process, end to end', ru: 'Один процесс целиком' },
      { en: 'Reads the source itself', ru: 'Сам читает источник' },
      { en: 'Acts without a prompt', ru: 'Действует без напоминания' },
      { en: 'Reports where you already look', ru: 'Отчитывается туда, куда вы и так смотрите' },
      { en: 'Logs every decision', ru: 'Пишет журнал решений' },
    ],
    priceDrivers: {
      en: 'How many steps the chain has, and whether each one can be reached programmatically. A source with a documented API is cheap; a source that only exists as a screen is the expensive part. After that it is how much of the decision is a rule and how much has to be a model, because a rule is testable and a model has to be evaluated. Volume matters less than people expect and predictability matters more.',
      ru: 'Сколько шагов в цепочке и до каждого ли можно дотянуться программно. Источник с документированным API стоит дёшево, источник, который существует только как экран, и есть дорогая часть. Дальше — какая доля решения это правило, а какая модель: правило тестируется, модель приходится оценивать. Объём влияет меньше, чем принято думать, а предсказуемость больше.',
    },
    ctaLabel: { en: 'Price an automation', ru: 'Посчитать автоматизацию' },
  },
  {
    slug: 'integrations',
    key: 'integr',
    category: { en: 'Backend', ru: 'Бэкенд' },
    when: [
      {
        en: 'When the data already exists in three systems and only meets inside somebody’s head.',
        ru: 'Когда данные уже есть в трёх системах, а сходятся только в чьей-то голове.',
      },
      {
        en: 'When somebody re-types the same record into a second system every day.',
        ru: 'Когда одну и ту же запись каждый день перебивают руками во вторую систему.',
      },
      {
        en: 'When a sync exists, breaks quietly, and nobody notices until a client does.',
        ru: 'Когда синхронизация вроде есть, ломается молча, и первым это замечает клиент.',
      },
    ],
    firstVersion: [
      { en: 'Two systems, one direction', ru: 'Две системы, одно направление' },
      { en: 'Idempotent webhooks', ru: 'Идемпотентные вебхуки' },
      { en: 'Retries and a dead-letter queue', ru: 'Повторы и очередь несработавших' },
      { en: 'An alert when it stops', ru: 'Оповещение, когда встало' },
      { en: 'A log you can audit', ru: 'Журнал, который можно проверить' },
    ],
    priceDrivers: {
      en: 'The number of systems, and how well each one is documented. Two well-behaved APIs are quick; one undocumented internal system sets the price for the whole job. Then whether data merely moves or has to be reconciled, because reconciliation means deciding which side wins and that is a business question before it is a technical one. Real-time costs more than nightly, and it is worth checking you need it.',
      ru: 'Число систем и то, насколько каждая описана. Два вменяемых API это быстро; одна недокументированная внутренняя система задаёт цену всей работе. Дальше — данные просто переносятся или их надо сверять: сверка означает решить, чья версия побеждает, а это вопрос бизнеса раньше, чем технический. Реальное время дороже ночной выгрузки, и стоит проверить, нужно ли оно.',
    },
    ctaLabel: { en: 'Price an integration', ru: 'Посчитать интеграцию' },
  },
  {
    slug: 'parsing',
    key: 'parsing',
    category: { en: 'Data', ru: 'Данные' },
    when: [
      {
        en: 'When the numbers are right there on screen and there is nowhere to export them from.',
        ru: 'Когда нужные данные видно на экране, а выгрузить их неоткуда.',
      },
      {
        en: 'When the supplier sends a price list as a PDF and somebody keys it in.',
        ru: 'Когда поставщик присылает прайс в PDF, и кто-то забивает его руками.',
      },
      {
        en: 'When other teams have already turned the task down.',
        ru: 'Когда от задачи уже отказались другие.',
      },
    ],
    firstVersion: [
      { en: 'One source, one schedule', ru: 'Один источник, одно расписание' },
      { en: 'Structured output', ru: 'Структурированный результат' },
      { en: 'Survives a layout change', ru: 'Переживает смену вёрстки' },
      { en: 'Tells you when it breaks', ru: 'Сообщает, когда сломался' },
    ],
    priceDrivers: {
      en: 'Whether the source wants to be read. A public page with stable markup is straightforward; a source behind a login, a rate limit or a bot check is a different job. The second factor is how often it changes, because that decides whether you are buying a script or a thing that has to be maintained, and we would rather say that out loud than discover it together in month two. Volume and schedule come last.',
      ru: 'Хочет ли источник, чтобы его читали. Публичная страница со стабильной вёрсткой это просто; источник за логином, лимитом запросов или проверкой на робота это другая работа. Второй фактор — как часто он меняется, потому что это решает, покупаете вы скрипт или вещь, которую придётся сопровождать; лучше сказать это вслух, чем выяснить вместе на втором месяце. Объём и расписание идут последними.',
    },
    ctaLabel: { en: 'Price a parser', ru: 'Посчитать парсер' },
  },
  {
    slug: 'dashboards',
    key: 'dash',
    category: { en: 'Analytics', ru: 'Аналитика' },
    when: [
      {
        en: 'When the answer to «how are we doing» is a spreadsheet somebody assembles by hand.',
        ru: 'Когда на вопрос «как идут дела» отвечают таблицей, которую кто-то собирает руками.',
      },
      {
        en: 'When two departments quote different numbers for the same week.',
        ru: 'Когда два отдела называют разные цифры за одну и ту же неделю.',
      },
      {
        en: 'When the report exists but arrives too late to change anything.',
        ru: 'Когда отчёт есть, но приходит слишком поздно, чтобы что-то изменить.',
      },
    ],
    firstVersion: [
      { en: 'The metrics you actually decide on', ru: 'Метрики, по которым вы правда решаете' },
      { en: 'Filters shaped like your business', ru: 'Фильтры под то, как думает бизнес' },
      { en: 'One screen, no export step', ru: 'Один экран без выгрузки' },
      { en: 'Refreshes on a schedule', ru: 'Обновляется по расписанию' },
    ],
    priceDrivers: {
      en: 'Whether the metrics are already agreed. If three people define «active client» three ways, that conversation is the project and the charts are the easy part. After that: how many sources feed it, whether any of them need a parser first, and whether history has to be backfilled, which is often the single largest line and the one nobody budgets for.',
      ru: 'Согласованы ли метрики. Если «активный клиент» у трёх человек означает три разных вещи, то этот разговор и есть проект, а графики — лёгкая часть. Дальше: сколько источников её питает, нужен ли кому-то из них сначала парсер, и надо ли поднимать историю за прошлые периоды — это часто самая крупная строка и та, которую не закладывают.',
    },
    ctaLabel: { en: 'Price a dashboard', ru: 'Посчитать дашборд' },
  },
  {
    slug: 'mvp',
    key: 'mvp',
    category: { en: 'Product', ru: 'Продукт' },
    when: [
      {
        en: 'When the idea is clear and there is still nothing to put in front of a first customer.',
        ru: 'Когда идея понятна, а показать первому клиенту всё ещё нечего.',
      },
      {
        en: 'When a prototype exists and nobody is willing to put real users on it.',
        ru: 'Когда прототип есть, но пускать на него живых людей никто не готов.',
      },
      {
        en: 'When you need the smallest thing that can honestly be charged for.',
        ru: 'Когда нужно самое маленькое, за что уже не стыдно брать деньги.',
      },
    ],
    firstVersion: [
      { en: 'One path a user can finish', ru: 'Один сценарий, который можно пройти до конца' },
      { en: 'Accounts and roles', ru: 'Аккаунты и роли' },
      { en: 'Deployed, not on a laptop', ru: 'Развёрнут, а не на ноутбуке' },
      { en: 'Monitoring from day one', ru: 'Мониторинг с первого дня' },
      { en: 'A way to charge, if it needs one', ru: 'Приём оплаты, если он нужен' },
    ],
    priceDrivers: {
      en: 'How much is decided and how much is still open. An MVP with one written user path is a build; an MVP that is still an argument is discovery with a build attached. Then the unavoidable parts: accounts, payments and a real deployment each add a floor of their own. Platforms multiply rather than add, so one platform done properly beats two done thinly, and that is usually the cheapest advice on this page.',
      ru: 'Сколько решено и сколько ещё открыто. MVP с одним записанным пользовательским сценарием это сборка; MVP, который всё ещё спор, это исследование со сборкой в нагрузку. Дальше неизбежное: аккаунты, оплата и настоящий деплой добавляют каждый свой пол. Платформы умножают, а не складывают, поэтому одна сделанная как следует лучше двух сделанных тонким слоем, и обычно это самый дешёвый совет на этой странице.',
    },
    ctaLabel: { en: 'Price an MVP', ru: 'Посчитать MVP' },
  },
  {
    slug: 'payments',
    key: 'billing',
    category: { en: 'Payments', ru: 'Платежи' },
    when: [
      {
        en: 'When it is time to take money, not just collect enquiries.',
        ru: 'Когда пора принимать деньги, а не собирать заявки.',
      },
      {
        en: 'When subscriptions exist and somebody checks renewals by hand.',
        ru: 'Когда подписки уже есть, а продления кто-то проверяет вручную.',
      },
      {
        en: 'When a payment succeeds and access does not arrive.',
        ru: 'Когда оплата прошла, а доступ не выдался.',
      },
    ],
    firstVersion: [
      { en: 'One provider, live', ru: 'Один провайдер, боевой' },
      { en: 'Plans and a checkout', ru: 'Тарифы и оплата' },
      { en: 'Idempotent webhooks', ru: 'Идемпотентные вебхуки' },
      { en: 'Access granted automatically', ru: 'Доступ выдаётся сам' },
      { en: 'Refunds and cancellation handled', ru: 'Возвраты и отмены обработаны' },
    ],
    priceDrivers: {
      en: 'One provider or several, and whether the money is one-off or recurring. Subscriptions are where the cost is: upgrades, downgrades, proration, failed renewals, refunds and the grace period all have to behave, and each of them is a state somebody eventually lands in. Webhooks must be idempotent, because they will arrive twice. We have shipped this twice on our own product, cards and crypto, which is why the estimate is not a guess.',
      ru: 'Один провайдер или несколько, и деньги разовые или регулярные. Стоимость живёт в подписках: переходы между тарифами вверх и вниз, пересчёт, несостоявшиеся продления, возвраты и льготный период должны вести себя правильно, и в каждом из этих состояний рано или поздно кто-то окажется. Вебхуки обязаны быть идемпотентными, потому что они придут дважды. Мы прошли это на своём продукте дважды, картами и криптой, поэтому оценка не гадание.',
    },
    ctaLabel: { en: 'Price a billing build', ru: 'Посчитать приём оплаты' },
  },
]

/**
 * Which cases belong on which service page.
 *
 * Keyed by the case's English title, not by index: a title is readable in a
 * diff and survives the array being reordered, which an index does not.
 * Every service has at least one, so no page renders an empty section.
 */
export const CASES_BY_SERVICE: Record<string, string[]> = {
  agent: ['20+ automations on BAS'],
  integr: ['Swiftin', 'Cowee'],
  parsing: ['20+ automations on BAS', 'Dashboards and analytics'],
  dash: ['Dashboards and analytics'],
  mvp: ['Swiftin', 'Cowee'],
  billing: ['Swiftin'],
}

export function servicePageBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug)
}
