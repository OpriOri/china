import { SectionHeading } from "../components/SectionHeading";
import { testimonials } from "../data/siteData";

export function TestimonialsSection() {
  return (
    <section className="section testimonials real-testimonials atmosphere atmosphere--paper reveal">
      <SectionHeading
        eyebrow="Отзывы родителей"
        title="Что говорят после поездки"
        text="Реальные сообщения родителей из чата после путешествия."
      />
      <div className="testimonial-grid reveal-grid">
        {testimonials.map((review) => (
          <article key={review.author}>
            <span aria-hidden="true">“</span>
            <p>{review.text}</p>
            <small>{review.author}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
