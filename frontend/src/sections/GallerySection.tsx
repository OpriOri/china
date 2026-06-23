import { ImageIcon } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { gallery } from "../data/siteData";

export function GallerySection() {
  return (
    <section className="section gallery-section reveal">
      <SectionHeading
        eyebrow="Китай глазами участников"
        title="Мегаполисы, кампусы и природные парки"
        text="Не стоковая мечта о путешествии, а места и впечатления, из которых складываются наши образовательные маршруты по Китаю."
      />
      <div className="gallery-grid reveal-grid">
        {gallery.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className={index === 0 ? "gallery-wide" : ""}
            src={image}
            alt={["Участники образовательной поездки в Китай", "Современный город Китая", "Природный маршрут по Китаю", "Культурная программа в Китае", "Нанкин и Шанхай"][index]}
          />
        ))}
      </div>
      <a className="secondary-button" href="#request">
        <ImageIcon size={18} /> Получить программу поездки
      </a>
    </section>
  );
}
