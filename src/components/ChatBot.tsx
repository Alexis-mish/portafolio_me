import { useState, useRef, useEffect } from 'react';
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
        'Implementó integración de LLMs (Modelos de Lenguaje Grande) para automatizar procesos internos',
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
function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

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

function getTime() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

const QUICK_QUESTIONS = [
  '¿Qué proyectos tiene?',
  '¿Qué tecnologías usa?',
  '¿Está disponible para trabajar?',
  '¿Cómo lo contacto?',
  '¿Dónde estudia?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  from: 'bot',
  text: `¡Hola! 👋 Soy el asistente de **Alexis Hernandez**.\n\nPuedo contarte todo sobre su experiencia, proyectos, habilidades o cómo contactarlo. ¿En qué te puedo ayudar?`,
  time: getTime(),
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(msg);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: response,
        time: getTime(),
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
        aria-label="Abrir asistente"
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
            <span className="chatbot-header__name">Asistente de Alexis</span>
            <span className="chatbot-header__sub">Solo sé sobre él 😄</span>
          </div>
          <button
            className="chatbot-header__close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="chatbot-msg__avatar">
                  <img src="/alexis.png" alt="Bot" />
                </div>
              )}
              <div className="chatbot-msg__bubble">
                <p>{formatText(msg.text)}</p>
                <span className="chatbot-msg__time">{msg.time}</span>
              </div>
            </div>
          ))}

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
          {QUICK_QUESTIONS.map((q) => (
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
            placeholder="Pregúntame sobre Alexis..."
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
            aria-label="Enviar"
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
