interface NavigationProps {
  isMenuActive: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export default function Navigation({ isMenuActive, toggleMenu, closeMenu }: NavigationProps) {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">Adrian Lamour</div>
        <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#skills" onClick={closeMenu}>Specialisations</a></li>
          <li><a href="#portfolio" onClick={closeMenu}>Case Studies</a></li>
          <li><a href="#gallery-section" onClick={closeMenu}>Gallery</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
        <div className={`burger-menu ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </div>
      </div>
    </nav>
  );
}