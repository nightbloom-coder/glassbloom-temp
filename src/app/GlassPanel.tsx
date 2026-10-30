import React from 'react';

/* ════════════════════════════════════════════════════════════
   ESTILO "GLASS CARD" + DESTELLO AZUL MARINO
   (mismos bordes, cristal y color que la tarjeta del amor)
   ════════════════════════════════════════════════════════════ */
export const GLASS_CSS = `
  @keyframes glassGlowPulse {
    0%, 100% { opacity: 0.75; }
    50%      { opacity: 1; }
  }

  /* Panel de cristal esmerilado con bordes biselados */
  .glass-panel {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.12) 0%, transparent 60%),
      linear-gradient(135deg, rgba(30, 25, 35, 0.65) 0%, rgba(10, 8, 12, 0.85) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-top: 1px solid rgba(255, 255, 255, 0.35);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.5);
  }
  .glass-panel-glow {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(ellipse 70% 100% at 50% 100%, rgba(28, 70, 190, 0.6) 0%, rgba(12, 38, 120, 0.38) 40%, rgba(5, 20, 70, 0) 75%);
    animation: glassGlowPulse 4.5s ease-in-out infinite;
  }
  .glass-panel-edge {
    position: absolute;
    left: 12%; right: 12%; bottom: 0;
    height: 2px;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(90, 140, 255, 0.75), transparent);
    filter: blur(1px);
  }

  /* Línea separadora con destello azul */
  .navy-divider-line {
    position: absolute;
    left: 8%; right: 8%; top: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(110, 160, 255, 0.95) 50%, transparent);
    filter: blur(0.4px);
  }
  .navy-divider-glow {
    position: absolute;
    left: 15%; right: 15%; top: -22px;
    height: 44px;
    pointer-events: none;
    background: radial-gradient(ellipse 55% 50% at 50% 50%, rgba(28, 70, 190, 0.55) 0%, rgba(12, 38, 120, 0.28) 45%, rgba(5, 20, 70, 0) 75%);
    animation: glassGlowPulse 4.5s ease-in-out infinite;
  }

  /* Destello azul de fondo para una sección */
  .navy-backdrop {
    background: radial-gradient(ellipse 60% 100% at 50% 100%, rgba(28, 70, 190, 0.5) 0%, rgba(12, 38, 120, 0.28) 40%, rgba(5, 20, 70, 0) 75%);
    animation: glassGlowPulse 4.5s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-panel-glow, .navy-divider-glow, .navy-backdrop { animation: none; }
  }
`;

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;       // clases del contenedor exterior (tamaño, márgenes…)
  innerClassName?: string;  // clases del contenido (grid, padding…)
  glowHeight?: string;      // alto del destello inferior
};

/** Tarjeta de cristal con destello azul marino en la parte inferior */
export function GlassPanel({ children, className = '', innerClassName = '', glowHeight = '45%' }: GlassPanelProps) {
  return (
    <div className={`glass-panel rounded-2xl ${className}`}>
      <style>{GLASS_CSS}</style>
      <div className="glass-panel-glow" style={{ height: glowHeight }} />
      <div className="glass-panel-edge" />
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </div>
  );
}

/** Línea fina con destello azul */
export function NavyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-px w-full bg-white/15 ${className}`} role="separator">
      <style>{GLASS_CSS}</style>
      <div className="navy-divider-glow" />
      <div className="navy-divider-line" />
    </div>
  );
}

/** Destello azul difuso para poner detrás de una sección (posición absoluta) */
export function NavyBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`navy-backdrop pointer-events-none absolute ${className}`}>
      <style>{GLASS_CSS}</style>
    </div>
  );
}