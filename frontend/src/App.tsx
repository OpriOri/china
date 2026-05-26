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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
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
    image: routeImages[0],
    bullets: [
      "Обучение в Лингвистическом Университете Сианя",
      "Древняя столица Китая и улицы династии Тан",
      "Музей терракотового войска",
      "Театрализованное шоу и дегустации",
    ],
  },
  {
    id: "nanjing-shanghai",
    title: "Нанкин + Шанхай",
    date: "11-25 июля",
    tag: "Технологии + университеты + будущее",
    price: "230 000 ₽",
    image: routeImages[1],
    bullets: [
      "Обучение в Технологическом Университете Нанкина",
      "Экскурсия на завод электромобилей NIO",
      "Шанхай: музеи, Хуанпу и городской масштаб",
      "Современные города, наука и технологии",
    ],
  },
  {
    id: "chongqing-yangtze",
    title: "Чунцин + Янцзы + Чжанцзяцзе",
    date: "11-25 августа",
    tag: "Природа + путешествие + впечатления",
    price: "230 000 ₽",
    image: routeImages[2],
    bullets: [
      "Чунцин - мегаполис будущего среди гор",
      "Круиз по реке Янцзы через три ущелья",
      "Чжанцзяцзе - горы Аватара и парки ЮНЕСКО",
      "Пейзажи, которые ребенок запомнит надолго",
    ],
  },
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
  ["Обучение", "Занятия китайским языком в ведущих университетах Китая.", GraduationCap],
  ["Проживание", "Отели или кампусы университетов, 2-местное размещение.", CheckCircle2],
  ["Питание", "Трехразовое питание с учетом возраста детей.", Utensils],
  ["Программа", "Экскурсии, входные билеты и активности по маршруту.", Sparkles],
  ["Сопровождение 24/7", "Педагоги и кураторы на протяжении всей поездки.", Users],
  ["Трансферы", "Аэропорт, университеты, экскурсии и переезды.", Bus],
  ["Страховка", "Медицинская страховка на весь период поездки.", ShieldCheck],
  ["Поддержка", "Связь с родителями и ежедневные фотоотчеты.", Headphones],
];

const faqs = [
  ["Нужно ли знать китайский язык для участия?", "Нет. Базовые знания приветствуются, но для детей без опыта предусмотрены вводные занятия и поддержка преподавателей."],
  ["Могут ли родители поехать вместе с ребенком?", "Да, родители могут участвовать в культурной части поездки без обучения. Условия обсуждаются отдельно."],
  ["Как обеспечивается безопасность детей?", "Группы небольшие, до 20 детей. С детьми постоянно находятся педагоги и кураторы, партнеры и маршруты заранее проверены."],
  ["Какие документы нужны для поездки?", "Загранпаспорт, виза, медицинская страховка и согласие на выезд ребенка, если он едет без родителей."],
  ["Какого возраста дети участвуют?", "Программы рассчитаны на детей 7-17 лет. Младшие дети едут с родителями, подростки могут ехать самостоятельно."],
  ["Как родители будут на связи во время поездки?", "У группы есть общий чат, кураторы ежедневно делятся фото и новостями. При необходимости возможна индивидуальная связь."],
];

const testimonials = [
  ["Елена М.", "мама Матвея, 12 лет", "Вернулись из Сианя под огромным впечатлением. Ребенок каждый день делился эмоциями и начал больше интересоваться языком."],
  ["Алексей П.", "папа Софии, 14 лет", "Нанкин и Шанхай стали идеальным сочетанием обучения, технологий и ярких впечатлений. Организация была спокойной и внимательной."],
  ["Мария К.", "мама Артема, 13 лет", "Поездка в Чунцин и на Янцзы стала приключением. Природа потрясающая, а ребенок вернулся более самостоятельным."],
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

type SubmitState = "idle" | "sending" | "success" | "error";

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
      source: compact ? "contact" : "diagnostic",
      name: String(form.get("name") || ""),
      contact: String(form.get("phone") || ""),
      comment: `Возраст ребенка: ${String(form.get("age") || "-")}. Программа: ${program}.`,
      selected_service: {
        code: programs.find((item) => item.title === program)?.id,
        title: program,
        price: programs.find((item) => item.title === program)?.price,
      },
      selections: {
        child_age: String(form.get("age") || ""),
        program,
      },
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
      <h2>Получить программу и забронировать место</h2>
      {compact && (
        <div className="hero-offer">
          <span>До первой поездки</span>
          <strong>
            {countdown.days} дн. {countdown.hours} ч. {countdown.minutes} мин.
          </strong>
          <small>Успейте записаться и получить раннюю скидку</small>
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
          <input name="age" required inputMode="numeric" placeholder="12 лет" />
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

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="РОББО">
          <strong>РОББО</strong>
          <span>суверенная образовательная платформа для детей</span>
        </a>
        <nav>
          <a href="#programs">Программы</a>
          <a href="#why">Почему Китай</a>
          <a href="#process">Как устроено</a>
          <a href="#reviews">Отзывы</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-button" href="#request">Записаться</a>
        <button className="icon-button" aria-label="Открыть меню">
          <Menu size={22} />
        </button>
      </header>

      <main id="top">
        <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
          <div className="hero__content">
            <span className="eyebrow">Лето 2026 в Китае</span>
            <h1>
              Образовательные поездки в <em>Китай</em> для детей 7-17 лет
            </h1>
            <p>
              Изучение китайского языка в университетах, технологии, культура и путешествия
              по самым интересным городам Китая.
            </p>
            <div className="stats">
              <span><strong>до 20</strong> детей в группе</span>
              <span><strong>2</strong> сопровождающих</span>
              <span><strong>1</strong> перелет одним рейсом</span>
              <span><strong>2</strong> недели погружения</span>
            </div>
            <a className="primary-button hero-button" href="#programs">
              Смотреть программы <ArrowRight size={18} />
            </a>
          </div>
          <LeadForm compact />
        </section>

        <section className="section section--light" id="why">
          <SectionHeading
            eyebrow="Почему Китай сейчас"
            title="Это инвестиция в будущее вашего ребенка"
            text="Ребенок видит современный Китай не из учебника: университеты, технологии, язык, культуру и новые горизонты."
          />
          <div className="reason-grid">
            {reasons.map(([title, text], index) => (
              <article className="reason-card" key={title}>
                <span className="reason-number">{String(index + 1).padStart(2, "0")}</span>
                <img src={index === 0 ? routeImages[1] : index === 4 ? routeImages[2] : frameImage} alt="" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <blockquote>Мир меняется. Дайте ребенку преимущество сегодня, чтобы он был готов к возможностям завтра.</blockquote>
        </section>

        <section className="section section--programs" id="programs">
          <SectionHeading eyebrow="Программы поездок" title="Три маршрута. Один незабываемый опыт" />
          <div className="program-grid">
            {programs.map((program) => (
              <article className="program-card" key={program.id}>
                <div className="program-card__image">
                  <img src={program.image} alt={program.title} />
                  <span>{program.date}</span>
                  <div>
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
                  <strong>{program.price}</strong>
                  <a href="#request">Подробнее <ArrowRight size={16} /></a>
                </footer>
              </article>
            ))}
          </div>
          <div className="program-note">
            <span><Users size={24} /> Группы до 20 человек</span>
            <span><Plane size={24} /> Перелет одним рейсом Air China</span>
          </div>
        </section>

        <section className="section process-section" id="process">
          <SectionHeading
            eyebrow="Как проходит поездка"
            title="Продумано до мелочей. Чтобы вы были спокойны"
            text="Мы берем на себя организацию, безопасность и заботу, чтобы дети могли учиться, исследовать и наслаждаться путешествием."
          />
          <div className="timeline">
            {timeline.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {index === 1 ? <Plane /> : index === 2 ? <GraduationCap /> : index === 3 ? <TrainFront /> : <Sparkles />}
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="safety-strip">
            <span><ShieldCheck /> Безопасность 24/7</span>
            <span><Users /> Профессиональные сопровождающие</span>
            <span><HeartHandshake /> Проверенные партнеры в Китае</span>
          </div>
        </section>

        <section className="section gallery-section">
          <SectionHeading
            eyebrow="Галерея"
            title="Живые впечатления. Настоящий Китай"
            text="Фото поездок, кампусов, городов и моментов, которые остаются с детьми надолго."
          />
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <img key={image} className={index === 0 ? "gallery-wide" : ""} src={image} alt="" />
            ))}
          </div>
          <a className="secondary-button" href="#request"><ImageIcon size={18} /> Получить больше фото</a>
        </section>

        <section className="section testimonials" id="reviews">
          <SectionHeading
            eyebrow="Отзывы родителей"
            title="Родители доверяют - дети возвращаются вдохновленными"
          />
          <div className="testimonial-grid">
            {testimonials.map(([name, role, text]) => (
              <article key={name}>
                <span>“</span>
                <p>{text}</p>
                <strong>{name}</strong>
                <small>{role}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section included-section">
          <SectionHeading
            eyebrow="Что входит в стоимость"
            title="Все для комфортного и безопасного путешествия"
            text="Мы берем на себя организацию, обучение, проживание, питание и насыщенную программу."
          />
          <div className="included-grid">
            {included.map(([title, text, Icon]) => (
              <article key={String(title)}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="flight-note"><Plane /> Авиаперелет не входит в стоимость. Мы поможем подобрать удобные рейсы.</div>
        </section>

        <section className="section faq-section" id="faq">
          <SectionHeading eyebrow="Вопросы родителей" title="Отвечаем на важные вопросы" />
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<ChevronDown size={18} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta" id="request" style={{ backgroundImage: `url(${heroBg})` }}>
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
          <a href="tel:+79951234567">+7 (995) 123-45-67</a>
          <a href="mailto:info@robbo-travel.ru">info@robbo-travel.ru</a>
          <span>Пн-Пт: 10:00-19:00</span>
        </div>
        <small>© {currentYear} РОББО. Все права защищены.</small>
      </footer>
    </>
  );
}
