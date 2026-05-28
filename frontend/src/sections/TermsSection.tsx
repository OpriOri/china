import { SectionHeading } from "../components/SectionHeading";
import { travelTerms } from "../data/siteData";

export function TermsSection() {
  return (
    <section className="section testimonials travel-terms atmosphere atmosphere--dark reveal" id="terms">
      <SectionHeading
        eyebrow="Условия участия"
        title="Что важно знать до выбора программы"
        text="Условия приведены по информационной программе поездок: возраст, состав группы и организация перелета."
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
