import type { LS } from './labData'

/* =============================================================================
   Useful things: tools we point people at.

   WHAT MAKES THIS WORTH HAVING RATHER THAN BEING A LINK DUMP. Every entry here
   was opened and read before it was written down. Anybody can paste forty URLs;
   what takes the afternoon is the third sentence of each description, the one
   naming the fact that decides whether you would actually pick the thing.

   EVERY DESCRIPTION IS THE SAME SHAPE, and that is a rule rather than a habit:

     1. what it is, in plain words
     2. what it is for, the job it actually does
     3. the one fact that decides it: a limit, a licence, a dependency, a price
        that is not what it looks like

   A list where one entry gets three sentences and the next gets a slogan reads
   as a list somebody lost interest in halfway down. The third sentence is where
   the value is: «free to 1 000 calls a month, public repositories only» is the
   line a reader would otherwise spend ten minutes finding.

   THE PRICE IS A CHIP IN THE CORNER, not a labelled block. It is the first thing
   scanned and the last thing that needs a heading over it, and four words in the
   corner of every card lets a reader compare nine of them without reading one.

   ONE ENTRY WAS DROPPED IN REVIEW AND THE REASON IS RECORDED so it is not
   quietly added back: a catalogue of design systems extracted from named
   companies' live sites and published for coding agents to reproduce, with no
   licence, no terms and no pricing anywhere on it. Genuinely useful, and
   recommending it from an engineering studio reads as endorsing lifting a named
   brand's identity into client work.

   THE ICONS ARE LOCAL COPIES in `public/images/useful`, fetched once. Hotlinking
   other people's favicons would put a third-party request on our page per card
   and break quietly the day any of them moves a path. Worth knowing if you add
   one: a site that serves its app shell for every unknown path answers a favicon
   request with 200 and HTML, so check the content type and not the status.
   ========================================================================== */

export type UsefulGroup =
  | 'design' | 'reference' | 'skills' | 'ai' | 'media'
  | 'host' | 'data' | 'monitor' | 'backup' | 'devtools' | 'seo' | 'business'

export const USEFUL_GROUPS: { key: UsefulGroup; title: LS; lead: LS }[] = [
  {
    key: 'design',
    title: { en: 'Design and frontend', ru: 'Дизайн и фронтенд' },
    lead: {
      en: 'What a page is built out of when nobody is drawing it from scratch.',
      ru: 'То, из чего собирается страница, когда её не рисуют с нуля.',
    },
  },
  {
    key: 'reference',
    title: { en: 'Reference, and other people’s work', ru: 'Референсы и чужая работа' },
    lead: {
      en: 'Everything in this block reproduces something somebody else made. That is a rights question before it is a technical one, and the answer differs between reading a competitor’s A/B test and shipping their markup, so each card says which of the two it is.',
      ru: 'Всё в этом блоке воспроизводит чужую работу. Это вопрос прав раньше, чем технический, и ответ разный, когда вы читаете чужой A/B-тест и когда выкладываете чужую вёрстку, поэтому на каждой карточке сказано, что именно из двух.',
    },
  },
  {
    key: 'skills',
    title: { en: 'Skills and prompts for agents', ru: 'Скиллы и промпты для агентов' },
    lead: {
      en: 'Instructions a coding agent reads before it starts, so it arrives with a direction instead of a template.',
      ru: 'Инструкции, которые кодовый агент читает до начала работы, чтобы прийти с решением, а не с шаблоном.',
    },
  },
  {
    key: 'ai',
    title: { en: 'AI: models, agents, context', ru: 'AI: модели, агенты, контекст' },
    lead: {
      en: 'What a coding agent reads before it writes, and what you build on when the agent is the product.',
      ru: 'То, что кодовый агент читает до того, как писать, и то, на чём собирают продукт, когда агент и есть продукт.',
    },
  },
  {
    key: 'media',
    title: { en: 'Sound and video', ru: 'Звук и видео' },
    lead: {
      en: 'Making, converting and reading media. Two of these clone a voice, which needs the owner’s written permission before it needs a GPU.',
      ru: 'Создание, конвертация и разбор медиа. Два из них клонируют голос, а на это нужно письменное разрешение владельца раньше, чем видеокарта.',
    },
  },
  {
    key: 'host',
    title: { en: 'Where it runs', ru: 'Где это работает' },
    lead: {
      en: 'Servers and deploys. The bills here come from the provider and not from us, which is the same rule the price page states.',
      ru: 'Серверы и деплой. Счета отсюда приходят от провайдера, а не от нас, и это то же правило, что записано на странице цен.',
    },
  },
  {
    key: 'data',
    title: { en: 'Data and backend', ru: 'Данные и бэкенд' },
    lead: {
      en: 'The part you would otherwise write by hand before anything else can work.',
      ru: 'То, что иначе пришлось бы написать руками до того, как хоть что-то заработает.',
    },
  },
  {
    key: 'monitor',
    title: { en: 'Monitoring', ru: 'Мониторинг' },
    lead: {
      en: 'Finding out something is broken from a machine rather than from a client.',
      ru: 'Узнавать, что что-то сломалось, от машины, а не от клиента.',
    },
  },
  {
    key: 'backup',
    title: { en: 'Backups', ru: 'Резервные копии' },
    lead: {
      en: 'Three copies, two kinds of media, one off site. And a restore checked on a schedule rather than on the day of the fire.',
      ru: 'Три копии, два носителя, одна вне площадки. И восстановление, проверенное по расписанию, а не в день пожара.',
    },
  },
  {
    key: 'devtools',
    title: { en: 'Running agents and servers', ru: 'Работа с агентами и серверами' },
    lead: {
      en: 'Several agents at once without losing track of which one changed what, and the machines they run on.',
      ru: 'Несколько агентов сразу, не теряя, кто из них что поменял, и машины, на которых это крутится.',
    },
  },
  {
    key: 'seo',
    title: { en: 'SEO and documentation', ru: 'SEO и документация' },
    lead: {
      en: 'Checking what a thing actually does and whether anybody is finding it.',
      ru: 'Проверить, что штука делает на самом деле, и находит ли её кто-нибудь.',
    },
  },
  {
    key: 'business',
    title: { en: 'A company abroad', ru: 'Компания за рубежом' },
    lead: {
      en: 'Taking money from clients outside your own jurisdiction. Every figure below is a starting fee and none of them is the whole cost.',
      ru: 'Принимать деньги от клиентов за пределами своей юрисдикции. Каждая цифра ниже это стартовый взнос, и ни одна из них не полная стоимость.',
    },
  },
]

/* =============================================================================
   THE FACETS, AND WHY THEY ARE NOT A SECOND OPINION.

   Every value below was read out of the third sentence of the card it belongs
   to. That sentence is the only thing on this page that took an afternoon, and
   until now it was prose: a reader had to read sixty-four of them to find the
   four they must not put in a client build. The facets do not add a claim, they
   make a claim that was already written down findable.

   THE RULE THAT PRODUCED THEM: a flag is attached only when the card's own text
   says it, in words that can be quoted. Where the text is silent the flag is
   absent even when it is probably true, because a filter that is right about
   fifty-eight things and guessing about six is a filter nobody can trust. Two
   of these were decided against the obvious reading and both are worth knowing:

     21st.dev is NOT «not maintained», although its repository has had no commits
     in a year, because the same sentence says the hosted product keeps shipping.
     Filtering it out would hide something that works.

     Craftwork is NOT «not for client work», it is «licence unclear». The
     difference is whether money fixes it: Vercel's Hobby plan is a bar you pay
     your way past, Craftwork's clause stays whatever you pay. One rule, so the
     five entries that carry either flag can be read the same way.
   ========================================================================== */

/** What it costs, as a shape rather than a number. The number is in `price`. */
export type UsefulCost = 'free' | 'freemium' | 'paid' | 'tokens' | 'unclear'

/** Who runs it, which decides whose problem it is at three in the morning. */
export type UsefulRuns = 'hosted' | 'selfhost' | 'local' | 'both'

/**
 * The thing on the card that changes the answer.
 *
 * `noncommercial` and `licence` are deliberately two flags rather than one. The
 * first is a tier you can buy your way out of; the second is a restriction that
 * survives payment. A studio needs to tell those apart before it quotes.
 */
export type UsefulCaution =
  | 'licence' | 'noncommercial' | 'terms' | 'thirdparty'
  | 'meter' | 'abandoned' | 'consent' | 'hardware'

export interface UsefulTool {
  key: string
  group: UsefulGroup
  url: string
  /** Local icon path under /images/useful. */
  icon: string
  /** The product's own name for itself. */
  name: string
  /** What shape the price is. The figure itself stays in `price`. */
  cost: UsefulCost
  /** Whose machine it runs on. */
  runsWhere: UsefulRuns
  /** Empty for most. Never more than the card's own text supports. */
  cautions: UsefulCaution[]
  /** Four words at most. It renders as a chip in the card's top corner. */
  price: LS
  /** Three sentences, in the order the header block sets out. Never two, never
   *  four: the shape is what makes nine of these comparable at a glance. */
  what: LS
}

/* The words the filter puts on screen. Short on purpose: these are chips in a
   row, not sentences, and a chip that wraps to two lines stops being scannable.
   Both languages, like everything else here. */

export const USEFUL_COST_LABEL: Record<UsefulCost, LS> = {
  free: { en: 'free', ru: 'бесплатно' },
  freemium: { en: 'has a free tier', ru: 'есть бесплатный' },
  paid: { en: 'paid', ru: 'платно' },
  tokens: { en: 'you pay per use', ru: 'платите за расход' },
  unclear: { en: 'price unclear', ru: 'цена неясна' },
}

export const USEFUL_RUNS_LABEL: Record<UsefulRuns, LS> = {
  hosted: { en: 'they run it', ru: 'у них' },
  selfhost: { en: 'you run it', ru: 'поднимать у себя' },
  local: { en: 'runs on your machine', ru: 'работает локально' },
  both: { en: 'either way', ru: 'и так, и так' },
}

export const USEFUL_CAUTION_LABEL: Record<UsefulCaution, LS> = {
  licence: { en: 'licence unclear', ru: 'лицензия неясна' },
  noncommercial: { en: 'not for client work', ru: 'не для клиентской работы' },
  terms: { en: 'breaches somebody’s terms', ru: 'нарушает чужие условия' },
  thirdparty: { en: 'somebody else’s work', ru: 'чужая работа' },
  meter: { en: 'metered on top', ru: 'счётчик сверху' },
  abandoned: { en: 'not maintained', ru: 'не развивается' },
  consent: { en: 'needs consent', ru: 'нужно согласие' },
  hardware: { en: 'needs hardware', ru: 'нужно железо' },
}

/** The order the caution chips render in: commonest first, so the row reads as
 *  a frequency list rather than as an alphabet. Counted at render, never typed. */
export const USEFUL_CAUTION_ORDER: UsefulCaution[] = [
  'licence', 'meter', 'thirdparty', 'noncommercial', 'terms', 'abandoned', 'consent', 'hardware',
]

export const USEFUL_COST_ORDER: UsefulCost[] = ['free', 'freemium', 'paid', 'tokens', 'unclear']
export const USEFUL_RUNS_ORDER: UsefulRuns[] = ['hosted', 'local', 'selfhost', 'both']

/**
 * The explorer's own words.
 *
 * Here rather than in `labData` for the same reason the group titles are here:
 * nothing outside this page says any of them, and a string that names a facet
 * belongs beside the facet it names. `{n}` and `{w}` are the count and its
 * Russian form, filled at render from the array. Nothing here types a number.
 */
export const USEFUL_UI: Record<string, LS> = {
  indexTitle: { en: 'What is in here', ru: 'Что здесь есть' },
  /* `{n}` and `{w}` are filled from the array at render, because a number typed
     into a sentence is a number that goes wrong the first time somebody adds a
     block. This one already had: it read «Двенадцать блоков» while it was being
     written, which was true for about an hour. */
  indexLead: {
    en: '{n} blocks, and what each one is actually for. The page runs long, so this is the map.',
    ru: '{n} {w} и то, для чего каждый нужен на самом деле. Страница длинная, так что это карта.',
  },
  filters: { en: 'Filters', ru: 'Фильтры' },
  searchPh: { en: 'Find by name', ru: 'Найти по названию' },
  costLabel: { en: 'What it costs', ru: 'Сколько стоит' },
  runsLabel: { en: 'Where it runs', ru: 'Где работает' },
  cautionLabel: { en: 'What to watch for', ru: 'На что смотреть' },
  /* «Any» rather than «all»: the chip clears the axis, it does not select
     everything, and those read differently when the result count is beside it. */
  any: { en: 'any', ru: 'любая' },
  anyRuns: { en: 'anywhere', ru: 'где угодно' },
  reset: { en: 'Reset', ru: 'Сбросить' },
  found: { en: '{n} of {t}', ru: '{n} из {t}' },
  nothing: { en: 'Nothing matches', ru: 'Ничего не нашлось' },
  nothingHint: {
    en: 'Drop a filter, or clear them all and scroll instead.',
    ru: 'Снимите фильтр или сбросьте все и просто листайте.',
  },
  /* The caution tags are on the cards whether or not anything is filtered, and
     this line says so once, above the grid, rather than the tags having to
     explain themselves sixty-five times. */
  tagsNote: {
    en: 'The tag on a card is the thing in its third sentence that changes the answer.',
    ru: 'Метка на карточке это то из третьего предложения, что меняет решение.',
  },
}

/** The three Russian forms of «блок», for the index lead's `{w}`. English needs
 *  one and its string carries no slot, so the second replace is a no-op there,
 *  which is the same shape `SolutionsHub` uses for the same problem. */
export const USEFUL_BLOCK_WORD: Record<'one' | 'few' | 'many', string> = {
  one: 'блок',
  few: 'блока',
  many: 'блоков',
}

export const USEFUL: UsefulTool[] = [
  /* ------------------------------------------------------- design ------- */
  {
    key: 'motion',
    group: 'design',
    url: 'https://motion.dev/',
    icon: '/images/useful/motion.svg',
    name: 'Motion',
    cost: 'freemium',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'An animation library for React, JavaScript and Vue. It covers transforms, scroll, gestures, layout animation and spring physics, which is most of what a second library normally gets pulled in for. The library itself is MIT and free; the paid Motion+ adds examples, ready components and a visual transition editor, and nothing breaks without it.',
      ru: 'Библиотека анимации для React, JavaScript и Vue. Закрывает трансформации, скролл, жесты, анимацию раскладки и пружинную физику, то есть почти всё, ради чего обычно тянут вторую библиотеку. Сама библиотека под MIT и бесплатна, платный Motion+ добавляет примеры, готовые компоненты и визуальный редактор переходов, и без него ничего не ломается.',
    },
  },
  {
    key: 'originkit',
    group: 'design',
    url: 'https://www.originkit.dev/',
    icon: '/images/useful/originkit.ico',
    name: 'Originkit',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'free', ru: 'бесплатно' },
    what: {
      en: 'A library of animated components: copy the code into your own project, use it in Framer, or reach it through MCP. It is for the case where a page gets assembled from ready blocks rather than drawn from nothing. The components are free and whole templates are sold separately, which is what the template under this site is.',
      ru: 'Библиотека анимированных компонентов: код копируется в свой проект, используется во Framer или подключается через MCP. Нужна там, где страницу собирают из готовых блоков, а не рисуют с нуля. Компоненты бесплатны, а целые шаблоны продаются отдельно, и на одном из таких стоит этот сайт.',
    },
  },
  {
    key: '21st',
    group: 'design',
    url: 'https://21st.dev/',
    icon: '/images/useful/21st.svg',
    name: '21st.dev',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'from $6/mo', ru: 'от $6/мес' },
    what: {
      en: 'A registry of React components, marketing sections and shadcn themes that you copy into your own repository. It is for when you need one specific block rather than a whole kit. Browsing is free and so are two copies a day, after which it is a subscription; its public repository has had no commits in over a year while the hosted product keeps shipping.',
      ru: 'Реестр React-компонентов, готовых секций и тем shadcn, которые копируются к себе в проект. Нужен, когда нужен один конкретный блок, а не целый набор. Просмотр бесплатный и две копии в день тоже, дальше подписка, а публичный репозиторий проекта больше года без коммитов, хотя сам сервис развивается.',
    },
  },

  /* -------------------------------------------------------- infra ------- */
  {
    key: 'hetzner',
    group: 'host',
    url: 'https://www.hetzner.com/',
    icon: '/images/useful/hetzner.ico',
    name: 'Hetzner',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'priced on site', ru: 'цены на сайте' },
    what: {
      en: 'A German provider of dedicated and cloud servers, storage, load balancers and DNS. It is what you take when the job needs real hardware cheaply and for a long time, rather than autoscaling. Alongside the standard plans it runs an auction for used machines, where the same hardware costs noticeably less.',
      ru: 'Немецкий провайдер выделенных и облачных серверов, хранилищ, балансировщиков и DNS. Берут, когда задаче нужно настоящее железо дёшево и надолго, а не автомасштабирование. Кроме обычных тарифов у них есть аукцион на бывшие в употреблении машины, где то же железо стоит заметно меньше.',
    },
  },
  {
    key: 'railway',
    group: 'host',
    url: 'https://railway.com/',
    icon: '/images/useful/railway.png',
    name: 'Railway',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: 'from $5/mo + usage', ru: 'от $5/мес плюс расход' },
    what: {
      en: 'A platform that builds, runs and networks applications, databases and jobs straight from a Git repository. It takes the environment, the networking and the certificates off your hands, so nobody administers a server. The plan figures are a fee that includes the same amount in credits, and what you actually run is billed per second on top, so the monthly number is a floor rather than a price.',
      ru: 'Платформа, которая собирает, запускает и связывает приложения, базы и задачи прямо из Git-репозитория. Снимает окружение, сеть и сертификаты, поэтому сервером никто не занимается. Цифры тарифов это плата за план, включающая столько же кредитов, а реальное потребление считается посекундно сверху, так что месячная цифра это пол, а не цена.',
    },
  },
  {
    key: 'coolify',
    group: 'host',
    url: 'https://coolify.io/',
    icon: '/images/useful/coolify.png',
    name: 'Coolify',
    cost: 'freemium',
    runsWhere: 'both',
    cautions: [],
    price: { en: 'free self-hosted', ru: 'бесплатно на своём' },
    what: {
      en: 'An open-source platform for self-hosting: sites, databases and ready services deploy onto your own server in a couple of clicks. It replaces Vercel, Heroku, Netlify and Railway for anyone who would rather not pay somebody else’s rate for traffic and compute. On your own server it is free forever; their hosted version starts at USD 5 a month for two servers.',
      ru: 'Открытая платформа для селф-хостинга: сайты, базы и готовые сервисы разворачиваются на вашем сервере в пару кликов. Заменяет Vercel, Heroku, Netlify и Railway тем, кто не хочет платить за трафик и вычисления по чужому тарифу. На своём сервере бесплатна навсегда, их собственный хостинг стоит от USD 5 в месяц за два сервера.',
    },
  },

  /* ----------------------------------------------------------- ai ------- */
  {
    key: 'context7',
    group: 'ai',
    url: 'https://context7.com/',
    icon: '/images/useful/context7.ico',
    name: 'Context7',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'free to 1 000/mo', ru: 'бесплатно до 1000/мес' },
    what: {
      en: 'A service that feeds current library and framework documentation into LLMs and AI code editors over MCP. It exists because a model knows a library as of its training date rather than as of today, which is where most confidently wrong code comes from. Free to 1 000 calls a month and public repositories only, and it is a hosted service, so an agent notices immediately when it is down.',
      ru: 'Сервис, который подаёт актуальную документацию по библиотекам и фреймворкам в LLM и AI-редакторы кода через MCP. Существует потому, что модель знает библиотеку на дату своего обучения, а не на сегодня, и именно отсюда берётся уверенно неверный код. Бесплатно до 1000 обращений в месяц и только по публичным репозиториям, а поскольку сервис хостируемый, его недоступность агент замечает сразу.',
    },
  },
  {
    key: 'mcpservers',
    group: 'ai',
    url: 'https://mcpservers.org/',
    icon: '/images/useful/mcpservers.png',
    name: 'Awesome MCP Servers',
    cost: 'free',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'free', ru: 'бесплатно' },
    what: {
      en: 'A directory of Model Context Protocol servers, official and community, for Claude, Codex, Cursor and other agents. It is where you look before writing an integration that already exists. It is not a neutral index: paid placements sit inline among the ordinary entries under a sponsor label.',
      ru: 'Каталог серверов Model Context Protocol, официальных и community, для Claude, Codex, Cursor и других агентов. Туда идут перед тем, как писать интеграцию, которая уже написана. Индекс не нейтральный: платные размещения стоят вперемешку с обычными записями под пометкой sponsor.',
    },
  },
  {
    key: 'dify',
    group: 'ai',
    url: 'https://github.com/langgenius/dify',
    icon: '/images/useful/dify.svg',
    name: 'Dify',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: ['licence'],
    price: { en: 'free self-hosted', ru: 'бесплатно на своём' },
    what: {
      en: 'A platform for building LLM applications: agentic workflows, RAG pipelines, prompt management and monitoring in one workspace. It is what a prototype moves onto when real users are about to see it and somebody needs observability. The licence is not a standard open-source one but Apache 2.0 with conditions on offering it as a multi-tenant service and on keeping Dify branding.',
      ru: 'Платформа для сборки LLM-приложений: агентные воркфлоу, RAG-пайплайны, управление промптами и мониторинг в одном месте. На неё переезжает прототип, когда его вот-вот увидят живые пользователи и нужна наблюдаемость. Лицензия не стандартная открытая, а Apache 2.0 с условиями про мультитенантный сервис и сохранение брендинга Dify.',
    },
  },

  /* --------------------------------------------------------- host ------- */
  {
    key: 'vercel',
    group: 'host',
    url: 'https://vercel.com/',
    icon: '/images/useful/vercel.ico',
    name: 'Vercel',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['noncommercial', 'meter'],
    price: { en: 'free personal, $20/seat', ru: 'личное бесплатно, $20 за место' },
    what: {
      en: 'Hosting from the company that develops Next.js: you connect a repository and every push is built and served from their CDN, with a preview address per branch. It is what a Next.js application deploys to without anybody writing configuration by hand. The free Hobby plan is non-commercial under their own terms, so client work starts at USD 20 per seat, and traffic past the allowance is billed by usage rather than capped.',
      ru: 'Хостинг от компании, которая делает Next.js: репозиторий подключается, и каждый пуш собирается и отдаётся с их CDN, с отдельным адресом предпросмотра на ветку. На него приложение на Next.js выкатывается без единой строки конфигурации руками. Бесплатный план Hobby по их же условиям некоммерческий, поэтому клиентская работа начинается с USD 20 за место, а трафик сверх пакета считается по факту, а не упирается в потолок.',
    },
  },

  /* --------------------------------------------------------- data ------- */
  {
    /* THE NAME FIELD SAYS «RapidAPI» AND THE SITE NO LONGER DOES, which is a
       deliberate exception to «the product's own name for itself».
       rapidapi.com now opens as Nokia API Hub. But the domain, the
       `X-RapidAPI-Key` header, docs.rapidapi.com and its own footer all still
       say RapidAPI, and that is the word somebody scanning this list will be
       looking for. So the card is filed under the name people know and the
       rename is the first thing the description says, which is the way round
       that leaves both facts findable.

       The URL is `/hub` rather than the bare domain: the domain is a splash
       page with four sentences on it, and the marketplace is at /hub. */
    key: 'rapidapi',
    group: 'data',
    url: 'https://rapidapi.com/hub',
    /* Their favicon.ico is a PNG. Saved by what the magic bytes say rather than
       by what the URL claims, which is the trap this file's header warns about
       and the second time it has been hit. */
    icon: '/images/useful/rapidapi.png',
    name: 'RapidAPI',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['meter', 'thirdparty'],
    price: { en: 'per API, plus bandwidth', ru: 'цена API плюс трафик' },
    what: {
      en: 'A marketplace of other people’s HTTP APIs behind one account and one key, which now runs as Nokia API Hub and opens by saying it was previously known as Rapid. It is for renting a piece of data or a service you would otherwise build or negotiate for: you take a provider’s tier, try the endpoint in the playground and paste the generated snippet in. Its own terms leave the contract with whoever listed the API rather than with the platform, make that provider alone answerable for support, product liability and intellectual property, and reserve the right but not the obligation to check a listing at all.',
      ru: 'Витрина чужих HTTP-API под одним аккаунтом и одним ключом; теперь она работает как Nokia API Hub и первой же строкой сообщает, что раньше называлась Rapid. Нужна, чтобы арендовать данные или сервис, которые иначе пришлось бы писать самому или выторговывать у владельца: берёте тариф поставщика, пробуете вызов в песочнице и вставляете готовый сниппет. Её собственные условия оставляют договор с тем, кто выложил API, а не с площадкой, возлагают поддержку, ответственность за продукт и за чужие права на одного поставщика и оставляют площадке право, но не обязанность вообще проверять листинг.',
    },
  },
  {
    key: 'supabase',
    group: 'data',
    url: 'https://supabase.com/',
    icon: '/images/useful/supabase.png',
    name: 'Supabase',
    cost: 'freemium',
    runsWhere: 'both',
    cautions: [],
    price: { en: 'free tier, then $25/mo', ru: 'есть бесплатный, дальше $25/мес' },
    what: {
      en: 'A hosted Postgres that raises a REST and realtime API straight from your schema, with auth, file storage and edge functions in the same project. It replaces the backend you would otherwise write before a client can see anything at all. The stack is Apache 2.0 and can be self-hosted, but a free project is paused after a week without traffic, so anything a client will actually open starts at USD 25 a month.',
      ru: 'Хостируемый Postgres, который сам поднимает REST и realtime API прямо из вашей схемы, плюс авторизация, файлы и edge-функции в том же проекте. Заменяет тот бэкенд, который иначе пришлось бы написать до того, как клиент вообще что-то увидит. Стек под Apache 2.0 и разворачивается у себя, но бесплатный проект засыпает после недели без трафика, поэтому всё, что клиент будет реально открывать, начинается с USD 25 в месяц.',
    },
  },
  {
    key: 'pocketbase',
    group: 'data',
    url: 'https://pocketbase.io/',
    icon: '/images/useful/pocketbase.svg',
    name: 'PocketBase',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free, MIT, self-hosted', ru: 'бесплатно, MIT, у себя' },
    what: {
      en: 'One Go binary holding a SQLite database, a REST API, auth with OAuth2 providers, file storage and an admin panel. You put it on a server and the backend exists; it also imports as a Go package when you need routes of your own. It is pre-1.0 with no backward-compatibility promise, and the embedded SQLite means one instance rather than a cluster, which makes it right for an internal tool or an MVP and wrong for anything that has to scale out.',
      ru: 'Один бинарник на Go, внутри которого база SQLite, REST API, авторизация с OAuth2, файловое хранилище и админка. Кладётся на сервер, и бэкенд уже есть, а при необходимости подключается как Go-пакет и дополняется своими маршрутами. Версия до 1.0 и обратная совместимость не обещана, а встроенная SQLite означает один экземпляр, а не кластер, поэтому это верный выбор для внутреннего инструмента или MVP и неверный для того, что должно масштабироваться вширь.',
    },
  },
  {
    key: 'listmonk',
    group: 'data',
    url: 'https://listmonk.app/',
    icon: '/images/useful/listmonk.svg',
    name: 'listmonk',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: ['licence'],
    price: { en: 'free, AGPLv3, self-hosted', ru: 'бесплатно, AGPLv3, у себя' },
    what: {
      en: 'A self-hosted mailing list manager: subscribers, segmentation in SQL, campaigns from templates, sent through your own SMTP provider. It does the list-keeping and the delivery bookkeeping a hosted service does, on your server and with no per-subscriber pricing. It needs Postgres and a working SMTP relay, and it sends the mail without solving deliverability, so SPF, DKIM and sender reputation stay your work.',
      ru: 'Менеджер рассылок на своём сервере: подписчики, сегментация на SQL, кампании из шаблонов, отправка через ваш SMTP. Делает ту же работу по ведению списков и учёту доставки, что и хостируемый сервис, но у вас и без оплаты за каждого подписчика. Нужны Postgres и рабочий SMTP-релей, и он отправляет письма, но не решает доставляемость: SPF, DKIM и репутация отправителя остаются вашей заботой.',
    },
  },

  /* ------------------------------------------------------ monitor ------- */
  {
    key: 'sentry',
    group: 'monitor',
    url: 'https://sentry.io/',
    icon: '/images/useful/sentry.ico',
    name: 'Sentry',
    cost: 'freemium',
    runsWhere: 'both',
    cautions: ['licence'],
    price: { en: 'free tier, from $26/mo', ru: 'есть бесплатный, дальше от $26/мес' },
    what: {
      en: 'Error and performance monitoring: an SDK ships exceptions, traces and session replays, and Sentry groups them into issues carrying the stack trace, the release and the commit. It answers which deploy broke what, for whom and how often. Its licence is the Functional Source License rather than an open-source one: self-hosting is free and internal use is allowed, and each release only becomes Apache 2.0 two years after it ships.',
      ru: 'Мониторинг ошибок и производительности: SDK отправляет исключения, трассы и записи сессий, а Sentry собирает их в issues со стектрейсом, релизом и коммитом. Отвечает на вопрос, какой выкат что сломал, у кого и как часто. Лицензия у него Functional Source License, а не открытая: разворачивать у себя и пользоваться внутри можно бесплатно, а каждый релиз становится Apache 2.0 только через два года после выхода.',
    },
  },
  {
    key: 'glitchtip',
    group: 'monitor',
    url: 'https://glitchtip.com/',
    icon: '/images/useful/glitchtip.ico',
    name: 'GlitchTip',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free to self-host', ru: 'бесплатно у себя' },
    what: {
      en: 'An error tracker that speaks the Sentry protocol, so existing Sentry SDKs point at it by changing a URL and nothing else. It is the way off a per-event bill when the volume of errors is what costs the money. It is MIT and free to run yourself, the project asks a suggested USD 5 per user a month, and it covers error tracking and uptime rather than everything Sentry does.',
      ru: 'Трекер ошибок, говорящий по протоколу Sentry, поэтому существующие SDK переключаются на него сменой адреса и больше ничем. Это способ уйти от счёта за события, когда деньги начинает стоить сам их объём. Лицензия MIT и держать у себя бесплатно, проект просит USD 5 за пользователя в месяц как добровольный взнос, и покрывает он отслеживание ошибок и доступности, а не всё то, что делает Sentry.',
    },
  },
  {
    key: 'umami',
    group: 'monitor',
    url: 'https://umami.is/',
    icon: '/images/useful/umami.ico',
    name: 'Umami',
    cost: 'freemium',
    runsWhere: 'both',
    cautions: [],
    price: { en: 'free tier, from $20/mo', ru: 'есть бесплатный, дальше от $20/мес' },
    what: {
      en: 'Web analytics counting visits, sources and conversions without cookies and without collecting personal data. It is the answer when a full analytics suite is more than the question needs and a cookie banner is a cost of its own. It is MIT and self-hostable, and their hosted version has a free tier with paid plans above it.',
      ru: 'Веб-аналитика, которая считает визиты, источники и конверсии без cookies и без сбора персональных данных. Ответ на случай, когда полноценный аналитический комбайн больше, чем нужно вопросу, а баннер про cookies сам по себе стоит денег. Лицензия MIT, разворачивается у себя, а у их хостинга есть бесплатный уровень и платные планы выше.',
    },
  },
  {
    key: 'uptimekuma',
    group: 'monitor',
    url: 'https://github.com/louislam/uptime-kuma',
    icon: '/images/useful/uptimekuma.png',
    name: 'Uptime Kuma',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'A self-hosted uptime monitor: it polls sites, APIs and containers on a schedule and alerts through Telegram, email and about ninety other channels. It is the cheapest way to hear about a failure from a machine rather than from a client. There is no hosted option, so somebody has to run and patch it, and if it sits on the same server it watches then it dies with it.',
      ru: 'Монитор доступности на своём сервере: по расписанию опрашивает сайты, API и контейнеры и шлёт оповещения в Telegram, почту и ещё примерно девяносто каналов. Самый дешёвый способ узнать о падении от машины, а не от клиента. Хостируемого варианта нет, поэтому кто-то должен его держать и обновлять, а если он стоит на том же сервере, за которым следит, то умрёт вместе с ним.',
    },
  },

  /* ------------------------------------------------------- backup ------- */
  {
    key: 'restic',
    group: 'backup',
    url: 'https://github.com/restic/restic',
    icon: '/images/useful/restic.png',
    name: 'restic',
    cost: 'free',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, BSD 2-Clause', ru: 'бесплатно, BSD 2-Clause' },
    what: {
      en: 'Encrypted incremental backups to another server, to S3 or to any cloud, with deduplication built in. It is the engine rather than the interface: everything happens from the command line and on a schedule you write yourself. Its repository format is incompatible with Kopia, so this is a choice of camp made once rather than a tool swapped later.',
      ru: 'Шифрованные инкрементальные копии на другой сервер, в S3 или в любое облако, с дедупликацией из коробки. Это движок, а не интерфейс: всё делается из командной строки и по расписанию, которое пишете вы. Формат его хранилища несовместим с Kopia, поэтому это выбор лагеря один раз, а не инструмент, который потом меняют.',
    },
  },
  {
    key: 'backrest',
    group: 'backup',
    url: 'https://github.com/garethgeorge/backrest',
    icon: '/images/useful/backrest.jpg',
    name: 'Backrest',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: ['licence'],
    price: { en: 'free, GPL-3.0', ru: 'бесплатно, GPL-3.0' },
    what: {
      en: 'A web panel on top of restic: schedules, the status of every backup, notifications when one fails, and restores you can start from a browser. It is not a backup tool, it is what turns restic into a service somebody can actually operate. It runs restic underneath and inherits that choice of format, and GPL-3.0 is fine to use and a question the moment you want to bundle it into something you sell.',
      ru: 'Веб-панель поверх restic: расписания, статус каждой копии, уведомления о неудачных и восстановление, которое запускается из браузера. Это не бэкап-инструмент, а то, что превращает restic в сервис, которым реально можно управлять. Внутри работает restic, и выбор формата наследуется, а лицензия GPL-3.0 не мешает пользоваться и становится вопросом в тот момент, когда это захочется встроить в то, что вы продаёте.',
    },
  },
  {
    key: 'kopia',
    group: 'backup',
    url: 'https://github.com/kopia/kopia',
    icon: '/images/useful/kopia.png',
    name: 'Kopia',
    cost: 'free',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, Apache-2.0', ru: 'бесплатно, Apache-2.0' },
    what: {
      en: 'A backup tool with its own engine, its own web interface and integrity checks in one package. It solves the same problem restic does and the difference is the packaging: one box instead of an engine plus a panel. Its repository format is incompatible with restic, so pick the assembled one or the constructor and do not plan on moving between them.',
      ru: 'Бэкап-инструмент со своим движком, своим веб-интерфейсом и проверками целостности в одной поставке. Решает ту же задачу, что и restic, а разница в сборке: одна коробка вместо движка плюс панель. Формат хранилища несовместим с restic, поэтому выбирают либо готовую коробку, либо конструктор, и на переезд между ними рассчитывать не стоит.',
    },
  },

  /* ----------------------------------------------------------- ai ------- */
  {
    key: 'anythingllm',
    group: 'ai',
    url: 'https://github.com/Mintplex-Labs/anything-llm',
    icon: '/images/useful/anythingllm.png',
    name: 'AnythingLLM',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free self-hosted', ru: 'бесплатно у себя' },
    what: {
      en: 'A self-hosted workspace putting RAG, agent workflows and document management in one application, for teams building internal tools on their own data. It is what you reach for when the documents must not leave your infrastructure. It is MIT, and self-hosted installations send anonymous telemetry by default, which is one environment variable to turn off and worth knowing before promising a client otherwise.',
      ru: 'Рабочее пространство на своём сервере, объединяющее RAG, агентные сценарии и работу с документами в одном приложении, для команд, которые строят внутренние инструменты на своих данных. Берут, когда документы не должны покидать вашу инфраструктуру. Лицензия MIT, а установки у себя по умолчанию шлют анонимную телеметрию: выключается одной переменной окружения, и знать об этом стоит до того, как обещать клиенту обратное.',
    },
  },
  {
    key: 'sim',
    group: 'ai',
    url: 'https://github.com/simstudioai/sim',
    icon: '/images/useful/sim.svg',
    name: 'Sim',
    cost: 'freemium',
    runsWhere: 'both',
    cautions: [],
    price: { en: 'free self-host, cloud from $25/mo', ru: 'бесплатно у себя, облако от $25/мес' },
    what: {
      en: 'A visual builder for agent workflows: pipelines are drawn as executable graphs and a built-in assistant can generate or change them for you. Its execution tracing is what makes a long chain debuggable instead of mysterious. It is Apache 2.0 and genuinely free to self-host, while their own hosted version is a subscription.',
      ru: 'Визуальный конструктор агентных сценариев: пайплайны рисуются исполняемыми графами, а встроенный помощник может сам их сгенерировать или поправить. Трассировка выполнения и есть то, что делает длинную цепочку отлаживаемой, а не загадочной. Лицензия Apache 2.0 и разворачивать у себя действительно бесплатно, а их собственный хостинг это подписка.',
    },
  },

  /* ----------------------------------------------------- devtools ------- */
  {
    key: 'onorca',
    group: 'devtools',
    url: 'https://www.onorca.dev/',
    icon: '/images/useful/onorca.ico',
    name: 'Orca',
    cost: 'free',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'An editor for running Codex, Claude and other coding agents in parallel, each in a branch of its own. It exists because two agents in one working tree fight over the same files, which is a problem you meet on the second agent rather than the first. It is MIT and made by a commercial company, and the download site and the source repository are different addresses.',
      ru: 'Редактор для параллельной работы Codex, Claude и других кодовых агентов, каждый в своей ветке. Существует потому, что два агента в одном рабочем каталоге дерутся за одни и те же файлы, и это проблема, с которой встречаются на втором агенте, а не на первом. Лицензия MIT, за проектом стоит коммерческая компания, а сайт загрузки и репозиторий с исходниками это разные адреса.',
    },
  },
  {
    key: 'paperclip',
    group: 'devtools',
    url: 'https://github.com/paperclipai/paperclip',
    icon: '/images/useful/paperclip.png',
    name: 'Paperclip',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free to self-host', ru: 'бесплатно у себя' },
    what: {
      en: 'An orchestration layer over a group of coding agents: it hands out work, keeps their state and gives one place to see what each of them is doing. It is for the point where you stop running one agent and start running several with overlapping tasks. It is open source and self-hosted, and the project describes itself in far larger terms than that, which is worth discounting before you evaluate it.',
      ru: 'Слой оркестрации над группой кодовых агентов: раздаёт работу, держит их состояние и даёт одно место, где видно, кто чем занят. Нужен в тот момент, когда вы перестаёте запускать одного агента и начинаете запускать несколько с пересекающимися задачами. Проект открыт и разворачивается у себя, а о себе говорит в куда более громких выражениях, и на это стоит сделать скидку до того, как его оценивать.',
    },
  },
  {
    key: 'roadmapsh',
    group: 'devtools',
    url: 'https://roadmap.sh/',
    icon: '/images/useful/roadmapsh.ico',
    name: 'roadmap.sh',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['licence'],
    price: { en: 'free tier, Pro $10/mo', ru: 'есть бесплатный, Pro $10/мес' },
    what: {
      en: 'Visual roadmaps showing what to learn in what order for backend, frontend, DevOps, AI and about forty other tracks. It is useful less for learning than for scoping: a fast way to see what a role actually consists of before hiring for it or quoting for it. It lives on GitHub with a very large number of stars and is not open source, because the licence is a custom personal-use one, so its material cannot be moved into yours.',
      ru: 'Наглядные карты того, что и в каком порядке учить для бэкенда, фронтенда, DevOps, AI и ещё примерно сорока направлений. Полезны не столько для учёбы, сколько для оценки: это быстрый способ увидеть, из чего реально состоит роль, до того как нанимать под неё или считать смету. Живёт на GitHub с очень большим числом звёзд и при этом не открытый проект: лицензия своя, только для личного использования, поэтому переносить материалы к себе нельзя.',
    },
  },

  /* ----------------------------------------------------- business ------- */
  {
    key: 'stripeatlas',
    group: 'business',
    url: 'https://stripe.com/atlas',
    icon: '/images/useful/stripe.ico',
    name: 'Stripe Atlas',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: '$500 once, $100/yr', ru: '$500 разово, $100/год' },
    what: {
      en: 'Registers a US company, gets the tax number, opens the bank account and issues the founder shares, from one form. It is the shortest route from an idea to being able to invoice a client in dollars. The USD 500 is the registration and not the whole cost: the Delaware franchise tax and the annual report recur every year, and it registers in Delaware only.',
      ru: 'Регистрирует американскую компанию, получает налоговый номер, открывает банковский счёт и выпускает доли основателей, всё из одной формы. Самый короткий путь от идеи до возможности выставить клиенту счёт в долларах. USD 500 это регистрация, а не полная стоимость: франшизный налог Делавэра и годовой отчёт повторяются каждый год, и регистрирует он только в Делавэре.',
    },
  },
  {
    key: 'doola',
    group: 'business',
    url: 'https://www.doola.com/start-business',
    icon: '/images/useful/doola.ico',
    name: 'doola',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: 'from $297/yr plus state fee', ru: 'от $297/год плюс пошлина' },
    what: {
      en: 'Company formation with the bookkeeping attached: registration, a registered agent, the tax number and accounting on an annual subscription. It is the option for somebody who would rather not keep the yearly obligations in their own head. The starting figure is the service alone with the state fee charged on top, and the higher tiers carry a permanently struck-through discount, which makes it a list price rather than an offer.',
      ru: 'Регистрация компании вместе с бухгалтерией: оформление, зарегистрированный агент, налоговый номер и учёт по годовой подписке. Вариант для тех, кто не хочет держать ежегодные обязанности в своей голове. Стартовая цифра это только услуга, пошлина штата платится сверху, а верхние тарифы показаны с постоянной перечёркнутой скидкой, то есть это прайс, а не предложение.',
    },
  },
  {
    key: 'firstbase',
    group: 'business',
    url: 'https://www.firstbase.io/',
    icon: '/images/useful/firstbase.png',
    name: 'Firstbase',
    cost: 'unclear',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'confirm the price', ru: 'цену подтверждать' },
    what: {
      en: 'Another company formation service: registration, a registered agent, the tax number and the bank account, with compliance handled afterwards. It is a direct alternative to the two above and is worth comparing against them rather than read on its own. Their own homepage and pricing page showed different figures on the same day, so treat any number there as something to confirm before paying.',
      ru: 'Ещё один сервис регистрации компаний: оформление, зарегистрированный агент, налоговый номер и банковский счёт, с последующим сопровождением. Прямая альтернатива двум предыдущим, и смотреть на неё стоит в сравнении с ними, а не отдельно. Их собственные главная страница и страница цен в один и тот же день показывали разные цифры, поэтому любое число оттуда стоит подтвердить до оплаты.',
    },
  },

  /* ---------------------------------------------------- design (more) --- */
  {
    key: 'craftwork',
    group: 'design',
    url: 'https://craftwork.design/',
    icon: '/images/useful/craftwork.ico',
    name: 'Craftwork',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['licence'],
    price: { en: 'Pro from $199 a year', ru: 'Pro от $199 в год' },
    what: {
      en: 'A paid marketplace for design assets: UI kits, illustrations, mockups, fonts, icons and templates for Figma, Framer and Webflow. It is for buying a finished asset rather than drawing it, one pack at a time or on an all-access subscription. These are commodity files, so anything from a pack can appear verbatim on a competitor site, and on every licence tier an asset may not be the main part of something you sell to a client as a product.',
      ru: 'Платный маркетплейс дизайн-ассетов: UI-киты, иллюстрации, мокапы, шрифты, иконки и шаблоны для Figma, Framer и Webflow. Нужен, чтобы купить готовое, а не рисовать, поштучно или по подписке с полным доступом. Это ширпотреб, поэтому что угодно из пака может дословно встретиться у конкурента, а по любому их тарифу ассет не может быть основной частью того, что вы продаёте клиенту как продукт.',
    },
  },
  {
    key: 'framer',
    group: 'design',
    url: 'https://www.framer.com/',
    icon: '/images/useful/framer.png',
    name: 'Framer',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'free tier, from $10/site', ru: 'есть бесплатный, от $10 за сайт' },
    what: {
      en: 'A hosted site builder where AI agents edit the canvas, the CMS and code components. It covers the whole path from layout to a live site, with hosting, CMS, SEO and A/B testing included. There is no code export and no self-hosting: the published site depends on their backend for pre-rendering, images and fonts, so whatever is built there stays there.',
      ru: 'Хостируемый конструктор сайтов, где AI-агенты правят холст, CMS и кодовые компоненты. Закрывает весь путь от макета до живого сайта, вместе с хостингом, CMS, SEO и A/B-тестами. Экспорта кода и селф-хостинга нет: опубликованный сайт зависит от их бэкенда для пререндера, картинок и шрифтов, поэтому собранное там там и остаётся.',
    },
  },
  {
    key: 'unicorn',
    group: 'design',
    url: 'https://www.unicorn.studio/',
    icon: '/images/useful/unicorn.png',
    name: 'Unicorn Studio',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['noncommercial'],
    price: { en: 'free tier, $14/mo paid', ru: 'есть бесплатный, платный $14/мес' },
    what: {
      en: 'A browser editor for shader and WebGL effects that exports a 49kb JS embed, a video or JSON. It lets a designer build animated backgrounds reacting to scroll, hover and pointer without writing GLSL, then ship them into Framer, Webflow or their own app. The free tier carries their logo, caps video at 720p and comes with no commercial licence at all, so client work starts on the paid plan.',
      ru: 'Браузерный редактор шейдерных и WebGL-эффектов с экспортом в 49-килобайтный JS-эмбед, видео или JSON. Позволяет дизайнеру собрать анимированный фон, реагирующий на скролл, наведение и курсор, не написав ни строки GLSL, и отдать это во Framer, Webflow или своё приложение. На бесплатном тарифе стоит их логотип, видео режется до 720p и коммерческой лицензии нет вовсе, поэтому клиентская работа начинается с платного.',
    },
  },
  {
    key: 'brik',
    group: 'design',
    url: 'https://brik.space/',
    icon: '/images/useful/brik.png',
    name: 'Brik',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: 'free tier, then $15/mo', ru: 'есть бесплатный, дальше $15/мес' },
    what: {
      en: 'A hosted tool from Wix, marked beta, that turns a written prompt into a parameterised visual effect: a shader, kinetic type, a 3D scene or an animated logo, with the sliders you choose to expose. It is for handing a client a scoped control panel instead of a flat file they must send back for every edit. Work is metered in credits whose cost is only known after each action runs, and code export, embedding and removing their branding are all paid-only.',
      ru: 'Хостируемый инструмент от Wix, помеченный как бета, который превращает текстовый запрос в параметризованный эффект: шейдер, кинетическую типографику, 3D-сцену или анимированный логотип, с теми ручками, которые вы решите открыть. Нужен, чтобы отдать клиенту ограниченную панель управления вместо плоского файла, который он присылает обратно на каждую правку. Работа считается в кредитах, стоимость которых известна только после выполнения действия, а экспорт кода, встраивание и снятие их брендинга доступны только на платном.',
    },
  },
  {
    key: 'shadcnstudio',
    group: 'design',
    url: 'https://github.com/shadcnstudio/shadcn-studio',
    icon: '/images/useful/shadcnstudio.png',
    name: 'shadcn studio',
    cost: 'unclear',
    runsWhere: 'hosted',
    cautions: ['licence'],
    price: { en: 'licence is contradictory', ru: 'лицензия противоречива' },
    what: {
      en: 'A catalogue of ready blocks, themes and a theme editor built on top of shadcn/ui. It is for assembling an interface from prepared pieces rather than styling each primitive yourself. Its own licensing contradicts itself: the README advertises MIT while the licence file carries a Commons Clause forbidding redistribution of the components alone, bundled or ported, so what you may actually do with the output cannot be stated in one sentence.',
      ru: 'Каталог готовых блоков, тем и редактор тем поверх shadcn/ui. Нужен, чтобы собирать интерфейс из подготовленных кусков, а не оформлять каждый примитив вручную. Собственное лицензирование противоречит себе: README обещает MIT, а файл лицензии несёт Commons Clause, запрещающий распространять компоненты отдельно, в составе или портированными, поэтому что именно можно делать с результатом, одним предложением не сказать.',
    },
  },

  /* ------------------------------------------------------- reference --- */
  {
    key: 'abtestdesign',
    group: 'reference',
    url: 'https://abtest.design/',
    icon: '/images/useful/abtestdesign.png',
    name: 'abtest.design',
    cost: 'free',
    runsWhere: 'hosted',
    cautions: ['thirdparty'],
    price: { en: 'free, no account', ru: 'бесплатно, без регистрации' },
    what: {
      en: 'A directory of documented A/B tests from consumer apps: a before and after pair, the reported result, and a link to the write-up the number came from. It is for arguing a paywall or onboarding change with a precedent instead of a preference. Every figure is quoted from somebody else public post rather than measured here, and sample sizes and durations are absent, so it is a source of hypotheses to test rather than a benchmark to promise.',
      ru: 'Каталог разобранных A/B-тестов из потребительских приложений: пара «до и после», заявленный результат и ссылка на разбор, откуда взято число. Нужен, чтобы спорить о пейволле или онбординге прецедентом, а не вкусом. Каждая цифра процитирована из чужой публикации, а не измерена здесь, размеры выборок и сроки отсутствуют, поэтому это источник гипотез для проверки, а не ориентир, который можно обещать.',
    },
  },
  {
    key: 'refero',
    group: 'reference',
    url: 'https://styles.refero.design/',
    icon: '/images/useful/refero.png',
    name: 'Refero Styles',
    cost: 'unclear',
    runsWhere: 'hosted',
    cautions: ['thirdparty', 'licence'],
    price: { en: 'price not published', ru: 'цена не опубликована' },
    what: {
      en: 'A library of design systems extracted from live product websites and published as DESIGN.md files for coding agents to read. It is for handing an agent a described visual direction instead of describing one yourself. What it contains is other companies brand identities, tokens and typography reformatted for reproduction, and the site publishes no licence, no terms and no price, so treat it as reference and never as something to point at a client build.',
      ru: 'Библиотека дизайн-систем, снятых с живых продуктовых сайтов и опубликованных файлами DESIGN.md для кодовых агентов. Нужна, чтобы отдать агенту описанное визуальное направление, а не описывать его самому. Внутри чужие фирменные стили, токены и типографика, переоформленные под воспроизведение, а лицензии, условий и цены сайт не публикует, поэтому это референс и никогда не то, что направляют на клиентскую сборку.',
    },
  },
  {
    key: 'getdesignmd',
    group: 'reference',
    url: 'https://getdesign.md/',
    icon: '/images/useful/getdesignmd.svg',
    name: 'getdesign.md',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['thirdparty'],
    price: { en: 'free browsing, $99/mo pass', ru: 'просмотр бесплатно, доступ $99/мес' },
    what: {
      en: 'A catalogue of design systems and background packs written as DESIGN.md files for AI coders, with a paid all-access pass. It is sold as a way to match a style you like from any reference site. That is its own description of itself, so the same rights question applies as to anything else in this block, and the monthly pass buys access rather than any licence to the brands being described.',
      ru: 'Каталог дизайн-систем и наборов фонов, записанных файлами DESIGN.md для AI-кодеров, с платным полным доступом. Продаётся как способ повторить понравившийся стиль с любого референсного сайта. Это его собственное описание себя, поэтому вопрос прав здесь тот же, что и у всего в этом блоке, а месячный доступ покупает доступ, а не лицензию на описанные бренды.',
    },
  },
  {
    key: 'ditto',
    group: 'reference',
    url: 'https://www.ditto.site',
    icon: '/images/useful/ditto.ico',
    name: 'ditto',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['thirdparty'],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'An open pipeline that loads a public URL in a real browser and emits what rendered as a self-contained Next.js or Vite project, with tokens, fonts, breakpoints and hover states. It is for taking a live page and getting componentised code back instead of rebuilding the markup by hand. It is deterministic rather than model-driven, so runs repeat, and what it produces is a copy of whatever site it was pointed at, which its own README limits to targets you have the right to copy.',
      ru: 'Открытый конвейер, который открывает публичный адрес в настоящем браузере и отдаёт отрендеренное готовым проектом на Next.js или Vite, вместе с токенами, шрифтами, брейкпоинтами и состояниями наведения. Нужен, чтобы взять живую страницу и получить компонентный код, а не пересобирать вёрстку руками. Работает детерминированно, а не через модель, поэтому запуски повторяемы, и на выходе копия того сайта, на который его направили, что его же README ограничивает целями, которые вы вправе копировать.',
    },
  },
  {
    key: 'aiwebsitecloner',
    group: 'reference',
    url: 'https://github.com/JCodesMore/ai-website-cloner-template',
    icon: '/images/useful/aiwebsitecloner.png',
    name: 'ai-website-cloner',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['terms', 'thirdparty', 'abandoned'],
    price: { en: 'free, template', ru: 'бесплатно, шаблон' },
    what: {
      en: 'A template repository whose own description is to clone any website with one command. It scrapes a target page and rebuilds it as a local project for an AI coder to continue from. It is a thin template rather than a maintained tool, and using it as advertised breaches most target sites terms of use, which is the whole of what there is to know about it.',
      ru: 'Шаблонный репозиторий, чьё собственное описание звучит как «клонируй любой сайт одной командой». Снимает целевую страницу и пересобирает её локальным проектом, с которого продолжает AI-кодер. Это тонкий шаблон, а не поддерживаемый инструмент, и использование по назначению нарушает условия большинства целевых сайтов, и это всё, что о нём нужно знать.',
    },
  },

  /* ---------------------------------------------------------- skills --- */
  {
    key: 'tasteskill',
    group: 'skills',
    url: 'https://www.tasteskill.dev/',
    icon: '/images/useful/tasteskill.png',
    name: 'Taste Skill',
    cost: 'free',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'A set of open SKILL.md files you install into a coding agent so it infers a design direction from the brief instead of reaching for a template. It ships thirteen variants for specific jobs: brutalist, minimalist, soft, image to code, and a redesign audit pass. The default install is the version its own authors label experimental and say may change wording before a stable cut, so anything depending on exact output has to pin the previous one.',
      ru: 'Набор открытых файлов SKILL.md, которые ставятся в кодового агента, чтобы он выводил дизайн-направление из брифа, а не тянулся за шаблоном. Идёт с тринадцатью вариантами под конкретные задачи: брутализм, минимализм, мягкий стиль, картинка в код и проход-аудит для редизайна. По умолчанию ставится версия, которую авторы сами помечают как экспериментальную и обещают менять формулировки до стабильного среза, поэтому всё, что зависит от точного вывода, надо прибивать к предыдущей.',
    },
  },
  {
    key: 'impeccable',
    group: 'skills',
    url: 'https://impeccable.style/',
    icon: '/images/useful/impeccable.svg',
    name: 'Impeccable',
    cost: 'free',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, Apache 2.0', ru: 'бесплатно, Apache 2.0' },
    what: {
      en: 'A design skill for coding agents that adds commands like polish, distill and audit, plus deterministic rules detecting the visual tells of AI-generated frontends. It can iterate variants against a page running live in a browser rather than against a description of one. It reads the design system it enforces from DESIGN.md and PRODUCT.md in your repository, so without those two files it applies its own defaults instead of yours.',
      ru: 'Дизайнерский скилл для кодовых агентов, добавляющий команды вроде polish, distill и audit и набор детерминированных правил, которые ловят визуальные признаки сгенерированного фронтенда. Умеет перебирать варианты против страницы, работающей в живом браузере, а не против её описания. Дизайн-систему, которую он проверяет, он читает из DESIGN.md и PRODUCT.md в вашем репозитории, поэтому без этих двух файлов применит свои умолчания вместо ваших.',
    },
  },
  {
    key: 'sceneai',
    group: 'skills',
    url: 'https://sceneai.art/',
    icon: '/images/useful/sceneai.ico',
    name: 'SceneAI',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: '$29 or $49 a month', ru: '$29 или $49 в месяц' },
    what: {
      en: 'A paid library of AI prompts for landing page sections, with separate catalogues of animated backgrounds and gradients. You browse finished designs, copy the prompt behind one and paste it into an AI tool to reproduce the section. The cheaper plan is headed as unlimited access to all assets and the animated backgrounds and gradients are excluded from it, so read which plan covers what before paying.',
      ru: 'Платная библиотека промптов для секций лендинга, с отдельными каталогами анимированных фонов и градиентов. Вы смотрите готовые дизайны, копируете стоящий за ним промпт и вставляете в AI-инструмент, чтобы получить такую же секцию. Дешёвый тариф озаглавлен как безлимитный доступ ко всем ассетам, а анимированные фоны и градиенты в него не входят, поэтому что покрывает какой план, стоит прочитать до оплаты.',
    },
  },
  {
    key: 'scrollworld',
    group: 'skills',
    url: 'https://github.com/oso95/scroll-world',
    icon: '/images/useful/scrollworld.jpg',
    name: 'scroll-world',
    cost: 'tokens',
    runsWhere: 'local',
    cautions: ['meter'],
    price: { en: 'free skill, paid renders', ru: 'скилл бесплатно, рендеры платные' },
    what: {
      en: 'An installable agent skill that builds a landing page where scrolling scrubs a camera flight through AI-generated isometric scenes, shipping the stills, the clips and a scrub engine. It is for a promo page whose whole point is the motion. The skill is open but the pictures are not: it drives two paid CLIs and the README puts a six-scene 1080p chain at roughly USD 27, paid again on every re-render.',
      ru: 'Устанавливаемый скилл для агента, который собирает лендинг, где прокрутка проматывает полёт камеры через сгенерированные изометрические сцены, и отдаёт кадры, клипы и движок прокрутки. Нужен для промо-страницы, весь смысл которой в движении. Сам скилл открыт, а картинки нет: он гоняет два платных CLI, и README оценивает цепочку из шести сцен в 1080p примерно в USD 27, которые платятся заново при каждом перерендере.',
    },
  },
  {
    key: 'evoskill',
    group: 'skills',
    url: 'https://github.com/sentient-agi/EvoSkill',
    icon: '/images/useful/evoskill.png',
    name: 'EvoSkill',
    cost: 'tokens',
    runsWhere: 'local',
    cautions: ['meter'],
    price: { en: 'free, you pay tokens', ru: 'бесплатно, платите за токены' },
    what: {
      en: 'A framework that runs a coding agent over a benchmark, reads the attempts it failed and writes skill files and prompt rewrites aimed at those specific failures. It is for turning a general agent into one tuned to a narrow task set, keeping only the variants that score better on held-out data. It needs a benchmark you already own because generating one is still listed as unbuilt, and every iteration costs a full set of agent runs in model tokens.',
      ru: 'Фреймворк, который прогоняет кодового агента по бенчмарку, читает провалившиеся попытки и пишет файлы скиллов и переписанные промпты под эти конкретные провалы. Нужен, чтобы превратить общего агента в заточенного под узкий набор задач, оставляя только варианты, которые лучше на отложенной выборке. Ему нужен ваш собственный бенчмарк, потому что генерация своего до сих пор помечена как несделанная, а каждая итерация стоит полного прогона агента в токенах модели.',
    },
  },
  {
    key: 'aitmpl',
    group: 'skills',
    url: 'https://www.aitmpl.com/',
    icon: '/images/useful/aitmpl.ico',
    name: 'aitmpl',
    cost: 'free',
    runsWhere: 'hosted',
    cautions: ['thirdparty'],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'An online catalogue of ready templates, configurations, agents and commands for Claude Code. It is for finding a prepared configuration instead of writing one from scratch. A large part of the catalogue is other people work re-hosted, credited in its own README to Anthropic and several independent authors, so it is a place to discover a source rather than the source itself.',
      ru: 'Онлайн-каталог готовых шаблонов, конфигураций, агентов и команд для Claude Code. Нужен, чтобы найти готовую конфигурацию, а не писать свою с нуля. Значительная часть каталога это перезалитые чужие работы, что признано в его же README со ссылками на Anthropic и нескольких независимых авторов, поэтому это место, где находят первоисточник, а не сам первоисточник.',
    },
  },

  /* -------------------------------------------------------- ai (more) --- */
  {
    key: 'openagentplatform',
    group: 'ai',
    url: 'https://github.com/langchain-ai/open-agent-platform',
    icon: '/images/useful/openagentplatform.png',
    name: 'Open Agent Platform',
    cost: 'unclear',
    runsWhere: 'selfhost',
    cautions: ['abandoned'],
    price: { en: 'archived by the vendor', ru: 'архивирован вендором' },
    what: {
      en: 'A web interface over LangGraph that shows an agent execution as nodes and edges instead of hiding it, so routing, loops and multi-agent coordination can be steered without writing the graph. It was for building and running agents with the control flow visible. The repository is archived and read-only, and its own README opens by saying it is deprecated and recommending the vendor hosted builder instead, so it is here as history rather than as a choice.',
      ru: 'Веб-интерфейс поверх LangGraph, показывающий выполнение агента узлами и связями, а не пряча его, чтобы маршрутизацией, циклами и координацией нескольких агентов можно было управлять без написания графа. Служил для сборки и запуска агентов с видимым потоком выполнения. Репозиторий архивирован и доступен только для чтения, а его же README открывается словами о том, что проект устарел и рекомендуется хостируемый сборщик вендора, поэтому здесь он как история, а не как выбор.',
    },
  },
  {
    key: 'autoagent',
    group: 'ai',
    url: 'https://github.com/HKUDS/AutoAgent',
    icon: '/images/useful/autoagent.jpg',
    name: 'AutoAgent',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['abandoned'],
    price: { en: 'free, MIT', ru: 'бесплатно, MIT' },
    what: {
      en: 'A framework meant to take a goal written in plain language and do the planning, decomposition and execution itself, turning a prompt into a working set of agents. It was aimed at people who would rather describe an outcome than assemble a pipeline. Its last code commits are from October 2025 and its news section stops earlier than that while the page still presents the project as current, so treat it as a paper with a repository rather than something to build on.',
      ru: 'Фреймворк, который должен принимать цель, написанную обычными словами, и сам выполнять планирование, декомпозицию и исполнение, превращая запрос в работающий набор агентов. Задумывался для тех, кому проще описать результат, чем собирать пайплайн. Последние коммиты с кодом датируются октябрём 2025, а раздел новостей обрывается ещё раньше, при этом страница подаёт проект как актуальный, поэтому это скорее статья с репозиторием, чем то, на чём строят.',
    },
  },
  {
    key: 'huggingface',
    group: 'ai',
    url: 'https://huggingface.co/',
    icon: '/images/useful/huggingface.ico',
    name: 'Hugging Face',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['licence'],
    price: { en: 'free tier, PRO $9/mo', ru: 'есть бесплатный, PRO $9/мес' },
    what: {
      en: 'A hosting platform for machine learning models, datasets and demo apps, built on git repositories with large-file storage. You pull a model or dataset from it, publish your own, run a demo as a Space, or call the inference API that fronts several providers behind one token. Licensing is per repository rather than per platform, so a freely downloadable model can still be gated or barred from commercial use and has to be checked one by one.',
      ru: 'Платформа хостинга моделей машинного обучения, датасетов и демо-приложений, построенная на git-репозиториях с хранилищем больших файлов. Оттуда забирают модель или датасет, публикуют своё, запускают демо как Space или зовут inference API, за которым стоят несколько провайдеров под одним токеном. Лицензия здесь у каждого репозитория своя, а не общая для платформы, поэтому свободно скачиваемая модель может быть закрыта согласием или запрещена к коммерческому использованию, и проверять надо каждую.',
    },
  },
  {
    key: 'noiz',
    group: 'ai',
    url: 'https://noiz.ai/',
    icon: '/images/useful/noiz.ico',
    name: 'Noiz AI',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['noncommercial', 'consent'],
    price: { en: 'Lite $6, Pro $19', ru: 'Lite $6, Pro $19' },
    what: {
      en: 'A hosted text-to-speech service with voice cloning from a few seconds of audio, voice design from a prompt, and one-click dubbing into other languages. You paste text, pick a stock or cloned voice and get audio back, with sound effects and short video from the same account. Commercial use of the output is allowed only from the Pro tier upwards, so the cheap plan cannot be used for client work at all.',
      ru: 'Хостируемый сервис синтеза речи с клонированием голоса по нескольким секундам записи, созданием голоса по описанию и дубляжом в другие языки в одно нажатие. Вставляете текст, выбираете готовый или клонированный голос и получаете звук, а с того же аккаунта звуковые эффекты и короткое видео. Коммерческое использование результата разрешено только начиная с тарифа Pro, поэтому дешёвый план для клиентской работы не годится вовсе.',
    },
  },
  {
    key: 'scrapegraph',
    group: 'ai',
    url: 'https://github.com/ScrapeGraphAI/Scrapegraph-ai',
    icon: '/images/useful/scrapegraph.png',
    name: 'ScrapeGraphAI',
    cost: 'tokens',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'free, you pay tokens', ru: 'бесплатно, платите за токены' },
    what: {
      en: 'A Python library that builds a scraping pipeline as a graph of steps and uses a model to pull the fields out instead of CSS selectors written by hand. You pass a URL and a sentence naming the fields and get structured JSON, which survives markup changes that break a selector-based parser. It calls a model on every page, so the per-page token bill is what decides whether it beats a parser you write once, and telemetry is on until you turn it off.',
      ru: 'Python-библиотека, которая собирает пайплайн сбора данных графом шагов и вытаскивает поля моделью, а не написанными руками CSS-селекторами. Передаёте адрес и предложение с названиями нужных полей и получаете структурированный JSON, который переживает изменения вёрстки, ломающие парсер на селекторах. Модель вызывается на каждой странице, поэтому счёт за токены постранично и решает, выгоднее ли это парсера, написанного один раз, а телеметрия включена, пока её не выключат.',
    },
  },

  /* ----------------------------------------------------------- media --- */
  {
    key: 'ffmpeg',
    group: 'media',
    url: 'https://github.com/ffmpeg/ffmpeg',
    icon: '/images/useful/ffmpeg.png',
    name: 'FFmpeg',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['licence'],
    price: { en: 'free, licence set at build', ru: 'бесплатно, лицензия задаётся сборкой' },
    what: {
      en: 'A set of C libraries and command line tools for decoding, encoding, filtering and remuxing audio and video. It is what a project uses when it has to read arbitrary media, convert formats, cut or scale footage, pull audio out or inspect stream metadata. Its licence is decided by the build flags: LGPL by default, GPL the moment components like x264 are enabled, and not redistributable at all with nonfree parts, so the build has to be pinned and recorded rather than assumed.',
      ru: 'Набор библиотек на C и утилит командной строки для декодирования, кодирования, фильтрации и перепаковки аудио и видео. Это то, чем проект читает произвольные медиафайлы, конвертирует форматы, режет и масштабирует видео, вынимает звук и смотрит метаданные потоков. Лицензия определяется флагами сборки: по умолчанию LGPL, GPL в момент включения компонентов вроде x264 и вовсе не распространяемая с несвободными частями, поэтому сборку надо фиксировать и записывать, а не предполагать.',
    },
  },
  {
    key: 'whisperx',
    group: 'media',
    url: 'https://github.com/m-bain/whisperx',
    icon: '/images/useful/whisperx.png',
    name: 'WhisperX',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['licence', 'hardware'],
    price: { en: 'free, needs a GPU', ru: 'бесплатно, нужна видеокарта' },
    what: {
      en: 'A Python tool that wraps Whisper with batched inference, forced alignment against phoneme models and optional speaker labelling. It turns audio into a transcript with per-word timestamps and, with diarization on, an indication of who spoke each segment. The code is permissive but diarization depends on models sitting behind a token and a separate terms acceptance, so that half is a per-deployment credential rather than a dependency you bake into an image.',
      ru: 'Python-инструмент, оборачивающий Whisper пакетным выводом, принудительным выравниванием по фонемным моделям и необязательной разметкой говорящих. Превращает аудио в расшифровку с таймкодами по каждому слову, а с включённой диаризацией и с указанием, кто говорил в каждом фрагменте. Код под свободной лицензией, но диаризация зависит от моделей, закрытых токеном и отдельным принятием условий, поэтому эта половина это учётные данные под каждое развёртывание, а не зависимость, которую запекают в образ.',
    },
  },
  {
    key: 'voxcpm',
    group: 'media',
    url: 'https://github.com/OpenBMB/VoxCPM',
    icon: '/images/useful/voxcpm.png',
    name: 'VoxCPM',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['hardware', 'consent'],
    price: { en: 'free, needs a GPU', ru: 'бесплатно, нужна видеокарта' },
    what: {
      en: 'A text-to-speech model that generates speech as continuous representations rather than discrete tokens, across thirty languages, and can clone a voice from a reference recording or build one from a written description. It is for putting synthesis on your own hardware instead of a metered API. It is a two-billion-parameter model wanting roughly 8 GB of video memory, and cloning a voice is a consent question first: its own README forbids impersonation and asks that output be marked as generated.',
      ru: 'Модель синтеза речи, которая порождает звук непрерывными представлениями, а не дискретными токенами, работает на тридцати языках и умеет клонировать голос по образцу или собирать его по текстовому описанию. Нужна, чтобы поставить синтез на своё железо вместо API с поминутной оплатой. Это модель на два миллиарда параметров, которой нужно около 8 ГБ видеопамяти, а клонирование голоса это в первую очередь вопрос согласия: её же README запрещает выдавать себя за другого и просит помечать результат как сгенерированный.',
    },
  },
  {
    key: 'pika',
    group: 'media',
    url: 'https://pika.me',
    icon: '/images/useful/pika.png',
    name: 'Pika',
    cost: 'unclear',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'experiment, not a product', ru: 'эксперимент, а не продукт' },
    what: {
      en: 'A video generation service: the address redirects to an experimental page the vendor themselves banner as temporary rather than to a product. It is aimed at short generated clips in different languages. What is behind the link is an experiment the operator has not committed to keeping, so anything built on it is built on something with no stated lifetime.',
      ru: 'Сервис генерации видео: адрес перекидывает не на продукт, а на экспериментальную страницу, которую сам оператор помечает баннером как временную. Рассчитан на короткие сгенерированные ролики на разных языках. За ссылкой стоит эксперимент, который оператор не обязался поддерживать, поэтому всё, что на нём строится, строится на чём-то без заявленного срока жизни.',
    },
  },

  /* ------------------------------------------------------ host (more) --- */
  {
    key: 'digitalocean',
    group: 'host',
    url: 'https://www.digitalocean.com',
    icon: '/images/useful/digitalocean.svg',
    name: 'DigitalOcean',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: 'from $4/mo, metered', ru: 'от $4/мес, по счётчику' },
    what: {
      en: 'A commercial cloud selling virtual machines, managed Kubernetes, managed databases, object storage and a git-push app platform. It is for putting an application somewhere other than your own hardware, with a much smaller product surface and a flatter published price list than the big three. The advertised entry price buys 512 MB of memory: a realistic small production setup means a larger machine plus a managed database and object storage, with outbound traffic billed past the included allowance.',
      ru: 'Коммерческое облако с виртуальными машинами, управляемым Kubernetes, управляемыми базами, объектным хранилищем и платформой для выката из git. Нужно, чтобы поставить приложение не на своё железо, с заметно меньшей номенклатурой и более понятным опубликованным прайсом, чем у большой тройки. Заявленная стартовая цена это 512 МБ памяти: реальный небольшой прод это машина побольше плюс управляемая база и объектное хранилище, а исходящий трафик сверх пакета считается отдельно.',
    },
  },

  /* --------------------------------------------------- monitor (more) --- */
  {
    key: 'searchconsole',
    group: 'monitor',
    url: 'https://search.google.com/search-console/about',
    icon: '/images/useful/searchconsole.ico',
    name: 'Google Search Console',
    cost: 'free',
    runsWhere: 'hosted',
    cautions: [],
    price: { en: 'free, Google account', ru: 'бесплатно, нужен аккаунт Google' },
    what: {
      en: 'Google reporting panel for how a site appears in its search results: the queries and pages that produced impressions and clicks, which URLs were indexed or rejected and why, plus sitemap submission and recrawl requests. It is the only place the actual search queries reaching a site can be read. It costs nothing but reports only on properties whose ownership you verified through DNS, a file or a tag, and its tables stop at a thousand rows, so larger sites pull data through the API.',
      ru: 'Панель Google о том, как сайт выглядит в её поиске: запросы и страницы, давшие показы и клики, какие адреса проиндексированы или отклонены и почему, плюс отправка карты сайта и заявки на переобход. Единственное место, где видно реальные поисковые запросы, которые приводят людей на сайт. Стоит ноль, но показывает только те ресурсы, права на которые вы подтвердили через DNS, файл или тег, а её таблицы обрываются на тысяче строк, поэтому крупные сайты забирают данные через API.',
    },
  },

  /* -------------------------------------------------- devtools (more) --- */
  {
    key: 'beszel',
    group: 'devtools',
    url: 'https://github.com/henrygd/beszel',
    icon: '/images/useful/beszel.jpg',
    name: 'Beszel',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free, MIT, self-hosted', ru: 'бесплатно, MIT, у себя' },
    what: {
      en: 'A self-hosted server monitor: a web hub plus a small agent on each machine, collecting processor, memory, disk, network, temperature and container statistics with history and alerts. It is the lightweight answer when a full observability stack is more than a handful of servers deserve. It is agent-based, so you have to be able to install and run a binary on every host you want to see, which rules out infrastructure you only reach through an API.',
      ru: 'Мониторинг серверов на своём хосте: веб-хаб плюс небольшой агент на каждой машине, собирающий процессор, память, диск, сеть, температуру и статистику контейнеров с историей и оповещениями. Лёгкий ответ на случай, когда полноценный стек наблюдаемости это больше, чем заслуживает горстка серверов. Работает через агента, поэтому на каждый хост, который хотите видеть, нужно поставить и запустить бинарник, а инфраструктура, до которой есть только API, так не мониторится.',
    },
  },
  {
    key: 'dozzle',
    group: 'devtools',
    url: 'https://github.com/amir20/dozzle',
    icon: '/images/useful/dozzle.jpg',
    name: 'Dozzle',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free, MIT, self-hosted', ru: 'бесплатно, MIT, у себя' },
    what: {
      en: 'A web viewer for container logs: one small binary that attaches to the container runtime and streams logs into a browser with search, regex queries and split screen for several containers at once. It is for looking at what a container is saying right now without shelling into the host. It stores nothing, so there is no retention and nothing to search once a line has rotated away, and it needs the Docker socket, which is effectively root on that machine.',
      ru: 'Веб-просмотрщик логов контейнеров: один небольшой бинарник цепляется к среде выполнения и льёт логи в браузер с поиском, регулярками и разделением экрана на несколько контейнеров сразу. Нужен, чтобы посмотреть, что контейнер говорит прямо сейчас, не заходя на хост по ssh. Ничего не хранит, поэтому ни глубины хранения, ни поиска по тому, что уже утекло, нет, а для работы ему нужен сокет Docker, а это фактически root на той машине.',
    },
  },
  {
    key: 'agentreach',
    group: 'devtools',
    url: 'https://github.com/Panniantong/agent-reach',
    icon: '/images/useful/agentreach.jpg',
    name: 'Agent Reach',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['terms'],
    price: { en: 'free, your own accounts', ru: 'бесплатно, на своих аккаунтах' },
    what: {
      en: 'A command line tool that pulls content out of Twitter, Reddit, YouTube, GitHub and several other platforms and hands it to a coding agent as plain text. It exists so an agent can read sources that have no usable free API. The platforms it leads with are reached by replaying a browser session you export yourself, against endpoints those platforms gate behind paid APIs, and its own README advises pointing it at a throwaway account because the real one can be banned.',
      ru: 'Утилита командной строки, которая достаёт содержимое из Twitter, Reddit, YouTube, GitHub и ещё нескольких площадок и отдаёт кодовому агенту простым текстом. Существует, чтобы агент мог читать источники, у которых нет пригодного бесплатного API. До площадок, которыми она открывается, она добирается, подставляя выгруженную вами сессию браузера к эндпоинтам, закрытым платными API, а её же README советует направлять её на одноразовый аккаунт, потому что настоящий могут заблокировать.',
    },
  },
  {
    key: 'freeclaudecode',
    group: 'devtools',
    url: 'https://github.com/Alishahryar1/free-claude-code',
    icon: '/images/useful/freeclaudecode.jpg',
    name: 'free-claude-code',
    cost: 'free',
    runsWhere: 'local',
    cautions: ['terms'],
    price: { en: 'free, breaches provider terms', ru: 'бесплатно, нарушает условия провайдера' },
    what: {
      en: 'A local proxy with an admin panel sitting between coding clients and whatever model backend you point them at. It is presented as a way to run those clients without paying for them. It gets there by routing a consumer subscription through a proxy for automated agent use, which is exactly what the providers subscription terms exclude, so the saving is borrowed against an account that can be closed.',
      ru: 'Локальный прокси с админкой, стоящий между кодовыми клиентами и тем бэкендом модели, на который вы их направите. Подаётся как способ пользоваться этими клиентами, не платя за них. Достигается это прогоном потребительской подписки через прокси для автоматической работы агентов, а именно это условия подписки провайдера и исключают, поэтому экономия занята под аккаунт, который могут закрыть.',
    },
  },

  /* ------------------------------------------------------------- seo --- */
  {
    key: 'openseo',
    group: 'seo',
    url: 'https://github.com/every-app/open-seo',
    icon: '/images/useful/openseo.png',
    name: 'OpenSEO',
    cost: 'tokens',
    runsWhere: 'selfhost',
    cautions: ['meter'],
    price: { en: 'free, data billed separately', ru: 'бесплатно, данные оплачиваются отдельно' },
    what: {
      en: 'A self-hostable application for SEO work: keyword research, rank tracking, competitor and backlink analysis, site audits, plus an MCP server so a coding agent can query the same data. It covers the job people buy a Semrush or Ahrefs seat for, on metered per-query cost instead of a monthly subscription. It holds no data of its own, so every feature runs on a third-party data account you open and fund yourself, and without that key the install does nothing.',
      ru: 'Разворачиваемое у себя приложение для SEO: подбор запросов, отслеживание позиций, анализ конкурентов и ссылок, аудит сайта, плюс MCP-сервер, чтобы те же данные мог запрашивать кодовый агент. Закрывает ту работу, ради которой покупают место в Semrush или Ahrefs, но с оплатой за запрос, а не подпиской. Своих данных у него нет, поэтому каждая функция работает на стороннем аккаунте данных, который вы заводите и пополняете сами, а без этого ключа установка не делает ничего.',
    },
  },
  {
    key: 'mdn',
    group: 'seo',
    url: 'https://developer.mozilla.org/',
    icon: '/images/useful/mdn.png',
    name: 'MDN Web Docs',
    cost: 'freemium',
    runsWhere: 'hosted',
    cautions: ['licence'],
    price: { en: 'free, optional $5/mo', ru: 'бесплатно, платный уровень $5/мес' },
    what: {
      en: 'Mozilla reference for HTML, CSS, JavaScript and the browser APIs, maintained in the open since 2005. You check there what a property, method or header actually does and which browsers implement it, instead of inferring behaviour from a blog post. The documentation is free and needs no account, and its prose is share-alike licensed, so quoting it on your own pages carries an attribution and licensing obligation.',
      ru: 'Справочник Mozilla по HTML, CSS, JavaScript и браузерным API, который ведут открыто с 2005 года. Туда идут проверить, что на самом деле делает свойство, метод или заголовок и какие браузеры это реализуют, вместо того чтобы выводить поведение из чьей-то статьи. Документация бесплатна и не требует аккаунта, а её тексты под лицензией с наследованием, поэтому цитирование на своих страницах несёт обязательства по указанию авторства и лицензии.',
    },
  },

  /* -------------------------------------------------- business (more) --- */
  {
    key: 'delawareinc',
    group: 'business',
    url: 'https://www.delawareinc.com/',
    icon: '/images/useful/delawareinc.ico',
    name: 'Harvard Business Services',
    cost: 'paid',
    runsWhere: 'hosted',
    cautions: ['meter'],
    price: { en: 'from $229 plus renewals', ru: 'от $229 плюс продления' },
    what: {
      en: 'A Delaware formation and registered-agent firm that has been filing since 1981, trading on the domain delawareinc.com. It files the certificate for an LLC or a corporation and then acts as the registered agent for the life of the entity. Packages start at USD 229 including the state fee and the first year of agent, and from the second year there is an annual agent fee plus Delaware own tax, which the site states as USD 400 for an LLC and USD 225 for a minimum-stock corporation.',
      ru: 'Делавэрская фирма по регистрации компаний и услугам зарегистрированного агента, подающая документы с 1981 года и торгующая под доменом delawareinc.com. Подаёт сертификат об учреждении LLC или корпорации и дальше выступает зарегистрированным агентом всё время существования компании. Пакеты начинаются с USD 229 вместе с пошлиной штата и первым годом агента, а со второго года это ежегодная плата агенту плюс собственный налог Делавэра, который сайт называет как USD 400 для LLC и USD 225 для корпорации с минимальным капиталом.',
    },
  },
  {
    key: 'starterkit',
    group: 'design',
    url: 'https://starterkit.getdesign.md/backgrounds',
    icon: '/images/useful/getdesignmd.svg',
    name: 'Website Starter Kit',
    cost: 'paid',
    runsWhere: 'local',
    cautions: [],
    price: { en: 'pay once, price on site', ru: 'разовая оплата, цена на сайте' },
    what: {
      en: 'A production starter kit for web apps and sites built with a coding agent, whose backgrounds page is a catalogue of animated canvas and WebGL effects that ship with it. It is for starting a project with the hero band, the dark sections and the motion already solved. It is sold once rather than by subscription and the price is not on a page a script can read, and it shares its icon here with getdesign.md because it is published by the same people.',
      ru: 'Готовый стартовый набор для веб-приложений и сайтов, которые собирают кодовым агентом, а его страница фонов это каталог анимированных canvas- и WebGL-эффектов, входящих в комплект. Нужен, чтобы начать проект, где герой, тёмные секции и движение уже решены. Продаётся разово, а не по подписке, цена лежит не на той странице, которую можно прочитать скриптом, и иконку здесь он делит с getdesign.md, потому что издаётся теми же людьми.',
    },
  },
  {
    key: 'openreply',
    group: 'ai',
    url: 'https://github.com/diwenne/openreply',
    icon: '/images/useful/openreply.png',
    name: 'OpenReply',
    cost: 'free',
    runsWhere: 'selfhost',
    cautions: [],
    price: { en: 'free, MIT, self-hosted', ru: 'бесплатно, MIT, у себя' },
    what: {
      en: 'A self-hosted comment-to-DM automation for Instagram: somebody comments a keyword under a post and gets a private reply with your link, with tracked links, a follow gate and per-account rate limiting. It is the one feature people pay ManyChat a monthly fee for, running on your own infrastructure with no seat limits. It goes through Meta official private replies rather than scraping or driving a browser, so the account stays inside the rules, and the cost of that is a Meta developer app whose approval takes longer than the deploy does.',
      ru: 'Автоматизация ответов в личные сообщения по комментариям в Instagram, разворачиваемая у себя: человек пишет ключевое слово под постом и получает в личку вашу ссылку, с отслеживанием переходов, проверкой подписки и ограничением частоты по каждому аккаунту. Это ровно та функция, за которую платят ManyChat ежемесячно, но на своей инфраструктуре и без лимита мест. Работает через официальные приватные ответы Meta, а не через скрейпинг или управление браузером, поэтому аккаунт остаётся в рамках правил, и платой за это становится приложение разработчика Meta, согласование которого занимает больше времени, чем сам деплой.',
    },
  },
]
