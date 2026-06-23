import { SectionHeading } from "../components/SectionHeading";
import { included } from "../data/siteData";

export function IncludedSection() {
  return (
    <section className="section included-section atmosphere atmosphere--paper reveal">
      <SectionHeading
        eyebrow="Что предусмотрено в поездке"
        title="Организация маршрута от встречи группы до возвращения"
        text="Проживание, питание, переезды, экскурсии и сопровождение зависят от выбранного тура. Точный состав программы куратор пришлёт после заявки."
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
      <div className="flight-note">Оставьте заявку — пришлём программу по дням и подробно разберём условия выбранного маршрута.</div>
    </section>
  );
}
