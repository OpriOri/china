import { ArrowRight } from "lucide-react";
import { AnimatedStat } from "../components/AnimatedStat";
import { LeadForm } from "../components/LeadForm";
import { images } from "../data/siteData";
import type { ProgramId } from "../data/siteData";

export function HeroSection({ typedWord, selectedProgramId }: { typedWord: string; selectedProgramId: ProgramId }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${images.heroBg})` }}>
      <div className="hero__content">
        <div className="hero-meta">
          <span className="eyebrow">Лето 2026 в Китае</span>
          <span>Москва - Китай / 14 дней</span>
        </div>
        <h1>
          <span className="typed-word" aria-hidden="true">{typedWord}</span>
          <span className="sr-only">Образовательные</span>
          <span className="hero-title__route">Поездки в <em>Китай</em></span>
          <small>для детей и подростков</small>
        </h1>
        <p>
          Не языковой лагерь, а первая международная экспедиция ребенка:
          университеты, технологии, культура и города, которые хочется исследовать.
        </p>
        <div className="stats">
          <AnimatedStat value={20} prefix="до " label="человек в группе" />
          <AnimatedStat value={2} label="сопровождающих" />
          <AnimatedStat value={1} label="перелет одним рейсом" />
          <AnimatedStat value={2} label="недели погружения" />
        </div>
        <a className="primary-button hero-button" href="#programs">
          Смотреть программы <ArrowRight size={18} />
        </a>
        <div className="journey-line" aria-label="Маршруты: Сиань, Шанхай, Янцзы, Чжанцзяцзе">
          <span>Сиань</span>
          <span>Шанхай</span>
          <span>Янцзы</span>
          <span>Чжанцзяцзе</span>
        </div>
      </div>
      <LeadForm compact selectedProgramId={selectedProgramId} />
    </section>
  );
}
