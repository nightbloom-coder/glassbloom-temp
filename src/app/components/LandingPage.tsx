import React, { useEffect, useState } from 'react';

import { KineticProcess } from '../KineticProcess';
import { MusicPlayer } from '../MusicPlayer';
import { CoverflowCarousel } from '../CoverflowCarousel';
import { TimeTogether } from '../TimeTogether';
import FloralExperience from './FloralExperience';
import { APP_CONTENT } from '../content';

// 🌸 1. FLORES NEGRAS SVG (Para el Landing Principal / Hero Section)
import blackFlower1 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/B/1.svg';
import blackFlower2 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/B/4.svg';
import blackFlower3 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/B/7.svg';
import blackFlower4 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/B/11.svg';

// 🌸 2. FLORES A COLOR SVG (Para la sección de "Nuestros recuerdos")
import colorFlower1 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/1.svg';
import colorFlower2 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/2.svg';
import colorFlower3 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/3.svg';
import colorFlower4 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/4.svg';

// 🌸 3. FLORES A COLOR SVG DISTINTAS (Para la sección final del reproductor y footer)
import colorFlower5 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/5.svg';
import colorFlower6 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/6.svg';
import colorFlower7 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/7.svg';
import colorFlower8 from '../../assets/illus/Glass Flowers 3D Assets by Spacekayak (Community)/8.svg';

// ── Enlaces ──────────────────────────────
const GUIDE_URL = '#';   
const STORY_URL = '#';   
const ALBUM_URL = '#';   
// ───────────────────────────────────────────────────────

type LandingPageProps = {
  onGoHome?: () => void;
};

const linkClass = 'text-gray-300 hover:text-white transition-colors whitespace-nowrap';
const DISPLAY_FONT = "'Instrument Serif', Georgia, serif";
const BODY_FONT = "'Manrope', system-ui, sans-serif";

export default function LandingPage({ onGoHome }: LandingPageProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-x-clip selection:bg-white/30"
      style={{ fontFamily: BODY_FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap');

        @keyframes shineSweep {
          0%   { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
        .shine-text {
          background-image: linear-gradient(100deg, #c9cbd2 0%, #c9cbd2 40%, #ffffff 50%, #c9cbd2 60%, #c9cbd2 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: shineSweep 6s linear infinite;
          filter: drop-shadow(0 0 22px rgba(255, 255, 255, 0.15));
        }

        @keyframes floatFlower {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-20px) rotate(6deg) scale(1.03); }
        }
        .anim-flower-1 { animation: floatFlower 12s ease-in-out infinite; }
        .anim-flower-2 { animation: floatFlower 16s ease-in-out infinite; animation-delay: -5s; }
        .anim-flower-3 { animation: floatFlower 14s ease-in-out infinite; animation-delay: -8s; }
        .anim-flower-4 { animation: floatFlower 15s ease-in-out infinite; animation-delay: -2s; }
        .anim-flower-5 { animation: floatFlower 13s ease-in-out infinite; animation-delay: -10s; }

        @media (prefers-reduced-motion: reduce) {
          .shine-text, .anim-flower-1, .anim-flower-2, .anim-flower-3, .anim-flower-4, .anim-flower-5 { animation: none; }
        }
      `}</style>

      {/* Estrellitas decorativas */}
      <div className="absolute top-28 left-24 text-white/50 text-xl animate-pulse">✦</div>
      <div className="absolute top-52 left-1/3 text-white/80 text-2xl">✦</div>
      <div className="absolute top-40 right-1/3 text-white/40 text-lg animate-pulse">✦</div>
      <div className="absolute top-80 right-16 text-white/60 text-2xl">✦</div>

      <header className="sticky top-0 z-50 w-full border-b border-white/15 backdrop-blur-md bg-black/40">
        <nav className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 md:px-10 py-5 max-w-[1400px] mx-auto w-full text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6 md:gap-8">
            <button type="button" onClick={onGoHome} className={linkClass}>Home</button>
            <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Our Guide</a>
            <a href={STORY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Where it all started</a>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Album</a>
          </div>
        </nav>
      </header>

      {/* 1. HERO SECTION */}
      <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col overflow-hidden">
        
        {/* Rosas negras en SVG dispersas en el Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <img src={blackFlower1} alt="" className="absolute top-[10%] left-[2%] lg:left-auto lg:right-[calc(50%_+_470px)] w-64 md:w-80 lg:w-[30rem] opacity-60 anim-flower-2 object-contain" />
           <img src={blackFlower2} alt="" className="absolute top-[20%] right-[0%] lg:right-auto lg:left-[calc(50%_+_470px)] w-56 md:w-72 lg:w-[27rem] opacity-50 anim-flower-4 object-contain scale-x-[-1]" />
           <img src={blackFlower3} alt="" className="absolute bottom-[20%] left-[8%] lg:left-auto lg:right-[calc(50%_+_470px)] w-60 md:w-72 lg:w-[24rem] opacity-70 anim-flower-1 object-contain" />
           <img src={blackFlower4} alt="" className="absolute bottom-[10%] right-[5%] lg:right-auto lg:left-[calc(50%_+_470px)] w-64 md:w-80 lg:w-[25rem] opacity-80 anim-flower-3 object-contain" />
        </div>

        <div className="pointer-events-none absolute bottom-[-520px] left-1/2 z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.28) 30%, rgba(255,255,255,0.09) 55%, rgba(255,255,255,0) 70%)' }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000)' }} />

        <main className="flex flex-col items-center justify-center flex-1 pt-24 pb-24 px-4 relative z-10">
          <h1 className="shine-text text-7xl md:text-[8.5rem] font-normal text-center leading-[1.05] tracking-tight mb-6 max-w-4xl" style={{ fontFamily: DISPLAY_FONT }}>
            {APP_CONTENT.hero.title}
          </h1>
          <p className="text-gray-400 text-center max-w-2xl text-xs md:text-sm leading-relaxed mb-10 drop-shadow-md">
            {APP_CONTENT.hero.subtitle}
          </p>
          <h2 className="shine-text text-5xl md:text-7xl font-normal text-center leading-[1.1] tracking-tight mb-6 max-w-4xl" style={{ fontFamily: DISPLAY_FONT }}>
            {APP_CONTENT.hero.highlight}
          </h2>
          <TimeTogether />
        </main>
      </div>

      <KineticProcess />
      <FloralExperience />

      {/* 2. NUESTROS RECUERDOS */}
       <section className="max-w-[1100px] mx-auto px-8 py-32 relative z-10 flex flex-col items-center overflow-visible">
        <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 pointer-events-none overflow-hidden opacity-70">
          <div className="absolute left-1/2 top-[50%] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dd5b0a]/10 blur-[140px]" />

          <img src={colorFlower1} alt="" draggable={false} className="absolute top-[2%] left-[-4%] lg:left-auto lg:right-[calc(50%_+_440px)] w-64 md:w-80 lg:w-[30rem] anim-flower-1 object-contain" />
          <img src={colorFlower2} alt="" draggable={false} className="absolute top-[6%] right-[-6%] lg:right-auto lg:left-[calc(50%_+_440px)] w-56 md:w-72 lg:w-[27rem] anim-flower-2 object-contain scale-x-[-1]" />
          <img src={colorFlower3} alt="" draggable={false} className="absolute bottom-[2%] left-[2%] lg:left-auto lg:right-[calc(50%_+_440px)] w-60 md:w-72 lg:w-[24rem] anim-flower-3 object-contain" />
          <img src={colorFlower4} alt="" draggable={false} className="absolute bottom-[2%] right-[-3%] lg:right-auto lg:left-[calc(50%_+_440px)] w-64 md:w-80 lg:w-[25rem] anim-flower-4 object-contain" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <h2 className="text-5xl md:text-7xl font-normal text-center mb-4 text-white leading-tight drop-shadow-lg" style={{ fontFamily: DISPLAY_FONT }}>
            {APP_CONTENT.memories.title}
          </h2>
          <p className="text-gray-400 text-center max-w-xl text-sm leading-relaxed mb-16 drop-shadow-md">
            {APP_CONTENT.memories.subtitle}
          </p>
          <div className="w-full mt-4">
            <CoverflowCarousel />
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN FINAL Y REPRODUCTOR */}
      <section className="relative w-full py-24 overflow-visible flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-[50%] h-[50rem] w-[100%] max-w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dd5b0a]/10 blur-[150px] pointer-events-none z-0 opacity-70" />

        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-70">
           <img src={colorFlower5} alt="" className="absolute top-[4%] left-[5%] lg:left-auto lg:right-[calc(50%_+_520px)] w-64 md:w-80 lg:w-[30rem] anim-flower-3 object-contain" />
           <img src={colorFlower6} alt="" className="absolute top-[10%] right-[2%] lg:right-auto lg:left-[calc(50%_+_520px)] w-56 md:w-72 lg:w-[27rem] anim-flower-5 object-contain scale-x-[-1]" />
           <img src={colorFlower7} alt="" className="absolute bottom-[6%] left-[-2%] lg:left-auto lg:right-[calc(50%_+_520px)] w-60 md:w-72 lg:w-[24rem] anim-flower-2 object-contain" />
           <img src={colorFlower8} alt="" className="absolute bottom-[4%] right-[10%] lg:right-auto lg:left-[calc(50%_+_520px)] w-64 md:w-80 lg:w-[25rem] anim-flower-4 object-contain" />
        </div>

        <div className="relative z-10 w-full">
          <MusicPlayer />
        </div>

        <footer className="relative z-10 mt-24 text-center pb-8">
          <p className="text-gray-400 text-sm italic drop-shadow-md" style={{ fontFamily: DISPLAY_FONT }}>
            {APP_CONTENT.footer.text}
          </p>
        </footer>
      </section>

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110 hover:bg-gray-200 active:scale-95 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}