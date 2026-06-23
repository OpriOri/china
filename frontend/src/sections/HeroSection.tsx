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
          <span className="eyebrow">Образовательные туры 2026</span>
          <span>Три маршрута по Китаю</span>
        </div>
        <h1>
          <span className="typed-word" aria-hidden="true">{typedWord}</span>
          <span className="sr-only">Образовательные туры в Китай</span>
          <span className="hero-title__route">Туры в <em>Китай</em></span>
          <small>для детей и подростков 7–17 лет</small>
        </h1>
        <p>
          Нанкин и Шанхай, круиз по Янцзы и горы Чжанцзяцзе или Шанхай и Ханчжоу —
          с насыщенной программой, сопровождением и заботой на всём маршруте
        </p>
        <div className="stats">
          <AnimatedStat value={20} prefix="до " label="человек в группе" />
          <AnimatedStat value={2} label="сопровождающих" />
          <AnimatedStat value={3} label="маршрута на выбор" />
          <AnimatedStat value={24} suffix="/7" label="связь с кураторами" />
        </div>
        <a className="primary-button hero-button" href="#programs">
          Выбрать маршрут <ArrowRight size={18} />
        </a>
        <div className="journey-line" aria-label="Маршруты: Нанкин, Шанхай, Янцзы, Чжанцзяцзе, Ханчжоу">
          <span>Нанкин</span>
          <span>Шанхай</span>
          <span>Янцзы</span>
          <span>Чжанцзяцзе</span>
          <span>Ханчжоу</span>
        </div>
      </div>
      <LeadForm compact selectedProgramId={selectedProgramId} />
    </section>
  );
}
