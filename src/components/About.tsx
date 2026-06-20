import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import './About.css';


function AnimatedCounter({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start = Math.min(start + step, target);
            el.textContent = Math.floor(start) + suffix;
            if (start >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;

  function formatBold(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  return (
    <section id="about" className="section about" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="about__grid">
          {/* Left — Text */}
          <div className="about__text">
            <div className="section-label fade-in-left">{t.about.label}</div>
            <h2 className="about__title fade-in-left">
              {t.about.titleBefore}<span className="gradient-text">{t.about.titleHighlight}</span>
              <span style={{ whiteSpace: 'pre-line' }}>{t.about.titleAfter}</span>
            </h2>


            <p className="about__desc fade-in-left" style={{ transitionDelay: '0.1s' }}>
              {formatBold(t.about.desc1)}
            </p>

            <p className="about__desc fade-in-left" style={{ transitionDelay: '0.18s' }}>
              {formatBold(t.about.desc2)}
            </p>

            <div className="about__highlights fade-in-left" style={{ transitionDelay: '0.26s' }}>
              {t.about.highlights.map((item) => (
                <div key={item} className="about__highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                   <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="about__languages fade-in-left" style={{ transitionDelay: '0.34s' }}>
              {t.about.langTags.map((lang) => (
                <span key={lang} className="lang-tag">{lang}</span>
              ))}
            </div>

            <a href="#contact" className="btn-primary fade-in-left"
              style={{ transitionDelay: '0.4s', display: 'inline-flex', width: 'fit-content', gap: '8px', marginTop: '4px' }}>
              {t.about.buttonContact}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right — Photo + Stats */}
          <div className="about__right">
            {/* Avatar card with photo */}
            <div className="about__avatar-card fade-in-up">
              <div className="about__avatar">
                <img
                  src="/alexis.png"
                  alt="Alexis Hernandez"
                  className="about__avatar-photo"
                />
                <div className="about__avatar-ring" />
              </div>
              <div className="about__avatar-info">
                <span className="about__avatar-name">Alexis Hernandez</span>
                <span className="about__avatar-title">{t.about.avatarTitle}</span>
                <span className="about__avatar-loc">{t.about.avatarLoc}</span>
                <div className="about__avatar-status">
                  <span className="status-dot" />
                  <span>{t.about.avatarStatus}</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="about__stats fade-in-up" style={{ transitionDelay: '0.15s' }}>
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-card__value">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="stat-card__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
