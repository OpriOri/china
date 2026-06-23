import { SectionHeading } from "../components/SectionHeading";
import { travelTerms } from "../data/siteData";

export function TermsSection() {
  return (
    <section className="section testimonials travel-terms atmosphere atmosphere--dark reveal" id="terms">
      <SectionHeading
        eyebrow="Условия участия"
        title="Кому подходят образовательные туры в Китай"
        text="Основные условия участия: возраст ребёнка, формат сопровождения, размер группы и организация дороги. Детали зависят от выбранной программы."
      />
      <div className="terms-grid reveal-grid">
        {travelTerms.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
