import { Camera, GraduationCap, Globe2, Headphones, ShieldCheck, TrainFront, Users } from "lucide-react";
import { images } from "../data/siteData";
import maxLogo from "../../chinaassets/maxlogo.jpg";
import telegramLogo from "../../chinaassets/telegramlogo.webp";

export function FinalCtaSection() {
  return (
    <section className="final-cta reveal" id="request" style={{ backgroundImage: `url(${images.heroBg})` }}>
      <div className="final-cta__intro">
        <span className="eyebrow">Шанхай и Ханчжоу · 4–10 октября</span>
        <h2>Регистрация на поездку <em>закрыта</em></h2>
        <p>Следите за новыми образовательными маршрутами в наших каналах или возвращайтесь на основной сайт.</p>
        <div className="trust-row">
          <span><Users /> Небольшие группы</span>
          <span><ShieldCheck /> Опытные педагоги</span>
          <span><Headphones /> Поддержка 24/7</span>
        </div>
        <aside className="social-subscribe" aria-labelledby="social-subscribe-title">
          <div className="social-subscribe__intro">
            <span>Оставайтесь на связи</span>
            <h3 id="social-subscribe-title">Следите за новыми программами</h3>
            <p>Подпишитесь на наши каналы и первыми узнавайте о новых поездках, образовательных маршрутах и наборах групп.</p>
          </div>
          <ul>
            <li><Camera size={18} /> Фотоотчёты из поездок</li>
            <li><GraduationCap size={18} /> Университеты и технологии Китая</li>
            <li><TrainFront size={18} /> Скоростные поезда и современные города</li>
            <li><Globe2 size={18} /> Новые маршруты и программы</li>
          </ul>
          <div className="social-subscribe__actions">
            <a href="https://t.me/kitaysky_zarechye" target="_blank" rel="noreferrer">
              <img src={telegramLogo} alt="" /> Telegram · @kitaysky_zarechye
            </a>
            <a href="https://max.ru/id5032358711_biz" target="_blank" rel="noreferrer">
              <img src={maxLogo} alt="" /> MAX
            </a>
          </div>
        </aside>
      </div>
      <a className="primary-button final-cta__home" href="https://hochuvseznat.club">Назад на сайт</a>
    </section>
  );
}
