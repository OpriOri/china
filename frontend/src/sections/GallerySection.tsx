import { ImageIcon } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { gallery } from "../data/siteData";
import maxLogo from "../../chinaassets/maxlogo.jpg";
import telegramLogo from "../../chinaassets/telegramlogo.webp";

export function GallerySection() {
  return (
    <section className="section gallery-section reveal" id="media">
      <SectionHeading
        eyebrow="Китай, который участники увидят сами"
        title="Мегаполис, чайные поля, технологии и большой финал"
        text="Несколько ключевых мест октябрьской программы: от Шанхая и Лунцзина до Alibaba, астрономического музея и Disneyland. Больше материалов и живых отчётов публикуем в наших каналах."
      />
      <div className="gallery-grid reveal-grid">
        {gallery.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className={index === 0 ? "gallery-wide" : ""}
            src={image}
            alt={["Участники образовательной поездки в Китай", "Чайные плантации Лунцзина", "Кампус Alibaba в Ханчжоу", "Шанхайский астрономический музей", "Shanghai Disneyland"][index]}
          />
        ))}
      </div>
      <div className="gallery-actions">
        <a className="secondary-button" href="#october-route"><ImageIcon size={18} /> Посмотреть программу по дням</a>
        <a className="media-channel" href="https://t.me/kitaysky_zarechye" target="_blank" rel="noreferrer">
          <img src={telegramLogo} alt="" /><span><strong>Telegram</strong><small>@kitaysky_zarechye</small></span>
        </a>
        <a className="media-channel" href="https://max.ru/id5032358711_biz" target="_blank" rel="noreferrer">
          <img src={maxLogo} alt="" /><span><strong>MAX</strong><small>Новости и новые программы</small></span>
        </a>
      </div>
    </section>
  );
}
