import { SectionHeading } from "../components/SectionHeading";
import { included } from "../data/siteData";

export function IncludedSection() {
  return (
    <section className="section included-section atmosphere atmosphere--paper reveal">
      <SectionHeading
        eyebrow="Что предусмотрено в поездке"
        title="Организация маршрута от встречи группы до возвращения"
        text="В октябрьскую программу входят проживание, питание по маршруту, переезды, экскурсии, мастер-классы, страховка и сопровождение. Полные условия куратор пришлёт после заявки."
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
      <div className="flight-note">Оставьте заявку — пришлём полную программу Шанхая и Ханчжоу по дням и подробно разберём условия участия.</div>
    </section>
  );
}
