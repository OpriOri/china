import { Menu, X } from "lucide-react";
import maxLogo from "../../chinaassets/maxlogo.jpg";
import telegramLogo from "../../chinaassets/telegramlogo.webp";

export function SiteHeader({
  menuOpen,
  closeMenu,
  toggleMenu,
}: {
  menuOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
}) {
  return (
    <>
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand" href="#top" aria-label="РОББО">
          <strong>РОББО</strong>
          <span>образовательные путешествия для детей</span>
        </a>
        <nav id="site-nav" className={menuOpen ? "is-open" : ""}>
          <a href="#programs" onClick={closeMenu}>Поездка 4–10 октября</a>
          <a href="#october-route" onClick={closeMenu}>Программа по дням</a>
          <a href="#why" onClick={closeMenu}>Почему Китай</a>
          <a href="#media" onClick={closeMenu}>Фото и каналы</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <div className="nav-socials">
            <a href="https://t.me/kitaysky_zarechye" target="_blank" rel="noreferrer" onClick={closeMenu}>Telegram</a>
            <a href="https://max.ru/id5032358711_biz" target="_blank" rel="noreferrer" onClick={closeMenu}>MAX</a>
          </div>
        </nav>
        <div className="header-contacts">
          <div className="header-socials" aria-label="Наши каналы">
            <a href="https://t.me/kitaysky_zarechye" target="_blank" rel="noreferrer" aria-label="РОББО в Telegram">
              <img src={telegramLogo} alt="" />
            </a>
            <a href="https://max.ru/id5032358711_biz" target="_blank" rel="noreferrer" aria-label="РОББО в MAX">
              <img src={maxLogo} alt="" />
            </a>
          </div>
          <a className="site-phone" href="tel:+79039755050" onClick={closeMenu}>+7 (903) 975-50-50</a>
        </div>
        <a className="header-button" href="https://hochuvseznat.club" onClick={closeMenu}>Назад на сайт</a>
        <button
          className="icon-button"
          aria-controls="site-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && <button className="menu-backdrop" aria-label="Закрыть меню" onClick={closeMenu} />}
    </>
  );
}
