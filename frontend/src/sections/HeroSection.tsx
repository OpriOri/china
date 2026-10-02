import { ArrowRight } from "lucide-react";
import { AnimatedStat } from "../components/AnimatedStat";
import { images } from "../data/siteData";

export function HeroSection({ typedWord }: { typedWord: string }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${images.heroBg})` }}>
      <div className="hero__content">
        <div className="hero-meta">
          <span className="eyebrow">4–10 октября 2026</span>
          <span>7 дней / 6 ночей · отели 4*</span>
        </div>
        <h1>
          <span className="typed-word" aria-hidden="true">{typedWord}</span>
          <span className="sr-only">Образовательная поездка в Шанхай и Ханчжоу</span>
          <span className="hero-title__route"><em>Шанхай</em> + Ханчжоу</span>
          <small>для школьников и родителей</small>
        </h1>
        <p>
          От панорамы Шанхая и крупнейшего астрономического музея мира до чайных
          плантаций Лунцзина, Alibaba, собственного AI-агента и дня в Disneyland.
        </p>
        <div className="stats">
          <AnimatedStat value={7} label="дней программы" />
          <AnimatedStat value={2} label="города Китая" />
          <AnimatedStat value={1} label="собственный AI-проект" />
          <AnimatedStat value={24} suffix="/7" label="связь с кураторами" />
        </div>
        <a className="primary-button hero-button" href="#programs">
          Посмотреть программу <ArrowRight size={18} />
        </a>
        <div className="journey-line" aria-label="Маршрут: Шанхай, Ханчжоу, Лунцзин, Alibaba, Disneyland">
          <span>Шанхай</span>
          <span>Ханчжоу</span>
          <span>Лунцзин</span>
          <span>Alibaba</span>
          <span>Disneyland</span>
        </div>
      </div>
      <aside className="hero-closed-card" aria-label="Статус октябрьской поездки">
        <span>Шанхай и Ханчжоу · 4–10 октября 2026</span>
        <h2>Набор на поездку закрыт</h2>
        <p>Посмотрите программу по дням и подпишитесь на наши каналы, чтобы узнать о следующих поездках.</p>
        <a className="secondary-button" href="#october-route">Посмотреть маршрут <ArrowRight size={18} /></a>
      </aside>
    </section>
  );
}
