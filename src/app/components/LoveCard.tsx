import React, { useState } from 'react';

export function LoveCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-[1140px] flex-col items-center px-4 py-20">
      <style>{`
        .card-container { perspective: 1000px; }
        .card-flipper {
          transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }
        .card-flipped { transform: rotateY(180deg); }
        .card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .card-back { transform: rotateY(180deg); }
      `}</style>

      {/* Cabecera */}
      <header className="mb-12 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#dfbf88]">
          Una historia sin vencimiento
        </span>
        <h2 className="my-3.5 font-serif text-3xl md:text-5xl font-normal text-[#fff6ec]">
          Contigo, para siempre.
        </h2>
        <p className="text-sm text-[#d2bfc7] leading-relaxed">
          Desde nuestra primera salida, el 7 de febrero de 2026. Haz clic en la tarjeta para girarla 🔓
        </p>
      </header>

      {/* Tarjeta Interactiva con Giro 3D */}
      <div 
        className="card-container w-full max-w-[540px] cursor-pointer select-none"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`card-flipper relative w-full aspect-[1.586] ${flipped ? 'card-flipped' : ''}`}>
          
          {/* ════════════════ FRENTE DE LA TARJETA ════════════════ */}
          <article 
            className="card-face absolute inset-0 w-full h-full rounded-[22px] p-[6cqw] flex flex-col justify-between overflow-hidden border border-[#edcfab70] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-[28px]"
            style={{
              containerType: 'inline-size',
              background: 'linear-gradient(125deg, rgba(255,255,255,0.08), transparent 40%, rgba(231,169,133,0.08)), linear-gradient(145deg, rgba(48,32,44,0.81), rgba(23,19,30,0.91))'
            }}
          >
            {/* Reflejo diagonal */}
            <div className="absolute -inset-[70%] -z-10 rotate-[-35deg] pointer-events-none blur-[12px]"
              style={{ background: 'linear-gradient(90deg, transparent 40%, rgba(223,191,136,0.13) 48%, rgba(255,230,185,0.27) 50%, transparent 58%)' }}
            />

            <div className="flex justify-between items-start">
              <span className="pt-[1cqw] text-[#dfbf88] text-[2cqw] tracking-[0.23em] uppercase">
                Edición única · Amor infinito
              </span>
              <div className="flex items-center pr-[0.4cqw]" aria-label="Dos círculos entrelazados">
                <span className="block w-[10cqw] aspect-square rounded-full bg-[#c64055]" />
                <span className="block w-[10cqw] aspect-square rounded-full bg-[#dfbf88] opacity-90 -ml-[3.7cqw]" />
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-end justify-between mb-[4cqw]">
                <svg className="w-[13cqw] h-[10cqw] text-[#f5dfb9]" viewBox="0 0 80 60" fill="none">
                  <rect x="2" y="2" width="76" height="56" rx="23" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="1.4"/>
                  <ellipse cx="40" cy="30" rx="15" ry="28" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="40" cy="30" r="11" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <div className="flex items-center gap-[2cqw]">
                  <small className="text-[#d2bfc7] text-[1.8cqw] leading-[1.3] tracking-[0.12em]">VALID<br/>THRU</small>
                  <strong className="text-[3cqw] font-medium text-[#fff6ec]">07/26</strong>
                </div>
              </div>

              <p className="m-0 mb-[3cqw] font-mono text-[4.25cqw] font-bold tracking-[0.01em] text-[#fff6ec] whitespace-nowrap">
                0702 · 2026 · PARA · SIEMPRE
              </p>
              <p className="m-0 text-[2.25cqw] font-medium tracking-[0.065em] leading-[1.5] text-[#fff6ec] uppercase">
                NORBERYS NICOLLE TORIBIO ENCARNACIÓN
              </p>
            </div>
          </article>

          {/* ════════════════ REVERSO DE LA TARJETA ════════════════ */}
          <article 
            className="card-face card-back absolute inset-0 w-full h-full rounded-[22px] pt-[7cqw] flex flex-col overflow-hidden border border-[#edcfab70] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-[28px]"
            style={{
              containerType: 'inline-size',
              background: 'linear-gradient(125deg, rgba(255,255,255,0.08), transparent 40%, rgba(231,169,133,0.08)), linear-gradient(145deg, rgba(48,32,44,0.81), rgba(23,19,30,0.91))'
            }}
          >
            {/* Banda magnética */}
            <div className="w-full h-[12cqw] bg-gradient-to-b from-[#111] to-[#050505] shadow-[0_1px_0_rgba(255,255,255,0.05)]" />

            <div className="p-[5cqw_6cqw]">
              <p className="m-0 mb-[2cqw] text-[#d2bfc7] text-[1.8cqw] tracking-[0.18em] uppercase">
                Firma autorizada · Solo tú
              </p>

              <div className="flex items-stretch gap-[2cqw]">
                <div className="flex-1 min-w-0 p-[3cqw_2cqw] rounded-[4px] text-[#4f2839] font-serif italic text-[2.85cqw] leading-[1.4]"
                  style={{ background: 'repeating-linear-gradient(0deg, #f5e9d9 0 3px, #eaddcc 3px 4px)' }}
                >
                  Firmado para amarte todos los días
                </div>

                <div className="grid place-content-center min-w-[15cqw] p-[1cqw] border border-[#dfbf8844] rounded-[5px] text-center">
                  <small className="text-[#d2bfc7] text-[1.65cqw] tracking-[0.15em]">CVV</small>
                  <strong className="mt-[1cqw] text-[#dfbf88] text-[3.3cqw]">❤️: ∞</strong>
                </div>
              </div>

              <p className="mt-[4cqw] mb-[1.5cqw] text-[#dfbf88] text-[2cqw] tracking-[0.2em]">VALOR: INVALUABLE</p>
              <p className="m-0 text-[#d2bfc7] text-[2cqw] leading-[1.6]">
                Esta tarjeta guarda una promesa:<br/>
                elegirte hoy, mañana y siempre.
              </p>
            </div>
          </article>

        </div>
      </div>

      <footer className="mt-12 text-center text-xs text-[#d2bfc7] leading-relaxed">
        Tarjeta simbólica de amor · Sin valor bancario<br />
        Una fecha para recordar. Una historia para siempre.
      </footer>
    </section>
  );
}

export default LoveCard;