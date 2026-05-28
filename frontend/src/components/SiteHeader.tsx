import { Menu, X } from "lucide-react";

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
          <span>суверенная образовательная платформа для детей</span>
        </a>
        <nav id="site-nav" className={menuOpen ? "is-open" : ""}>
          <a href="#programs" onClick={closeMenu}>Программы</a>
          <a href="#why" onClick={closeMenu}>Почему Китай</a>
          <a href="#process" onClick={closeMenu}>Как устроено</a>
          <a href="#terms" onClick={closeMenu}>Условия</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
        </nav>
        <a className="site-phone" href="tel:+79039755050" onClick={closeMenu}>+7 (903) 975-50-50</a>
        <a className="header-button" href="#request" onClick={closeMenu}>Записаться</a>
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
