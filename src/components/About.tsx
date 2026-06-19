import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const STATS = [
  { value: 3, suffix: '+', label: 'Años programando' },
  { value: 6, suffix: '+', label: 'Proyectos en producción' },
  { value: 2, suffix: '', label: 'Certificaciones' },
  { value: 16, suffix: '+', label: 'Tecnologías dominadas' },
];

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
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;

  return (
    <section id="about" className="section about" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="about__grid">
          {/* Left — Text */}
          <div className="about__text">
            <div className="section-label fade-in-left">Sobre mí</div>
            <h2 className="about__title fade-in-left">
              Construyo con <span className="gradient-text">pasión</span>
              <br />y atención al detalle
            </h2>

            <p className="about__desc fade-in-left" style={{ transitionDelay: '0.1s' }}>
              Soy <strong>Alexis Michell Hernandez Robledo</strong>, Ingeniero en Software
              por la Universidad Politécnica del Estado de Nayarit. Tepic, Nayarit 🇲🇽
            </p>

            <p className="about__desc fade-in-left" style={{ transitionDelay: '0.18s' }}>
              Me especializo en construir productos de principio a fin — desde el diseño de la
              base de datos hasta el deploy en producción. He trabajado con LLMs, SaaS veterinarios,
              sistemas POS y directorios SEO. Siempre buscando que el código sea limpio, escalable y con propósito.
            </p>

            <div className="about__highlights fade-in-left" style={{ transitionDelay: '0.26s' }}>
              {[
                'Arquitectura limpia y código mantenible',
                'Integración de IA / LLMs en producción',
                'Performance y SEO optimizados',
                'Metodología Scrum — SFC Certified',
              ].map((item) => (
                <div key={item} className="about__highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="about__languages fade-in-left" style={{ transitionDelay: '0.34s' }}>
              <span className="lang-tag">🇲🇽 Español — Nativo</span>
              <span className="lang-tag">🇺🇸 Inglés — B1 (iTEP)</span>
            </div>

            <a href="#contact" className="btn-primary fade-in-left"
              style={{ transitionDelay: '0.4s', display: 'inline-flex', width: 'fit-content', gap: '8px', marginTop: '4px' }}>
              Contactar
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
                <span className="about__avatar-title">Software Engineer</span>
                <span className="about__avatar-loc">📍 Tepic, Nayarit</span>
                <div className="about__avatar-status">
                  <span className="status-dot" />
                  <span>Disponible para proyectos</span>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="about__stats fade-in-up" style={{ transitionDelay: '0.15s' }}>
              {STATS.map((stat) => (
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
