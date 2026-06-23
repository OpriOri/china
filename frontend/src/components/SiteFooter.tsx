import { programs } from "../data/siteData";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <strong>РОББО</strong>
        <p>Образовательные туры в Китай для детей и подростков: современные города, культура, технологии и сопровождение на маршруте.</p>
      </div>
      <div>
        <h3>Программы</h3>
        {programs.map((program) => <a key={program.id} href="#programs">{program.title}</a>)}
      </div>
      <div>
        <h3>Контакты</h3>
        <a href="tel:+79039755050">+7 (903) 975-50-50</a>
        <span>Марина</span>
      </div>
      <small>© {currentYear} РОББО. Все права защищены.</small>
    </footer>
  );
}
