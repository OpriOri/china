import { GraduationCap, HeartHandshake, Plane, ShieldCheck, Sparkles, TrainFront, Users } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { timeline } from "../data/siteData";

export function ProcessSection() {
  return (
    <section className="section process-section atmosphere atmosphere--mist reveal" id="process">
      <div className="process-layout">
        <SectionHeading
          eyebrow="Организация и сопровождение"
          title="Ребёнку — открытия. Родителям — спокойствие"
          text="До вылета знакомим участников и родителей, помогаем с подготовкой и документами. В Китае группа проходит маршрут вместе с педагогами, кураторами и местными гидами."
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
        <strong>Безопасность — часть маршрута</strong>
        <span><ShieldCheck /> Забота 24/7</span>
        <span><Users /> Педагоги и кураторы</span>
        <span><HeartHandshake /> Гиды и принимающая сторона</span>
      </div>
    </section>
  );
}
