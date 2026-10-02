export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <strong>РОББО</strong>
        <p>Образовательные туры в Китай для детей и подростков: современные города, культура, технологии и сопровождение на маршруте.</p>
      </div>
      <div>
        <h3>Октябрьская программа · набор закрыт</h3>
        <a href="#programs">Шанхай + Ханчжоу · 4–10 октября</a>
        <a href="#october-route">Программа по дням</a>
        <a href="#media">Фото и медиа</a>
      </div>
      <div>
        <h3>Контакты</h3>
        <a href="tel:+79039755050">+7 (903) 975-50-50</a>
        <a href="https://t.me/kitaysky_zarechye" target="_blank" rel="noreferrer">Telegram · @kitaysky_zarechye</a>
        <a href="https://max.ru/id5032358711_biz" target="_blank" rel="noreferrer">Канал в MAX</a>
        <span>Марина</span>
      </div>
      <small>© {currentYear} РОББО. Все права защищены.</small>
    </footer>
  );
}
