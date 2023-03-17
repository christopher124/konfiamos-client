import "./TopBar.scss";

export function TopBar() {
  return (
    <header className="hero" id="inicio">
      <nav className="nav container">
        <div className="nav__logo">
          <a href="./index.html">
            <img alt="icono nav-bar" className="img-nav-amr" />
          </a>
        </div>

        <ul className="nav__link nav__link--menu">
          <li className="nav__items">
            <a href="#inicio" className="nav__links">
              Inicio
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
