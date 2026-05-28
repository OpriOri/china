import { ChevronDown } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { faqs } from "../data/siteData";

export function FaqSection() {
  return (
    <section className="section faq-section atmosphere atmosphere--mist reveal" id="faq">
      <SectionHeading eyebrow="Вопросы родителей" title="Отвечаем на важные вопросы" />
      <div className="faq-list">
        {faqs.map(([question, answer, Icon, character]) => (
          <article className="faq-row" key={question}>
            <span className="faq-icon"><Icon size={18} /></span>
            <div>
              <h3>{question}</h3>
              <p>{answer}</p>
            </div>
            <span className="faq-character">{character}</span>
            <ChevronDown className="faq-chevron" size={16} />
          </article>
        ))}
      </div>
    </section>
  );
}
