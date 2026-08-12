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
/* There is no EMAIL here on purpose, and a new one should not appear. The site
   answers on one channel and says so in one voice: a second address in the
   footer, in the closing button row and in the JSON-LD splits the reader
   between a channel that is watched and one that is not. */
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
  navSolutions: { en: 'Solutions', ru: 'Решения' },
  ctaCalc: { en: 'Get the price in a minute', ru: 'Узнать цену за минуту' },
  /**
   * The one button on all 24 routes of each language, and it now names the free
   * thing instead of asking for a generic sales call.
   *
   * There used to be a second string here, `ctaFree`, carrying exactly this
   * idea under a three-line comment about why it was the strong CTA. It was
   * referenced nowhere: `grep -rn ctaFree src/` returned its own definition and
   * nothing else. The unique offer of the whole business existed as dead code.
   * Rather than wire up a second button, this one absorbed it.
   */
  cta: { en: 'Free scoping call', ru: 'Бесплатный разбор' },
  ctaTg: { en: 'Message on Telegram', ru: 'Написать в Telegram' },
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
  /* The badge over the first-version list on a service page, where naming the
     contents is exactly the job. It is no longer the card link: see scopeTask. */
  moreOn: { en: 'What is included', ru: 'Что входит' },
  /* THE CARD LINK, and it replaced «Что входит» there. That label described the
     page it opened rather than offering the reader anything, which on a card
     whose whole purpose is to start a conversation is the weakest thing it
     could say. This one names what happens next. */
  scopeTask: { en: 'Scope the task', ru: 'Разобрать задачу' },
  /* Closes the services slab. It replaced a row of nine priced chips, so it has
     to carry both halves of what they said: the rest of the work, and what it
     costs. Hence «услуги и цены» rather than just one of them. */
  allPrices: { en: 'See all services and prices', ru: 'Смотреть все услуги и цены' },
  /* The cases grid opens and closes. The count is in the label because the
     reader can see three cards and has no way to guess whether the fade hides
     two more or nine; `content.ts` fills it from `CASES.length`. */
  casesAll: { en: 'Show all %n cases', ru: 'Показать все %n кейсов' },
  /* There is no «Свернуть» counterpart. The grid opens once and the button
     leaves with the fade it was explaining. */
  /* Solution pages. Every heading on one is a spoken phrase rather than a
     category, same rule as the rest of the site. */
  solutionFor: { en: 'Who this suits:', ru: 'Кому подходит:' },
  solutionComposition: { en: 'What is in the first version', ru: 'Состав первой версии' },
  solutionBase: { en: 'The figures above are the package this sits on:', ru: 'Цифры выше это пакет, на котором это стоит:' },
  solutionBaseTail: {
    en: 'Anything past its edges the calculator adds before the work starts, not after.',
    ru: 'Всё, что выходит за его границы, калькулятор добавит до начала работ, а не после.',
  },
  solutionFlow: { en: 'How the path goes', ru: 'Как проходит путь' },
  solutionWatch: { en: 'What decides whether this works or annoys people', ru: 'Что решает, будет это работать или раздражать' },
  solutionMetrics: { en: 'What to measure once it is live', ru: 'Что мерить после запуска' },
  /* «Возможный», not «наш». The stack is chosen against the task at the scoping
     and this list is what it is usually chosen from, so a heading that promised
     a fixed stack would contradict both the home page and the next sentence. */
  solutionStack: { en: 'A likely stack for this', ru: 'Возможный стек под это' },
  solutionStackSub: {
    en: 'Picked against the task when we scope it, not decided in advance. This is the shelf it usually comes off.',
    ru: 'Выбирается под задачу на разборе, а не решается заранее. Это полка, с которой его обычно берут.',
  },
  /* SHARED ACROSS ALL SOLUTION PAGES, and deliberately not per scenario: it is a
     claim about how the studio works, so writing it fifty-six times would be
     fifty-six chances to say it differently.

     IT PROMISES NOTHING IT CANNOT KEEP. No multiplier, no week count, no «in
     record time». The claim is only that a known shape is not re-decided from
     nothing, which is true of every scenario in this catalogue by construction,
     and that the time saved goes somewhere nameable. The delivery window is
     already on this page, from the price table, and it is the number that
     actually binds us. */
  solutionFast: { en: 'Why this comes out faster', ru: 'Почему это выходит быстрее' },
  solutionFastBody: {
    en: 'The shape of this one is known: the states, the edge cases and the things that usually go wrong have been decided before. Nothing here is a template, and the saving is not in your half of the work. It goes into your process, your content and the systems this has to talk to, which is the part nobody can have solved in advance.',
    ru: 'Форма этой задачи известна: состояния, крайние случаи и то, что обычно ломается, здесь уже продуманы. Шаблоном при этом ничего не делается, и экономия идёт не из вашей половины работы. Она уходит в ваш процесс, ваш контент и системы, с которыми это должно разговаривать, то есть в ту часть, которую заранее решить нельзя.',
  },
  solutionStart: { en: 'What it starts at', ru: 'С чего это начинается' },
  solutionFaq: { en: 'Asked before the first call', ru: 'Спрашивают до первого созвона' },
  solutionNear: { en: 'Close to this', ru: 'Рядом с этим' },
  solutionAll: { en: 'All solutions', ru: 'Все решения' },
  /* THE COUNT IS INSERTED, NOT TYPED. `{n}` is replaced with the length of the
     catalogue at render, and the Russian noun agrees through `pluralForm`, so
     adding a scenario cannot leave a heading claiming the old number. */
  solutionCatalogue: { en: 'Another {n} scenarios, priced the same way', ru: 'Ещё {n} {w}, посчитанных так же' },
  solutionCatalogueSub: {
    en: 'Each one carries the figure and the window of the work it sits on, so nothing here is a separate price list. Grouped by the kind of work rather than by industry, because the kind of work is what decides the number.',
    ru: 'У каждого цифра и срок той работы, на которой он стоит, поэтому отдельного прайса здесь нет. Сгруппированы по виду работы, а не по отрасли, потому что цифру решает именно вид работы.',
  },
  solutionWord: { en: 'scenarios', ru: 'сценарий|сценария|сценариев' },
  /* THE MIDDLE TIER. A visitor who does not recognise their scenario in the
     catalogue still recognises the kind of work, and this is the row that lets
     them jump straight to the figure instead of reading fifty-six cards to find
     out we do not have theirs. Six of these have a page of their own; the rest
     carry their line of the price table and go to it. */
  solutionKinds: { en: 'Or start from the kind of work', ru: 'Или начните с вида работы' },
  solutionKindOwn: { en: 'a page of its own', ru: 'есть отдельная страница' },
  solutionKindsSub: {
    en: 'The whole price table, as the thing each scenario below is priced from. Where there is a page about the work, the card opens it.',
    ru: 'Весь прайс целиком, тем, от чего считается каждый сценарий ниже. Если про эту работу есть отдельная страница, карточка её и откроет.',
  },
  solutionsLabel: { en: 'We already know this scenario', ru: 'Этот сценарий нам уже знаком' },
  solutionsSub: {
    en: 'Each of these is a thing we build, with what goes into the first version, what it costs and how long it runs. Not a portfolio: the proof of work is on the case pages, and these are the offers.',
    ru: 'Каждое из них это то, что мы собираем, с составом первой версии, ценой и сроком. Это не портфолио: доказательства работы лежат в кейсах, а здесь предложения.',
  },
  /* WAS «Как это устроено», which described the page rather than offering
     anything, and sat under twelve cards saying it twelve times. The same
     correction the service cards got when «Что входит» became «Разобрать
     задачу»: name the action, not the destination. */
  readCase: { en: 'Read the case', ru: 'Разобрать кейс' },
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
      ],
      ru: [
        'стартапов',
        'SaaS-продуктов',
        'AI-агентов',
        'мобильных приложений',
        'серверных систем',
        'дашбордов и аналитики',
      ],
    },
  },
  /**
   * The sub is one sentence of proof, and nothing else.
   *
   * It used to list the six services, which is what the rotating word above
   * already says. Then it carried the offer alone. Then the reach figure went in
   * front of the offer, because the fold has nothing else standing for
   * competence since the credential badge came out of it, and a number a
   * stranger can weigh does more work in that position than a promise does.
   *
   * The offer half is gone now too, and the fold has not stopped selling: the
   * first of the three plates under the buttons is «Бесплатно / Разбор задачи,
   * цена и срок до старта», which is the same promise on the same screen, set
   * as a figure rather than as the tail of a sentence. Saying one claim twice
   * inside 200px costs it its force instead of doubling it.
   *
   * THE FIGURE IS THE FOUNDER'S AND IS NOT DERIVED FROM ANYTHING IN THIS REPO.
   * Site data holds one user count, Swiftin's 4000+; ten thousand is the total
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
    en: 'More than 10,000 people use the products we have built.',
    ru: 'Продуктами, которые мы собрали, пользуются больше 10 000 человек.',
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
    { k: { en: 'Own product', ru: 'Свой продукт' }, v: { en: 'Swiftin, 4000+ users', ru: 'Swiftin, 4000+ пользователей' }, hot: true },
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
  bureau: { en: 'Studio', ru: 'Студия' },
  faq: { en: 'Questions', ru: 'Вопросы' },
}

/**
 * The blue block under the hero, and its own heading.
 *
 * It first reused CONTACT.h, which put «Разберём бесплатно и скажем как есть»
 * at the top of the page and again at the bottom of it. This line is written
 * for the slot instead, and the three figures underneath are what back it:
 * projects shipped, automations built, cases still running.
 *
 * WAS «Мы это уже делали, и оно до сих пор работает», which looked backwards, at
 * a record. This one looks forwards, at what the buyer gets, and the figures
 * below still carry the record.
 *
 * Then it lost its tail, «...продолжает приносить результат после запуска». The
 * qualifier was doing the panel's own job twice: the three figures underneath
 * are shipped projects, automations and live cases, which is the after-launch
 * claim stated in numbers. A heading set at 56px is the one line on the page
 * that can afford to be short.
 */
export const MOTTO_TITLE = {
  en: 'We build what delivers',
  ru: 'Мы строим то, что приносит результат',
}

/* The old heading, «Что снимаем с вашей команды», echoed the old hero almost
   verbatim AND mislabelled its own grid: dashboards, MVPs and billing are not
   routine coming off a team. */
/* THE COUNT IS DERIVED, NOT WRITTEN, and that is the whole point of splitting
   this string in two. It said «Шесть направлений» while the price table held six
   rows; the table holds fifteen now and the heading was quietly lying about the
   size of the studio in the wrong direction. `content.ts` puts
   `WORK_TYPES.length` in front of this tail, so the next row added to the price
   table moves the heading with it and nobody has to remember. */
/**
 * The services section's own heading, and it is separate from the tail above on
 * purpose. Both sections used to print the same counted line, so the home page
 * carried one headline twice: once over the six cards and again over the price
 * plans further down. The counted one stays where the count is the point, which
 * is the pricing block; this one leads the cards.
 *
 * It also absorbs a claim the parsing card used to make on its own («это те
 * задачи, от которых обычно отказываются»). Said once over six cards it is a
 * position; repeated inside one of them it was a footnote.
 */
export const SERVICES_LABEL = {
  en: 'We do what others call hard',
  ru: 'Делаем то, что другие называют сложно',
}
/* THERE IS NO `SERVICES_SUB` ANY MORE. It stood under the heading and spent
   three clauses describing the cards directly beneath it: that each has a page,
   what those pages contain, where the price starts, how long the first version
   runs. Every one of those is on the card itself, in the figures and the link,
   so the sentence was a caption on something already visible. Its last clause
   («остальные лежат в прайсе») is `SERVICES_MORE_LABEL` and the row under it,
   which is where that belongs. `WhatsIn` drops the paragraph and its gap when
   `description` is empty, so a standfirst returns as one string in content.ts
   and no markup. */

/* `SERVICES_MORE_LABEL` («Тоже в прайсе, в той же таблице») is gone with the
   chip row it sat over. `UI.allPrices` is the link that replaced both. */


/**
 * The ticker under the hero. Thirteen capability words, kept by hand.
 *
 * IT HAS BEEN SWAPPED FOR PRICES TWICE AND CAME BACK BOTH TIMES, so the argument
 * is worth writing down rather than rediscovering. The case for the price ladder
 * is real: a hand-kept list can disagree with the price table, and a figure on
 * the fold is a claim the rest of the page has to keep. What sinks it in
 * practice is length. Six work types with their floors are six phrases of about
 * forty characters, and at ticker speed a forty-character phrase is read rather
 * than glanced at, which is not what a ribbon is for. Thirteen single words are
 * taken in at a pass.
 *
 * Nothing is lost by keeping the floors out: the hero's own mono line prints the
 * lowest floor and the shortest window, every service card prints its own
 * figure, and /pricing prints the whole table.
 *
 * Hand-kept on purpose, and this is the one list here that is. It is broader
 * than WORK_TYPES by design: SQL, webhooks and architecture are things this shop
 * does and none of them is a line you buy. Anything added here has to be
 * something the site can back somewhere.
 */
export const MARQUEE: Record<LabLang, string[]> = {
  en: ['AI agents', 'Automation', 'Integrations', 'Data pipelines', 'Parsing', 'Reverse engineering', 'Dashboards', 'SQL', 'Webhooks', 'Payments', 'MVP', 'Architecture', 'Support'],
  ru: ['AI-агенты', 'Автоматизация', 'Интеграции', 'Пайплайны данных', 'Парсинг', 'Реверс-инжиниринг', 'Дашборды', 'SQL', 'Вебхуки', 'Платежи', 'MVP', 'Архитектура', 'Поддержка'],
}

export const SERVICES: Service[] = [
  {
    key: 'agent',
    t: { en: 'AI agents and automation', ru: 'AI-агенты и автоматизация' },
    d: {
      en: 'We take the routine off the people doing it now. The agent runs by itself and helps with the rest.',
      ru: 'Убираем рутину, которую сейчас делают люди. Агент работает сам и помогает в работе.',
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
      en: 'We wire the CRM, the messengers, the spreadsheets and the services into one working loop, with no glue and no copying by hand.',
      ru: 'Связываем CRM, мессенджеры, таблицы и сервисы в один рабочий контур, без костылей и ручных переносов.',
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
      en: 'We pull data out of places with no usable API.',
      ru: 'Достаём данные там, где нет нормального API.',
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
      en: 'Every metric that matters on one screen. No spreadsheet hell, no assembling it by hand.',
      ru: 'Все ключевые метрики бизнеса на одном экране. Без Excel-ада и ручного сбора.',
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
      en: 'From the idea to the first paying users. We know how to walk the whole route.',
      ru: 'От идеи до первых платящих пользователей. Мы знаем, как пройти весь путь.',
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
      en: 'Subscriptions, plans, and taking payment by card and in crypto.',
      ru: 'Подписки, тарифы, приём оплаты картами и криптовалютой.',
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
  /**
   * Up to two measured facts, lifted out of `res` so the card can set them as
   * figures instead of burying them in a sentence.
   *
   * WHY THIS EXISTS. `res` was doing two jobs at once across this array: on some
   * cases it was a metric, on others an eight-line paragraph, and the card gave
   * both the same tinted plate. Measured on the rendered page, that plate ran
   * from four lines to eight and the cards from 420px to 542px, which is most of
   * what made the grid read as mush. Pulling the numbers out fixes the ragged
   * height and the presentation at once: a percentage set as a figure is read at
   * a glance, and the same percentage inside a sentence is not.
   *
   * OPTIONAL, AND THAT IS NOT AN OVERSIGHT. Two cases here have no number worth
   * printing, and DESIGN.md is explicit that a missing proof means dropping the
   * form rather than inventing the proof. Those two fall back to `res`, clamped
   * to the same height, so the grid stays even without either card lying.
   *
   * `v` IS `LS` AND NOT A BARE STRING, which the first draft got wrong. Plenty
   * of these figures do read the same in both languages — «68%», «+27%» — and
   * `LS` takes a single string for exactly that case. But «4 мин» is «4 min»,
   * «3 недели» is «three weeks», and Russian writes 2,4× where English writes
   * 2.4×. A neutral field would have forced those into `k` or shipped one of the
   * two languages a figure written the other one's way.
   */
  metrics?: { v: LS; k: LS }[]
  links: CaseLink[]
}

/**
 * The cases section's heading. Two words, and no standfirst under it.
 *
 * WHAT WENT, and why the slot is better empty. The heading was «Три сделали для
 * клиентов, один для себя» over «Четыре проекта, о которых можем говорить
 * открыто. Работы под NDA обсуждаем на созвоне.» Both counted a four-entry array
 * by hand and both were wrong the moment it grew, so the standfirst was made to
 * derive its figure through `casesSub()`. That function is gone with the
 * sentence it built: eleven cards below the heading are their own argument, and
 * a line telling the reader how many there are is a caption on something they
 * can already see. The NDA clause it also carried is in the FAQ.
 *
 * `Cases.tsx` renders the standfirst only when `description` is non-empty, so
 * putting a sentence back here is one string in `content.ts` and no markup.
 */
export const CASES_LABEL = {
  en: 'Our cases',
  ru: 'Наши кейсы',
}
export const CASE_KEYS = {
  task: { en: 'Task', ru: 'Задача' },
  sol: { en: 'What we actually built', ru: 'Что собрали в итоге' },
  res: { en: 'What came of it', ru: 'Что из этого вышло' },
}

/**
 * The motto counter's noun, in all three forms Russian needs.
 *
 * The digit beside it is `CASES.length` and not a constant, and the word used to
 * be the single string «живых кейса». That form agrees with four and with
 * nothing above it: a fifth case would have printed «5 живых кейса», and any
 * count from five up prints the same mistake. A number the page derives has to
 * carry a noun the page derives too, or the two drift the first time this array
 * grows.
 *
 * English collapses `few` and `many` onto one string, so `pluralForm` serves
 * both languages and neither needs a branch at the call site.
 */
export const CASES_COUNT_NOUN: Record<'one' | 'few' | 'many', LS> = {
  one: { en: 'live case', ru: 'живой кейс' },
  few: { en: 'live cases', ru: 'живых кейса' },
  many: { en: 'live cases', ru: 'живых кейсов' },
}

/** The bare noun, for a sentence that brings no adjective of its own. Separate
 *  from the pair above rather than derived by stripping «живых» off it: gluing
 *  and trimming prefixes is how the wrong case ends up shipped.
 *
 *  It was deleted once, when the FAQ answer that read «N кейсов выше» went, and
 *  came back for the grid's «Показать все N кейсов». Both readers want the same
 *  three forms, which is the argument for it existing at all. */
export const CASE_WORD: Record<'one' | 'few' | 'many', string> = {
  one: 'кейс',
  few: 'кейса',
  many: 'кейсов',
}

/**
 * Which of the three Russian forms a count takes: 1 and 21 take `one`, 2 to 4
 * and 22 to 24 take `few`, everything else takes `many`. The teens are the
 * exception the rule is written around, which is why 11 to 14 are checked
 * against the last two digits rather than the last one.
 */
export function pluralForm(n: number): 'one' | 'few' | 'many' {
  const last = Math.abs(n) % 10
  const lastTwo = Math.abs(n) % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'many'
  if (last === 1) return 'one'
  if (last >= 2 && last <= 4) return 'few'
  return 'many'
}

export const CASES: Case[] = [
  {
    title: 'Swiftin',
    sub: {
      /* The «100+ языках» tail went: the metric row directly beneath prints
         «100+ языков», and a card should not say the same number twice inside
         sixty pixels. */
      en: 'An AI translator right inside the browser: pages, subtitles and documents.',
      ru: 'AI-переводчик прямо в браузере: страницы, субтитры и документы.',
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
      en: '4000+ users and growing, live in the Chrome Web Store, with a free plan and paid subscriptions.',
      ru: '4000+ пользователей и растёт, живёт в Chrome Web Store, с бесплатным планом и платными подписками.',
    },
    /* THE ONE FIGURE ON THIS SITE A STRANGER CAN CHECK, which is why it is worth
       keeping current: the Chrome Web Store listing publishes the user count and
       this card links straight to it. Moved from 1000+ on the founder's word on
       2026-08-12. It should never sit above what the listing shows. */
    metrics: [
      { v: '4000+', k: { en: 'users', ru: 'пользователей' } },
      { v: '100+', k: { en: 'languages', ru: 'языков' } },
    ],
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
      en: 'No more manual exports and spreadsheets: one screen where every metric assembles itself on a schedule.',
      ru: 'Вместо ручных выгрузок и Excel, один экран, где все метрики собираются сами по расписанию.',
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
      en: 'A tender parser and marketplace auto-publishing. Typing things in by hand has all but stopped.',
      ru: 'Парсер тендеров и автопубликация на маркетплейсы. Ручной ввод почти исчез.',
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
      en: 'Telegram bot for group focus sessions: schedule, seats, video rooms, hosts.',
      ru: 'Telegram-бот для групповых фокус-сессий: расписание, места, видеокомнаты, ведущие.',
    },
    /* «В проде», the same as Swiftin, because both are ours. The set used three
       phrasings for two states; two states get two strings, and the thing they
       distinguish is whose product it is. */
    status: { en: 'In production', ru: 'В проде' },
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
      /* Kept inside the card's three-line slot. The release-safety half of this
         sentence moved out rather than being clipped: the case page makes the
         same point under «Что сопротивлялось», with the test and migration
         counts behind it. */
      en: 'Live in Telegram and running sessions: booking a seat and joining the room never leaves the chat.',
      ru: 'Живёт в Telegram и проводит сессии: записаться и попасть в комнату можно не выходя из чата.',
    },
    /* NO METRICS ON THIS CARD, and the two that were here are the reason. «76
       наборов тестов» and «26 миграций базы» are facts about our craft, not
       about anything the client got: on a card whose job is to say what came of
       the work they read as an internal report. They are true and they stay on
       the case page, under «Что сопротивлялось», where the subject is exactly
       how the thing was built. With the slot empty the card falls back to its
       result sentence, which is the honest answer while no session or user
       count exists to put here. */
    links: [
      { label: 't.me/cowee_focus_bot', href: 'https://t.me/cowee_focus_bot', primary: true },
    ],
  },

  /* THE FOUR BELOW HAVE NO CASE PAGE AND NO PUBLIC LINK, and both are handled
     rather than missing. `content.ts` sends a case with no matching entry in
     CASE_PAGES to the pricing page instead of a dead route, and it filters
     `links` for `http`, so an empty array renders no link row. Give one of them
     a page by adding a `casePages.ts` entry whose `match` is the English title
     spelled exactly as it is here.

     None of them names its client, in the same way the BAS and dashboard cases
     do not. Every figure in `res` is the client's own reported number, so it is
     the kind of claim a prospect can ask about: move one only on the founder's
     word. The timeline is in `res` because it is proof of the same kind; the
     price is not, because this site quotes in dollars and these were sold in
     roubles, and one card carrying a second currency would read against the
     calculator two screens up. */
  {
    title: { en: 'Telegram bot and CRM for B2B sales', ru: 'Telegram-бот + CRM для B2B-продаж' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Takes and qualifies the leads, and opens the deal in the CRM straight away.',
      ru: 'Принимает и квалифицирует заявки, сразу создаёт сделку в CRM.',
    },
    tags: ['Telegram', 'CRM', 'aiogram', 'PostgreSQL', 'amoCRM', 'Bitrix24', 'Redis', 'Webhooks'],
    task: {
      en: 'Leads arrived in DMs and on WhatsApp, went missing there, and managers answered them when they happened to remember.',
      ru: 'Заявки приходили в личку и WhatsApp, там же терялись, а менеджеры отвечали, когда вспоминали.',
    },
    sol: {
      en: 'Qualification scripts with scoring, a deal opened in the CRM automatically and with its context intact, notifications to the manager, and an admin panel.',
      ru: 'Сценарии квалификации со скорингом, автоматическое создание сделки в CRM без потери контекста, уведомления менеджеру и админка.',
    },
    res: {
      en: '68% of leads clear the first stage without a manager, average time to first response 4 minutes. Built in 9 days.',
      ru: '68% заявок проходят первый этап без участия менеджера, среднее время реакции — 4 минуты. Собрано за 9 дней.',
    },
    /* ROUNDED DOWN AND MARKED WITH A PLUS, here and on the onboarding case.
       68, 83 and 27 are the client's own reported figures and they are what the
       result sentence still says; on a card they read as too neat to be real,
       and precision nobody can check costs more trust than it buys. A floor is
       both weaker and safer: «65%+» cannot be wrong if 68% was right. */
    metrics: [
      { v: '65%+', k: { en: 'leads need no manager', ru: 'заявок без менеджера' } },
      { v: { en: '4 min', ru: '4 мин' }, k: { en: 'to first reply', ru: 'до первого ответа' } },
    ],
    links: [],
  },
  {
    title: { en: 'Automated onboarding and nurture', ru: 'Автоматизация онбординга и прогрева клиентов' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'After payment it walks the client through onboarding, hands out access, collects feedback.',
      ru: 'После оплаты сама ведёт клиента по онбордингу, выдаёт доступы и собирает отклик.',
    },
    tags: ['Onboarding', 'Telegram', 'aiogram', 'n8n', 'PostgreSQL', 'CRM', 'Payments'],
    task: {
      en: 'Curators ran onboarding by hand, so every new client meant the same sequence of messages typed again.',
      ru: 'Онбординг вели кураторы руками, и каждый новый клиент означал ту же переписку заново.',
    },
    sol: {
      en: 'Scripts that branch on what the client actually does: a lesson left unopened gets a different message. The whole cycle, from the payment to the repeat sale.',
      ru: 'Сценарии ветвятся по поведению клиента: не открыл урок — придёт другое сообщение. Полный цикл, от оплаты до повторной продажи.',
    },
    res: {
      en: '83% of clients finish onboarding, repeat sales up 27%. Built in 14 days.',
      ru: '83% клиентов проходят онбординг полностью, повторные продажи выросли на 27%. Собрано за 14 дней.',
    },
    /* Floors rather than the exact reported figures; see the note on the case
       above for why. */
    metrics: [
      { v: '80%+', k: { en: 'finish onboarding', ru: 'проходят онбординг' } },
      { v: '+25%', k: { en: 'repeat sales', ru: 'повторных продаж' } },
    ],
    links: [],
  },
  {
    title: { en: 'An internal tool for a sales team', ru: 'Внутренний инструмент для команды продаж' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Instead of spreadsheets and chat threads, the deals, the tasks and the next step in one place.',
      ru: 'Вместо таблиц и переписок, сделки, задачи и следующий шаг в одном месте.',
    },
    tags: ['CRM', 'Internal tool', 'Next.js', 'PostgreSQL', 'Telegram', 'Telephony'],
    task: {
      en: 'The team worked out of four separate spreadsheets and a chat thread, and the next step on a deal lived in whichever manager owned it.',
      ru: 'Команда работала в четырёх разных таблицах и переписке в чатах, а следующий шаг по сделке держался в голове менеджера.',
    },
    sol: {
      en: 'No off-the-shelf CRM rolled out: exactly what this team needed, with a Telegram bot as the interface, a Next.js web side and the phone system wired in.',
      ru: 'Не внедряли готовую CRM, а сделали ровно то, что нужно этой команде: Telegram-бот как интерфейс, веб-часть на Next.js и интеграция с телефонией.',
    },
    res: {
      en: 'Managers close 19% more deals on the same lead flow, and the four spreadsheets and the chat thread are gone. Built in three weeks.',
      ru: 'Менеджеры закрывают на 19% больше сделок при том же числе лидов, четыре таблицы и переписка в чатах ушли. Собрано за 3 недели.',
    },
    metrics: [
      { v: '+19%', k: { en: 'deals closed', ru: 'закрытых сделок' } },
      { v: { en: '3 weeks', ru: '3 недели' }, k: { en: 'to launch', ru: 'до запуска' } },
    ],
    links: [],
  },
  {
    title: { en: 'Lead qualification and routing', ru: 'Система квалификации и распределения лидов' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Leads from the site, from ads and from bots score themselves and route to managers by rule.',
      ru: 'Заявки с сайта, из рекламы и от ботов сами скорятся и расходятся по менеджерам.',
    },
    tags: ['Lead routing', 'FastAPI', 'PostgreSQL', 'CRM', 'Telegram', 'Webhooks'],
    task: {
      en: 'Leads went cold while a manager got to them, and the one who got there first took them.',
      ru: 'Лиды горели, пока менеджер до них дойдёт, а доставались они тому, кто первый встал.',
    },
    sol: {
      en: 'Webhooks from the ad accounts, scoring, routing rules anyone can read, and a trail from where a lead came from to who took it and how it ended.',
      ru: 'Приём вебхуков из рекламных кабинетов, скоринг, прозрачные правила распределения и полная прослеживаемость: откуда лид, кто взял, чем закончилось.',
    },
    res: {
      en: 'Time to first response down from 40+ minutes to 90 seconds, cold leads down 2.4×. Built in 11 days.',
      ru: 'Скорость реакции на лид сократилась с 40+ минут до 90 секунд, доля остывших заявок упала в 2,4 раза. Собрано за 11 дней.',
    },
    metrics: [
      { v: { en: '90 sec', ru: '90 сек' }, k: { en: 'to first reply', ru: 'реакция на лид' } },
      { v: { en: '2.4×', ru: '2,4×' }, k: { en: 'fewer cold leads', ru: 'меньше остывших заявок' } },
    ],
    links: [],
  },
  {
    /* Trimmed from «RAG-система + AI-консультант для сети магазинов настольных
       игр», which ran 62 characters and took four lines in a card whose next
       title took one. The shop and its trade are in `sub` a line below, where
       they cost nothing; a title is the one line on this card that has to be
       the same shape as its neighbours. */
    title: {
      en: 'RAG assistant for a retail chain',
      ru: 'RAG-консультант для сети магазинов',
    },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'A knowledge base and an assistant that knows the catalogue, stock, suppliers and the rules.',
      ru: 'База знаний и AI-консультант, который знает ассортимент, остатки, поставщиков и регламенты.',
    },
    tags: ['AI', 'RAG', 'LLM', 'Hybrid search', 'aiogram', '1C', 'MoySklad', 'Telegram', 'Query logging'],
    task: {
      en: 'Several shops and an online store, and the working knowledge split four ways: the stock system, Telegram, spreadsheets, and a few people heads. Anyone needing a price, a supplier term or a delivery date went asking.',
      ru: 'Несколько точек и онлайн, а рабочее знание разложено по четырём местам: складской учёт, Telegram, таблицы и головы нескольких человек. За ценой, условием поставщика или датой поставки шли спрашивать.',
    },
    sol: {
      en: 'All the sources collected and normalised, then RAG over a vector store with hybrid search, so the exact fields (stock, prices, article numbers) are matched exactly and the rest semantically. Telegram is the interface, because nobody was going to log into a seventh system. Access is by role, there is an admin panel for keeping the base current, and every query is logged. It does not just answer: it cites the document and the date behind the answer.',
      ru: 'Собрали и нормализовали все источники, затем RAG на векторной базе с гибридным поиском: точные поля (остатки, цены, артикулы) ищутся точно, остальное по смыслу. Интерфейс в Telegram, потому что в седьмую систему никто заходить не станет. Права по ролям, админка для поддержания базы и журнал запросов. Система не просто отвечает, а ссылается на документ и дату.',
    },
    res: {
      en: 'Finding information got 8 to 10 times faster, and staff stopped chasing it through chats and spreadsheets. Built in three to four weeks.',
      ru: 'Время на поиск информации сократилось в 8–10 раз, сотрудники перестали бегать по чатам и таблицам. Собрано за 3–4 недели.',
    },
    metrics: [
      { v: '8–10×', k: { en: 'faster to find an answer', ru: 'быстрее поиск ответа' } },
      { v: { en: '3–4 weeks', ru: '3–4 недели' }, k: { en: 'to launch', ru: 'до запуска' } },
    ],
    links: [],
  },
  {
    title: { en: 'AI agent for importing cars from the US', ru: 'AI-агент для выкупа автомобилей из США' },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Pulls the lot data from US auctions, fills the declarations and works out the duties.',
      ru: 'Собирает данные лота с американских аукционов, заполняет декларации и считает пошлины.',
    },
    tags: ['AI agent', 'Documents', 'Python', 'LLM', 'Structured output', 'PDF', 'PostgreSQL', 'Telegram'],
    task: {
      en: 'Buying at US auctions and running the customs and logistics after it. A person assembled the document pack for every car, which took three to four hours, a mistake in a declaration cost a fine or a delay, and the whole process ran on which experienced person was handling it.',
      ru: 'Выкуп на американских аукционах, дальше растаможка и логистика. Пакет документов на каждую машину собирал человек, это занимало 3–4 часа, ошибка в декларации стоила штрафа или задержки, а весь процесс держался на том, кто конкретно им занят.',
    },
    sol: {
      en: 'The agent does the broker routine rather than assisting with it: it pulls the lot data, prices the whole thing out so the total is broken down into car, shipping, duty and fee, fills declarations through structured output against a strict schema, generates the pack and carries the deal through its stages. A manager confirms before anything is filed, and every change is stored with its date and its author. Telegram and a web panel are the interface.',
      ru: 'Агент выполняет саму рутину брокера, а не помогает с ней: забирает данные лота, считает стоимость «под ключ» так, что видно, из чего она сложилась (авто, доставка, пошлины, услуги), заполняет декларации через structured output по жёсткой схеме, формирует пакет и ведёт сделку по этапам. Перед подачей подтверждает менеджер, а каждое изменение хранится с датой и автором. Интерфейс в Telegram и веб-админке.',
    },
    res: {
      en: 'The document pack went from three or four hours to twelve or fifteen minutes per car, and errors in declarations all but disappeared. Built in four to five weeks.',
      ru: 'Подготовка пакета документов сократилась с 3–4 часов до 12–15 минут на машину, ошибки в декларациях практически исчезли. Собрано за 4–5 недель.',
    },
    metrics: [
      { v: { en: '15 min', ru: '15 мин' }, k: { en: 'per car, was 4 hours', ru: 'на машину, было 4 часа' } },
      { v: { en: '4–5 weeks', ru: '4–5 недель' }, k: { en: 'to launch', ru: 'до запуска' } },
    ],
    links: [],
  },
  {
    /* Same trim as the case above, and for the same measured reason: 59
       characters over three lines. Who it was built for is in `sub`. */
    title: {
      en: 'A knowledge base that answers for the company',
      ru: 'База знаний, которая знает о компании всё',
    },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Answers on projects, clients and agreements. A new hire no longer has to find whoever remembers.',
      ru: 'Ответы по проектам, клиентам и договорённостям. Новичку больше не нужно искать того, кто помнит.',
    },
    tags: ['RAG', 'Knowledge base', 'Document parsing', 'Access control', 'Audit', 'Telegram'],
    task: {
      en: 'What the company knew lived in two or three people, and every new hire had to go through them to reach it.',
      ru: 'Знание компании жило в головах двух-трёх человек, и каждый новый сотрудник выходил на работу через них.',
    },
    sol: {
      en: 'Advanced RAG with document parsing, access rights and an audit trail on every query, reachable from Telegram and from the web. Each answer arrives with a date and a link to the source it came from.',
      ru: 'Advanced RAG с разбором документов, права доступа и аудит запросов, интерфейс в Telegram и в вебе. Каждый ответ приходит с датой и ссылкой на источник.',
    },
    res: {
      en: 'New hires get up to speed several times faster, and the knowledge no longer rests on two or three people. Built in three weeks.',
      ru: 'Новые сотрудники выходят на работу в разы быстрее, а знание компании перестало держаться на двух-трёх людях. Собрано за 3 недели.',
    },
    /* THE FIRST FIGURE IS TRUE BY CONSTRUCTION, not measured, and that is why it
       is safe to print. The card stood on a launch duration alone, which says
       nothing about what the client got, and the one outcome they reported («в
       разы быстрее») is not a number. This is: the system answers only from what
       it retrieved and always shows the document and the date, which is the
       client's own first key decision on this project. It cannot drift, because
       nothing about it is a measurement. */
    metrics: [
      { v: '100%', k: { en: 'answers cite a source', ru: 'ответов с источником' } },
      { v: { en: '3 weeks', ru: '3 недели' }, k: { en: 'to launch', ru: 'до запуска' } },
    ],
    links: [],
  },
  {
    title: {
      en: 'A browser extension for the sales team',
      ru: 'Браузерное расширение для менеджеров',
    },
    status: { en: 'Running at the client', ru: 'Работает у клиента' },
    live: true,
    sub: {
      en: 'Takes the routine out inside the browser: a CRM deal, client data and templates in a click or two.',
      ru: 'Убирает рутину прямо в браузере: сделка в CRM, данные клиента и шаблоны в один-два клика.',
    },
    tags: ['Browser extension', 'CRM', 'Manifest V3', 'TypeScript', 'React', 'DOM'],
    task: {
      en: 'Managers worked across the CRM, mail, WhatsApp Web, spreadsheets and supplier admin panels at once, and the day went on copying between tabs, with the copying mistakes that come with it.',
      ru: 'Менеджеры работали сразу в CRM, почте, WhatsApp Web, таблицах и админках поставщиков, и день уходил на перенос данных между вкладками, вместе с ошибками, которые при этом появляются.',
    },
    sol: {
      en: 'A Chrome extension built for this company scenarios: it opens or updates a deal straight from the page you are reading, fills the client fields, sends a template with the data already in it, and names the next step. Scenarios and templates are edited in a light admin panel without a developer.',
      ru: 'Расширение под Chrome под сценарии этой компании: заводит или обновляет сделку прямо со страницы, которую вы читаете, подставляет данные клиента, отправляет шаблон с уже вписанными данными и называет следующий шаг. Сценарии и шаблоны правятся в лёгкой админке без разработчика.',
    },
    res: {
      en: 'Managers spend 1.5 to 2 hours a day less on routine, and mistakes made copying data between systems have all but gone. Built in 2.5 to 3.5 weeks.',
      ru: 'Менеджеры тратят на 1,5–2 часа в день меньше на рутину, а ошибки при переносе данных практически исчезли. Собрано за 2,5–3,5 недели.',
    },
    metrics: [
      { v: { en: '1.5–2 h', ru: '1,5–2 ч' }, k: { en: 'less routine a day', ru: 'меньше рутины в день' } },
      { v: { en: '1 click', ru: '1 клик' }, k: { en: 'to a deal in the CRM', ru: 'до сделки в CRM' } },
    ],
    links: [],
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
      en: 'We measure what the process costs you today, in hours and in money. We find the bottleneck and what the effect would actually be.',
      ru: 'Считаем, во что процесс обходится сейчас в часах и деньгах. Разбираем узкое место и какой эффект реально можно получить.',
    },
  },
  {
    t: { en: 'Estimate', ru: 'Смета' },
    d: {
      en: 'A transparent list of the work, the timeline and the price. All of it fixed before the build starts.',
      ru: 'Прозрачный состав работ, срок и цена. Всё фиксируем до начала разработки.',
    },
  },
  {
    t: { en: 'Build', ru: 'Сборка' },
    d: {
      en: 'We work in short iterations. You see progress along the way, not on the last day.',
      ru: 'Идём короткими итерациями. Вы видите прогресс по ходу, а не в последний день.',
    },
  },
  {
    t: { en: 'Launch', ru: 'Запуск' },
    d: {
      en: 'We deploy in your accounts and on your data. Then we show your team how to use it.',
      ru: 'Разворачиваем на ваших аккаунтах и данных. Показываем команде, как этим пользоваться.',
    },
  },
  {
    t: { en: 'Support', ru: 'Поддержка' },
    d: {
      en: 'We stay reachable. A system that falls apart a month later is not a result.',
      ru: 'Остаёмся на связи. Система, которая разваливается через месяц, это не результат.',
    },
  },
]

/* THE PROOF BLOCK IS GONE: Reason, WHY_LABEL, WHY_SUB and the five
   entries of WHY, which rendered as «Это можно проверить без нас». Each claim
   survives where it can actually be checked instead of asserted, which is why
   removing the block cost nothing: Swiftin's own-product claim is its case card
   and case page, the single-contractor claim is the studio section, the no-API
   claim is the parsing service page, and the calculator's arithmetic is the
   pricing page. The fourth claim was «Четыре кейса из четырёх работают», typed
   against a four-entry array that now holds twelve, which is the third time a
   hand-counted sentence in this file went stale. CoreFeatures.tsx and the
   coreFeatures block in content.ts went with it. */

export const BUREAU = {
  /* BACK TO THE SINGULAR, and this reverses the move to a team voice recorded
     here before. The heading used to be «Отвечает один человек, а не отдел», it
     became «Вы говорите с теми, кто пишет код» when the site started speaking as
     a studio, and it now names one person again. What survived all three is the
     only part that was ever the point: no relay between whoever understood the
     task and whoever builds it.

     ONE THING TO KEEP IN STEP. The FAQ answer to «Кто именно будет делать?»
     still says «небольшая команда». Singular here and plural there is a
     contradiction a reader can catch on one screen, so whichever voice is
     right, both have to say it. */
  label: {
    en: 'You talk directly to the person answerable for the result',
    ru: 'Вы говорите напрямую с тем, кто отвечает за результат',
  },
  // The lead describes the studio, not the man in the photograph, so it reads as
  // the section standfirst rather than as card copy. Moving it out is also what
  // lets the card hold only what a person card should: a name, a role, one
  // paragraph, a row of ways to reach him.
  lead: {
    en: 'Veloris Lab is a full-cycle engineering studio. Between you and the person who designs the system and delivers it there are no managers and no go-betweens.',
    ru: 'Veloris Lab, инженерная студия полного цикла. Между вами и человеком, который проектирует и сдаёт систему, нет менеджеров и посредников.',
  },
  name: { en: 'Denys Kandyba', ru: 'Денис Кандыба' },
  // One string for both locales: the Russian copy uses the English term as-is,
  // and it is a job title rather than a sentence.
  role: 'AI-native engineer / forward deployed',
  body: {
    en: 'Designs the architecture, leads the build and answers for the result. The main instrument is AI, Claude and other models, which is what makes hard things faster without growing a team to do them. Writing code since 2014, and full time on AI and automation since 2024.',
    ru: 'Проектирует архитектуру, ведёт разработку и отвечает за результат. Основной инструмент это AI, Claude и другие модели: он и позволяет делать сложные вещи быстрее, без раздувания команды. В разработке с 2014 года, с 2024-го полный день в AI и автоматизации.',
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
    /* CHECK THIS AGAINST `body` ABOVE BEFORE CHANGING EITHER. The paragraph on
       the card says «с 2024-го полный день в AI и автоматизации» and this row
       now says the two started in 2023. Both can be true only if they mean
       different things: working with them from 2023, full time from 2024. If
       that is the intent, the paragraph should say it; if not, one of the two
       years is wrong and a reader sees both without scrolling. */
    { k: { en: 'AI and automation since', ru: 'AI и автоматизация с' }, v: '2023', mono: true },
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
    en: 'Got a task? Let us scope it',
    ru: 'Есть задача? Давайте разберём',
  },
  /* "Describe the task in two sentences" is the highest-leverage instruction
     available on a site that deliberately has no form: it replaces the blank
     page a reader faces when they open a chat with a stranger. */
  sub: {
    en: 'Write on Telegram and say briefly what you need.',
    ru: 'Напишите в Telegram и коротко опишите, что нужно.',
  },
  /**
   * The three chips under the close.
   *
   * They used to be assembled out of `HERO.facts[0..2]` as «ключ: значение»,
   * which read as a table cell lifted into a pill. Written as three phrases they
   * read as three promises, which is what they are. The facts array keeps those
   * three rows: its entries are referenced by index elsewhere, so removing them
   * would silently repoint the motto counters at the wrong labels.
   *
   * What the shorter sub above gave up is carried here instead: the reply window
   * is the third chip. The timezone went with it and survives in the studio
   * table, which is where a reader looks for where we are.
   */
  points: [
    { en: 'The price is known before the start', ru: 'Цена известна до старта' },
    { en: 'The scoping is free', ru: 'Разбор бесплатный' },
    { en: 'A reply within a working day', ru: 'Ответ в рабочий день' },
  ] as LS[],
  /* WAS a subject and a body for a prefilled mailto, and the prompts are the
     reason it existed: a chat opened on a stranger is the same blank page a
     mail client is, and three questions beat an empty window. The mail channel
     went, so the prompts moved onto the Telegram deep link, which takes one
     `?text=` string where mailto took two fields. The calculator has always
     handed its brief over the same way. */
  tgDirectText: {
    en: 'Veloris Lab, a task to look at\n\nWhat I need:\n\nWhat we do by hand today:\n\nWhen I need it:',
    ru: 'Veloris Lab, задача на разбор\n\nЧто нужно:\n\nЧто сейчас делаем руками:\n\nК какому сроку:',
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

/**
 * Labels for the four artefacts that lean into the first screen from its edges.
 *
 * They are interface chrome rather than claims: a bot thread, a metric card, a
 * deal row and a run notification, which is what the work this studio sells
 * looks like on a screen. The two figures big enough to actually read, «68%» and
 * «4 мин», are borrowed from the Telegram-and-CRM case metrics rather than made
 * up, so the numbers on the fold are ones the site already publishes on a card
 * further down.
 *
 * The layer is `aria-hidden`, so none of it is announced. It lives here rather
 * than in the component for the same reason every other string does: one file,
 * both languages, nothing typed twice.
 */
export const HERO_ASIDE = {
  bot: {
    name: { en: 'Lead bot', ru: 'Бот заявок' },
    status: { en: 'online', ru: 'онлайн' },
    in1: { en: 'New request from the site', ru: 'Новая заявка с сайта' },
    out: { en: 'Qualifying, one moment', ru: 'Квалифицирую, секунду' },
    in2: { en: 'Deal opened in the CRM', ru: 'Сделка заведена в CRM' },
    input: { en: 'Message', ru: 'Сообщение' },
  },
  board: {
    title: { en: 'Requests this week', ru: 'Заявки за неделю' },
    value: '68%',
    caption: { en: 'without a manager', ru: 'без менеджера' },
  },
  deal: {
    title: { en: 'Deal', ru: 'Сделка' },
    status: { en: 'In progress', ru: 'В работе' },
    rowA: { en: 'Source', ru: 'Источник' },
    rowAValue: 'Telegram',
    rowB: { en: 'First reply', ru: 'Первый ответ' },
    rowBValue: { en: '4 min', ru: '4 мин' },
  },
  run: {
    title: { en: 'Automation finished', ru: 'Автоматизация выполнена' },
    meta: { en: '128 records', ru: '128 записей' },
  },
}

/* THE THREE ENTRY POINTS ARE GONE: ENTRY_LABEL, ENTRY_SUB and the ENTRY
   array of three doors (an idea, a process done by hand, a system already
   running), each with its own CTA. They rendered as the section under the stack
   and every one of them pointed at either the calculator or the close, both of
   which the reader meets anyway a screen later. EYEBROW.entry survives them,
   because the pricing page still labels a section with it. */

/* THE MODEL OF WORK, three facts under the stack.
   Under the stack is the right place for them: a reader who has just been shown a
   hundred and sixty technologies is one step from wondering what any of it costs
   to be tied to.
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
   fence. The second half is the position worth holding: a studio that only
   builds in its favourite framework is choosing for itself, not for the
   product. */
export const STACK_SUB = {
  en: 'Full cycle: from a landing page to a product with a server, payments and mobile apps. We choose the technology by deadline, by load, by what your team can maintain and by what support will cost a year from now. If you already have a codebase, we continue it rather than quoting you a rewrite.',
  ru: 'Полный цикл: от лендинга до продукта с сервером, платежами и мобильными приложениями. Выбираем технологии под срок, нагрузку, возможности вашей команды и стоимость поддержки через год. Если код уже есть, продолжаем его, а не предлагаем переписывать с нуля.',
}
/* There is no STACK array any more.
 *
 * It held six groups and twenty-eight chips, was exported, and was imported by
 * nothing: ToolGrid renders TOOLS instead. A plan once proposed reviving it and
 * retiring the grid, and reading the two side by side says the opposite. Every one of the twelve entries in TOOLS carries a
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
   is a claim about capability. Every studio's stack page is that second kind: it
   says the product is not made to live in the studio's favourite framework, and
   that an existing codebase gets continued rather than replaced, with the choice
   made on deadline, load, team and cost of ownership. That framing is what lets
   such a list be long.

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
      en: 'A page that has to open fast and an interface that has to hold complex state are different jobs. We choose for each separately.',
      ru: 'Страница, которая обязана быстро открываться, и интерфейс, который держит сложное состояние, это разные задачи. Выбираем под каждую отдельно.',
    },
    items: ['TypeScript', 'React', 'Next.js', 'Vue', 'Svelte', 'Astro', 'Tailwind', 'Vite'],
  },
  {
    key: 'api',
    kicker: { en: 'Servers and APIs', ru: 'Серверы и API' },
    title: { en: 'So it does not fall over at three in the morning', ru: 'Чтобы не падало в три ночи' },
    lead: {
      en: 'Validation, authorisation, rate limits and real logs go in at the start, not after the first incident.',
      ru: 'Валидация, авторизация, лимиты и нормальные логи ставятся сразу, а не после первого инцидента.',
    },
    items: ['Node.js', 'TypeScript', 'Python', 'FastAPI', 'Go', 'PostgreSQL', 'Redis', 'Queues'],
  },
  {
    key: 'auto',
    kicker: { en: 'Automation and integrations', ru: 'Автоматизация и интеграции' },
    title: { en: 'Everything wired into one working loop', ru: 'Связываем всё в один рабочий контур' },
    lead: {
      en: 'The CRM, the spreadsheets, the messengers, the payments and the internal services, with no copying by hand and no glue. The thing that usually takes months of improvising.',
      ru: 'CRM, таблицы, мессенджеры, платежи и внутренние сервисы, без ручных переносов и костылей. То, что обычно собирают месяцами на коленке.',
    },
    /* «Очереди» belongs to the group above and stays there. The file's own rule
       is that nothing is listed twice across groups to make a group look
       fuller, and this one is full enough without borrowing. */
    items: ['n8n', 'Temporal', 'Webhooks', 'CRM API', 'Telegram', 'Make', 'Custom workers'],
  },
  {
    key: 'native',
    kicker: { en: 'Native mobile', ru: 'Нативная мобильная разработка' },
    title: { en: 'When native is genuinely the answer', ru: 'Когда действительно нужен натив' },
    lead: {
      en: 'Camera, background work, offline, health, in-app purchases. Those are the reasons to go native, and they are the only reasons we do.',
      ru: 'Камера, фон, офлайн, здоровье, встроенные покупки. Вот причины идти в натив, и мы идём туда только за ними.',
    },
    items: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'StoreKit', 'HealthKit', 'CameraX'],
  },
  {
    key: 'cross',
    kicker: { en: 'One codebase, two stores', ru: 'Один код, два магазина' },
    title: { en: 'When two native teams do not pay for themselves', ru: 'Когда две нативные команды не окупаются' },
    lead: {
      en: 'Most products do not need two codebases. We say so plainly, and we say just as plainly when native is the right call after all.',
      ru: 'Большинству продуктов две кодовые базы не нужны. Говорим это прямо. И так же прямо говорим, когда натив всё-таки оправдан.',
    },
    items: ['Flutter', 'React Native', 'Expo', 'Kotlin Multiplatform', 'Capacitor'],
  },
  {
    key: 'data',
    kicker: { en: 'Data and storage', ru: 'Данные и хранение' },
    title: { en: 'Chosen for the job, not out of habit', ru: 'Под задачу, а не по привычке' },
    lead: {
      en: 'Transactions, analytics, search, cache and vectors are different jobs. Solving all of them with one database is the fastest route to something slow.',
      ru: 'Транзакции, аналитика, поиск, кэш и векторы, это разные задачи. Решать всё одной базой, самый быстрый способ получить тормоза.',
    },
    items: ['PostgreSQL', 'Redis', 'ClickHouse', 'Elasticsearch', 'pgvector', 'S3', 'Prisma'],
  },
  {
    key: 'ai',
    kicker: { en: 'AI inside the product', ru: 'AI внутри продукта' },
    title: { en: 'Models doing work, not models in a demo', ru: 'Модели, которые работают, а не показываются' },
    lead: {
      en: 'In production what matters is token accounting, retries, fallback routes and a predictable bill at the end of the month. That is the actual work.',
      ru: 'В проде важны учёт токенов, повторы, запасные маршруты и предсказуемый счёт в конце месяца. Вот это и есть настоящая работа.',
    },
    items: ['OpenAI', 'Anthropic', 'RAG', 'Embeddings', 'Tool calling', 'Streaming', 'Ollama'],
  },
  {
    key: 'pay',
    kicker: { en: 'Payments and billing', ru: 'Платежи и биллинг' },
    title: { en: 'Cards and crypto, both in production', ru: 'Карты и крипта, обе в проде' },
    lead: {
      en: 'Subscriptions, plan changes with proration, and webhooks that do not charge twice when they arrive twice.',
      ru: 'Подписки, смена тарифа с пересчётом и вебхуки, которые не списывают дважды при повторной доставке.',
    },
    items: ['Stripe', 'Paddle', 'NOWPayments', 'Subscriptions', 'Idempotent webhooks', 'Invoices'],
  },
  {
    key: 'ext',
    kicker: { en: 'Browser extensions', ru: 'Расширения браузера' },
    title: { en: 'The part most studios turn down', ru: 'То, от чего обычно отказываются' },
    lead: {
      en: 'A published extension on the current manifest, in two stores, with a permissions model that makes sense. Not many do this.',
      ru: 'Опубликованное расширение на актуальном манифесте, в двух магазинах, с нормальной моделью разрешений. Такое делают редко.',
    },
    items: ['Chrome', 'Manifest V3', 'WebExtensions', 'Firefox Add-ons', 'Service worker', 'Chrome Web Store'],
  },
  {
    key: 'ops',
    kicker: { en: 'Infrastructure and quality', ru: 'Инфраструктура и качество' },
    title: { en: 'Deployed, watched, and yours', ru: 'Развёрнуто, под присмотром и ваше' },
    lead: {
      en: 'Automated builds, monitoring that reaches a phone, tests before the deploy and security before it is too late. All of it in your accounts.',
      ru: 'Автоматические сборки, мониторинг до телефона, тесты до выкладки и безопасность до того, как станет поздно. Всё в ваших аккаунтах.',
    },
    /* The clouds sit in this group rather than in one of their own, because
       this card's own lead already ends on «Всё в ваших аккаунтах» and an
       account is what a cloud is. Both circuits are named on purpose: a buyer
       who has to stay inside Russia and a buyer who cannot are two different
       readers, and a list that serves only one of them answers half the room.
       Note the neighbouring rule this does NOT break: the file leaves out 1С
       and the Russian accounting circuit deliberately, but that is a different
       business, not a hosting region. */
    items: [
      'Docker', 'CI/CD', 'Cloudflare', 'Yandex Cloud', 'Selectel', 'Timeweb',
      'VK Cloud', 'Sentry', 'Playwright', 'OWASP', 'Rate limiting', '2FA',
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
/**
 * FIVE QUESTIONS, AND THE LIST IS CLOSED. It ran to nine across two rows and
 * several of them answered things nobody asks before a first call: which stack
 * we work in, which languages we speak, how many cases are above. Those are on
 * the page already, in the stack section, the studio table and the cards
 * themselves, so as questions they were captions.
 *
 * NOT ONE ANSWER HERE COUNTS ANYTHING. The version this replaced opened «Четыре
 * кейса выше» and had to be taught to derive that number when the array grew
 * past four, then past ten. The five below make no claim that a later edit can
 * falsify: what a thing costs when, what a brief needs, who does the work, what
 * follows launch, what the first step is.
 */
export const FAQ: FaqItem[][] = [
  [
    {
      q: { en: 'How much will it cost?', ru: 'Сколько это будет стоить?' },
      a: {
        en: 'The price is known before the work starts. The calculator gives you a guide, and the exact figure is fixed after we scope the task.',
        ru: 'Цена известна до начала работ. Калькулятор даёт ориентир, точную сумму фиксируем после разбора задачи.',
      },
    },
    {
      q: { en: 'Do we need a finished spec?', ru: 'Нужно ли готовое ТЗ?' },
      a: {
        en: 'No. Describing the task and where things stand today is usually enough. The rest comes out in the scoping.',
        ru: 'Нет. Обычно достаточно описать задачу и текущую ситуацию. Остальное выясняем на разборе.',
      },
    },
    {
      q: { en: 'Who exactly does the work?', ru: 'Кто именно будет делать?' },
      a: {
        en: 'A small team, with no chain of managers and no handovers. You talk directly to the people doing it.',
        ru: 'Над задачей работает небольшая команда, без цепочки менеджеров и «передач». Вы общаетесь напрямую с теми, кто делает.',
      },
    },
    {
      q: { en: 'What happens after launch?', ru: 'Что происходит после запуска?' },
      a: {
        en: 'There is support. We can maintain it, extend it and keep developing the product. The terms are stated plainly.',
        ru: 'Есть поддержка. Можем сопровождать, дорабатывать и развивать продукт дальше. Условия прозрачные.',
      },
    },
    {
      q: { en: 'How do we start?', ru: 'С чего начать?' },
      a: {
        en: 'Ask for the scoping call. On it we go through the task, the timeline and the budget, and tell you whether we are taking it.',
        ru: 'Оставить заявку на разбор. На созвоне разберём задачу, сроки, бюджет и скажем, берёмся или нет.',
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
  /* Names the one channel rather than offering a choice. This field writes a
     line into a brief the reader sends themselves, and a reply address on a
     channel nobody watches is worse than no address: they would be waiting. */
  contactPh: { en: 'Telegram to reply to', ru: 'Telegram для ответа' },

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
  /* WAS `mailSubject`, and it was never only a subject: it is the first line of
     the brief itself, which the Telegram handoff carries too. The mail button
     beside it is gone, so the name no longer promises a channel that exists. */
  briefTitle: { en: 'Veloris Lab, project estimate', ru: 'Veloris Lab, расчёт проекта' },

  // Labels used to assemble the brief that goes into Telegram.
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
  /* WAS «Veloris Lab, инженерная студия. Сначала цифра, потом работа», a promise
     the calculator two screens up actually keeps. What stands here now names the
     category instead, so the footer no longer speaks in the studio's voice and
     the quotation marks that used to frame it went with the sentence: you quote
     a motto, not a job description. The promise still runs on the page, in the
     hero's mono line and in the calculator's disclaimer.

     The brand name is not in this string either, and putting it back prints it
     twice: the footer sets this line directly beside the wordmark, so the two
     read as one phrase and the wordmark is the subject of it. */
  line: {
    en: 'a full-cycle engineering studio',
    ru: 'инженерная студия разработки полного цикла',
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
