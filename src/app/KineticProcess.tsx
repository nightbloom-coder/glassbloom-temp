import React, { useEffect, useState } from 'react';
import { NinasilHologram } from './CardParts';
import { APP_CONTENT } from './content';

/* ════════════════════════════════════════════════════════════════════════
   CARGA AUTOMÁTICA DE ILUSTRACIONES
   ════════════════════════════════════════════════════════════════════════ */
const customIllusFiles = import.meta.glob('../assets/illus/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const normalizeKey = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^\d+[\s._-]+/, '');

const CUSTOM_ILLUS: Record<string, string> = Object.fromEntries(
  Object.entries(customIllusFiles).map(([path, url]) => {
    const fileName = decodeURIComponent(path.split('/').pop() ?? '').replace(/\.[^.]+$/, '');
    return [normalizeKey(fileName), url];
  }),
);

const FALLBACK_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  divertida: <g><circle cx="32" cy="34" r="20" fill="currentColor" fillOpacity="0.18" stroke="white" strokeWidth="2.5" /><path d="M23 30c1.5-2.5 4.5-2.5 6 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><circle cx="39" cy="30" r="2.2" fill="white" /><path d="M24 38c3 5 13 5 16 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><path d="M31 41.5c0 3.5 5 3.5 5 0" fill="#fb7185" stroke="white" strokeWidth="2" /></g>,
  genuina: <g><polygon points="32,12 48,26 32,52 16,26" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /><polyline points="16,26 32,32 48,26" stroke="white" strokeWidth="2" strokeLinejoin="round" /><line x1="32" y1="12" x2="32" y2="52" stroke="white" strokeWidth="2" /></g>,
  ocurrente: <g><path d="M22 36c-3-4-4-10 0-15 4-4.5 16-4.5 20 0 4 5 3 11 0 15-2 2.5-3 5-3 8H25c0-3-1-5.5-3-8z" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /><line x1="26" y1="48" x2="38" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="28" y1="52" x2="36" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></g>,
  valiente: <g><path d="M32 12l16 6v13c0 11-7 18-16 21-9-3-16-10-16-21V18l16-6z" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /><path d="M32 39s-7-4.5-7-9.5a4 4 0 0 1 7-2.5 4 4 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" fill="white" fillOpacity="0.9" /></g>,
  autentica: <g><path d="M32 12c4 0 6 5 9 3s6 3 4 7 5 5 3 9-5 4-4 8-5 6-8 4-5 4-9 0-6-3-5-7-6-5-3-9 2-6 5-7 4-8 8-8z" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" /><circle cx="32" cy="32" r="9" fill="#0e0e0e" stroke="white" strokeWidth="2.2" /></g>,
  atenta: <g><path d="M16 46V20l10 8h12l10-8v26a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6z" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /><circle cx="26" cy="36" r="2.3" fill="white" /></g>,
  sonadora: <g><path d="M40 14a16 16 0 1 0 8 28 13 13 0 0 1-8-28z" fill="currentColor" fillOpacity="0.22" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /></g>,
  encantadora: <g><path d="M27 14h10M29 14v8l-9 14a6 6 0 0 0 5 9h14a6 6 0 0 0 5-9l-9-14v-8" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></g>,
  empatica: <g><circle cx="24" cy="36" r="11" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" /><circle cx="40" cy="36" r="11" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" /></g>,
  apasionada: <g><path d="M32 11c3 8 14 13 14 25a14 14 0 1 1-28 0c0-6 4-11 7-14 0 4 3 6 3 6s-1-9 4-17z" fill="currentColor" fillOpacity="0.22" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /></g>,
  carinosa: <g><rect x="14" y="24" width="36" height="24" rx="4" fill="currentColor" fillOpacity="0.2" stroke="white" strokeWidth="2.5" /></g>,
  unica: <g><path d="M14 44l4-20 14 10 14-10 4 20H14z" fill="currentColor" fillOpacity="0.22" stroke="white" strokeWidth="2.5" strokeLinejoin="round" /></g>,
};

const STAGES = APP_CONTENT.qualities;
const VISIBLE = 5;
const OPACITY = [1, 0.28, 0.15, 0.07, 0];
const STEP_MS = 1500;

const TEXT_GRADIENT = 'linear-gradient(180deg,#f2f3f5 0%,#c4c6cb 38%,#9ea1aa 60%,#a9abb0 82%,#d6d8dc 100%)';
const wrap = (n: number) => ((n % STAGES.length) + STAGES.length) % STAGES.length;

const ContactlessIndicator = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`overflow-visible ${className}`} role="img" aria-label="Pago sin contacto">
    <path d="M4.94 8.92A5 5 0 0 1 4.94 15.08" />
    <path d="M8.09 6.46A9 9 0 0 1 8.09 17.54" />
    <path d="M11.24 4A13 13 0 0 1 11.24 20" />
    <path d="M14.4 1.53A17 17 0 0 1 14.4 22.47" />
  </svg>
);

export function KineticProcess() {
  const [tick, setTick] = useState(0);
  const [cvvRevealed, setCvvRevealed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const rows = [];
  for (let k = -1; k <= VISIBLE; k++) {
    const step = tick + k;
    const i = wrap(step);
    rows.push({ key: step, k, index: i, ...STAGES[i] });
  }

  return (
    <section className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4 md:px-10 py-10 font-sans">
      
      {/* 🔹 DEFINICIÓN DEL GRADIENTE ARCOÍRIS PARA EL SVG */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="hologram-grad" x1="0%" y1="0%" x2="200%" y2="0%">
            <stop offset="0%" stopColor="rgba(212, 175, 55, 1)" />
            <stop offset="20%" stopColor="rgba(255, 154, 158, 1)" />
            <stop offset="40%" stopColor="rgba(161, 140, 209, 1)" />
            <stop offset="60%" stopColor="rgba(143, 211, 244, 1)" />
            <stop offset="80%" stopColor="rgba(132, 250, 176, 1)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 1)" />
            <animate attributeName="x1" values="0%;-200%" dur="4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="200%;0%" dur="4s" repeatCount="indefinite" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotateX(1deg) rotateY(-1deg); filter: drop-shadow(0 25px 35px rgba(0,0,0,0.5)); }
          50% { transform: translateY(-15px) rotateX(4deg) rotateY(2deg); filter: drop-shadow(0 45px 45px rgba(0,0,0,0.25)); }
        }
        .levitate-wrapper {
          animation: floatCard 6s ease-in-out infinite;
          perspective: 1800px;
          transform-style: preserve-3d;
        }

        .card-flipper {
          transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .levitate-wrapper:hover .card-flipper {
          transform: scale(1.08) rotateX(15deg) rotateY(180deg) rotateZ(-6deg);
        }

        .glass-card-bg {
          background: 
            radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, rgba(30, 25, 35, 0.65) 0%, rgba(10, 8, 12, 0.85) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255, 255, 255, 0.35);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.6);
          border-right: 1px solid rgba(0, 0, 0, 0.4);
        }

        .card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .card-back {
          transform: rotateY(180deg);
        }

        @keyframes navyPulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        .navy-glow {
          background: radial-gradient(ellipse 70% 100% at 50% 100%, rgba(28, 70, 190, 0.6) 0%, rgba(12, 38, 120, 0.38) 40%, rgba(5, 20, 70, 0) 75%);
          animation: navyPulse 4.5s ease-in-out infinite;
        }
        .navy-edge {
          background: linear-gradient(90deg, transparent, rgba(90, 140, 255, 0.75), transparent);
          filter: blur(1px);
        }

        .embossed-text {
          font-family: 'Share Tech Mono', monospace;
          text-shadow: -1px -1px 1px rgba(255,255,255,0.25), 1px 1px 2px rgba(0,0,0,0.8);
        }

        .hologram-seal svg {
          fill: url(#hologram-grad);
          filter: drop-shadow(0px 1px 2px rgba(255,255,255,0.3)) drop-shadow(0px 2px 4px rgba(0,0,0,0.8));
          opacity: 0.9;
        }
      `}</style>

      <div className="relative flex w-full max-w-[94vw] xl:max-w-[1440px] min-h-[82vh] items-center overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_16px_40px_rgba(0,0,0,0.6)] p-6 md:p-12" style={{ '--row': 'clamp(64px, 12vh, 115px)' } as React.CSSProperties}>
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-10">
          
          <div className="lg:col-span-6 relative w-full overflow-hidden">
            <div className="relative mx-auto w-full" style={{ height: `calc(var(--row) * ${VISIBLE} + 48px)`, padding: '24px clamp(12px, 3vw, 36px)' }}>
              <div className="relative h-full w-full">
                {rows.map(({ key, k, index, name, icon, tint }) => {
                  const active = k === 0;
                  const opacity = k < 0 ? 0 : OPACITY[k] ?? 0;
                  const customFileUrl = CUSTOM_ILLUS[icon];

                  return (
                    <div key={key} aria-hidden={!active} className="absolute left-0 right-0 top-0 flex items-center transition-all duration-700 ease-out" style={{ height: 'var(--row)', opacity, transform: `translateY(calc(var(--row) * ${k}))` }}>
                      <div className="absolute left-0 flex items-center justify-center rounded-3xl border border-white/25 transition-all duration-500 overflow-hidden" style={{ width: 'calc(var(--row) * 0.82)', height: 'calc(var(--row) * 0.82)', color: tint, background: `linear-gradient(145deg, ${tint}55, ${tint}15)`, boxShadow: `0 0 36px ${tint}66, inset 0 1px 0 rgba(255,255,255,.35)`, opacity: active ? 1 : 0, transform: active ? 'scale(1) rotate(-3deg)' : 'scale(0.55) rotate(8deg)' }}>
                        {customFileUrl ? (
                          <img src={customFileUrl} alt={name} className="h-4/5 w-4/5 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]" />
                        ) : (
                          <svg viewBox="0 0 64 64" fill="none" className="h-3/4 w-3/4">
                            {FALLBACK_ILLUSTRATIONS[icon]}
                          </svg>
                        )}
                      </div>
                      <div className="flex items-start whitespace-nowrap transition-transform duration-500 ease-out" style={{ transform: active ? 'translateX(calc(var(--row) * 1.05))' : 'translateX(0)' }}>
                        <span className="bg-clip-text font-extrabold leading-none" style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontSize: 'calc(var(--row) * 0.78)', letterSpacing: '-0.02em', backgroundImage: TEXT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{name}</span>
                        <span className="ml-3 font-semibold text-[#7a7c82]" style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontSize: 'clamp(12px, calc(var(--row) * 0.22), 24px)', letterSpacing: '0.04em', marginTop: 'calc(var(--row) * 0.05)' }}>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center px-2 relative">
            <div className="levitate-wrapper w-full max-w-[500px]">
              <div className="card-flipper relative w-full aspect-[1.586]">
                
                {/* 💳 FRENTE DE LA TARJETA */}
                <article className="card-face glass-card-bg absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.5)]" style={{ borderRadius: '4%', containerType: 'inline-size', padding: '0' }}>
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-[40px] pointer-events-none" />
                  <div className="absolute -inset-[70%] -z-10 rotate-[-45deg] pointer-events-none blur-[18px]" style={{ background: 'linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.18) 50%, transparent 60%)' }} />
                  <div className="navy-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[42cqw]" />
                  <div className="navy-edge pointer-events-none absolute inset-x-[12%] bottom-0 -z-10 h-[0.5cqw]" />

                  <div className="relative z-10 flex h-full w-full flex-col justify-between" style={{ padding: '8cqw 9cqw' }}>
                    <div className="flex justify-between items-center z-10 pt-[2cqw]">
                      <div className="flex flex-col gap-[0.9cqw]">
                        <span className="embossed-text text-white text-[3.6cqw] uppercase tracking-[0.18em] leading-none">{APP_CONTENT.card.bankName}</span>
                        <span className="text-white/80 text-[1.8cqw] tracking-[0.2em] uppercase font-semibold drop-shadow-md">{APP_CONTENT.card.cardType}</span>
                      </div>
                      <div className="flex items-center drop-shadow-lg" role="img" aria-label="Mastercard">
                        <svg className="w-[12cqw] h-[8cqw]" viewBox="0 0 48 30" fill="none">
                          <circle cx="18" cy="15" r="14" fill="#EB001B" fillOpacity="0.95" />
                          <circle cx="30" cy="15" r="14" fill="#F79E1B" fillOpacity="0.95" />
                        </svg>
                      </div>
                    </div>

                    <div className="z-10 mt-[2cqw] flex flex-col gap-[3cqw]">
                      <div className="flex items-center gap-[3cqw]">
                        <svg className="w-[10cqw] h-[8cqw] text-white/80 drop-shadow-md" viewBox="0 0 80 60" fill="none">
                          <rect x="2" y="2" width="76" height="56" rx="10" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5"/>
                          <ellipse cx="40" cy="30" rx="15" ry="28" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="40" cy="30" r="11" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="2" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="2" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="78" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="1.5"/>
                          <line x1="78" y1="40" x2="55" y2="40" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <ContactlessIndicator className="w-[5cqw] h-[6cqw] text-white opacity-70 drop-shadow-md" />
                      </div>
                      <p className="m-0 text-[4.8cqw] text-white whitespace-nowrap embossed-text tracking-widest mt-[1cqw]">{APP_CONTENT.card.number}</p>
                      <div className="flex items-end justify-between mt-[1cqw]">
                        <p className="m-0 text-[2cqw] font-semibold tracking-[0.1em] text-white/90 uppercase drop-shadow" style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif" }}>{APP_CONTENT.card.holder}</p>
                        <div className="flex items-center gap-[1.5cqw]">
                          <small className="text-gray-300 text-[1.2cqw] leading-[1.1] tracking-[0.1em] text-right">VALID<br/>THRU</small>
                          <strong className="text-[2.8cqw] text-white embossed-text">{APP_CONTENT.card.expiry}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* 💳 REVERSO DE LA TARJETA */}
                <article className="card-face glass-card-bg card-back absolute inset-0 w-full h-full flex flex-col overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" style={{ borderRadius: '4%', containerType: 'inline-size', padding: '0' }}>
                  <div className="navy-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[42cqw]" />
                  <div className="navy-edge pointer-events-none absolute inset-x-[12%] bottom-0 -z-10 h-[0.5cqw]" />
                  <div className="w-full h-[12cqw] mt-[4cqw] bg-black/80 backdrop-blur-md border-y border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />

                  <div className="px-[9cqw] py-[3cqw] z-10 flex flex-col flex-1 relative">
                    <p className="m-0 text-white/60 text-[1.4cqw] tracking-[0.2em] uppercase font-medium mb-[2cqw]">Authorized Signature · Nontransferable</p>

                    <div className="flex items-stretch gap-[3cqw]">
                      <div className="flex-1 min-w-0 p-[1.4cqw_3cqw] flex items-center rounded-[4px] text-gray-800 font-serif italic text-[2.5cqw] shadow-inner" style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.85) 0 2px, rgba(255,255,255,0.95) 2px 4px)' }}>
                        {APP_CONTENT.card.signature}
                      </div>
                      <button type="button" onClick={() => setCvvRevealed((v) => !v)} aria-pressed={cvvRevealed} className="grid cursor-pointer place-content-center min-w-[14cqw] p-[1cqw] border border-white/20 rounded-[4px] bg-white/10 backdrop-blur-md text-center shadow transition hover:bg-white/15">
                        <small className="text-white/60 text-[1.4cqw] tracking-[0.15em] mb-[0.2cqw]">CVV</small>
                        <strong className={`text-white text-[2.8cqw] font-mono drop-shadow-md select-none transition-[filter] duration-500 ${cvvRevealed ? 'blur-none' : 'blur-[1.2cqw]'}`}>{APP_CONTENT.card.cvv}</strong>
                      </button>
                    </div>

                    <div className="mt-auto flex justify-between items-end pb-[1cqw]">
                      <div className="w-[75%] pr-[4cqw]">
                        <p className="m-0 mb-[0.8cqw] text-white/90 text-[1.5cqw] tracking-[0.15em] font-semibold uppercase">{APP_CONTENT.card.value}</p>
                        <ul className="m-0 flex list-none flex-col gap-[0.4cqw] p-0 text-[1.25cqw] leading-[1.2] text-white/60 text-justify" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                          {APP_CONTENT.card.rules.map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 🔹 HOLOGRAMA OFICIAL */}
                      <NinasilHologram className="w-[15cqw] h-[15cqw] shrink-0 mb-[0.5cqw] drop-shadow-md" />
                      
                    </div>
                  </div>

                  <div className="px-[9cqw] pb-[4cqw] flex justify-between items-center text-[1.4cqw] text-white/50 font-mono tracking-widest uppercase">
                    <span>{APP_CONTENT.card.bankName}</span>
                    <span>{APP_CONTENT.card.id}</span>
                  </div>
                </article>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default KineticProcess;