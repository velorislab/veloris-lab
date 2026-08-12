import type { LS } from './labData'
import { estimate, type Estimate } from './labPricing'

/* =============================================================================
   Solution pages.

   WHAT THIS IS AND, MORE IMPORTANTLY, WHAT IT IS NOT.

   A solution page and a case page are different documents doing different jobs.
   A case says «we built this, for these people, and here is what came of it», and
   every sentence in it is answerable to a repository. A solution page says «here
   is a thing we build, here is what goes in the first version, here is what it
   costs», and claims nothing about history at all. Not one past-tense sentence
   about a client appears on one: it is «бот принимает», «кому подходит», «состав
   первой версии», «возможный стек».

   That is why any number of them can exist without a word of invention, and it is
   the honest way to have the volume a small studio otherwise cannot show. It is
   also the shape a search most often lands on: one page per scenario somebody
   actually types into Google.

   SO THE RULE FOR THIS FILE, and it is the only one that matters: nothing here
   may be written in the past tense about a client, and nothing here may imply a
   project that happened. Proof of work lives in CASES and stays there. If a
   solution below ever does get built for somebody who lets us say so, it earns a
   case page and this page links to it, exactly as theirs do.

   THE FIGURE IS DERIVED AND CANNOT BE TYPED. `solutionQuote` runs the same
   `estimate()` the calculator runs, so a solution cannot quote a number the price
   table does not hold, and repricing moves all of these with it. Most entries are
   the bare floor of their work type. An entry that genuinely includes features
   the floor does not cover declares them in `addons`, and the extra lands in the
   figure the same way it would in the calculator: `process-agent` is the only one
   so far, and each of its three is named in its own lead.

   THE THREE GROUPS ARE THE OWNER'S AND THEY ARE A SALES ORDER, NOT A TAXONOMY.
   What a visitor can buy without a meeting comes first, what replaces a process
   comes second, what needs a conversation comes last. A scenario belongs to the
   group its buyer is in, not to the one its technology is in: the browser
   extension is «heavier» because of who asks for it, not because MV3 is hard.
   ========================================================================== */

export type SolutionGroup = 'frequent' | 'ops' | 'complex'

/** The hub renders these in this order, and every group must be non-empty. */
export const SOLUTION_GROUPS: { key: SolutionGroup; title: LS }[] = [
  { key: 'frequent', title: { en: 'Frequent tasks', ru: 'Частые задачи' } },
  { key: 'ops', title: { en: 'Operational systems', ru: 'Операционные системы' } },
  { key: 'complex', title: { en: 'Heavier work', ru: 'Более сложные задачи' } },
]

export interface Solution {
  /** URL segment, same in both locales. */
  slug: string
  /**
   * Set only on the scenarios the hub features at the top, and the three groups
   * are the owner's own shortlist rather than a taxonomy. Everything without a
   * group is the catalogue underneath, which the hub arranges by work type: the
   * headings for that come from WORK_TYPES and are already bilingual, so a
   * catalogue of any size needs no new copy to stay navigable.
   */
  group?: SolutionGroup
  /** The small English label above the title, their «Lead generation» slot. */
  kicker: string
  title: LS
  /** What the thing does, in the present tense. Never what we did. */
  lead: LS
  /** «Кому подходит» — the situation, not the person. */
  audience: LS
  /** Joins WORK_TYPES[].key. Decides the price, the window and the support. */
  base: string
  /**
   * Joins ADDONS[].key. Only for a scenario that genuinely carries the feature,
   * never to reach a number somebody liked: every key here has to be defensible
   * from the lead above it.
   */
  addons?: string[]
  /** What is in the first version. Short noun phrases, not sentences. */
  composition: LS[]
  /** «Как проходит путь» — three numbered steps through the thing. */
  flow: { t: LS; d: LS }[]
  /** The three decisions that decide whether this works or annoys people. */
  watch: { t: LS; d: LS }[]
  /** What to measure once it is live. */
  metrics: LS[]
  faq: { q: LS; a: LS }[]
  /** «Возможный стек». Group titles translate, tool names never do. */
  stack: { t: LS; items: string[] }[]
  /**
   * «Отдельные расходы». What the price does not cover because a provider bills
   * the client directly. The studio resells no capacity, so it earns nothing on
   * any of these, and saying so is the point of the section.
   */
  notIncluded: LS[]
}

/**
 * The figure, the window and the support for one solution.
 *
 * THROWS ON AN UNKNOWN `base`, and that is deliberate. Every page here is
 * prerendered, so a typo in a work-type key fails `next build` with the slug in
 * the message rather than shipping a page that quotes $0.
 */
export function solutionQuote(s: Solution): Estimate {
  const e = estimate({ typeKey: s.base, designKey: 'ready', addonKeys: s.addons })
  if (!e) throw new Error(`solutions.ts: «${s.slug}» has base «${s.base}», which is not a key in WORK_TYPES`)
  return e
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'ai-assistant-instagram-telegram',
    group: 'frequent',
    kicker: 'Social inbox',
    title: { en: 'AI assistant for Instagram and Telegram', ru: 'AI-ассистент в Instagram и Telegram' },
    lead: { en: 'It answers the routine messages itself, qualifies enquiries and hands a manager only what needs a person.', ru: 'Сам отвечает на типовые сообщения, квалифицирует заявки и передаёт менеджеру только то, что требует человека.' },
    audience: { en: 'Accounts and chats where the same questions arrive every day and a missed message is a lost order.', ru: 'Аккаунты и чаты, куда каждый день приходят одни и те же вопросы, а пропущенное сообщение это потерянный заказ.' },
    base: 'agent',
    composition: [
      { en: 'direct, comments, Telegram', ru: 'директ, комментарии, Telegram' },
      { en: 'knowledge base', ru: 'база знаний' },
      { en: 'lead qualification', ru: 'квалификация заявок' },
      { en: 'reply log', ru: 'журнал ответов' },
    ],
    flow: [
      {
        t: { en: 'A message arrives', ru: 'Приходит сообщение' },
        d: { en: 'The assistant matches the message against what it is allowed to answer: your prices, your terms, your materials.', ru: 'Ассистент сверяет сообщение с тем, на что ему разрешено отвечать: ваши цены, ваши условия, ваши материалы.' },
      },
      {
        t: { en: 'It answers or asks a follow-up', ru: 'Отвечает сам или доспрашивает' },
        d: { en: 'A routine question closes in your tone; an enquiry gets the two or three questions that decide who takes it.', ru: 'Типовой вопрос закрывается в вашем тоне, а заявка получает те два-три вопроса, которые решают, кому её отдать.' },
      },
      {
        t: { en: 'A person gets the rest', ru: 'Человеку достаётся остальное' },
        d: { en: 'The thread reaches a manager with the contact, the answers and the question isolated, in chat or your CRM.', ru: 'Переписка приходит менеджеру с контактом, ответами и уже выделенным вопросом, в чат или в вашу CRM.' },
      },
    ],
    watch: [
      {
        t: { en: 'It knows when to shut up', ru: 'Он должен уметь замолчать' },
        d: { en: 'It fails not on a wrong answer but on a confident one to a complaint, so silence and handover is the fallback.', ru: 'Такой ассистент ломается не на неверном ответе, а на уверенно неверном ответе на жалобу, поэтому запасной вариант это молчание и передача человеку.' },
      },
      {
        t: { en: 'Tone is a setting', ru: 'Тон это настройка' },
        d: { en: 'Voice, greeting, the customer’s name and the form of a refusal are configured and reviewable, so nothing drifts when a model updates.', ru: 'Обращение, приветствие, имя клиента и форма отказа настраиваются и просматриваются, поэтому ничего не поедет в день обновления модели.' },
      },
      {
        t: { en: 'Platform limits are real', ru: 'Ограничения площадки настоящие' },
        d: { en: 'We build inside Instagram and Telegram rules rather than around them, because an account is easier to lose than to get back.', ru: 'Мы строим внутри правил Instagram и Telegram, а не в обход: аккаунт потерять проще, чем вернуть.' },
      },
    ],
    metrics: [
      { en: 'share answered without a human', ru: 'доля ответов без человека' },
      { en: 'time to first reply', ru: 'время до первого ответа' },
      { en: 'manager handovers per day', ru: 'передач менеджеру в день' },
      { en: 'threads that became orders', ru: 'переписок, ставших заказами' },
    ],
    faq: [
      {
        q: { en: 'Will customers know it is not a person?', ru: 'Клиент поймёт, что это не человек?' },
        a: { en: 'That is your call and a setting. We recommend saying so once at the start: the reply is faster anyway, and nobody feels tricked when a person takes over.', ru: 'Это ваше решение и это настройка. Советуем сказать один раз в начале: ответ всё равно быстрее, и никто не чувствует обмана, когда подключается человек.' },
      },
      {
        q: { en: 'Where do its answers come from?', ru: 'Откуда он берёт ответы?' },
        a: { en: 'From your own materials: the price list, the delivery terms, the questions that already repeat, the wording your managers use. We collect that once, and afterwards you edit it without us.', ru: 'Из ваших материалов: прайс, условия доставки, повторяющиеся вопросы, готовые формулировки менеджеров. Собираем это в один источник на старте, дальше вы правите его без нас.' },
      },
      {
        q: { en: 'Can it do WhatsApp as well?', ru: 'А WhatsApp он тоже сможет?' },
        a: { en: 'The answering logic is shared, so yes. But each channel is its own connection and its own platform rules, so WhatsApp is a line in the estimate rather than a free extra.', ru: 'Логика ответов общая, поэтому да. Но каждый канал это своё подключение и свои правила площадки, поэтому WhatsApp это строка в смете, а не бесплатное дополнение.' },
      },
    ],
    stack: [
      { t: { en: 'Server and agent', ru: 'Сервер и агент' }, items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Telegram Bot API'] },
      { t: { en: 'Models and knowledge', ru: 'Модели и знания' }, items: ['OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Running it', ru: 'Эксплуатация' }, items: ['Docker', 'n8n', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls, at the model’s published rate', ru: 'Обращения к AI-моделям по тарифу модели' },
      { en: 'Hosting and the server it runs on', ru: 'Хостинг и сервер, где живёт ассистент' },
      { en: 'Platform business accounts and their connections', ru: 'Бизнес-аккаунты площадок и их подключения' },
      { en: 'SMS and telephony for manager alerts', ru: 'SMS и телефония для уведомлений менеджеру' },
    ],
  },
  {
    slug: 'online-booking-service',
    group: 'frequent',
    kicker: 'Scheduling',
    title: { en: 'Online booking service', ru: 'Сервис онлайн-записи' },
    lead: { en: 'The client picks a slot that is genuinely free and gets a confirmation on the spot. No agreeing times by hand, no double bookings.', ru: 'Клиент выбирает реальное свободное время и сразу получает подтверждение. Без ручных согласований и двойных записей.' },
    audience: { en: 'Practices, studios and consultants where time is the product and half the admin is agreeing when, reminding, then rescheduling.', ru: 'Практики, студии и консультанты, где время и есть продукт, а половина администрирования это согласовать когда, напомнить и перенести.' },
    base: 'site',
    composition: [
      { en: 'availability calendar', ru: 'календарь доступности' },
      { en: 'confirmation and reminders', ru: 'подтверждение и напоминания' },
      { en: 'prepayment and rescheduling', ru: 'предоплата и перенос' },
      { en: 'specialist view', ru: 'экран специалиста' },
    ],
    flow: [
      {
        t: { en: 'The slot shown actually exists', ru: 'Показанный слот действительно есть' },
        d: { en: 'Availability is computed from working hours, existing bookings, buffers and the specialist’s own calendar, in the client’s time zone.', ru: 'Доступность считается из рабочих часов, сделанных записей, буферов и личного календаря специалиста, в часовом поясе клиента.' },
      },
      {
        t: { en: 'Booking ends in a confirmation', ru: 'Запись заканчивается подтверждением' },
        d: { en: 'The slot is held the moment they tap, or they are told at once that it is not.', ru: 'Слот закрепляется за клиентом в момент нажатия, либо ему сразу говорят, что нет.' },
      },
      {
        t: { en: 'A reminder arrives before it matters', ru: 'Напоминание приходит вовремя' },
        d: { en: 'With a one-tap way to move it, because most no-shows are people who cannot say they are not coming.', ru: 'С переносом в одно касание: большинство неявок это люди, которые не находят способа сказать, что не придут.' },
      },
    ],
    watch: [
      {
        t: { en: 'Two people, one slot, same second', ru: 'Двое, один слот, одна секунда' },
        d: { en: 'The whole system is judged on this case, and it is solved by a database lock, not an interface check.', ru: 'Вся система оценивается по этому случаю, и решается он блокировкой на уровне базы, а не проверкой в интерфейсе.' },
      },
      {
        t: { en: 'Booking that happens outside the system', ru: 'Запись мимо системы' },
        d: { en: 'Manual entry and reading the personal calendar are in the first version, or the clash arrives from real life instead of code.', ru: 'Ручная запись и чтение личного календаря есть уже в первой версии, иначе накладка приходит не из кода, а из жизни.' },
      },
      {
        t: { en: 'The rules for moving it', ru: 'Правила переноса' },
        d: { en: 'How late is too late, what happens to a prepayment, how many times: written into the system rather than renegotiated weekly.', ru: 'За сколько уже поздно, что с предоплатой, сколько раз: записано в систему, а не согласовывается заново каждую неделю.' },
      },
    ],
    metrics: [
      { en: 'bookings made without a message', ru: 'записей без единого сообщения' },
      { en: 'no-show rate', ru: 'доля неявок' },
      { en: 'reschedules by clients', ru: 'переносов силами клиента' },
      { en: 'admin hours returned', ru: 'возвращённых часов администрирования' },
    ],
    faq: [
      {
        q: { en: 'Why not Calendly?', ru: 'Почему не Calendly?' },
        a: { en: 'If it fits, use it, and we will say so. This is for what it does not cover: several specialists, prepayment, your own rules, or booking inside your own product.', ru: 'Если подходит, пользуйтесь, и мы прямо это скажем. Здесь речь о том, чего он не закрывает: несколько специалистов, предоплата, свои правила или запись внутри вашего продукта.' },
      },
      {
        q: { en: 'Can it handle several specialists and different services?', ru: 'Несколько специалистов и разные услуги потянет?' },
        a: { en: 'Yes, and that is the ordinary case: each has their own hours, services and appointment length. Availability is computed per person, and the client picks a specialist or the nearest time.', ru: 'Да, это обычный случай: у каждого свои часы, услуги и длительность приёма. Доступность считается по каждому отдельно, а клиент выбирает специалиста или просто ближайшее время.' },
      },
      {
        q: { en: 'Can it go on the site we already have?', ru: 'Можно поставить запись на наш существующий сайт?' },
        a: { en: 'Yes, as a section on a page, usually cheaper than a separate service. If the schedule already lives in another system, we agree first which of the two is in charge.', ru: 'Да, разделом на странице, и обычно это дешевле отдельного сервиса. Если расписание уже лежит в чужой системе, сначала договариваемся, кто из двух главный.' },
      },
    ],
    stack: [
      { t: { en: 'Frontend', ru: 'Фронтенд' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'] },
      { t: { en: 'Payments and notifications', ru: 'Оплата и уведомления' }, items: ['Stripe', 'Paddle', 'Telegram Bot API'] },
    ],
    notIncluded: [
      { en: 'Hosting and the server it runs on', ru: 'Хостинг и сервер расписания' },
      { en: 'The domain, registered to your business', ru: 'Домен на ваш бизнес' },
      { en: 'Payment provider fees on prepayments', ru: 'Комиссия платёжной системы с предоплат' },
      { en: 'SMS reminders sent by an operator', ru: 'SMS-напоминания от оператора связи' },
    ],
  },
  {
    slug: 'competitor-price-monitoring',
    group: 'frequent',
    kicker: 'Market data',
    title: { en: 'Competitor price monitoring', ru: 'Мониторинг цен конкурентов' },
    lead: { en: 'A collector picks up the current prices by itself and puts them into a form you can work with. No monitoring by hand.', ru: 'Сборщик сам забирает актуальные цены и складывает их в удобный вид. Без ручного мониторинга.' },
    audience: { en: 'Sellers repricing by hand, categories where a competitor’s discount is noticed late, and any market where the number on the screen has no export button.', ru: 'Продавцы, которые переоценивают руками, категории, где о скидке конкурента узнают поздно, и любой рынок, где у числа на экране нет кнопки выгрузки.' },
    base: 'parsing',
    composition: [
      { en: 'catalogue matching', ru: 'сопоставление с каталогом' },
      { en: 'price history', ru: 'история цен' },
      { en: 'change alerts', ru: 'оповещения об изменении' },
      { en: 'spreadsheet export', ru: 'выгрузка в таблицу' },
    ],
    flow: [
      {
        t: { en: 'The round runs on its schedule', ru: 'Обход идёт по расписанию' },
        d: { en: 'At the set time the collector opens every source and reads the page the way a customer does.', ru: 'В назначенное время сборщик открывает каждый источник и читает страницу так, как её читает покупатель.' },
      },
      {
        t: { en: 'It is matched to your catalogue', ru: 'Сопоставляется с вашим каталогом' },
        d: { en: 'A price is useless until it stands next to your own line, and the matching is most of the work.', ru: 'Цена бесполезна, пока не встанет рядом с вашей позицией, и сопоставление это и есть основная работа.' },
      },
      {
        t: { en: 'You get changes, not a table', ru: 'Вам приходит изменение, а не таблица' },
        d: { en: 'A daily spreadsheet nobody opens is not a result; a message naming which items moved and by how much is.', ru: 'Таблица, которую никто не открывает, это не результат; результат это сообщение, какие позиции сдвинулись и насколько.' },
      },
    ],
    watch: [
      {
        t: { en: 'Sources change without warning', ru: 'Источники меняются без предупреждения' },
        d: { en: 'A layout change breaks a collector silently, and silence looks like «prices did not move», so every source is checked for plausibility.', ru: 'Смена вёрстки ломает сборщик молча, а молчание выглядит как «цены не двигались», поэтому каждый источник проверяется на правдоподобие.' },
      },
      {
        t: { en: 'Politeness is a technical requirement', ru: 'Вежливость это техническое требование' },
        d: { en: 'Rate, timing and volume are set so the collection is indistinguishable from ordinary traffic: being blocked costs more than collecting slowly.', ru: 'Частота, время и объём настроены так, чтобы сбор не отличался от обычного трафика: блокировка стоит дороже медленного сбора.' },
      },
      {
        t: { en: 'What is legal to collect', ru: 'Что законно собирать' },
        d: { en: 'Public prices are one thing and personal data another: we take the first, refuse the second, and say which is which beforehand.', ru: 'Публичные цены это одно, персональные данные другое: первое берём, от второго отказываемся и говорим до старта, что есть что.' },
      },
    ],
    metrics: [
      { en: 'sources collected without gaps', ru: 'источников собрано без пропусков' },
      { en: 'items matched automatically', ru: 'позиций сопоставлено автоматически' },
      { en: 'time to your alert', ru: 'время до вашего оповещения' },
      { en: 'manual checking removed', ru: 'убранных часов ручной проверки' },
    ],
    faq: [
      {
        q: { en: 'Is this legal?', ru: 'Это законно?' },
        a: { en: 'Collecting publicly published prices generally is; the limits are a source’s terms of use and any personal data. We check your specific sources before quoting and say plainly if one is a no.', ru: 'Сбор публично опубликованных цен как правило да; границы это условия использования источника и персональные данные. Конкретные источники проверяем до сметы и прямо говорим, если по какому-то ответ отрицательный.' },
      },
      {
        q: { en: 'What happens when a source changes its layout or starts blocking?', ru: 'Что будет, когда источник поменяет вёрстку или начнёт блокировать?' },
        a: { en: 'That is ordinary life for a collector, not an incident, so the repair is part of the support you already pay for, and you hear about the break from us.', ru: 'Это не авария, а обычная жизнь сборщика, поэтому починка входит в оплаченное сопровождение, а не приходит отдельным счётом, и о поломке вы узнаёте от нас.' },
      },
      {
        q: { en: 'Does the data stay ours?', ru: 'Данные останутся у нас?' },
        a: { en: 'The database sits in your own account, the history exports to standard formats from the first version, and you can take all of it without us. We keep no copy.', ru: 'База лежит в вашем аккаунте, история цен выгружается в обычные форматы с первой версии, и забрать её можно без нас. Копию у себя мы не держим.' },
      },
    ],
    stack: [
      { t: { en: 'Collection', ru: 'Сбор' }, items: ['Python', 'Playwright', 'Go', 'Docker'] },
      { t: { en: 'Storage and matching', ru: 'Хранение и сопоставление' }, items: ['PostgreSQL', 'ClickHouse', 'Redis', 'S3'] },
      { t: { en: 'Schedule and alerts', ru: 'Расписание и оповещения' }, items: ['n8n', 'Temporal', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'Hosting and servers for the collector', ru: 'Хостинг и серверы сборщика' },
      { en: 'Proxies and anti-bot services, where needed', ru: 'Прокси и обход антибот-защиты' },
      { en: 'AI model calls used for matching', ru: 'Обращения к AI-моделям при сопоставлении' },
      { en: 'Paid access to subscription-only sources', ru: 'Платный доступ к источникам за подпиской' },
    ],
  },
  {
    slug: 'subscription-service',
    group: 'frequent',
    kicker: 'Recurring revenue',
    title: { en: 'Subscription service', ru: 'Сервис по подписке' },
    lead: { en: 'The system takes the payment itself, and handles failed charges, trial periods and plan changes.', ru: 'Система сама списывает, обрабатывает ошибки оплаты, пробные периоды и смену тарифов.' },
    audience: { en: 'Anyone selling access rather than a one-off, especially where somebody checks by hand who has paid and whose access should end.', ru: 'Все, кто продаёт доступ, а не разовую покупку, особенно если сейчас кто-то руками сверяет, кто заплатил, а кому пора закрывать доступ.' },
    base: 'billing',
    composition: [
      { en: 'plans and periods', ru: 'тарифы и периоды' },
      { en: 'trial period', ru: 'пробный период' },
      { en: 'failed payment recovery', ru: 'возврат неудачных списаний' },
      { en: 'invoices and receipts', ru: 'счета и чеки' },
    ],
    flow: [
      {
        t: { en: 'Access follows the payment, exactly', ru: 'Доступ строго следует за оплатой' },
        d: { en: 'One rule derived from the subscription state decides what a person can open, not a flag somebody sets by hand.', ru: 'Что человек может открыть, решает одно правило из состояния подписки, а не флаг, который кто-то ставит руками.' },
      },
      {
        t: { en: 'A card fails and nothing breaks', ru: 'Карта не проходит, ничего не ломается' },
        d: { en: 'Scheduled retries, a grace period, a message that is not a threat, and access ending on a known date.', ru: 'Повторы по расписанию, льготный период, сообщение без угрозы и доступ, который заканчивается в заранее известную дату.' },
      },
      {
        t: { en: 'Told twice, charged once', ru: 'Провайдер сообщает дважды, списание одно' },
        d: { en: 'Payment webhooks arrive more than once by design, so every one is idempotent and a repeat can never charge twice.', ru: 'Вебхуки платежей приходят не по одному разу, поэтому каждый идемпотентен и повтор не спишет второй раз.' },
      },
    ],
    watch: [
      {
        t: { en: 'Cancellation must be easy', ru: 'Отмена должна быть простой' },
        d: { en: 'A hard cancellation buys one month and costs a review, a chargeback and a recommendation, and in more countries it is illegal.', ru: 'Сложная отмена выигрывает один месяц и стоит отзыва, чарджбэка и рекомендации, а во всё большем числе стран она незаконна.' },
      },
      {
        t: { en: 'Whose name is on the receipt', ru: 'Кто продавец в чеке' },
        d: { en: 'Taking payments yourself and taking them through a merchant of record differ in paperwork, tax and risk, and that is decided first.', ru: 'Принимать платежи самому и принимать через merchant of record это разный объём документов, налогов и риска, и это решение до кода.' },
      },
      {
        t: { en: 'Refunds are part of the design', ru: 'Возвраты это часть конструкции' },
        d: { en: 'Partial, full, mid-period, and what happens to access afterwards: deciding this later means deciding it with an angry customer waiting.', ru: 'Частичные, полные, в середине периода и что после этого с доступом: решать это потом значит решать, пока ждёт злой клиент.' },
      },
    ],
    metrics: [
      { en: 'trials that became paid', ru: 'пробных, ставших платными' },
      { en: 'failed charges recovered', ru: 'восстановленных списаний' },
      { en: 'monthly churn', ru: 'месячный отток' },
      { en: 'billing support tickets', ru: 'обращений по оплате' },
    ],
    faq: [
      {
        q: { en: 'Cards and crypto at once?', ru: 'Карты и крипта сразу?' },
        a: { en: 'Yes, and both already run in our own product. Two providers means two sets of webhooks and one shared subscription state, which is exactly where this kind of system usually goes wrong.', ru: 'Да, и оба уже работают в нашем собственном продукте. Два провайдера это два набора вебхуков и одно общее состояние подписки, и именно там такие системы обычно ломаются.' },
      },
      {
        q: { en: 'Can we move over the people already paying?', ru: 'Можно перенести тех, кто уже платит?' },
        a: { en: 'If the provider stays the same, subscriptions move with its tokens and nobody re-enters a card. If it changes, some customers pay again, and we name that share before the work starts.', ru: 'Если провайдер тот же, подписки переезжают вместе с его токенами и карты никто не вводит заново. Если меняется, часть клиентов платит заново, и эту часть называем до начала работ.' },
      },
      {
        q: { en: 'Can we change plans and prices ourselves?', ru: 'Сможем менять тарифы и цены сами?' },
        a: { en: 'Names, prices and limits, yes, from an admin panel, and a new price leaves people already on the old one where they are. A new charging mechanic is code and goes through us.', ru: 'Названия, цены и лимиты да, из админки, и новая цена не трогает тех, кто уже платит по старой. Новая механика тарификации это код и идёт через нас.' },
      },
    ],
    stack: [
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'] },
      { t: { en: 'Payments and charges', ru: 'Платежи и списания' }, items: ['Stripe', 'Paddle', 'Temporal', 'Redis'] },
      { t: { en: 'Customer view and operations', ru: 'Кабинет и эксплуатация' }, items: ['Next.js', 'React', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'Payment provider fees', ru: 'Комиссии платёжных систем' },
      { en: 'Hosting and servers', ru: 'Хостинг и серверы' },
      { en: 'Email and SMS about charges', ru: 'Письма и SMS о списаниях' },
      { en: 'The domain receipts go out from', ru: 'Домен для чеков и писем' },
    ],
  },
  {
    slug: 'custom-crm-development',
    group: 'ops',
    kicker: 'Internal systems',
    title: { en: 'Custom CRM development', ru: 'Разработка CRM под заказ' },
    lead: { en: 'Deals, stages and rules work the way you actually sell. Nothing here tries to squeeze you into a box.', ru: 'Сделки, стадии и правила работают так, как вы реально продаёте. Без попыток втиснуть вас в коробку.' },
    audience: { en: 'Teams whose process does not fit a boxed product: unusual stages, calculations inside a deal, or a spreadsheet that has become the real system.', ru: 'Команды, чей процесс не ложится в коробку: нестандартные стадии, расчёты внутри сделки или таблица, которая незаметно стала настоящей системой.' },
    base: 'crm',
    composition: [
      { en: 'deals and stages', ru: 'сделки и стадии' },
      { en: 'roles and access', ru: 'роли и доступы' },
      { en: 'change history', ru: 'история изменений' },
      { en: 'spreadsheet import', ru: 'импорт из таблицы' },
    ],
    flow: [
      {
        t: { en: 'The stages come from your board', ru: 'Стадии берутся с вашей доски' },
        d: { en: 'We start from how the work already moves, including the steps nobody wrote down, not from a vendor’s default funnel.', ru: 'Начинаем с того, как работа уже движется, включая незаписанные шаги, а не с чужой воронки по умолчанию.' },
      },
      {
        t: { en: 'Roles decide what is visible', ru: 'Роли решают, кто что видит' },
        d: { en: 'A manager, an owner and a contractor open one deal and see different amounts, by a rule in the data.', ru: 'Менеджер, владелец и подрядчик открывают одну сделку и видят разное, по правилу в данных, а не по скрытой колонке.' },
      },
      {
        t: { en: 'It connects to what you run', ru: 'Соединяется с тем, что уже работает' },
        d: { en: 'Mail, Telegram, site forms, invoicing, the warehouse: the CRM becomes where things arrive, not a second place to type them.', ru: 'Почта, Telegram, формы с сайта, счета, склад: CRM становится местом, куда всё приходит, а не вторым местом для ввода.' },
      },
    ],
    watch: [
      {
        t: { en: 'The fields nobody fills in', ru: 'Поля, которые никто не заполняет' },
        d: { en: 'Abandoned CRMs have a screen of fields and a handful in use: we ship those and add the rest when asked twice.', ru: 'В брошенных CRM экран полей и горстка используемых: мы выпускаем эти, остальные добавляем, когда о них попросят дважды.' },
      },
      {
        t: { en: 'Migration is the real risk', ru: 'Настоящий риск это перенос' },
        d: { en: 'The spreadsheet has duplicates, half-filled rows and several spellings of one client, and cleaning that is planned work, not a launch-day discovery.', ru: 'В таблице дубли, наполовину заполненные строки и несколько написаний одного клиента, и чистка это плановая работа, а не открытие в день запуска.' },
      },
      {
        t: { en: 'It must beat the spreadsheet', ru: 'Должно быть быстрее таблицы' },
        d: { en: 'If entering a deal takes longer than a row in Excel, the team returns to Excel, so keyboard-first entry is the feature.', ru: 'Если завести сделку дольше, чем строку в Excel, команда вернётся в Excel, поэтому ввод с клавиатуры это функция, а не вылизывание.' },
      },
    ],
    metrics: [
      { en: 'deals entered without prompting', ru: 'сделок заводят без напоминаний' },
      { en: 'time from lead to first touch', ru: 'время от заявки до первого касания' },
      { en: 'stages with no stuck deals', ru: 'стадии без зависших сделок' },
      { en: 'spreadsheets still in use', ru: 'таблиц, которыми ещё пользуются' },
    ],
    faq: [
      {
        q: { en: 'Why not amoCRM or Bitrix?', ru: 'Почему не amoCRM или Битрикс?' },
        a: { en: 'Usually you should. A boxed CRM is cheaper and faster every time your process fits it, and this page is for when it does not; we will say so on the call.', ru: 'Обычно и стоит. Коробка дешевле и быстрее каждый раз, когда процесс в неё ложится, а эта страница про случай, когда не ложится; на разборе мы прямо скажем.' },
      },
      {
        q: { en: 'Can we move off it later?', ru: 'Сможем ли мы потом с неё уйти?' },
        a: { en: 'The database is yours, in your own cloud account, and exports to standard formats from the first version. Lock-in is a choice somebody makes, and we do not make it for you.', ru: 'База ваша, в вашем облачном аккаунте, и выгружается в обычные форматы с первой версии. Привязка это чей-то выбор, и мы не делаем его за вас.' },
      },
      {
        q: { en: 'Can we change stages and fields ourselves?', ru: 'Сможем менять стадии и поля сами?' },
        a: { en: 'Stages, fields and who sees what are settings and change from the interface, without us. New calculations inside a deal or a new outside connection are code, priced before the work starts.', ru: 'Стадии, поля и видимость это настройки: меняются из интерфейса, без нас. Новые расчёты внутри сделки или новая связь с внешней системой это код, с ценой до начала работ.' },
      },
    ],
    stack: [
      { t: { en: 'Frontend', ru: 'Фронтенд' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Backend and data', ru: 'Бэкенд и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'] },
      { t: { en: 'Integrations', ru: 'Интеграции' }, items: ['n8n', 'Temporal', 'Telegram Bot API'] },
    ],
    notIncluded: [
      { en: 'Hosting and servers', ru: 'Хостинг и серверы' },
      { en: 'The domain, registered to your business', ru: 'Домен на ваш бизнес' },
      { en: 'Telephony and SMS', ru: 'Телефония и SMS' },
      { en: 'Email delivery above a free tier', ru: 'Рассылка писем сверх бесплатного лимита' },
    ],
  },
  {
    slug: 'client-portal',
    group: 'ops',
    kicker: 'Client access',
    title: { en: 'Client portal', ru: 'Личный кабинет клиента' },
    lead: { en: 'Clients see their orders, documents, statuses and balance in one place. The «any news on this?» messages all but stop.', ru: 'Клиент видит заказы, документы, статусы и баланс в одном месте. Вопросы «а что там?» почти пропадают.' },
    audience: { en: 'Businesses where the same questions arrive by chat every day, documents are re-sent on request, and a manager is a search interface to a folder.', ru: 'Бизнесы, где каждый день в чат приходят одни и те же вопросы, документы пересылают по просьбе, а менеджер работает поиском по папке.' },
    base: 'crm',
    composition: [
      { en: 'sign-in and roles', ru: 'вход и роли' },
      { en: 'orders and statuses', ru: 'заказы и статусы' },
      { en: 'documents and invoices', ru: 'документы и счета' },
      { en: 'change notifications', ru: 'уведомления об изменении' },
    ],
    flow: [
      {
        t: { en: 'Signing in is not a barrier', ru: 'Вход не превращается в барьер' },
        d: { en: 'A link, a code or a company account, whichever fits your clients; a forgotten password is not a support ticket.', ru: 'Ссылка, код или корпоративный аккаунт, смотря как работают ваши клиенты; забытый пароль не должен становиться обращением в поддержку.' },
      },
      {
        t: { en: 'The same status you see', ru: 'Статус тот же, что у вас' },
        d: { en: 'The portal reads the system that is already the truth rather than keeping a second copy that drifts by Thursday.', ru: 'Кабинет читает ту систему, которая уже является истиной, а не держит вторую копию, которая к четвергу разъезжается.' },
      },
      {
        t: { en: 'Changes reach them without a manager', ru: 'Изменение доходит без менеджера' },
        d: { en: 'Shipped, signed, paid, delayed: whatever they would have asked about arrives as a notification with a link to the order.', ru: 'Отгружено, подписано, оплачено, задерживается: то, о чём они спросили бы, приходит уведомлением со ссылкой на конкретный заказ.' },
      },
    ],
    watch: [
      {
        t: { en: 'Who is allowed to see what', ru: 'Кому что видно' },
        d: { en: 'Two people from one client company rarely need equal access, and never another company’s data: that is a rule in the data.', ru: 'Двум людям из одной компании-клиента редко нужен одинаковый доступ, и ни один не должен видеть чужие данные: это правило на уровне данных.' },
      },
      {
        t: { en: 'An empty portal is worse', ru: 'Пустой кабинет хуже, чем никакого' },
        d: { en: 'If half the documents still go by chat, nobody logs in twice, so the first version covers the questions that get asked.', ru: 'Если половина документов всё равно уходит в чат, второй раз никто не зайдёт, поэтому первая версия закрывает только реально задаваемые вопросы.' },
      },
      {
        t: { en: 'It works on a phone', ru: 'Он обязан работать с телефона' },
        d: { en: 'The person checking whether the delivery left is standing somewhere, not sitting at a desk.', ru: 'Тот, кто проверяет, уехала ли отгрузка, где-то стоит, а не сидит за столом.' },
      },
    ],
    metrics: [
      { en: 'questions no longer asked by chat', ru: 'вопросов ушло из переписки' },
      { en: 'clients who log in twice', ru: 'клиентов, зашедших второй раз' },
      { en: 'documents downloaded without a request', ru: 'документов скачано без просьбы' },
      { en: 'manager hours returned', ru: 'возвращённых часов менеджера' },
    ],
    faq: [
      {
        q: { en: 'Can it live inside our existing site?', ru: 'Может ли он жить внутри нашего сайта?' },
        a: { en: 'Yes, as a section behind sign-in, and that is usually cheaper than a separate product. What decides it is where your data already lives.', ru: 'Да, разделом за авторизацией, и обычно это дешевле отдельного продукта. Решает то, где уже лежат ваши данные.' },
      },
      {
        q: { en: 'Will clients actually use it?', ru: 'Клиенты правда туда пойдут?' },
        a: { en: 'They go where the answer is. The link to the exact order sits inside every status notification, so the message they already read is what takes them into the portal.', ru: 'Они идут туда, где лежит ответ. Ссылка на конкретный заказ стоит внутри каждого уведомления о статусе, поэтому в кабинет ведёт сообщение, которое они и так читают.' },
      },
      {
        q: { en: 'Who manages access when the client’s staff change?', ru: 'Кто управляет доступами, когда у клиента меняются сотрудники?' },
        a: { en: 'An administrator on the client side adds and switches off their own people from inside the portal. Otherwise it becomes a letter to your manager and an account nobody closes.', ru: 'Администратор со стороны клиента заводит и отключает своих людей сам, прямо в кабинете. Иначе это письмо вашему менеджеру и доступ, который никто не закрывает.' },
      },
    ],
    stack: [
      { t: { en: 'Frontend', ru: 'Фронтенд' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Backend and data', ru: 'Бэкенд и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Integrations and monitoring', ru: 'Интеграции и мониторинг' }, items: ['Telegram Bot API', 'n8n', 'Docker', 'Sentry'] },
    ],
    notIncluded: [
      { en: 'Hosting, servers and document storage', ru: 'Хостинг, серверы и хранилище документов' },
      { en: 'The domain, registered to your business', ru: 'Домен на ваш бизнес' },
      { en: 'Email and SMS notifications', ru: 'Уведомления письмами и SMS' },
      { en: 'Payment provider fees on invoices paid', ru: 'Комиссии платёжных систем при оплате счетов' },
    ],
  },
  {
    slug: 'crm-and-erp-integration',
    group: 'ops',
    kicker: 'Back office sync',
    title: { en: 'CRM and accounting integration', ru: 'Интеграция с CRM и 1С' },
    lead: { en: 'Bitrix24, 1C, amoCRM and the other systems you run start exchanging data on their own. The copying by hand stops.', ru: 'Bitrix24, 1С, amoCRM и другие системы начинают обмениваться данными сами. Ручные переносы исчезают.' },
    audience: { en: 'Companies where one order sits in the CRM, in the accounting system and in a spreadsheet, and a mismatch surfaces at the end of the month.', ru: 'Компании, где один заказ лежит в CRM, в учётной системе и в таблице, а расхождение всплывает в конце месяца, когда исправлять уже дорого.' },
    base: 'integr',
    composition: [
      { en: 'a two-way link', ru: 'двусторонняя связка' },
      { en: 'field mapping', ru: 'карта полей' },
      { en: 'queue and retries', ru: 'очередь и повторы' },
      { en: 'outage alerts', ru: 'оповещение об остановке' },
    ],
    flow: [
      {
        t: { en: 'Something changes in one system', ru: 'В одной системе что-то меняется' },
        d: { en: 'A deal changes stage, a payment arrives, stock drops: a webhook catches it, or the system is polled on schedule.', ru: 'Сделка меняет стадию, приходит оплата, падает остаток: где есть вебхук, изменение ловится сразу, где нет, система опрашивается по расписанию.' },
      },
      {
        t: { en: 'Translated into the other system’s language', ru: 'Данные переводятся на язык второй системы' },
        d: { en: 'Correspondences live in one table rather than inside the exchange code, so a new status is a row somebody edits.', ru: 'Соответствия живут в одной таблице, а не внутри кода обмена, поэтому новый статус это правка строки, а не переписывание.' },
      },
      {
        t: { en: 'It arrives, or it fails loudly', ru: 'Доезжает или падает не молча' },
        d: { en: 'Success is the receiving system’s answer, not the fact of sending, and a record that fails is retried, then reported.', ru: 'Успех это ответ принимающей системы, а не факт отправки; запись, которая не прошла, повторяется и потом называется в сообщении.' },
      },
    ],
    watch: [
      {
        t: { en: 'Whose record wins', ru: 'Чья запись главная' },
        d: { en: 'Both systems get edited, so whose record wins is decided per field before the build: price from accounting, contact from the CRM.', ru: 'Правят обе системы, поэтому чья запись главная решается по каждому полю до сборки: цена из учёта, контакт из CRM.' },
      },
      {
        t: { en: 'A repeat must not double records', ru: 'Повтор не должен задваивать записи' },
        d: { en: 'The same exchange arrives more than once by design, so every operation carries a key and a repeat updates instead of doubling.', ru: 'Обмен приходит не по одному разу, поэтому у каждой операции свой ключ и повтор обновляет запись, а не заводит вторую.' },
      },
      {
        t: { en: 'A silent exchange is worse', ru: 'Тихий обмен хуже сломанного' },
        d: { en: 'A token expires or a field is renamed, and the stop looks like a quiet day, so silence raises the alert.', ru: 'Истёк токен, переименовали поле, и остановка выглядит как спокойный день, поэтому сигнал приходит и на тишину.' },
      },
    ],
    metrics: [
      { en: 'records passing untouched by hand', ru: 'записей проходит без ручного вмешательства' },
      { en: 'mismatches between the systems', ru: 'расхождений между системами' },
      { en: 'time from event to arrival', ru: 'время от события до второй системы' },
      { en: 'manual copying removed', ru: 'убранных часов ручного переноса' },
    ],
    faq: [
      {
        q: { en: 'Our 1C sits on the local network. Is this possible?', ru: 'Наша 1С стоит в локальной сети. Это возможно?' },
        a: { en: 'Yes. The exchange runs through an agent on your side that connects outward on its own, so no port is opened to the internet; a fully closed network gets a file exchange.', ru: 'Да. Обмен идёт через агента на вашей стороне, который сам ходит наружу, поэтому порт в интернет не открывается; для полностью закрытой сети договариваемся об обмене файлами.' },
      },
      {
        q: { en: 'Why not a ready-made connector from a marketplace?', ru: 'Почему не готовый коннектор из маркетплейса?' },
        a: { en: 'If a ready-made one covers your case, take it, and we will say so plainly. They break on what is yours alone: your fields, your statuses, a modified accounting configuration.', ru: 'Если готовый закрывает ваш случай, берите, и мы прямо это скажем. Ломаются они на том, что есть только у вас: свои поля, свои статусы, доработанная конфигурация учёта.' },
      },
      {
        q: { en: 'What happens when we change the CRM?', ru: 'Что будет, когда мы поменяем CRM?' },
        a: { en: 'The field mapping and the rules stay; what changes is the connector to that system, and that is the smaller part, because the logic never lived inside it.', ru: 'Соответствия полей и правила остаются, меняется коннектор к конкретной системе, и это меньшая часть работы, потому что логика никогда не жила внутри него.' },
      },
    ],
    stack: [
      { t: { en: 'Exchange and queues', ru: 'Обмен и очереди' }, items: ['Python', 'FastAPI', 'Node.js', 'n8n', 'Temporal', 'Redis'] },
      { t: { en: 'Storage and deployment', ru: 'Хранение и развёртывание' }, items: ['PostgreSQL', 'Docker', 'S3', 'Grafana'] },
      { t: { en: 'The settings screen', ru: 'Экран настроек' }, items: ['TypeScript', 'React', 'Next.js'] },
    ],
    notIncluded: [
      { en: 'Hosting and servers for the exchange', ru: 'Хостинг и серверы обмена' },
      { en: 'CRM and accounting licences and plans', ru: 'Лицензии и тарифы CRM и учёта' },
      { en: 'AI model calls used for matching', ru: 'Обращения к AI-моделям при сопоставлении' },
      { en: 'Email and SMS for alerts', ru: 'Письма и SMS для оповещений' },
    ],
  },
  {
    slug: 'management-dashboard',
    group: 'ops',
    kicker: 'Decisions',
    title: { en: 'Dashboard for the owner', ru: 'Дашборд для руководителя' },
    lead: { en: 'Every number that matters assembles itself and is current whenever you open it. Decisions get made on facts, not on a feeling.', ru: 'Все ключевые цифры собираются сами и всегда актуальны. Решения принимаются по фактам, а не по ощущениям.' },
    audience: { en: 'Owners who read the business off a spreadsheet somebody rebuilds by hand, and learn about a bad week once it is over.', ru: 'Владельцы, чья картина бизнеса это таблица, которую кто-то пересобирает руками, а о плохой неделе узнают, когда она закончилась.' },
    base: 'dash',
    composition: [
      { en: 'data collection', ru: 'сбор данных' },
      { en: 'key metrics', ru: 'ключевые метрики' },
      { en: 'filters and comparison', ru: 'фильтры и сравнение' },
      { en: 'scheduled digest', ru: 'дайджест по расписанию' },
    ],
    flow: [
      {
        t: { en: 'The sources are agreed first', ru: 'Сначала договариваемся об источниках' },
        d: { en: 'Which system is the truth for revenue, and which for orders, because two answers to one question kill trust.', ru: 'Какая система истина по выручке, а какая по заказам: два ответа на один вопрос убивают доверие к цифрам.' },
      },
      {
        t: { en: 'Collection runs without anybody', ru: 'Сбор идёт без участия человека' },
        d: { en: 'On a schedule, with retries, and with a visible mark when a source does not answer.', ru: 'По расписанию, с повторами и с видимой пометкой, если источник не ответил.' },
      },
      {
        t: { en: 'The screen answers in one look', ru: 'Экран отвечает с одного взгляда' },
        d: { en: 'A few numbers with a comparison beside each, and the detail underneath the one that moved.', ru: 'Несколько чисел, у каждого сравнение, а под ними подробности по тому, которое сдвинулось.' },
      },
    ],
    watch: [
      {
        t: { en: 'Agree the metric before building it', ru: 'Договориться о метрике до сборки' },
        d: { en: '«Revenue» means different things to different departments, and the written formula is what survives the first argument.', ru: '«Выручка» у разных отделов значит разное, и записанная формула это то, что переживает первый спор о цифре.' },
      },
      {
        t: { en: 'Freshness must be visible', ru: 'Свежесть должна быть видна' },
        d: { en: 'Every number carries its collection time, because deciding on yesterday’s figure believing it is today’s is the failure this prevents.', ru: 'У каждого числа написано, когда оно собрано: решение по вчерашней цифре в уверенности, что она сегодняшняя, и есть та самая ошибка.' },
      },
      {
        t: { en: 'Nobody opens a dashboard daily', ru: 'Никто не открывает дашборд каждый день' },
        d: { en: 'The digest is what gets read; the screen is where you go after it says something moved.', ru: 'Читают дайджест, а на экран заходят после того, как он сказал, что что-то сдвинулось.' },
      },
    ],
    metrics: [
      { en: 'sources collected without gaps', ru: 'источников собрано без пропусков' },
      { en: 'hours of manual assembly removed', ru: 'убранных часов ручной сборки' },
      { en: 'digests opened', ru: 'открытых дайджестов' },
      { en: 'same-day decisions', ru: 'решений в тот же день' },
    ],
    faq: [
      {
        q: { en: 'Why not Power BI or Metabase?', ru: 'Почему не Power BI или Metabase?' },
        a: { en: 'Often you should, and we will say so. Those need data already collected and clean; collecting and matching it is usually the actual job, and that is what this is.', ru: 'Часто и стоит, и мы это скажем. Им нужны уже собранные и чистые данные, а сбор и сопоставление обычно и есть настоящая работа.' },
      },
      {
        q: { en: 'What if some of our systems have no API?', ru: 'Что если у части систем нет API?' },
        a: { en: 'Then the number is read the way a person reads it off the screen, and that is its own line in the estimate. Dropping a source is also an option.', ru: 'Тогда цифра снимается так же, как её видит человек на экране, и это отдельная строка в смете. Отказаться от источника тоже вариант.' },
      },
      {
        q: { en: 'Can we add a metric later?', ru: 'Сможем добавить метрику потом?' },
        a: { en: 'Periods, segments and what sits on the screen you change yourselves. A new metric means a new source and a new formula, so it goes through us and is priced separately.', ru: 'Периоды, срезы и состав экрана вы меняете сами. Новая метрика это новый источник и новая формула, поэтому она идёт через нас и считается отдельно.' },
      },
    ],
    stack: [
      { t: { en: 'Collection and storage', ru: 'Сбор и хранение' }, items: ['Python', 'FastAPI', 'PostgreSQL', 'ClickHouse', 'Playwright', 'S3'] },
      { t: { en: 'The screen', ru: 'Экран' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Schedule and watching', ru: 'Расписание и присмотр' }, items: ['n8n', 'Temporal', 'Redis', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'hosting and servers, invoiced by the provider', ru: 'хостинг и серверы, счёт от провайдера' },
      { en: 'paid API tiers on your source systems', ru: 'платные тарифы систем-источников за API' },
      { en: 'the domain, if the screen gets one', ru: 'домен, если у экрана свой адрес' },
      { en: 'mail delivery for the digest', ru: 'рассылка дайджеста почтой' },
    ],
  },
  {
    slug: 'ai-agent-for-business-process',
    group: 'complex',
    kicker: 'Process automation',
    title: { en: 'AI agent for a business process', ru: 'AI-агент для бизнес-процесса' },
    lead: { en: 'It takes the routine steps itself, works to the rules, and hands a person only the exceptions.', ru: 'Берёт на себя рутинные шаги, работает по правилам и передаёт человеку только исключения.' },
    audience: { en: 'Processes done by hand every day to the same rules, where the rules are written down nowhere except in somebody’s head.', ru: 'Процессы, которые каждый день делают руками по одним и тем же правилам, а сами правила записаны только в чьей-то голове.' },
    base: 'agent',
    addons: ['auth', 'admin', 'ai'],
    composition: [
      { en: 'one whole process', ru: 'один процесс целиком' },
      { en: 'explicit rules', ru: 'явные правила' },
      { en: 'exception queue', ru: 'очередь исключений' },
      { en: 'decision log', ru: 'журнал решений' },
    ],
    flow: [
      {
        t: { en: 'A task reaches the agent', ru: 'Задача попадает к агенту' },
        d: { en: 'The trigger is not a button: a new email, a new row, a time on the clock.', ru: 'Триггер это не кнопка, а новое письмо, новая строка в таблице или время на часах.' },
      },
      {
        t: { en: 'It walks the steps', ru: 'Проходит шаги по правилам' },
        d: { en: 'Every step is either a fixed rule or a decision handed to a model, and the line is drawn beforehand.', ru: 'Каждый шаг это либо жёсткое правило, либо решение, отданное модели, и граница между ними проводится до сборки.' },
      },
      {
        t: { en: 'An exception goes to a person', ru: 'Исключение уходит человеку' },
        d: { en: 'It stops and arrives as one message: the case, what the agent has done, what it is missing.', ru: 'Он останавливается и приходит одним сообщением: что за случай, что агент уже сделал и чего ему не хватает.' },
      },
    ],
    watch: [
      {
        t: { en: 'The exception list matters more', ru: 'Список исключений важнее списка шагов' },
        d: { en: 'A process described the way it runs when everything goes right breaks on a refund, a duplicate, an empty field.', ru: 'Процесс, описанный таким, каким он идёт, когда всё в порядке, ломается на возврате, на дубле, на пустом поле.' },
      },
      {
        t: { en: 'Where a person has to confirm', ru: 'Где решение подтверждает человек' },
        d: { en: 'An action that cannot be undone, an email sent or money taken, goes through a confirmation decided before the code.', ru: 'Действие, которое нельзя откатить, отправленное письмо или списанные деньги, проходит через подтверждение, и это решается до кода.' },
      },
      {
        t: { en: 'A silent agent looks fine', ru: 'Молчащий агент выглядит рабочим' },
        d: { en: 'Stopping without an alert goes unnoticed, so the agent checks in on a schedule and every step has a waiting limit.', ru: 'Остановка без оповещения остаётся незамеченной, поэтому агент регулярно отмечается, что жив, и у каждого шага есть предел ожидания.' },
      },
    ],
    metrics: [
      { en: 'tasks closed without a person', ru: 'задач, закрытых без человека' },
      { en: 'exceptions per day', ru: 'исключений в день' },
      { en: 'time from event to result', ru: 'время от события до результата' },
      { en: 'model cost per month', ru: 'стоимость модели за месяц' },
    ],
    faq: [
      {
        q: { en: 'What happens when the agent gets it wrong?', ru: 'Что будет, если агент ошибётся?' },
        a: { en: 'Every action is written to a log that shows which step and which rule produced it. Irreversible steps sit behind a human confirmation, so a mistake costs a redone task, not money.', ru: 'Каждое действие пишется в журнал, и по нему видно, на каком шаге и по какому правилу принято решение. Необратимые шаги закрыты подтверждением человека, поэтому цена ошибки это переделанная задача, а не деньги.' },
      },
      {
        q: { en: 'Does it need access to our systems?', ru: 'Придётся отдавать доступы к нашим системам?' },
        a: { en: 'Yes, and only to the systems the process touches. Keys are created in your own accounts, scoped to specific actions, and you can revoke them at any moment without us.', ru: 'Да, и ровно к тем, которые участвуют в процессе. Ключи заводятся на ваших аккаунтах, права выдаются под конкретные действия, и вы забираете доступ в любой момент без нас.' },
      },
      {
        q: { en: 'Do we actually need AI here, or a plain script?', ru: 'Здесь точно нужен AI, а не обычный скрипт?' },
        a: { en: 'Often a script is enough, and we say so. A model is needed only where the input is unstructured: a request in plain words, a document laid out differently each time.', ru: 'Часто скрипта достаточно, и мы скажем это прямо. Модель нужна только там, где вход неструктурированный: просьба, написанная словами, или документ, свёрстанный каждый раз по-новому.' },
      },
    ],
    stack: [
      { t: { en: 'Agent and models', ru: 'Агент и модели' }, items: ['Python', 'FastAPI', 'OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Steps, queues and retries', ru: 'Шаги, очереди и повторы' }, items: ['Temporal', 'n8n', 'Redis', 'PostgreSQL', 'Playwright', 'Docker'] },
      { t: { en: 'Where the result lands', ru: 'Куда приходит результат' }, items: ['Telegram Bot API', 'Grafana', 'S3'] },
    ],
    notIncluded: [
      { en: 'AI model calls, billed by the provider', ru: 'обращения к AI-моделям по тарифу провайдера' },
      { en: 'hosting and servers', ru: 'хостинг и серверы' },
      { en: 'subscriptions to your CRM, mail, telephony', ru: 'подписки на вашу CRM, почту, телефонию' },
      { en: 'the domain and sending address for email', ru: 'домен и адрес отправителя для писем' },
    ],
  },
  {
    slug: 'customer-onboarding-automation',
    group: 'complex',
    kicker: 'Activation',
    title: { en: 'Customer onboarding automation', ru: 'Автоматизация онбординга клиентов' },
    lead: { en: 'After the payment the system leads the customer itself, hands out access, and pushes them on to the next step.', ru: 'После оплаты система сама ведёт клиента, выдаёт доступы и дожимает до следующего шага.' },
    audience: { en: 'Products where a customer pays, gets a confirmation and is then on their own, while a manager sends access and reminders by hand.', ru: 'Продукты, где клиент после оплаты получает подтверждение и остаётся один, а доступы и напоминания рассылает руками менеджер.' },
    base: 'integr',
    composition: [
      { en: 'access on payment', ru: 'доступ после оплаты' },
      { en: 'a message chain', ru: 'цепочка сообщений' },
      { en: 'reminders', ru: 'напоминания' },
      { en: 'a drop-off report', ru: 'отчёт об отвалах' },
    ],
    flow: [
      {
        t: { en: 'The payment opens the door', ru: 'Оплата открывает доступ' },
        d: { en: 'A webhook creates the account and sends the sign-in at once, because the pause after paying cools a customer off.', ru: 'Вебхук создаёт аккаунт и присылает вход сразу, потому что пауза после оплаты это первое место, где клиент остывает.' },
      },
      {
        t: { en: 'Steps drive it, not dates', ru: 'Дальше ведёт шаг, а не календарь' },
        d: { en: 'Every message asks for exactly one action, and a customer who has taken it gets the next one instead.', ru: 'Каждое сообщение зовёт ровно к одному действию, а клиент, который шаг уже сделал, получает следующее, а не то же самое.' },
      },
      {
        t: { en: 'A stuck customer is handed over', ru: 'Застрявшего передают человеку' },
        d: { en: 'If a step is not taken in its window, the customer lands on a person’s list with the context assembled.', ru: 'Если шаг не сделан за отведённое время, клиент попадает в список к человеку с уже собранным контекстом.' },
      },
    ],
    watch: [
      {
        t: { en: 'Follow-up is not a mailing schedule', ru: 'Прогрев это не расписание рассылки' },
        d: { en: 'A chain driven by dates keeps writing to people who have already done everything, so every message checks state before it sends.', ru: 'Цепочка по датам продолжает писать тому, кто всё уже сделал, поэтому каждое сообщение проверяет состояние клиента перед отправкой.' },
      },
      {
        t: { en: 'One step at a time', ru: 'Один шаг за раз' },
        d: { en: 'A message with several tasks and links gets closed unread, so each one asks for a single action.', ru: 'Сообщение с несколькими задачами и ссылками закрывают, не читая, поэтому каждое зовёт к одному действию.' },
      },
      {
        t: { en: 'The right to write runs out', ru: 'Право писать заканчивается' },
        d: { en: 'Consent, one-tap unsubscribe and a cap on frequency decide whether your domain still delivers mail later, so they go in first.', ru: 'Согласие, отписка в одно нажатие и предел частоты решают, будет ли ваш домен доставлять письма дальше, поэтому ставятся сразу.' },
      },
    ],
    metrics: [
      { en: 'reached the first sign-in', ru: 'дошли до первого входа' },
      { en: 'reached the first result', ru: 'дошли до первого результата' },
      { en: 'unsubscribes in the chain', ru: 'отписки в цепочке' },
      { en: 'churn in the first month', ru: 'отток в первый месяц' },
    ],
    faq: [
      {
        q: { en: 'What if a payment lands and access is not granted?', ru: 'Что если оплата прошла, а доступ не выдался?' },
        a: { en: 'Webhooks arrive more than once and sometimes late, so granting access is idempotent and a repeat cannot create a second account. A failed grant goes into a retry queue and an alert.', ru: 'Вебхуки приходят не по одному разу и иногда с задержкой, поэтому выдача идемпотентна и повтор не создаёт второй аккаунт. Неудачная выдача уходит в очередь повторов и в оповещение.' },
      },
      {
        q: { en: 'Email or Telegram?', ru: 'Письма или Telegram?' },
        a: { en: 'We look at where the customer already replies. An email survives until it is needed, a messenger is read sooner, and each channel is its own line in the estimate.', ru: 'Смотрим, где клиент уже отвечает. Письмо доживает до нужного момента, сообщение читают быстрее, и каждый канал это своя строка в смете.' },
      },
      {
        q: { en: 'Can this sit on top of our CRM and mailing tool?', ru: 'Можно поставить это поверх нашей CRM и рассылки?' },
        a: { en: 'Yes, and it is usually cheaper: the chain runs in what you already pay for, and we build the customer state and the rules that decide whether a message goes out.', ru: 'Да, и обычно так дешевле: цепочку ведёт то, что у вас уже оплачено, а мы делаем состояние клиента и правила, по которым сообщение уходит или нет.' },
      },
    ],
    stack: [
      { t: { en: 'Payment and access', ru: 'Оплата и доступ' }, items: ['Stripe', 'Paddle', 'Node.js', 'PostgreSQL', 'Prisma'] },
      { t: { en: 'The chain and its timing', ru: 'Цепочка и расписание' }, items: ['Temporal', 'n8n', 'Redis', 'Telegram Bot API', 'Docker'] },
      { t: { en: 'Screens and reports', ru: 'Экраны и отчёты' }, items: ['TypeScript', 'React', 'Next.js', 'ClickHouse', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'the email delivery service', ru: 'сервис рассылки писем' },
      { en: 'payment provider fees', ru: 'комиссии платёжных систем' },
      { en: 'the domain mail goes out from', ru: 'домен, с которого уходят письма' },
      { en: 'SMS and telephony, if reminders go there', ru: 'SMS и телефония, если напоминания идут туда' },
    ],
  },
  {
    slug: 'internal-team-tool',
    group: 'complex',
    kicker: 'Team ops',
    title: { en: 'Internal tool for a team', ru: 'Внутренний инструмент для команды' },
    lead: { en: 'Instead of spreadsheets and chat threads: the tasks, the statuses and the next step in one place.', ru: 'Вместо таблиц и переписок: задачи, статусы и следующий шаг в одном месте.' },
    audience: { en: 'Teams whose work lives in a few spreadsheets and a chat thread, where the next step is held in somebody’s head.', ru: 'Команды, чья работа лежит в нескольких таблицах и переписке, а следующий шаг держится в голове того, кто задачу ведёт.' },
    base: 'crm',
    composition: [
      { en: 'tasks and owners', ru: 'задачи и ответственные' },
      { en: 'your own statuses', ru: 'ваши статусы' },
      { en: 'roles and rights', ru: 'роли и права' },
      { en: 'Telegram notifications', ru: 'уведомления в Telegram' },
    ],
    flow: [
      {
        t: { en: 'A task arrives with an owner', ru: 'Задача появляется вместе с ответственным' },
        d: { en: 'It records who does it, by when and what counts as done; a task with no owner does not save.', ru: 'В ней записано, кто делает, к какому сроку и что считается сделанным, а задача без ответственного не сохраняется.' },
      },
      {
        t: { en: 'The doer moves the status', ru: 'Статус двигает тот, кто делает' },
        d: { en: 'One screen with your own tasks, a move between stages in one tap, and the comment beside the task.', ru: 'Один экран со своими задачами, перевод между стадиями в одно касание и комментарий рядом с задачей, а не в чате.' },
      },
      {
        t: { en: 'Closing sets the next step', ru: 'Закрытие назначает следующий шаг' },
        d: { en: 'A task closes with an answer to what happens next: another task, a return date, or an explicit «nothing further».', ru: 'Задача закрывается вместе с ответом, что дальше: новая задача, дата возврата или явное «здесь всё».' },
      },
    ],
    watch: [
      {
        t: { en: 'The stages are named first', ru: 'Стадии называются до сборки' },
        d: { en: 'While «in progress» and «in review» mean different things to different people, the board shows a disagreement about words rather than work.', ru: 'Пока «в работе» и «на проверке» значат для разных людей разное, доска показывает расхождение в словах, а не состояние дел.' },
      },
      {
        t: { en: 'Not a second place to type', ru: 'Не второе место ручного ввода' },
        d: { en: 'If a chat enquiry becomes a hand-typed task, soon it is not typed at all, so the sources are wired in first.', ru: 'Если заявка из чата становится задачей, заведённой руками, скоро её перестанут заводить, поэтому источники подключаются сразу.' },
      },
      {
        t: { en: 'Notifications turn into noise fast', ru: 'Уведомления быстро превращаются в шум' },
        d: { en: 'If everything is sent, nothing is read, so a person hears only about what they own or are mentioned in.', ru: 'Если приходит всё, читать перестают вовсе, поэтому человеку приходит только то, где он ответственный или упомянут.' },
      },
    ],
    metrics: [
      { en: 'tasks entered without a reminder', ru: 'задач заводят без напоминаний' },
      { en: 'tasks with no owner', ru: 'задач без ответственного' },
      { en: 'closed tasks with a next step', ru: 'закрытых задач со следующим шагом' },
      { en: 'spreadsheets still in use', ru: 'таблиц, которыми ещё пользуются' },
    ],
    faq: [
      {
        q: { en: 'Why not Notion or Trello?', ru: 'Почему не Notion или Trello?' },
        a: { en: 'Often you should, and we say so. A ready-made board is cheaper while your process fits it; your own tool earns its place when you need calculations, rights by role and links to your systems.', ru: 'Часто и стоит, и мы это скажем. Готовая доска дешевле, пока процесс в неё ложится, а своё нужно там, где есть расчёты внутри задачи, права по ролям и связь с вашими системами.' },
      },
      {
        q: { en: 'Who will actually use it if the team lives in a chat?', ru: 'Кто будет им пользоваться, если команда живёт в чате?' },
        a: { en: 'That is why the interface is often Telegram itself: a task is created and closed without opening anything new. A tool that demands a new habit does not survive a busy week.', ru: 'Поэтому интерфейсом часто становится тот же Telegram: задачу заводят и закрывают, не открывая ничего нового. Инструмент, ради которого надо менять привычку, не переживает загруженную неделю.' },
      },
      {
        q: { en: 'What happens to the current spreadsheets?', ru: 'Что будет с нынешними таблицами?' },
        a: { en: 'We move what is alive and leave the archive where it is. Spreadsheets carry duplicates and abandoned rows, so cleaning them is planned work rather than a surprise on launch day.', ru: 'Переносим то, что живо, архив оставляем на месте. В таблицах есть дубли и брошенные строки, поэтому чистка это запланированная работа, а не сюрприз в день запуска.' },
      },
    ],
    stack: [
      { t: { en: 'Interface', ru: 'Интерфейс' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Backend and data', ru: 'Бэкенд и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Notifications and operations', ru: 'Уведомления и эксплуатация' }, items: ['Telegram Bot API', 'n8n', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'hosting and servers', ru: 'хостинг и серверы' },
      { en: 'the domain, if the tool gets one', ru: 'домен, если у инструмента свой адрес' },
      { en: 'SMS and telephony beyond a messenger', ru: 'SMS и телефония вне мессенджера' },
      { en: 'AI model calls, if it summarises', ru: 'обращения к AI-моделям, если есть сводки' },
    ],
  },
  {
    slug: 'custom-browser-extension',
    group: 'complex',
    kicker: 'Browser tooling',
    title: { en: 'Custom browser extension', ru: 'Браузерное расширение на заказ' },
    lead: { en: 'It removes repeating actions right in the browser: creating deals, filling in fields, sending a template.', ru: 'Убирает повторяющиеся действия прямо в браузере: создание сделок, подстановка данных, отправка шаблона.' },
    audience: { en: 'Work that lives entirely inside somebody else’s interface, a CRM or a supplier portal, where the API is missing or locked behind a plan nobody buys.', ru: 'Работа, которая целиком живёт в чужом интерфейсе, в CRM или кабинете поставщика, где API либо нет, либо он закрыт тарифом, который никто не купит.' },
    base: 'extension',
    composition: [
      { en: 'in-page buttons', ru: 'кнопки на странице' },
      { en: 'field autofill', ru: 'подстановка данных' },
      { en: 'message templates', ru: 'шаблоны сообщений' },
      { en: 'handoff to CRM', ru: 'перенос в CRM' },
    ],
    flow: [
      {
        t: { en: 'The extension recognises the page', ru: 'Расширение узнаёт страницу' },
        d: { en: 'It wakes only where it has something to do and puts its button where the cursor already is.', ru: 'Оно просыпается только там, где ему есть что делать, и ставит кнопку рядом с тем местом, где курсор и так стоит.' },
      },
      {
        t: { en: 'The data comes off the tab', ru: 'Данные берутся с открытой вкладки' },
        d: { en: 'Whatever the person can see, the extension reads, lays into the fields of another form or sends to your system.', ru: 'Всё, что человек видит, расширение читает, раскладывает по полям другой формы или отправляет в вашу систему.' },
      },
      {
        t: { en: 'The action is confirmed, not assumed', ru: 'Действие подтверждается, а не случается само' },
        d: { en: 'What goes and where is on screen first, since a deal created silently in the wrong place costs more.', ru: 'Перед отправкой видно, что уйдёт и куда: сделка, молча созданная не там, стоит дороже одного лишнего клика.' },
      },
    ],
    watch: [
      {
        t: { en: 'Permissions decide whether it gets published', ru: 'Разрешения решают судьбу публикации' },
        d: { en: 'Access to all sites means a long store review, so the address list is narrowed before the first line of code.', ru: 'Доступ ко всем сайтам это долгая проверка в магазине, поэтому список адресов сужается до первой строки кода.' },
      },
      {
        t: { en: 'Somebody else’s interface changes without warning', ru: 'Чужой интерфейс меняется без предупреждения' },
        d: { en: 'A redesign breaks the binding to a field silently, so the extension checks it found what it expected and reports a change.', ru: 'Смена вёрстки молча ломает привязку к полю, поэтому расширение проверяет, что нашло ожидаемое, и сообщает об изменении страницы.' },
      },
      {
        t: { en: 'Old versions stay live', ru: 'Старые версии остаются в работе' },
        d: { en: 'The store review sits between publishing and everyone having it, so the extension and your server agree on a version.', ru: 'Между выкладкой и моментом, когда обновление дойдёт до всех, стоит проверка магазина, поэтому расширение и сервер договариваются о версии.' },
      },
    ],
    metrics: [
      { en: 'actions done from the extension', ru: 'действий из расширения' },
      { en: 'clicks per operation', ru: 'кликов на операцию' },
      { en: 'page binding failures', ru: 'сбоев привязки к странице' },
      { en: 'team on the current version', ru: 'доля команды на свежей версии' },
    ],
    faq: [
      {
        q: { en: 'Will the service notice we are using an extension?', ru: 'Заметит ли сервис, что мы используем расширение?' },
        a: { en: 'It works in the browser as the person already signed in, doing what they do by hand. The limit is that service’s terms, and we say so before the estimate rather than after a block.', ru: 'Расширение работает в браузере от имени человека, который уже вошёл, и делает то, что он делает руками. Граница это условия сервиса, и мы скажем о них до сметы, а не после блокировки.' },
      },
      {
        q: { en: 'What if the service does have an API?', ru: 'А если у сервиса всё-таки есть API?' },
        a: { en: 'Then take the API, and we say so. An extension earns its place where there is no API, where it costs more than the job, or where it does not return what the screen shows.', ru: 'Тогда обычно надо брать API, и мы это скажем. Расширение уместно там, где API нет, где он стоит дороже самой задачи или где он не отдаёт того, что видно на экране.' },
      },
      {
        q: { en: 'Does it have to go into the store?', ru: 'Обязательно публиковать в магазине?' },
        a: { en: 'No. For an internal team it is distributed privately and updates depend only on you; publication matters when your clients install it, and then the review is planned in.', ru: 'Нет. Внутренней команде расширение раздают закрыто, и обновления зависят только от вас; публикация нужна, когда его ставят ваши клиенты, и тогда проверку магазина закладываем заранее.' },
      },
    ],
    stack: [
      { t: { en: 'Extension', ru: 'Расширение' }, items: ['TypeScript', 'React', 'Chrome Manifest V3'] },
      { t: { en: 'Backend and data', ru: 'Бэкенд и данные' }, items: ['Node.js', 'PostgreSQL', 'Redis', 'S3'] },
      { t: { en: 'Tests and operations', ru: 'Тесты и эксплуатация' }, items: ['Playwright', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'a Chrome Web Store developer account', ru: 'аккаунт разработчика в Chrome Web Store' },
      { en: 'hosting, if there is a server side', ru: 'хостинг, если есть серверная часть' },
      { en: 'the domain for the privacy policy page', ru: 'домен для страницы политики конфиденциальности' },
      { en: 'AI model calls, if it rewrites text', ru: 'обращения к AI-моделям при разборе текста' },
    ],
  },

  /* ----------------------------------------------------------------------
     THE CATALOGUE. No group, so the hub lists these by work type underneath the
     featured twelve. Each is a scenario somebody types into a search box, and
     each is written to the same depth as the twelve above rather than thinned
     out to make the count: a page that exists only to be indexed is a page a
     visitor bounces off, which costs the ranking it was built for.
     ------------------------------------------------------------------- */

  {
    slug: 'ai-assistant-for-clinic',
    kicker: 'Patient intake',
    title: { en: 'AI assistant for a clinic', ru: 'AI-ассистент для клиники' },
    lead: { en: 'It books the right specialist, sends the preparation notes and answers about address, hours and documents. Everything before the consulting room, nothing inside it.', ru: 'Записывает к нужному специалисту, присылает памятку о подготовке и отвечает про адрес, часы работы и документы. Всё, что до кабинета, и ничего из того, что в кабинете.' },
    audience: { en: 'Clinics where an administrator repeats the same answer about preparing for a test all day, and a patient who cannot get through books across the road.', ru: 'Клиники, где администратор полдня повторяет один и тот же ответ про подготовку к анализам, а пациент, который не дозвонился, записывается в клинику через дорогу.' },
    base: 'agent',
    composition: [
      { en: 'services and prices', ru: 'услуги и цены' },
      { en: 'doctor booking', ru: 'запись к врачу' },
      { en: 'preparation notes', ru: 'памятки о подготовке' },
      { en: 'reminders and rescheduling', ru: 'напоминания и перенос' },
    ],
    flow: [
      {
        t: { en: 'The patient writes rather than calls', ru: 'Пациент пишет, а не дозванивается' },
        d: { en: 'A message at any hour is matched against what the assistant may answer: your services, prices, hours and specialities.', ru: 'Сообщение в любое время сверяется с тем, на что ассистенту разрешено отвечать: услуги, цены, часы работы и специальности врачей.' },
      },
      {
        t: { en: 'A slot, not a request', ru: 'Слот, а не заявка' },
        d: { en: 'It shows the time that specialist actually has free and holds the slot at the moment of confirmation.', ru: 'Ассистент показывает время, которое у врача действительно свободно, и закрепляет слот в момент подтверждения.' },
      },
      {
        t: { en: 'The preparation arrives before the visit', ru: 'Подготовка приходит до приёма' },
        d: { en: 'The day before, a reminder carries what to do in advance and a one-tap way to move the appointment.', ru: 'Накануне приходит напоминание с тем, что нужно сделать заранее, и с переносом в одно касание.' },
      },
    ],
    watch: [
      {
        t: { en: 'A symptom is a route', ru: 'Симптом это маршрут, а не вопрос' },
        d: { en: 'Any answer with substance here is a medical consultation, so the assistant turns the description into a speciality and offers a time.', ru: 'Любой содержательный ответ здесь это медицинская консультация, поэтому ассистент переводит описание в специальность и предлагает время.' },
      },
      {
        t: { en: 'The schedule is not the record', ru: 'Расписание и карта разные источники' },
        d: { en: 'The assistant works with the schedule and the price list; diagnoses and results are another category and never reach a chat.', ru: 'Ассистент работает с расписанием и прайсом, а диагнозы и результаты это другая категория данных, и в переписку они не попадают.' },
      },
      {
        t: { en: 'The wrong doctor', ru: 'Не к тому врачу' },
        d: { en: 'A wrong speciality costs more than no booking, so the mapping is agreed with you and doubtful cases go to an administrator.', ru: 'Ошибка в специальности стоит дороже несостоявшейся записи, поэтому соответствие расписывается вместе с вами, а неоднозначный случай уходит администратору.' },
      },
    ],
    metrics: [
      { en: 'questions closed without an administrator', ru: 'доля вопросов без администратора' },
      { en: 'bookings outside working hours', ru: 'записей вне рабочих часов' },
      { en: 'no-show and late cancellation rate', ru: 'доля неявок и поздних отмен' },
      { en: 'bookings with the speciality changed', ru: 'записей со сменой специальности' },
    ],
    faq: [
      {
        q: { en: 'Will it start diagnosing people?', ru: 'Он не начнёт ставить диагнозы?' },
        a: { en: 'No: symptoms only choose a speciality, and the wordings on which it must fall silent, show the emergency number and call a person are approved by you.', ru: 'Нет: симптомы он использует только для выбора специальности, а список формулировок, на которых он обязан замолчать, показать телефон неотложной помощи и позвать человека, вы утверждаете до запуска.' },
      },
      {
        q: { en: 'Where are the conversations with patients stored?', ru: 'Где хранятся переписки с пациентами?' },
        a: { en: 'In your own infrastructure and in the jurisdiction you name; we keep no copy. What the assistant may see is limited before the build: the schedule and services yes, the record no.', ru: 'В вашей инфраструктуре и в той юрисдикции, которую вы назовёте; копию у себя мы не держим. Что ассистенту вообще видно, ограничивается до сборки: расписание и услуги да, карта пациента нет.' },
      },
      {
        q: { en: 'We already run a clinic information system, will it connect?', ru: 'У нас уже стоит МИС, он с ней свяжется?' },
        a: { en: 'If it has an API, the schedule is read from it and the appointment is created in it, so there is still one schedule. If it has none, we say so before the estimate.', ru: 'Если у неё есть API, расписание читается из неё и запись создаётся там же, чтобы расписание осталось одно. Если API нет, мы говорим это до сметы.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and models', ru: 'Ассистент и модели' }, items: ['Python', 'FastAPI', 'OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Schedule and data', ru: 'Расписание и данные' }, items: ['PostgreSQL', 'Redis', 'Docker'] },
      { t: { en: 'Channels and monitoring', ru: 'Каналы и наблюдение' }, items: ['Telegram Bot API', 'n8n', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls', ru: 'обращения к AI-моделям' },
      { en: 'hosting that meets your data rules', ru: 'хостинг с учётом требований к данным' },
      { en: 'the clinic system subscription and its API', ru: 'подписка на МИС и её API' },
      { en: 'SMS reminders', ru: 'SMS-напоминания' },
    ],
  },
  {
    slug: 'ai-assistant-for-beauty-salon',
    kicker: 'Salon booking',
    title: { en: 'AI assistant for a beauty salon', ru: 'AI-ассистент для салона красоты' },
    lead: { en: 'It answers on services, prices and durations, books the specialist the client actually goes to, and reminds them the day before. Free time comes from the salon’s own schedule.', ru: 'Отвечает про услуги, цены и длительность, записывает к тому мастеру, к которому клиент ходит, и напоминает накануне. Свободное время берётся из расписания салона.' },
    audience: { en: 'Salons where booking happens in direct messages, an administrator replies between clients, and every missed «is my specialist in on Saturday?» is an empty chair.', ru: 'Салоны, где запись идёт в директ и мессенджеры, администратор отвечает между клиентами, а каждое пропущенное «мой мастер в субботу работает?» это пустое кресло.' },
    base: 'agent',
    composition: [
      { en: 'prices and durations', ru: 'прайс и длительность' },
      { en: 'booking by specialist', ru: 'запись к мастеру' },
      { en: 'reminders and rescheduling', ru: 'напоминания и перенос' },
      { en: 'a waiting list', ru: 'лист ожидания' },
    ],
    flow: [
      {
        t: { en: 'First the service, then the slot', ru: 'Сначала услуга, потом запись' },
        d: { en: 'The assistant answers from your price list with the duration, and where the price says «from», it says exactly that.', ru: 'Ассистент отвечает по вашему прайсу, с длительностью и составом услуги, а если цена стоит с «от», он так и говорит.' },
      },
      {
        t: { en: 'The specialist first, the time second', ru: 'Сначала мастер, потом время' },
        d: { en: 'Availability is computed for that person: their hours, their services, their timings and the cleanup between clients.', ru: 'Время считается по этому человеку: его часы, его услуги, его длительность и уборка между клиентами.' },
      },
      {
        t: { en: 'A reminder the day before', ru: 'Напоминание накануне' },
        d: { en: 'The reminder carries a one-tap reschedule, because most no-shows are people who cannot say they are not coming.', ru: 'В напоминании есть перенос в одно касание, потому что большинство неявок это те, кому неловко сказать, что они не придут.' },
      },
    ],
    watch: [
      {
        t: { en: 'The client’s hair decides the price', ru: 'Цену решает голова клиента' },
        d: { en: 'Where the price list holds a range, the assistant gives the range and what moves it, and the specialist names the sum.', ru: 'Где в прайсе диапазон, ассистент называет диапазон и то, от чего он зависит, а точную сумму говорит мастер на месте.' },
      },
      {
        t: { en: 'A specialist is not interchangeable', ru: 'Мастер не взаимозаменяем' },
        d: { en: 'A booking names a person by default, and if a specialist falls ill the assistant offers to move rather than quietly substituting.', ru: 'Запись именная по умолчанию, а если мастер заболел, ассистент предлагает перенос, а не тихую замену.' },
      },
      {
        t: { en: 'A gap costs money', ru: 'Окно стоит денег' },
        d: { en: 'Rules for moving and for deposits go in before launch, and a freed slot is offered automatically while somebody still wants it.', ru: 'Правила переноса и депозита записываются до запуска, а освободившийся слот предлагается автоматически, пока он ещё кому-то нужен.' },
      },
    ],
    metrics: [
      { en: 'bookings without an administrator', ru: 'записей без администратора' },
      { en: 'bookings made after closing', ru: 'записей после закрытия салона' },
      { en: 'no-show and late cancellation rate', ru: 'доля неявок и поздних отмен' },
      { en: 'slots filled from the waiting list', ru: 'окон, закрытых из листа ожидания' },
    ],
    faq: [
      {
        q: { en: 'Will it give an exact price for colouring?', ru: 'Он назовёт точную цену на окрашивание?' },
        a: { en: 'Only where the price list holds an exact price. Where it says «from», that is what it answers, and we do not ship a version that names a number your price list does not hold.', ru: 'Только там, где точная цена есть в прайсе. Где стоит «от», он так и отвечает, и мы не выпускаем версию, в которой ассистент называет число, которого в вашем прайсе нет.' },
      },
      {
        q: { en: 'Our bookings live in an industry booking system, will it connect?', ru: 'У нас запись в отраслевой системе, он с ней свяжется?' },
        a: { en: 'If the system has an API, the schedule is read from it and the appointment created there, so the salon keeps one book. If not, we say so before the estimate.', ru: 'Если у системы есть API, расписание читается из неё и запись создаётся там же: у салона остаётся один журнал. Если API нет или он платный, мы говорим это до сметы.' },
      },
      {
        q: { en: 'What if a client is unhappy with the result?', ru: 'А если клиент недоволен результатом?' },
        a: { en: 'That message goes to a person immediately, with no attempt at an answer. The assistant never discusses the quality of a specialist’s work and never promises a refund or a free correction.', ru: 'Такое сообщение уходит человеку сразу, без попытки ответить. Ассистент не обсуждает качество работы мастера и никогда не обещает ни возврат, ни бесплатное исправление.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and channels', ru: 'Ассистент и каналы' }, items: ['Python', 'FastAPI', 'Telegram Bot API', 'OpenAI', 'Anthropic'] },
      { t: { en: 'Schedule and data', ru: 'Расписание и данные' }, items: ['PostgreSQL', 'Redis', 'Docker'] },
      { t: { en: 'Screens and monitoring', ru: 'Экраны и наблюдение' }, items: ['TypeScript', 'React', 'Next.js', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls', ru: 'обращения к AI-моделям' },
      { en: 'the booking system subscription and its API', ru: 'подписка на систему записи и её API' },
      { en: 'SMS reminders', ru: 'SMS-напоминания' },
      { en: 'payment fees on deposits', ru: 'комиссия платёжной системы с депозитов' },
    ],
  },
  {
    slug: 'ai-assistant-for-online-school',
    kicker: 'Student support',
    title: { en: 'AI assistant for an online school', ru: 'AI-ассистент для онлайн-школы' },
    lead: { en: 'It answers students from the course materials, restores access and reminds about deadlines, without doing the assignment for them. The curator gets only what needs a person.', ru: 'Отвечает ученикам по материалам курса, восстанавливает доступы и напоминает про дедлайны, но задание за ученика не решает. Куратору достаётся только то, где нужен человек.' },
    audience: { en: 'Schools where one curator runs several cohorts and every cohort brings the same questions about access, recordings and deadlines.', ru: 'Школы, где один куратор ведёт несколько потоков и каждый поток приносит одни и те же вопросы про доступы, записи и дедлайны.' },
    base: 'agent',
    composition: [
      { en: 'course answers', ru: 'ответы по курсу' },
      { en: 'access recovery', ru: 'восстановление доступов' },
      { en: 'deadline reminders', ru: 'напоминания о дедлайнах' },
      { en: 'curator handover', ru: 'передача куратору' },
    ],
    flow: [
      {
        t: { en: 'A question from a known student', ru: 'Вопрос приходит от конкретного ученика' },
        d: { en: 'The assistant sees the cohort, the open module and the payment, so it answers with a fact.', ru: 'Ассистент видит поток, открытый модуль и оплату, поэтому отвечает фактом, а не общей фразой.' },
      },
      {
        t: { en: 'Answers lead back into the course', ru: 'Ответ ведёт обратно в курс' },
        d: { en: 'It answers from the materials and links the place in the lesson, and gives no finished solution.', ru: 'Отвечает по материалам и даёт ссылку на место в уроке, а готовое решение не выдаёт.' },
      },
      {
        t: { en: 'The deadline announces itself in advance', ru: 'Дедлайн напоминает о себе заранее' },
        d: { en: 'The reminder goes only to those who have not handed in; whoever still misses reaches the curator with context.', ru: 'Напоминание уходит только тем, кто не сдал, а кто не сдал и после него, попадает к куратору с контекстом.' },
      },
    ],
    watch: [
      {
        t: { en: 'The assistant that does the homework', ru: 'Ассистент, который решает задание за ученика' },
        d: { en: 'A hint towards the step and a link to the lesson yes, a finished solution and test answers never.', ru: 'Подсказка к шагу и ссылка на урок да, готовое решение и ответы на проверочные нет.' },
      },
      {
        t: { en: 'Access, payment and a fault differ', ru: 'Доступ, оплата и сбой различаются' },
        d: { en: 'The assistant names the real cause and never opens access itself out of politeness.', ru: 'Ассистент называет настоящую причину и не открывает доступ сам из вежливости.' },
      },
      {
        t: { en: 'One outage arrives as many questions', ru: 'Массовый сбой выглядит как разные вопросы' },
        d: { en: 'A repeating complaint is a trigger: the assistant stops explaining, alerts a person and tells everyone the same thing.', ru: 'Повторяющаяся жалоба это триггер: ассистент перестаёт объяснять, поднимает оповещение человеку и говорит всем одно и то же.' },
      },
    ],
    metrics: [
      { en: 'share of questions closed without a curator', ru: 'доля вопросов, закрытых без куратора' },
      { en: 'time to an answer at night', ru: 'время до ответа ночью' },
      { en: 'access messages per cohort', ru: 'обращений по доступам на поток' },
      { en: 'lessons that generate most questions', ru: 'уроки с наибольшим числом вопросов' },
    ],
    faq: [
      {
        q: { en: 'Will it do the assignments for students?', ru: 'Он не будет решать задания за учеников?' },
        a: { en: 'No. It gives a direction and a link to the lesson, never answers test questions, and every attempt to get a finished answer stays in the log.', ru: 'Нет. Он даёт направление и ссылку на урок, на проверочные вопросы не отвечает вовсе, и каждая попытка получить готовый ответ остаётся в журнале.' },
      },
      {
        q: { en: 'Where do its answers about the course come from?', ru: 'Откуда он берёт ответы про курс?' },
        a: { en: 'From your own materials, versioned by cohort, so each student gets the version they are studying. What is not in that source it hands to a curator.', ru: 'Из ваших материалов, версионированных по потокам, поэтому ученик получает ту версию, по которой учится. Чего в источнике нет, он передаёт куратору.' },
      },
      {
        q: { en: 'Can it open access by itself?', ru: 'Он сможет сам открывать доступы?' },
        a: { en: 'A lost link and a sign-in yes, that is reversible. Extending a deadline or opening a paid module goes through a person’s confirmation.', ru: 'Потерянную ссылку и вход да, это обратимо. Продление дедлайна и открытие платного модуля проходят через подтверждение человека.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and knowledge', ru: 'Ассистент и знания' }, items: ['Python', 'FastAPI', 'OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Access and data', ru: 'Доступы и данные' }, items: ['PostgreSQL', 'Redis', 'S3', 'Docker'] },
      { t: { en: 'Channels and scheduling', ru: 'Каналы и расписание' }, items: ['Telegram Bot API', 'n8n', 'Temporal', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'The course platform subscription', ru: 'Подписка на платформу курса' },
      { en: 'Video storage and delivery', ru: 'Хранение и раздача видео' },
      { en: 'The email service for reminders', ru: 'Сервис рассылки для напоминаний' },
    ],
  },
  {
    slug: 'ai-assistant-for-online-store',
    kicker: 'Order status',
    title: { en: 'AI assistant for an online store', ru: 'AI-ассистент для интернет-магазина' },
    lead: { en: 'It answers about availability, delivery times and order status with numbers from your own system. An order that has gone wrong reaches a person before the customer writes again.', ru: 'Отвечает про наличие, сроки доставки и статус заказа числами из вашей системы. Заказ, где что-то пошло не так, уходит человеку раньше, чем клиент напишет второй раз.' },
    audience: { en: 'Stores where «is it in stock?» and «where is my order?» make up almost the whole correspondence, and each answer means somebody opening the admin panel.', ru: 'Магазины, где «есть в наличии?» и «где мой заказ?» это почти вся переписка, и на каждый такой вопрос кто-то открывает админку.' },
    base: 'agent',
    composition: [
      { en: 'item availability', ru: 'наличие товара' },
      { en: 'delivery times', ru: 'сроки доставки' },
      { en: 'order status', ru: 'статус заказа' },
      { en: 'operator handover', ru: 'передача оператору' },
    ],
    flow: [
      {
        t: { en: 'First work out what is asked', ru: 'Сначала понять, о чём вопрос' },
        d: { en: 'Until the question is tied to a specific item or order, the assistant asks rather than answers.', ru: 'Пока вопрос не привязан к конкретной позиции или заказу, ассистент спрашивает, а не отвечает.' },
      },
      {
        t: { en: 'The number comes at answer time', ru: 'Число берётся в момент ответа' },
        d: { en: 'Stock and dates are read from your source right then, and if it is silent the assistant calls a person.', ru: 'Наличие и сроки читаются из вашего источника прямо сейчас, а если он молчит, ассистент зовёт человека.' },
      },
      {
        t: { en: 'A problem order needs no complaint', ru: 'Проблемный заказ не ждёт жалобы' },
        d: { en: 'An order stuck in one status, returned by a courier or cancelled lands on an operator’s list itself.', ru: 'Заказ, застрявший в статусе, вернувшийся от курьера или отменённый складом, сам попадает в список оператора.' },
      },
    ],
    watch: [
      {
        t: { en: 'Storefront stock is not warehouse stock', ru: 'Витрина и склад это разные числа' },
        d: { en: 'Answering yes from the storefront figure sells what is not there, so the source of truth is named before the build.', ru: 'Ответ «да, есть» по числу с витрины продаёт то, чего нет, поэтому источник истины называется до сборки.' },
      },
      {
        t: { en: 'A delivery time is a promise', ru: 'Срок доставки это обещание' },
        d: { en: 'It comes from the carrier’s own terms, is never rounded down, and for a back order no time is given.', ru: 'Срок берётся из условий перевозчика, никогда не округляется в меньшую сторону, а по товару под заказ не называется вовсе.' },
      },
      {
        t: { en: 'A third message wants a decision', ru: 'Третье сообщение это уже не вопрос' },
        d: { en: 'A repeat, or any wording about money, a return or a complaint, goes to an operator with the whole history.', ru: 'Повтор или слова про деньги, возврат и жалобу переводят переписку на оператора вместе со всей историей.' },
      },
    ],
    metrics: [
      { en: 'share of messages closed without an operator', ru: 'доля обращений, закрытых без оператора' },
      { en: 'time to an answer at a sale peak', ru: 'время до ответа в пик распродажи' },
      { en: 'cancellations after an availability confirmation', ru: 'отмен после подтверждения наличия' },
      { en: 'repeat messages about a single order', ru: 'повторных обращений по одному заказу' },
    ],
    faq: [
      {
        q: { en: 'Where does it get availability from?', ru: 'Откуда он берёт наличие?' },
        a: { en: 'From your accounting system or the warehouse, at the moment of the answer. We do not ship a version that answers from yesterday’s export and keeps quiet about it.', ru: 'Из вашей учётной системы или со склада, в момент ответа. Версию, которая отвечает из вчерашней выгрузки и молчит об этом, мы не выпускаем.' },
      },
      {
        q: { en: 'Can it place an order?', ru: 'Он сможет оформить заказ?' },
        a: { en: 'It assembles the basket and takes the customer to your own checkout, but takes no money in a chat. Changing an existing order goes through a confirmation.', ru: 'Собирает корзину и доводит до вашей кассы, но деньги в переписке не принимает. Изменение уже оформленного заказа проходит через подтверждение.' },
      },
      {
        q: { en: 'What happens at a peak, when the volume multiplies?', ru: 'Что будет в пик, когда обращений кратно больше?' },
        a: { en: 'Handover thresholds are set before the season, not inside it. At a peak the first thing that changes is caution: on late days no delivery time beats the usual one.', ru: 'Пороги передачи человеку настраиваются до сезона, а не в его середине. В пик первой меняется осторожность: в дни, когда склад не успевает, срок лучше не называть вовсе.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and models', ru: 'Ассистент и модели' }, items: ['Python', 'FastAPI', 'OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Data and integrations', ru: 'Данные и интеграции' }, items: ['PostgreSQL', 'Redis', 'n8n', 'Docker'] },
      { t: { en: 'Channels and monitoring', ru: 'Каналы и наблюдение' }, items: ['Telegram Bot API', 'ClickHouse', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'Hosting and the server, sized for peaks', ru: 'Хостинг и сервер с запасом на пик' },
      { en: 'Paid access to carrier APIs', ru: 'Платный доступ к API служб доставки' },
      { en: 'SMS and push about order status', ru: 'SMS и push о статусе заказа' },
    ],
  },
  {
    slug: 'ai-assistant-for-law-firm',
    kicker: 'Legal intake',
    title: { en: 'AI assistant for a law firm', ru: 'AI-ассистент для юридической фирмы' },
    lead: { en: 'It works through an incoming enquiry, establishes the subject and collects the dates, amounts and documents. The lawyer gets a prepared file rather than a line saying somebody wants a consultation.', ru: 'Разбирает входящее обращение: выясняет предмет, собирает даты, суммы и документы. Юрист получает готовую карточку, а не строку о том, что человеку нужна консультация.' },
    audience: { en: 'Practices where the first conversation is held by a lawyer billing by the hour, and a good share of enquiries are not in their area at all.', ru: 'Практики, где первый разговор ведёт юрист с почасовой ставкой, а заметная часть обращений вообще не по их специализации.' },
    base: 'agent',
    composition: [
      { en: 'intake questionnaire', ru: 'анкета приёма' },
      { en: 'document upload', ru: 'загрузка документов' },
      { en: 'conflict check', ru: 'проверка на конфликт' },
      { en: 'case file', ru: 'карточка дела' },
    ],
    flow: [
      {
        t: { en: 'The enquiry starts as an interview', ru: 'Обращение начинается с опроса' },
        d: { en: 'The assistant first establishes the type of matter, and the questions that follow belong to that type.', ru: 'Ассистент сначала определяет тип дела, и дальше идут вопросы именно этого типа, а не общий список.' },
      },
      {
        t: { en: 'Facts come one at a time', ru: 'Факты собираются по одному' },
        d: { en: 'It asks for what is missing, accepts photographs, and marks explicitly whatever the file still does not contain.', ru: 'Спрашивает то, чего не хватает, принимает фотографии документов и явно помечает, чего в карточке всё ещё нет.' },
      },
      {
        t: { en: 'The lawyer opens a file', ru: 'Юрист открывает дело, а не переписку' },
        d: { en: 'The subject, the timeline, the documents and the question are on the desk, so the conversation starts at the substance.', ru: 'Предмет, хронология, документы и сам вопрос уже на столе, поэтому разговор начинается с сути.' },
      },
    ],
    watch: [
      {
        t: { en: 'It collects facts and assesses nothing', ru: 'Он собирает факты, а не оценки' },
        d: { en: 'No prognosis, no limitation period, no value of a claim, even approximately: that wording is legal advice.', ru: 'Ни прогноза, ни срока давности, ни цены иска даже приблизительно: такая формулировка это правовой совет.' },
      },
      {
        t: { en: 'Your opponent may be your client', ru: 'Оппонент может оказаться вашим доверителем' },
        d: { en: 'The parties are checked against your records before the first substantive question, because a late conflict still means declining.', ru: 'Имена сторон сверяются с вашей базой до первого содержательного вопроса: поздний конфликт всё равно означает отказ.' },
      },
      {
        t: { en: 'Confidentiality starts before the engagement does', ru: 'Тайна начинается раньше договора' },
        d: { en: 'Where the data sits, how long it lives and what reaches a model is settled before launch, in the contract.', ru: 'Где лежат данные, сколько живут и что уходит в модель, определяется до запуска и фиксируется в договоре.' },
      },
    ],
    metrics: [
      { en: 'enquiries filtered out before the lawyer', ru: 'доля обращений, отсеянных до юриста' },
      { en: 'completeness of the file at intake', ru: 'полнота карточки на входе к юристу' },
      { en: 'time to the first reply', ru: 'время до первого ответа' },
      { en: 'enquiries that reach an engagement', ru: 'обращений, дошедших до договора' },
    ],
    faq: [
      {
        q: { en: 'Is this legal advice given without a lawyer?', ru: 'Не будет ли это юридической консультацией без юриста?' },
        a: { en: 'No, and that is a limit inside the system rather than a line in a prompt. The list of what it never says, including prospects and limitation periods, you approve before launch.', ru: 'Нет, и это ограничение в системе, а не приписка в промпте. Список того, чего он не произносит, включая перспективы и сроки давности, вы утверждаете до запуска.' },
      },
      {
        q: { en: 'Who answers for it if the assistant misunderstands somebody?', ru: 'Кто отвечает, если ассистент неправильно понял человека?' },
        a: { en: 'The lawyer does, which is why the assistant decides nothing. Every question and answer sits in a log beside the file, in the enquirer’s own wording.', ru: 'Юрист, поэтому ассистент ничего и не решает. Каждый вопрос и ответ лежат в журнале рядом с карточкой, в формулировке самого обратившегося.' },
      },
      {
        q: { en: 'Can it feed into the case system we already run?', ru: 'Можно подключить это к нашей системе учёта дел?' },
        a: { en: 'Yes, the file goes where your matters already live. Without such a system the first version keeps its own list, with export to standard formats from the start.', ru: 'Да, карточка уходит туда, где вы и так ведёте дела. Без такой системы первая версия живёт своим списком, а выгрузка в обычные форматы есть сразу.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and server', ru: 'Ассистент и сервер' }, items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Telegram Bot API'] },
      { t: { en: 'Models and documents', ru: 'Модели и документы' }, items: ['OpenAI', 'Anthropic', 'pgvector', 'S3'] },
      { t: { en: 'Running it', ru: 'Эксплуатация' }, items: ['Docker', 'n8n', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'Paid access to registries and court records', ru: 'Платный доступ к реестрам и картотекам' },
      { en: 'Hosting and storage for scans and threads', ru: 'Хостинг и хранилище для сканов и переписки' },
      { en: 'Telephony and SMS for calls and reminders', ru: 'Телефония и SMS для звонков и напоминаний' },
    ],
  },
  {
    slug: 'ai-assistant-for-car-service',
    kicker: 'Service bay',
    title: { en: 'AI assistant for a car service', ru: 'AI-ассистент для автосервиса' },
    lead: { en: 'It answers the price question with a range for that particular car, books onto a bay that is genuinely free, and comes back when the next service falls due.', ru: 'Отвечает на вопрос о цене вилкой по конкретной машине, ставит запись на реально свободный пост и сам возвращается, когда подходит срок следующего ТО.' },
    audience: { en: 'Shops where the advisor answers messages between two cars, the price question arrives all day, and customers come back only when something is already broken.', ru: 'Сервисы, где приёмщик отвечает между двумя машинами, вопрос о цене приходит весь день, а клиенты возвращаются, только когда уже что-то сломалось.' },
    base: 'agent',
    composition: [
      { en: 'booking a bay', ru: 'запись на пост' },
      { en: 'price range', ru: 'вилка цены' },
      { en: 'service reminders', ru: 'напоминания о ТО' },
      { en: 'advisor handover', ru: 'передача приёмщику' },
    ],
    flow: [
      {
        t: { en: 'The customer asks what it costs', ru: 'Клиент спрашивает про цену' },
        d: { en: 'From the car and the job it names a range from your price list, final only after an inspection.', ru: 'По машине и работе называет вилку из вашего прайса и говорит, что окончательная цена появится после осмотра.' },
      },
      {
        t: { en: 'The booking takes a real bay', ru: 'Запись встаёт на реальный пост' },
        d: { en: 'The slot follows the bay load, the real length of the job and whether the part is in stock.', ru: 'Слот считается из загрузки постов, реальной длительности работы и наличия нужной детали.' },
      },
      {
        t: { en: 'The car comes back on schedule', ru: 'Машина возвращается по сроку' },
        d: { en: 'Mileage and date are recorded, and each owner is offered a specific time for their own car.', ru: 'Пробег и дата записываются, и каждому владельцу предлагается конкретное время по его машине.' },
      },
    ],
    watch: [
      {
        t: { en: 'A quoted price becomes a promise', ru: 'Названная цена превращается в обещание' },
        d: { en: 'The range comes with the condition that voids it, and anything above it is agreed before the work starts.', ru: 'Вилка выдаётся вместе с условием, при котором перестаёт действовать, а всё сверх неё согласуется до начала работ.' },
      },
      {
        t: { en: 'A diagnosis from a described knock', ru: 'Диагноз по описанию стука' },
        d: { en: 'The assistant never names the part: it collects the symptoms, books a diagnostic and passes the description on.', ru: 'Ассистент не называет узел: он собирает симптомы, записывает на диагностику и передаёт описание мастеру.' },
      },
      {
        t: { en: 'A service reminder becomes spam quickly', ru: 'Напоминание о ТО быстро становится спамом' },
        d: { en: 'The due date comes from mileage and date together, an opt out sits in every message, and an answer stops it.', ru: 'Срок считается по пробегу и дате вместе, отписка стоит в каждом сообщении, а ответ владельца прекращает напоминания.' },
      },
    ],
    metrics: [
      { en: 'bookings made without the advisor', ru: 'записей, оформленных без приёмщика' },
      { en: 'bay load across the week', ru: 'загрузка постов по дням недели' },
      { en: 'owners who come back on a reminder', ru: 'владельцев, вернувшихся по напоминанию' },
      { en: 'the gap between the range and the invoice', ru: 'расхождение между вилкой и счётом' },
    ],
    faq: [
      {
        q: { en: 'Where does it get the prices?', ru: 'Откуда он берёт цены?' },
        a: { en: 'From your own table of jobs and labour hours. Outside it nothing is named: on an unknown job it says it will check with the mechanic and passes the question on.', ru: 'Из вашей таблицы работ и нормо-часов. Вне таблицы он ничего не называет: на незнакомую работу отвечает, что уточнит у мастера, и передаёт вопрос.' },
      },
      {
        q: { en: 'What happens when a customer does not turn up?', ru: 'Что с записью, когда клиент не приезжает?' },
        a: { en: 'A reminder the day before and on the day, with a one-tap way to move it, and the freed bay becomes bookable again straight away.', ru: 'Напоминание накануне и в день визита с переносом в одно касание, а освободившийся пост сразу снова доступен для записи.' },
      },
      {
        q: { en: 'Our bookings live in our own software. Will it work with that?', ru: 'У нас запись ведёт своя программа. Он с ней сработается?' },
        a: { en: 'Yes: the calendar stays in your software, the assistant reads the load and writes the booking back. We agree in advance which one owns the schedule.', ru: 'Да: календарь остаётся в вашей программе, ассистент читает загрузку и пишет туда запись. Кто главный по расписанию, договариваемся заранее, потому что двух календарей быть не должно.' },
      },
    ],
    stack: [
      { t: { en: 'Assistant and server', ru: 'Ассистент и сервер' }, items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Telegram Bot API'] },
      { t: { en: 'Models and knowledge', ru: 'Модели и знания' }, items: ['OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Schedule and operations', ru: 'Расписание и эксплуатация' }, items: ['n8n', 'Temporal', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'Paid access to VIN and labour-time catalogues', ru: 'Платный доступ к каталогам по VIN и нормативам' },
      { en: 'SMS reminders for owners outside messengers', ru: 'SMS-напоминания для владельцев вне мессенджеров' },
      { en: 'The plan on your shop software', ru: 'Тариф вашей учётной программы' },
    ],
  },
  {
    slug: 'ai-company-knowledge-base',
    kicker: 'Internal answers',
    title: { en: 'AI company knowledge base', ru: 'AI-база знаний компании' },
    lead: { en: 'An employee asks in their own words and gets an answer with a link to the document and the clause it came from.', ru: 'Сотрудник спрашивает своими словами и получает ответ со ссылкой на тот документ и тот пункт, откуда ответ взят.' },
    audience: { en: 'Companies whose rules sit in three places, where one person knows which version is current and a new hire asks whoever is busy.', ru: 'Компании, где регламенты лежат в трёх местах, актуальную версию знает один человек, а новичок идёт с вопросом к тому, кто занят.' },
    base: 'agent',
    composition: [
      { en: 'search across documents', ru: 'поиск по документам' },
      { en: 'answer with source', ru: 'ответ с источником' },
      { en: 'access by role', ru: 'доступ по ролям' },
      { en: 'unanswered questions', ru: 'вопросы без ответа' },
    ],
    flow: [
      {
        t: { en: 'A question in plain words', ru: 'Вопрос задаётся своими словами' },
        d: { en: 'The search runs on meaning, so the employee’s wording and the document’s need not share a word.', ru: 'Поиск идёт по смыслу, поэтому формулировка сотрудника и формулировка документа могут не совпасть ни одним словом.' },
      },
      {
        t: { en: 'The answer arrives with its source', ru: 'Ответ приходит вместе с источником' },
        d: { en: 'Every answer carries the document, the section and the date, and an answer without a source is not given.', ru: 'Каждый ответ несёт документ, раздел и дату правки, а ответ без источника не выдаётся вовсе.' },
      },
      {
        t: { en: 'A missing answer is said plainly', ru: 'Об отсутствии ответа говорят прямо' },
        d: { en: 'The question is recorded instead, and that list is the plan for what the knowledge base is missing.', ru: 'Вопрос записывается, и этот список и есть план того, чего в базе знаний не хватает.' },
      },
    ],
    watch: [
      {
        t: { en: 'A superseded document answers confidently too', ru: 'Устаревший документ отвечает так же уверенно' },
        d: { en: 'Superseded versions leave the index rather than being labelled, and every document carries an owner and a date.', ru: 'Устаревшие версии убираются из индекса, а не помечаются, и у каждого документа есть владелец и дата.' },
      },
      {
        t: { en: 'A knowledge base leaks easily', ru: 'База знаний легко превращается в утечку' },
        d: { en: 'Rights are checked at the moment of the search: what a person may not open never appears inside a quotation.', ru: 'Права проверяются в момент поиска: то, к чему у человека нет доступа, не попадает даже в цитату.' },
      },
      {
        t: { en: 'Some knowledge is not a document', ru: 'Часть знаний это вообще не документы' },
        d: { en: 'The first version takes what is written down, and its unanswered questions decide which rules are worth writing.', ru: 'Первая версия берёт то, что уже записано, а вопросы без ответа показывают, какие правила стоит записать.' },
      },
    ],
    metrics: [
      { en: 'questions that find an answer', ru: 'доля вопросов с найденным ответом' },
      { en: 'questions moved off colleagues', ru: 'вопросов ушло от коллег к системе' },
      { en: 'clicks through to the source', ru: 'переходов по ссылке на документ' },
      { en: 'documents with no owner or date', ru: 'документов без владельца и даты' },
    ],
    faq: [
      {
        q: { en: 'Do our documents end up inside the model?', ru: 'Наши документы уйдут в модель?' },
        a: { en: 'No. The texts stay with you, only the fragment needed for an answer goes to the model, and the refusal to train on it is in the contract.', ru: 'Нет. Тексты остаются у вас, в модель уходит только нужный для ответа фрагмент, а отказ от обучения на этих данных фиксируется в договоре.' },
      },
      {
        q: { en: 'What if it answers wrongly?', ru: 'Что если система ответит неправильно?' },
        a: { en: 'Every answer has a link to the clause, so a wrong answer traces back to a document. Where the documents hold no answer, the system says so.', ru: 'У каждого ответа есть ссылка на пункт, поэтому неверный ответ разбирается до документа. Где ответа в документах нет, система так и говорит.' },
      },
      {
        q: { en: 'Who keeps the base current?', ru: 'Кто будет поддерживать базу в актуальном виде?' },
        a: { en: 'You do, and that is what an owner per document is for. An edit on your own drive re-indexes itself, without us.', ru: 'Вы, и ровно для этого у каждого документа есть владелец. Правка файла на вашем диске переиндексируется сама, без нас.' },
      },
    ],
    stack: [
      { t: { en: 'Search and models', ru: 'Поиск и модели' }, items: ['Python', 'FastAPI', 'pgvector', 'OpenAI', 'Anthropic'] },
      { t: { en: 'Documents and storage', ru: 'Документы и хранение' }, items: ['PostgreSQL', 'Redis', 'S3', 'n8n'] },
      { t: { en: 'Entry points and operations', ru: 'Входы и эксплуатация' }, items: ['TypeScript', 'Next.js', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls, indexing the archive included', ru: 'Обращения к AI-моделям, включая индексацию архива' },
      { en: 'Recognition of scans and photographs', ru: 'Распознавание сканов и фотографий' },
      { en: 'The plans on your drives and wiki', ru: 'Тарифы дисков и вики' },
      { en: 'Hosting and storage for the index', ru: 'Хостинг и хранилище для индекса' },
    ],
  },
  {
    slug: 'ai-support-bot',
    kicker: 'First line',
    title: { en: 'AI support bot', ru: 'AI-бот поддержки' },
    lead: { en: 'It closes the repeating tickets out of your own documentation. Everything else goes to a person with the history: the question, what has been tried, what the bot checked.', ru: 'Закрывает повторяющиеся обращения по вашей документации. Всё остальное отдаёт человеку вместе с историей: вопрос, что уже пробовали и что бот успел проверить.' },
    audience: { en: 'Support queues made of the same questions about access, payment and «it is not working», where the hard tickets drown between them.', ru: 'Поддержка, где очередь состоит из одних и тех же вопросов про доступ, оплату и «не работает», а сложное тонет между ними.' },
    base: 'agent',
    composition: [
      { en: 'answers from documentation', ru: 'ответы по документации' },
      { en: 'escalation with history', ru: 'эскалация с перепиской' },
      { en: 'handover into tickets', ru: 'передача в тикеты' },
      { en: 'customer rating', ru: 'оценка клиентом' },
    ],
    flow: [
      {
        t: { en: 'Every ticket has three routes', ru: 'У обращения три маршрута' },
        d: { en: 'What the bot takes is a written list of topics rather than a guess from the model’s confidence.', ru: 'Что берёт бот, определяет записанный список тем, а не догадка, выведенная из уверенности модели.' },
      },
      {
        t: { en: 'The customer checks the answer', ru: 'Ответ проверяется на клиенте' },
        d: { en: 'One question follows the answer, and a no is not the end but an escalation with the thread assembled.', ru: 'После ответа задаётся один вопрос, и отрицательный ответ это не конец, а эскалация с уже собранной перепиской.' },
      },
      {
        t: { en: 'The operator gets a case', ru: 'Человек получает дело, а не разговор' },
        d: { en: 'The ticket carries the customer, the thread and what the bot already checked, so the operator starts where it stopped.', ru: 'В тикет приходят клиент, переписка и то, что бот уже проверил, поэтому оператор начинает там, где бот остановился.' },
      },
    ],
    watch: [
      {
        t: { en: 'The word «operator» always works', ru: 'Слово «оператор» должно срабатывать всегда' },
        d: { en: 'A request for a human is a command rather than a topic: it works the first time, at any moment.', ru: 'Просьба о человеке это команда, а не тема разговора: срабатывает с первого раза и в любой момент.' },
      },
      {
        t: { en: 'The question is about one account', ru: 'Вопрос про аккаунт, а не продукт' },
        d: { en: 'Either the bot reads the real status from your system or it hands over: reciting the general procedure annoys more.', ru: 'Либо бот читает настоящий статус из вашей системы, либо передаёт сразу: пересказ общей процедуры раздражает сильнее.' },
      },
      {
        t: { en: 'Closure share is not the goal', ru: 'Доля закрытого ботом это не цель' },
        d: { en: 'Reward the share it closes and it closes what it does not solve, so solved and repeat tickets are counted instead.', ru: 'Если премировать за долю закрытых, бот закрывает и то, где не помогает, поэтому считается решённость и повторные обращения.' },
      },
    ],
    metrics: [
      { en: 'tickets the customer says were solved', ru: 'обращений, решённых по оценке клиента' },
      { en: 'repeat tickets on the same topic', ru: 'повторных обращений по той же теме' },
      { en: 'time to a human after an escalation', ru: 'время до человека после эскалации' },
      { en: 'the topics that escalate most often', ru: 'темы, чаще всего уходящие человеку' },
    ],
    faq: [
      {
        q: { en: 'Will the customer know it is a bot?', ru: 'Клиент поймёт, что отвечает бот?' },
        a: { en: 'We recommend saying so in the first message and showing how to reach a person there. A hidden bot buys minutes and loses trust when it is worked out.', ru: 'Советуем сказать это в первом же сообщении и там же показать, как позвать человека. Скрытый бот выигрывает минуты и теряет доверие, когда его раскусывают.' },
      },
      {
        q: { en: 'Does it run inside our helpdesk or beside it?', ru: 'Он будет работать внутри нашего helpdesk или рядом?' },
        a: { en: 'Inside yours, if you have one: it answers within the ticket and hands it over in the same place, so the history stays in one system.', ru: 'Внутри вашего, если он есть: бот отвечает в самом тикете и там же передаёт его человеку, поэтому история остаётся в одной системе.' },
      },
      {
        q: { en: 'Can we edit the answers ourselves?', ru: 'Сможем сами править ответы?' },
        a: { en: 'Yes, the answers are your documentation rather than text in the code, and the list of topics the bot never takes is a setting too. New data sources are code.', ru: 'Да, ответы это ваша документация, а не текст внутри кода, и список тем, которые бот не берёт, тоже настройка. Новый источник данных это код.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and server', ru: 'Бот и сервер' }, items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Telegram Bot API'] },
      { t: { en: 'Models and documentation', ru: 'Модели и документация' }, items: ['OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Queues and operations', ru: 'Очереди и эксплуатация' }, items: ['n8n', 'Temporal', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'Licences and seats in your ticket system', ru: 'Лицензии и места в вашей системе тикетов' },
      { en: 'Channel plans charged per conversation', ru: 'Тарифы каналов с оплатой за диалог' },
      { en: 'Hosting and the server with thread history', ru: 'Хостинг и сервер с историей переписок' },
    ],
  },
  {
    slug: 'ai-sales-agent',
    kicker: 'Sales qualification',
    title: { en: 'AI sales agent', ru: 'AI-агент продаж' },
    lead: { en: 'It runs the conversation to your script, asks the questions that actually decide something and qualifies the enquiry. The meeting lands in a manager’s calendar.', ru: 'Ведёт диалог по вашему сценарию, задаёт вопросы, которые правда решают, и квалифицирует заявку. Встреча встаёт в календарь менеджера.' },
    audience: { en: 'A flow of enquiries where a good part never reaches a conversation: they arrive in the evening and at weekends, and qualifying happens at the meeting itself.', ru: 'Поток входящих, где заметная часть не доходит до разговора: заявки приходят вечером и в выходные, а квалификация происходит уже на встрече.' },
    base: 'agent',
    composition: [
      { en: 'conversation script', ru: 'сценарий разговора' },
      { en: 'allowed promises', ru: 'что можно обещать' },
      { en: 'qualifying criteria', ru: 'критерии квалификации' },
      { en: 'booking the meeting', ru: 'назначение встречи' },
    ],
    flow: [
      {
        t: { en: 'The answer first, the script second', ru: 'Сначала ответ, потом сценарий' },
        d: { en: 'A person gets an answer to their own question first, and the script follows it instead of standing in front.', ru: 'Человек первым делом получает ответ на свой вопрос, а сценарий идёт следом, а не стоит перед ответом.' },
      },
      {
        t: { en: 'Qualifying takes three or four facts', ru: 'Квалификация укладывается в три-четыре факта' },
        d: { en: 'The set is yours and holds only what changes the outcome, and nothing already said is asked again.', ru: 'Набор ваш, и в него попадает только то, что меняет исход, а уже прозвучавшее второй раз не спрашивается.' },
      },
      {
        t: { en: 'Booking happens inside the conversation', ru: 'Встреча назначается прямо в разговоре' },
        d: { en: 'It offers time genuinely free in the right calendar, holds the slot and passes the manager the whole conversation.', ru: 'Показывает время, которое действительно свободно у нужного человека, закрепляет слот и отдаёт менеджеру весь разговор.' },
      },
    ],
    watch: [
      {
        t: { en: 'Promises come from a list', ru: 'Что можно обещать, решает список' },
        d: { en: 'Prices, terms and timings are quoted from a table, and what is not in it goes to a person.', ru: 'Цены, условия и сроки только цитируются из таблицы, а чего в ней нет, агент переводит человеку.' },
      },
      {
        t: { en: 'Qualifying is not a questionnaire', ru: 'Квалификация не должна стать анкетой' },
        d: { en: 'The criteria are what to find out, not the order to ask, and a meeting may be booked with fields empty.', ru: 'Критерии это что нужно выяснить, а не порядок вопросов, и встречу можно назначить с половиной незаполненных полей.' },
      },
      {
        t: { en: 'An offered slot is held', ru: 'Предложенное время должно быть занято' },
        d: { en: 'A slot is held from the moment it is offered rather than accepted, and the hold expires by itself.', ru: 'Слот удерживается с момента, когда его предложили, а не когда согласились, и удержание истекает само.' },
      },
    ],
    metrics: [
      { en: 'share of enquiries that reach qualification', ru: 'доля входящих, дошедших до квалификации' },
      { en: 'meetings booked per week', ru: 'назначенных встреч за неделю' },
      { en: 'no-show rate on booked meetings', ru: 'доля неявок на назначенные встречи' },
      { en: 'conversations where a human was asked for', ru: 'диалогов, где просили человека' },
    ],
    faq: [
      {
        q: { en: 'Will it give discounts and haggle?', ru: 'Он будет давать скидки и торговаться?' },
        a: { en: 'Only inside the frame you have written down: the step, the floor and the conditions. Outside that table it does not negotiate, it hands the conversation over.', ru: 'Только в рамках, которые вы записали: шаг скидки, нижняя граница и условия. За пределами таблицы агент не торгуется, а передаёт разговор человеку.' },
      },
      {
        q: { en: 'What if the customer asks for a human?', ru: 'Что будет, если клиент попросит живого человека?' },
        a: { en: 'The agent goes quiet and hands the thread over at once, with no attempt at the objection. The same happens on a complaint or an off-script subject.', ru: 'Агент замолкает и передаёт разговор сразу, без попытки закрыть возражение. То же самое на жалобе и на любой теме вне сценария.' },
      },
      {
        q: { en: 'Where does it get our qualifying criteria?', ru: 'Откуда он возьмёт наши критерии квалификации?' },
        a: { en: 'From your closed deals and what your managers already ask. Afterwards you edit the list without us: a criterion is a row in a table, not a prompt.', ru: 'Из ваших закрытых сделок и из того, что менеджеры спрашивают сами. Дальше вы правите список без нас: критерий это строка в таблице, а не формулировка в промпте.' },
      },
    ],
    stack: [
      { t: { en: 'Agent and models', ru: 'Агент и модели' }, items: ['Python', 'FastAPI', 'OpenAI', 'Anthropic', 'pgvector'] },
      { t: { en: 'Conversation, channels and data', ru: 'Диалог, каналы и данные' }, items: ['Telegram Bot API', 'Node.js', 'PostgreSQL', 'Redis'] },
      { t: { en: 'Scheduling and operations', ru: 'Расписание и эксплуатация' }, items: ['Temporal', 'n8n', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'AI model calls at the provider’s rate', ru: 'Обращения к AI-моделям по тарифу провайдера' },
      { en: 'Hosting and the server with the conversation log', ru: 'Хостинг и сервер с журналом диалогов' },
      { en: 'The CRM and calendar plans', ru: 'Тарифы CRM и календаря' },
      { en: 'SMS and telephony for meeting reminders', ru: 'SMS и телефония для напоминаний о встрече' },
    ],
  },
  {
    slug: 'telegram-bot-for-appointments',
    kicker: 'Chat booking',
    title: { en: 'Telegram bot for appointments', ru: 'Telegram-бот для записи клиентов' },
    lead: { en: 'The bot shows the time that is genuinely free, holds the slot the moment it is picked and sends the reminder itself. An administrator agrees no times by hand.', ru: 'Бот показывает реально свободное время, закрепляет слот в момент выбора и сам напоминает о визите. Администратор не согласовывает время вручную.' },
    audience: { en: 'Salons, practices and individual specialists where booking happens in a chat and agreeing the time takes longer than the appointment.', ru: 'Салоны, кабинеты и частные мастера, где запись идёт перепиской и на согласование времени уходит больше, чем на сам приём.' },
    base: 'telegram',
    composition: [
      { en: 'free slots', ru: 'свободные слоты' },
      { en: 'reminders', ru: 'напоминания' },
      { en: 'rescheduling and cancelling', ru: 'перенос и отмена' },
      { en: 'the administrator’s diary', ru: 'журнал администратора' },
    ],
    flow: [
      {
        t: { en: 'The client sees only real availability', ru: 'Клиент видит только свободное время' },
        d: { en: 'Slots come from working hours, taken appointments, the service length and the buffer between visits.', ru: 'Слоты считаются из рабочих часов, занятых записей, длительности услуги и буфера между приёмами.' },
      },
      {
        t: { en: 'Picking closes the slot immediately', ru: 'Выбор закрывает слот сразу' },
        d: { en: 'The tap holds the time and confirms it, or says the slot is gone and offers the next one.', ru: 'Нажатие либо закрепляет время с подтверждением, либо говорит, что слот занят, и предлагает соседний.' },
      },
      {
        t: { en: 'The reminder arrives in the chat', ru: 'Напоминание приходит туда же, где записывались' },
        d: { en: 'It carries a button to move the visit and a button to cancel, freeing the slot in time.', ru: 'С кнопками переноса и отмены, чтобы слот вернулся в продажу, пока его ещё можно кому-то отдать.' },
      },
    ],
    watch: [
      {
        t: { en: 'The diary lives in two places', ru: 'Журнал живёт в двух местах' },
        d: { en: 'Manual entry and blocking sit in the same database, because a bot with its own picture of the day produces clashes.', ru: 'Ручная запись и блокировка лежат в той же базе: у бота со своей картиной дня накладка приходит в первый загруженный день.' },
      },
      {
        t: { en: 'A dialogue with no way out', ru: 'Диалог, из которого нельзя выйти' },
        d: { en: 'Every step has a step back, and buttons under old messages stop working and say so instead of booking a passed time.', ru: 'На каждом шаге есть шаг назад, а кнопки под старыми сообщениями не записывают на прошедшее время и говорят об этом.' },
      },
      {
        t: { en: 'A reminder can fail to arrive', ru: 'Напоминание может не дойти' },
        d: { en: 'A blocked bot cannot deliver, so the error lifts the booking onto the administrator’s list rather than passing as forgetfulness.', ru: 'Заблокировавшему бота Telegram не доставит, поэтому ошибка поднимает запись в список администратора, а неявка перестаёт выглядеть забывчивостью.' },
      },
    ],
    metrics: [
      { en: 'bookings without an administrator', ru: 'записей без администратора' },
      { en: 'reminders that reach the client', ru: 'доля дошедших напоминаний' },
      { en: 'reschedules instead of no-shows', ru: 'переносов вместо неявки' },
      { en: 'how full the day is', ru: 'заполненность дня' },
    ],
    faq: [
      {
        q: { en: 'What if a client does not use Telegram?', ru: 'А если у клиента нет Telegram?' },
        a: { en: 'An administrator books them from the same diary, and they get the same reminders through another channel. There is one schedule, and it does not care which route a booking takes.', ru: 'Его записывает администратор из того же журнала, и он попадает в те же напоминания другим каналом. Расписание одно, и ему всё равно, каким путём в него попадают.' },
      },
      {
        q: { en: 'Can it take a prepayment inside the bot?', ru: 'Можно принимать предоплату прямо в боте?' },
        a: { en: 'Yes, the payment sits in the step that confirms the slot, which is then held for a limited time. The rule for a cancellation is written in before launch and shown at booking.', ru: 'Да, оплата встраивается в шаг подтверждения, и тогда слот держится ограниченное время. Правило про предоплату при отмене записывается до запуска, и клиент видит его при записи.' },
      },
      {
        q: { en: 'Can we change services, prices and hours ourselves?', ru: 'Сможем менять услуги, цены и часы сами?' },
        a: { en: 'Services, durations, prices, hours, days off and every message are settings in an admin panel. A new mechanic, a waiting list for instance, is a code change, and we name its price first.', ru: 'Услуги, длительность, цены, часы, выходные и тексты сообщений это настройки в админке. Новая механика, например лист ожидания, это правка кода, и её цену мы называем до работ.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and logic', ru: 'Бот и логика' }, items: ['Python', 'FastAPI', 'Telegram Bot API'] },
      { t: { en: 'Schedule and data', ru: 'Расписание и данные' }, items: ['PostgreSQL', 'Redis', 'Docker'] },
      { t: { en: 'Payment and the administrator’s screen', ru: 'Оплата и экран администратора' }, items: ['Stripe', 'TypeScript', 'Next.js'] },
    ],
    notIncluded: [
      { en: 'hosting or a VPS for the bot', ru: 'хостинг или VPS для бота' },
      { en: 'payment provider fees on prepayments', ru: 'комиссии платёжных систем с предоплат' },
      { en: 'SMS and telephony for duplicate reminders', ru: 'SMS и телефония для дублей напоминаний' },
      { en: 'the paid plan of a calendar service', ru: 'платный тариф календарного сервиса' },
    ],
  },
  {
    slug: 'telegram-bot-for-leads',
    kicker: 'Lead intake',
    title: { en: 'Telegram bot for collecting leads', ru: 'Telegram-бот для сбора заявок' },
    lead: { en: 'The bot asks the questions that decide whether an enquiry is worth a call and writes the answers into your CRM as fields. A manager gets a record, not a greeting in a chat.', ru: 'Бот задаёт вопросы, которые решают, стоит ли заявка звонка, и кладёт ответы в CRM отдельными полями. Менеджер получает карточку, а не приветствие в чате.' },
    audience: { en: 'Ads and posts that point at a direct message, where a manager works out the budget, the timing and the city from scratch in every thread.', ru: 'Реклама и посты ведут в личные сообщения, где менеджер в каждом диалоге заново выясняет бюджет, сроки и город.' },
    base: 'telegram',
    composition: [
      { en: 'question script', ru: 'сценарий вопросов' },
      { en: 'source tag', ru: 'метка источника' },
      { en: 'a CRM record', ru: 'карточка в CRM' },
      { en: 'manager alert', ru: 'уведомление менеджеру' },
    ],
    flow: [
      {
        t: { en: 'The enquiry arrives already labelled', ru: 'Заявка приходит уже с меткой' },
        d: { en: 'A link from an ad or a post opens the bot with a tag that travels into the CRM.', ru: 'Ссылка из объявления или поста открывает бота с параметром, и метка едет вместе с заявкой до CRM.' },
      },
      {
        t: { en: 'Only the questions that decide something', ru: 'Вопросов столько, сколько решают' },
        d: { en: 'Task, timing, city, volume: buttons where the answers are finite, and the branch changes with each answer.', ru: 'Задача, сроки, город, объём: кнопки там, где вариантов конечное число, а ветка меняется по ответу.' },
      },
      {
        t: { en: 'A record reaches the CRM', ru: 'В CRM приезжает карточка' },
        d: { en: 'Each answer lands in its own field, the deal opens at the right stage, and the thread stays linked.', ru: 'Каждый ответ ложится в своё поле, сделка создаётся на нужной стадии, а ссылка на диалог остаётся в карточке.' },
      },
    ],
    watch: [
      {
        t: { en: 'The form outlasts the patience', ru: 'Анкета длиннее, чем терпение' },
        d: { en: 'Every extra question loses people, and the busy ones go first, so the first version asks only what routes an enquiry.', ru: 'Каждый лишний вопрос отсекает часть людей, и первыми уходят занятые, поэтому первая версия спрашивает только то, что распределяет заявку.' },
      },
      {
        t: { en: 'A no is still an answer', ru: 'Отказ тоже должен быть ответом' },
        d: { en: 'Silence on a request you cannot take becomes a review, so the bot declines in a sentence and saves the enquiry anyway.', ru: 'Молчание в ответ на неподходящую заявку превращается в отзыв, поэтому бот отказывает одной фразой и всё равно сохраняет заявку.' },
      },
      {
        t: { en: 'The reply around the system', ru: 'Ответ мимо системы' },
        d: { en: 'A reply from a personal account moves the deal into a private chat, so answers go through the bot or your screen.', ru: 'Ответ из личного аккаунта уводит сделку в чужую переписку, поэтому ответ идёт через бота или через ваш экран.' },
      },
    ],
    metrics: [
      { en: 'dialogues that reach the end', ru: 'диалогов до конца' },
      { en: 'the question that loses people', ru: 'вопрос, на котором бросают' },
      { en: 'time to a human reply', ru: 'время до ответа человека' },
      { en: 'qualified enquiries per source', ru: 'целевых заявок на источник' },
    ],
    faq: [
      {
        q: { en: 'Do the enquiries reach our CRM?', ru: 'Заявки попадут в нашу CRM?' },
        a: { en: 'Yes: the bot creates the deal through the API, spreads the answers across fields and attaches the thread. Without a CRM the enquiries sit in their own table, and connecting one later swaps one adapter.', ru: 'Да, бот создаёт сделку через API, раскладывает ответы по полям и прикладывает ссылку на диалог. Если CRM нет, заявки лежат в своей таблице с выгрузкой, а подключение потом это замена адаптера.' },
      },
      {
        q: { en: 'Can we change the questions ourselves?', ru: 'Сможем менять вопросы сами?' },
        a: { en: 'Wording, answer options, their order and the decline change from an admin panel, without us. A new branch that depends on stock or team load is a code change, priced before we start.', ru: 'Формулировки, варианты ответов, их порядок и текст отказа меняются из админки, без нас. Новая ветка, зависящая от склада или загрузки команды, это правка кода, и цену мы называем заранее.' },
      },
      {
        q: { en: 'Is it a script, or does it understand free text?', ru: 'Это жёсткий сценарий или он понимает свободный текст?' },
        a: { en: 'A script by default: predictable and it invents no terms. A model goes in where people write freely anyway, and what it is allowed to touch is settled before the start.', ru: 'По умолчанию сценарий: он предсказуем и не выдумывает условия. Модель подключается там, где человек всё равно пишет свободно, и что именно ей отдаётся, решается до старта.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and script', ru: 'Бот и сценарий' }, items: ['Python', 'FastAPI', 'Telegram Bot API'] },
      { t: { en: 'Data and the CRM link', ru: 'Данные и связь с CRM' }, items: ['PostgreSQL', 'Redis', 'n8n', 'Docker'] },
      { t: { en: 'Reading free text and watching it run', ru: 'Разбор свободного текста и наблюдение' }, items: ['OpenAI', 'Anthropic', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'hosting or a VPS for the bot', ru: 'хостинг или VPS для бота' },
      { en: 'your CRM plan and its API limits', ru: 'подписка на CRM и лимиты API' },
      { en: 'AI model calls', ru: 'обращения к AI-моделям' },
      { en: 'the ads that bring people in', ru: 'реклама, которая приводит людей' },
    ],
  },
  {
    slug: 'telegram-bot-for-course-sales',
    kicker: 'Course sales',
    title: { en: 'Telegram bot for selling courses', ru: 'Telegram-бот для продажи курсов' },
    lead: { en: 'The bot shows the plans, takes the payment and opens access in the same moment. Between the payment and the first lesson there is no person adding buyers one at a time.', ru: 'Бот показывает тарифы, принимает оплату и открывает доступ в тот же момент. Между оплатой и первым уроком нет человека, который добавляет купивших по одному.' },
    audience: { en: 'Courses and intensives sold from posts and webinars, where buying means bank details in a message, a screenshot of the transfer and an admin adding people by hand.', ru: 'Курсы и интенсивы, которые продаются постами и вебинарами, а покупка выглядит как реквизиты в сообщении, скриншот перевода и админ, добавляющий в канал руками.' },
    base: 'telegram',
    composition: [
      { en: 'plan list', ru: 'витрина тарифов' },
      { en: 'in-chat payment', ru: 'оплата в диалоге' },
      { en: 'automatic access', ru: 'автовыдача доступа' },
      { en: 'single-use invites', ru: 'одноразовые ссылки' },
    ],
    flow: [
      {
        t: { en: 'The plan is chosen in-chat', ru: 'Тариф выбирается там же, где пост' },
        d: { en: 'The bot opens from a channel link and shows the plans, with no jump to a site.', ru: 'Бот открывается по ссылке из канала и показывает тарифы, без перехода на сайт и формы с почтой.' },
      },
      {
        t: { en: 'The provider confirms the payment', ru: 'Оплату подтверждает провайдер, а не скриншот' },
        d: { en: 'The buyer pays in the same dialogue, and the provider’s webhook opens the door, not a screenshot.', ru: 'Покупатель платит в том же диалоге, а дверь открывает вебхук платёжной системы, а не скриншот перевода.' },
      },
      {
        t: { en: 'Access matches what was bought', ru: 'Доступ выдаётся именно тот, который куплен' },
        d: { en: 'A single-use invite opens the channel of that plan, and what a purchase opens is derived from the purchase.', ru: 'Одноразовая ссылка открывает канал этого тарифа, а состав доступа выводится из покупки, а не собирается по памяти.' },
      },
    ],
    watch: [
      {
        t: { en: 'The invite link leaks', ru: 'Ссылка в канал утекает' },
        d: { en: 'Invites are single-use and short-lived, every join is checked against a purchase, and anyone unlisted is removed automatically.', ru: 'Ссылки одноразовые и с коротким сроком жизни, каждое вступление сверяется с покупкой, а лишних убирает автоматика.' },
      },
      {
        t: { en: 'The refund nobody closed', ru: 'Возврат, который никто не закрыл' },
        d: { en: 'A refund or a chargeback withdraws access through the same mechanism that grants it, otherwise the channel fills with unaccountable people.', ru: 'Возврат и чарджбэк снимают доступ той же связкой, которая его выдаёт, иначе в канале остаются люди, о которых никто ничего не скажет.' },
      },
      {
        t: { en: 'The platform decides the payment method', ru: 'Правила площадки решают, чем платят' },
        d: { en: 'Telegram treats digital and physical differently, so where a card inside the bot does not fit, payment moves to your page.', ru: 'Telegram по-разному относится к цифровому и физическому, и там, где карта в боте не подходит, оплата уходит на вашу страницу.' },
      },
    ],
    metrics: [
      { en: 'share who reach the payment', ru: 'доля дошедших до оплаты' },
      { en: 'time from payment to access', ru: 'время от оплаты до входа' },
      { en: 'sales spread across the plans', ru: 'распределение продаж по тарифам' },
      { en: 'refunds and the access withdrawn', ru: 'возвраты и снятые доступы' },
    ],
    faq: [
      {
        q: { en: 'What do buyers pay with?', ru: 'Чем платят покупатели?' },
        a: { en: 'By payment inside Telegram, a card on your own page, or both at once. Access is opened by the provider’s webhook either way, so a second method is one more handler rather than a rebuild.', ru: 'Оплатой внутри Telegram, картой на вашей странице или обоими способами сразу. Доступ в любом случае открывает вебхук провайдера, поэтому второй способ добавляется обработчиком, а не переделкой бота.' },
      },
      {
        q: { en: 'We sell cohorts with a start date. Does that fit?', ru: 'Мы продаём поток с датой старта. Это ложится?' },
        a: { en: 'Yes: a purchase belongs to a cohort rather than to the bot’s calendar, so before the start the buyer waits in a separate channel. Closing sales and admitting a latecomer are settings.', ru: 'Да, покупка привязывается к потоку, а не к календарю бота: до старта человек попадает в канал ожидания. Закрытие продаж и добор в идущий поток это настройки.' },
      },
      {
        q: { en: 'What if Telegram blocks the bot?', ru: 'Что если Telegram заблокирует бота?' },
        a: { en: 'Buyers, payments and granted access live in your database, so a new bot hands the same access to the same people. What can be lost is contact, so an email is collected at payment.', ru: 'Покупатели, оплаты и доступы лежат в вашей базе, поэтому новый бот раздаёт те же доступы тем же людям. Потерять можно связь, поэтому почта или телефон собираются на оплате.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and the sale', ru: 'Бот и продажа' }, items: ['Python', 'FastAPI', 'Telegram Bot API'] },
      { t: { en: 'Payment and access', ru: 'Оплата и доступ' }, items: ['Stripe', 'Paddle', 'PostgreSQL', 'Redis'] },
      { t: { en: 'Screens and running it', ru: 'Экраны и эксплуатация' }, items: ['TypeScript', 'Next.js', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'payment provider and platform fees', ru: 'комиссии платёжной системы и площадки' },
      { en: 'storing and serving the lessons', ru: 'хранение и раздача видеоуроков' },
      { en: 'hosting or a VPS for the bot', ru: 'хостинг или VPS для бота' },
      { en: 'email to buyers outside Telegram', ru: 'письма покупателям вне Telegram' },
    ],
  },
  {
    slug: 'telegram-subscription-bot',
    kicker: 'Members only',
    title: { en: 'Telegram bot with a paid subscription', ru: 'Telegram-бот с платной подпиской' },
    lead: { en: 'The bot sells access for a period, renews it by itself and removes the people whose period has run out. Nobody reconciles the list by hand.', ru: 'Бот продаёт доступ на период, сам продлевает его и убирает тех, у кого период закончился. Списки никто не сверяет руками.' },
    audience: { en: 'Closed channels and chats where payments arrive in no particular order, everybody’s period ends on a different day, and the reconciliation is one person’s spreadsheet.', ru: 'Закрытые каналы и чаты, где оплаты приходят вразнобой, у каждого свой срок, а сверка это таблица, в которой уже есть неплательщики.' },
    base: 'telegram',
    composition: [
      { en: 'auto-renewing subscription', ru: 'подписка с автопродлением' },
      { en: 'grace period', ru: 'льготный период' },
      { en: 'cancel button', ru: 'кнопка отмены' },
      { en: 'reconciliation against payments', ru: 'сверка с оплатами' },
    ],
    flow: [
      {
        t: { en: 'The payment opens the channel', ru: 'Оплата открывает канал' },
        d: { en: 'The first charge issues a personal invite and records the date the person is inside until.', ru: 'Первое списание выдаёт персональную ссылку и записывает дату, до которой человек внутри, и дата принадлежит подписке.' },
      },
      {
        t: { en: 'Renewals are quiet, failures are not', ru: 'Продление проходит тихо, отказ громко' },
        d: { en: 'A failed charge starts retries and a grace period, and the person stays inside knowing the exact date it ends.', ru: 'Неудачное списание запускает повторы и льготный период, и всё это время человек остаётся в канале и знает дату отключения.' },
      },
      {
        t: { en: 'Leaving is a consequence', ru: 'Выход из канала это следствие' },
        d: { en: 'When the period and the grace period end, the bot removes the member and leaves a button to return.', ru: 'Когда закончился период и льготный срок, бот убирает участника сам и оставляет кнопку вернуться.' },
      },
    ],
    watch: [
      {
        t: { en: 'The channel and the list drift', ru: 'Канал и список расходятся' },
        d: { en: 'Membership is reconciled against the subscription list regularly, and a discrepancy becomes a report somebody reads rather than a silent fix.', ru: 'Состав канала регулярно сверяется со списком подписок, а расхождение становится отчётом, который кто-то читает, а не тихой правкой.' },
      },
      {
        t: { en: 'Removal is not closing the door', ru: 'Исключить не значит закрыть вход' },
        d: { en: 'Invites are personal, single-use and revoked when access closes, and a return is checked against the subscription rather than a saved link.', ru: 'Ссылки персональные и одноразовые, при закрытии доступа они отзываются, а повторный вход проверяется по подписке, а не по сохранённой ссылке.' },
      },
      {
        t: { en: 'Flickering access is worse than none', ru: 'Дёрганый доступ хуже закрытого' },
        d: { en: 'Removal happens only once the retries and the grace period are exhausted, never on the first card error.', ru: 'Участника убирают только после того, как закончились повторы и льготный период, а не по первой ошибке карты.' },
      },
    ],
    metrics: [
      { en: 'renewals with no intervention', ru: 'продлений без вмешательства' },
      { en: 'charges recovered after an error', ru: 'восстановленных списаний' },
      { en: 'gap between channel and paid list', ru: 'расхождение канала и списка' },
      { en: 'churn and returns to the subscription', ru: 'отток и возвраты в подписку' },
    ],
    faq: [
      {
        q: { en: 'How is this different from adding people by hand?', ru: 'Чем это отличается от добавления руками?' },
        a: { en: 'Access is derived from the payment every day, rather than on the day somebody gets round to it. Manual additions stay available and are written into the same list rather than around it.', ru: 'Доступ выводится из оплаты каждый день, а не когда у кого-то дошли руки. Ручное добавление остаётся, но пишется в тот же список, а не мимо него.' },
      },
      {
        q: { en: 'Can it sell several levels of access?', ru: 'Можно продавать несколько уровней доступа?' },
        a: { en: 'Yes: each level is its own set of channels and its own price, a move between levels reprices what is left of the period, and access is assembled from the subscription.', ru: 'Да: каждый уровень это свой набор каналов и своя цена, переход пересчитывает остаток текущего периода, а состав доступа собирается из подписки.' },
      },
      {
        q: { en: 'How does somebody cancel?', ru: 'Как человек отменяет подписку?' },
        a: { en: 'With a button in the bot, and an answer saying until when access runs: a cancellation you have to ask for gets disputed through a bank instead. Coming back restores the subscription.', ru: 'Кнопкой в боте, с ответом, до какой даты доступ действует: отмену, которую выпрашивают у администратора, оспаривают через банк. Кнопка вернуться восстанавливает подписку, а не начинает её с нуля.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and access', ru: 'Бот и доступ' }, items: ['Python', 'FastAPI', 'Telegram Bot API', 'PostgreSQL'] },
      { t: { en: 'Charges and their schedule', ru: 'Списания и их расписание' }, items: ['Stripe', 'Paddle', 'Temporal', 'Redis'] },
      { t: { en: 'Screen and watching it run', ru: 'Экран и наблюдение' }, items: ['TypeScript', 'Next.js', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'provider and platform fees on charges', ru: 'комиссии провайдера и площадки со списаний' },
      { en: 'the fee on a disputed charge', ru: 'комиссия за оспоренное списание' },
      { en: 'hosting or a VPS for the bot', ru: 'хостинг или VPS для бота' },
      { en: 'email and SMS about charges', ru: 'письма и SMS о списаниях' },
    ],
  },
  {
    slug: 'telegram-sales-funnel',
    kicker: 'Lead nurture',
    title: { en: 'Automated sales funnel in Telegram', ru: 'Автоворонка в Telegram' },
    lead: { en: 'The bot hands out the lead magnet, sorts arrivals into segments and runs the chain up to the action you want. A ready lead goes to the sales team.', ru: 'Бот выдаёт лид-магнит, разбирает пришедших по сегментам и ведёт цепочку до целевого действия. Готовый лид уходит в отдел продаж.' },
    audience: { en: 'Traffic arrives in a bot or a channel and everything after that rests on one person who sends materials by hand and decides from memory who to call.', ru: 'Трафик приходит в бота или в канал, а дальше всё держится на человеке, который руками рассылает материалы и по памяти решает, кому звонить.' },
    base: 'telegram',
    composition: [
      { en: 'the lead magnet', ru: 'лид-магнит' },
      { en: 'source tag', ru: 'метка источника' },
      { en: 'segmenting questions', ru: 'вопросы на сегментацию' },
      { en: 'handover to sales', ru: 'передача в продажи' },
    ],
    flow: [
      {
        t: { en: 'The magnet arrives before any question', ru: 'Магнит приходит раньше любого вопроса' },
        d: { en: 'The link carries a source tag written down in the first second, before a form can turn anyone away.', ru: 'В ссылке лежит метка источника, она записывается в первую секунду, а анкета перед выдачей отсекает большинство дошедших.' },
      },
      {
        t: { en: 'The segment comes from the conversation', ru: 'Сегмент выясняется в разговоре' },
        d: { en: 'Two or three questions, each changing what comes next, and a question that changes nothing leaves the chain.', ru: 'Два или три вопроса, каждый меняет следующий шаг, а вопрос, который ни на что не влияет, из цепочки убирается.' },
      },
      {
        t: { en: 'A ready lead reaches a person', ru: 'Готовый лид уходит человеку' },
        d: { en: 'An agreed signal fires, the lead reaches a manager with its segment, source and thread, and the chain stops.', ru: 'Срабатывает оговорённый сигнал, лид приходит менеджеру с сегментом, источником и перепиской, а цепочка на этом останавливается.' },
      },
    ],
    watch: [
      {
        t: { en: 'The right to write is spent', ru: 'Право писать в мессенджере тратится' },
        d: { en: 'A complaint costs more than a limit, so sending is rate limited, blockers are marked at once, and frequency has a ceiling.', ru: 'Жалоба стоит дороже лимита, поэтому отправка идёт с ограничением скорости, заблокировавшие помечаются сразу, а на частоту стоит потолок.' },
      },
      {
        t: { en: 'The chain goes quiet at handover', ru: 'Цепочка замолкает при передаче' },
        d: { en: 'Handing a lead to sales is not a copy in the CRM, it is the chain switching itself off and staying off.', ru: 'Передача в продажи это не копия контакта в CRM, а выключение цепочки, которая сама обратно не включается.' },
      },
      {
        t: { en: 'Without a tag leads look identical', ru: 'Без метки все лиды одинаковы' },
        d: { en: 'The tag goes into every link and button before traffic starts, because a source cannot be reconstructed afterwards.', ru: 'Метка ставится в каждую ссылку и кнопку до запуска трафика: восстановить источник задним числом нельзя.' },
      },
    ],
    metrics: [
      { en: 'link clicks that start the bot', ru: 'доля запустивших бота' },
      { en: 'share who answer the questions', ru: 'доля ответивших на вопросы' },
      { en: 'leads to sales, by source', ru: 'лидов в продажи по источникам' },
      { en: 'unsubscribes per step of the chain', ru: 'отписки на шаг цепочки' },
    ],
    faq: [
      {
        q: { en: 'How many questions can we ask before the magnet?', ru: 'Сколько вопросов можно задать до выдачи магнита?' },
        a: { en: 'None: the magnet goes first, and every question after it has to change the next step. We bring the set for approval before the build rather than tuning it later from the unsubscribes.', ru: 'Ни одного: магнит отдаётся первым, а каждый вопрос после него обязан менять следующий шаг. Набор мы приносим на согласование до сборки, а не подбираем потом по отпискам.' },
      },
      {
        q: { en: 'Will the bot get blocked for sending?', ru: 'Бота не заблокируют за рассылку?' },
        a: { en: 'Bots are blocked for the complaints, not the sending: delivery goes only to people who started the bot, an unsubscribe works in one tap, and frequency is agreed before launch.', ru: 'Блокируют не за рассылку, а за жалобы на неё, поэтому отправка идёт только по запустившим бота, отписка работает в одно нажатие, а частоту согласуем до запуска.' },
      },
      {
        q: { en: 'Can we change the copy and the timings ourselves?', ru: 'Сможем менять тексты и сроки сами?' },
        a: { en: 'The wording, the pauses between steps and the set of questions are edited from the settings, without us. A new branch or handover signal is a change to the logic and goes through us.', ru: 'Тексты, паузы между шагами и состав вопросов правятся из настроек, без нас. Новая ветка или новый сигнал на передачу в продажи это правка логики: она идёт через нас.' },
      },
    ],
    stack: [
      { t: { en: 'Bot and chain', ru: 'Бот и цепочка' }, items: ['TypeScript', 'Node.js', 'Telegram Bot API', 'Temporal', 'n8n', 'Redis'] },
      { t: { en: 'Data and segments', ru: 'Данные и сегменты' }, items: ['PostgreSQL', 'Prisma', 'ClickHouse'] },
      { t: { en: 'Admin screen and operations', ru: 'Админка и эксплуатация' }, items: ['Next.js', 'React', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'the ad budget for traffic', ru: 'рекламный бюджет на трафик' },
      { en: 'hosting or a VPS for the bot', ru: 'хостинг или VPS для бота' },
      { en: 'the CRM plan that opens its API', ru: 'тариф CRM с доступом к API' },
      { en: 'AI model calls', ru: 'обращения к AI-моделям' },
    ],
  },
  {
    slug: 'telegram-mini-app-shop',
    kicker: 'In-chat storefront',
    title: { en: 'Telegram Mini App shop', ru: 'Telegram Mini App магазин' },
    lead: { en: 'The catalogue, the cart and the payment all sit inside the messenger. The customer installs nothing, and the order lands in the same chat.', ru: 'Каталог, корзина и оплата живут внутри мессенджера. Клиент ничего не устанавливает, а заказ приходит в тот же чат.' },
    audience: { en: 'Selling that already happens in a chat, where the order is assembled in messages, the price is confirmed by hand and carts are lost along the way.', ru: 'Продажи, которые уже идут в переписке: заказ собирают сообщениями, цену уточняют руками, а корзины теряются между «сколько стоит» и «куда переводить».' },
    base: 'miniapp',
    composition: [
      { en: 'catalogue with search', ru: 'каталог с поиском' },
      { en: 'cart and delivery', ru: 'корзина и доставка' },
      { en: 'in-chat payment', ru: 'оплата в мессенджере' },
      { en: 'order screen', ru: 'экран заказов' },
    ],
    flow: [
      {
        t: { en: 'The shop opens from a chat', ru: 'Магазин открывается из чата' },
        d: { en: 'No install and no registration: the person is already signed in, and the shop knows who opened it.', ru: 'Ни установки, ни регистрации: человек уже вошёл в мессенджер, и магазин знает, кто открыл витрину.' },
      },
      {
        t: { en: 'The cart is priced server-side', ru: 'Корзина считается на сервере' },
        d: { en: 'Price, discount and delivery are read from the catalogue at checkout, so the server names the amount, not the cart.', ru: 'Цена, скидка и доставка берутся из каталога при оформлении, поэтому сумму называет сервер, а не корзина.' },
      },
      {
        t: { en: 'Payment and the order stay in-chat', ru: 'Оплата и заказ остаются в переписке' },
        d: { en: 'The invoice is issued inside the messenger, and the confirmation and every status arrive in that same chat.', ru: 'Счёт выставляется в мессенджере, а подтверждение и статусы приходят в тот же чат, без писем и ручных сообщений.' },
      },
    ],
    watch: [
      {
        t: { en: 'The mini app cannot be trusted', ru: 'Данным из приложения нельзя верить' },
        d: { en: 'The messenger’s signature on the user data is verified on every request, and the total is recomputed from the catalogue.', ru: 'Подпись мессенджера под данными пользователя проверяется на сервере при каждом запросе, а сумма пересчитывается по каталогу.' },
      },
      {
        t: { en: 'Digital and physical pay differently', ru: 'Цифровое и физическое оплачиваются по-разному' },
        d: { en: 'Physical goods use an ordinary provider and digital goods the platform’s own mechanism, so which you sell is settled before the build.', ru: 'Физические товары идут через обычного провайдера, а цифровые через механику площадки и её долю, поэтому вид товара решается до сборки.' },
      },
      {
        t: { en: 'It is somebody else’s window', ru: 'Это чужое окно, и оно закрывается' },
        d: { en: 'A swipe closes checkout, so the cart survives a close, an unfinished order asks before exit, and the dark theme is tested too.', ru: 'Жест вниз закрывает окно посреди оформления, поэтому корзина переживает закрытие, выход переспрашивает, а тёмная тема проверяется наравне со светлой.' },
      },
    ],
    metrics: [
      { en: 'orders placed without messaging anyone', ru: 'заказов без сообщений менеджеру' },
      { en: 'time from opening to payment', ru: 'время от открытия до оплаты' },
      { en: 'share of carts abandoned', ru: 'доля брошенных корзин' },
      { en: 'repeat orders from the same chat', ru: 'повторных заказов из чата' },
    ],
    faq: [
      {
        q: { en: 'Why this, if we already have a site?', ru: 'Зачем это, если у нас есть сайт?' },
        a: { en: 'The audience is already there and signed in, so the path from post to payment loses a registration and a browser jump. In exchange the shop is not indexed and works on your existing traffic.', ru: 'Аудитория уже здесь и авторизована: путь от поста до оплаты короче на регистрацию и переход в браузер. Взамен магазин не индексируется поиском и работает с трафиком, который у вас уже есть.' },
      },
      {
        q: { en: 'How do we take the money, and where does it land?', ru: 'Как принимать деньги и куда они приходят?' },
        a: { en: 'Through a payment provider connected to your bot and your account: the money goes to you directly and never passes through us. The contract is yours, and so are the refunds.', ru: 'Через платёжного провайдера, подключённого к вашему боту и счёту: деньги идут напрямую вам, через нас они не проходят. Договор с провайдером ваш, и возвраты делает тот, кто получил платёж.' },
      },
      {
        q: { en: 'Where does the catalogue come from if the goods sit in 1C?', ru: 'Откуда берётся каталог, если товары уже в 1С или на сайте?' },
        a: { en: 'From whichever system is already the truth about items and stock, agreed before the build. A second catalogue kept by hand diverges within a week, and the customer who paid finds out first.', ru: 'Из той системы, которая уже является истиной по товарам и остаткам, и договариваемся об этом до сборки. Второй каталог, который ведут руками, расходится за неделю, и замечает это оплативший покупатель.' },
      },
    ],
    stack: [
      { t: { en: 'Mini app', ru: 'Мини-приложение' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Bot, server and data', ru: 'Бот, сервер и данные' }, items: ['Node.js', 'Telegram Bot API', 'PostgreSQL', 'Prisma', 'Redis'] },
      { t: { en: 'Payments and operations', ru: 'Оплата и эксплуатация' }, items: ['Stripe', 'Paddle', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'payment fees and the platform’s share', ru: 'комиссия платёжной системы и доля площадки' },
      { en: 'hosting or a VPS for the shop', ru: 'хостинг или VPS для каталога и заказов' },
      { en: 'a domain and certificate for the mini app', ru: 'домен и сертификат для мини-приложения' },
      { en: 'the till and fiscal receipts', ru: 'онлайн-касса и фискализация чеков' },
    ],
  },
  {
    slug: 'marketplace-price-parsing',
    kicker: 'Marketplace pricing',
    title: { en: 'Marketplace price parsing', ru: 'Парсинг цен маркетплейсов' },
    lead: { en: 'A collector walks the listings you care about on a schedule and puts price, discount, stock and search position into one table. History is kept per platform.', ru: 'Сборщик обходит нужные карточки по расписанию и складывает цену, скидку, остаток и позицию в выдаче в одну таблицу. История ведётся по каждой площадке.' },
    audience: { en: 'Sellers and brands whose one item sits on three platforms at three prices, and who learn about a neighbour’s price cut from a drop in orders.', ru: 'Продавцы и бренды, у которых один товар лежит на трёх площадках с тремя ценами, а о снижении у соседа по карточке узнают по упавшим заказам.' },
    base: 'parsing',
    composition: [
      { en: 'prices and discounts', ru: 'цены и скидки' },
      { en: 'stock', ru: 'остатки' },
      { en: 'search position', ru: 'позиция в выдаче' },
      { en: 'alerts', ru: 'оповещения' },
    ],
    flow: [
      {
        t: { en: 'Each run has a chosen region', ru: 'Прогон идёт из выбранного региона' },
        d: { en: 'Price and availability depend on region and warehouse, so each run fixes its region and records it beside the number.', ru: 'Цена и наличие зависят от региона и склада, поэтому регион задан в прогоне и записан рядом с числом.' },
      },
      {
        t: { en: 'The price breaks into parts', ru: 'Цена раскладывается на составляющие' },
        d: { en: 'Price before discount, with discount, with the platform card and in a promotion are four fields, not one.', ru: 'Цена до скидки, со скидкой, с картой площадки и в акции это четыре разных поля, а не одно.' },
      },
      {
        t: { en: 'The change reaches the right person', ru: 'Изменение доходит до нужного человека' },
        d: { en: 'A message arrives with the SKU, the old and new number, and what moved: seller price, platform discount or stock.', ru: 'Приходит сообщение с артикулом, старым и новым числом и тем, что сдвинулось: цена продавца, скидка или наличие.' },
      },
    ],
    watch: [
      {
        t: { en: 'A listing carries several prices', ru: 'Цена на карточке не одна' },
        d: { en: 'Repricing against a card price while the competitor number excludes it burns margin, so every record shows which numbers were compared.', ru: 'Переоценка по цене с картой площадки против чужой цены без неё теряет маржу, поэтому в записи видно, какие числа сравнивались.' },
      },
      {
        t: { en: 'Region changes price and stock', ru: 'Регион меняет цену и наличие' },
        d: { en: 'The same SKU costs differently by city and may have no stock, so region is a run parameter written into every row.', ru: 'Один артикул в разных городах стоит по-разному и может не иметь остатка, поэтому регион задан параметром прогона и записан в строке.' },
      },
      {
        t: { en: 'A vanished listing reads as no change', ru: 'Исчезнувшая карточка читается как прежняя цена' },
        d: { en: 'Silence reads as a price that held, so an empty answer is its own value and a vanished listing raises an alert.', ru: 'Молчание источника читается как прежняя цена, поэтому пустой ответ пишется отдельным значением, а исчезновение карточки приходит оповещением.' },
      },
    ],
    metrics: [
      { en: 'share of listings collected first time', ru: 'доля карточек, собранных с первой попытки' },
      { en: 'time from a price change to the alert', ru: 'время от смены цены до оповещения' },
      { en: 'SKUs outside your price corridor', ru: 'артикулы вне вашего ценового коридора' },
      { en: 'repricings on the day of the change', ru: 'переоценок в день изменения' },
    ],
    faq: [
      {
        q: { en: 'Why not through the marketplace API?', ru: 'Почему не через API маркетплейса?' },
        a: { en: 'A seller account gives up your data, not a competitor’s price or stock on the same listing. So your own comes via API, the rest off the public page, named per platform before the estimate.', ru: 'Кабинет продавца отдаёт ваши данные, а не чужие: цену и остаток соседа по карточке он не покажет. Своё берём через API, чужое читаем со страницы, и по каждой площадке говорим это до сметы.' },
      },
      {
        q: { en: 'Can this put our seller account at risk?', ru: 'Может ли это подставить наш аккаунт продавца?' },
        a: { en: 'Collection happens from the buyer side, on public pages, and nobody signs into your seller account. If a figure exists only inside that account, we say so before the estimate: a different risk.', ru: 'Сбор идёт со стороны покупателя, по публичным страницам, и в ваш кабинет продавца никто не заходит. Если какая-то цифра берётся только из кабинета, скажем это до сметы: это другой разговор про риски.' },
      },
      {
        q: { en: 'Can it also set our prices on the platform?', ru: 'А наши цены на площадке он сможет менять сам?' },
        a: { en: 'Reading and writing carry different risk, so the first version only reads. Writing a price back through the seller account is separate work, with a floor price and human confirmation on the first runs.', ru: 'Читать и писать это разный уровень риска, поэтому первая версия только читает. Обратная запись цены через кабинет делается отдельно, с нижней границей и подтверждением человека на первых прогонах.' },
      },
    ],
    stack: [
      { t: { en: 'Collection', ru: 'Сбор' }, items: ['Python', 'Playwright', 'Go', 'Docker'] },
      { t: { en: 'Storage and history', ru: 'Хранение и история' }, items: ['PostgreSQL', 'ClickHouse', 'Redis', 'S3'] },
      { t: { en: 'Schedule and alerts', ru: 'Расписание и оповещения' }, items: ['Temporal', 'n8n', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'proxies and captcha services in the regions you need', ru: 'прокси и обход капчи в нужных регионах' },
      { en: 'paid tiers of the seller account and analytics', ru: 'платные тарифы кабинета и внешней аналитики' },
      { en: 'AI model calls when listings match by name', ru: 'обращения к AI-моделям при сопоставлении по названию' },
      { en: 'hosting, servers and space for the price history', ru: 'хостинг, серверы и место под историю цен' },
    ],
  },
  {
    slug: 'tender-monitoring',
    kicker: 'Tender watch',
    title: { en: 'Tender monitoring', ru: 'Мониторинг тендеров' },
    lead: { en: 'Procurement sites are walked on a schedule, and new notices pass filters on niche, region and value. The ones that fit arrive in a chat with the deadline and the documents.', ru: 'Площадки закупок обходятся по расписанию, новые процедуры проходят фильтры по нише, региону и сумме. Подходящие приходят в чат со сроком подачи и документацией.' },
    audience: { en: 'Companies searching several procurement sites by hand, finding half the suitable notices just before the deadline and spending more effort on weeding out than on the bid.', ru: 'Компании, где тендеры ищут руками по нескольким площадкам, находят половину подходящих перед самой подачей и тратят на отсев больше сил, чем на заявку.' },
    base: 'parsing',
    composition: [
      { en: 'procurement sites', ru: 'площадки закупок' },
      { en: 'filters and stop-words', ru: 'фильтры и стоп-слова' },
      { en: 'notice with documents', ru: 'карточка с документацией' },
      { en: 'alerts and deadlines', ru: 'оповещения и сроки' },
    ],
    flow: [
      {
        t: { en: 'A new notice appears', ru: 'Появляется новая процедура' },
        d: { en: 'A pass takes what is new, documents included: the substance sits in the attachments, not the heading or classifier code.', ru: 'Прогон забирает новое вместе с документацией: суть закупки лежит в приложениях, а не в заголовке и коде классификатора.' },
      },
      {
        t: { en: 'Cutting matters more than searching', ru: 'Отсекать важнее, чем искать' },
        d: { en: 'Stop words, value limits and requirements you fail take away more than keywords add, and what was cut stays visible.', ru: 'Стоп-слова, границы суммы и невыполнимые требования снимают больше, чем добавляют ключевые слова, и отсечённое остаётся видимым.' },
      },
      {
        t: { en: 'What fits arrives with its deadline', ru: 'Подходящая приходит вместе со сроком' },
        d: { en: 'One message: subject, buyer, value, closing date and link, and the decision is recorded there, which corrects the filter.', ru: 'Одно сообщение: предмет, заказчик, сумма, дата окончания и ссылка, а решение отмечается там же и правит фильтр.' },
      },
    ],
    watch: [
      {
        t: { en: 'The heading hides the subject', ru: 'Заголовок не описывает предмет' },
        d: { en: 'The heading and classifier code belong to the buyer’s reporting, so parsing reaches the documentation and doubtful notices queue for a person.', ru: 'Заголовок и код классификатора заказчик ставит под свою отчётность, поэтому разбор доходит до документации, а спорное уходит в очередь.' },
      },
      {
        t: { en: 'A change matters more than publication', ru: 'Изменение важнее публикации' },
        d: { en: 'Deadlines and requirements change after publication, so a notice you take up stays watched and an edit arrives as its own message.', ru: 'Срок и требования правят после публикации, поэтому взятая в работу процедура отслеживается дальше, а правка приходит отдельным сообщением.' },
      },
      {
        t: { en: 'A wide filter kills the subscription', ru: 'Широкий фильтр убивает подписку' },
        d: { en: 'A flow nobody reads makes a missed tender look like no tenders, so daily volume is a metric from day one.', ru: 'Поток, который перестают читать, делает пропущенный тендер неотличимым от их отсутствия, поэтому объём в день это метрика с первого дня.' },
      },
    ],
    metrics: [
      { en: 'suitable notices found without hand searching', ru: 'подходящих процедур без ручного поиска' },
      { en: 'share of alerts marked not your work', ru: 'доля уведомлений, отмеченных как непрофильные' },
      { en: 'time from publication to your alert', ru: 'время от публикации до уведомления' },
      { en: 'changes caught before the bid goes in', ru: 'изменений, пойманных до подачи' },
    ],
    faq: [
      {
        q: { en: 'Which sites do you support?', ru: 'Какие площадки вы поддерживаете?' },
        a: { en: 'The list is agreed before the estimate: official export where it exists, the page where it does not. If a site cannot be read or its terms forbid it, we say so before the price.', ru: 'Список согласуем до сметы: где есть официальная выгрузка, берём её, где нет, читаем страницу. Если площадка не читается или её условия это запрещают, скажем до цены.' },
      },
      {
        q: { en: 'Will it submit the bid for us?', ru: 'Он подаст заявку за нас?' },
        a: { en: 'No. The system brings the notice and documents to a person and stops: a bid goes in under your signature. A draft from a template is a separate line in the estimate.', ru: 'Нет. Система доводит процедуру и документацию до человека и останавливается: подача идёт с вашей подписью. Черновик по шаблону это отдельная строка в смете.' },
      },
      {
        q: { en: 'Why is this better than a paid aggregator?', ru: 'Чем это лучше платного агрегатора?' },
        a: { en: 'Often it is not, and we will say so: if your selection fits their filters, pay them, it is cheaper. Your own makes sense when selection rests on the documentation and your own rejections.', ru: 'Часто не лучше, и мы это скажем: если ваш отбор выражается их фильтрами, платите им, так дешевле. Своё имеет смысл, когда отбор держится на документации и ваших отказах.' },
      },
    ],
    stack: [
      { t: { en: 'Collection and documents', ru: 'Сбор и документы' }, items: ['Python', 'Playwright', 'FastAPI', 'S3', 'Docker'] },
      { t: { en: 'Selection and search', ru: 'Отбор и поиск' }, items: ['PostgreSQL', 'pgvector', 'OpenAI', 'Anthropic', 'Redis'] },
      { t: { en: 'Schedule and alerts', ru: 'Расписание и уведомления' }, items: ['n8n', 'Temporal', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'electronic signature and accreditation on the sites', ru: 'электронная подпись и аккредитация на площадках' },
      { en: 'paid access to sites and aggregators', ru: 'платный доступ к площадкам и агрегаторам' },
      { en: 'AI model calls over the documentation', ru: 'обращения к AI-моделям по документации' },
      { en: 'hosting and storage for downloaded documents', ru: 'хостинг и хранилище скачанной документации' },
    ],
  },
  {
    slug: 'supplier-catalogue-parsing',
    kicker: 'Supplier feeds',
    title: { en: 'Supplier catalogue parsing', ru: 'Парсинг каталогов поставщиков' },
    lead: { en: 'Listings are taken from each supplier in whatever way that supplier gives them up, and merged into one catalogue. Shared properties and units, images in your own storage, stock on a schedule of its own.', ru: 'Карточки забираются у каждого поставщика тем способом, каким он их отдаёт, и сводятся в одну номенклатуру. Общие свойства и единицы, фотографии в вашем хранилище, остатки со своим расписанием.' },
    audience: { en: 'Shops and distributors whose suppliers hand data over in different ways, a file here, a portal there, only a web page in the third case, and merging it happens by hand.', ru: 'Магазины и дистрибьюторы, у которых поставщики отдают данные по-разному, где-то файлом, где-то кабинетом, где-то только сайтом, и свести это в один каталог получается только руками.' },
    base: 'parsing',
    composition: [
      { en: 'supplier connections', ru: 'подключения к поставщикам' },
      { en: 'property map', ru: 'карта свойств' },
      { en: 'stock and cost', ru: 'остатки и закупка' },
      { en: 'duplicate merging', ru: 'склейка дублей' },
    ],
    flow: [
      {
        t: { en: 'Every supplier hands it over differently', ru: 'Каждый поставщик отдаёт по-своему' },
        d: { en: 'A file is taken where there is one; a page only when nothing better exists, because pages break most often.', ru: 'Где есть файл, берётся файл: страницу читаем, только когда ничего лучше нет, потому что ломается она чаще всего.' },
      },
      {
        t: { en: 'Differences map onto your reference', ru: 'Разное приводится к вашему справочнику' },
        d: { en: 'Colour and units arrive differently everywhere, and the correspondences live in a table a person edits rather than inside code.', ru: 'Цвет и единицы приходят у всех по-разному, а соответствия лежат в таблице, которую правит человек, а не внутри кода.' },
      },
      {
        t: { en: 'An update never overwrites your card', ru: 'Обновление не затирает вашу карточку' },
        d: { en: 'The supplier refreshes price, stock and specifications; name, description and selling price stay yours, because every field has one owner.', ru: 'Поставщик обновляет своё: цену, остаток, характеристики, а название, описание и цену продажи ставите вы, потому что у поля один владелец.' },
      },
    ],
    watch: [
      {
        t: { en: 'The export overwrites your edits', ru: 'Выгрузка затирает вашу правку' },
        d: { en: 'Ownership is assigned field by field before the first load, and a load touching a field it does not own stops.', ru: 'Владелец назначается по каждому полю до первой загрузки, и загрузка, которая лезет в чужое поле, останавливается, а не берёт верх.' },
      },
      {
        t: { en: 'A duplicate beats a wrong merge', ru: 'Дубль дешевле ошибочной склейки' },
        d: { en: 'A wrong merge ships the wrong item, so only a barcode or manufacturer number merges automatically, the rest goes to a person.', ru: 'Ошибочная склейка отправляет покупателю не тот товар, поэтому автоматически сводится только штрихкод или артикул производителя, остальное к человеку.' },
      },
      {
        t: { en: 'Stale stock costs more than price', ru: 'Остаток стареет дороже цены' },
        d: { en: 'A day-old price costs margin, a day-old stock costs an order, so stock runs more often and silence never means in stock.', ru: 'Суточная цена стоит части маржи, суточный остаток стоит заказа, поэтому у остатков своё расписание, а молчание поставщика не означает наличие.' },
      },
    ],
    metrics: [
      { en: 'items arriving with no hand editing', ru: 'позиций, доехавших без ручной правки' },
      { en: 'cards with full properties and images', ru: 'карточек с полным набором свойств и фото' },
      { en: 'duplicates merged automatically', ru: 'дублей, склеенных автоматически' },
      { en: 'time from a stock change to the shop', ru: 'время от смены остатка до магазина' },
    ],
    faq: [
      {
        q: { en: 'Our supplier sends a spreadsheet that is different every time. Is that fixable?', ru: 'Поставщик присылает таблицу, которая каждый раз разная. Это лечится?' },
        a: { en: 'Up to a point: columns are read by content, not position, and a file that will not parse goes to a person. If the format shifts further, we say a fixed supplier export is cheaper.', ru: 'До определённой границы да: колонки узнаются по содержимому, а не по номеру, и неразобранный файл уходит к человеку. Если формат гуляет дальше, скажем прямо, что дешевле постоянная выгрузка от поставщика.' },
      },
      {
        q: { en: 'Can we use the supplier images?', ru: 'Фотографии поставщика можно использовать?' },
        a: { en: 'Technically they are easy to take, and we put them into your own storage. The right to use them comes from the supplier, agreed before we start: we do not take on somebody else’s rights.', ru: 'Технически забрать несложно, и мы складываем их в ваше хранилище. Право на использование даёт поставщик, это разговор с ним до старта: чужие права мы на себя не берём.' },
      },
      {
        q: { en: 'Where does it load into: 1C, a shop, a marketplace?', ru: 'Куда это загружается: в 1С, в магазин, на маркетплейс?' },
        a: { en: 'Into the format of one of your systems, in the first version, named before the build because it decides which fields are mandatory. A second system is a separate line.', ru: 'В формат одной вашей системы, и он входит в первую версию: называем его до сборки, потому что от него зависят обязательные поля. Вторая система это отдельная строка.' },
      },
    ],
    stack: [
      { t: { en: 'Collection and formats', ru: 'Сбор и разбор форматов' }, items: ['Python', 'FastAPI', 'Playwright', 'Docker'] },
      { t: { en: 'Catalogue, images and matching', ru: 'Номенклатура, фото и сопоставление' }, items: ['PostgreSQL', 'Redis', 'S3', 'OpenAI', 'Anthropic'] },
      { t: { en: 'Schedule and watching', ru: 'Расписание и присмотр' }, items: ['n8n', 'Temporal', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'hosting and image storage', ru: 'хостинг и хранилище фотографий' },
      { en: 'paid access to supplier portals', ru: 'платный доступ в кабинеты поставщиков' },
      { en: 'AI model calls for matching properties', ru: 'обращения к AI-моделям при сведении свойств' },
      { en: 'a higher tier on your catalogue system', ru: 'старший тариф вашей товарной системы' },
    ],
  },
  {
    slug: 'property-listing-parsing',
    kicker: 'Property data',
    title: { en: 'Property listing parsing', ru: 'Парсинг объявлений недвижимости' },
    lead: { en: 'Listings are collected on your filters, the same property is collapsed into one object, and price, time on the market and removal are written into a history.', ru: 'Объявления собираются по вашим фильтрам, одно и то же жильё сводится в один объект, а цена, срок экспозиции и снятие пишутся в историю.' },
    audience: { en: 'Agencies, investors and developers who see one property as five listings from five agents and cannot say how long it has stood or how often its price moved.', ru: 'Агентства, инвесторы и застройщики, которые видят один объект как пять объявлений от пяти агентов и не знают, сколько он висит в продаже и сколько раз двигали цену.' },
    base: 'parsing',
    composition: [
      { en: 'search filters', ru: 'фильтры поиска' },
      { en: 'listing merges', ru: 'склейка объявлений' },
      { en: 'price history', ru: 'история цены' },
      { en: 'alerts', ru: 'оповещения' },
    ],
    flow: [
      {
        t: { en: 'The feed is read on filters', ru: 'Лента читается по фильтрам' },
        d: { en: 'A pass separates a listing that appeared, changed or vanished, and that distinction is made at collection, not reconstructed later.', ru: 'Прогон разделяет три вещи: объявление появилось, изменилось или исчезло, и различие делается на сборе, а не восстанавливается потом.' },
      },
      {
        t: { en: 'Listings collapse into a property', ru: 'Объявления сводятся в объект' },
        d: { en: 'Address, floor, area and layout line up: five agents, one flat, one record, with price history kept against the property.', ru: 'Адрес, этаж, площадь и планировка сходятся: пять агентов, одна квартира, одна запись, а история цены пишется на объект.' },
      },
      {
        t: { en: 'The history outlives the listing', ru: 'История переживает объявление' },
        d: { en: 'Removal is an event, not a gap: the property keeps its time standing, its price moves and any return.', ru: 'Снятие с публикации это событие, а не пробел: у объекта остаётся срок стояния, все движения цены и возврат.' },
      },
    ],
    watch: [
      {
        t: { en: 'A repost makes no new property', ru: 'Переподача это не новый объект' },
        d: { en: 'A repost resets the publication date, so time listed is counted from the property’s first appearance in your own base instead.', ru: 'Дата публикации обнуляется при переподаче, поэтому срок считается от первого появления объекта в вашей базе, а не от неё.' },
      },
      {
        t: { en: 'Merging goes wrong in both directions', ru: 'Склейка ошибается в обе стороны' },
        d: { en: 'A missed merge inflates the market, an extra one mixes two histories: only strong matches merge, and any merge can be undone.', ru: 'Несработавшая склейка раздувает рынок, лишняя смешивает истории двух квартир, поэтому автоматически сводится только сильное совпадение, и любую склейку можно разъединить.' },
      },
      {
        t: { en: 'Asking price is not sale price', ru: 'Запрошенная цена это не сделка' },
        d: { en: 'Listings say what was asked and how often it was cut, not what was paid: the figure is labelled an asking price.', ru: 'История объявлений говорит, сколько просили и сколько раз снижали, а торг остаётся за пределами площадки, и число так и названо запрошенным.' },
      },
    ],
    metrics: [
      { en: 'listings collapsed into properties automatically', ru: 'объявлений, сведённых в объекты автоматически' },
      { en: 'doubtful merges waiting on a person', ru: 'спорных склеек, ждущих человека' },
      { en: 'time from a listing appearing to the alert', ru: 'время от появления объявления до оповещения' },
      { en: 'properties with an unbroken price history', ru: 'объектов с непрерывной историей цены' },
    ],
    faq: [
      {
        q: { en: 'Is this legal?', ru: 'Это законно?' },
        a: { en: 'The public parameters of a property and its asking price generally are. Phone numbers, names and anything that makes a contact base we do not collect: separate regulation, checked per site before the estimate.', ru: 'Публичные параметры объекта и запрошенная цена как правило да. Телефоны, имена и всё, из чего складывается база контактов, мы не собираем: это отдельное регулирование, и площадки проверяем до сметы.' },
      },
      {
        q: { en: 'How accurate is the duplicate merging?', ru: 'Насколько точно склеиваются дубли?' },
        a: { en: 'We name no share before seeing your city and sites. What we commit to: only strong matches merge automatically, doubtful ones go to a person, the share is on screen, any merge can be undone.', ru: 'Долю не назовём, пока не увидим ваш город и площадки. Обещаем другое: автоматически сводится только сильное совпадение, спорное уходит человеку, доля видна на экране, любую склейку можно разъединить.' },
      },
      {
        q: { en: 'Will we get actual transaction prices?', ru: 'Будут ли реальные цены сделок?' },
        a: { en: 'No, and no collection of listings gives them: the system shows the asking price, its cuts and time standing, which is enough to see overpriced lots. Registry data is a separate conversation.', ru: 'Нет, и никакой сбор объявлений их не даёт: система показывает запрошенную цену, снижения и срок, и этого хватает, чтобы видеть переоценённые лоты. Данные реестра это отдельный разговор.' },
      },
    ],
    stack: [
      { t: { en: 'Collection', ru: 'Сбор' }, items: ['Python', 'Playwright', 'Go', 'Docker'] },
      { t: { en: 'Merging and history', ru: 'Склейка и история' }, items: ['PostgreSQL', 'ClickHouse', 'pgvector', 'OpenAI', 'Redis', 'S3'] },
      { t: { en: 'Schedule and alerts', ru: 'Расписание и оповещения' }, items: ['Temporal', 'n8n', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'proxies and captcha services for closed sites', ru: 'прокси и обход капчи для закрытых площадок' },
      { en: 'geocoding and maps', ru: 'геокодирование и карты' },
      { en: 'AI model calls comparing listing descriptions', ru: 'обращения к AI-моделям при сравнении описаний' },
      { en: 'hosting and storage for the photo history', ru: 'хостинг и хранилище фотографий из истории' },
    ],
  },
  {
    slug: 'ecommerce-dashboard',
    kicker: 'Store economics',
    title: { en: 'Dashboard for an online store', ru: 'Дашборд для интернет-магазина' },
    lead: { en: 'It walks revenue down through returns, cost of goods, platform commissions and ad spend, source by source. What stays on the screen is what actually stays with you.', ru: 'Проводит выручку через возвраты, себестоимость, комиссии площадок и рекламу по каждому источнику заказов. На экране остаётся то, что действительно осталось у вас.' },
    audience: { en: 'Stores where turnover in the marketplace account is one figure, the money in the bank another, and the cost of goods sits in a spreadsheet reconciled by hand.', ru: 'Магазины, где оборот в кабинете площадки одно число, деньги на счёте другое, а себестоимость лежит в таблице, которую сводят руками.' },
    base: 'dash',
    composition: [
      { en: 'revenue after returns', ru: 'выручка после возвратов' },
      { en: 'cost of goods', ru: 'себестоимость' },
      { en: 'ad spend', ru: 'расход на рекламу' },
      { en: 'margin by channel', ru: 'маржа по каналам' },
    ],
    flow: [
      {
        t: { en: 'The order arrives whole', ru: 'Заказ приходит целиком' },
        d: { en: 'Not the order total but its contents: items, discount, delivery, payment and source tag, so margin breaks down per item.', ru: 'Забирается не сумма чека, а состав: позиции, скидка, доставка, оплата и метка источника, поэтому маржа раскладывается до товара.' },
      },
      {
        t: { en: 'Costs settle onto the order', ru: 'На заказ садятся расходы' },
        d: { en: 'Purchase cost at the order date, platform commission, logistics, acquiring and ad spend by source: the order carries its margin.', ru: 'Себестоимость на дату заказа, комиссия и логистика площадки, эквайринг и реклама, распределённая на источник: заказ несёт свою маржу сам.' },
      },
      {
        t: { en: 'A return rewrites the past', ru: 'Возврат переписывает прошлое' },
        d: { en: 'Booked weeks later to the order date, it moves a closed period, which is marked final or still waiting.', ru: 'Он приходит через недели, относится к дате заказа и двигает закрытый период, у которого стоит пометка, окончательный он или ещё ждёт.' },
      },
    ],
    watch: [
      {
        t: { en: 'Returns arrive after the month closes', ru: 'Возврат приходит позже, чем закрывают месяц' },
        d: { en: 'A margin that never changes after close knows nothing about returns, so every month says whether it is final or still waiting.', ru: 'Маржа, которая после закрытия не меняется, ничего не знает о возвратах, поэтому у каждого месяца видно, окончательный он или ещё ждёт.' },
      },
      {
        t: { en: 'Ad accounts claim the same orders', ru: 'Каждый кабинет засчитывает заказ себе' },
        d: { en: 'The store is the only truth for an order, ad accounts supply spend alone, and the source comes from the link tag.', ru: 'Истина по заказу это магазин, кабинеты дают только расход, а источник берётся из метки в ссылке.' },
      },
      {
        t: { en: 'Marketplace turnover is not your money', ru: 'Оборот площадки это не ваши деньги' },
        d: { en: 'The platform withholds commission, logistics, storage and penalties, so the screen shows the payout, turnover beside it, and the deductions itemised.', ru: 'Площадка удерживает комиссию, логистику, хранение и штрафы, поэтому на экране стоит выплата, а оборот рядом отдельным числом с разложенными удержаниями.' },
      },
    ],
    metrics: [
      { en: 'margin by channel after returns and ad spend', ru: 'маржа по каналу после возвратов и рекламы' },
      { en: 'share of orders with an identified source', ru: 'доля заказов с определённым источником' },
      { en: 'share of items with a current cost', ru: 'доля позиций с актуальной себестоимостью' },
      { en: 'gap between the report and the bank statement', ru: 'расхождение отчёта с банковской выпиской' },
    ],
    faq: [
      {
        q: { en: 'Why will the numbers not match the ad account?', ru: 'Почему цифры не сойдутся с рекламным кабинетом?' },
        a: { en: 'They count different things: the platform reports conversions inside its own attribution window, we count orders the store recorded. We show both numbers, label their source, and do not quietly pick the flattering one.', ru: 'Считается разное: площадка показывает конверсии в своём окне атрибуции, а мы считаем заказы, записанные магазином. Мы показываем оба числа, подписываем источник и не выбираем молча то, которое приятнее.' },
      },
      {
        q: { en: 'Our cost of goods lives in a spreadsheet, where will it come from?', ru: 'Себестоимость у нас в таблице, откуда она возьмётся?' },
        a: { en: 'From the spreadsheet at the start, or from the accounting system, and you edit it afterwards. Every purchase price carries a start date, and an item with no cost shows as unknown, not full margin.', ru: 'Из таблицы импортом на старте или из учётной системы, дальше вы правите её сами. У каждой закупочной цены есть дата начала, а позиция без себестоимости показывается как неизвестная, а не как полная маржа.' },
      },
      {
        q: { en: 'Who on the team gets to see the cost of goods?', ru: 'Кто из команды увидит себестоимость?' },
        a: { en: 'Whoever you allow: access to purchase prices and margin is a role of its own, set before launch. A marketer still sees sources, spend and orders, and can work without ever seeing what stock costs.', ru: 'Тот, кому вы разрешите: доступ к закупочным ценам и марже это отдельная роль, заданная до запуска. Маркетологу видны источники, расход и заказы, поэтому работать с экраном он может, не видя закупку.' },
      },
    ],
    stack: [
      { t: { en: 'Collection from the store and the accounts', ru: 'Сбор из магазина и кабинетов' }, items: ['Python', 'FastAPI', 'Playwright', 'n8n'] },
      { t: { en: 'Storage and computation', ru: 'Хранение и расчёт' }, items: ['PostgreSQL', 'ClickHouse', 'Redis', 'S3'] },
      { t: { en: 'The screen and the alerts', ru: 'Экран и оповещения' }, items: ['TypeScript', 'React', 'Next.js', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'paid tiers on marketplaces and ad accounts', ru: 'платные тарифы площадок и рекламных кабинетов' },
      { en: 'proxies and anti-bot services for accounts without export', ru: 'прокси и обход антибот-защиты для кабинетов без выгрузки' },
      { en: 'storage for the order and ad-spend history', ru: 'хранилище истории заказов и рекламных расходов' },
      { en: 'paid access to accounting or inventory systems', ru: 'платный доступ к учётной или складской системе' },
    ],
  },
  {
    slug: 'agency-dashboard',
    kicker: 'Project margin',
    title: { en: 'Dashboard for an agency', ru: 'Дашборд для агентства' },
    lead: { en: 'It puts the team’s hours, their cost rates and outside spend against the price of each project. An overrun shows up halfway through, not in a report after delivery.', ru: 'Сводит часы команды, ставки себестоимости и внешние расходы с ценой каждого проекта. Перерасход видно на середине, а не в отчёте после сдачи.' },
    audience: { en: 'Studios and agencies where profit is worked out after a project closes, hours are logged whenever somebody remembers, and the friendliest client turns out the most expensive.', ru: 'Студии и агентства, где рентабельность считают после закрытия проекта, часы вносят когда вспомнят, а самый приятный клиент оказывается самым дорогим.' },
    base: 'dash',
    composition: [
      { en: 'hours by project', ru: 'часы по проектам' },
      { en: 'cost rates', ru: 'ставки себестоимости' },
      { en: 'contractors and spend', ru: 'подрядчики и расходы' },
      { en: 'plan and actual', ru: 'план и факт' },
    ],
    flow: [
      {
        t: { en: 'An hour lands on a project', ru: 'Час попадает в проект' },
        d: { en: 'Hours are read from the tracker the team already uses, and time attached to nothing appears as its own line.', ru: 'Часы читаются из трекера, которым команда уже пользуется, а время, не привязанное ни к чему, показывается отдельной строкой.' },
      },
      {
        t: { en: 'The hour turns into money', ru: 'Час превращается в деньги' },
        d: { en: 'At that person’s cost rate for that date, plus contractor invoices and anything bought for the project: cost accumulates continuously.', ru: 'По ставке себестоимости человека на эту дату, плюс счета подрядчиков и покупки под проект: себестоимость копится непрерывно.' },
      },
      {
        t: { en: 'The project meets its own price', ru: 'Проект встречается со своей ценой' },
        d: { en: 'Fixed price, retainer and hourly count differently, and the screen shows how much budget is gone while work still runs.', ru: 'Фикс, ретейнер и почасовая считаются по-разному, и экран показывает израсходованную долю бюджета, пока работа ещё идёт.' },
      },
    ],
    watch: [
      {
        t: { en: 'Hours are filled in on Friday', ru: 'Часы вносят в пятницу за неделю' },
        d: { en: 'Hours from memory are an estimate, so the same-day share is on screen and a low-share period is marked approximate.', ru: 'Часы по памяти это оценка, поэтому видна доля внесённых в тот же день, а период с низкой долей помечен как прикидка.' },
      },
      {
        t: { en: 'A cost rate is not salary', ru: 'Ставка себестоимости это не оклад' },
        d: { en: 'Salary over actual hours makes an overworked project look profitable, so the rate is salary, taxes and overhead over a fixed norm.', ru: 'Оклад на фактические часы делает выжатый проект самым прибыльным, поэтому ставка это оклад, налоги и накладные на фиксированную норму часов.' },
      },
      {
        t: { en: 'A delivered project keeps eating hours', ru: 'Сданный проект продолжает есть часы' },
        d: { en: 'Revisions and support run for months after delivery, so a project stays open for costs until you close it yourself.', ru: 'Правки и поддержка идут месяцами после сдачи, поэтому проект остаётся открытым для расходов, пока вы не закроете его сами.' },
      },
    ],
    metrics: [
      { en: 'share of hours logged the same day', ru: 'доля часов, внесённых в тот же день' },
      { en: 'margin by project and by client', ru: 'рентабельность по проекту и по клиенту' },
      { en: 'gap between planned and actual cost', ru: 'разрыв плановой и фактической себестоимости' },
      { en: 'hours attached to no project', ru: 'часы, не привязанные к проекту' },
    ],
    faq: [
      {
        q: { en: 'We already have a time tracker, does it have to go?', ru: 'У нас уже есть трекер времени, его придётся менять?' },
        a: { en: 'No. Hours are read from whatever the team uses now, and what lives here is what a tracker does not hold: the cost rate, the project price and outside spend.', ru: 'Нет. Часы читаются из того, чем команда пользуется сейчас, а здесь живёт то, чего в трекере нет: ставка себестоимости, цена проекта и внешние расходы.' },
      },
      {
        q: { en: 'Will the team read this as surveillance?', ru: 'Команда воспримет это как слежку?' },
        a: { en: 'The screen counts projects, not people against each other: no screenshots, no activity tracking, no keystroke counters. A person sees their own hours, and nobody sees a colleague’s rate except the role you name.', ru: 'Экран считает проекты, а не людей друг против друга: скриншотов, слежки за активностью и счётчиков нажатий здесь нет. Человек видит свои часы, а ставки коллег не видит никто, кроме названной вами роли.' },
      },
      {
        q: { en: 'If we raise the rates, does the history recompute?', ru: 'Если мы поднимем ставки, история пересчитается?' },
        a: { en: 'No. Every rate carries a start date, past projects stay costed at the rate in force while they ran, and a retroactive recompute happens only when you ask and name the period.', ru: 'Нет. У каждой ставки есть дата начала, старые проекты остаются посчитанными по действовавшей тогда ставке, а пересчёт задним числом делается только по вашей просьбе и за названный период.' },
      },
    ],
    stack: [
      { t: { en: 'Collection from trackers and accounting', ru: 'Сбор из трекеров и учёта' }, items: ['Python', 'FastAPI', 'n8n', 'Temporal'] },
      { t: { en: 'Data and cost computation', ru: 'Данные и расчёт себестоимости' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'ClickHouse'] },
      { t: { en: 'The screen and the reports', ru: 'Экран и отчёты' }, items: ['TypeScript', 'React', 'Next.js', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'paid tiers on the time and task trackers', ru: 'платные тарифы трекера времени и таск-трекера' },
      { en: 'tracker seats for contractors', ru: 'места в трекере для подрядчиков' },
      { en: 'access to accounting or payroll services', ru: 'доступ к бухгалтерии или расчёту зарплат' },
      { en: 'hosting and the server for the history', ru: 'хостинг и сервер под экран и историю' },
    ],
  },
  {
    slug: 'manufacturing-dashboard',
    kicker: 'Shop floor',
    title: { en: 'Dashboard for manufacturing', ru: 'Дашборд для производства' },
    lead: { en: 'It brings orders, workstation load, scrap and dates into one report. While the shift is still on, it shows where the queue stopped and which orders are losing their date.', ru: 'Собирает заказы, загрузку участков, брак и сроки в один отчёт. Пока смена идёт, видно, где встала очередь и какие заказы теряют дату.' },
    audience: { en: 'Plants where the plan lives in a spreadsheet, the real state of things comes over the phone from a foreman, and a missed date surfaces on the day of shipping.', ru: 'Производства, где план лежит в таблице, положение дел узнают у мастера по телефону, а о сорванном сроке становится известно в день отгрузки.' },
    base: 'dash',
    composition: [
      { en: 'orders by stage', ru: 'заказы по этапам' },
      { en: 'station queues', ru: 'очередь участков' },
      { en: 'scrap by cause', ru: 'брак с причиной' },
      { en: 'dates per order', ru: 'сроки по заказам' },
    ],
    flow: [
      {
        t: { en: 'The order breaks into stages', ru: 'Заказ раскладывается на этапы' },
        d: { en: 'Every stage carries a station, a norm and a queue place, so the date comes from the queue, not optimism.', ru: 'У каждого этапа свой участок, норматив и место в очереди, поэтому дата берётся из очереди, а не из оптимизма.' },
      },
      {
        t: { en: 'The shift logs what happened', ru: 'Смена отмечает, что произошло' },
        d: { en: 'A few taps at the station terminal: made, scrapped, stopped, why, since the form suits the shift, not the report.', ru: 'Несколько касаний на терминале участка: сделано, брак, простой, причина, потому что форма сделана под смену, а не под отчёт.' },
      },
      {
        t: { en: 'The date recomputes itself', ru: 'Срок пересчитывается сам' },
        d: { en: 'Scrap returns a batch to the queue, downtime shifts everything behind it, and today’s late orders land in a list.', ru: 'Брак возвращает партию в очередь, простой сдвигает всё за ним, а потерявшие дату заказы попадают в отдельный список.' },
      },
    ],
    watch: [
      {
        t: { en: 'The log is written from memory', ru: 'Факт вносят по памяти' },
        d: { en: 'Then scrap has no stage and downtime no cause, so entry lives at the machine and the reason list stays short.', ru: 'Тогда у брака нет этапа, а у простоя причины, поэтому отметка живёт у станка, а список причин остаётся коротким.' },
      },
      {
        t: { en: 'Scrap logging reads as blame', ru: 'Учёт брака читается как наказание' },
        d: { en: 'Once the screen punishes, scrap stops being logged, so it counts by stage and cause with the per-person cut closed by default.', ru: 'Как только экран становится наказанием, брак перестают отмечать, поэтому персональный срез закрыт по умолчанию, а брак считается по этапу и причине.' },
      },
      {
        t: { en: 'The plan rests on old norms', ru: 'План стоит на старом нормативе' },
        d: { en: 'An optimistic norm makes every order late, so actual time corrects it, the change carries a date and old orders keep theirs.', ru: 'При заниженном нормативе опаздывает каждый заказ, поэтому факт сравнивается с нормативом, изменение записывается с датой, а старые заказы считаются по своему.' },
      },
    ],
    metrics: [
      { en: 'share of orders delivered on the first date', ru: 'доля заказов, сданных в первоначальный срок' },
      { en: 'scrap by stage and by cause', ru: 'брак по этапу и по причине' },
      { en: 'station downtime per shift', ru: 'простой участков за смену' },
      { en: 'share of shifts with the log filled in', ru: 'доля смен с внесённым фактом' },
    ],
    faq: [
      {
        q: { en: 'The network in the shop is poor, will this work?', ru: 'В цехе плохо со связью, это будет работать?' },
        a: { en: 'The station terminal works offline: entries queue on the device and go to the server when the link returns. Order is preserved, a repeated send makes no duplicates, and a silent station shows on screen.', ru: 'Терминал у участка работает без сети: отметки копятся на устройстве и уходят, когда связь появляется. Порядок сохраняется, повторная отправка не создаёт дублей, а на экране видно молчащий участок.' },
      },
      {
        q: { en: 'Do we have to replace the system we keep our orders in?', ru: 'Нам придётся менять систему, в которой лежат заказы?' },
        a: { en: 'No. Orders and the item list are read from the system you already run, and shop-floor fact and dates are added on top; writing back happens only if you ask, as a separate line.', ru: 'Нет. Заказы и номенклатура читаются из вашей системы, а цеховой факт и сроки добавляются сверху; обратная запись делается только по вашей просьбе и отдельной строкой в смете.' },
      },
      {
        q: { en: 'Who does the logging, when a foreman has no time for it?', ru: 'Кто будет вносить факт, если у мастера нет на это времени?' },
        a: { en: 'The foreman or operator, in as many taps as fit between two operations, after we watch a shift. If there is nobody to log it, we say so: an empty report is worse than none.', ru: 'Мастер или оператор, ровно за столько касаний, сколько помещается между операциями, и форму рисуем после того, как посмотрим смену. Если вносить некому, скажем прямо: пустой отчёт хуже отсутствия.' },
      },
    ],
    stack: [
      { t: { en: 'The screen and the shift terminal', ru: 'Экран и терминал смены' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'] },
      { t: { en: 'Exchange and watching', ru: 'Обмен и присмотр' }, items: ['Python', 'n8n', 'Temporal', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'tablets or terminals at the stations', ru: 'планшеты или терминалы у участков' },
      { en: 'network coverage in the shop', ru: 'сеть в цехе и её монтаж' },
      { en: 'a licence on the system holding orders', ru: 'лицензия системы, из которой читаются заказы' },
      { en: 'the server the report runs on', ru: 'сервер под отчёт, облачный или свой' },
    ],
  },
  {
    slug: 'sales-funnel-dashboard',
    kicker: 'Pipeline health',
    title: { en: 'Sales funnel dashboard', ru: 'Дашборд воронки продаж' },
    lead: { en: 'It reads deals out of the CRM, measures the moves between stages and finds the ones that have stopped. The forecast is assembled from conversions that actually happen.', ru: 'Читает сделки из CRM, считает переходы между этапами и находит те, что не двигаются. Прогноз собирается из фактических конверсий.' },
    audience: { en: 'Sales teams where the CRM funnel looks full and the month closes on something other than the forecast.', ru: 'Отделы продаж, где воронка в CRM выглядит полной, а месяц закрывается не тем, что стояло в прогнозе.' },
    base: 'dash',
    composition: [
      { en: 'conversion between stages', ru: 'конверсия переходов' },
      { en: 'time in stage', ru: 'время на этапе' },
      { en: 'stalled deals', ru: 'зависшие сделки' },
      { en: 'forecast from actuals', ru: 'прогноз по факту' },
    ],
    flow: [
      {
        t: { en: 'A deal becomes stage history', ru: 'Сделка превращается в историю этапов' },
        d: { en: 'Conversion is measured on the moves, not on where a card sits, and the history accumulates from day one.', ru: 'Конверсия считается по переходам, а не по текущему этапу, и история копится с первого дня подключения.' },
      },
      {
        t: { en: 'Each stage gets its own norm', ru: 'У этапа появляется своя норма' },
        d: { en: 'How long a deal normally lives in a stage is computed from closed deals rather than decreed from above.', ru: 'Сколько сделка обычно живёт на этапе, считается по закрытым сделкам, а не назначается сверху.' },
      },
      {
        t: { en: 'The forecast assembles from the moves', ru: 'Прогноз собирается из переходов' },
        d: { en: 'Every open deal is weighted by the conversion of its own stage, and the gap to the plan is visible.', ru: 'Каждая открытая сделка взвешивается конверсией своего этапа, и виден разрыв до плана.' },
      },
    ],
    watch: [
      {
        t: { en: 'The CRM forgets when stages changed', ru: 'CRM не помнит смену этапа' },
        d: { en: 'Conversion computed from current states is a photograph of today, so the move history is written separately from the first day.', ru: 'Конверсия по текущим состояниям это фотография на сегодня, поэтому история переходов пишется отдельно с первого дня.' },
      },
      {
        t: { en: 'Stages move for the report', ru: 'Этапы начинают двигать ради отчёта' },
        d: { en: 'A stage needs a checkable condition for entering it, or deals travel forward for the report and a loss becomes on hold.', ru: 'У этапа есть проверяемое условие входа, иначе сделки едут вперёд ради отчёта, а отказ превращается в вечное «отложено».' },
      },
      {
        t: { en: 'A stalled deal is not dead', ru: 'Зависшая сделка не всегда мёртвая' },
        d: { en: 'One norm for the whole funnel lists every large deal, so the norm is computed per stage and per segment.', ru: 'Одна норма на всю воронку собирает в список все крупные сделки, поэтому норма считается по этапу и сегменту.' },
      },
    ],
    metrics: [
      { en: 'conversion between stages', ru: 'конверсия переходов между этапами' },
      { en: 'average age of the open pipeline', ru: 'средний возраст открытой воронки' },
      { en: 'losses with a reason recorded', ru: 'доля отказов с указанной причиной' },
      { en: 'forecast against the closed month', ru: 'расхождение прогноза с фактом месяца' },
    ],
    faq: [
      {
        q: { en: 'Our CRM already has reports, why this?', ru: 'В нашей CRM отчёты уже есть, зачем это?' },
        a: { en: 'Often they are enough, and we say so. This is about what they lack: a deeper move history, a stalling norm per stage, and a forecast from your own conversions.', ru: 'Часто их и хватает, и мы прямо это скажем. Речь о том, чего в них нет: история переходов глубже, норма зависания по этапу, прогноз из ваших конверсий.' },
      },
      {
        q: { en: 'Is this another place a manager has to type things into?', ru: 'Это ещё одно место, куда менеджеру надо вносить данные?' },
        a: { en: 'No, entry stays in the CRM and the report only reads. It asks for one thing: a lost reason from a list, on the same card.', ru: 'Нет, ввод остаётся в CRM, а отчёт только читает. Попросит одно: причину отказа из списка, в той же карточке.' },
      },
      {
        q: { en: 'How much can the forecast be trusted?', ru: 'Насколько можно верить прогнозу?' },
        a: { en: 'Exactly as much as your conversions are stable, and the screen says so: beside the forecast stands how it lands against months already closed.', ru: 'Ровно настолько, насколько стабильны ваши конверсии, и экран это говорит: рядом с прогнозом видно, как он попадает в уже закрытые месяцы.' },
      },
    ],
    stack: [
      { t: { en: 'Reading the CRM and keeping history', ru: 'Чтение CRM и история переходов' }, items: ['Python', 'FastAPI', 'n8n', 'Temporal'] },
      { t: { en: 'Storage and computation', ru: 'Хранение и расчёт' }, items: ['PostgreSQL', 'ClickHouse', 'Redis', 'Docker'] },
      { t: { en: 'The screen and the nudges', ru: 'Экран и напоминания' }, items: ['TypeScript', 'React', 'Next.js', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'the paid CRM tier for export and history', ru: 'платный тариф CRM ради выгрузки и истории' },
      { en: 'a CRM seat for the service account', ru: 'место в CRM под служебную запись' },
      { en: 'telephony and call recording', ru: 'телефония и запись разговоров' },
      { en: 'hosting for the screen and the history', ru: 'хостинг под экран и историю переходов' },
    ],
  },
  {
    slug: 'reviews-and-nps-service',
    kicker: 'Feedback loop',
    title: { en: 'Reviews and NPS service', ru: 'Сервис отзывов и NPS' },
    lead: { en: 'The system asks the customer at the moment there is something to say, and collects a score and a comment. An unhappy answer reaches a person before it turns into a public one.', ru: 'Система спрашивает клиента в тот момент, когда ему есть что сказать, и собирает оценку и текст. Недовольный ответ доходит до человека раньше, чем станет публичным.' },
    audience: { en: 'Businesses where reviews are asked for by hand and not always, and dissatisfaction is discovered on a public listing.', ru: 'Бизнесы, где об отзывах просят руками и не всегда, а о недовольстве узнают из публичной карточки.' },
    base: 'dash',
    composition: [
      { en: 'event-driven request', ru: 'запрос по событию' },
      { en: 'score and comment', ru: 'оценка и текст' },
      { en: 'task on negatives', ru: 'задача по негативу' },
      { en: 'NPS by segment', ru: 'NPS по срезам' },
    ],
    flow: [
      {
        t: { en: 'Asked when something is worth saying', ru: 'Спрашивают тогда, когда есть что сказать' },
        d: { en: 'The request is tied to an event rather than a mailing date, with one score and one field in words.', ru: 'Запрос привязан к событию, а не к дате рассылки: один вопрос с оценкой и одно поле словами.' },
      },
      {
        t: { en: 'The answer splits two ways', ru: 'Ответ идёт одним из двух путей' },
        d: { en: 'A low score becomes a task with a deadline, a high one an offer to post it publicly.', ru: 'Низкая оценка становится задачей со сроком, а высокая предложением опубликовать сказанное.' },
      },
      {
        t: { en: 'Answers add up to a reason', ru: 'Из ответов собирается причина' },
        d: { en: 'Comments are grouped by theme, so what is visible is not that the score drops but on what.', ru: 'Тексты раскладываются по темам: видно не только то, что оценка просела, но и на чём именно.' },
      },
    ],
    watch: [
      {
        t: { en: 'Filtering who posts breaks the rules', ru: 'Фильтр перед публикацией нарушает правила площадок' },
        d: { en: 'Everyone gets the invitation, because inviting only high scores is against platform rules and reviews are removed in bulk.', ru: 'Приглашение получают все: просить отзыв только у довольных запрещено правилами площадок, а снимают отзывы пачкой.' },
      },
      {
        t: { en: 'Asking twice is worse than never', ru: 'Спросить дважды хуже, чем не спросить' },
        d: { en: 'Frequency is capped per customer rather than per deal, and a refusal to answer is a state, not a pause.', ru: 'Частота ограничивается по клиенту, а не по сделке, а отказ отвечать это состояние, а не пауза.' },
      },
      {
        t: { en: 'Collected and ignored is worse', ru: 'Собранный и брошенный негатив хуже несобранного' },
        d: { en: 'A question left unanswered reads as being set aside, so the task has an owner, a deadline and an escalation.', ru: 'Вопрос без ответа читается как «услышали и отложили», поэтому у задачи есть владелец, срок и эскалация.' },
      },
    ],
    metrics: [
      { en: 'share of requests answered', ru: 'доля ответивших на запрос' },
      { en: 'time to react to a low score', ru: 'время реакции на низкую оценку' },
      { en: 'low scores closed by a solution', ru: 'низких оценок, закрытых решением' },
      { en: 'reviews posted publicly', ru: 'отзывов, опубликованных на площадках' },
    ],
    faq: [
      {
        q: { en: 'Can we keep the bad reviews out of sight?', ru: 'Можно ли не показывать плохие отзывы?' },
        a: { en: 'Inside your system you see all of them. On your own site you publish what you choose, provided a selection is not shown as everything. Filtering invites to outside platforms we will not build.', ru: 'Внутри системы вы видите все. На своём сайте публикуете то, что выбрали, пока выборка не выдаётся за все отзывы. Фильтра на приглашения для внешних площадок мы не сделаем.' },
      },
      {
        q: { en: 'Where should the ask go, email or a messenger?', ru: 'Где спрашивать, письмом или в мессенджере?' },
        a: { en: 'Wherever you already talk to the customer about the work itself: an unfamiliar sender gets few answers. Each channel is a separate connection and a separate line in the estimate.', ru: 'Там, где вы уже переписываетесь с клиентом по делу: незнакомому отправителю отвечают единицы. Каждый канал это отдельное подключение и отдельная строка в смете.' },
      },
      {
        q: { en: 'What does NPS mean when there are few deals?', ru: 'Что считать по NPS, если сделок немного?' },
        a: { en: 'On small numbers the index swings on one answer, and we say so rather than hide it in a chart. The comments and the share of problems solved carry more.', ru: 'На небольших числах индекс скачет от одного ответа, и мы скажем это прямо, а не спрячем в графике. Полезнее сами тексты и доля решённых вопросов.' },
      },
    ],
    stack: [
      { t: { en: 'Requests and their timing', ru: 'Запросы и расписание' }, items: ['Node.js', 'Temporal', 'n8n', 'Redis', 'Telegram Bot API'] },
      { t: { en: 'Data and analysis', ru: 'Данные и разбор' }, items: ['PostgreSQL', 'Prisma', 'ClickHouse', 'OpenAI', 'Anthropic'] },
      { t: { en: 'Screens and operations', ru: 'Экраны и эксплуатация' }, items: ['TypeScript', 'React', 'Next.js', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'email and SMS carrying the requests', ru: 'письма и SMS с запросами' },
      { en: 'AI calls that sort comments into themes', ru: 'обращения к AI-моделям для разбора тем' },
      { en: 'paid API access to review platforms', ru: 'платный доступ к API площадок отзывов' },
      { en: 'the domain the requests are sent from', ru: 'домен, с которого уходят запросы' },
    ],
  },
  {
    slug: 'bitrix24-and-1c-integration',
    kicker: 'Ledger sync',
    title: { en: 'Bitrix24 and 1C integration', ru: 'Интеграция Bitrix24 и 1С' },
    lead: { en: 'A deal in Bitrix24 becomes an order and an invoice in 1C, and the payment and the stock figure come back to the deal card. No amount is typed twice.', ru: 'Сделка в Bitrix24 становится заказом и счётом в 1С, а оплата и остаток возвращаются в карточку сделки. Ни одну сумму не вводят дважды.' },
    audience: { en: 'Companies where a manager runs the deal in Bitrix24, somebody enters the same order into 1C again, and the month closes with the two disagreeing.', ru: 'Компании, где менеджер ведёт сделку в Bitrix24, тот же заказ заводят в 1С заново, и к закрытию месяца суммы не сходятся.' },
    base: 'integr',
    composition: [
      { en: 'deals and orders', ru: 'сделки и заказы' },
      { en: 'nomenclature map', ru: 'карта номенклатуры' },
      { en: 'invoices and payments', ru: 'счета и оплаты' },
      { en: 'free stock', ru: 'свободные остатки' },
    ],
    flow: [
      {
        t: { en: 'The deal reaches the document stage', ru: 'Сделка доходит до стадии документа' },
        d: { en: 'You name that stage yourselves, and nothing is created in 1C before it: a lost deal leaves no order.', ru: 'Стадию вы называете сами, и до неё в 1С ничего не создаётся: сорвавшаяся сделка не оставляет заказа.' },
      },
      {
        t: { en: 'The invoice and payment come back', ru: 'Счёт и оплата идут обратно' },
        d: { en: 'Payments accumulate on the card, and paid is derived from the sum rather than from the first payment arriving.', ru: 'Оплата накапливается в карточке, а признак «оплачено» выводится из суммы, а не из первого платежа.' },
      },
      {
        t: { en: 'Stock goes out to the storefront', ru: 'Остаток уходит на витрину' },
        d: { en: 'Stock travels from 1C on a schedule, already reduced by what unshipped orders have reserved.', ru: 'Из 1С по расписанию едет остаток, уже уменьшенный на резерв по неотгруженным заказам.' },
      },
    ],
    watch: [
      {
        t: { en: 'Nomenclature matches on a code', ru: 'Номенклатура сходится по коду' },
        d: { en: 'Matching runs on the 1C code, with the unit and VAT in the same row, and unpaired items wait for a person.', ru: 'Сопоставление строится на коде 1С, единица и ставка НДС стоят в той же строке, а позиция без пары ждёт человека.' },
      },
      {
        t: { en: 'Payment is not yes or no', ru: 'Оплата это не «да» и «нет»' },
        d: { en: 'A deal with two states, paid and unpaid, breaks on the first deposit, so it carries an amount and computes the status.', ru: 'Система с двумя состояниями ломается на первом же авансе, поэтому в сделке живёт сумма, а статус считается из неё.' },
      },
      {
        t: { en: 'The exchange survives a configuration update', ru: 'Обновление конфигурации не должно сносить обмен' },
        d: { en: 'The exchange lives in an extension and talks through a published service, so a 1C update stays an ordinary update.', ru: 'Обмен живёт в расширении и общается через опубликованный сервис, поэтому обновление 1С остаётся обычным обновлением.' },
      },
    ],
    metrics: [
      { en: 'deals reaching an invoice with no manual entry', ru: 'сделок до счёта без ручного ввода' },
      { en: 'gaps between the deal and invoice amounts', ru: 'расхождений сумм сделки и счёта' },
      { en: 'time from a payment to the status', ru: 'время от оплаты до статуса в сделке' },
      { en: 'items with no pair in the nomenclature', ru: 'позиций без пары в номенклатуре' },
    ],
    faq: [
      {
        q: { en: 'Our configuration has been modified. Will the exchange survive a 1C update?', ru: 'У нас доработанная конфигурация. Обмен переживёт обновление 1С?' },
        a: { en: 'Yes, and that is why we do not edit the standard configuration. The exchange is an extension going through a published HTTP service, and we hand you the list of places to check after an update.', ru: 'Да, поэтому мы не правим типовую конфигурацию. Обмен ставится расширением и ходит через опубликованный HTTP-сервис, а список мест для проверки после обновления отдаём письменно.' },
      },
      {
        q: { en: 'Our Bitrix24 is in the cloud and 1C sits in the office. Will they connect?', ru: 'Bitrix24 у нас облачный, а 1С стоит в офисе. Соединится?' },
        a: { en: 'It will. The 1C side reaches out itself, so no port has to be opened, and if 1C is switched off for the night the tasks queue up until morning.', ru: 'Соединится. Наружу ходит сторона 1С, порт открывать не нужно, а если на ночь 1С выключают, задания копятся в очереди до утра.' },
      },
      {
        q: { en: 'Can we do one direction only to make it cheaper?', ru: 'Можно сделать только в одну сторону, чтобы вышло дешевле?' },
        a: { en: 'You can, and often that is the right start. The rule for whose record wins is only needed where both systems are edited, and we name the fields you lose before the estimate.', ru: 'Можно, и часто так и стоит начать. Правило, чья запись главная, нужно там, где правят обе системы, и какие поля вы теряете, мы называем до сметы.' },
      },
    ],
    stack: [
      { t: { en: 'Exchange and queues', ru: 'Обмен и очереди' }, items: ['Python', 'FastAPI', 'Node.js', 'Temporal', 'Redis', 'n8n'] },
      { t: { en: 'Storage and deployment', ru: 'Хранение и развёртывание' }, items: ['PostgreSQL', 'Docker', 'S3', 'Grafana'] },
      { t: { en: 'The matching screen', ru: 'Экран сопоставлений' }, items: ['TypeScript', 'React', 'Next.js'] },
    ],
    notIncluded: [
      { en: '1C licences and the Bitrix24 plan', ru: 'лицензии 1С и тариф Bitrix24' },
      { en: 'the ITS subscription and franchisee work', ru: 'подписка ИТС и работы франчайзи' },
      { en: 'the exchange server and 1C publication', ru: 'сервер обмена и публикация 1С' },
      { en: 'an EDI operator for closing documents', ru: 'оператор ЭДО для закрывающих документов' },
    ],
  },
  {
    slug: 'website-amocrm-integration',
    kicker: 'Lead capture',
    title: { en: 'Website and amoCRM integration', ru: 'Интеграция сайта с amoCRM' },
    lead: { en: 'A form on the site hands the enquiry to amoCRM with its source, and the deal stage comes back to a status page. No enquiry ends up living only in an email.', ru: 'Форма на сайте отдаёт заявку в amoCRM вместе с источником, а стадия сделки возвращается на страницу статуса. Ни одна заявка не остаётся жить только в письме.' },
    audience: { en: 'Sites where forms send mail to a shared inbox, a manager copies the contact across by hand, and some enquiries arrive with no source.', ru: 'Сайты, где формы шлют письмо на общий ящик, менеджер переносит контакт руками, а часть заявок приходит без источника.' },
    base: 'integr',
    composition: [
      { en: 'server-side validation', ru: 'серверная проверка форм' },
      { en: 'first-touch tags', ru: 'метки первого касания' },
      { en: 'contact matching', ru: 'сведение с контактом' },
      { en: 'a status page', ru: 'страница статуса' },
    ],
    flow: [
      {
        t: { en: 'The enquiry is yours on submission', ru: 'Форма отправлена, и заявка уже ваша' },
        d: { en: 'The enquiry lands in your database first and only then travels to amoCRM, so a CRM outage costs speed.', ru: 'Заявка сначала ложится в вашу базу и только потом уезжает в amoCRM, поэтому недоступность CRM стоит скорости.' },
      },
      {
        t: { en: 'It lands on the right contact', ru: 'Заявка ложится на нужный контакт' },
        d: { en: 'Phone and email are normalised, a familiar person gets a new deal, and the first touch is never overwritten.', ru: 'Телефон и почта приводятся к одному виду, знакомый человек получает новую сделку, а первое касание не затирается.' },
      },
      {
        t: { en: 'The stage comes back', ru: 'Стадия возвращается на сайт' },
        d: { en: 'The client opens their own enquiry by link and sees where it stands, in wording you choose.', ru: 'Клиент открывает страницу своей заявки по ссылке и видит, на чём всё стоит, вашими словами.' },
      },
    ],
    watch: [
      {
        t: { en: 'The enquiry never depends on amoCRM', ru: 'Заявка не зависит от доступности amoCRM' },
        d: { en: 'A form posting straight to the API loses enquiries and exposes the token, so intake and forwarding are split by a queue.', ru: 'Форма, которая шлёт данные прямо в API, теряет заявку и выносит токен в код страницы, поэтому приём и передача разделены очередью.' },
      },
      {
        t: { en: 'Source lost on the first click', ru: 'Источник теряется на первом же переходе' },
        d: { en: 'Tags read from the address bar at submission record a direct visit, so first-touch tags are stored on the device instead.', ru: 'Метки, прочитанные из адреса в момент отправки, дают прямой заход, поэтому метки первого касания хранятся на устройстве.' },
      },
      {
        t: { en: 'Internal stage names stay internal', ru: 'Внутренние стадии нельзя показывать клиенту' },
        d: { en: 'Every internal stage has a public wording in a map, and a stage without one is simply not shown.', ru: 'У каждой внутренней стадии есть публичная формулировка в карте, а стадия без неё просто не показывается.' },
      },
    ],
    metrics: [
      { en: 'enquiries reaching amoCRM with none dropped', ru: 'заявок, доехавших до amoCRM без потерь' },
      { en: 'share of enquiries with a source', ru: 'доля заявок с определённым источником' },
      { en: 'new duplicate contacts per week', ru: 'новых дублей контактов за неделю' },
      { en: 'time from submission to the first touch', ru: 'время от заявки до первого касания' },
    ],
    faq: [
      {
        q: { en: 'We already post enquiries straight into amoCRM. Why a layer in between?', ru: 'Мы уже шлём заявки прямо в amoCRM. Зачем прослойка?' },
        a: { en: 'For two things a direct post cannot do: the enquiry is saved on your side first, and the token is not in your page source. Send one with a wrong token and see.', ru: 'Ради двух вещей: заявка сохраняется у вас раньше, чем уходит в CRM, и токен не лежит в коде страницы. Подставьте в форму неверный токен и отправьте.' },
      },
      {
        q: { en: 'The site is on a builder. Does this fit?', ru: 'Сайт на конструкторе. Это подойдёт?' },
        a: { en: 'It fits if the builder can send a submission out as a webhook, and nearly all can. If there is no webhook, replacing that one form beats moving the site.', ru: 'Подойдёт, если конструктор отдаёт отправку формы вебхуком, а это умеют почти все. Если вебхука нет, честнее заменить одну форму, чем переносить сайт.' },
      },
      {
        q: { en: 'Will spam and bots create deals?', ru: 'Спам и боты будут заводить сделки?' },
        a: { en: 'The filter sits before the CRM: server-side validation, a rate limit per address and a honeypot field. Whatever gets past lands in a review list, not in the pipeline.', ru: 'Отсев стоит до CRM: проверка на сервере, ограничение частоты с одного адреса и приманочное поле. Что прошло, попадает в список на просмотр, а не в воронку.' },
      },
    ],
    stack: [
      { t: { en: 'Site and forms', ru: 'Сайт и формы' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Intake and queue', ru: 'Приём заявок и очередь' }, items: ['Node.js', 'PostgreSQL', 'Redis', 'n8n'] },
      { t: { en: 'Running it and alerts', ru: 'Эксплуатация и оповещения' }, items: ['Docker', 'Grafana', 'Telegram Bot API'] },
    ],
    notIncluded: [
      { en: 'the amoCRM plan and manager seats', ru: 'тариф amoCRM и места менеджеров' },
      { en: 'hosting for the intake service and status page', ru: 'хостинг приёмника заявок и страницы статуса' },
      { en: 'an anti-spam service beyond the free tier', ru: 'антиспам-сервис сверх бесплатного лимита' },
      { en: 'email and SMS confirming the enquiry', ru: 'письма и SMS клиенту о заявке' },
    ],
  },
  {
    slug: 'marketplace-stock-integration',
    kicker: 'Marketplace ops',
    title: { en: 'Marketplace and stock integration', ru: 'Интеграция маркетплейсов со складом' },
    lead: { en: 'Orders from every marketplace arrive in one system, stock is recalculated once and sent back out. The same unit does not get sold twice.', ru: 'Заказы со всех площадок приходят в одну систему, остаток пересчитывается один раз и расходится обратно. Один и тот же товар не продаётся дважды.' },
    audience: { en: 'Sellers on several marketplaces where stock is edited in each cabinet separately and a cancellation for lack of goods costs the rating.', ru: 'Продавцы на нескольких площадках, где остаток правят в каждом кабинете отдельно, а отмена по нехватке товара стоит рейтинга.' },
    base: 'integr',
    composition: [
      { en: 'one order list', ru: 'единый список заказов' },
      { en: 'a barcode matrix', ru: 'матрица штрихкодов' },
      { en: 'reserve on order', ru: 'резерв по заказу' },
      { en: 'priority stock push', ru: 'выгрузка по приоритету' },
    ],
    flow: [
      {
        t: { en: 'An order becomes a reserve', ru: 'Заказ сразу становится резервом' },
        d: { en: 'The order places a reserve in the same second it arrives, not on the next push.', ru: 'Заказ ставит резерв в ту же секунду, когда приходит, а не по факту следующей выгрузки.' },
      },
      {
        t: { en: 'The item matches on a barcode', ru: 'Позиция сходится по штрихкоду' },
        d: { en: 'The shared key is the barcode, and a bundle writes off the items it is made of.', ru: 'Общий ключ это штрихкод, а набор списывает те позиции, из которых собран, а не себя.' },
      },
      {
        t: { en: 'The new figure travels back out', ru: 'Новый остаток расходится обратно' },
        d: { en: 'The push queue runs by priority: first what is near zero and moving fast, then the long tail.', ru: 'Очередь выгрузки разбирается по приоритету: сначала то, что близко к нулю и быстро уходит, потом длинный хвост.' },
      },
    ],
    watch: [
      {
        t: { en: 'Overselling happens between the pushes', ru: 'Лишнее продаётся между выгрузками' },
        d: { en: 'The cure is not pushing more often but a buffer on fast movers: the last few units stay off the storefronts.', ru: 'Лечится это не более частой выгрузкой, а буфером на быстрых позициях: последние несколько штук не показываются на витринах.' },
      },
      {
        t: { en: 'Two warehouses are two different figures', ru: 'Два склада это два разных остатка' },
        d: { en: 'Goods in a marketplace warehouse are not yours to move, so the two schemes stay apart in the data, never summed.', ru: 'Товаром на складе площадки вы не распоряжаетесь, поэтому схемы разведены на уровне данных, а не сложены в одно число.' },
      },
      {
        t: { en: 'A cancellation returns goods later', ru: 'Отмена возвращает товар не сразу' },
        d: { en: 'The status arrives before the goods do, so a return enters stock on receipt rather than on the event.', ru: 'Статус приходит раньше товара, поэтому возврат попадает в остаток по приёмке, а не по событию отмены.' },
      },
    ],
    metrics: [
      { en: 'cancellations for lack of goods', ru: 'отмен по нехватке товара' },
      { en: 'time from an order to the reserve', ru: 'время от заказа до резерва' },
      { en: 'items disagreeing at a stocktake', ru: 'позиций с расхождением при инвентаризации' },
      { en: 'pushes the marketplace refused', ru: 'выгрузок, отклонённых площадкой' },
    ],
    faq: [
      {
        q: { en: 'We have no inventory system, stock lives in a spreadsheet. Does this fit?', ru: 'У нас нет учётной системы, остатки в таблице. Подойдёт?' },
        a: { en: 'It fits, and a spreadsheet is usually the first source: imported once, after which stock lives in the system. What a spreadsheet never holds is batches, expiry dates and bin locations.', ru: 'Подойдёт, и таблица чаще всего становится первым источником: её импортируют один раз, дальше остаток живёт в системе. Партий, сроков годности и адресов хранения в таблице нет.' },
      },
      {
        q: { en: 'How many marketplaces at once, and how expensive is adding another?', ru: 'Сколько площадок сразу и дорого ли добавить ещё одну?' },
        a: { en: 'As many as you run today, because the second marketplace is the whole point. Adding the next is a connector and new columns in the matrix, and we name its price before signing.', ru: 'Столько, сколько у вас есть сейчас: вторая площадка это и есть весь смысл. Следующая это новый коннектор и колонки в матрице, и цену называем до подписания.' },
      },
      {
        q: { en: 'How long before stock updates on the marketplace?', ru: 'Через сколько остаток обновляется на площадке?' },
        a: { en: 'The reserve inside the system is immediate; the storefront updates in whatever time the marketplace allows. We name that interval per marketplace before the build and measure it after launch.', ru: 'Резерв внутри системы встаёт сразу, а до витрины число доезжает за то время, которое разрешает площадка. Интервал по каждой площадке называем до сборки и меряем после запуска.' },
      },
    ],
    stack: [
      { t: { en: 'Talking to the marketplaces', ru: 'Обмен с площадками' }, items: ['Python', 'FastAPI', 'Go', 'Temporal', 'Redis'] },
      { t: { en: 'Stock and orders', ru: 'Остатки и заказы' }, items: ['PostgreSQL', 'Docker', 'S3', 'Grafana'] },
      { t: { en: 'The warehouse screen', ru: 'Экран склада' }, items: ['TypeScript', 'React', 'Next.js'] },
    ],
    notIncluded: [
      { en: 'hosting for the exchange and stock records', ru: 'хостинг обмена и складского учёта' },
      { en: 'paid seller cabinet plans', ru: 'платные тарифы кабинета продавца' },
      { en: 'a scanner, a thermal printer, labels', ru: 'сканер, термопринтер, этикетки' },
      { en: 'licences for your inventory system', ru: 'лицензии учётной системы' },
    ],
  },
  {
    slug: 'telephony-crm-integration',
    kicker: 'Call handling',
    title: { en: 'Telephony and CRM integration', ru: 'Интеграция телефонии с CRM' },
    lead: { en: 'On an incoming call the manager gets the caller\'s card, and afterwards the duration and the recording attach to the deal. A missed call becomes a task rather than a line in a log.', ru: 'На входящем у менеджера открывается карточка звонящего, а после разговора длительность и запись прикрепляются к сделке. Пропущенный становится задачей, а не строкой в журнале.' },
    audience: { en: 'Teams where the client is recognised by voice, a recording is hunted for in the operator\'s cabinet, and a missed call is seen only by whoever opens the log.', ru: 'Отделы, где клиента узнают по голосу, запись ищут в кабинете оператора, а пропущенные видит только тот, кто откроет журнал.' },
    base: 'integr',
    composition: [
      { en: 'the caller\'s card', ru: 'карточка звонящего' },
      { en: 'call recordings', ru: 'запись разговора' },
      { en: 'missed-call tasks', ru: 'пропущенные как задачи' },
      { en: 'routing by owner', ru: 'маршрутизация на менеджера' },
    ],
    flow: [
      {
        t: { en: 'The phone is still ringing', ru: 'Телефон ещё звонит' },
        d: { en: 'The card comes up on the ringing event rather than on the handset being picked up.', ru: 'Карточка поднимается по событию начала звонка, а не по факту снятой трубки.' },
      },
      {
        t: { en: 'The conversation ends', ru: 'Разговор закончился' },
        d: { en: 'Direction, duration and outcome land on the deal, and the recording attaches as a link rather than a file.', ru: 'Направление, длительность и исход ложатся в сделку, а запись прикрепляется ссылкой, а не файлом.' },
      },
      {
        t: { en: 'The missed call does not disappear', ru: 'Пропущенный не исчезает' },
        d: { en: 'Every unanswered call becomes a task with an owner, and it closes itself on an outgoing call back.', ru: 'Каждый неотвеченный звонок становится задачей с ответственным, и закрывается она сама, исходящим на тот же номер.' },
      },
    ],
    watch: [
      {
        t: { en: 'The card fails on number formats', ru: 'Карточка не поднимается из-за формата номера' },
        d: { en: 'Numbers are normalised to the international shape on the way in and inside the database, with a report on what fails.', ru: 'Номера приводятся к международному виду и на входе, и в самой базе, с отчётом о том, что привести не удалось.' },
      },
      {
        t: { en: 'Which deal the call belongs to', ru: 'К какой сделке крепить звонок' },
        d: { en: 'The rule is settled before the build, because quietly taking the first deal found hides the call where nobody looks.', ru: 'Правило задаётся до сборки: если молча взять первую попавшуюся сделку, звонок найдётся не там, где его ищут.' },
      },
      {
        t: { en: 'A recording is personal data', ru: 'Запись разговора это персональные данные' },
        d: { en: 'Before recording is switched on, three things are settled: the warning, the retention period and the roles a recording opens for.', ru: 'До включения записи решаются три вещи: предупреждение в начале разговора, срок хранения и список ролей, которым запись открывается.' },
      },
    ],
    metrics: [
      { en: 'incoming calls where the card opens', ru: 'доля входящих с поднятой карточкой' },
      { en: 'missed calls with no callback by day\'s end', ru: 'пропущенных без перезвона к концу дня' },
      { en: 'time from a missed call to the callback', ru: 'время от пропущенного до перезвона' },
      { en: 'calls attached to a deal', ru: 'звонков, привязанных к сделке' },
    ],
    faq: [
      {
        q: { en: 'Managers call from their personal mobiles. Will those calls be visible?', ru: 'Менеджеры звонят с личных мобильных. Эти звонки будут видны?' },
        a: { en: 'Only if the mobile is attached to your phone system as a separate service from the operator: without that the call never passes through the system. We say so before the estimate.', ru: 'Только если мобильный подключён к вашей АТС отдельной услугой оператора: без неё звонок физически не проходит через систему. Мы говорим это до сметы.' },
      },
      {
        q: { en: 'Where do the recordings live and how long are they kept?', ru: 'Где лежат записи и сколько они хранятся?' },
        a: { en: 'Wherever you decide: your own storage or the operator\'s, and the CRM holds a link either way. Retention is a number of days enforced by the system, and the archive leaves without us.', ru: 'Там, где вы решите: в своём хранилище или у оператора, а в CRM лежит ссылка. Срок хранения задаётся числом дней и исполняется системой, а архив забирается без нас.' },
      },
      {
        q: { en: 'We are going to change telephony operator. Does it all get rebuilt?', ru: 'Мы поменяем оператора телефонии. Всё переделывать?' },
        a: { en: 'No. Only the receiver for that operator\'s events changes: normalisation, the attachment rule, the missed-call tasks and the storage never lived inside the connector.', ru: 'Нет. Меняется приёмник событий конкретного оператора, а нормализация номеров, правило привязки, задачи по пропущенным и хранение записей внутри коннектора никогда не жили.' },
      },
    ],
    stack: [
      { t: { en: 'Event intake', ru: 'Приём событий' }, items: ['Python', 'FastAPI', 'Node.js', 'Redis', 'n8n'] },
      { t: { en: 'Recordings and storage', ru: 'Записи и хранение' }, items: ['PostgreSQL', 'S3', 'Docker', 'Grafana'] },
      { t: { en: 'The card on screen', ru: 'Карточка на экране' }, items: ['TypeScript', 'React', 'Next.js'] },
    ],
    notIncluded: [
      { en: 'minutes, numbers and the telephony service', ru: 'минуты, номера и услуга телефонии' },
      { en: 'attaching mobile numbers to the phone system', ru: 'подключение мобильных номеров к АТС' },
      { en: 'storage for recordings beyond the operator\'s allowance', ru: 'хранилище записей сверх лимита оператора' },
      { en: 'a CRM plan with telephony events', ru: 'тариф CRM с телефонными событиями' },
    ],
  },
  {
    slug: 'b2b-wholesale-portal',
    kicker: 'Wholesale orders',
    title: { en: 'B2B portal for wholesale clients', ru: 'B2B-портал для оптовых клиентов' },
    lead: { en: 'Every client sees their own contract price and the real stock figure, repeats a previous order in one action, and takes the shipping documents without asking.', ru: 'Каждый клиент видит свою договорную цену и реальный остаток, повторяет прошлый заказ одним действием и сам забирает отгрузочные документы.' },
    audience: { en: 'Wholesale where the price depends on the contract, orders arrive by mail and in messengers, and a manager checks stock by hand.', ru: 'Оптовые продажи, где цена зависит от договора, заказы приходят письмом и в мессенджер, а остаток менеджер сверяет руками.' },
    base: 'crm',
    composition: [
      { en: 'contract pricing', ru: 'прайс по договору' },
      { en: 'live stock', ru: 'актуальные остатки' },
      { en: 'repeat order', ru: 'повтор заказа' },
      { en: 'shipping documents', ru: 'отгрузочные документы' },
    ],
    flow: [
      {
        t: { en: 'A client sees their own price', ru: 'Клиент входит и видит свою цену' },
        d: { en: 'The price comes from this client\'s contract column rather than a general list, so the screen and the invoice agree.', ru: 'Цена берётся из договорной колонки этого клиента, а не из общего прайса, поэтому на экране и в счёте одно число.' },
      },
      {
        t: { en: 'The order is assembled from stock', ru: 'Заказ собирается из остатка' },
        d: { en: 'Available quantity and its timestamp stand next to each item, so a shortfall shows up in the cart.', ru: 'Доступное количество и время его актуальности стоят рядом с позицией, поэтому нехватка видна в корзине.' },
      },
      {
        t: { en: 'The documents sit with the order', ru: 'Документы лежат там же, где заказ' },
        d: { en: 'The invoice, the delivery note and the handover document sit on the order card from the moment accounting issues them.', ru: 'Счёт, накладная и УПД лежат на карточке заказа с того момента, как их выпускает учёт.' },
      },
    ],
    watch: [
      {
        t: { en: 'Stock that is already sold', ru: 'Остаток, который уже продан' },
        d: { en: 'The quantity is reserved at confirmation, because goods promised and not shipped cost more than an honest note that less remains.', ru: 'Количество резервируется в момент подтверждения: обещанный и не отгруженный товар стоит дороже, чем честное «осталось меньше».' },
      },
      {
        t: { en: 'One client sees another\'s price', ru: 'Клиент видит цену соседа' },
        d: { en: 'Price visibility is checked in the data layer on every request, never by hiding a column in the interface.', ru: 'Видимость прайса проверяется на уровне данных при каждом запросе, а не скрытием колонки в интерфейсе.' },
      },
      {
        t: { en: 'Case quantity and the minimum order', ru: 'Кратность упаковки и минимальная партия' },
        d: { en: 'The multiple rules live next to the item and are checked in the cart, before confirmation reaches the warehouse.', ru: 'Правила кратности и минимальной партии лежат рядом с позицией и проверяются в корзине, до подтверждения.' },
      },
    ],
    metrics: [
      { en: 'orders placed without a manager', ru: 'заказов без участия менеджера' },
      { en: 'repeat orders made from history', ru: 'повторных заказов из истории' },
      { en: 'documents downloaded without a request', ru: 'документов скачано без просьбы' },
      { en: 'gaps between portal and warehouse stock', ru: 'расхождений остатка кабинета и склада' },
    ],
    faq: [
      {
        q: { en: 'Where do the prices and the stock figures come from?', ru: 'Откуда кабинет берёт цены и остатки?' },
        a: { en: 'From your accounting system, and it stays the only source: the portal starts no second catalogue and no second price list. Where data arrives on a schedule, the screen says as of when.', ru: 'Из вашей учётной системы, и она остаётся единственным источником: второго прайса и второй номенклатуры кабинет не заводит. Если данные приходят по расписанию, на экране написано, на какой момент.' },
      },
      {
        q: { en: 'Does it handle deferred payment and a credit limit?', ru: 'Учитываются отсрочка и кредитный лимит?' },
        a: { en: 'Yes, where accounting keeps them: limit, debt and overdue sit next to the balance. An order above the limit either fails or goes to a manager, and you choose which before the build.', ru: 'Да, если их ведёт учёт: лимит, задолженность и просрочка видны рядом с балансом. Заказ сверх лимита либо не оформляется, либо уходит на подтверждение менеджеру, и выбираете вы до сборки.' },
      },
      {
        q: { en: 'Our buyers are used to sending orders by mail. Will they move?', ru: 'Закупщики привыкли присылать заявку письмом. Они перейдут?' },
        a: { en: 'Some will, because repeating a previous order beats typing it into a mail. Orders that still arrive by mail get entered in the same portal: two intake queues drift apart.', ru: 'Часть перейдёт, потому что повторить прошлый заказ быстрее, чем набрать его в письме. Заявки, пришедшие письмом, менеджер заводит в том же кабинете: две очереди приёма расходятся.' },
      },
    ],
    stack: [
      { t: { en: 'The portal', ru: 'Кабинет' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Exchange with accounting and notifications', ru: 'Обмен с учётом и уведомления' }, items: ['n8n', 'Temporal', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'licences and plans for the accounting system', ru: 'лицензии и тарифы учётной системы' },
      { en: 'the electronic document operator', ru: 'оператор электронного документооборота' },
      { en: 'storage and traffic for shipping documents', ru: 'хранилище и трафик отгрузочных документов' },
      { en: 'hosting and the servers for the portal', ru: 'хостинг и серверы кабинета' },
    ],
  },
  {
    slug: 'student-portal',
    kicker: 'Course access',
    title: { en: 'Student portal', ru: 'Личный кабинет ученика' },
    lead: { en: 'A student sees which lesson they are on, hands work in there and gets the next module without anybody opening access by hand.', ru: 'Ученик видит, на каком он уроке, сдаёт работу там же и получает следующий модуль без того, чтобы кто-то открывал доступ руками.' },
    audience: { en: 'Online schools where a curator sends out the lesson links, access is opened by hand after a payment, and progress lives in a chat.', ru: 'Онлайн-школы, где ссылки на уроки рассылает куратор, доступ после оплаты открывают руками, а прогресс лежит в переписке.' },
    base: 'crm',
    composition: [
      { en: 'lessons by module', ru: 'уроки по модулям' },
      { en: 'access from payment', ru: 'доступ по оплате' },
      { en: 'assignment review', ru: 'проверка заданий' },
      { en: 'student progress', ru: 'прогресс ученика' },
    ],
    flow: [
      {
        t: { en: 'The payment opens what was bought', ru: 'Оплата открывает то, что куплено' },
        d: { en: 'The plan, the cohort and the length of access come out of the payment, not a tick in a spreadsheet.', ru: 'Тариф, поток и срок доступа выводятся из платежа, а не из галочки в таблице.' },
      },
      {
        t: { en: 'Hand-in lives under the lesson', ru: 'Работа сдаётся под уроком' },
        d: { en: 'The assignment sits under the lesson and the answer uploads to the same place, so review knows which attempt.', ru: 'Задание лежит под уроком, ответ загружается туда же, и на проверке видно, какой это урок и какая попытка.' },
      },
      {
        t: { en: 'The next module opens by rule', ru: 'Следующий модуль открывается по правилу' },
        d: { en: 'By a date, by an accepted assignment or by both, and the rule is written into the course.', ru: 'По дате, по принятой работе или по обоим условиям, и правило записано в курс.' },
      },
    ],
    watch: [
      {
        t: { en: 'A cohort is not a course', ru: 'Поток это не курс' },
        d: { en: 'If the cohort is not in the data model from the start, the second run becomes a copy and edits diverge.', ru: 'Если поток не заложен в модель данных с самого начала, второй запуск делают копией курса, и правки расходятся.' },
      },
      {
        t: { en: 'Review is a queue, not mail', ru: 'Проверка это очередь, а не почта' },
        d: { en: 'Work arrives in a wave at the deadline, so the queue is ordered by waiting time from the first version.', ru: 'Работы приходят волной к дедлайну, поэтому очередь с приоритетом по времени ожидания есть в первой версии.' },
      },
      {
        t: { en: 'Refunds, transfers and freezes', ru: 'Возврат, перенос и заморозка' },
        d: { en: 'What happens to access on a refund, a transfer and a pause is written into the rules before launch.', ru: 'Что происходит с доступом при возврате, переносе и заморозке, записывается в правила до запуска, а не в переписке.' },
      },
    ],
    metrics: [
      { en: 'students reaching the last module', ru: 'дошли до последнего модуля' },
      { en: 'time from hand-in to review', ru: 'время от сдачи до проверки' },
      { en: 'accesses granted by hand', ru: 'доступов выдано руками' },
      { en: 'support questions about access', ru: 'вопросов про доступ' },
    ],
    faq: [
      {
        q: { en: 'Why not a ready-made course platform?', ru: 'Почему не готовая платформа для курсов?' },
        a: { en: 'If your course fits one, take it, and we will say so. Your own portal earns its place where the platform blocks your rules for opening modules, your review process and your payments.', ru: 'Если курс в неё ложится, берите, и мы прямо это скажем. Своё оправдано там, где платформа мешает: свои правила открытия модулей, свой процесс проверки, свои оплаты.' },
      },
      {
        q: { en: 'Where does the video live and can it be protected?', ru: 'Где лежит видео и можно ли его защитить?' },
        a: { en: 'In your storage or with a video service, given out by a temporary link issued to one student, optionally watermarked with their name. Screen recording we do not promise to stop.', ru: 'В вашем хранилище или у видеосервиса, отдаётся по временной ссылке на конкретного ученика, при желании с меткой с его именем. Запретить запись экрана мы не обещаем.' },
      },
      {
        q: { en: 'Can we change the programme ourselves?', ru: 'Сможем менять программу сами?' },
        a: { en: 'Lessons, materials, module order, assignments and the date rules are edited from the admin panel without us. A new mechanic like points or an auto-marked exam is code and goes through us.', ru: 'Уроки, материалы, порядок модулей, задания и правила открытия по дате правятся из админки без нас. Новая механика, например баллы или автопроверка экзамена, это код и идёт через нас.' },
      },
    ],
    stack: [
      { t: { en: 'Portal and admin panel', ru: 'Кабинет и админка' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Payments and notifications', ru: 'Оплаты и уведомления' }, items: ['Stripe', 'Paddle', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'video storage and delivery', ru: 'хранение и раздача видео' },
      { en: 'payment provider fees on tuition', ru: 'комиссии платёжных систем с оплат' },
      { en: 'mail and SMS to students', ru: 'письма и SMS ученикам' },
      { en: 'hosting and servers', ru: 'хостинг и серверы' },
    ],
  },
  {
    slug: 'patient-portal',
    kicker: 'Patient records',
    title: { en: 'Patient portal', ru: 'Личный кабинет пациента' },
    lead: { en: 'Appointments, results and documents sit in one place, and a follow-up is booked from the appointment card without a call to reception.', ru: 'Приёмы, результаты и документы лежат в одном месте, а повторная запись делается из карточки приёма, без звонка в регистратуру.' },
    audience: { en: 'Clinics where results are handed over on paper or in a messenger, and reception spends the line on whether a test is ready.', ru: 'Клиники, где результаты выдают на бумаге или в мессенджере, а телефон регистратуры занят вопросами о готовности анализа.' },
    base: 'crm',
    composition: [
      { en: 'sign-in by code', ru: 'вход по коду' },
      { en: 'appointments and results', ru: 'приёмы и результаты' },
      { en: 'notes and certificates', ru: 'выписки и справки' },
      { en: 'rebooking', ru: 'повторная запись' },
    ],
    flow: [
      {
        t: { en: 'Signing in proves the patient', ru: 'Вход подтверждает, что это пациент' },
        d: { en: 'Sign-in goes by phone with a code matched against the record in your medical system, never by a mailed link.', ru: 'Вход идёт по номеру телефона с кодом и сверкой с картой в МИС, а не по ссылке из письма.' },
      },
      {
        t: { en: 'A result appears once confirmed', ru: 'Результат появляется после подтверждения' },
        d: { en: 'Not when the laboratory uploads a file: a doctor\'s check stands between the upload and the patient seeing it.', ru: 'Не в момент выгрузки файла лабораторией: между выгрузкой и пациентом стоит проверка врача.' },
      },
      {
        t: { en: 'The follow-up sits beside the appointment', ru: 'Повторная запись стоит рядом с приёмом' },
        d: { en: 'The doctor sets a check-up, and the booking button leads to that doctor with the service already chosen.', ru: 'Врач назначает контроль, и кнопка записи ведёт к тому же врачу с уже выбранной услугой.' },
      },
    ],
    watch: [
      {
        t: { en: 'A bare result reads as diagnosis', ru: 'Результат без пояснения читается как диагноз' },
        d: { en: 'Next to every result stands who will comment on it and when, or a value out of range loads reception.', ru: 'Рядом с результатом стоит, кто и когда его прокомментирует, иначе пометка «вне референсных значений» нагружает регистратуру.' },
      },
      {
        t: { en: 'What the locked screen shows', ru: 'Что видно на заблокированном экране' },
        d: { en: 'A notification carries the fact that something is ready and never the name of the test, and the same rule governs SMS.', ru: 'В уведомление уходит только факт готовности, а не название анализа, и то же правило решает, что можно писать в SMS.' },
      },
      {
        t: { en: 'One number for the whole family', ru: 'Один телефон на всю семью' },
        d: { en: 'A parent, a child and a relative share one number, so the link between representative and patient is in the first version.', ru: 'Родитель, ребёнок и родственник записаны на один номер, поэтому связь «представитель и пациент» заводится в первой версии.' },
      },
    ],
    metrics: [
      { en: 'results collected without reception', ru: 'результатов забрано без регистратуры' },
      { en: 'calls about a ready result', ru: 'звонков о готовности результата' },
      { en: 'follow-ups booked in the portal', ru: 'повторных записей из кабинета' },
      { en: 'no-shows after a reminder', ru: 'неявок после напоминания' },
    ],
    faq: [
      {
        q: { en: 'Does this replace our medical system?', ru: 'Кабинет заменит нашу МИС?' },
        a: { en: 'No. The medical system stays the truth for the schedule, appointments and results, and the portal is its face for the patient; where it has an API we read through it, otherwise through a folder.', ru: 'Нет. МИС остаётся истиной по расписанию, приёмам и результатам, а кабинет это её лицо для пациента; где есть API, читаем через него, где нет, через папку.' },
      },
      {
        q: { en: 'Where is the medical data kept?', ru: 'Где лежат медицинские данные?' },
        a: { en: 'In your own infrastructure and in the jurisdiction you name. We keep no copy, developer access to live data is closed, and every opening of a patient record is logged.', ru: 'В вашей инфраструктуре и в юрисдикции, которую вы назовёте. Копий у себя не держим, доступ разработчика к боевым данным закрыт, а каждое открытие карты пишется в журнал.' },
      },
      {
        q: { en: 'Who answers a patient who asks a question?', ru: 'Кто отвечает пациенту на вопрос в кабинете?' },
        a: { en: 'Your own member of staff, and it is not an open chat: the question is attached to an appointment, with an addressee and a time to answer by. No automatic answering about health.', ru: 'Ваш сотрудник, и это не свободная переписка: вопрос привязан к приёму, у него есть адресат и срок ответа. Автоматических ответов о здоровье нет.' },
      },
    ],
    stack: [
      { t: { en: 'The portal', ru: 'Кабинет' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Exchange with the clinic system and notifications', ru: 'Обмен с МИС и уведомления' }, items: ['Python', 'FastAPI', 'n8n', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'SMS with codes and reminders', ru: 'SMS с кодом и напоминаниями' },
      { en: 'licences for the medical and lab systems', ru: 'лицензии МИС и лабораторной системы' },
      { en: 'hosting and storage for scans', ru: 'хостинг и хранилище для снимков' },
      { en: 'the doctor\'s electronic signature and its authority', ru: 'электронная подпись врача и удостоверяющий центр' },
    ],
  },
  {
    slug: 'warehouse-management-system',
    kicker: 'Stock control',
    title: { en: 'Warehouse management system', ru: 'Система складского учёта' },
    lead: { en: 'Goods in, goods out and stocktakes are entered where they happen, from a scanner, and the figure moves at the moment of the operation.', ru: 'Приход, отгрузка и инвентаризация вводятся со сканера там, где происходят, и остаток меняется в момент операции.' },
    audience: { en: 'Warehouses where the stock figure lives in a spreadsheet updated in the evening, orders are picked from a printout, and a shortfall surfaces once a quarter.', ru: 'Склады, где остаток живёт в таблице и обновляется вечером, отгрузку собирают по распечатке, а недостачу находят раз в квартал.' },
    base: 'crm',
    composition: [
      { en: 'receiving by document', ru: 'приёмка по документу' },
      { en: 'barcodes and handhelds', ru: 'штрихкоды и терминалы' },
      { en: 'picking and shipping', ru: 'сборка и отгрузка' },
      { en: 'rolling stocktakes', ru: 'выборочная инвентаризация' },
    ],
    flow: [
      {
        t: { en: 'Goods become stock at the gate', ru: 'Приход становится остатком на приёмке' },
        d: { en: 'The storeman scans at the gate and checks against the supplier\'s document while the lorry is still standing.', ru: 'Кладовщик сканирует у ворот и сверяет с документом поставщика, пока машина ещё не уехала.' },
      },
      {
        t: { en: 'Picking follows a task', ru: 'Сборка идёт по заданию' },
        d: { en: 'The picker follows a route through the bins and confirms every line with a scan, catching a wrong item.', ru: 'Сборщик идёт по маршруту между ячейками и подтверждает каждую строку сканом, поэтому пересорт ловится сразу.' },
      },
      {
        t: { en: 'A reservation takes stock before shipment', ru: 'Резерв снимает остаток раньше отгрузки' },
        d: { en: 'A confirmed order stops the quantity being available, and the same figure goes outward to a portal or a storefront.', ru: 'Подтверждённый заказ снимает количество из доступного, и то же число уходит наружу, в кабинет клиента и на витрину.' },
      },
    ],
    watch: [
      {
        t: { en: 'The network drops in the aisles', ru: 'Связь пропадает между стеллажами' },
        d: { en: 'The handheld works offline, holds operations and sends them later, and a conflict on that send is resolved by a stated rule.', ru: 'Терминал работает офлайн, копит операции и досылает их, а конфликт при досылке разбирается по записанному правилу.' },
      },
      {
        t: { en: 'A stocktake that stops the work', ru: 'Инвентаризация, которая останавливает работу' },
        d: { en: 'A rolling count by zone freezes only the zone being counted, and a discrepancy closes with a document and an author.', ru: 'Выборочный пересчёт по зонам замораживает только считаемую зону, а расхождение закрывается документом с автором, а не правкой руками.' },
      },
      {
        t: { en: 'A negative figure is a symptom', ru: 'Минус в остатке это симптом' },
        d: { en: 'Forbidding it pushes a storeman to enter a receipt that never happened, so the operation goes through, gets flagged and queued.', ru: 'Запрет толкает кладовщика оформить приход, которого не было, поэтому операция проходит, помечается и встаёт в очередь разбора.' },
      },
    ],
    metrics: [
      { en: 'gap between system and shelf', ru: 'расхождение системы и полки' },
      { en: 'time from receiving to the figure', ru: 'время от приёмки до остатка' },
      { en: 'lines picked without a wrong item', ru: 'строк собрано без пересорта' },
      { en: 'operations entered after the fact', ru: 'операций задним числом' },
    ],
    faq: [
      {
        q: { en: 'Why not 1C or a ready-made WMS?', ru: 'Почему не 1С или готовая WMS?' },
        a: { en: 'If a ready-made one fits your warehouse, take it. Your own earns its place on a non-standard process, and often the right answer is a warehouse alongside the accounting system rather than instead of it.', ru: 'Если готовая ложится на ваш склад, берите. Своя оправдана там, где процесс не типовой, и часто правильный ответ это склад рядом с учётной системой, а не вместо неё.' },
      },
      {
        q: { en: 'What about several warehouses and moves between them?', ru: 'Что с несколькими складами и перемещениями?' },
        a: { en: 'The ordinary case, and goods in transit are counted separately: written off one warehouse and not yet received at the other, otherwise they double or vanish for the journey.', ru: 'Обычный случай, и товар в пути учитывается отдельно: списан с одного склада и ещё не принят на другом, иначе он задваивается или исчезает на время перевозки.' },
      },
      {
        q: { en: 'Will the warehouse staff actually use it?', ru: 'Кладовщики правда будут этим пользоваться?' },
        a: { en: 'They use it when the scanner beats paper: one task per screen, large targets, one-handed work in a glove. We check that in your warehouse before launch, not on a big monitor.', ru: 'Пользуются, когда сканер быстрее бумаги: одна задача на экран, крупные цели, работа одной рукой в перчатке. Проверяем это на вашем складе до запуска, а не на большом мониторе.' },
      },
    ],
    stack: [
      { t: { en: 'Warehouse screens and the handheld', ru: 'Экраны склада и терминал' }, items: ['TypeScript', 'React', 'Next.js', 'Kotlin'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'] },
      { t: { en: 'Exchange and watching', ru: 'Обмен и присмотр' }, items: ['n8n', 'Temporal', 'Telegram Bot API', 'S3', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'handhelds, scanners and label printers', ru: 'терминалы, сканеры и принтеры этикеток' },
      { en: 'access points and their installation', ru: 'точки доступа и их установка' },
      { en: 'labels, ribbons and printing consumables', ru: 'этикетки, риббоны и расходники печати' },
      { en: 'hosting and an on-site server', ru: 'хостинг и сервер на площадке' },
    ],
  },
  {
    slug: 'document-approval-system',
    kicker: 'Document routing',
    title: { en: 'Document approval system', ru: 'Система согласования документов' },
    lead: { en: 'A document moves along a route set in advance: who approves it, in what order and by when. Every edit stays as a version with its author.', ru: 'Документ идёт по заранее заданному маршруту: кто согласует, в каком порядке и до какого срока. Каждая правка остаётся версией с автором.' },
    audience: { en: 'Companies where a document is approved by mail and in a chat, the current version sits in somebody\'s downloads, and who approved it is answered from memory.', ru: 'Компании, где документ согласуют почтой и в чате, свежая версия лежит у кого-то в загрузках, а кто утвердил, отвечает чья-то память.' },
    base: 'crm',
    composition: [
      { en: 'routes per type', ru: 'маршруты по типам' },
      { en: 'deadlines per step', ru: 'сроки на шагах' },
      { en: 'version history', ru: 'история версий' },
      { en: 'approval log', ru: 'журнал согласований' },
    ],
    flow: [
      {
        t: { en: 'The document enters a route', ru: 'Документ входит в маршрут' },
        d: { en: 'The type decides who approves and in what order, in sequence or branching by amount, and the system picks it.', ru: 'Тип документа решает, кто согласует и в каком порядке, последовательно или ветками по сумме, и маршрут выбирает система.' },
      },
      {
        t: { en: 'Every step carries its own deadline', ru: 'У каждого шага свой срок' },
        d: { en: 'A reminder arrives while the window is open; when it runs out, the step goes to a manager or stand-in.', ru: 'Напоминание приходит, пока срок не вышел, а когда он выходит, шаг уходит руководителю или заместителю.' },
      },
      {
        t: { en: 'A remark produces a version', ru: 'Замечание рождает версию' },
        d: { en: 'The author uploads the next version, earlier ones stay, and only the steps the edit touches are approved again.', ru: 'Автор загружает следующую версию, прежние остаются, и заново проходят только те шаги, которых правка касается.' },
      },
    ],
    watch: [
      {
        t: { en: 'A late edit restarts the route', ru: 'Поздняя правка отправляет маршрут по кругу' },
        d: { en: 'The re-approval rule is set per section and by how material the edit is, before launch rather than on the first argument.', ru: 'Правило повторного согласования задаётся по разделам и по существенности правки, до запуска, а не в первый спорный день.' },
      },
      {
        t: { en: 'One approver on holiday stops everything', ru: 'Отпуск одного согласующего останавливает всё' },
        d: { en: 'A route built from names lasts until the first sick day, so steps go to a role with a stand-in.', ru: 'Маршрут из фамилий живёт до первого больничного, поэтому шаги назначаются на роль, у которой есть заместитель.' },
      },
      {
        t: { en: 'The wrong version gets approved', ru: 'Согласуют не ту версию' },
        d: { en: 'Only the version held in the system is approved, and a downloaded file carries a mark of its version and status.', ru: 'Согласуется только та версия, что лежит в системе, а скачанный файл несёт отметку версии и статуса.' },
      },
    ],
    metrics: [
      { en: 'time a document spends in a route', ru: 'время документа в маршруте' },
      { en: 'steps past their deadline', ru: 'шагов просрочено' },
      { en: 'approval rounds per document', ru: 'кругов согласования на документ' },
      { en: 'documents approved outside the system', ru: 'документов согласовано мимо системы' },
    ],
    faq: [
      {
        q: { en: 'Does an approval like this hold up legally?', ru: 'Имеет ли такое согласование юридическую силу?' },
        a: { en: 'An internal approval is a company decision, and the log with its versions shows who takes it and when. A qualified electronic signature is separate: we connect your provider, and it signs a specific version.', ru: 'Внутреннее согласование это решение компании, и журнал с версиями показывает, кто и когда его принимает. Квалифицированная подпись отдельно: подключаем вашего провайдера, и подпись ставится на конкретную версию.' },
      },
      {
        q: { en: 'Can we change the routes ourselves?', ru: 'Сможем менять маршруты сами?' },
        a: { en: 'Steps, roles, deadlines and branching conditions are edited from a settings screen without us. A new document type with its own fields and checks is code and goes through us, priced before the work.', ru: 'Шаги, роли, сроки и условия ветвления правятся из настроек, без нас. Новый тип документа со своими полями и проверками это код: идёт через нас, с ценой до начала работ.' },
      },
      {
        q: { en: 'What if an approver is not our employee?', ru: 'А если согласующий не наш сотрудник?' },
        a: { en: 'An outside participant gets a link to one document and one step, with no account and no access to anything else. Their answer lands in the same log, against a version.', ru: 'Внешний участник получает ссылку на один документ и один шаг, без аккаунта и без доступа к остальному. Его ответ ложится в тот же журнал, к конкретной версии.' },
      },
    ],
    stack: [
      { t: { en: 'Interface', ru: 'Интерфейс' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Documents, routes and server', ru: 'Документы, маршруты и сервер' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Temporal', 'S3'] },
      { t: { en: 'Notifications and operations', ru: 'Уведомления и эксплуатация' }, items: ['Telegram Bot API', 'n8n', 'Redis', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'the qualified electronic signature and its provider', ru: 'квалифицированная подпись и её провайдер' },
      { en: 'storage for files and all versions', ru: 'хранилище файлов и всех версий' },
      { en: 'mail delivery for notifications', ru: 'почтовая рассылка уведомлений' },
      { en: 'scan recognition and AI model calls', ru: 'распознавание сканов и вызовы AI-моделей' },
    ],
  },
  {
    slug: 'loyalty-program',
    kicker: 'Repeat purchase',
    title: { en: 'Loyalty program', ru: 'Программа лояльности' },
    lead: { en: 'The card lives on a phone, points are earned and spent by your rules, and every operation stays in the customer’s history.', ru: 'Карта живёт в телефоне, баллы начисляются и списываются по вашим правилам, а каждая операция остаётся в истории клиента.' },
    audience: { en: 'Repeat business resting on what the person at the counter remembers and a spreadsheet of discounts, where nobody knows how much has been promised in total.', ru: 'Повторные продажи, которые держатся на памяти кассира и таблице со скидками, где размер скидки обсуждают, а общий объём обещанного не знает никто.' },
    base: 'crm',
    composition: [
      { en: 'digital card', ru: 'карта в телефоне' },
      { en: 'earning and expiry', ru: 'начисление и сгорание' },
      { en: 'spending at purchase', ru: 'списание при покупке' },
      { en: 'operations ledger', ru: 'журнал операций' },
    ],
    flow: [
      {
        t: { en: 'The customer is identified before payment', ru: 'Клиента опознают до оплаты' },
        d: { en: 'One method is chosen and used by everybody, because a second method means a second balance.', ru: 'Способ выбирается один и работает у всех, потому что второй способ это второй баланс.' },
      },
      {
        t: { en: 'Points land on a final purchase', ru: 'Начисление идёт по окончательной покупке' },
        d: { en: 'Not at checkout but once the order can no longer be undone, or a refund leaves points nobody paid for.', ru: 'Не при оформлении, а когда заказ уже нельзя отменить, иначе возврат оставляет баллы, за которые никто не платил.' },
      },
      {
        t: { en: 'Spending is visible to both sides', ru: 'Списание видно обеим сторонам' },
        d: { en: 'The customer and the counter see the same number, and the operation lands in the history with its author.', ru: 'Клиент и кассир видят одно число до подтверждения, а операция сразу попадает в историю вместе с её автором.' },
      },
    ],
    watch: [
      {
        t: { en: 'Points are a liability', ru: 'Баллы это обязательство, а не подарок' },
        d: { en: 'Every point issued is a discount already promised, so the rate, the cap and the expiry are settled before launch.', ru: 'Каждый начисленный балл это уже обещанная скидка, поэтому ставка, потолок, срок жизни и объём непогашенного решаются до запуска.' },
      },
      {
        t: { en: 'A balance is computed, not stored', ru: 'Баланс это сумма операций' },
        d: { en: 'A hand-edited number disagrees with the history, so the balance comes from the ledger and a refund reverses its own accrual.', ru: 'Число, которое правят руками, расходится с историей, поэтому баланс считается из журнала, а возврат отменяет собственное начисление отдельной записью.' },
      },
      {
        t: { en: 'One person, two balances', ru: 'Один человек, два баланса' },
        d: { en: 'The rule for one customer is chosen before launch, and merging two cards with their history is in the first version.', ru: 'Правило, что считать одним клиентом, выбирается до запуска, а объединение двух карт вместе с историей есть в первой версии.' },
      },
    ],
    metrics: [
      { en: 'purchases attached to a card', ru: 'доля покупок с картой' },
      { en: 'issued points that get spent', ru: 'доля списанных баллов' },
      { en: 'repeat purchases among members', ru: 'повторные покупки участников' },
      { en: 'the outstanding points balance', ru: 'объём непогашенных баллов' },
    ],
    faq: [
      {
        q: { en: 'Do points expire?', ru: 'Сгорают ли баллы?' },
        a: { en: 'However you decide before launch: how long a point lives is a setting. The rule is shown to the customer as they earn it, and the warning arrives before the expiry, not after.', ru: 'Так, как вы решите до запуска: срок жизни балла это настройка. Но правило показывается клиенту при начислении, а предупреждение приходит до сгорания, а не после.' },
      },
      {
        q: { en: 'Will it connect to our till?', ru: 'Свяжется ли это с нашей кассой?' },
        a: { en: 'If the till has an API, earning and spending happen inside the receipt. If not, the counter works from a separate screen, which costs seconds on every purchase and we say so before the estimate.', ru: 'Если у кассы есть API, начисление и списание идут внутри чека. Если нет, кассир работает на отдельном экране, и мы говорим это до сметы: экран сбоку это лишние секунды на каждой покупке.' },
      },
      {
        q: { en: 'What stops staff from awarding points to themselves?', ru: 'Что мешает сотруднику начислять баллы себе?' },
        a: { en: 'Nothing but visibility: every operation records who ran it, and the report on accruals by staff member is there from the first version. An odd concentration on one card is obvious at once.', ru: 'Ничего, кроме видимости: у каждой операции записан тот, кто её провёл, а отчёт по начислениям в разрезе сотрудников есть с первой версии. Странная концентрация баллов на одной карте видна сразу.' },
      },
    ],
    stack: [
      { t: { en: 'The card and the screens', ru: 'Карта и экраны' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Ledger and data', ru: 'Журнал и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'] },
      { t: { en: 'Channels and operations', ru: 'Каналы и эксплуатация' }, items: ['Telegram Bot API', 'n8n', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'SMS codes for confirmation and spending', ru: 'SMS с кодом подтверждения и списания' },
      { en: 'hosting or a VPS for the ledger', ru: 'хостинг или VPS для журнала операций' },
      { en: 'printing plastic cards', ru: 'печать пластиковых карт' },
      { en: 'the till system’s plan with receipt access', ru: 'тариф кассовой системы с доступом к чекам' },
    ],
  },
  {
    slug: 'subscription-billing',
    kicker: 'Renewals',
    title: { en: 'Subscription billing', ru: 'Биллинг подписок' },
    lead: { en: 'Plans, the trial and the renewal come out of one subscription state, the charge goes out by itself, and a failed payment is worked through on a schedule.', ru: 'Тарифы, пробный период и продление выводятся из одного состояния подписки, списание уходит само, а неудачная оплата отрабатывается по расписанию.' },
    audience: { en: 'Services selling access by the month where a person still watches the payments: a spreadsheet of who is paid up and access switched off by hand.', ru: 'Сервисы, где доступ продаётся помесячно, а за платежами следит человек: таблица оплативших и доступ, который выключают руками.' },
    base: 'billing',
    composition: [
      { en: 'plans', ru: 'тарифы' },
      { en: 'automatic renewal', ru: 'автопродление' },
      { en: 'grace period', ru: 'льготный период' },
      { en: 'cancellation and receipts', ru: 'отмена и чеки' },
    ],
    flow: [
      {
        t: { en: 'The period starts, its end visible', ru: 'Период начинается, конец уже виден' },
        d: { en: 'The customer sees the date and the amount of the first charge before entering a card, trial or no trial.', ru: 'Клиент видит дату и сумму первого списания до ввода карты, с пробным периодом или без.' },
      },
      {
        t: { en: 'Renewal runs itself, and is announced', ru: 'Продление идёт само, о нём предупреждают' },
        d: { en: 'The charge goes out on its date against the provider\'s token, and the message goes out before it, not after.', ru: 'Списание уходит в свою дату по токену провайдера, а сообщение уходит до него, а не после.' },
      },
      {
        t: { en: 'A decline starts a schedule', ru: 'Отказ запускает расписание' },
        d: { en: 'Retries spread across days, the customer can change the card, and access ends on a date named in advance.', ru: 'Повторы разносятся по дням, клиент может поменять карту, а доступ заканчивается в дату, названную заранее.' },
      },
    ],
    watch: [
      {
        t: { en: 'A decline is not one thing', ru: 'Отказ отказу рознь' },
        d: { en: 'The reason code decides the behaviour: wait and retry, or stop and ask for another card, because retries cost attempts and fees.', ru: 'Поведение выбирается по коду отказа: подождать и повторить или сразу просить другую карту, потому что повторы жгут попытки и деньги.' },
      },
      {
        t: { en: 'The provider and your database disagree', ru: 'Провайдер знает одно, ваша база другое' },
        d: { en: 'The subscription state is reconciled with the provider on a schedule, and a row where the two disagree is shown, not overwritten.', ru: 'Состояние подписки сверяется с провайдером по расписанию, а строка, где стороны расходятся, показывается как расхождение, а не затирается.' },
      },
      {
        t: { en: 'What happens to the data', ru: 'Что происходит с данными' },
        d: { en: 'How long data is kept after access ends is chosen before launch and named in the same message as the end date.', ru: 'Срок хранения данных после окончания доступа выбирается до запуска и называется в том же сообщении, что и дата окончания.' },
      },
    ],
    metrics: [
      { en: 'trials reaching the first charge', ru: 'пробных дошло до первого списания' },
      { en: 'declines recovered by retries', ru: 'отказов восстановлено повторами' },
      { en: 'cancellations done without support', ru: 'отмен без поддержки' },
      { en: 'disputes and chargebacks', ru: 'споров и чарджбэков' },
    ],
    faq: [
      {
        q: { en: 'Should the trial ask for a card?', ru: 'Брать ли карту на пробном периоде?' },
        a: { en: 'Both are a setting, and we build either. A card at the start brings more trials to a first charge and fewer sign-ups; we will not ship a trial that becomes a silent charge.', ru: 'И то, и другое настройка, соберём любой вариант. Карта на старте даёт больше доведённых до первого списания и меньше регистраций; пробного периода, который тихо превращается в списание, мы не выпустим.' },
      },
      {
        q: { en: 'We sell in two currencies. What renews at what price?', ru: 'Мы продаём в двух валютах. По какой цене продлевать?' },
        a: { en: 'The price is fixed in the currency of the subscription and renews in it, and an edit to the price list does not reach people already paying until you decide. Conversion is the provider\'s work.', ru: 'Цена фиксируется в валюте подписки и продлевается в ней же, а правка прайса не доезжает до тех, кто уже платит, пока вы этого не решите. Конвертация это работа провайдера.' },
      },
      {
        q: { en: 'What if money goes out twice?', ru: 'А если деньги спишутся дважды?' },
        a: { en: 'It should not: every webhook and every charge carries a key, so a repeated delivery updates the same payment. If it happens, your operator refunds one charge without touching the subscription.', ru: 'Не должно: у каждого вебхука и списания есть ключ, поэтому повторная доставка обновляет тот же платёж. Если случится, ваш оператор возвращает одно списание, не трогая подписку.' },
      },
    ],
    stack: [
      { t: { en: 'Subscription state', ru: 'Состояние подписки' }, items: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'] },
      { t: { en: 'Charges, retries and schedules', ru: 'Списания, повторы и расписания' }, items: ['Stripe', 'Paddle', 'Temporal', 'Redis'] },
      { t: { en: 'Account and operations', ru: 'Кабинет и эксплуатация' }, items: ['Next.js', 'React', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'provider fees on charges and refunds', ru: 'комиссии провайдера за списания и возвраты' },
      { en: 'the fee per dispute', ru: 'плата за каждый чарджбэк' },
      { en: 'mail for notices and receipts', ru: 'рассылка предупреждений и чеков' },
      { en: 'digital sales tax and its service', ru: 'налог с цифровых продаж и его расчёт' },
    ],
  },
  {
    slug: 'instalments-and-part-payment',
    kicker: 'Payment plans',
    title: { en: 'Instalments and part payment', ru: 'Оплата частями и рассрочка' },
    lead: { en: 'The amount is split into a schedule, every part is charged on its own date, and access follows the parts already paid.', ru: 'Сумма делится на график, каждая часть уходит в свою дату, а доступ следует за уже внесёнными частями.' },
    audience: { en: 'Purchases too large to pay at once and too small for a bank, where the schedule lives in a spreadsheet and access is switched off from memory.', ru: 'Покупки, которые не платят одной суммой и ради которых не идут в банк: график лежит в таблице, а доступ выключают по памяти.' },
    base: 'billing',
    composition: [
      { en: 'payment schedule', ru: 'график платежей' },
      { en: 'automatic charging', ru: 'автосписание' },
      { en: 'reminders', ru: 'напоминания' },
      { en: 'access by payment', ru: 'доступ по оплате' },
    ],
    flow: [
      {
        t: { en: 'The schedule is shown whole, once', ru: 'График показывается целиком и сразу' },
        d: { en: 'The amount, the parts, the dates and what each part opens are on screen before the first payment.', ru: 'Сумма, число частей, даты и то, что открывает каждая часть, видны до первого платежа.' },
      },
      {
        t: { en: 'A charge, or a payment link', ru: 'Списание или ссылка на оплату' },
        d: { en: 'Where the card is saved the charge goes out; where not, a link closes a named part, not a balance.', ru: 'Где карта сохранена, списание уходит само; где нет, ссылка закрывает конкретную часть графика, а не пополняет баланс.' },
      },
      {
        t: { en: 'Access moves with the payments', ru: 'Доступ двигается вместе с платежами' },
        d: { en: 'A part paid opens what is attached to it; a part missed pauses what lies ahead and takes back nothing.', ru: 'Внесённая часть открывает то, что за ней закреплено, а пропущенная ставит на паузу впереди и не забирает оплаченное.' },
      },
    ],
    watch: [
      {
        t: { en: 'Your payment plan is not a loan', ru: 'Ваша рассрочка это не кредит' },
        d: { en: 'Either the deferral is yours, or it runs through a provider holding the licence, and the route is chosen before any code.', ru: 'Либо отсрочка ваша, либо она идёт через провайдера с лицензией, и маршрут выбирается до первой строки кода.' },
      },
      {
        t: { en: 'One miss should not close everything', ru: 'Один пропуск не закрывает всё' },
        d: { en: 'Paid parts stay open, only what lies ahead pauses, and the pause has a date the customer is told in advance.', ru: 'Оплаченные части остаются открытыми, на паузу встаёт только то, что впереди, и дату паузы клиенту называют заранее.' },
      },
      {
        t: { en: 'A refund mid-schedule', ru: 'Возврат в середине графика' },
        d: { en: 'The refund rule is written before the first sale, part by part and visible at purchase, so the answer is arithmetic.', ru: 'Правило возврата записывается до первой продажи, по частям и видно в момент покупки, чтобы ответ был арифметикой.' },
      },
    ],
    metrics: [
      { en: 'schedules paid to the end', ru: 'графиков закрыто до конца' },
      { en: 'parts landing on their date', ru: 'частей прошло в свою дату' },
      { en: 'misses closed without a person', ru: 'пропусков закрыто без человека' },
      { en: 'the remainder across live schedules', ru: 'остаток по действующим графикам' },
    ],
    faq: [
      {
        q: { en: 'Is this a loan? Do we need a licence?', ru: 'Это кредит? Нужна лицензия?' },
        a: { en: 'By default it is a deferred payment for your own product, with nothing charged on top. Where your country or volume makes it regulated, the money runs through a licensed provider, and your lawyer confirms which.', ru: 'По умолчанию это отсрочка оплаты вашего же продукта, без процентов сверху. Там, где страна или объём переводят это в регулируемую конструкцию, деньги идут через провайдера с лицензией, а подтверждает это ваш юрист.' },
      },
      {
        q: { en: 'Somebody stops paying halfway. What then?', ru: 'Человек перестаёт платить на середине. Что дальше?' },
        a: { en: 'The system does the mechanical part: the reminder, the retries, the pause ahead and a screen showing who owes which part. Writing it off or handing it to a lawyer stays your decision.', ru: 'Механику система делает сама: напоминание, повторы, паузу на том, что впереди, и экран, где видно, кто какую часть не внёс. Списать или отдать юристу решаете вы.' },
      },
      {
        q: { en: 'A customer wants to close the remainder in one payment. Possible?', ru: 'Клиент хочет закрыть остаток одним платежом. Так можно?' },
        a: { en: 'Yes, from their own account, with the remainder recalculated to the day. A partial early payment either shortens the schedule or lowers the parts, and which of the two is a rule set before launch.', ru: 'Да, из его кабинета, с пересчётом остатка на дату. Частичный досрочный платёж либо укорачивает график, либо уменьшает части, и что именно, задаётся правилом до запуска.' },
      },
    ],
    stack: [
      { t: { en: 'Schedule and access', ru: 'График и доступ' }, items: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'] },
      { t: { en: 'Charges and their timing', ru: 'Списания и их расписание' }, items: ['Stripe', 'Paddle', 'Temporal', 'Redis'] },
      { t: { en: 'Account and reminders', ru: 'Кабинет и напоминания' }, items: ['Next.js', 'React', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'provider fees, one per part', ru: 'комиссия провайдера на каждую часть' },
      { en: 'card storage and retry charges', ru: 'плата за хранение карты и повторы' },
      { en: 'SMS reminders before a payment date', ru: 'SMS-напоминания перед датой платежа' },
      { en: 'the lawyer who writes the terms', ru: 'юрист, который пишет условия' },
    ],
  },
  {
    slug: 'services-marketplace-payouts',
    kicker: 'Split payments',
    title: { en: 'Services marketplace with payouts', ru: 'Маркетплейс услуг с выплатами' },
    lead: { en: 'The client pays once, the commission is held at that second, and the contractor\'s share waits on a balance until the payout leaves with a document.', ru: 'Клиент платит один раз, комиссия удерживается в ту же секунду, а доля исполнителя ждёт на балансе, пока выплата не уйдёт с документом.' },
    audience: { en: 'Platforms where the money runs through you and the work is done by somebody else, and the commission is worked out in a spreadsheet.', ru: 'Площадки, где деньги идут через вас, а работу делает кто-то другой, и комиссия при этом считается в таблице.' },
    base: 'billing',
    composition: [
      { en: 'contractor balances', ru: 'баланс исполнителя' },
      { en: 'commission held', ru: 'удержание комиссии' },
      { en: 'hold until acceptance', ru: 'заморозка до приёмки' },
      { en: 'payout requests', ru: 'заявки на вывод' },
    ],
    flow: [
      {
        t: { en: 'Money arrives whole, splits in ledger', ru: 'Деньги приходят целиком, делятся в журнале' },
        d: { en: 'One payment arrives, and the split into your commission and the contractor\'s share is recorded as entries at that second.', ru: 'Приходит один платёж, а разделение на вашу комиссию и долю исполнителя записывается проводками в ту же секунду.' },
      },
      {
        t: { en: 'The contractor\'s share waits for acceptance', ru: 'Доля исполнителя ждёт приёмки' },
        d: { en: 'The amount sits on the balance as held, with a date tied to how long the client can still dispute.', ru: 'Сумма лежит на балансе замороженной, а дата вывода привязана к тому, сколько у клиента есть на спор с банком.' },
      },
      {
        t: { en: 'A payout leaves in a batch', ru: 'Выплата уходит пачкой и оставляет след' },
        d: { en: 'Each request carries a document and a key, and a refused payout returns to the balance with its reason.', ru: 'У каждой заявки свой документ и свой ключ, а непринятая банком выплата возвращается на баланс с причиной.' },
      },
    ],
    watch: [
      {
        t: { en: 'A balance is a sum', ru: 'Баланс это сумма, а не поле' },
        d: { en: 'Entries are only appended, the balance is their sum, and every payout carries a key, so a retried request cannot pay twice.', ru: 'Проводки только дописываются, баланс это их сумма, а у каждой выплаты есть ключ, поэтому повторённая заявка не станет вторым переводом.' },
      },
      {
        t: { en: 'A refund after the payout', ru: 'Возврат после выплаты' },
        d: { en: 'The hold window and the provider\'s dispute window are different clocks, and the contract says in advance who carries the gap.', ru: 'Окно заморозки и окно оспаривания у провайдера это разные часы, и кто несёт убыток в зазоре, решает договор заранее.' },
      },
      {
        t: { en: 'A person is not a company', ru: 'Человек это не компания' },
        d: { en: 'Status, details and reporting differ, so all of it is gathered and checked before a first payout is possible at all.', ru: 'Статус, реквизиты и отчётность отличаются, поэтому всё собирается и проверяется до того, как первая выплата вообще станет возможной.' },
      },
    ],
    metrics: [
      { en: 'payouts leaving without a hand', ru: 'выплат без ручного вмешательства' },
      { en: 'time from acceptance to money', ru: 'время от приёмки до денег' },
      { en: 'gap between ledger and bank', ru: 'расхождение журнала и выписки' },
      { en: 'refunds arriving after a payout', ru: 'возвратов после выплаты' },
    ],
    faq: [
      {
        q: { en: 'Who is the seller on the receipt: us or the contractor?', ru: 'Кто в чеке продавец: мы или исполнитель?' },
        a: { en: 'Yours with your accountant, not ours. Platform as seller means one receipt to the client and a payout after; contractor as seller means the money is theirs and your commission is a separate service.', ru: 'Это решаете вы с бухгалтером, а не мы. Продавец площадка это один чек клиенту и выплата после; продавец исполнитель это деньги его с начала, а ваша комиссия отдельная услуга.' },
      },
      {
        q: { en: 'Can payouts go automatically rather than by hand?', ru: 'Можно выплачивать автоматически, а не руками?' },
        a: { en: 'Where the payment provider pays out to recipients in your country, end to end. Where it does not, the system assembles the batch file the bank expects and reads its answer back onto the balances.', ru: 'Там, где провайдер умеет выплачивать получателям в вашей стране, целиком. Где не умеет, система собирает файл в том виде, который ждёт банк, и разносит его ответ по балансам.' },
      },
      {
        q: { en: 'Can we change the commission ourselves?', ru: 'Сможем менять комиссию сами?' },
        a: { en: 'The percentage, the minimum and the rate by category are settings, and an edit never reaches deals in flight: the rate is fixed when a deal is created. A different shape of commission is code.', ru: 'Процент, минимум и ставка по категории это настройки, а правка не доезжает до идущих сделок: ставка фиксируется в момент создания сделки. Другая форма комиссии это код.' },
      },
    ],
    stack: [
      { t: { en: 'Money and the ledger', ru: 'Деньги и журнал проводок' }, items: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'] },
      { t: { en: 'Payments, payouts and their schedule', ru: 'Платежи, выплаты и их расписание' }, items: ['Stripe', 'Paddle', 'Temporal', 'Redis'] },
      { t: { en: 'Two sets of screens and reporting', ru: 'Два кабинета и отчётность' }, items: ['Next.js', 'React', 'ClickHouse', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'provider fees on payments and payouts', ru: 'комиссии провайдера на приём и выплату' },
      { en: 'identity checks on recipients', ru: 'проверка получателей у провайдера' },
      { en: 'bank charges for batch payouts', ru: 'плата банка за выплаты пачкой' },
      { en: 'the accountant filing payout reports', ru: 'бухгалтер, сдающий отчётность по выплатам' },
    ],
  },
  {
    slug: 'event-ticketing-service',
    kicker: 'Box office',
    title: { en: 'Event ticketing service', ru: 'Сервис продажи билетов' },
    lead: { en: 'A seat is held while the payment goes through, the ticket arrives as a code, and at the door that code is read once.', ru: 'Место держится, пока идёт оплата, билет приходит кодом, а на входе этот код считывается один раз.' },
    audience: { en: 'Events where the seat is part of what is sold, and the door is a queue of people whose tickets are somewhere in their messages.', ru: 'Мероприятия, где место это часть того, что продаётся, а на входе очередь из людей, чьи билеты лежат где-то в переписке.' },
    base: 'billing',
    composition: [
      { en: 'hall plan', ru: 'схема зала' },
      { en: 'seat hold', ru: 'удержание места' },
      { en: 'single-use code', ru: 'одноразовый код' },
      { en: 'scanning at the door', ru: 'сканирование на входе' },
    ],
    flow: [
      {
        t: { en: 'The seat is taken before payment', ru: 'Место занимается до оплаты' },
        d: { en: 'The seat is held while payment runs, the plan updates for everyone, and an unpaid hold returns itself.', ru: 'Место закрепляется на время оплаты, схема зала меняется у всех сразу, а неоплаченное возвращается в зал само.' },
      },
      {
        t: { en: 'A code, not a picture', ru: 'Билет это код, а не картинка' },
        d: { en: 'The code is bound to the seat and the buyer, opens the door once, and reissuing kills the previous one.', ru: 'Код привязан к месту и покупателю, открывает вход один раз, а перевыпуск гасит предыдущий.' },
      },
      {
        t: { en: 'Cancelled once at the door', ru: 'На входе он гасится один раз' },
        d: { en: 'The check runs on the device itself, and a second scan names the point and time of the first.', ru: 'Проверка идёт на самом устройстве, а повторное сканирование называет точку и время первого.' },
      },
    ],
    watch: [
      {
        t: { en: 'The first minutes decide it', ru: 'Систему судят по первым минутам' },
        d: { en: 'The hold is taken at the database level, the plan updates by change, and load is tested against an announcement.', ru: 'Удержание берётся на уровне базы, схема обновляется изменениями, а нагрузку проверяют по анонсу, а не по среднему вечеру.' },
      },
      {
        t: { en: 'No network at the door', ru: 'На входе не будет интернета' },
        d: { en: 'The scanner carries the list and works with no network, and a duplicate found at sync names both scan points.', ru: 'Сканер несёт список с собой и работает без сети, а найденный при синхронизации дубль показывается с обеими точками прохода.' },
      },
      {
        t: { en: 'The date moves for everyone', ru: 'Дата переносится сразу для всех' },
        d: { en: 'Mass reissue and mass refund are in the first version, and who carries the refund fee is agreed in advance.', ru: 'Массовый перевыпуск на новую дату и массовый возврат есть в первой версии, а комиссию при возврате распределяют заранее.' },
      },
    ],
    metrics: [
      { en: 'payments that reach a ticket', ru: 'оплат, дошедших до билета' },
      { en: 'seat holds that expire unpaid', ru: 'удержаний, истёкших без оплаты' },
      { en: 'seconds per person at the door', ru: 'секунд на человека на входе' },
      { en: 'second scans of the same code', ru: 'повторных сканирований одного кода' },
    ],
    faq: [
      {
        q: { en: 'Why not a ready-made ticketing platform?', ru: 'Почему не готовая билетная платформа?' },
        a: { en: 'If one fits, use it, and we say so on the call. This is for a hall plan of your own, your own fee, or money that arrives on the day of sale.', ru: 'Если готовая подходит, берите, и на разборе мы это скажем. Здесь речь о своей схеме зала, своём сборе и деньгах, приходящих в день продажи.' },
      },
      {
        q: { en: 'What happens if the network dies at the door?', ru: 'Что будет, если на входе пропадёт сеть?' },
        a: { en: 'The scanners keep working: each downloads the list before the doors open, cancels tickets locally and syncs later. That is a requirement of the first version.', ru: 'Сканеры продолжают работать: каждый скачивает список до открытия дверей, гасит билеты локально и синхронизируется позже. Это требование первой версии, а не улучшение на потом.' },
      },
      {
        q: { en: 'Can a ticket be passed to somebody else?', ru: 'Можно ли передать билет другому человеку?' },
        a: { en: 'That is your rule and we build either one: a transfer that reissues the code, or a ticket bound to the buyer. What we will not ship is the middle version.', ru: 'Это ваше правило, и мы соберём любой вариант: передача с перевыпуском кода или билет, привязанный к покупателю. Чего мы не выпустим, так это среднего варианта.' },
      },
    ],
    stack: [
      { t: { en: 'Sales and the hall plan', ru: 'Продажа и схема зала' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Seats, holds and money', ru: 'Места, удержания и деньги' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe', 'Paddle'] },
      { t: { en: 'The door and operations', ru: 'Вход и эксплуатация' }, items: ['Flutter', 'S3', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'payment provider fees, refunds included', ru: 'комиссии платёжной системы, в том числе при возврате' },
      { en: 'the mail service tickets go out through', ru: 'сервис рассылки, через который уходят билеты' },
      { en: 'SMS with the ticket or entry code', ru: 'SMS с билетом или кодом входа' },
      { en: 'hired phones or scanners for the door', ru: 'аренда телефонов или сканеров на входе' },
    ],
  },
  {
    slug: 'courier-delivery-service',
    kicker: 'Last mile',
    title: { en: 'Courier delivery service', ru: 'Сервис курьерской доставки' },
    lead: { en: 'Orders are assembled into routes, the courier runs their day from a phone, and the customer sees the status instead of calling to ask where the parcel is.', ru: 'Заказы собираются в маршруты, курьер ведёт свой день с телефона, а клиент видит статус и не звонит, чтобы узнать, где посылка.' },
    audience: { en: 'Delivery done in-house, where routes are assembled in a spreadsheet, couriers are steered by phone, and the customer gets a half-day window.', ru: 'Доставка своими силами, когда маршруты собирают в таблице, курьеров ведут по телефону, а клиенту называют интервал в полдня.' },
    base: 'mvp',
    composition: [
      { en: 'routes for the day', ru: 'маршруты на день' },
      { en: 'courier app', ru: 'приложение курьера' },
      { en: 'proof of handover', ru: 'подтверждение вручения' },
      { en: 'customer status page', ru: 'статус для клиента' },
    ],
    flow: [
      {
        t: { en: 'Orders become routes', ru: 'Заказы собираются в маршруты' },
        d: { en: 'The route is built from addresses, windows and weight, and the dispatcher edits the sequence by hand.', ru: 'Маршрут строится из адресов, интервалов и веса, а диспетчер правит последовательность руками.' },
      },
      {
        t: { en: 'The courier works from a phone', ru: 'Курьер идёт по точкам с телефона' },
        d: { en: 'The next address, the amount to collect, and the stop closed on the spot, signal or no signal.', ru: 'Следующий адрес, сумма к получению и закрытие точки на месте, в том числе без связи.' },
      },
      {
        t: { en: 'The customer sees what dispatch sees', ru: 'Клиент видит то же, что диспетчер' },
        d: { en: 'The order page shows the courier and how many stops are ahead, and a narrowed window arrives as a message.', ru: 'Страница заказа показывает курьера и число точек до вас, а сузившийся интервал приходит сообщением.' },
      },
    ],
    watch: [
      {
        t: { en: 'The second attempt costs more', ru: 'Вторая попытка стоит дороже первой' },
        d: { en: 'A failed delivery costs a courier day, so the customer confirms before the run and reschedules from the order page.', ru: 'Невручённый заказ это потраченный день курьера, поэтому клиент подтверждает до выезда и переносит доставку сам со страницы заказа.' },
      },
      {
        t: { en: 'Cash in the courier’s hands', ru: 'Деньги в руках у курьера' },
        d: { en: 'The amount is recorded at handover, and a per-courier reconciliation for the shift is in the first version.', ru: 'Сумма фиксируется в момент вручения, а сверка по курьеру за смену есть в первой версии.' },
      },
      {
        t: { en: 'A free-text address breaks the route', ru: 'Адрес строкой не годится для маршрута' },
        d: { en: 'The address is normalised when the order is placed, and doubtful ones reach the dispatcher, not a courier in a courtyard.', ru: 'Адрес нормализуется в момент оформления, а спорные точки попадают к диспетчеру, а не к курьеру во дворе.' },
      },
    ],
    metrics: [
      { en: 'delivered on the first attempt', ru: 'вручений с первой попытки' },
      { en: 'stops per courier per shift', ru: 'точек на курьера за смену' },
      { en: 'deliveries inside the promised window', ru: 'попаданий в обещанный интервал' },
      { en: 'calls asking where the order is', ru: 'обращений с вопросом, где заказ' },
    ],
    faq: [
      {
        q: { en: 'Why not use an outside delivery service?', ru: 'Почему не сторонняя служба доставки?' },
        a: { en: 'If the volume is small and timing is not what makes you different, use one. Your own delivery pays off where the window, the packaging or the door conversation has to be yours.', ru: 'Если объём небольшой и сроки не то, чем вы отличаетесь, берите её. Своя доставка окупается там, где интервал, упаковка или разговор на пороге должны быть вашими.' },
      },
      {
        q: { en: 'Will the routes be built automatically?', ru: 'Маршруты будут строиться автоматически?' },
        a: { en: 'The sequence is proposed by a calculation and the dispatcher has the last word. We do not ship a version where a route cannot be edited by hand.', ru: 'Последовательность предлагает расчёт, а последнее слово за диспетчером. Версию, где маршрут нельзя поправить руками, мы не выпускаем.' },
      },
      {
        q: { en: 'Will the couriers cope with an app?', ru: 'Курьеры справятся с приложением?' },
        a: { en: 'The courier screen is one stop at a time and three buttons: arrived, handed over, did not work out. Anything outside that set goes to the dispatcher by phone.', ru: 'Экран курьера это одна точка за раз и три кнопки: приехал, вручил, не получилось. Всё, что в набор не помещается, уходит диспетчеру звонком.' },
      },
    ],
    stack: [
      { t: { en: 'Courier app', ru: 'Приложение курьера' }, items: ['Flutter', 'Kotlin', 'Swift'] },
      { t: { en: 'Orders, routes and server', ru: 'Заказы, маршруты и сервер' }, items: ['Node.js', 'Python', 'PostgreSQL', 'Prisma', 'Redis'] },
      { t: { en: 'Dispatcher screen and customer page', ru: 'Экран диспетчера и страница клиента' }, items: ['TypeScript', 'React', 'Next.js', 'Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'maps, route building and geocoding', ru: 'карты, построение маршрута и геокодирование' },
      { en: 'SMS to the customer about the window', ru: 'SMS клиенту о сузившемся интервале' },
      { en: 'app store accounts and mobile data', ru: 'аккаунты в магазинах приложений и мобильный трафик' },
      { en: 'the card terminal and the bank’s percentage', ru: 'терминал и процент банка за приём карт' },
    ],
  },
  {
    slug: 'mobile-app-mvp',
    kicker: 'Mobile MVP',
    title: { en: 'Mobile app MVP', ru: 'MVP мобильного приложения' },
    lead: { en: 'One key scenario works end to end on real data, and the app is in the App Store and Google Play. The rest is postponed deliberately rather than forgotten.', ru: 'Один ключевой сценарий работает целиком, на живых данных, и приложение лежит в App Store и Google Play. Остальное отложено сознательно, а не забыто.' },
    audience: { en: 'A product that exists as mockups and a feature list, when what needs checking is one scenario with real people on their own phones.', ru: 'Продукт, который существует в макетах и списке функций, когда проверить нужно один сценарий на живых людях с их телефонами.' },
    base: 'mvp',
    composition: [
      { en: 'one whole scenario', ru: 'один сценарий целиком' },
      { en: 'iOS and Android screens', ru: 'экраны iOS и Android' },
      { en: 'sign-in and an account', ru: 'вход и учётная запись' },
      { en: 'publication in both stores', ru: 'публикация в обоих магазинах' },
    ],
    flow: [
      {
        t: { en: 'Install and the first screen', ru: 'Установка и первый экран' },
        d: { en: 'The person lands inside the scenario, and sign-up asks only for what the next step cannot happen without.', ru: 'Человек попадает сразу в сценарий, а регистрация спрашивает только то, без чего следующий шаг невозможен.' },
      },
      {
        t: { en: 'The scenario runs to its end', ru: 'Сценарий проходится до конца' },
        d: { en: 'It has a finish: an order created, a measurement recorded, a report sent, not a continuation in a web account.', ru: 'У него есть завершение: заказ создан, замер записан, отчёт отправлен, а не продолжение в веб-кабинете.' },
      },
      {
        t: { en: 'The result outlives the phone', ru: 'Результат переживает телефон' },
        d: { en: 'What the person makes goes to the server, and a record is confirmed by the server rather than an animation.', ru: 'Сделанное уходит на сервер, и запись подтверждает сервер, а не анимация.' },
      },
    ],
    watch: [
      {
        t: { en: 'Review rejects what is not code', ru: 'Заворачивают на проверке не за код' },
        d: { en: 'Account deletion, the privacy policy, Sign in with Apple and the camera explanation go into the first version.', ru: 'Удаление аккаунта, политика конфиденциальности, вход через Apple и объяснение доступа к камере входят в первую версию.' },
      },
      {
        t: { en: 'One scenario whole, not three halves', ru: 'Один сценарий целиком, не три наполовину' },
        d: { en: 'Half a scenario tests nothing, so the line around the list is drawn before the build and the rest is written down.', ru: 'Половина сценария не проверяет ничего, поэтому границу списка проводим до сборки, а отложенное записываем отдельно.' },
      },
      {
        t: { en: 'The signal drops, the send repeats', ru: 'Связь пропадает, и отправка повторяется' },
        d: { en: 'The app queues what does not go through, and the server recognises a repeat by key, or one order becomes three.', ru: 'Приложение складывает неотправленное в очередь, а сервер узнаёт повтор по ключу, иначе один заказ становится тремя.' },
      },
    ],
    metrics: [
      { en: 'installs that reach the end of the scenario', ru: 'установок, доходящих до конца сценария' },
      { en: 'time from install to the first result', ru: 'время от установки до первого результата' },
      { en: 'sessions with no crash', ru: 'сессий без падений' },
      { en: 'people who come back the next week', ru: 'вернувшихся на следующей неделе' },
    ],
    faq: [
      {
        q: { en: 'Both platforms at once?', ru: 'Сразу обе платформы?' },
        a: { en: 'Yes, from a single codebase, inside the first release. Only push, in-app purchases and permissions diverge. If the scenario rests on something one platform alone has, we say so before the estimate.', ru: 'Да, из одной кодовой базы и в первой версии. Расходятся только пуши, покупки внутри приложения и разрешения. Если сценарий держится на одной платформе, скажем это до сметы.' },
      },
      {
        q: { en: 'Who submits it to the stores, and what if it is rejected?', ru: 'Кто подаёт приложение в магазины и что если откажут?' },
        a: { en: 'We submit and we close the review comments, and that is part of the work rather than a separate invoice. The usual stumbling requirements are handled before we send it in.', ru: 'Подаём мы, замечания закрываем тоже мы, и это часть работы, а не отдельный счёт. Требования, на которых спотыкаются чаще всего, закрываем до подачи.' },
      },
      {
        q: { en: 'Whose accounts and whose code?', ru: 'Чьи аккаунты и чей код?' },
        a: { en: 'The developer accounts are opened for your business, the signing keys stay with you, and the repository is yours from the first day. Nothing a next team needs stays on our side.', ru: 'Аккаунты разработчика заводятся на ваш бизнес, ключи подписи хранятся у вас, репозиторий ваш с первого дня. Ничего, без чего следующая команда не соберёт релиз, у нас не остаётся.' },
      },
    ],
    stack: [
      { t: { en: 'The app', ru: 'Приложение' }, items: ['Flutter', 'Swift', 'Kotlin'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Alerts and operations', ru: 'Уведомления и эксплуатация' }, items: ['Telegram Bot API', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'developer accounts in both stores', ru: 'аккаунты разработчика в обоих магазинах' },
      { en: 'the store’s share of in-app purchases', ru: 'доля магазина с покупок внутри приложения' },
      { en: 'the server and file storage', ru: 'сервер и хранилище файлов' },
      { en: 'SMS with a confirmation code at sign-in', ru: 'SMS с кодом подтверждения при входе' },
    ],
  },
  {
    slug: 'online-learning-platform',
    kicker: 'Course delivery',
    title: { en: 'Online learning platform', ru: 'Платформа онлайн-обучения' },
    lead: { en: 'A student moves through the course step by step, submits work and sees their progress, a teacher reviews and replies, and payment is what opens access.', ru: 'Ученик идёт по курсу шаг за шагом, сдаёт задания и видит прогресс, преподаватель проверяет и отвечает, а доступ открывает оплата.' },
    audience: { en: 'A course that already lives in recordings, a chat and a spreadsheet: access is granted by hand, assignments are reviewed in private messages, and nobody knows who stopped where.', ru: 'Курс, который уже живёт в записях, чате и таблице: доступ выдают руками, задания проверяют в личных сообщениях, и кто где остановился, не знает никто.' },
    base: 'mvp',
    composition: [
      { en: 'modules and lessons', ru: 'модули и уроки' },
      { en: 'assignments and review', ru: 'задания и проверка' },
      { en: 'student progress', ru: 'прогресс ученика' },
      { en: 'payment and access', ru: 'оплата и доступ' },
    ],
    flow: [
      {
        t: { en: 'Payment opens exactly what was bought', ru: 'Оплата открывает ровно то, что куплено' },
        d: { en: 'Access opens by itself after the payment and follows from the payment state, not from a mark in a spreadsheet.', ru: 'Доступ открывается сам после платежа и выводится из состояния оплаты, а не из отметки в таблице.' },
      },
      {
        t: { en: 'The student moves in steps', ru: 'Ученик идёт по шагам' },
        d: { en: 'The system remembers where the person stopped, opens the same place on another device and shows the next step.', ru: 'Система помнит, где человек остановился, открывает то же место с другого устройства и показывает следующий шаг.' },
      },
      {
        t: { en: 'Into a queue and back answered', ru: 'Задание уходит в очередь и возвращается' },
        d: { en: 'Once reviewed it comes back with a comment and moves the progress, so both sides look at one state.', ru: 'Проверенное возвращается с комментарием и двигает прогресс, поэтому обе стороны видят одно состояние.' },
      },
    ],
    watch: [
      {
        t: { en: 'Video is not a server file', ru: 'Видео это не файл на сервере' },
        d: { en: 'It goes through a delivery service with short-lived links, though copying stays possible: what a copy cannot take is the review.', ru: 'Видео идёт через сервис доставки с короткоживущими ссылками, но от скачивания это не спасает: с копией не уносится проверка задания.' },
      },
      {
        t: { en: 'Review runs at human speed', ru: 'Проверка упирается в человека' },
        d: { en: 'The platform is as fast as the teacher, and people leave over silence, so the student sees the review deadline.', ru: 'Скорость платформы равна скорости преподавателя, а уходят из-за тишины, поэтому срок проверки виден ученику.' },
      },
      {
        t: { en: 'The access term is decided first', ru: 'Срок доступа решается до первой продажи' },
        d: { en: 'Forever, for a cohort or while a subscription runs are different promises, and they cannot be rewritten after the first payments.', ru: 'Навсегда, на время потока или пока идёт подписка это разные обещания, и переиграть их после первых оплат нельзя.' },
      },
    ],
    metrics: [
      { en: 'students who reach the end of the course', ru: 'дошедших до конца курса' },
      { en: 'time from a submission to a reply', ru: 'время от сдачи задания до ответа' },
      { en: 'the lessons where people most often stop', ru: 'уроки, на которых чаще всего останавливаются' },
      { en: 'payments that open access without an administrator', ru: 'оплат, открывающих доступ без администратора' },
    ],
    faq: [
      {
        q: { en: 'Why not a boxed course platform?', ru: 'Почему не готовая платформа для курсов?' },
        a: { en: 'Usually you should use one, and we will say so. Your own pays off where teaching is part of the product, or where the revenue share and the limits already get in the way.', ru: 'Обычно ею и стоит пользоваться, и мы это скажем. Своя окупается там, где обучение часть продукта или где комиссия с оборота и ограничения коробки уже мешают расти.' },
      },
      {
        q: { en: 'Where does the video live and whose is it?', ru: 'Где лежит видео и чьё оно?' },
        a: { en: 'In your own account with the video service: the invoice comes to you, the files can be taken without us, and we keep no copy. The platform holds the link.', ru: 'В вашем аккаунте сервиса доставки видео: счёт приходит вам, файлы забираются без нас, копию мы не держим. Платформа хранит ссылку и права доступа, а не файл.' },
      },
      {
        q: { en: 'Can we add courses and lessons ourselves?', ru: 'Сможем ли добавлять курсы и уроки сами?' },
        a: { en: 'Yes: courses, lessons, materials, assignments, prices and access terms are set from an admin screen. A new kind of assignment is code, so it goes through us with the price named first.', ru: 'Да: курсы, уроки, материалы, задания, цены и сроки доступа заводятся из админки. Новый тип задания это код, он идёт через нас, с ценой, названной до начала работ.' },
      },
    ],
    stack: [
      { t: { en: 'Frontend and the student screens', ru: 'Фронтенд и кабинеты' }, items: ['TypeScript', 'React', 'Next.js'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3', 'Docker'] },
      { t: { en: 'Payments and notifications', ru: 'Оплата и уведомления' }, items: ['Stripe', 'Paddle', 'Telegram Bot API', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'video storage and delivery', ru: 'хранение и раздача видео' },
      { en: 'the payment fee on every course payment', ru: 'комиссия платёжной системы с каждой оплаты' },
      { en: 'email to students: access, reminders, replies', ru: 'письма ученикам: доступ, напоминания, ответы' },
      { en: 'hosting, the database and space for student work', ru: 'хостинг, база и место под работы учеников' },
    ],
  },
  {
    slug: 'field-staff-app',
    kicker: 'Field crews',
    title: { en: 'App for field staff', ru: 'Приложение для выездных сотрудников' },
    lead: { en: 'A worker sees the day’s jobs, walks through them in order, takes photos and closes each one on the spot. With no signal the app keeps working, and what is recorded reaches the server when the network comes back.', ru: 'Сотрудник видит свои задания на день, идёт по ним по порядку, снимает фото и закрывает наряд на месте. Без связи приложение работает, а записанное уходит на сервер, когда сеть возвращается.' },
    audience: { en: 'Work away from a desk: installation, servicing, surveys, where jobs are handed out by voice and in a chat and photos arrive with nothing tying them to an address.', ru: 'Работа не в офисе: монтаж, обслуживание, замеры, когда задания раздают голосом и в чате, а фотографии приходят без привязки к адресу.' },
    base: 'mobile',
    composition: [
      { en: 'the day’s jobs', ru: 'задания на день' },
      { en: 'checklist and photo report', ru: 'чек-лист и фотоотчёт' },
      { en: 'offline mode', ru: 'офлайн-режим' },
      { en: 'dispatcher screen', ru: 'экран диспетчера' },
    ],
    flow: [
      {
        t: { en: 'The day arrives on the phone', ru: 'Утром день уже лежит на телефоне' },
        d: { en: 'Jobs arrive with an address, contact and time, and everything needed downloads while there is still a network.', ru: 'Задания приходят с адресом, контактом и временем, а всё нужное скачивается заранее, пока связь ещё есть.' },
      },
      {
        t: { en: 'On site, step by step', ru: 'На объекте телефон ведёт по шагам' },
        d: { en: 'A checklist, photos before and after, the client’s signature, each step written with the time and coordinates of that moment.', ru: 'Чек-лист, фотографии до и после, подпись клиента, и каждый шаг пишется со временем и координатами момента.' },
      },
      {
        t: { en: 'The signal returns, everything uploads', ru: 'Связь возвращается, и всё уезжает само' },
        d: { en: 'The queue goes out in order, photos travel separately, and the worker can see what has not gone through yet.', ru: 'Очередь уходит по порядку, фотографии сжимаются и идут отдельно, а сотрудник видит, что ещё не доехало.' },
      },
    ],
    watch: [
      {
        t: { en: 'The job changes while offline', ru: 'Пока телефон офлайн, задание меняют' },
        d: { en: 'The last write must not simply win: work already done is never discarded, and the disagreement is raised to the dispatcher.', ru: 'Побеждать не должен тот, кто пишет последним: сделанная работа не стирается, а расхождение поднимается диспетчеру отдельным случаем.' },
      },
      {
        t: { en: 'The phone dies before the shift', ru: 'Телефон садится раньше, чем кончается смена' },
        d: { en: 'Coordinates are written on an event rather than continuously, and photos are compressed on the device and wait for Wi-Fi.', ru: 'Координаты пишутся по событию, а не непрерывно, фотографии сжимаются на устройстве и ждут Wi-Fi.' },
      },
      {
        t: { en: 'Surveillance apps get switched off', ru: 'Приложение, похожее на слежку, выключают' },
        d: { en: 'The app gives the worker something first, and what the dispatcher can see is named out loud and never quietly extended.', ru: 'Приложение сначала даёт что-то самому сотруднику, а то, что видит диспетчер, названо вслух и не расширяется молча.' },
      },
    ],
    metrics: [
      { en: 'jobs closed on site rather than in the evening', ru: 'заданий, закрытых на объекте, а не вечером' },
      { en: 'reports with the full set of photos', ru: 'отчётов с полным набором фотографий' },
      { en: 'time from signal returning to data appearing', ru: 'время от возврата связи до появления данных' },
      { en: 'calls made only to ask for a status', ru: 'звонков только ради статуса' },
    ],
    faq: [
      {
        q: { en: 'A native app or the web?', ru: 'Нативное приложение или веб?' },
        a: { en: 'Offline and the camera decide it. Where the signal drops and there are dozens of photos a shift, it is an installed app. Where the signal is steady the web is cheaper.', ru: 'Решают офлайн и камера. Где связь пропадает, а фотографий за смену десятки, это установленное приложение. Где связь стабильна, дешевле веб, и мы это скажем.' },
      },
      {
        q: { en: 'How do we know a photo is taken on site?', ru: 'Как понять, что фотография сделана на объекте?' },
        a: { en: 'The photo is taken inside the app rather than picked from the gallery, and the time and coordinates are written with it. That is evidence, not a guarantee.', ru: 'Фотография снимается внутри приложения, а не выбирается из галереи, и вместе с ней пишутся время и координаты. Это доказательство, а не гарантия.' },
      },
      {
        q: { en: 'Android and iOS at once?', ru: 'Android и iOS сразу?' },
        a: { en: 'We look at what people actually carry. If the fleet is one platform, the first version targets it and costs less. The second platform is a line in the estimate rather than a free addition.', ru: 'Смотрим, что у людей в руках. Если парк телефонов один, первая версия делается под него и стоит меньше. Вторая платформа это строка в смете, а не бесплатное дополнение.' },
      },
    ],
    stack: [
      { t: { en: 'The app in the hand', ru: 'Приложение в руках' }, items: ['Flutter', 'Swift', 'Kotlin'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'S3'] },
      { t: { en: 'Dispatcher screen and operations', ru: 'Экран диспетчера и эксплуатация' }, items: ['TypeScript', 'React', 'Next.js', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'developer accounts in the App Store and Google Play', ru: 'аккаунты разработчика в App Store и Google Play' },
      { en: 'mobile data on the workers’ phones', ru: 'мобильный трафик на телефонах сотрудников' },
      { en: 'photo storage that grows every shift', ru: 'хранилище под фотографии, растущее каждую смену' },
      { en: 'maps and address geocoding', ru: 'карты и геокодирование адресов' },
    ],
  },
  {
    slug: 'browser-extension-for-crm',
    kicker: 'Sales desk',
    title: { en: 'Browser extension for a CRM', ru: 'Расширение браузера для CRM' },
    lead: { en: 'The manager selects the contact on the page, presses one button, and a deal appears in the CRM with its fields, its source and a link. No second window, no carrying data across by hand.', ru: 'Менеджер выделяет контакт на странице, нажимает одну кнопку, и в CRM появляется сделка с полями, источником и ссылкой. Без второго окна и ручного переноса.' },
    audience: { en: 'Sales teams where enquiries arrive from anywhere while the CRM sits in the next tab, so deals are entered long after the conversation, or never.', ru: 'Отделы продаж, куда заявки приходят откуда угодно, а CRM живёт в соседней вкладке, поэтому сделки заводятся сильно позже разговора или не заводятся вовсе.' },
    base: 'extension',
    composition: [
      { en: 'button on any page', ru: 'кнопка на любой странице' },
      { en: 'parsed selection', ru: 'разбор выделения' },
      { en: 'duplicate check', ru: 'проверка на дубли' },
      { en: 'source on every deal', ru: 'источник в каждой сделке' },
    ],
    flow: [
      {
        t: { en: 'The manager selects what is onscreen', ru: 'Менеджер выделяет то, что видит' },
        d: { en: 'The extension breaks the selection into name, phone, email and amount, and shows what it understood.', ru: 'Расширение разбирает выделенное на имя, телефон, почту и сумму и показывает, что именно оно поняло.' },
      },
      {
        t: { en: 'The deal assembles in the open', ru: 'Сделка собирается на глазах' },
        d: { en: 'Fields are edited before sending, the page address becomes the source, and the CRM is asked whether the contact exists.', ru: 'Поля правятся до отправки, адрес страницы становится источником, а расширение сразу спрашивает CRM, нет ли уже такого контакта.' },
      },
      {
        t: { en: 'CRM data back onto the page', ru: 'Обратный ход: из CRM на страницу' },
        d: { en: 'The same fields are filled from the deal by template, so identical requests look identical whoever sends them.', ru: 'Те же поля подставляются из сделки по шаблону, поэтому одинаковые заявки выглядят одинаково, кто бы их ни отправил.' },
      },
    ],
    watch: [
      {
        t: { en: 'Duplicates appear faster than anyone cleans', ru: 'Дубли появляются быстрее, чем их чистят' },
        d: { en: 'A lookup by phone and email before creation, rather than a duplicates report afterwards, separates a working CRM from a second dump.', ru: 'Поиск по телефону и почте до создания, а не отчёт о дублях после, это разница между рабочей CRM и второй свалкой.' },
      },
      {
        t: { en: 'Parsed does not mean correct', ru: 'Разобранное поле нельзя считать верным' },
        d: { en: 'The card is shown before sending and marks what the parser doubts: a quietly corrected phone is worse than an empty one.', ru: 'Карточка показывается до отправки и подсвечивает неуверенный разбор: молча исправленный телефон хуже пустого поля, потому что по нему звонят.' },
      },
      {
        t: { en: 'The CRM key stays server side', ru: 'Ключ от CRM не в расширении' },
        d: { en: 'The extension goes through your own server, every manager acts under their own access, and a departing employee is switched off once.', ru: 'Расширение ходит через ваш сервер, каждый менеджер работает под своим доступом, и уволенного достаточно отключить один раз.' },
      },
    ],
    metrics: [
      { en: 'deals created from the extension', ru: 'сделок, заведённых из расширения' },
      { en: 'time from a first contact to a card', ru: 'время от первого контакта до карточки в CRM' },
      { en: 'duplicates caught before creation', ru: 'дублей, пойманных до создания' },
      { en: 'fields corrected by hand after parsing', ru: 'полей, поправленных руками после разбора' },
    ],
    faq: [
      {
        q: { en: 'Will it work with our CRM?', ru: 'Подойдёт ли к нашей CRM?' },
        a: { en: 'If it has an API, yes, and that is the ordinary case for amoCRM, Bitrix and almost any cloud one. If not, the extension creates the deal through the same interface a manager uses.', ru: 'Если у неё есть API, да, и это обычный случай для amoCRM, Битрикса и почти любой облачной. Если API нет, расширение заводит сделку через тот же интерфейс, что и менеджер.' },
      },
      {
        q: { en: 'Where does the data go?', ru: 'Куда уходят данные?' },
        a: { en: 'Into your CRM and your server, nowhere else. We keep no copy and gather no statistics on what the pages contain, and the log of what left is yours from the first version.', ru: 'В вашу CRM и на ваш сервер, больше никуда. Копию мы не держим и статистику по содержимому страниц не собираем, а журнал того, что ушло, доступен вам с первой версии.' },
      },
      {
        q: { en: 'How many sites will it support?', ru: 'Сколько сайтов оно поддержит?' },
        a: { en: 'The parsing is shared and works on any page from a selection. A precise binding, where fields are picked up without selecting anything, is built per site and is a line in the estimate.', ru: 'Разбор общий и работает на произвольной странице по выделению. Точная привязка, когда поля берутся сами и без выделения, делается под конкретный сайт, и это строка в смете.' },
      },
    ],
    stack: [
      { t: { en: 'Extension', ru: 'Расширение' }, items: ['TypeScript', 'React', 'Chrome Manifest V3'] },
      { t: { en: 'Server and data', ru: 'Сервер и данные' }, items: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'] },
      { t: { en: 'Integrations and tests', ru: 'Интеграции и тесты' }, items: ['n8n', 'Playwright', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'the CRM plan that opens its API', ru: 'тариф CRM, открывающий API' },
      { en: 'the server the extension goes through', ru: 'сервер, через который расширение ходит в CRM' },
      { en: 'AI model calls when a model parses', ru: 'обращения к AI-модели при разборе текста' },
      { en: 'mail delivery and telephony from the card', ru: 'почтовый сервис и телефония из карточки' },
    ],
  },
  {
    slug: 'browser-extension-for-scraping',
    kicker: 'Page capture',
    title: { en: 'Browser extension for scraping', ru: 'Расширение браузера для сбора данных' },
    lead: { en: 'A person opens a page under their own login, selects what matters, and the data lands in a table in a single shape. The next page of the same kind is collected without marking anything up again.', ru: 'Человек открывает страницу под своим логином, выделяет нужное, и данные ложатся в таблицу в едином виде. Следующая такая же страница собирается уже без разметки.' },
    audience: { en: 'Work where what is needed is on the screen and does not come out of it: an account behind a login, a report with no export.', ru: 'Работа, где нужное видно на экране, но наружу не отдаётся: кабинет за логином, отчёт без выгрузки, каталог по одной странице.' },
    base: 'extension',
    composition: [
      { en: 'markup by selecting', ru: 'разметка выделением' },
      { en: 'paging a list', ru: 'обход списка' },
      { en: 'spreadsheet and JSON', ru: 'таблица и JSON' },
      { en: 'run history', ru: 'история сборов' },
    ],
    flow: [
      {
        t: { en: 'Show it once what to take', ru: 'Один раз показать, что забирать' },
        d: { en: 'The extension remembers a place in the structure of the page rather than a spot on the screen.', ru: 'Расширение запоминает не место на экране, а место в структуре страницы, и разметка проверяется на второй такой же.' },
      },
      {
        t: { en: 'It collects under your open session', ru: 'Сбор идёт под уже открытой сессией' },
        d: { en: 'It reaches exactly what the person reaches, stores no passwords and opens no second session.', ru: 'Доступно ровно то, что доступно человеку, а пароли расширение не хранит и второй сессии не заводит.' },
      },
      {
        t: { en: 'It lands where it gets used', ru: 'Собранное уходит туда, где им пользуются' },
        d: { en: 'One shape throughout, so a second run joins the first, and every row carries its source address and the run time.', ru: 'Структура одна, поэтому вторая выгрузка ложится к первой, а в каждой строке стоит адрес источника и время прохода.' },
      },
    ],
    watch: [
      {
        t: { en: 'A fast pass gives itself away', ru: 'Быстрый обход выдаёт себя' },
        d: { en: 'Pace and pauses are set to ordinary reading speed: an export that runs all night costs less than a blocked account.', ru: 'Темп и паузы настраиваются под обычное чтение: выгрузка, идущая всю ночь, стоит дешевле заблокированного аккаунта.' },
      },
      {
        t: { en: 'An empty cell is not zero', ru: 'Пустая ячейка это не ноль' },
        d: { en: 'A missing field is a marked row and a stopped run, not a blank cell that becomes a zero in a report.', ru: 'Ненайденное поле это отметка и остановка сбора, а не пустая клетка, которая через месяц попадёт в отчёт нулём.' },
      },
      {
        t: { en: 'The browser is the boundary', ru: 'Браузер это граница' },
        d: { en: 'One-off and moderate volumes are an extension, regular collection on a schedule is a server, and the second costs different money.', ru: 'Разовые и средние объёмы это расширение, регулярный сбор по расписанию это сервер, и второе стоит других денег.' },
      },
    ],
    metrics: [
      { en: 'pages collected in one run', ru: 'страниц собрано за один проход' },
      { en: 'rows that need fixing by hand', ru: 'строк, требующих ручной правки' },
      { en: 'fields not found on a page', ru: 'полей, не найденных на странице' },
      { en: 'time from a page to a finished export', ru: 'время от страницы до готовой выгрузки' },
    ],
    faq: [
      {
        q: { en: 'How is this different from a parser on a server?', ru: 'Чем это отличается от парсера на сервере?' },
        a: { en: 'The collection happens in your browser, under your session and on your press, so it reaches what you reach. Regular collection with nobody present is a different system with its own server.', ru: 'Сбор идёт в вашем браузере, под вашей сессией и по вашему нажатию, поэтому доступно то, что доступно вам. Регулярный сбор без человека это другая система, со своим сервером.' },
      },
      {
        q: { en: 'Is this legal?', ru: 'Это законно?' },
        a: { en: 'Reading a public page generally is. An account behind a login has terms the person accepts on registering, and personal data we do not collect at all. We read the terms before the estimate.', ru: 'Публичную страницу читать как правило можно. У закрытого кабинета есть условия, которые человек принимает при регистрации, а персональные данные мы не собираем вовсе. Условия источников читаем до сметы.' },
      },
      {
        q: { en: 'What happens when a site changes its layout?', ru: 'Что будет, когда сайт поменяет вёрстку?' },
        a: { en: 'The markup stops matching and the extension says so on the first page rather than filling empty cells. Usually you re-mark it by the same selecting, and a repair is inside support.', ru: 'Разметка перестанет совпадать, и расширение скажет об этом на первой же странице, а не наполнит пустые ячейки. Обычно переразметить можно самому тем же выделением, а починка входит в сопровождение.' },
      },
    ],
    stack: [
      { t: { en: 'Extension', ru: 'Расширение' }, items: ['TypeScript', 'React', 'Chrome Manifest V3'] },
      { t: { en: 'Parsing and storage', ru: 'Разбор и хранение' }, items: ['Node.js', 'PostgreSQL', 'S3'] },
      { t: { en: 'Checks and operations', ru: 'Проверки и эксплуатация' }, items: ['Playwright', 'Docker', 'Grafana'] },
    ],
    notIncluded: [
      { en: 'paid subscriptions to the sources', ru: 'платные подписки на источники' },
      { en: 'server and storage, if collection goes to a database', ru: 'сервер и хранилище, если собранное идёт в базу' },
      { en: 'AI model calls for unstructured descriptions', ru: 'обращения к AI-модели при разборе описаний' },
      { en: 'a Chrome Web Store developer account', ru: 'аккаунт разработчика в Chrome Web Store' },
    ],
  },
]

/** Used by both locales' `[slug]` routes and by `generateStaticParams`. */
export function solutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
