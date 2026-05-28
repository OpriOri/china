import { GraduationCap, HeartHandshake, Plane, ShieldCheck, Sparkles, TrainFront, Users } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { timeline } from "../data/siteData";

export function ProcessSection() {
  return (
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
  );
}
