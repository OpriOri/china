import { SectionHeading } from "../components/SectionHeading";
import { reasons, routeImages } from "../data/siteData";

export function WhySection() {
  return (
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
  );
}
