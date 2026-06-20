import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: '#tech', label: t.navbar.tech },
    { href: '#projects', label: t.navbar.projects },
    { href: '#experience', label: t.navbar.experience },
    { href: '#about', label: t.navbar.about },
    { href: '#contact', label: t.navbar.contact },
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">AMH</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <span className="footer__tagline">{t.footer.tagline}</span>
        </div>

        <div className="footer__nav">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="footer__link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="footer__copy">
          {t.footer.copy.replace('{year}', year.toString())}
        </p>
      </div>
    </footer>
  );
}

