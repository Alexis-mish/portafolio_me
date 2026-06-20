import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import './TechStack.css';


interface Tech {
  name: string;
  icon: string;
  color: string;
  category: 'Frontend' | 'Backend' | 'Móvil' | 'Tools';
}

const TECHS: Tech[] = [
  // Frontend
  { name: 'React', icon: 'react', color: '#61dafb', category: 'Frontend' },
  { name: 'Next.js', icon: 'next', color: '#ffffff', category: 'Frontend' },
  { name: 'TypeScript', icon: 'ts', color: '#3178c6', category: 'Frontend' },
  { name: 'JavaScript', icon: 'js', color: '#f7df1e', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', color: '#38bdf8', category: 'Frontend' },
  { name: 'HTML / CSS', icon: 'html', color: '#e34f26', category: 'Frontend' },
  // Backend
  { name: 'PostgreSQL', icon: 'pg', color: '#336791', category: 'Backend' },
  { name: 'Supabase', icon: 'supabase', color: '#3ecf8e', category: 'Backend' },
  { name: 'Prisma ORM', icon: 'prisma', color: '#5a67d8', category: 'Backend' },
  { name: 'Firebase', icon: 'firebase', color: '#ffca28', category: 'Backend' },
  { name: 'Python', icon: 'python', color: '#3776ab', category: 'Backend' },
  { name: 'SQL', icon: 'sql', color: '#336791', category: 'Backend' },
  // Móvil
  { name: 'Flutter', icon: 'flutter', color: '#54c5f8', category: 'Móvil' },
  { name: 'Dart', icon: 'dart', color: '#00b4ab', category: 'Móvil' },
  // Tools
  { name: 'Git / GitHub', icon: 'git', color: '#f05032', category: 'Tools' },
  { name: 'Scrum', icon: 'scrum', color: '#a855f7', category: 'Tools' },
];

const ICONS: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <path d="M14 10h-2v7h-1.5v-7H8.5V8.5H14V10z" fill="#fff" />
      <path d="M17.5 13.5c0-.7-.4-1.2-1.3-1.5l-.9-.3c-.4-.1-.6-.3-.6-.6s.2-.5.7-.5c.4 0 .8.2 1 .5l1.1-.7c-.4-.7-1.1-1.1-2-1.1-1.2 0-2 .7-2 1.7 0 .8.4 1.3 1.4 1.6l.8.3c.5.2.7.3.7.7s-.2.6-.8.6c-.6 0-1.1-.3-1.3-.8l-1.1.6c.4.9 1.2 1.4 2.4 1.4 1.3 0 2.1-.7 2.1-1.9z" fill="#fff" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M15.6 16.8 9.2 8H8v8h1.4v-6l5.7 7.3c.2-.2.4-.3.5-.5z" fill="#000" />
      <path d="M15 8h1.4v5.3L15 11.6V8z" fill="#000" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <path d="M13.5 17.5c0 1.5-1 2-2.5 2s-2.5-.7-2.5-2.3h1.5c0 .6.3.8.9.8.5 0 .8-.2.8-.7V11h1.8v6.5zM17.5 17.3c.4.5.9.8 1.6.8.6 0 .9-.3.9-.6s-.3-.5-.9-.7l-.9-.3c-1.1-.3-1.7-.9-1.7-1.8 0-1.1.9-2 2.5-2 .9 0 1.7.3 2.2 1l-1.1.9c-.3-.4-.7-.6-1.1-.6-.5 0-.7.2-.7.5s.2.5.8.7l.9.3c1.1.3 1.7.9 1.7 1.9 0 1.2-1 2-2.6 2-.9 0-1.8-.3-2.4-1l1.1-.9z" fill="#1a1a1a" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.51 12 7 12z" />
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.827-1.433-16.15zm4.613 7-.173-1.963 7.328.002.173-1.963H6.248l.522 5.889h7.612l-.261 2.947-2.128.578-2.131-.578-.136-1.527H7.604l.261 2.983L12 17.506l4.2-1.126.57-6.368H8.749z" />
    </svg>
  ),
  pg: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M23.2 4.2c-1.4-.8-3.5-1.1-5.8-.9-.9-.9-1.9-1.5-2.9-1.7C12.4 1.2 10.7 2 9.4 3.4c-1.7.1-3.1.7-4 1.7C2.8 7.5 3 12 5.2 15.5c.6 1 1.4 2 2.4 2.5l-.2 1.9C7 22.4 7.3 25 8.5 26c.4.4 1 .6 1.7.6.8 0 1.8-.3 3-1 1.8.5 3.6.5 4.8-.1.7.4 1.4.6 2 .6.7 0 1.3-.2 1.8-.7 1.1-1.2 1.4-3.6 1-6.4l-.1-.8c1-.5 1.8-1.5 2.4-2.6 2.2-3.4 2.4-7.9-.9-10.4zM10 27c-.7.5-1.3.6-1.5.4-.6-.5-.9-2.7-.5-5l.4-3c.6.3 1.3.5 2 .5l-.4 7.1zm9.5-.4c-.2.3-.8.3-1.5.1l.4-5.9.4 3.6c.1.8.2 1.6.1 2.2zm1.5-2.1-.5-4.4.4 1c.2.7.4 1.5.5 2.3l-.4 1.1z" opacity=".8" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
    </svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.8 18.26L13.1 2.25a1.3 1.3 0 0 0-2.4.27L2.2 18.26a1.3 1.3 0 0 0 1.02 1.78l8.5 1.7a1.3 1.3 0 0 0 .56 0l8.5-1.7a1.3 1.3 0 0 0 1.02-1.78zm-10.3 1.25L4.65 18.27 12 6.5l4.7 9.52-5.2 3.49z" />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="m3.89 15.672 3.733-3.72.787-5.808L5.083 2.87a.498.498 0 0 0-.865.223L2.033 15.19l.018.019 1.839.463zM20.11 15.672l-5.01-12.048a.498.498 0 0 0-.9-.03L10.268 7.49l1.244 5.248 3.734 3.72 4.864-1.218v.001zM12 18.012 7.697 20.74 4.52 17.88l-2.487-.624 6.93 5.96a1.5 1.5 0 0 0 2.074 0l6.93-5.96-2.487.624L12 18.012z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.76 2 8 3.43 8 5v2h4v1H5.5C4.1 8 3 9.1 3 10.5v4C3 15.9 4.1 17 5.5 17H7v-2.5C7 13.1 8.1 12 9.5 12H14c1.4 0 2.5-1.1 2.5-2.5v-5C16.5 3.1 15.4 2 14 2h-2zm-1 1.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM12 22c3.24 0 4-1.43 4-3v-2h-4v-1h6.5c1.4 0 2.5-1.1 2.5-2.5v-4C21 8.1 19.9 7 18.5 7H17v2.5c0 1.4-1.1 2.5-2.5 2.5H10c-1.4 0-2.5 1.1-2.5 2.5v5c0 1.4 1.1 2.5 2.5 2.5h2zm1-1.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="6" rx="9" ry="3" />
      <path d="M21 6v4c0 1.66-4.03 3-9 3S3 11.66 3 10V6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M21 10v4c0 1.66-4.03 3-9 3S3 15.66 3 14v-4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M21 14v4c0 1.66-4.03 3-9 3S3 19.66 3 18v-4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.684 0H14.314zM14.314 11.093l-4.207 4.207 4.207 4.207 1.583-1.583-2.624-2.624 2.624-2.624-1.583-1.583zm0 0" />
    </svg>
  ),
  dart: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V12.6l-7.48 7.303-1.481 1.186-1.678.315-3.16-.472-1.481-1.971-.315-2.758v-1.186L4.105 4.105zm2.368 15.47l1.186.944 1.186-.157 7.165-7.303-3.16-2.758-7.165 3.475.63 5.201 1.158.598z" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.55 11.58L12.42.45a1.5 1.5 0 0 0-2.12 0l-2.1 2.1 2.67 2.67a1.78 1.78 0 0 1 2.26 2.27l2.58 2.57a1.78 1.78 0 1 1-1.07 1.01L12.1 8.55v6.01a1.78 1.78 0 1 1-1.46-.05V8.44a1.78 1.78 0 0 1-.96-2.34L7.05 3.44.45 10.04a1.5 1.5 0 0 0 0 2.12l11.13 11.13a1.5 1.5 0 0 0 2.12 0l9.85-9.85a1.5 1.5 0 0 0 0-2.12z" />
    </svg>
  ),
  scrum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
      <path d="M8 3.5 C6 5 5 7 5 9" strokeLinecap="round" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#61dafb',
  Backend: '#3ecf8e',
  Móvil: '#54c5f8',
  Tools: '#a855f7',
};

export default function TechStack() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation() as React.MutableRefObject<HTMLElement>;
  const categories = [...new Set(TECHS.map((t) => t.category))] as string[];

  return (
    <section id="tech" className="section tech-stack" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label fade-in-up">{t.techStack.label}</div>
        <h2 className="tech-stack__title fade-in-up">
          {t.techStack.titleBefore}<span className="gradient-text">{t.techStack.titleHighlight}</span>
        </h2>
        <p className="tech-stack__subtitle fade-in-up">
          {t.techStack.subtitle}
        </p>

        {/* Category filters — visual */}
        <div className="tech-categories fade-in-up">
          {categories.map((cat) => (
            <span
              key={cat}
              className="tech-cat-pill"
              style={{ '--cat-color': CATEGORY_COLORS[cat] } as React.CSSProperties}
            >
              {t.techStack.categories[cat as keyof typeof t.techStack.categories] || cat}
            </span>
          ))}
        </div>

        <div className="tech-stack__grid fade-in-up">
          {TECHS.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-card"
              style={{ '--tech-color': tech.color, '--delay': `${i * 40}ms` } as React.CSSProperties}
              id={`tech-${tech.name.toLowerCase().replace(/[\s./+]+/g, '-')}`}
            >
              <div className="tech-card__icon" style={{ color: tech.color }}>
                {ICONS[tech.icon]}
              </div>
              <span className="tech-card__name">{tech.name}</span>
              <span
                className="tech-card__category"
                style={{ color: CATEGORY_COLORS[tech.category] }}
              >
                {t.techStack.categories[tech.category as keyof typeof t.techStack.categories] || tech.category}
              </span>
              <div className="tech-card__glow" />
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="tech-certs fade-in-up">
          <span className="certs-label">{t.techStack.certsLabel}</span>
          <div className="certs-list">
            {t.techStack.certs.map((cert) => (
              <span key={cert} className="cert-badge">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
