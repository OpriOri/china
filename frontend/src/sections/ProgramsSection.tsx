import { ArrowRight, CheckCircle2, ChevronDown, Plane, Users, X } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { chongqingDays, programs } from "../data/siteData";
import type { ProgramId } from "../data/siteData";

export function ProgramsSection({
  flippedProgramIds,
  toggleProgramDetails,
  openBooking,
}: {
  flippedProgramIds: ProgramId[];
  toggleProgramDetails: (programId: ProgramId) => void;
  openBooking: (programId: ProgramId) => void;
}) {
  return (
    <section className="section section--programs atmosphere atmosphere--warm reveal" id="programs">
      <SectionHeading
        eyebrow="Три главы лета"
        title="Выберите Китай, который увидит ваш ребенок"
        text="История, технологии или большая природная экспедиция: каждая программа имеет свой характер."
      />
      <div className="program-grid reveal-grid">
        {programs.map((program, index) => (
          <article className={`program-card program-card--flip ${flippedProgramIds.includes(program.id) ? "is-flipped" : ""}`} key={program.id}>
            <div className="program-card__inner">
              <div className="program-card__face program-card__face--front">
                <div className="program-card__image">
                  <img src={program.image} alt={program.title} />
                  <span>{program.date}</span>
                  {program.statusLabel && <mark>{program.statusLabel}</mark>}
                  <div>
                    <small>Глава {String(index + 1).padStart(2, "0")}</small>
                    <h3>{program.title}</h3>
                    <p>{program.tag}</p>
                  </div>
                </div>
                <p className="program-urgency">{program.urgency}</p>
                <ul>
                  {program.bullets.map((bullet) => (
                    <li key={bullet}><CheckCircle2 size={18} />{bullet}</li>
                  ))}
                </ul>
                <footer>
                  <div className="program-terms">
                    <small>{program.registrationClosed ? "набор завершён" : "условия участия"}</small>
                    <strong>{program.registrationClosed ? "Регистрация закрыта" : "По запросу"}</strong>
                  </div>
                  <div className="program-actions">
                    <button type="button" className="program-link" onClick={() => toggleProgramDetails(program.id)}>
                      Подробнее <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      className="program-book"
                      disabled={program.registrationClosed}
                      onClick={() => !program.registrationClosed && openBooking(program.id)}
                    >
                      {program.cta}
                    </button>
                  </div>
                </footer>
              </div>
              <div className="program-card__face program-card__face--back">
                <button type="button" className="program-close" aria-label="Закрыть подробности" onClick={() => toggleProgramDetails(program.id)}>
                  <X size={18} />
                </button>
                <small>{program.date}</small>
                <h3>{program.title}</h3>
                <p><strong>Формат:</strong> {program.format}</p>
                <p><strong>Размещение:</strong> {program.accommodation}</p>
                <ul>
                  {program.highlights.map((highlight) => (
                    <li key={highlight}><CheckCircle2 size={17} />{highlight}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="program-book"
                  disabled={program.registrationClosed}
                  onClick={() => !program.registrationClosed && openBooking(program.id)}
                >
                  {program.registrationClosed ? "Регистрация закрыта" : "Оставить заявку"}
                </button>
              </div>
            </div>
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
              <span>{program.registrationClosed ? "закрыто" : "по запросу"}</span>
              <ChevronDown size={18} />
            </summary>
            <div className="route-detail__body">
              <div className="route-facts">
                <p><strong>Формат</strong>{program.format}</p>
                <p><strong>Размещение</strong>{program.accommodation}</p>
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
  );
}
