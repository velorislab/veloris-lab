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

   `timeline` WAS CUT AND HAS COME BACK, under the same rule. It went because
   nobody had written down what happened in which week, and naming four phases
   from a four-week total is invention. Three clients have since reported their
   own week-by-week breakdown, so those three cases carry it and the other four
   do not. Optional for the same reason `difficulties` is: the section renders where
   the material exists and disappears where it does not. Do not fill it by
   dividing a duration into equal parts.
   ====================================================================== */

import type { LS } from './labData'

export interface Difficulty {
  t: LS
  d: LS
}

/** One reported stage of the work. `t` is the client's own label for it. */
export interface Phase {
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
  /** Only where the client reported the stages themselves. */
  timeline?: Phase[]
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
  {
    slug: 'rag-retail',
    match: 'RAG assistant for a retail chain',
    parentService: 'agent',
    eyebrow: { en: 'AI · Client work', ru: 'AI · Работа для клиента' },
    audience: {
      en: 'A board-game retail chain with several shops and an online store, whose working knowledge lived in a few people and a few dozen chats.',
      ru: 'Сети магазинов настольных игр с несколькими точками и онлайном, где рабочее знание жило в нескольких людях и паре десятков чатов.',
    },
    difficulties: [
      {
        t: { en: 'The knowledge was in four places at once', ru: 'Знание лежало сразу в четырёх местах' },
        d: {
          en: 'Part of it in the stock system, part in Telegram, part in spreadsheets, and part only in somebody head. A search that reads three of the four is not a search, it is a second thing to check.',
          ru: 'Часть в складском учёте, часть в Telegram, часть в таблицах, часть только в голове. Поиск, который читает три источника из четырёх, это не поиск, а ещё одно место, куда надо заглянуть.',
        },
      },
      {
        t: { en: 'Close enough is wrong here', ru: 'Здесь «примерно» это неправильно' },
        d: {
          en: 'A price, a supplier term and a stock figure are either exact or useless, and a model that fills a gap with something plausible is worse than one that says it does not know. Hybrid search puts the exact fields beside the semantic ones, and the model answers from what it retrieved rather than from what it remembers.',
          ru: 'Цена, условие поставщика и остаток либо точны, либо бесполезны, а модель, которая заполняет пробел чем-то правдоподобным, хуже той, которая честно не знает. Гибридный поиск ставит точные поля рядом с семантикой, и модель отвечает по найденному, а не по памяти.',
        },
      },
      {
        t: { en: 'An answer without a date is half an answer', ru: 'Ответ без даты это половина ответа' },
        d: {
          en: 'When the price was changed and when the delivery landed are the questions behind most of the other questions. Every answer carries the document it came from and the date it was true on, which is also what lets the manager see where the data still has holes.',
          ru: 'Когда обновили цену и когда была поставка, это вопросы, стоящие за большинством остальных. Каждый ответ несёт документ, из которого взят, и дату, на которую он верен. Это же показывает управляющему, где в данных ещё дыры.',
        },
      },
    ],
    timeline: [
      {
        t: { en: 'Week 1', ru: 'Неделя 1' },
        d: {
          en: 'Audit of the sources, the shape of the knowledge base, first test loads.',
          ru: 'Аудит источников данных, структура базы знаний, первые тестовые загрузки.',
        },
      },
      {
        t: { en: 'Week 2', ru: 'Неделя 2' },
        d: {
          en: 'The RAG core, test answer scenarios, accuracy checked against known facts.',
          ru: 'Ядро RAG, тестовые сценарии ответов, проверка точности.',
        },
      },
      {
        t: { en: 'Week 3', ru: 'Неделя 3' },
        d: {
          en: 'The Telegram interface, access rights by role, the admin panel, and the first round of feedback.',
          ru: 'Telegram-интерфейс, права доступа по ролям, админка, доработка по обратной связи.',
        },
      },
      {
        t: { en: 'Week 4', ru: 'Неделя 4' },
        d: {
          en: 'The real sources connected, the staff shown how it works, final corrections.',
          ru: 'Боевое подключение основных источников, обучение сотрудников, финальные правки.',
        },
      },
    ],
    cta: {
      en: 'Does your company knowledge live in two or three people?',
      ru: 'Ваше знание тоже держится на двух-трёх людях?',
    },
  },
  {
    slug: 'us-car-import',
    match: 'AI agent for importing cars from the US',
    parentService: 'agent',
    eyebrow: { en: 'AI agent · Client work', ru: 'AI-агент · Работа для клиента' },
    audience: {
      en: 'A company buying cars at US auctions and running the customs and logistics itself, where the process depended on which experienced person was handling it.',
      ru: 'Компании, которая выкупает авто на американских аукционах и сама ведёт растаможку и логистику, где процесс зависел от того, кто конкретно им занят.',
    },
    difficulties: [
      {
        t: { en: 'Filled forms, not written text', ru: 'Заполненные формы, а не написанный текст' },
        d: {
          en: 'The output is a customs declaration and a set of figures, not a paragraph. The agent fills predefined fields under a strict schema and computes the duties, so there is no free text anywhere it could drift.',
          ru: 'На выходе таможенная декларация и посчитанные цифры, а не абзац. Агент заполняет заранее заданные поля по жёсткой схеме и считает пошлины, поэтому свободному тексту негде появиться.',
        },
      },
      {
        t: { en: 'The cost of being wrong', ru: 'Цена ошибки' },
        d: {
          en: 'A mistake in a declaration is a fine, a delay or an overpayment, so a model that invents is not an inconvenience here, it is the whole risk. Critical fields are validated, and a person confirms before anything is filed.',
          ru: 'Ошибка в декларации это штраф, задержка или переплата, поэтому выдумывающая модель здесь не неудобство, а весь риск. Критичные поля проверяются, а перед подачей подтверждает человек.',
        },
      },
      {
        t: { en: 'One car, many stages', ru: 'Одна машина, много этапов' },
        d: {
          en: 'From the bid to the client collecting the car, every stage has its own data, its own documents and its own status. The deal carries all of it with a date and an author on every change, which is what makes the state auditable rather than remembered.',
          ru: 'От ставки до выдачи машины клиенту у каждого этапа свои данные, свои документы и свой статус. Сделка несёт всё это, а каждое изменение помечено датой и автором, поэтому состояние можно проверить, а не вспомнить.',
        },
      },
    ],
    timeline: [
      {
        t: { en: 'Week 1', ru: 'Неделя 1' },
        d: {
          en: 'The process taken apart into stages, and what data and which documents each one needs.',
          ru: 'Глубокий разбор процесса, выделение этапов, определение данных и документов.',
        },
      },
      {
        t: { en: 'Week 2', ru: 'Неделя 2' },
        d: {
          en: 'A prototype agent: lot data, a preliminary all-in cost, a draft declaration.',
          ru: 'Прототип агента: сбор данных по лоту, предварительный расчёт, черновик декларации.',
        },
      },
      {
        t: { en: 'Week 3', ru: 'Неделя 3' },
        d: {
          en: 'Document generation finished, field validation, the status model.',
          ru: 'Доработка генерации документов, валидации, статусная модель.',
        },
      },
      {
        t: { en: 'Week 4', ru: 'Неделя 4' },
        d: {
          en: 'Integrations, notifications, the manager interface, tested on real deals.',
          ru: 'Интеграции, уведомления, интерфейс для менеджеров, тестирование на реальных сделках.',
        },
      },
      {
        t: { en: 'Week 5', ru: 'Неделя 5' },
        d: {
          en: 'Live, then the corrections that only real edge cases ask for.',
          ru: 'Боевой запуск, сбор обратной связи, доработка по ошибкам и краевым случаям.',
        },
      },
    ],
    cta: {
      en: 'Is your process held together by documents?',
      ru: 'Есть процесс, который держится на документах?',
    },
  },
  {
    slug: 'browser-extension',
    match: 'A browser extension for the sales team',
    parentService: 'agent',
    eyebrow: { en: 'Browser extension · Client work', ru: 'Расширение браузера · Работа для клиента' },
    audience: {
      en: 'A B2B sales team living in six tabs at once, who were never going to adopt a seventh system to fix it.',
      ru: 'Отделу продаж в B2B, который живёт сразу в шести вкладках и не стал бы осваивать седьмую систему ради этого.',
    },
    difficulties: [
      {
        t: { en: 'Somebody else owns every page', ru: 'Каждая страница чужая' },
        d: {
          en: 'The extension works on top of a CRM, a mail client, two web messengers and several supplier panels, none of which are ours and any of which can be redesigned on a Tuesday. It reads the pages it needs deliberately and narrowly, so an update somewhere else does not take it down.',
          ru: 'Расширение работает поверх CRM, почты, двух веб-мессенджеров и нескольких панелей поставщиков, и ни одна из них не наша, а любая может обновить вёрстку во вторник. Оно читает нужные страницы точечно и узко, чтобы чужое обновление не роняло его.',
        },
      },
      {
        t: { en: 'A tool nobody opens is not a tool', ru: 'Инструмент, который не открывают, это не инструмент' },
        d: {
          en: 'The thing it replaces is copy and paste, which costs two seconds and no learning. Anything slower than that loses, so the common actions are one or two clicks and the extension works out what the page is before offering anything.',
          ru: 'Он заменяет копирование, которое стоит две секунды и не требует учиться. Всё, что медленнее, проигрывает, поэтому частые действия занимают один-два клика, а расширение сначала само понимает, на какой странице менеджер.',
        },
      },
      {
        t: { en: 'Every team member works differently', ru: 'Каждый менеджер работает по-своему' },
        d: {
          en: 'Hard-coding one team scenarios means a developer for every change, and the process changes faster than that. Scenarios and templates live in an admin panel, so a new automation is a configuration rather than a release.',
          ru: 'Зашить сценарии одной команды в код значит звать разработчика на каждое изменение, а процесс меняется чаще. Сценарии и шаблоны лежат в админке, поэтому новая автоматизация это настройка, а не релиз.',
        },
      },
    ],
    timeline: [
      {
        t: { en: 'Week 1', ru: 'Неделя 1' },
        d: {
          en: 'Watching the managers actual working days, and writing down the most frequent and most painful actions.',
          ru: 'Глубокий разбор рабочих дней менеджеров, фиксация самых частых и болезненных действий.',
        },
      },
      {
        t: { en: 'Week 2', ru: 'Неделя 2' },
        d: {
          en: 'A prototype with the two or three main scenarios, tested on real work rather than on a demo.',
          ru: 'Прототип расширения с двумя-тремя главными сценариями, тестирование на реальных задачах.',
        },
      },
      {
        t: { en: 'Week 3', ru: 'Неделя 3' },
        d: {
          en: 'The rest of the scenarios, stability, the admin panel, and the edge cases real use turned up.',
          ru: 'Доработка сценариев, стабильность, админка, обработка ошибок и крайних случаев.',
        },
      },
      {
        t: { en: 'Rollout', ru: 'Финал' },
        d: {
          en: 'Installed across the team, shown how it works, then the quick corrections that follow first contact.',
          ru: 'Внедрение, обучение, сбор обратной связи и быстрые правки.',
        },
      },
    ],
    cta: {
      en: 'Does your team live in six tabs?',
      ru: 'Ваша команда тоже живёт в шести вкладках?',
    },
  },
]

export function casePageBySlug(slug: string): CasePage | undefined {
  return CASE_PAGES.find((c) => c.slug === slug)
}

/** Section headings, shared by all four pages. */
export const CP_LABELS = {
  task: { en: 'Where this started', ru: 'С чего всё началось' },
  audience: { en: 'Who we built it for', ru: 'Для кого мы это делали' },
  difficulties: { en: 'What fought back', ru: 'Что сопротивлялось' },
  did: { en: 'What we actually built', ru: 'Что собрали в итоге' },
  timeline: { en: 'How the work went', ru: 'Как шла работа' },
  outcome: { en: 'What came of it', ru: 'Что из этого вышло' },
  stack: { en: 'Built with', ru: 'На чём собрано' },
  similar: { en: 'Similar work for you', ru: 'Похожая работа для вас' },
  other: { en: 'What else we have shipped', ru: 'Что ещё мы запускали' },
  open: { en: 'See it live', ru: 'Посмотреть вживую' },
}
