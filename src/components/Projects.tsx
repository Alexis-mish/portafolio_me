import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Projects.css';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  gradient: string;
  emoji: string;
}

const PROJECTS: Project[] = [
  {
    id: 'punto-zero',
    title: 'Nivo',
    subtitle: 'SaaS POS — Sistema de Punto de Venta',
    description:
      'Sistema de Punto de Venta en la nube con enfoque en movilidad. Permite a los usuarios transformar sus dispositivos móviles en escáneres de códigos de barras funcionales, agilizando procesos de venta en campo.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'React'],
    github: 'https://github.com/Alexis-mish',
    demo: 'https://nivopos.shop',
    featured: true,
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #06b6d4 100%)',
    emoji: '🛒',
  },
  {
    id: 'vetnexus',
    title: 'VetNexus',
    subtitle: 'SaaS de Gestión Veterinaria',
    description:
      'Plataforma SaaS integral diseñada para la administración técnica y administrativa de clínicas y estéticas veterinarias. Optimiza el control de citas, expedientes clínicos y flujos operativos completos.',
    tags: ['React', 'Node.js', 'Supabase', 'PostgreSQL', 'TypeScript'],
    github: 'https://github.com/Alexis-mish',
    demo: 'https://vetnexus.app',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #818cf8 100%)',
    emoji: '🐾',
  },
  {
    id: 'buscovet',
    title: 'BuscoVet',
    subtitle: 'Directorio Público de Veterinarios',
    description:
      'Directorio público para veterinarios certificados en México. Enfocado en rendimiento SEO y la integración de herramientas de geolocalización para conectar a usuarios con profesionales cercanos.',
    tags: ['Next.js', 'SEO', 'Geolocalización', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Alexis-mish',
    demo: 'https://buscovet.com',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    emoji: '📍',
  },
  {
    id: 'zura',
    title: 'Zura Barber',
    subtitle: 'Landing Page & Sistema de Citas',
    description:
      'Landing page y plataforma SaaS para barberías que permite la reservación de citas y la gestión de servicios. Optimizado para SEO, rendimiento y conversiones.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
    github: 'https://github.com/Alexis-mish',
    demo: 'https://zurabarber.com',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #78350f 100%)',
    emoji: '💈',
  },
  {
    id: 'llm-integration',
    title: 'Integración LLM',
    subtitle: 'Automatización con Modelos de Lenguaje',
    description:
      'Integración de Modelos de Lenguaje Grande (LLMs) en plataformas existentes para automatizar procesos internos y mejorar funcionalidades. Implementado en producción en Cloudmex Analytics.',
    tags: ['Python', 'LLMs', 'API REST', 'TypeScript', 'Firebase'],
    github: 'https://github.com/Alexis-mish',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    emoji: '🤖',
  },
  {
    id: 'connectly',
    title: 'Connectly',
    subtitle: 'Chat en Tiempo Real — Flutter',
    description:
      'Aplicación móvil de mensajería instantánea en tiempo real. Desarrollada con Flutter y Dart, utilizando WebSockets para una comunicación fluida y baja latencia.',
    tags: ['Flutter', 'Dart', 'WebSockets', 'Firebase', 'Mobile'],
    github: 'https://github.com/Alexis-mish/Connectly-Real_time_chat',
    gradient: 'linear-gradient(135deg, #54c5f8 0%, #0284c7 50%, #3b82f6 100%)',
    emoji: '💬',
  },
  {
    id: 'portfolio',
    title: 'Este Portfolio',
    subtitle: 'Portfolio Interactivo 3D',
    description:
      'Construido desde cero con React, Three.js y Anime.js. Animaciones 3D toon-shaded, typewriter effects, chatbot personal, diseño cartoon único y fully responsive.',
    tags: ['React', 'Three.js', 'TypeScript', 'Vite'],
    github: 'https://github.com/Alexis-mish',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    emoji: '✨',
  },
];

export default function Projects() {
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;

  function handleTilt(e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateY(-8px) scale(1.02)`;
  }

  function resetTilt(card: HTMLDivElement) {
    card.style.transform = '';
  }

  return (
    <section id="projects" className="section projects" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label fade-in-up">Trabajo</div>
        <h2 className="projects__title fade-in-up">
          Proyectos que <span className="gradient-text">construí</span>
        </h2>
        <p className="projects__subtitle fade-in-up">
          Productos reales, en producción. Cada uno con su propia historia.
        </p>

        <div className="projects__grid fade-in-up">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              id={`project-${proj.id}`}
              className={`project-card ${proj.featured ? 'project-card--featured' : ''}`}
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetTilt(e.currentTarget)}
            >
              {/* Gradient banner */}
              <div className="project-card__banner" style={{ background: proj.gradient }}>
                {proj.featured && <span className="project-badge">⭐ Destacado</span>}
                <div className="project-card__emoji">{proj.emoji}</div>
                <div className="project-card__dots">
                  <span /><span /><span />
                </div>
              </div>

              {/* Body */}
              <div className="project-card__body">
                <div>
                  <h3 className="project-card__title">{proj.title}</h3>
                  <p className="project-card__subtitle">{proj.subtitle}</p>
                </div>
                <p className="project-card__desc">{proj.description}</p>

                <div className="project-card__tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="project-link project-link--github" id={`${proj.id}-github`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      Código
                    </a>
                  )}
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                      className="project-link project-link--demo" id={`${proj.id}-demo`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
