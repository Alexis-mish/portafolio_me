import { useEffect, useRef } from 'react';
import { createHeroScene } from '../utils/three-scene';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';


export default function Hero() {
  const { language, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<ReturnType<typeof createHeroScene> | null>(null);
  const roleIdx = useRef(0);

  // Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createHeroScene(canvas);
    sceneRef.current = scene;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      scene.updateMouse(x, y);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Typewriter for role
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    let cancelled = false;

    async function typeText(text: string) {
      if (!el) return;
      el.textContent = '';
      for (let i = 0; i < text.length; i++) {
        if (cancelled) return;
        el.textContent += text[i];
        await sleep(50 + Math.random() * 30);
      }
    }

    async function eraseText() {
      if (!el) return;
      const text = el.textContent || '';
      for (let i = text.length; i >= 0; i--) {
        if (cancelled) return;
        el.textContent = text.slice(0, i);
        await sleep(28);
      }
    }

    async function loop() {
      while (!cancelled) {
        const roles = t.hero.roles;
        const role = roles[roleIdx.current % roles.length];
        await typeText(role);
        await sleep(2200);
        await eraseText();
        await sleep(300);
        roleIdx.current++;
      }
    }

    loop();

    return () => { cancelled = true; };
  }, [language]);

  // Name scramble on mount
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const original = el.dataset.text || '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let frame = 0;
    let resolved = 0;

    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < resolved) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (frame % 4 === 0 && resolved < original.length) resolved++;
      if (resolved >= original.length) {
        clearInterval(interval);
        el.textContent = original;
      }
      frame++;
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content container">
        <div className="hero__main">
          {/* Photo */}
          <div className="hero__photo-wrap">
            <div className="hero__photo-ring" />
            <img
              src="/alexis.png"
              alt="Alexis Michell Hernandez Robledo"
              className="hero__photo"
              loading="eager"
            />
            <div className="hero__photo-glow" />
          </div>

          {/* Text */}
          <div className="hero__text">
            <div className="hero__badge">
              <span className="status-dot" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero__name">
              <span className="hero__greeting">{t.hero.greeting}</span>
              <span
                ref={titleRef}
                className="hero__name--accent"
                data-text={t.hero.name}
              >
                {t.hero.name}
              </span>
            </h1>

            <p className="hero__role">
              <span className="role-prefix">&gt; </span>
              <span ref={roleRef} className="role-text" />
              <span className="cursor-blink" />
            </p>

            <p className="hero__desc" style={{ whiteSpace: 'pre-line' }}>
              {t.hero.desc}
            </p>


            <div className="hero__actions">
              <a href="#projects" className="btn-primary" id="hero-projects-btn">
                <span>{t.hero.viewProjects}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary" id="hero-contact-btn">{t.hero.talk}</a>
            </div>

            <div className="hero__socials">
              <a href="https://github.com/Alexis-mish" target="_blank" rel="noopener noreferrer"
                className="social-link" aria-label="GitHub" id="hero-github-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/alexis-michell-henandez-robledo" target="_blank"
                rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" id="hero-linkedin-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="mailto:michellalex32@gmail.com" className="social-link"
                aria-label="Email" id="hero-email-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>{t.hero.scroll}</span>
        <div className="scroll-line"><div className="scroll-dot" /></div>
      </div>
    </section>
  );
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
