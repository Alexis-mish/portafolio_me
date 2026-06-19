import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">AMH</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <span className="footer__tagline">Construido con React + Three.js + ☕</span>
        </div>

        <div className="footer__nav">
          {['Stack', 'Proyectos', 'Experiencia', 'Sobre mí', 'Contacto'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-').replace('é', 'e')}`}
              className="footer__link"
            >
              {link}
            </a>
          ))}
        </div>

        <p className="footer__copy">
          © {year} Alexis Michell Hernandez Robledo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
