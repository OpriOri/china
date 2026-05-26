import {
  ArrowRight,
  Bus,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Headphones,
  HeartHandshake,
  ImageIcon,
  Menu,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  Utensils,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import heroBg from "../chinaassets/herobg.png";
import formBg from "../chinaassets/ChatGPT Image 26 мая 2026 г., 14_42_37.png";
import routeXian from "../chinaassets/china1 in pricing section.png";
import routeNanjing from "../chinaassets/china2 in pricing section.png";
import routeChongqing from "../chinaassets/china3 in pricing section.png";
import frameImage from "../chinaassets/ассет для рамки во второй секции.png";

const routeImages = [
  routeXian,
  routeNanjing,
  routeChongqing,
];

const programs = [
  {
    id: "xian",
    title: "Сиань",
    date: "14-26 июня",
    tag: "Язык + культура + история",
    price: "230 000 ₽",
    previousPrice: null as string | null,
    priceLabel: "стоимость программы",
    flightPrice: "78 850 ₽",
    format: "Обучение китайскому языку в Государственном лингвистическом университете Сианя и культурная программа.",
    accommodation: "Двухместное размещение в отеле недалеко от университета, завтрак включен.",
    image: routeImages[0],
    bullets: [
      "Обучение в Лингвистическом Университете Сианя",
      "Древняя столица Китая и улицы династии Тан",
      "Музей терракотового войска",
      "Театрализованное шоу и дегустации",
    ],
    highlights: [
      "Большая пагода диких гусей и улица Великой династии Тан",
      "Терракотовая армия - знаменитое «Восьмое чудо света»",
      "Городская стена, Bell & Drum Tower и Мусульманский квартал",
      "Музей Сианя, Малая пагода диких гусей и храм Дасиншань",
    ],
  },
  {
    id: "nanjing-shanghai",
    title: "Нанкин + Шанхай",
    date: "11-25 июля",
    tag: "Технологии + университеты + будущее",
    price: "230 000 ₽",
    previousPrice: null as string | null,
    priceLabel: "стоимость программы",
    flightPrice: "75 000 ₽",
    format: "Обучение в Технологическом университете Нанкина и двухдневная поездка в Шанхай.",
    accommodation: "Двухместное размещение в охраняемом кампусе университета; в Шанхае - отель по программе.",
    image: routeImages[1],
    bullets: [
      "Обучение в Технологическом Университете Нанкина",
      "Экскурсия на завод электромобилей NIO",
      "Шанхай: музеи, Хуанпу и городской масштаб",
      "Современные города, наука и технологии",
    ],
    highlights: [
      "Музей Нанкина и мавзолей Сунь Ятсена",
      "Экскурсия на производство электромобилей NIO в Хэфэе",
      "Шанхайский астрономический музей и планетарий",
      "Вечерняя прогулка по реке Хуанпу и парк Диснейленд",
    ],
  },
  {
    id: "chongqing-yangtze",
    title: "Чунцин + Янцзы + Чжанцзяцзе",
    date: "11-25 августа",
    tag: "Природа + путешествие + впечатления",
    price: "186 500 ₽",
    previousPrice: null as string | null,
    priceLabel: "стоимость программы",
    flightPrice: "79 650 ₽",
    format: "Экспедиционный маршрут без университетского обучения: Чунцин, круиз через Три ущелья и парки Чжанцзяцзе.",
    accommodation: "Отель 4* с завтраком и двухместные каюты с видом на реку на круизном лайнере.",
    image: routeImages[2],
    bullets: [
      "Чунцин - мегаполис будущего среди гор",
      "Круиз по реке Янцзы через три ущелья",
      "Чжанцзяцзе - горы Аватара и парки ЮНЕСКО",
      "Пейзажи, которые ребенок запомнит надолго",
    ],
    highlights: [
      "Монорельс Лизиба, ночной Хуньядун и городские маршруты Чунцина",
      "Круизный лайнер по Янцзы, ущелья Кутанг и Ву, плотина «Три ущелья»",
      "Юаньцзяцзе, гора Тяньцзы и вечернее шоу Impression Xiangxi",
      "Гора Тяньмэнь, канатная дорога, стеклянная тропа и скоростной поезд",
    ],
  },
];

const chongqingDays = [
  "Прилет, трансфер в отель, регистрация и акклиматизация.",
  "Горный Чунцин: Тунъюаньмэнь, башня Куйсин, музей «Три ущелья» и монорельс Лизиба.",
  "Зоопарк Чунцина с гигантскими пандами, район Шибати и ночной Хуньядун.",
  "Улица граффити, старая улица Хуанцзюэпин и чайный домик Цзяотун.",
  "Центр Чунцина и вечерняя посадка на круизный лайнер по Янцзы.",
  "Береговая экскурсия в город-призрак Фэнду и отдых на лайнере.",
  "Круиз по ущелью Кутанг, Трем малым ущельям и ущелью Ву.",
  "Плотина «Три ущелья» и переезд в Чжанцзяцзе.",
  "Юаньцзяцзе, гора Тяньцзы и вечернее шоу Impression Xiangxi.",
  "Живописный район Хуаншичжай и знакомство с парчой Туцзя.",
  "Гора Тяньмэнь: канатная дорога, стеклянная тропа и пещера Тяньмэнь.",
  "Возвращение в Чунцин на скоростном поезде, улица Сяхаоли и набережная Лунменьхао.",
  "Музей естественной истории, древний город Лунсин и площадка Наньшань.",
  "Трансфер в аэропорт.",
];

const reasons = [
  ["Язык будущего", "Китайский открывает двери к образованию, технологиям и международной карьере."],
  ["Технологии рядом", "Университеты, заводы и мегаполисы показывают, как выглядит завтрашний день."],
  ["Мировое образование", "Ребенок видит кампусы, студентов и академическую среду изнутри."],
  ["Культура и история", "Древний Китай, современные города и повседневная жизнь складываются в цельную картину."],
  ["Самостоятельность", "Новая среда, группа и языковая практика помогают стать увереннее."],
];

const timeline = [
  ["Подготовка", "Документы, визы, чат поездки и онлайн-встреча для родителей и детей."],
  ["Перелет", "Летим вместе рейсами Air China, сопровождение группы на всем пути."],
  ["Обучение", "Занятия с преподавателями, практика языка и общение со студентами."],
  ["Экскурсии", "Музеи, кампусы, технологии, природные парки и настоящая жизнь Китая."],
  ["Возвращение", "Новые знания, друзья, впечатления и уверенность в себе."],
];

const included: Array<[string, string, LucideIcon]> = [
  ["Обучение / маршрут", "Языковая программа в Сиане и Нанкине; экскурсионный маршрут для Чунцина.", GraduationCap],
  ["Проживание", "Отель, университетский кампус или каюта лайнера - по выбранной программе.", CheckCircle2],
  ["Питание", "Завтраки и питание по программе; на круизе - трехразовое питание.", Utensils],
  ["Программа", "Экскурсии, входные билеты и активности по маршруту.", Sparkles],
  ["Сопровождение 24/7", "Педагоги и кураторы на протяжении всей поездки.", Users],
  ["Трансферы", "Аэропорт, университеты, экскурсии и переезды.", Bus],
  ["Страховка", "Медицинская страховка на весь период поездки.", ShieldCheck],
  ["Поддержка", "Педагоги, кураторы и гиды сопровождают группу во время поездки.", Headphones],
];

const faqs: Array<[string, string, LucideIcon, string]> = [
  ["Нужно ли знать китайский язык для участия?", "Для программ в Сиане и Нанкине нужны начальные знания. Маршрут Чунцин - Янцзы - Чжанцзяцзе не включает языковое обучение.", GraduationCap, "学"],
  ["Могут ли родители поехать вместе с ребенком?", "Да, родители могут участвовать в культурной части поездки без обучения. Условия обсуждаются отдельно.", Users, "亲"],
  ["Как обеспечивается безопасность детей?", "До 20 человек вместе с двумя сопровождающими; на местах работают гиды и кураторы.", ShieldCheck, "安"],
  ["Какие документы нужны для поездки?", "Загранпаспорт, виза, страховка и согласие на выезд ребенка, если он едет без родителей.", CheckCircle2, "证"],
  ["Какого возраста дети участвуют?", "От 7 до 11 лет - с родителем, с 12 лет возможно самостоятельное участие.", Sparkles, "团"],
  ["Как родители будут на связи во время поездки?", "Общий чат группы и связь с кураторами на протяжении путешествия.", Headphones, "联"],
];

const travelTerms = [
  ["До 20 человек", "Включая двух сопровождающих: педагога и куратора."],
  ["Единый перелет", "Участие предполагает перелет группы одним рейсом Air China."],
  ["7-11 лет", "Участие ребенка вместе с родителем."],
  ["С 12 лет", "Ребенок может участвовать самостоятельно."],
];

const gallery = [
  heroBg,
  frameImage,
  routeImages[0],
  routeImages[1],
  routeImages[2],
  frameImage,
  routeImages[1],
  heroBg,
];

const heroWords = ["Образовательные", "Интересные", "Нескучные", "Вдохновляющие"];

type SubmitState = "idle" | "sending" | "success" | "error";

function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useCountdown(targetDate: string) {
  const getRemaining = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    return {
      days: Math.floor(diff / day),
      hours: Math.floor((diff % day) / hour),
      minutes: Math.floor((diff % hour) / minute),
    };
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 60_000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return remaining;
}

function useTypedWord(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setLetters(words[0].length);
      return;
    }

    const word = words[wordIndex];
    const atFullWord = letters === word.length;
    const atEmptyWord = letters === 0;
    const delay = deleting ? 48 : atFullWord ? 1800 : 88;

    const timer = window.setTimeout(() => {
      if (!deleting && atFullWord) {
        setDeleting(true);
        return;
      }

      if (deleting && atEmptyWord) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setLetters((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letters, wordIndex, words]);

  return words[wordIndex].slice(0, letters);
}

function AnimatedStat({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 950;
        const startedAt = performance.now();

        const animate = (time: number) => {
          const progress = Math.min(1, (time - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
        };

        animationFrame = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      <strong>{prefix}{displayValue}{suffix}</strong>
      {label}
    </span>
  );
}

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [program, setProgram] = useState(programs[0].title);
  const countdown = useCountdown("2026-06-14T09:00:00+03:00");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const consent = form.get("consent") === "on";

    if (!consent) {
      setState("error");
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    setState("sending");
    setError("");

    const payload = {
      source: compact ? "hero" : "request",
      parent_name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      child_age: Number(form.get("age")),
      program: programs.find((item) => item.title === program)?.id,
      consent,
      page_url: window.location.href,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api/v1";
      const response = await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      event.currentTarget.reset();
      setProgram(programs[0].title);
      setState("success");
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form
      className={`lead-form ${compact ? "lead-form--compact" : ""}`}
      style={compact ? ({ "--form-bg": `url("${formBg}")` } as React.CSSProperties) : undefined}
      onSubmit={submit}
    >
      {compact && <span className="form-kicker">Персональная консультация</span>}
      <h2>Получить программу и забронировать место</h2>
      {compact && (
        <div className="hero-offer">
          <span>До первой поездки</span>
          <strong>
            {countdown.days} дн. {countdown.hours} ч. {countdown.minutes} мин.
          </strong>
          <small>Получите подробную программу и условия участия</small>
        </div>
      )}
      <div className="form-grid">
        <label>
          <span>Имя родителя</span>
          <input name="name" required minLength={2} placeholder="Анна Иванова" />
        </label>
        <label>
          <span>Телефон</span>
          <input name="phone" required inputMode="tel" placeholder="+7 (999) 123-45-67" />
        </label>
        <label>
          <span>Возраст ребенка</span>
          <input name="age" required type="number" min={7} max={17} placeholder="12" />
        </label>
        <label>
          <span>Интересующая программа</span>
          <select value={program} onChange={(event) => setProgram(event.target.value)}>
            {programs.map((item) => (
              <option key={item.id}>{item.title}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required defaultChecked />
        <span>Я согласен на обработку персональных данных</span>
      </label>
      <button className="primary-button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем..." : "Получить программу"}
        <ArrowRight size={18} />
      </button>
      {state === "success" && <p className="form-message form-message--success">Заявка отправлена. Куратор скоро свяжется с вами.</p>}
      {state === "error" && <p className="form-message">{error}</p>}
    </form>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const typedWord = useTypedWord(heroWords);
  const [menuOpen, setMenuOpen] = useState(false);

  useRevealOnScroll();

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand" href="#top" aria-label="РОББО">
          <strong>РОББО</strong>
          <span>суверенная образовательная платформа для детей</span>
        </a>
        <nav id="site-nav" className={menuOpen ? "is-open" : ""}>
          <a href="#programs" onClick={closeMenu}>Программы</a>
          <a href="#why" onClick={closeMenu}>Почему Китай</a>
          <a href="#process" onClick={closeMenu}>Как устроено</a>
          <a href="#terms" onClick={closeMenu}>Условия</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
        </nav>
        <a className="header-button" href="#request" onClick={closeMenu}>Записаться</a>
        <button
          className="icon-button"
          aria-controls="site-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={closeMenu} />}

      <main id="top">
        <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="hero__content">
            <div className="hero-meta">
              <span className="eyebrow">Лето 2026 в Китае</span>
              <span>Москва - Китай / 14 дней</span>
            </div>
            <h1>
              <span className="typed-word" aria-hidden="true">{typedWord}</span>
              <span className="sr-only">Образовательные</span>
              <span className="hero-title__route">Поездки в <em>Китай</em></span>
              <small>для детей и подростков</small>
            </h1>
            <p>
              Не языковой лагерь, а первая международная экспедиция ребенка:
              университеты, технологии, культура и города, которые хочется исследовать.
            </p>
            <div className="stats">
              <AnimatedStat value={20} prefix="до " label="человек в группе" />
              <AnimatedStat value={2} label="сопровождающих" />
              <AnimatedStat value={1} label="перелет одним рейсом" />
              <AnimatedStat value={2} label="недели погружения" />
            </div>
            <a className="primary-button hero-button" href="#programs">
              Смотреть программы <ArrowRight size={18} />
            </a>
            <div className="journey-line" aria-label="Маршруты: Сиань, Шанхай, Янцзы, Чжанцзяцзе">
              <span>Сиань</span>
              <span>Шанхай</span>
              <span>Янцзы</span>
              <span>Чжанцзяцзе</span>
            </div>
          </div>
          <LeadForm compact />
        </section>

        <section className="section section--light atmosphere atmosphere--paper reveal" id="why">
          <div className="why-layout">
            <SectionHeading
              eyebrow="Почему Китай сейчас"
              title="Путешествие, после которого мир становится больше"
              text="Ребенок не читает про Китай в презентации, а оказывается внутри языка, кампусов, мегаполисов и истории."
            />
            <div className="why-visual">
              <img src={routeImages[1]} alt="Современный городской пейзаж Китая" />
              <div className="why-caption">
                <strong>Нанкин + Шанхай</strong>
                <span>университет / NIO / мегаполис</span>
              </div>
            </div>
          </div>
          <div className="reason-grid reveal-grid">
            {reasons.map(([title, text], index) => (
              <article className="reason-card" key={title}>
                <span className="reason-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <blockquote>
            <span>Образовательная экспедиция</span>
            Утром - занятия в кампусе. Вечером - город, о котором ребенок будет рассказывать дома.
          </blockquote>
        </section>

        <section className="section section--programs atmosphere atmosphere--warm reveal" id="programs">
          <SectionHeading
            eyebrow="Три главы лета"
            title="Выберите Китай, который увидит ваш ребенок"
            text="История, технологии или большая природная экспедиция: каждая программа имеет свой характер."
          />
          <div className="program-grid reveal-grid">
            {programs.map((program, index) => (
              <article className="program-card" key={program.id}>
                <div className="program-card__image">
                  <img src={program.image} alt={program.title} />
                  <span>{program.date}</span>
                  <div>
                    <small>Глава {String(index + 1).padStart(2, "0")}</small>
                    <h3>{program.title}</h3>
                    <p>{program.tag}</p>
                  </div>
                </div>
                <ul>
                  {program.bullets.map((bullet) => (
                    <li key={bullet}><CheckCircle2 size={18} />{bullet}</li>
                  ))}
                </ul>
                <footer>
                  <div className="program-price">
                    {program.previousPrice && <del>{program.previousPrice}</del>}
                    <small>{program.priceLabel}</small>
                    <strong>{program.price}</strong>
                  </div>
                  <a href="#request">Подробнее <ArrowRight size={16} /></a>
                </footer>
              </article>
            ))}
          </div>
          <div className="program-note">
            <span><Users size={24} /> Группы до 20 человек</span>
            <span><Plane size={24} /> Перелет одним рейсом Air China</span>
          </div>
          <div className="route-details">
            <div className="route-details__heading">
              <span>Подробная программа</span>
              <h3>Что ребенок увидит и как будет жить</h3>
            </div>
            {programs.map((program) => (
              <details className="route-detail" key={`${program.id}-detail`}>
                <summary>
                  <div>
                    <strong>{program.title}</strong>
                    <small>{program.date}</small>
                  </div>
                  <span>{program.price}</span>
                  <ChevronDown size={18} />
                </summary>
                <div className="route-detail__body">
                  <div className="route-facts">
                    <p><strong>Формат</strong>{program.format}</p>
                    <p><strong>Размещение</strong>{program.accommodation}</p>
                    <p><strong>Авиаперелет отдельно</strong>{program.flightPrice} / человек</p>
                  </div>
                  <div className="route-highlights">
                    <h4>В программе</h4>
                    <ul>
                      {program.highlights.map((highlight) => (
                        <li key={highlight}><CheckCircle2 size={17} />{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  {program.id === "chongqing-yangtze" && (
                    <div className="day-plan">
                      <h4>Маршрут по дням</h4>
                      <ol>
                        {chongqingDays.map((day, dayIndex) => (
                          <li key={day}><span>{String(dayIndex + 1).padStart(2, "0")}</span>{day}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="section process-section atmosphere atmosphere--mist reveal" id="process">
          <div className="process-layout">
            <SectionHeading
              eyebrow="Как проходит поездка"
              title="У ребенка - открытие. У родителей - спокойствие"
              text="До вылета познакомим группу и родителей. На месте каждый день проходит с педагогами и кураторами."
            />
            <div className="timeline reveal-grid">
              {timeline.map(([title, text], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {index === 1 ? <Plane /> : index === 2 ? <GraduationCap /> : index === 3 ? <TrainFront /> : <Sparkles />}
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="safety-strip">
            <strong>Безопасность - часть маршрута</strong>
            <span><ShieldCheck /> Забота 24/7</span>
            <span><Users /> Педагоги и кураторы</span>
            <span><HeartHandshake /> Проверенные партнеры</span>
          </div>
        </section>

        <section className="section gallery-section reveal">
          <SectionHeading
            eyebrow="Атмосфера маршрутов"
            title="Китай, который предстоит исследовать"
            text="Города, кампусы и природные пейзажи, вокруг которых построены программы поездок."
          />
          <div className="gallery-grid reveal-grid">
            {gallery.map((image, index) => (
              <img key={image} className={index === 0 ? "gallery-wide" : ""} src={image} alt="" />
            ))}
          </div>
          <a className="secondary-button" href="#request"><ImageIcon size={18} /> Получить презентацию</a>
        </section>

        <section className="section testimonials travel-terms atmosphere atmosphere--dark reveal" id="terms">
          <SectionHeading
            eyebrow="Условия участия"
            title="Что важно знать до выбора программы"
            text="Условия приведены по информационной программе поездок: возраст, состав группы и организация перелета."
          />
          <div className="terms-grid reveal-grid">
            {travelTerms.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section included-section atmosphere atmosphere--paper reveal">
          <SectionHeading
            eyebrow="Что входит в стоимость"
            title="Все для комфортного и безопасного путешествия"
            text="Мы берем на себя организацию, обучение, проживание, питание и насыщенную программу."
          />
          <div className="included-grid reveal-grid">
            {included.map(([title, text, Icon]) => (
              <article key={String(title)}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="flight-note"><Plane /> Авиаперелет оплачивается отдельно: 75 000-79 650 ₽ на человека в зависимости от маршрута.</div>
        </section>

        <section className="section faq-section atmosphere atmosphere--mist reveal" id="faq">
          <SectionHeading eyebrow="Вопросы родителей" title="Отвечаем на важные вопросы" />
          <div className="faq-list">
            {faqs.map(([question, answer, Icon, character]) => (
              <article className="faq-row" key={question}>
                <span className="faq-icon"><Icon size={18} /></span>
                <div>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
                <span className="faq-character">{character}</span>
                <ChevronDown className="faq-chevron" size={16} />
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta reveal" id="request" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="final-cta__intro">
            <span className="eyebrow">Станьте частью путешествия</span>
            <h2>Дайте ребенку увидеть <em>Китай</em> своими глазами</h2>
            <p>Оставьте заявку - пришлем подробную программу и ответим на вопросы.</p>
            <div className="trust-row">
              <span><Users /> Небольшие группы</span>
              <span><ShieldCheck /> Опытные педагоги</span>
              <span><Headphones /> Поддержка 24/7</span>
            </div>
          </div>
          <LeadForm />
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>РОББО</strong>
          <p>Мы создаем образовательные путешествия, которые расширяют горизонты и открывают новые возможности.</p>
        </div>
        <div>
          <h3>Программы</h3>
          {programs.map((program) => <a key={program.id} href="#programs">{program.title}</a>)}
        </div>
        <div>
          <h3>Контакты</h3>
          <a href="tel:+79039755050">+7 (903) 975-50-50</a>
          <span>Марина</span>
        </div>
        <small>© {currentYear} РОББО. Все права защищены.</small>
      </footer>
    </>
  );
}
