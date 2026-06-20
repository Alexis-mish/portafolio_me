import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.navbar.about },
    { href: '#tech', label: t.navbar.tech },
    { href: '#projects', label: t.navbar.projects },
    { href: '#experience', label: t.navbar.experience },
    { href: '#contact', label: t.navbar.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">AMH</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          <div className="navbar__lang-switch">
            <button
              onClick={() => setLanguage('es')}
              className={`navbar__lang-btn ${language === 'es' ? 'navbar__lang-btn--active' : ''}`}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
            <span className="navbar__lang-separator">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`navbar__lang-btn ${language === 'en' ? 'navbar__lang-btn--active' : ''}`}
              aria-label="Change to English"
            >
              EN
            </button>
          </div>

          <a href="#contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            {t.navbar.cta}
          </a>
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

