import { Headphones, ShieldCheck, Users } from "lucide-react";
import { LeadForm } from "../components/LeadForm";
import { images } from "../data/siteData";
import type { ProgramId } from "../data/siteData";

export function FinalCtaSection({ selectedProgramId }: { selectedProgramId: ProgramId }) {
  return (
    <section className="final-cta reveal" id="request" style={{ backgroundImage: `url(${images.heroBg})` }}>
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
      <LeadForm compact selectedProgramId={selectedProgramId} />
    </section>
  );
}
