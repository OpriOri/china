import { SectionHeading } from "../components/SectionHeading";
import { included } from "../data/siteData";

export function IncludedSection() {
  return (
    <section className="section included-section atmosphere atmosphere--paper reveal">
      <SectionHeading
        eyebrow="Что входит в программу"
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
      <div className="flight-note">Подробные условия участия и презентацию пришлем после заявки.</div>
    </section>
  );
}
