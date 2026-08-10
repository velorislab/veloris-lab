import type { LS } from './labData'

/* =============================================================================
   Solution pages.

   WHAT THIS IS AND, MORE IMPORTANTLY, WHAT IT IS NOT.

   A competitor runs fifty-seven of these and fourteen case pages, and the two
   are different documents doing different jobs. A case says «we built this, for
   these people, and here is what came of it», and every sentence in it is
   answerable to a repository. A solution page says «here is a thing we build,
   here is what goes in the first version, here is what it costs», and claims
   nothing about history at all. Read one of theirs and you will not find a
   single past-tense sentence about a client: it is «бот принимает», «кому
   подходит», «состав первой версии», «возможный стек».

   That is why fifty-seven of them can exist without a word of invention, and it
   is the honest way to have the volume a small studio otherwise cannot show. It
   is also, on their site, plainly the main source of search traffic: one page
   per scenario somebody actually types into Google.

   SO THE RULE FOR THIS FILE, and it is the only one that matters: nothing here
   may be written in the past tense about a client, and nothing here may imply a
   project that happened. Proof of work lives in CASES and stays there. If a
   solution below ever does get built for somebody who lets us say so, it earns a
   case page and this page links to it, exactly as theirs do.

   Every price, window and support figure is joined from WORK_TYPES through
   `base`, so a solution cannot quote a number the price table does not hold.
   ========================================================================== */

export interface Solution {
  /** URL segment, same in both locales. */
  slug: string
  /** The small English label above the title, their «Lead generation» slot. */
  kicker: string
  title: LS
  /** What the thing does, in the present tense. Never what we did. */
  lead: LS
  /** «Кому подходит» — the situation, not the person. */
  audience: LS
  /** Joins WORK_TYPES[].key. Decides the price, the window and the support. */
  base: string
  /** What is in the first version. Short noun phrases, not sentences. */
  composition: LS[]
  /** «Как проходит путь» — three numbered steps through the thing. */
  flow: { t: LS; d: LS }[]
  /** The three decisions that decide whether this works or annoys people. */
  watch: { t: LS; d: LS }[]
  /** What to measure once it is live. */
  metrics: LS[]
  faq: { q: LS; a: LS }[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'instagram-replies',
    kicker: 'Social inbox',
    title: { en: 'Instagram replies in the brand’s voice', ru: 'Ответы в Instagram от лица компании' },
    lead: {
      en: 'An assistant reads incoming direct messages and comments, answers the ones it has an answer for, and hands the rest to a human with the thread already summarised.',
      ru: 'Ассистент читает входящие сообщения и комментарии, сам отвечает там, где ответ есть, а остальное передаёт человеку вместе с уже собранной сутью переписки.',
    },
    audience: {
      en: 'Accounts where the same dozen questions arrive every day, replies slow down in the evening, and a missed message is a lost order.',
      ru: 'Аккаунты, куда каждый день приходят одни и те же десять вопросов, ответы проседают к вечеру, а пропущенное сообщение это потерянный заказ.',
    },
    base: 'agent',
    composition: [
      { en: 'answers from your own materials', ru: 'ответы по вашим материалам' },
      { en: 'price and availability questions', ru: 'вопросы о цене и наличии' },
      { en: 'handover to a human', ru: 'передача человеку' },
      { en: 'comment replies', ru: 'ответы в комментариях' },
      { en: 'working hours and tone', ru: 'часы работы и тон' },
      { en: 'a log of every reply sent', ru: 'журнал всех отправленных ответов' },
    ],
    flow: [
      {
        t: { en: 'A message arrives', ru: 'Приходит сообщение' },
        d: {
          en: 'The assistant matches it against what it is allowed to answer: your prices, your terms, your materials. Nothing outside that set is improvised.',
          ru: 'Ассистент сверяет его с тем, на что ему разрешено отвечать: ваши цены, условия, ваши материалы. Ничего за пределами этого набора он не выдумывает.',
        },
      },
      {
        t: { en: 'It answers or it stops', ru: 'Отвечает или останавливается' },
        d: {
          en: 'A confident answer goes out in your tone of voice. An unclear one is not guessed at: the thread is marked and a person sees it with the question already isolated.',
          ru: 'Уверенный ответ уходит в вашем тоне. Неясный не додумывается: переписка помечается, и человек видит её с уже выделенным вопросом.',
        },
      },
      {
        t: { en: 'The order leaves the inbox', ru: 'Заказ уходит из переписки' },
        d: {
          en: 'Anything that looks like an order becomes a record with the contact, the product and the history attached, in your CRM or in a chat, rather than staying buried in a thread.',
          ru: 'Всё, что похоже на заказ, становится записью с контактом, товаром и историей, в вашей CRM или в чате, а не остаётся похороненным в переписке.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'It must know when to shut up', ru: 'Он должен уметь замолчать' },
        d: {
          en: 'The failure mode of this kind of assistant is not a wrong answer, it is a confident wrong answer to a complaint. Silence and a handover is always the correct fallback.',
          ru: 'Такой ассистент ломается не на неверном ответе, а на уверенно неверном ответе на жалобу. Молчание с передачей человеку это всегда правильный запасной вариант.',
        },
      },
      {
        t: { en: 'The tone is a setting, not a prompt', ru: 'Тон это настройка, а не приписка' },
        d: {
          en: 'Voice, greeting, whether it uses your customer’s name, how it declines: all of it is configured and reviewable, so it does not drift the day a model is updated.',
          ru: 'Обращение, приветствие, имя клиента, форма отказа: всё настраивается и просматривается, чтобы ничего не поехало в день, когда обновят модель.',
        },
      },
      {
        t: { en: 'Platform limits are real', ru: 'Ограничения площадки настоящие' },
        d: {
          en: 'Instagram allows automated replies within a window and within rules. We build inside them rather than around them, because an account is harder to get back than it is to lose.',
          ru: 'Instagram разрешает автоответы в определённом окне и по правилам. Мы строим внутри них, а не в обход: вернуть аккаунт сложнее, чем потерять.',
        },
      },
    ],
    metrics: [
      { en: 'share answered without a human', ru: 'доля ответов без человека' },
      { en: 'time to first reply', ru: 'время до первого ответа' },
      { en: 'handovers per day', ru: 'передач человеку в день' },
      { en: 'threads that became orders', ru: 'переписок, ставших заказами' },
    ],
    faq: [
      {
        q: { en: 'Will customers know it is not a person?', ru: 'Клиент поймёт, что это не человек?' },
        a: {
          en: 'That is your call and it is a setting. Our recommendation is to say so once, at the start: the reply is faster and nobody feels tricked when a human takes over mid-conversation.',
          ru: 'Это ваше решение и это настройка. Мы советуем сказать один раз в начале: ответ всё равно быстрее, и никто не чувствует обмана, когда в середине разговора подключается человек.',
        },
      },
      {
        q: { en: 'Can it work in Telegram and WhatsApp too?', ru: 'Он сможет и в Telegram с WhatsApp?' },
        a: {
          en: 'Yes, and the answering logic is the same one. Each extra channel is its own connection and its own rules, so it is a line in the estimate rather than free.',
          ru: 'Да, логика ответов у них общая. Каждый дополнительный канал это своё подключение и свои правила, поэтому он строка в смете, а не бесплатное дополнение.',
        },
      },
    ],
  },

  {
    slug: 'custom-crm',
    kicker: 'Internal systems',
    title: { en: 'A CRM shaped like your process', ru: 'CRM под ваш процесс, а не наоборот' },
    lead: {
      en: 'Your deals, your stages, your fields and your rules, in a system nobody has to be talked out of using, instead of a boxed CRM the team quietly keeps a spreadsheet beside.',
      ru: 'Ваши сделки, стадии, поля и правила в системе, которой не нужно уговаривать пользоваться, вместо коробочной CRM, рядом с которой команда тихо ведёт свою таблицу.',
    },
    audience: {
      en: 'Teams whose process does not fit a boxed product: unusual stages, calculations inside a deal, several roles seeing different things, or a spreadsheet that has quietly become the real system.',
      ru: 'Команды, чей процесс не ложится в коробку: нестандартные стадии, расчёты внутри сделки, несколько ролей с разной видимостью или таблица, которая незаметно стала настоящей системой.',
    },
    base: 'crm',
    composition: [
      { en: 'deals and your own stages', ru: 'сделки и ваши стадии' },
      { en: 'accounts and roles', ru: 'аккаунты и роли' },
      { en: 'the fields you actually use', ru: 'поля, которыми правда пользуются' },
      { en: 'search and filters', ru: 'поиск и фильтры' },
      { en: 'history of who changed what', ru: 'история, кто что менял' },
      { en: 'import from the spreadsheet', ru: 'импорт из таблицы' },
    ],
    flow: [
      {
        t: { en: 'The stages come from your board', ru: 'Стадии берутся с вашей доски' },
        d: {
          en: 'We start from how the work already moves, including the steps nobody wrote down, rather than from a vendor’s default funnel.',
          ru: 'Начинаем с того, как работа уже движется, включая шаги, которые никто не записывал, а не с воронки по умолчанию из чужого продукта.',
        },
      },
      {
        t: { en: 'Roles decide what is visible', ru: 'Роли решают, кто что видит' },
        d: {
          en: 'A manager, an owner and a contractor open the same deal and see different amounts of it. That is a rule in the data, not a hidden column in the interface.',
          ru: 'Менеджер, владелец и подрядчик открывают одну сделку и видят разное. Это правило в данных, а не спрятанная колонка в интерфейсе.',
        },
      },
      {
        t: { en: 'It connects to what you already run', ru: 'Соединяется с тем, что уже работает' },
        d: {
          en: 'Mail, Telegram, the site’s forms, invoicing, the warehouse: the CRM stops being a second place to type things in and becomes the place they arrive.',
          ru: 'Почта, Telegram, формы с сайта, счета, склад: CRM перестаёт быть вторым местом для ручного ввода и становится местом, куда всё приходит.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'The fields nobody fills in', ru: 'Поля, которые никто не заполняет' },
        d: {
          en: 'Every abandoned CRM has thirty fields and four that are used. We ship the four, and the rest get added when somebody asks twice.',
          ru: 'В каждой брошенной CRM тридцать полей и четыре используемых. Мы выпускаем четыре, остальные добавляются, когда о них попросят дважды.',
        },
      },
      {
        t: { en: 'Migration is the real risk', ru: 'Настоящий риск это перенос' },
        d: {
          en: 'The spreadsheet has duplicates, half-filled rows and three spellings of the same client. Cleaning that is planned work, not something discovered on launch day.',
          ru: 'В таблице есть дубли, наполовину заполненные строки и три написания одного клиента. Чистка это запланированная работа, а не открытие в день запуска.',
        },
      },
      {
        t: { en: 'It must be faster than the spreadsheet', ru: 'Должно быть быстрее таблицы' },
        d: {
          en: 'If entering a deal takes longer than a row in Excel, the team goes back to Excel. Keyboard-first entry and sane defaults are the feature, not the polish.',
          ru: 'Если завести сделку дольше, чем строку в Excel, команда вернётся в Excel. Ввод с клавиатуры и разумные значения по умолчанию это функция, а не вылизывание.',
        },
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
        a: {
          en: 'Usually you should. A boxed CRM is cheaper and faster every time your process fits it. This page is for when it does not, and we will say so on the call if a box would do.',
          ru: 'Обычно и стоит. Коробка дешевле и быстрее каждый раз, когда процесс в неё ложится. Эта страница про случай, когда не ложится, и на разборе мы прямо скажем, если коробки хватит.',
        },
      },
      {
        q: { en: 'Can we move off it later?', ru: 'Сможем ли мы потом с неё уйти?' },
        a: {
          en: 'The database is yours, in your own cloud account, and exports to standard formats from the first version. Lock-in is a choice somebody makes, and we do not make it for you.',
          ru: 'База ваша, в вашем облачном аккаунте, и выгружается в обычные форматы с первой версии. Привязка это чей-то выбор, и мы не делаем его за вас.',
        },
      },
    ],
  },

  {
    slug: 'lead-bot',
    kicker: 'Lead generation',
    title: { en: 'A Telegram bot that qualifies enquiries', ru: 'Telegram-бот, который квалифицирует заявки' },
    lead: {
      en: 'The bot meets traffic from an ad or a channel, asks the few questions that decide whether an enquiry is worth a call, and hands a manager a structured request with the source attached.',
      ru: 'Бот встречает трафик из рекламы или канала, задаёт те несколько вопросов, которые решают, стоит ли заявка звонка, и отдаёт менеджеру структурированную заявку вместе с источником.',
    },
    audience: {
      en: 'Businesses with many similar enquiries, where managers spend the first ten minutes of every conversation asking the same things and the answers end up in three places.',
      ru: 'Бизнесы с потоком однотипных обращений, где менеджер тратит первые десять минут каждого разговора на одни и те же вопросы, а ответы оседают в трёх местах.',
    },
    base: 'telegram',
    composition: [
      { en: 'branching questions', ru: 'ветвящиеся вопросы' },
      { en: 'qualification rules', ru: 'правила квалификации' },
      { en: 'the campaign it came from', ru: 'кампания, из которой пришёл' },
      { en: 'handover to a manager', ru: 'передача менеджеру' },
      { en: 'CRM or chat notification', ru: 'уведомление в CRM или чат' },
    ],
    flow: [
      {
        t: { en: 'It opens where the ad promised', ru: 'Открывается там, где обещала реклама' },
        d: {
          en: 'A deep link carries the campaign and opens the branch matching what the advert said, so the first screen is not a generic greeting.',
          ru: 'Ссылка приносит кампанию и открывает ветку, соответствующую обещанию из объявления, поэтому первый экран не общее приветствие.',
        },
      },
      {
        t: { en: 'It asks only what changes the answer', ru: 'Спрашивает только то, что меняет ответ' },
        d: {
          en: 'Questions branch by service and by previous answers. A qualifying dialogue is three or four steps, not a form wearing a chat interface.',
          ru: 'Вопросы ветвятся по услуге и по прошлым ответам. Квалификация это три-четыре шага, а не анкета, переодетая в чат.',
        },
      },
      {
        t: { en: 'A manager gets a card, not a transcript', ru: 'Менеджер получает карточку, а не стенограмму' },
        d: {
          en: 'Contact, answers, source and the suggested next step arrive together, so the first call starts from the second minute of the conversation.',
          ru: 'Контакт, ответы, источник и предложенный следующий шаг приходят вместе, поэтому звонок начинается со второй минуты разговора.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'The contact request comes last', ru: 'Контакт спрашивается последним' },
        d: {
          en: 'Ask for a phone number on the first screen and most of the traffic leaves. The bot gives something useful first and asks afterwards.',
          ru: 'Спросите телефон на первом экране, и большая часть трафика уйдёт. Бот сначала даёт что-то полезное и только потом спрашивает.',
        },
      },
      {
        t: { en: 'An error must not reset the dialogue', ru: 'Ошибка не должна сбрасывать диалог' },
        d: {
          en: 'A wrong format explains itself and keeps the previous answers. Restarting a five-step dialogue is how a qualified lead becomes a closed tab.',
          ru: 'Неверный формат объясняет себя и сохраняет прошлые ответы. Перезапуск диалога из пяти шагов это то, как квалифицированная заявка становится закрытой вкладкой.',
        },
      },
      {
        t: { en: 'The source must survive to the report', ru: 'Источник должен дожить до отчёта' },
        d: {
          en: 'The campaign tag travels with the enquiry all the way into the CRM, or the advertising budget is being spent without a way to read the result.',
          ru: 'Метка кампании едет с заявкой до самой CRM, иначе рекламный бюджет тратится без возможности прочитать результат.',
        },
      },
    ],
    metrics: [
      { en: 'starts per campaign', ru: 'запусков по кампаниям' },
      { en: 'reached the contact step', ru: 'дошли до шага с контактом' },
      { en: 'qualified enquiries', ru: 'квалифицированных заявок' },
      { en: 'cost per qualified enquiry', ru: 'стоимость квалифицированной заявки' },
    ],
    faq: [
      {
        q: { en: 'Can we change the questions ourselves?', ru: 'Сможем менять вопросы сами?' },
        a: {
          en: 'Wording and order, yes, from a simple editor. New branching logic is a change to the script and goes through us.',
          ru: 'Формулировки и порядок да, из простого редактора. Новая логика ветвления это правка сценария и идёт через нас.',
        },
      },
    ],
  },

  {
    slug: 'competitor-prices',
    kicker: 'Market data',
    title: { en: 'Competitor prices, collected on a schedule', ru: 'Цены конкурентов, собранные по расписанию' },
    lead: {
      en: 'A collector visits the sources you care about on a timetable, pulls the prices and stock you name, and writes them somewhere you can compare against your own.',
      ru: 'Сборщик ходит по нужным вам источникам по расписанию, снимает цены и наличие, которые вы назвали, и складывает их туда, где их можно сравнить со своими.',
    },
    audience: {
      en: 'Sellers repricing by hand, categories where a competitor’s discount is found out a week late, and any market where the number on the screen has no export button.',
      ru: 'Продавцы, которые переоценивают руками, категории, где о скидке конкурента узнают через неделю, и любой рынок, где у числа на экране нет кнопки выгрузки.',
    },
    base: 'parsing',
    composition: [
      { en: 'the sources you name', ru: 'источники, которые вы назвали' },
      { en: 'a schedule and retries', ru: 'расписание и повторы' },
      { en: 'matching to your own items', ru: 'сопоставление с вашими позициями' },
      { en: 'price history', ru: 'история цен' },
      { en: 'alerts on a change', ru: 'оповещения об изменении' },
      { en: 'export to a spreadsheet', ru: 'выгрузка в таблицу' },
    ],
    flow: [
      {
        t: { en: 'The source is read the way a person reads it', ru: 'Источник читается так, как его читает человек' },
        d: {
          en: 'Where there is no API, the page is what there is. That is the work: getting the same number a customer sees, reliably, without being mistaken for an attack.',
          ru: 'Где нет API, есть страница. В этом и работа: получать то же число, которое видит покупатель, стабильно и не будучи принятым за атаку.',
        },
      },
      {
        t: { en: 'It is matched to your catalogue', ru: 'Сопоставляется с вашим каталогом' },
        d: {
          en: 'A price is useless until it sits next to your own line. Matching by article, by name and by the awkward cases in between is most of the value here.',
          ru: 'Цена бесполезна, пока не встала рядом с вашей позицией. Сопоставление по артикулу, по названию и по неудобным случаям между ними это и есть основная ценность.',
        },
      },
      {
        t: { en: 'You hear about a change, not a table', ru: 'Вам приходит изменение, а не таблица' },
        d: {
          en: 'A daily spreadsheet nobody opens is not a result. A message saying which four items moved and by how much is.',
          ru: 'Ежедневная таблица, которую никто не открывает, это не результат. Сообщение о том, какие четыре позиции сдвинулись и насколько, это результат.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'Sources change without warning', ru: 'Источники меняются без предупреждения' },
        d: {
          en: 'A layout change breaks a collector silently, and silence looks exactly like «prices did not move». Every source is checked for plausibility, not just for errors.',
          ru: 'Смена вёрстки ломает сборщик молча, а молчание выглядит ровно как «цены не двигались». Каждый источник проверяется на правдоподобие, а не только на ошибки.',
        },
      },
      {
        t: { en: 'Politeness is a technical requirement', ru: 'Вежливость это техническое требование' },
        d: {
          en: 'Rate, timing and volume are set so the collection is indistinguishable from ordinary traffic. Being blocked costs more than collecting slowly.',
          ru: 'Частота, время и объём настроены так, чтобы сбор не отличался от обычного трафика. Блокировка стоит дороже, чем медленный сбор.',
        },
      },
      {
        t: { en: 'What is legal to collect', ru: 'Что законно собирать' },
        d: {
          en: 'Public prices are one thing and personal data is another. We take the first and refuse the second, and say which is which before starting.',
          ru: 'Публичные цены это одно, персональные данные другое. Первое берём, от второго отказываемся, и говорим, что есть что, до старта.',
        },
      },
    ],
    metrics: [
      { en: 'sources collected without a gap', ru: 'источников собрано без пропусков' },
      { en: 'items matched automatically', ru: 'позиций сопоставлено автоматически' },
      { en: 'time from their change to your alert', ru: 'время от их изменения до вашего оповещения' },
      { en: 'hours of manual checking removed', ru: 'убранных часов ручной проверки' },
    ],
    faq: [
      {
        q: { en: 'Is this legal?', ru: 'Это законно?' },
        a: {
          en: 'Collecting publicly published prices generally is; a source’s terms of use and any personal data are the limits. We check the specific sources before quoting and say plainly if one of them is a no.',
          ru: 'Сбор публично опубликованных цен как правило да; границы это условия использования источника и любые персональные данные. Мы проверяем конкретные источники до сметы и прямо говорим, если по какому-то ответ отрицательный.',
        },
      },
    ],
  },

  {
    slug: 'client-portal',
    kicker: 'Client access',
    title: { en: 'A client portal instead of a chat thread', ru: 'Личный кабинет вместо переписки' },
    lead: {
      en: 'Clients see their own orders, documents, status and balance in one place, and stop asking a manager for things a screen can answer.',
      ru: 'Клиент видит свои заказы, документы, статус и баланс в одном месте и перестаёт спрашивать у менеджера то, на что может ответить экран.',
    },
    audience: {
      en: 'Businesses where the same three questions arrive by chat every day, documents are re-sent on request, and a manager is effectively a search interface to a folder.',
      ru: 'Бизнесы, где каждый день в чат приходят одни и те же три вопроса, документы пересылают по просьбе, а менеджер работает поиском по папке.',
    },
    base: 'crm',
    composition: [
      { en: 'sign-in and roles', ru: 'вход и роли' },
      { en: 'orders and their status', ru: 'заказы и их статус' },
      { en: 'documents and invoices', ru: 'документы и счета' },
      { en: 'history and balance', ru: 'история и баланс' },
      { en: 'notifications on a change', ru: 'уведомления об изменении' },
    ],
    flow: [
      {
        t: { en: 'Signing in is not a barrier', ru: 'Вход не превращается в барьер' },
        d: {
          en: 'A link, a code, or a company account: whichever fits how your clients already work. A forgotten password must not become a support ticket.',
          ru: 'Ссылка, код или корпоративный аккаунт, смотря как ваши клиенты уже работают. Забытый пароль не должен превращаться в обращение в поддержку.',
        },
      },
      {
        t: { en: 'The status is the same one you see', ru: 'Статус тот же самый, что видите вы' },
        d: {
          en: 'The portal reads the system that is already the truth rather than keeping a second copy that drifts by Thursday.',
          ru: 'Кабинет читает ту систему, которая уже является истиной, а не держит вторую копию, которая к четвергу разъезжается.',
        },
      },
      {
        t: { en: 'A change reaches them without a manager', ru: 'Изменение доходит без менеджера' },
        d: {
          en: 'Shipped, signed, paid, delayed: whatever they would have asked about arrives as a notification instead.',
          ru: 'Отгружено, подписано, оплачено, задерживается: то, о чём они спросили бы, приходит уведомлением.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'Who is allowed to see what', ru: 'Кому что видно' },
        d: {
          en: 'Two people from the same client company rarely need the same access, and one of them must never see another company’s data. That is a rule in the data layer.',
          ru: 'Двум людям из одной компании-клиента редко нужен одинаковый доступ, и ни один из них не должен увидеть данные другой компании. Это правило на уровне данных.',
        },
      },
      {
        t: { en: 'An empty portal is worse than none', ru: 'Пустой кабинет хуже, чем никакого' },
        d: {
          en: 'If half the documents are still sent by chat, nobody logs in twice. The first version covers the questions that actually get asked, and only those.',
          ru: 'Если половина документов всё равно уходит в чат, второй раз туда никто не зайдёт. Первая версия закрывает те вопросы, которые правда задают, и только их.',
        },
      },
      {
        t: { en: 'It has to work on a phone', ru: 'Он обязан работать с телефона' },
        d: {
          en: 'The person checking whether the delivery left is standing somewhere, not sitting at a desk.',
          ru: 'Тот, кто проверяет, уехала ли отгрузка, где-то стоит, а не сидит за столом.',
        },
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
        a: {
          en: 'Yes, as a section behind sign-in, and that is usually cheaper than a separate product. What decides it is where your data already is.',
          ru: 'Да, разделом за авторизацией, и обычно это дешевле отдельного продукта. Решает то, где уже лежат ваши данные.',
        },
      },
    ],
  },

  {
    slug: 'owner-dashboard',
    kicker: 'Decisions',
    title: { en: 'One screen that answers “how are we doing”', ru: 'Один экран на вопрос «как идут дела»' },
    lead: {
      en: 'The numbers you actually steer by, pulled from wherever they live, on one screen that is right this morning rather than assembled by somebody on Friday.',
      ru: 'Те цифры, по которым вы правда принимаете решения, собранные оттуда, где они лежат, на одном экране, который верен сегодня утром, а не собран кем-то в пятницу.',
    },
    audience: {
      en: 'Owners and heads who get their picture from a spreadsheet somebody rebuilds by hand, and find out about a bad week when it is over.',
      ru: 'Владельцы и руководители, чья картина мира это таблица, которую кто-то пересобирает руками, и которые узнают о плохой неделе, когда она закончилась.',
    },
    base: 'dash',
    composition: [
      { en: 'collection from your systems', ru: 'сбор из ваших систем' },
      { en: 'the handful of metrics that matter', ru: 'те несколько метрик, которые решают' },
      { en: 'filters by period and segment', ru: 'фильтры по периоду и срезу' },
      { en: 'comparison with the last period', ru: 'сравнение с прошлым периодом' },
      { en: 'a scheduled digest', ru: 'дайджест по расписанию' },
    ],
    flow: [
      {
        t: { en: 'The sources are agreed first', ru: 'Сначала договариваемся об источниках' },
        d: {
          en: 'Which system is the truth for revenue, and which for orders. Two answers to one question is the reason most dashboards stop being trusted.',
          ru: 'Какая система истина по выручке, а какая по заказам. Два ответа на один вопрос это причина, по которой большинству дашбордов перестают верить.',
        },
      },
      {
        t: { en: 'Collection runs without anybody', ru: 'Сбор идёт без участия человека' },
        d: {
          en: 'On a schedule, with retries, and with a visible mark when a source did not answer, because a silently stale number is worse than a missing one.',
          ru: 'По расписанию, с повторами и с видимой пометкой, если источник не ответил: молча устаревшее число хуже, чем отсутствующее.',
        },
      },
      {
        t: { en: 'The screen answers in one look', ru: 'Экран отвечает с одного взгляда' },
        d: {
          en: 'Five numbers with a comparison beside each, then the detail underneath for the one that moved. Not forty tiles nobody reads.',
          ru: 'Пять чисел, у каждого сравнение, а под ними подробности по тому, которое сдвинулось. Не сорок плиток, которые никто не читает.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'Agree the metric before building it', ru: 'Договориться о метрике до сборки' },
        d: {
          en: '«Revenue» means three different things in most companies. Writing the formula down is the part that makes the dashboard survive its first argument.',
          ru: '«Выручка» в большинстве компаний означает три разных вещи. Записанная формула это то, что позволяет дашборду пережить первый спор о цифре.',
        },
      },
      {
        t: { en: 'Freshness must be visible', ru: 'Свежесть должна быть видна' },
        d: {
          en: 'Every number carries when it was collected. A decision made on yesterday’s figure believing it is today’s is the failure this thing exists to prevent.',
          ru: 'У каждого числа написано, когда оно собрано. Решение по вчерашней цифре в уверенности, что она сегодняшняя, это ровно та ошибка, ради которой всё и строится.',
        },
      },
      {
        t: { en: 'Nobody opens a dashboard daily', ru: 'Никто не открывает дашборд каждый день' },
        d: {
          en: 'The digest is what gets read. The screen is where you go after the digest says something moved.',
          ru: 'Читают дайджест. На экран заходят после того, как дайджест сказал, что что-то сдвинулось.',
        },
      },
    ],
    metrics: [
      { en: 'sources collected without gaps', ru: 'источников собрано без пропусков' },
      { en: 'hours of manual assembly removed', ru: 'убранных часов ручной сборки' },
      { en: 'digests opened', ru: 'открытых дайджестов' },
      { en: 'decisions taken on the same day', ru: 'решений, принятых в тот же день' },
    ],
    faq: [
      {
        q: { en: 'Why not Power BI or Metabase?', ru: 'Почему не Power BI или Metabase?' },
        a: {
          en: 'Often you should, and we will say so. Those need the data already collected and clean; the collecting and the matching is usually the actual job, and that is what this is.',
          ru: 'Часто и стоит, и мы это скажем. Им нужны уже собранные и чистые данные; сбор и сопоставление обычно и есть настоящая работа, и она здесь.',
        },
      },
    ],
  },

  {
    slug: 'subscription-service',
    kicker: 'Recurring revenue',
    title: { en: 'Charging every month without chasing anyone', ru: 'Списывать каждый месяц, ничего не выпрашивая' },
    lead: {
      en: 'Plans, trials, upgrades, failed cards and cancellations, handled by the system rather than by somebody sending reminders on the first of the month.',
      ru: 'Тарифы, пробные периоды, переходы, неудачные списания и отмены обрабатывает система, а не человек, рассылающий напоминания первого числа.',
    },
    audience: {
      en: 'Anyone selling access rather than a one-off: a service, a community, a tool, a content library. Especially where invoices are currently issued by hand.',
      ru: 'Все, кто продаёт доступ, а не разовую покупку: сервис, сообщество, инструмент, библиотека материалов. Особенно если счета сейчас выставляются руками.',
    },
    base: 'billing',
    composition: [
      { en: 'plans and periods', ru: 'тарифы и периоды' },
      { en: 'trial and first charge', ru: 'пробный период и первое списание' },
      { en: 'upgrades with proration', ru: 'переходы с пересчётом' },
      { en: 'failed payment recovery', ru: 'возврат после неудачного списания' },
      { en: 'cancellation and its consequences', ru: 'отмена и её последствия' },
      { en: 'invoices and receipts', ru: 'счета и чеки' },
    ],
    flow: [
      {
        t: { en: 'Access follows the payment, exactly', ru: 'Доступ следует за оплатой, ровно' },
        d: {
          en: 'One rule decides what a person can open, derived from their subscription state. Not a flag somebody sets by hand and forgets to unset.',
          ru: 'Что человек может открыть, решает одно правило, выведенное из состояния подписки. Не флаг, который кто-то ставит руками и забывает снять.',
        },
      },
      {
        t: { en: 'A card fails and nothing breaks', ru: 'Карта не прошла и ничего не сломалось' },
        d: {
          en: 'Retries on a schedule, a grace period, a message that does not read as a threat, and access that ends on a date the customer was told about.',
          ru: 'Повторы по расписанию, льготный период, сообщение, которое не читается как угроза, и доступ, который заканчивается в названную клиенту дату.',
        },
      },
      {
        t: { en: 'The provider is told twice and charges once', ru: 'Провайдер сказал дважды, списалось один раз' },
        d: {
          en: 'Payment webhooks arrive more than once by design. Every one is idempotent, so a repeated delivery can never take a second payment.',
          ru: 'Вебхуки платежей по устройству приходят не по одному разу. Каждый идемпотентен, поэтому повторная доставка не спишет второй раз.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'Cancellation must be easy', ru: 'Отмена должна быть простой' },
        d: {
          en: 'A hard cancellation buys one month and costs the review, the chargeback and the recommendation. It is also increasingly illegal.',
          ru: 'Сложная отмена покупает один месяц и стоит отзыва, чарджбэка и рекомендации. К тому же во всё большем числе стран она незаконна.',
        },
      },
      {
        t: { en: 'Who is the merchant of record', ru: 'Кто продавец записи' },
        d: {
          en: 'Taking payments yourself and taking them through a merchant of record are different amounts of paperwork, tax and risk. That is a decision before the first line of code.',
          ru: 'Принимать платежи самому и принимать через merchant of record это разный объём документов, налогов и риска. Это решение до первой строки кода.',
        },
      },
      {
        t: { en: 'Refunds are part of the design', ru: 'Возвраты это часть конструкции' },
        d: {
          en: 'Partial, full, mid-period, and what happens to access afterwards. Deciding this later means deciding it in a hurry with an angry customer waiting.',
          ru: 'Частичные, полные, в середине периода, и что происходит с доступом после. Решить это потом значит решать в спешке, пока ждёт злой клиент.',
        },
      },
    ],
    metrics: [
      { en: 'trials that became paid', ru: 'пробных, ставших платными' },
      { en: 'failed charges recovered', ru: 'восстановленных неудачных списаний' },
      { en: 'monthly churn', ru: 'месячный отток' },
      { en: 'support tickets about billing', ru: 'обращений в поддержку по оплате' },
    ],
    faq: [
      {
        q: { en: 'Cards and crypto at once?', ru: 'Карты и крипта сразу?' },
        a: {
          en: 'Yes, and both are already running in our own product. Two providers means two sets of webhooks and one shared subscription state, which is exactly where this kind of system usually goes wrong.',
          ru: 'Да, и оба уже работают в нашем собственном продукте. Два провайдера это два набора вебхуков и одно общее состояние подписки, и именно здесь такие системы обычно и ломаются.',
        },
      },
    ],
  },

  {
    slug: 'booking',
    kicker: 'Scheduling',
    title: { en: 'Online booking that does not double-book', ru: 'Онлайн-запись, которая не выдаёт слот дважды' },
    lead: {
      en: 'Clients pick a real free slot, get a confirmation and a reminder, and reschedule themselves, without a single message being exchanged to agree a time.',
      ru: 'Клиент выбирает реально свободный слот, получает подтверждение и напоминание и переносит запись сам, без единого сообщения ради согласования времени.',
    },
    audience: {
      en: 'Practices, studios, services and consultants where time is the product and half the admin is agreeing when, then reminding, then rescheduling.',
      ru: 'Практики, студии, сервисы и консультанты, где время и есть продукт, а половина администрирования это согласовать когда, потом напомнить, потом перенести.',
    },
    base: 'site',
    composition: [
      { en: 'a calendar of real availability', ru: 'календарь реальной доступности' },
      { en: 'confirmation and reminders', ru: 'подтверждение и напоминания' },
      { en: 'rescheduling by the client', ru: 'перенос силами клиента' },
      { en: 'prepayment, if you take it', ru: 'предоплата, если берёте' },
      { en: 'the specialist’s own view', ru: 'свой экран у специалиста' },
    ],
    flow: [
      {
        t: { en: 'The slot shown is a slot that exists', ru: 'Показанный слот действительно есть' },
        d: {
          en: 'Availability is computed from working hours, existing bookings, buffers and the specialist’s own calendar, in the client’s time zone.',
          ru: 'Доступность считается из рабочих часов, уже записанных, буферов и личного календаря специалиста, в часовом поясе клиента.',
        },
      },
      {
        t: { en: 'Booking ends in a confirmation', ru: 'Запись заканчивается подтверждением' },
        d: {
          en: 'Not «your request has been sent». Either the slot is held or the client is told immediately that it is not, because a pending booking is a booking nobody trusts.',
          ru: 'Не «ваша заявка отправлена». Либо слот занят за клиентом, либо ему сразу сказали, что нет: неподтверждённая запись это запись, которой никто не верит.',
        },
      },
      {
        t: { en: 'A reminder arrives before it matters', ru: 'Напоминание приходит вовремя' },
        d: {
          en: 'With a one-tap way to move it. Most no-shows are people who could not find how to say they cannot come.',
          ru: 'С возможностью перенести в одно касание. Большинство неявок это люди, которые не нашли способа сказать, что не придут.',
        },
      },
    ],
    watch: [
      {
        t: { en: 'Two people, one slot, same second', ru: 'Двое, один слот, одна секунда' },
        d: {
          en: 'The whole system is judged on this case. It is solved with a lock at the database level, not with a check in the interface that usually works.',
          ru: 'Вся система оценивается по этому случаю. Он решается блокировкой на уровне базы, а не проверкой в интерфейсе, которая обычно срабатывает.',
        },
      },
      {
        t: { en: 'Time zones are not optional', ru: 'Часовые пояса не опция' },
        d: {
          en: 'One client in another zone is enough to make «14:00» ambiguous, and it stays ambiguous until somebody misses a session.',
          ru: 'Одного клиента в другом поясе достаточно, чтобы «14:00» стало двусмысленным, и это выяснится, когда кто-то пропустит встречу.',
        },
      },
      {
        t: { en: 'The rules for moving it', ru: 'Правила переноса' },
        d: {
          en: 'How late is too late, what happens to a prepayment, how many times. Written into the system, so nobody negotiates it individually every week.',
          ru: 'За сколько уже поздно, что происходит с предоплатой, сколько раз можно. Записано в систему, чтобы это не согласовывали заново каждую неделю.',
        },
      },
    ],
    metrics: [
      { en: 'bookings made without a message', ru: 'записей без единого сообщения' },
      { en: 'no-show rate', ru: 'доля неявок' },
      { en: 'reschedules done by clients', ru: 'переносов, сделанных клиентами' },
      { en: 'admin hours returned', ru: 'возвращённых часов администрирования' },
    ],
    faq: [
      {
        q: { en: 'Why not Calendly?', ru: 'Почему не Calendly?' },
        a: {
          en: 'If it fits, use it, and we will tell you so. This is for the cases it does not cover: several specialists, prepayment, your own rules, or booking that has to live inside your own product.',
          ru: 'Если подходит, пользуйтесь, и мы прямо это скажем. Здесь речь о случаях, которые он не закрывает: несколько специалистов, предоплата, свои правила или запись внутри вашего собственного продукта.',
        },
      },
    ],
  },
]

export function solutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
