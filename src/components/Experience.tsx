import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import './Experience.css';


const EDUCATION = [
  {
    id: 'upn',
    institution: 'Universidad Politécnica del Estado de Nayarit',
    degree: 'Ingeniería en Software',
    period: 'Ago 2022 — Actualidad',
    location: 'Tepic, Nayarit',
    current: true,
    type: 'education' as const,
  },
];

const EXPERIENCES = [
  {
    id: 'cloudmex',
    role: 'Desarrollador Jr.',
    company: 'Cloudmex Analytics',
    period: 'Enero 2026 — Abril 2026',
    location: 'Tepic, Nayarit',
    current: false,
    description: [
      'Desarrollé aplicaciones web integrales, gestionando desde el diseño y arquitectura del frontend hasta la optimización de bases de datos relacionales.',
      'Implementé la integración de Modelos de Lenguaje Grande (LLMs) para automatizar procesos internos y mejorar las funcionalidades de las plataformas existentes.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'LLMs', 'Python'],
  },
  {
    id: 'cennit',
    role: 'Desarrollador de Software',
    company: 'Cennit',
    period: '2025',
    location: 'Tepic, Nayarit',
    current: false,
    description: [
      'Desarrollé y di soporte a aplicaciones web, colaborando en la creación de interfaces responsivas y flujos de usuario optimizados.',
      'Participé en el análisis y estructuración de proyectos de software locales, asegurando la calidad del código y buenas prácticas de desarrollo.',
    ],
    stack: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Git'],
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.style.height = '100%';
          observer.unobserve(line);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section experience" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label fade-in-up">{t.experience.label}</div>
        <h2 className="experience__title fade-in-up">
          {t.experience.titleBefore}<span className="gradient-text">{t.experience.titleHighlight}</span>
        </h2>
        <p className="experience__subtitle fade-in-up">
          {t.experience.subtitle}
        </p>

        <div className="exp-edu-grid">
          {/* Experience column */}
          <div>
            <h3 className="column-title fade-in-up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              {t.experience.professionalTitle}
            </h3>

            <div className="timeline">
              <div className="timeline__track">
                <div className="timeline__line" ref={lineRef} />
              </div>

              {EXPERIENCES.map((exp, idx) => {
                const trans = t.experience.experiences[exp.id as keyof typeof t.experience.experiences] as any;
                const displayRole = trans?.role || exp.role;
                const displayPeriod = trans?.period || exp.period;
                const displayDesc = trans?.desc || exp.description;

                return (
                  <div
                    key={exp.id}
                    id={exp.id}
                    className="timeline__item fade-in-up"
                    style={{ transitionDelay: `${idx * 0.1}s` }}
                  >
                    <div className={`timeline__dot ${exp.current ? 'timeline__dot--active' : ''}`}>
                      {exp.current && <div className="timeline__dot-ring" />}
                    </div>

                    <div className="timeline__card">
                      <div className="timeline__card-header">
                        <div>
                          <h3 className="timeline__role">{displayRole}</h3>
                          <p className="timeline__company">{exp.company}</p>
                          <p className="timeline__location">📍 {exp.location}</p>
                        </div>
                        <div className="timeline__period">
                          <span className="period-text">{displayPeriod}</span>
                        </div>
                      </div>

                      <ul className="timeline__desc">
                        {displayDesc.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <div className="timeline__stack">
                        {exp.stack.map((tech) => (
                          <span key={tech} className="timeline__tech">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Freelance */}
              {(() => {
                const trans = t.experience.experiences.freelance;
                return (
                  <div className="timeline__item fade-in-up" style={{ transitionDelay: '0.15s' }}>
                    <div className="timeline__dot" />
                    <div className="timeline__card">
                      <div className="timeline__card-header">
                        <div>
                          <h3 className="timeline__role">{trans.role}</h3>
                          <p className="timeline__company">{trans.company}</p>
                        </div>
                        <span className="period-text">{trans.period}</span>
                      </div>
                      <ul className="timeline__desc">
                        {trans.desc.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      <div className="timeline__stack">
                        {['React', 'Next.js', 'Flutter', 'Supabase', 'Firebase'].map((t) => (
                          <span key={t} className="timeline__tech">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Education column */}
          <div>
            <h3 className="column-title fade-in-up" style={{ transitionDelay: '0.05s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              {t.experience.educationTitle}
            </h3>

            {EDUCATION.map((edu) => {
              const trans = t.experience.experiences[edu.id as keyof typeof t.experience.experiences] as any;
              const displayDegree = trans?.degree || edu.degree;
              const displayPeriod = trans?.period || edu.period;

              return (
                <div key={edu.id} id={edu.id} className="edu-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
                  {edu.current && (
                    <div className="edu-card__status">
                      <span className="status-dot" />
                      <span>{t.experience.eduCurrent}</span>
                    </div>
                  )}
                  <h4 className="edu-card__degree">{displayDegree}</h4>
                  <p className="edu-card__institution">{edu.institution}</p>
                  <p className="edu-card__meta">📍 {edu.location} · {displayPeriod}</p>
                </div>
              );
            })}

            {/* Skills highlight */}
            <div className="skills-highlight fade-in-up" style={{ transitionDelay: '0.18s' }}>
              <h4 className="skills-highlight__title">{t.experience.skillsTitle}</h4>
              <ul className="skills-highlight__list">
                {t.experience.skillsList.map((s) => (
                  <li key={s}>
                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
