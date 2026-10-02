import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Hotel,
  Laptop,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import {
  activeProgramHighlights,
  activeProgramIncluded,
  activeProgramMedia,
  aiWorkshopSteps,
  programs,
  shanghaiHangzhouDays,
} from "../data/siteData";

export function ProgramsSection() {
  const closedPrograms = programs.filter((program) => program.registrationClosed && program.id !== "shanghai-hangzhou");

  return (
    <section className="section section--programs atmosphere atmosphere--warm reveal" id="programs">
      <SectionHeading
        eyebrow="Программа 4–10 октября 2026 · набор закрыт"
        title="Шанхай и Ханчжоу: от чайных плантаций до искусственного интеллекта"
        text="За семь дней участники увидят две разные грани Китая: динамичный Шанхай и культурное сердце Ханчжоу. Современные технологии, традиции и яркие впечатления складываются в один понятный образовательный маршрут."
      />

      <article className="featured-program">
        <div className="featured-program__visual">
          <img src={activeProgramMedia.longjing} alt="Чайные плантации Лунцзина в Ханчжоу" />
          <div className="featured-program__route">
            <span>4–10 октября 2026</span>
            <strong>Шанхай → Ханчжоу → Шанхай</strong>
          </div>
        </div>
        <div className="featured-program__content">
          <span className="featured-program__label">Набор закрыт</span>
          <h3>Образовательное путешествие для школьников и родителей</h3>
          <p>Регистрация на поездку завершена. Оставили маршрут на сайте, чтобы вы могли познакомиться с форматом наших образовательных путешествий.</p>
          <div className="featured-program__facts">
            <span><Clock3 /> <strong>7 дней</strong><small>6 ночей</small></span>
            <span><MapPin /> <strong>2 города</strong><small>Шанхай и Ханчжоу</small></span>
            <span><Hotel /> <strong>Отели 4*</strong><small>двухместное размещение</small></span>
            <span><Users /> <strong>Дети и родители</strong><small>группа с сопровождением</small></span>
          </div>
          <div className="featured-program__actions">
            <a className="secondary-button" href="#october-route">Посмотреть маршрут по дням</a>
            <a className="primary-button" href="https://hochuvseznat.club">Назад на сайт</a>
          </div>
        </div>
      </article>

      <div className="program-highlight-grid reveal-grid" aria-label="Главные впечатления поездки">
        {activeProgramHighlights.map(([title, text, image]) => (
          <article className="program-highlight" key={title}>
            <img src={image} alt="" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="october-route" id="october-route">
        <div className="route-details__heading">
          <span>4–10 октября · программа по дням</span>
          <h3>Семь дней, которые легко представить заранее</h3>
          <p>Каждый день имеет понятную тему: от первого знакомства с Шанхаем до собственного AI-проекта и большого финала в Disneyland.</p>
        </div>
        <div className="october-route__timeline">
          {shanghaiHangzhouDays.map((day) => (
            <article className="october-day" key={day.day}>
              <div className="october-day__number">{day.day}</div>
              {"image" in day && day.image && <img src={day.image} alt="" />}
              <div className="october-day__content">
                <span>{day.date}</span>
                <h4>{day.title}</h4>
                <p>{day.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <article className="ai-workshop">
        <div className="ai-workshop__visual">
          <img src={activeProgramMedia.alibaba} alt="Кампус Alibaba в Ханчжоу" />
          <span><BrainCircuit /> Центральный образовательный акцент</span>
        </div>
        <div className="ai-workshop__content">
          <span className="eyebrow">Практикум в Alibaba</span>
          <h3>AI-агент своими руками</h3>
          <p>Участники пройдут путь от идеи до работающего помощника: поймут базовые принципы современных языковых моделей, соберут собственного AI-агента и представят результат группе.</p>
          <ol>
            {aiWorkshopSteps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </li>
            ))}
          </ol>
          <aside><Laptop /> Для участия в практикуме понадобится ноутбук Windows или Mac.</aside>
        </div>
      </article>

      <div className="active-program-included">
        <div>
          <span className="eyebrow">Условия участия</span>
          <h3>Что входит в программу</h3>
          <p>Регистрация закрыта. Здесь показан состав октябрьской программы для знакомства с форматом поездки.</p>
        </div>
        <ul>
          {activeProgramIncluded.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}
        </ul>
        <a className="primary-button" href="https://hochuvseznat.club">Назад на сайт</a>
      </div>

      <div className="program-note">
        <span><ShieldCheck size={24} /> Сопровождение на всём маршруте</span>
        <span><TrainFront size={24} /> Скоростной поезд между городами</span>
        <span><Plane size={24} /> Организованная дорога группы</span>
        <span><Sparkles size={24} /> Практика, культура и впечатления</span>
      </div>

      <div className="closed-programs">
        <div className="closed-programs__heading">
          <span>Архив программ</span>
          <h3>Набор на эти поездки закрыт</h3>
          <p>Маршруты остаются на странице как примеры образовательных путешествий, которые мы организуем.</p>
        </div>
        <div className="closed-programs__grid">
          {closedPrograms.map((program) => (
            <article className="closed-program" key={program.id}>
              <div className="closed-program__image">
                <img src={program.image} alt={program.title} />
                <mark>Закрыто</mark>
              </div>
              <div className="closed-program__content">
                <span>{program.date}</span>
                <h4>{program.title}</h4>
                <p>{program.tag}</p>
                <details>
                  <summary>Что входило в маршрут</summary>
                  <ul>{program.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
