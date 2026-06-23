import { SectionHeading } from "../components/SectionHeading";
import { images, reasons } from "../data/siteData";

export function WhySection() {
  return (
    <section className="section section--light atmosphere atmosphere--paper reveal" id="why">
      <div className="why-layout">
        <div className="why-copy">
          <SectionHeading
            eyebrow="Зачем ребенку Китай"
            title="Поездка, которая превращает интерес в личный опыт"
            text="Не смотреть на Китай со стороны, а прожить его: увидеть мегаполисы и университеты, познакомиться с культурой, попробовать себя в новой среде и вернуться увереннее."
          />
          <div className="why-action">
            <span>Для детей и подростков 7–17 лет</span>
            <a href="#programs">Выбрать маршрут <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="why-visual">
          <img src={images.whyImage} alt="Подросток смотрит на вечерний Шанхай с высоты" />
          <div className="why-caption">
            <strong>Увидеть своими глазами</strong>
            <span>мегаполисы / культура / новый масштаб</span>
          </div>
        </div>
      </div>
      <div className="reason-grid reveal-grid">
        {reasons.map(([title, text], index) => (
          <article className="reason-card" key={title}>
            <span className="reason-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <blockquote>
        <span>Главный результат поездки</span>
        Ребёнок возвращается не только с фотографиями, но и с ощущением: большой мир открыт, понятен и полон возможностей.
      </blockquote>
    </section>
  );
}
