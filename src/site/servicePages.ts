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
    category: { en: 'Automation · Processes', ru: 'Автоматизация · Процессы' },
    when: [
      {
        en: 'Every morning somebody opens the same tabs and copies the same fields into the same forms.',
        ru: 'Каждое утро кто-то открывает те же вкладки и переносит те же поля в те же формы.',
      },
      {
        en: 'The rules are known, and they live in someone\'s head rather than anywhere a machine can read.',
        ru: 'Правила известны, но живут у кого-то в голове, а не там, где их прочитает машина.',
      },
      {
        en: 'The moment that person takes a holiday, the process stops.',
        ru: 'Стоит этому человеку уйти в отпуск, и процесс встаёт.',
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
      en: 'Access sets the price, not volume. A step you can reach through an API costs almost nothing. A step that exists only as a screen is the expensive part. Then we split the decision in two: what can be written as a rule, and what has to be handed to a model. A rule is written once, and a model has to be checked against real examples, which is separate work. We also look at whether a mistake can be undone: where it cannot, a person confirms the decision. The cheapest thing you can do before we start is write the process out step by step.',
      ru: 'Цену задаёт доступ, а не объём. Шаг, до которого можно дотянуться по API, стоит копейки. Шаг, который существует только как экран, и есть дорогая часть. Дальше делим решение надвое: что записывается правилом, а что придётся отдать модели. Правило пишется один раз, а модель приходится проверять на живых примерах, и это отдельная работа. Смотрим и на то, можно ли откатить ошибку: где нельзя, там решение подтверждает человек. Самое дешёвое, что вы можете сделать до старта, это выписать процесс по шагам.',
    },
    ctaLabel: { en: 'Price the AI agent in a minute', ru: 'Посчитать AI-агента за минуту' },
  },
  {
    slug: 'integrations',
    key: 'integr',
    category: { en: 'Backend · Sync', ru: 'Бэкенд · Синхронизация' },
    when: [
      {
        en: 'The same order sits in the inbox, in a spreadsheet and in the CRM, and a person reconciles all three.',
        ru: 'Один и тот же заказ лежит в почте, в таблице и в CRM, а сводит всё это человек.',
      },
      {
        en: 'A sync exists, and once a week somebody still checks it by eye.',
        ru: 'Синхронизация вроде есть, и раз в неделю кто-то всё равно сверяет её глазами.',
      },
      {
        en: 'The exchange was set up by a contractor who no longer replies, and nobody dares touch it.',
        ru: 'Обмен когда-то настроил подрядчик, который больше не отвечает, и трогать это боятся.',
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
      en: 'We look at the documentation, not the number of systems. Two described APIs are quick. One internal system nobody ever wrote down sets the price for the whole job. The next question is the big one: does the data simply move, or does it have to be reconciled. Reconciling means deciding whose version wins in a conflict, and that is a business question more than a technical one. Third: does the other side have a test environment. If the only place to check is live data, the work goes slower and more carefully. A nightly export is cheaper than real time, and it is worth asking honestly whether you need it.',
      ru: 'Смотрим не на число систем, а на их документацию. Два описанных API это быстро. Одна внутренняя система, про которую никто ничего не написал, задаёт цену всей работе. Дальше главный вопрос: данные просто переносятся или их надо сверять. Сверять значит решить, чья версия побеждает при расхождении, а это скорее вопрос бизнеса, чем техники. Третий фактор: есть ли у второй стороны тестовый контур. Если проверять можно только на боевых данных, работа идёт медленнее и осторожнее. Ночная выгрузка дешевле реального времени, и стоит честно проверить, нужно ли оно вам.',
    },
    ctaLabel: { en: 'Price the integration in a minute', ru: 'Посчитать интеграцию за минуту' },
  },
  {
    slug: 'parsing',
    key: 'parsing',
    category: { en: 'Data · No API', ru: 'Данные · Без API' },
    when: [
      {
        en: 'The numbers are on the screen, there is no export button, and somebody retypes them by hand.',
        ru: 'Цифры видно на экране, кнопки «выгрузить» нет, и кто-то переписывает их руками.',
      },
      {
        en: 'The supplier sends the price list as a PDF, laid out differently every time, and somebody keys it in.',
        ru: 'Поставщик присылает прайс в PDF, каждый раз в новой вёрстке, и его забивают руками.',
      },
      {
        en: 'Somebody else has already turned this down, because the source has no API.',
        ru: 'От этой задачи уже отказались другие, потому что у источника нет API.',
      },
    ],
    firstVersion: [
      { en: 'One source, one schedule', ru: 'Один источник, одно расписание' },
      { en: 'Structured output', ru: 'Структурированный результат' },
      { en: 'Survives a layout change', ru: 'Переживает смену вёрстки' },
      { en: 'Tells you when it breaks', ru: 'Сообщает, когда сломался' },
    ],
    priceDrivers: {
      en: 'Everything turns on whether the source wants to be read. An open page with stable markup is cheap. A login, a rate limit and a bot check are a different job. Second factor: how often the source changes. That decides whether you are buying a script or a thing somebody has to keep alive, and it is better said before the start than discovered together in month two. Third: how the result gets checked. No number at all beats a number that quietly drifted, so validation goes into the first version. Volume and schedule come last and barely move the figure.',
      ru: 'Всё решает, хочет ли источник, чтобы его читали. Открытая страница со стабильной вёрсткой стоит дёшево. Логин, лимит запросов и проверка на робота это уже другая работа. Второй фактор: как часто источник меняется. От этого зависит, покупаете вы скрипт или вещь, которую придётся держать живой, и лучше сказать это до старта, чем выяснить вместе на втором месяце. Третий: как проверяется результат. Лучше никакой цифры, чем цифра, которая молча съехала, поэтому проверки закладываем в первую версию. Объём и расписание идут последними и почти не двигают цифру.',
    },
    ctaLabel: { en: 'Price the parser in a minute', ru: 'Посчитать парсер за минуту' },
  },
  {
    slug: 'dashboards',
    key: 'dash',
    category: { en: 'Analytics · Reporting', ru: 'Аналитика · Отчётность' },
    when: [
      {
        en: 'The question «how are we doing» ends in a spreadsheet somebody assembles for half a day.',
        ru: 'Вопрос «как идут дела» упирается в таблицу, которую кто-то собирает полдня.',
      },
      {
        en: 'Two departments quote different numbers for the same week, and each is right by its own definition.',
        ru: 'Два отдела называют разные цифры за одну и ту же неделю, и каждый прав по своему определению.',
      },
      {
        en: 'The report lands on Monday, about something that could still have been changed on Wednesday.',
        ru: 'В понедельник приходит отчёт о том, что можно было изменить в среду.',
      },
    ],
    firstVersion: [
      { en: 'The metrics you actually decide on', ru: 'Метрики, по которым вы правда решаете' },
      { en: 'Filters shaped like your business', ru: 'Фильтры под то, как думает бизнес' },
      { en: 'One screen, no export step', ru: 'Один экран без выгрузки' },
      { en: 'Refreshes on a schedule', ru: 'Обновляется по расписанию' },
    ],
    priceDrivers: {
      en: 'The expensive part is metrics nobody has agreed on. If «active client» means three different things to three people, that conversation is the project and the charts are the easy half. Then we count the sources: how many there are, and whether any of them needs a parser written first. The line almost nobody budgets for is history. Backfilling past periods often costs more than building the dashboard itself. Last, freshness of the data. Once a day and once a minute are different infrastructure, and the decision you make is usually the same either way.',
      ru: 'Дорого стоят несогласованные метрики. Если «активный клиент» у трёх человек означает три разные вещи, то этот разговор и есть проект, а графики лёгкая половина. Дальше считаем источники: сколько их и не нужно ли кому-то из них сначала написать парсер. Строка, которую почти никто не закладывает, это история. Поднять прошлые периоды часто дороже, чем построить сам дашборд. И последнее, свежесть данных. Раз в сутки и раз в минуту это разная инфраструктура, а решение вы примете одно и то же.',
    },
    ctaLabel: { en: 'Price the dashboard in a minute', ru: 'Посчитать дашборд за минуту' },
  },
  {
    slug: 'mvp',
    key: 'mvp',
    category: { en: 'Product · Launch', ru: 'Продукт · Запуск' },
    when: [
      {
        en: 'You have explained the idea ten times over, because there is still nothing to show.',
        ru: 'Идею вы объясняете словами уже десятый раз, потому что показать пока нечего.',
      },
      {
        en: 'A prototype exists, and nobody is willing to put real users on it.',
        ru: 'Прототип есть, а пускать на него живых людей никто не готов.',
      },
      {
        en: 'You need the smallest thing you can honestly charge for, not another demo.',
        ru: 'Нужно самое маленькое, за что уже не стыдно взять деньги, а не ещё одно демо.',
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
      en: 'We count open questions, not features. An MVP with one written user path is a build. An MVP that is still an argument is discovery with a build attached. Then the unavoidable parts: accounts, taking payment and a real deployment each raise the floor. So does the admin panel everyone remembers last, and without it the product gets supported by hand in the database. A second platform adds about half the price of the first rather than doubling it. One platform done properly beats two done thinly, and that is the cheapest advice on this page.',
      ru: 'Считаем не функции, а нерешённые вопросы. MVP с одним записанным сценарием это сборка. MVP, который всё ещё спор, это исследование со сборкой в нагрузку. Дальше неизбежное: аккаунты, приём оплаты и настоящий деплой, каждый поднимает нижнюю границу. Админка, о которой вспоминают последней, тоже её поднимает: без неё продукт поддерживают руками в базе. Вторая платформа добавляет примерно половину цены первой, а не удваивает её. Одна платформа, сделанная как следует, лучше двух, размазанных тонким слоем, и это самый дешёвый совет на этой странице.',
    },
    ctaLabel: { en: 'Price the MVP in a minute', ru: 'Посчитать MVP за минуту' },
  },
  {
    slug: 'payments',
    key: 'billing',
    category: { en: 'Money · Subscriptions', ru: 'Деньги · Подписки' },
    when: [
      {
        en: 'A customer is ready to pay right now, and all you can take is an enquiry.',
        ru: 'Клиент готов заплатить прямо сейчас, а вы можете только принять заявку.',
      },
      {
        en: 'Subscriptions already run, and somebody checks renewals and failed charges against a spreadsheet.',
        ru: 'Подписки уже идут, а продления и неудачные списания кто-то сверяет по таблице.',
      },
      {
        en: 'The money went through, the access did not arrive, and it gets sorted out in a chat thread.',
        ru: 'Деньги списались, доступ не пришёл, и разбираются в переписке.',
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
      en: 'A one-off charge and a subscription are two different jobs. The one-off is quick. The cost lives in subscriptions: moving between plans up and down, prorating the remainder, a renewal that fails, a refund, a grace period. A real customer eventually lands in every one of those states, and each has to be written down before any code. The second thing that moves the figure is the number of providers, and where your buyers are decides which ones you can connect at all. Webhooks have to be idempotent, because they will arrive twice. We shipped this on our own product, cards and crypto, so the estimate here is not a guess.',
      ru: 'Разовый платёж и подписка это две разные работы. Разовый делается быстро. Стоимость живёт в подписках: переходы между тарифами вверх и вниз, пересчёт остатка, несостоявшееся продление, возврат, льготный период. В каждом из этих состояний рано или поздно окажется живой клиент, и каждое надо описать до кода. Второе, что двигает цифру, это число провайдеров, а география покупателей решает, каких вы вообще сможете подключить. Вебхуки обязаны быть идемпотентными, потому что они придут дважды. Мы прошли это на своём продукте, картами и криптой, поэтому оценка тут не гадание.',
    },
    ctaLabel: { en: 'Price the billing in a minute', ru: 'Посчитать оплату за минуту' },
  },
]

/**
 * Which cases belong on which service page.
 *
 * Keyed by the case's English title, not by index: a title is readable in a
 * diff and survives the array being reordered, which an index does not.
 * Every service has at least one, so no page renders an empty section.
 */
/* THE LISTS ARE CAPPED AT FOUR, and that is a decision rather than what fitted.
   The array grew from four cases to twelve, and every one of the new ones could
   defend a place under `agent`. A service page that ends on eight case cards
   stops being a service page; these are the ones that argue hardest for their
   own service, and the rest are one click away on the home page. */
export const CASES_BY_SERVICE: Record<string, string[]> = {
  agent: [
    'RAG assistant for a retail chain',
    'AI agent for importing cars from the US',
    'Automated onboarding and nurture',
    '20+ automations on BAS',
  ],
  integr: [
    'Swiftin',
    'Telegram bot and CRM for B2B sales',
    'Lead qualification and routing',
    'A browser extension for the sales team',
  ],
  parsing: ['20+ automations on BAS', 'One screen instead of manual exports'],
  dash: ['One screen instead of manual exports'],
  mvp: ['Swiftin', 'Cowee', 'An internal tool for a sales team'],
  billing: ['Swiftin'],
}

export function servicePageBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug)
}
