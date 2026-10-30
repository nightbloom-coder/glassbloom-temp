import React from 'react';
import { GlassPanel } from './GlassPanel';
import { ContactlessIndicator, CardChip } from './CardParts';

/* Tipografías: títulos = Instrument Serif · texto = Manrope · tarjeta = Share Tech Mono + Schibsted Grotesk */
const DISPLAY_FONT = "'Instrument Serif', Georgia, serif";
const BODY_FONT = "'Manrope', system-ui, sans-serif";
const CARD_FONT = "'Schibsted Grotesk', system-ui, sans-serif";
const HOME_URL = import.meta.env.BASE_URL || '/';

type NotFoundProps = {
  onGoHome?: () => void;
};

export function NotFound({ onGoHome }: NotFoundProps) {
  const goHome = () => (onGoHome ? onGoHome() : window.location.assign(HOME_URL));
  const goBack = () => (window.history.length > 1 ? window.history.back() : goHome());

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-white selection:bg-white/30"
      style={{ fontFamily: BODY_FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=Schibsted+Grotesk:wght@600;800&family=Share+Tech+Mono&display=swap');

        @keyframes nfShine {
          0%   { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
        .nf-shine {
          background-image: linear-gradient(100deg, #c9cbd2 0%, #c9cbd2 40%, #ffffff 50%, #c9cbd2 60%, #c9cbd2 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: nfShine 6s linear infinite;
          filter: drop-shadow(0 0 22px rgba(255, 255, 255, 0.15));
        }

        @keyframes nfFloat {
          0%, 100% { transform: translateY(0px) rotateX(1deg) rotateY(-1deg); }
          50%      { transform: translateY(-12px) rotateX(4deg) rotateY(2deg); }
        }
        .nf-float { animation: nfFloat 6s ease-in-out infinite; perspective: 1800px; }

        @keyframes nfBeat {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        .nf-beat { display: inline-block; animation: nfBeat 2.4s ease-in-out infinite; }

        /* Tipografía en relieve (igual que la tarjeta del amor) */
        .nf-embossed {
          font-family: 'Share Tech Mono', monospace;
          text-shadow: -1px -1px 1px rgba(255,255,255,0.25), 1px 1px 2px rgba(0,0,0,0.8);
        }

        @media (prefers-reduced-motion: reduce) {
          .nf-shine { animation: none; background-position: 50% 0; }
          .nf-float, .nf-beat { animation: none; }
        }
      `}</style>

      {/* Esfera de luz inferior */}
      <div
        className="pointer-events-none absolute bottom-[-520px] left-1/2 z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Estrellitas decorativas */}
      <div className="absolute left-[10%] top-24 animate-pulse text-xl text-white/50">✦</div>
      <div className="absolute left-1/3 top-44 text-2xl text-white/80">✦</div>
      <div className="absolute right-1/3 top-32 animate-pulse text-lg text-white/40">✦</div>
      <div className="absolute right-[8%] top-64 text-2xl text-white/60">✦</div>
      <div className="absolute bottom-40 left-[14%] text-lg text-white/40">✦</div>
      <div className="absolute bottom-52 right-[16%] animate-pulse text-xl text-white/50">✦</div>

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <p className="mb-4 text-sm font-medium tracking-wide text-gray-300">Luchyy</p>

        <h1
          className="nf-shine text-[7rem] font-normal leading-none tracking-tight md:text-[12rem]"
          style={{ fontFamily: DISPLAY_FONT }}
          aria-label="Error 404"
        >
          404<span className="nf-beat"></span>
        </h1>

        <h2
          className="mt-2 text-4xl font-normal leading-tight text-white md:text-6xl"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          Esta página se <span className="italic text-gray-500">perdió</span>
        </h2>

        <p className="mt-5 max-w-md text-xs leading-relaxed text-gray-400 md:text-sm">
          Buscamos por todas partes y aquí no hay nada. Pero tranquila: a ti sí te encontraría en cualquier lugar.
        </p>

        {/* Tarjeta flotante: mismo diseño y fuentes que la tarjeta del amor */}
        <div className="nf-float mt-10 w-full max-w-[440px]">
          <div className="aspect-[1.586] w-full" style={{ containerType: 'inline-size' }}>
          <GlassPanel
            className="h-full w-full"
            innerClassName="flex h-full w-full flex-col justify-between text-left"
          >
            <div
              className="flex h-full w-full flex-col justify-between"
              style={{ padding: '8cqw 9cqw' }}
            >
            {/* Cabecera */}
              <div className="flex items-center justify-between pt-[2cqw]">
                <div className="flex flex-col gap-[0.9cqw]">
                  <span className="nf-embossed text-[3.6cqw] uppercase leading-none tracking-[0.18em] text-white">
                    The Ninasil Bank
                  </span>
                  <span className="text-[1.8cqw] font-semibold uppercase tracking-[0.2em] text-white/80 drop-shadow-md">
                    Transacción rechazada · Error 404
                  </span>
                </div>
                <div className="flex items-center drop-shadow-lg" role="img" aria-label="Mastercard">
                  <svg className="h-[8cqw] w-[12cqw]" viewBox="0 0 48 30" fill="none">
                    <circle cx="18" cy="15" r="14" fill="#EB001B" fillOpacity="0.95" />
                    <circle cx="30" cy="15" r="14" fill="#F79E1B" fillOpacity="0.95" />
                  </svg>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="mt-[2cqw] flex flex-col gap-[3cqw]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[3cqw]">
                    <CardChip className="h-[8cqw] w-[10cqw] text-white/80 drop-shadow-md" />
                    <ContactlessIndicator className="h-[6cqw] w-[5cqw] text-white opacity-70 drop-shadow-md" />
                  </div>
                </div>

                <p className="nf-embossed m-0 mt-[1cqw] whitespace-nowrap text-[4.8cqw] tracking-widest text-white">
                  404  PÁGINA  PERDIDA
                </p>

                <div className="mt-[1cqw] flex items-end justify-between">
                  <p
                    className="m-0 text-[2cqw] font-semibold uppercase tracking-[0.1em] text-white/90 drop-shadow"
                    style={{ fontFamily: CARD_FONT }}
                  >
                    Importe: mi amor, sin límite
                  </p>
                  <div className="flex items-center gap-[1.5cqw]">
                    <small className="text-right text-[1.2cqw] leading-[1.1] tracking-[0.1em] text-gray-300">
                      VALID<br />THRU
                    </small>
                    <strong className="nf-embossed text-[2.8cqw] text-white">04/04</strong>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={goHome}
            className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
          >
            Volver al inicio
          </button>
          <button
            type="button"
            onClick={goBack}
            className="rounded-full border border-white/40 px-7 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/5 active:scale-95"
          >
            Regresar
          </button>
        </div>
      </main>
    </div>
  );
}

export default NotFound;