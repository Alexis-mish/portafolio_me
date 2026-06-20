import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ChatBot.css';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

// ── Knowledge base sobre Alexis ───────────────────────────────────────────────
const ALEXIS_DATA = {
  nombre: 'Alexis Michell Hernandez Robledo',
  ubicacion: 'Tepic, Nayarit, México',
  telefono: '+52 311 265 2981',
  email: 'michellalex32@gmail.com',
  linkedin: 'linkedin.com/in/alexis-michell-henandez-robledo',
  github: 'github.com/Alexis-mish',
  titulo: 'Ingeniero en Software (en curso)',
  universidad: 'Universidad Politécnica del Estado de Nayarit',
  carrera: 'Ingeniería en Software',
  periodoEdu: 'Agosto 2022 — Actualidad',
  experiencia: [
    {
      empresa: 'Cloudmex Analytics',
      rol: 'Desarrollador Jr.',
      periodo: 'Enero 2026 — Abril 2026',
      logros: [
        'Desarrolló aplicaciones web integrales con diseño frontend y optimización de bases de datos relacionales',
        'Implementé integración de LLMs (Modelos de Lenguaje Grande) para automatizar procesos internos',
      ],
    },
    {
      empresa: 'Cennit',
      rol: 'Desarrollador de Software',
      periodo: '2025',
      logros: [
        'Desarrolló y dio soporte a aplicaciones web responsivas en Tepic, Nayarit',
        'Participó en el análisis y estructuración de proyectos de software locales',
      ],
    },
    {
      empresa: 'Freelance / Proyectos propios',
      rol: 'Desarrollador Full Stack',
      periodo: '2022 — Presente',
      logros: [
        'Construyó VetNexus: SaaS de gestión veterinaria (vetnexus.app)',
        'Creó Nivo: sistema POS en la nube con escáner móvil (nivopos.shop)',
        'Desarrolló BuscoVet: directorio de veterinarios con SEO y geolocalización (buscovet.com)',
        'Creó Zura Barber: landing page y gestión para barberías (zurabarber.com)',
      ],
    },
  ],
  proyectos: [
    { nombre: 'Nivo', tipo: 'SaaS POS', desc: 'Sistema de Punto de Venta en la nube con escáner móvil (nivopos.shop)' },
    { nombre: 'VetNexus', tipo: 'SaaS Veterinario', desc: 'Gestión de clínicas y estéticas veterinarias (vetnexus.app)' },
    { nombre: 'BuscoVet', tipo: 'Directorio público', desc: 'Directorio de veterinarios certificados en México con SEO y geolocalización (buscovet.com)' },
    { nombre: 'Zura Barber', tipo: 'SaaS de Barbería', desc: 'Landing page y sistema de reservaciones y gestión para barberías (zurabarber.com)' },
    { nombre: 'Connectly', tipo: 'App Móvil Chat', desc: 'Aplicación de chat en tiempo real en Flutter y Dart utilizando WebSockets' },
    { nombre: 'Integración LLM', tipo: 'IA en producción', desc: 'LLMs integrados para automatizar procesos internos en Cloudmex Analytics' },
  ],
  skills: {
    lenguajes: ['JavaScript', 'TypeScript', 'Python', 'Dart', 'SQL'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['PostgreSQL', 'Supabase', 'Prisma ORM', 'Firebase'],
    movil: ['Flutter', 'Dart'],
    tools: ['Git', 'GitHub', 'Scrum', 'Lean Six Sigma'],
  },
  certificaciones: ['Scrum Fundamentals Certified (SFC)', 'Lean Six Sigma White Belt'],
  idiomas: ['Español (nativo)', 'Inglés B1 — Certificación iTEP'],
  disponible: true,
};

// ── Response engine ───────────────────────────────────────────────────────────
function getResponse(input: string, lang: 'es' | 'en'): string {
  const q = input.toLowerCase().trim();
  const isEn = lang === 'en';

  if (isEn) {
    // ENGLISH RESPONSE ENGINE
    // Greetings
    if (/^(hello|hi|hey|greetings|howdy|good)/.test(q)) {
      return `Hello! 👋 I am **${ALEXIS_DATA.nombre}**'s assistant. I can tell you about his experience, projects, skills, or how to contact him. What would you like to know?`;
    }

    // Name
    if (/(name|call|who is)/.test(q)) {
      return `His name is **${ALEXIS_DATA.nombre}**, a Software Engineer from **Tepic, Nayarit, Mexico** 🇲🇽`;
    }

    // Contact
    if (/(email|correo|mail|contact)/.test(q)) {
      return `📧 Email: **${ALEXIS_DATA.email}**\n📞 Phone: **${ALEXIS_DATA.telefono}**\n\nYou can write to him directly — he replies quickly!`;
    }

    if (/(phone|tel|number|whatsapp)/.test(q)) {
      return `📞 His phone number is **${ALEXIS_DATA.telefono}** (Tepic, Nayarit, Mexico)`;
    }

    if (/(linkedin)/.test(q)) {
      return `Find him on LinkedIn: 🔗 **${ALEXIS_DATA.linkedin}**`;
    }

    if (/(github|repository|repos|source code)/.test(q)) {
      return `His GitHub is 🐙 **${ALEXIS_DATA.github}** — where you can see some of his projects.`;
    }

    // Location
    if (/(live|where|location|city|place|tepic|nayarit|mexico|country)/.test(q)) {
      return `📍 Alexis lives in **Tepic, Nayarit, Mexico** 🇲🇽`;
    }

    // Education
    if (/(study|university|career|degree|college|school|graduation|education)/.test(q)) {
      return `🎓 He studies **Software Engineering** at **Universidad Politécnica del Estado de Nayarit** since August 2022. Currently in progress.`;
    }

    // Experience
    if (/(experience|work|company|job|cloudmex|cennit|jr|developer|professional|history)/.test(q)) {
      const exp = [
        `**Cloudmex Analytics** — Jr. Developer (January 2026 — April 2026)\n• Developed end-to-end web applications with frontend design and relational database optimization\n• Implemented LLMs integration to automate internal processes`,
        `**Cennit** — Software Developer (2025)\n• Developed and supported responsive web applications in Tepic, Nayarit\n• Participated in the analysis and structuring of local software projects`,
        `**Freelance / Own projects** — Full Stack Developer (2022 — Present)\n• Built VetNexus: Veterinary management SaaS (vetnexus.app)\n• Created Nivo: Cloud-based POS system with mobile scanner (nivopos.shop)\n• Developed BuscoVet: SEO and geolocation directory for veterinarians (buscovet.com)\n• Created Zura Barber: Barbershop landing page and booking system (zurabarber.com)`
      ].join('\n\n');
      return `💼 Professional experience:\n\n${exp}`;
    }

    // Projects
    if (/(projects?|saas|vetnexus|nivo|buscovet|zura|connectly|pos|veterinary|directory|portfolio)/.test(q)) {
      const projs = [
        `**Nivo** (SaaS POS)\nCloud-based POS system with mobile scanner (nivopos.shop)`,
        `**VetNexus** (Veterinary SaaS)\nClinic and groomer management platform (vetnexus.app)`,
        `**BuscoVet** (Public Directory)\nDirectory for certified veterinarians in Mexico with SEO and geolocation (buscovet.com)`,
        `**Zura Barber** (Barbershop SaaS)\nLanding page and appointment booking system (zurabarber.com)`,
        `**Connectly** (Mobile Chat App)\nReal-time messaging mobile app in Flutter and Dart using WebSockets`,
        `**LLM Integration** (AI in production)\nIntegrated LLMs to automate internal processes at Cloudmex Analytics`
      ].join('\n\n');
      return `🚀 Highlighted projects:\n\n${projs}`;
    }

    // Skills
    if (/(skills?|technolog|stack|languages?|know|react|next|typescript|javascript|python|flutter|dart|sql|firebase|supabase|postgres|tailwind)/.test(q)) {
      return `🛠️ Alexis's tech stack:\n\n**Frontend:** React, Next.js, Tailwind CSS, HTML, CSS\n**Backend & DB:** PostgreSQL, Supabase, Prisma ORM, Firebase\n**Mobile:** Flutter, Dart\n**Languages:** JavaScript, TypeScript, Python, Dart, SQL\n**Tools:** Git, GitHub, Scrum, Lean Six Sigma`;
    }

    // LLM / AI
    if (/(llm|ia|artificial intelligence|gpt|ai|language models|machine learning|ml)/.test(q)) {
      return `🤖 Alexis has real-world experience with **LLMs in production** — at Cloudmex Analytics he integrated language models to automate internal processes. He also has Python knowledge for AI tasks.`;
    }

    // Certifications / Languages
    if (/(certifications?|certif|scrum|lean|six sigma|itep|english|spanish)/.test(q)) {
      return `🏅 Certifications:\n\n• Scrum Fundamentals Certified (SFC)\n• Lean Six Sigma White Belt\n\n🌎 Languages:\n• Spanish — Native\n• English — B1 Level (iTEP Certification)`;
    }

    // Availability
    if (/(available|work|hire|freelance|opportunity|new job|new project)/.test(q)) {
      return `✅ **Yes, he is available!** Alexis is open to:\n• Freelance projects\n• Frontend/Fullstack developer positions\n• Technical collaborations\n\n📧 Write to him at **${ALEXIS_DATA.email}**`;
    }

    // Strengths / What he does
    if (/(do|specialty|forte|strength|best|highlight|passion)/.test(q)) {
      return `⚡ Alexis specializes in **building complete products**: from UI design to deployment. His strong suit is:\n\n• **React / Next.js** for high-impact interfaces\n• **AI integration** (LLMs) in real products\n• **SaaS & cloud systems** with Supabase/Prisma\n• **Mobile Apps** with Flutter\n\nAlways delivering clean and scalable code.`;
    }

    // CV / Resume
    if (/(cv|resume|bio|profile|summary|about him)/.test(q)) {
      return `📋 **Alexis's Summary:**\n\n🧑‍💻 ${ALEXIS_DATA.nombre}\n📍 Tepic, Nayarit, Mexico\n🎓 Software Engineering @ Universidad Politécnica del Estado de Nayarit\n💼 Jr. Developer at Cloudmex Analytics | Software Developer at Cennit\n🚀 Freelance: Nivo, VetNexus, BuscoVet, Zura Barber\n🛠️ React · Next.js · TypeScript · Flutter · Supabase\n🏅 Scrum Certified · Lean Six Sigma · English B1`;
    }

    // Default English
    const suggestionsEn = [
      'What projects has he built?',
      'What technologies does he use?',
      'How can I contact him?',
      'Where has he worked?',
      'Where does he study?',
    ];
    const randomEn = suggestionsEn[Math.floor(Math.random() * suggestionsEn.length)];
    return `Hmm, I'm not sure how to answer that 🤔 I'm an assistant specialized in **Alexis Hernandez**.\n\nYou can ask me about his experience, projects, skills, or how to contact him.\n\n💡 For example: _"${randomEn}"_`;

  } else {
    // SPANISH RESPONSE ENGINE
    // Saludos
    if (/^(hola|hi|hey|buenas|qué tal|saludos|hello)/.test(q)) {
      return `¡Hola! 👋 Soy el asistente de **${ALEXIS_DATA.nombre}**. Puedo contarte sobre su experiencia, proyectos, habilidades o cómo contactarlo. ¿Qué quieres saber?`;
    }

    // Nombre
    if (/(nombre|llamas?|quien es|quién es|who is)/.test(q)) {
      return `Se llama **${ALEXIS_DATA.nombre}**, ingeniero en software de **${ALEXIS_DATA.ubicacion}** 🇲🇽`;
    }

    // Contacto
    if (/(email|correo|mail|contact)/.test(q)) {
      return `📧 Email: **${ALEXIS_DATA.email}**\n📞 Tel: **${ALEXIS_DATA.telefono}**\n\nPuede escribirle directamente — responde rápido!`;
    }

    if (/(tel[eé]?fono|phone|cel|número)/.test(q)) {
      return `📞 Su teléfono es **${ALEXIS_DATA.telefono}** (Tepic, Nayarit, México)`;
    }

    if (/(linkedin)/.test(q)) {
      return `Encuéntralo en LinkedIn: 🔗 **${ALEXIS_DATA.linkedin}**`;
    }

    if (/(github|repositorio|repos|código fuente)/.test(q)) {
      return `Su GitHub es 🐙 **${ALEXIS_DATA.github}** — ahí puedes ver algunos de sus proyectos.`;
    }

    // Ubicación
    if (/(vive|dónde|donde|ubicaci[oó]n|ciudad|lugar|tepic|nayarit|mexico|país)/.test(q)) {
      return `📍 Alexis vive en **${ALEXIS_DATA.ubicacion}**, México.`;
    }

    // Educación
    if (/(estudi|universidad|carrera|egres|licenciatura|ingenieria|upn|escuela|titulaci)/.test(q)) {
      return `🎓 Estudia **${ALEXIS_DATA.carrera}** en la **${ALEXIS_DATA.universidad}** desde ${ALEXIS_DATA.periodoEdu}. Actualmente en curso.`;
    }

    // Experiencia
    if (/(experiencia|trabaj|empresa|empleo|cloudmex|cennit|jr|desarrollador|profesional|historial)/.test(q)) {
      const exp = ALEXIS_DATA.experiencia.map(e =>
        `**${e.empresa}** — ${e.rol} (${e.periodo})\n${e.logros.map(l => `• ${l}`).join('\n')}`
      ).join('\n\n');
      return `💼 Experiencia profesional:\n\n${exp}`;
    }

    // Proyectos
    if (/(proyecto|saas|vetnexus|nivo|buscovet|zura|connectly|pos|veterinari|directorio|portfolio|portafolio)/.test(q)) {
      const projs = ALEXIS_DATA.proyectos.map(p =>
        `**${p.nombre}** (${p.tipo})\n${p.desc}`
      ).join('\n\n');
      return `🚀 Sus proyectos destacados:\n\n${projs}`;
    }

    // Skills / Tecnologías
    if (/(skill|tecnolog|stack|lenguaje|sabe|domina|conoce|react|next|typescript|javascript|python|flutter|dart|sql|firebase|supabase|postgres|tailwind)/.test(q)) {
      return `🛠️ Stack tecnológico de Alexis:\n\n**Frontend:** ${ALEXIS_DATA.skills.frontend.join(', ')}\n**Backend & DB:** ${ALEXIS_DATA.skills.backend.join(', ')}\n**Móvil:** ${ALEXIS_DATA.skills.movil.join(', ')}\n**Lenguajes:** ${ALEXIS_DATA.skills.lenguajes.join(', ')}\n**Tools:** ${ALEXIS_DATA.skills.tools.join(', ')}`;
    }

    // LLM / IA
    if (/(llm|ia|inteligencia artificial|gpt|ai|modelos de lenguaje|machine learning|ml)/.test(q)) {
      return `🤖 Alexis tiene experiencia real con **LLMs en producción** — en Cloudmex Analytics integró modelos de lenguaje para automatizar procesos internos. También tiene conocimientos de Python para tareas de IA.`;
    }

    // Certificaciones
    if (/(certificaci|certif|scrum|lean|six sigma|itep|ingl[eé]s)/.test(q)) {
      return `🏅 Sus certificaciones:\n\n• **${ALEXIS_DATA.certificaciones[0]}**\n• **${ALEXIS_DATA.certificaciones[1]}**\n\n🌎 Idiomas: ${ALEXIS_DATA.idiomas.join(' | ')}`;
    }

    // Idiomas
    if (/(idioma|ingl[eé]s|espa[nñ]ol|lenguaje|habla|idiom)/.test(q)) {
      return `🌎 **Idiomas:**\n• Español — nativo\n• Inglés — Nivel B1 (Certificación iTEP)`;
    }

    // Disponibilidad
    if (/(disponible|trabajo|contratar|hire|freelance|oportunidad|nuevo trabajo|proyecto nuevo)/.test(q)) {
      return `✅ **¡Sí, está disponible!** Alexis está abierto a:\n• Proyectos freelance\n• Posiciones de desarrollador frontend/fullstack\n• Colaboraciones técnicas\n\n📧 Escríbele a **${ALEXIS_DATA.email}**`;
    }

    // Personalidad / más info
    if (/(qu[eé] hace|[aá]reas|especialidad|forte|fuerte|mejor|se destaca|pasion)/.test(q)) {
      return `⚡ Alexis se especializa en **construir productos completos**: desde el diseño UI hasta el deploy. Su fuerte es:\n\n• **React / Next.js** para interfaces de alto impacto\n• **Integración de IA** (LLMs) en productos reales\n• **SaaS y sistemas en la nube** con Supabase/Prisma\n• **Apps móviles** con Flutter\n\nSiempre entregando código limpio y escalable.`;
    }

    // CV / Resumen
    if (/(cv|curr[ií]culum|resumen|summary|bio|sobre [eé]l|perfil)/.test(q)) {
      return `📋 **Resumen de Alexis:**\n\n🧑‍💻 ${ALEXIS_DATA.nombre}\n📍 ${ALEXIS_DATA.ubicacion}\n🎓 ${ALEXIS_DATA.carrera} @ ${ALEXIS_DATA.universidad}\n💼 Desarrollador Jr. en Cloudmex Analytics | Desarrollador de Software en Cennit\n🚀 Freelance: Nivo, VetNexus, BuscoVet, Zura Barber\n🛠️ React · Next.js · TypeScript · Flutter · Supabase\n🏅 Scrum Certified · Lean Six Sigma · Inglés B1`;
    }

    // Default
    const suggestions = [
      '¿Cuáles son sus proyectos?',
      '¿Qué tecnologías maneja?',
      '¿Cómo contactarlo?',
      '¿Dónde ha trabajado?',
      '¿Dónde estudia?',
    ];
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    return `Hmm, no estoy seguro de cómo responder eso 🤔 Soy un asistente especializado en **Alexis Hernandez**.\n\nPuedes preguntarme sobre su experiencia, proyectos, habilidades o cómo contactarlo.\n\n💡 Por ejemplo: _"${random}"_`;
  }
}

function getTime(lang: 'es' | 'en') {
  return new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'es-MX', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBot() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message dynamically on load
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        from: 'bot',
        text: '', // Renders dynamically below
        time: getTime(language),
      }
    ]);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: msg,
      time: getTime(language),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(msg, language);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: response,
        time: getTime(language),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Format text with **bold** support
  function formatText(text: string) {
    const lines = text.split('\n');
    return lines.map((line, li) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={li}>
          {parts.map((part, pi) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pi}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('_') && part.endsWith('_')) {
              return <em key={pi}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
          {li < lines.length - 1 && <br />}
        </span>
      );
    });
  }

  return (
    <>
      {/* Floating button */}
      <button
        id="chatbot-toggle-btn"
        className={`chatbot-fab ${open ? 'chatbot-fab--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={t.chatbot.openLabel}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
              <circle cx="16" cy="10" r="1" fill="currentColor" />
            </svg>
            <span className="chatbot-fab__pulse" />
          </>
        )}
      </button>

      {/* Chat window */}
      <div className={`chatbot-window ${open ? 'chatbot-window--open' : ''}`} id="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__avatar">
            <img src="/alexis.png" alt="Alexis" />
            <span className="chatbot-header__status" />
          </div>
          <div className="chatbot-header__info">
            <span className="chatbot-header__name">{t.chatbot.headerName}</span>
            <span className="chatbot-header__sub">{t.chatbot.headerSub}</span>
          </div>
          <button
            className="chatbot-header__close"
            onClick={() => setOpen(false)}
            aria-label={t.chatbot.closeLabel}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((msg) => {
            const text = msg.id === 'welcome' ? t.chatbot.welcomeMessage : msg.text;
            return (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                {msg.from === 'bot' && (
                  <div className="chatbot-msg__avatar">
                    <img src="/alexis.png" alt="Bot" />
                  </div>
                )}
                <div className="chatbot-msg__bubble">
                  <p>{formatText(text)}</p>
                  <span className="chatbot-msg__time">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-msg__avatar">
                <img src="/alexis.png" alt="Bot" />
              </div>
              <div className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions */}
        <div className="chatbot-quick">
          {t.chatbot.quickQuestions.map((q) => (
            <button
              key={q}
              className="chatbot-quick__btn"
              onClick={() => sendMessage(q)}
              disabled={typing}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            id="chatbot-input"
            type="text"
            className="chatbot-input"
            placeholder={t.chatbot.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={typing}
          />
          <button
            id="chatbot-send-btn"
            className="chatbot-send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            aria-label={t.chatbot.sendLabel}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

