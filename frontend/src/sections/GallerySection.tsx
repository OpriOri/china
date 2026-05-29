import { ImageIcon } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { gallery } from "../data/siteData";

export function GallerySection() {
  return (
    <section className="section gallery-section reveal">
      <SectionHeading
        eyebrow="Атмосфера маршрутов"
        title="Китай, который предстоит исследовать"
        text="Города, кампусы и природные пейзажи, вокруг которых построены программы поездок."
      />
      <div className="gallery-grid reveal-grid">
        {gallery.map((image, index) => (
          <img key={`${image}-${index}`} className={index === 0 ? "gallery-wide" : ""} src={image} alt="" />
        ))}
      </div>
      <a className="secondary-button" href="#request">
        <ImageIcon size={18} /> Запросить презентацию
      </a>
    </section>
  );
}
