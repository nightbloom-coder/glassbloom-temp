import React from 'react';
import { GameLogo } from './GameLogo';
import { LoadingBar } from './LoadingBar';

/**
 * Fondo Procedural SVG con estética Cyberpunk y Glassmorphism
 */
const ProceduralBackground = () => (
  <div className="absolute inset-0 z-0 bg-[#02040a] overflow-hidden">
    {/* Grid de Red de Datos */}
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(29, 78, 216, 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" className="animate-drift" />
      
      {/* Líneas de Red Conectadas */}
      <g className="animate-network-pulse">
        <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="animate-data-flow" />
        <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="animate-data-flow" />
        <line x1="80%" y1="30%" x2="90%" y2="70%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="animate-data-flow" />
        <line x1="10%" y1="20%" x2="20%" y2="80%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="animate-data-flow" />
      </g>
    </svg>

    {/* Destellos de Luz Azul Marino (Glows) */}
    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-950/30 rounded-full blur-[100px] animate-pulse delay-1000" />

    {/* Línea de Escaneo Digital */}
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-scan shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
    </div>

    {/* Ruido Digital / Grano (Sutil) */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden text-white">
      <ProceduralBackground />

      {/* Contenedor Glassmorphism para el contenido */}
      <div className="relative z-10 glass-panel p-12 flex flex-col items-center space-y-12 max-w-lg w-full">
        <GameLogo />
        
        <div className="w-full space-y-8">
          <LoadingBar 
            duration={5000}
            onComplete={onComplete}
          />
          
          <div className="text-center space-y-4">
            <p className="font-display font-semibold text-xs tracking-[0.2em] uppercase text-blue-400/80 animate-pulse">
              System Initialization
            </p>
            <div className="flex items-center justify-center gap-2">
              {[0, 150, 300].map((delay) => (
                <div 
                  key={delay}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detalles de UI Futuristas */}
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center opacity-40 text-[10px] font-mono tracking-widest uppercase">
          <span>Glass OS v2.0.26</span>
          <span>Buffer: Optimized</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;