import React, { useId } from 'react';

/* ════════════════════════════════════════════════════════════
   PIEZAS COMPARTIDAS DE LA TARJETA "THE NINASIL BANK"
   (se usan en la tarjeta del amor y en la página 404)
   ════════════════════════════════════════════════════════════ */

/* Símbolo de pago sin contacto (4 ondas) */
export const ContactlessIndicator = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 20 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    className={`overflow-visible ${className}`}
    role="img"
    aria-label="Pago sin contacto"
  >
    <path d="M4.94 8.92A5 5 0 0 1 4.94 15.08" />
    <path d="M8.09 6.46A9 9 0 0 1 8.09 17.54" />
    <path d="M11.24 4A13 13 0 0 1 11.24 20" />
    <path d="M14.4 1.53A17 17 0 0 1 14.4 22.47" />
  </svg>
);

/* Chip de la tarjeta */
export const CardChip = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 60" fill="none">
    <rect x="2" y="2" width="76" height="56" rx="10" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="40" cy="30" rx="15" ry="28" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="30" r="11" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="78" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="78" y1="40" x2="55" y2="40" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ════════════════════════════════════════════════════════════
   HOLOGRAMA OFICIAL: el gato grabado (src/assets/gato-holograma1.svg)
   Si el archivo no está en esa carpeta, se usa el diseño de respaldo (infinito).
   ════════════════════════════════════════════════════════════ */
const catFiles = import.meta.glob('../assets/gato-holograma1.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
const CAT_URL: string | undefined = Object.values(catFiles)[0];

/* ════════════════════════════════════════════════════════════
   HOLOGRAMA DE SEGURIDAD · THE NINASIL BANK
   Diseño propio: foil iridiscente + guilloché + micro-texto
   circular + infinito (el símbolo de "Amor Infinito").
   El tamaño se da con className, por ejemplo: h-[11cqw] w-[11cqw]
   ════════════════════════════════════════════════════════════ */
const HOLO_CSS = `
  @keyframes holoHue    { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }
  @keyframes holoSweep  { 0% { background-position: 160% 0; } 100% { background-position: -60% 0; } }

  .ninasil-holo {
    position: relative;
    flex-shrink: 0;
    border-radius: 9999px;
    overflow: hidden;
    background:
      repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0 0.6px, transparent 0.6px 3px),
      conic-gradient(from 0deg, #ff9ad5, #ffd36e, #a6ffb8, #6ee7ff, #a58bff, #ff9ad5);
    box-shadow:
      0 0 0 0.35cqw rgba(255,255,255,0.4),
      0 0 2.6cqw rgba(140,170,255,0.5),
      inset 0 0 2cqw rgba(255,255,255,0.4);
    animation: holoHue 8s linear infinite;
  }
  .ninasil-holo::before {
    content: "";
    position: absolute; inset: 0; z-index: 1;
    background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 55%);
    mix-blend-mode: soft-light;
  }
  .ninasil-holo::after {
    content: "";
    position: absolute; inset: 0; z-index: 3;
    background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%);
    background-size: 250% 100%;
    mix-blend-mode: overlay;
    animation: holoSweep 3.6s ease-in-out infinite;
  }

  /* Versión con el gato: lámina iridiscente + grabado oscuro */
  @keyframes holoShift { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  .ninasil-holo--cat {
    border-radius: 16%;
    background: linear-gradient(120deg, #ff9ad5 0%, #ffd36e 20%, #a6ffb8 40%, #6ee7ff 60%, #a58bff 80%, #ff9ad5 100%);
    background-size: 300% 300%;
    box-shadow:
      0 0 0 0.35cqw rgba(255,255,255,0.45),
      0 0 2.6cqw rgba(140,170,255,0.5),
      inset 0 0 1.6cqw rgba(255,255,255,0.35);
    animation: holoHue 8s linear infinite, holoShift 6s ease-in-out infinite alternate;
  }
  .ninasil-holo-ink {
    position: absolute; inset: 0; z-index: 2;
    background: #08081a;
    opacity: 0.9;
    -webkit-mask-size: cover; mask-size: cover;
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  }
  @media (prefers-reduced-motion: reduce) {
    .ninasil-holo, .ninasil-holo::after { animation: none; }
  }
`;

const RAYS = Array.from({ length: 40 }, (_, i) => {
  const a = (i * 9 * Math.PI) / 180;
  const r1 = 26, r2 = i % 2 ? 31 : 33;
  const f = (n: number) => Math.round(n * 100) / 100;
  return { x1: f(50 + r1 * Math.cos(a)), y1: f(50 + r1 * Math.sin(a)), x2: f(50 + r2 * Math.cos(a)), y2: f(50 + r2 * Math.sin(a)) };
});

export function NinasilHologram({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ringId = `holo-ring-${uid}`;

  if (CAT_URL) {
    return (
      <div
        className={`ninasil-holo ninasil-holo--cat ${className}`}
        role="img"
        aria-label="Holograma de seguridad oficial The Ninasil Bank"
      >
        <style>{HOLO_CSS}</style>
        <div
          className="ninasil-holo-ink"
          style={{ WebkitMaskImage: `url("${CAT_URL}")`, maskImage: `url("${CAT_URL}")` }}
        />
      </div>
    );
  }

  return (
    <div
      className={`ninasil-holo ${className}`}
      role="img"
      aria-label="Holograma de seguridad The Ninasil Bank"
    >
      <style>{HOLO_CSS}</style>
      <svg viewBox="0 0 100 100" className="relative z-[2] h-full w-full" fill="none">
        <defs>
          <path id={ringId} d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" />
        </defs>

        {/* Guilloché: anillos y rayos finos */}
        <circle cx="50" cy="50" r="44" stroke="white" strokeOpacity="0.55" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="34.5" stroke="white" strokeOpacity="0.5" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="24" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="1.2 1.6" />
        {RAYS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="white" strokeOpacity="0.5" strokeWidth="0.55" />
        ))}

        {/* Micro-texto circular */}
        <text fontSize="6.4" fontFamily="'Share Tech Mono', ui-monospace, monospace" fill="white" fillOpacity="0.9">
          <textPath href={`#${ringId}`} textLength="238" lengthAdjust="spacing">
            THE NINASIL BANK · ORIGINAL · AUTÉNTICO ·
          </textPath>
        </text>

        {/* Infinito central */}
        <path
          d="M28 50 C28 42 34 38 40 38 C47 38 53 62 60 62 C66 62 72 58 72 50 C72 42 66 38 60 38 C53 38 47 62 40 62 C34 62 28 58 28 50 Z"
          stroke="white"
          strokeWidth="3.2"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 1.5px rgba(255,255,255,0.9))' }}
        />
        <circle cx="50" cy="50" r="2" fill="white" />
      </svg>
    </div>
  );
}