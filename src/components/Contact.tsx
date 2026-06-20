import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';


const SOCIALS = [
  {
    id: 'contact-github',
    name: 'GitHub',
    handle: '@Alexis-mish',
    href: 'https://github.com/Alexis-mish',
    color: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'contact-linkedin',
    name: 'LinkedIn',
    handle: '/in/alexis-michell-henandez-robledo',
    href: 'https://linkedin.com/in/alexis-michell-henandez-robledo',
    color: '#0077b5',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'contact-email',
    name: 'Email',
    handle: 'michellalex32@gmail.com',
    href: 'mailto:michellalex32@gmail.com',
    color: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'contact-phone',
    name: 'Teléfono',
    handle: '+52 311 265 2981',
    href: 'tel:+523112652981',
    color: '#22c55e',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;
  const [copied, setCopied] = useState(false);

  const EMAIL = 'michellalex32@gmail.com';

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label fade-in-up">{t.contact.label}</div>
        <h2 className="contact__title fade-in-up">
          {t.contact.titleBefore}<span className="gradient-text">{t.contact.titleHighlight}</span>{t.contact.titleAfter}
        </h2>
        <p className="contact__subtitle fade-in-up">
          {t.contact.subtitle}
        </p>

        <div className="contact__layout">
          {/* Email highlight */}
          <div className="contact__email-card fade-in-up">
            <span className="contact__email-label">{t.contact.emailLabel}</span>
            <div className="contact__email-row">
              <span className="contact__email-text">{EMAIL}</span>
              <button
                id="copy-email-btn"
                className={`contact__copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyEmail}
                title={copied ? t.contact.copiedBtn : t.contact.copyBtn}
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                <span>{copied ? t.contact.copiedBtn : t.contact.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Social grid */}
          <div className="contact__socials fade-in-up" style={{ transitionDelay: '0.1s' }}>
            {SOCIALS.map((social) => (
              <a
                key={social.id}
                id={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-card"
                style={{ '--social-color': social.color } as React.CSSProperties}
              >
                <div className="contact__social-icon" style={{ color: social.color }}>
                  {social.icon}
                </div>
                <div className="contact__social-info">
                  <span className="contact__social-name">
                    {social.name === 'Teléfono' ? t.contact.phoneLabel : social.name}
                  </span>
                  <span className="contact__social-handle">{social.handle}</span>
                </div>
                <svg className="contact__social-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* CTA big */}
        <div className="contact__cta fade-in-up" style={{ transitionDelay: '0.2s' }}>
          <a href="mailto:michellalex32@gmail.com" className="contact__cta-btn" id="contact-mailto-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t.contact.sendMsgBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
