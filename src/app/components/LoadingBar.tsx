import React, { useState, useEffect } from 'react';

interface LoadingBarProps {
  duration?: number;
  onComplete?: () => void;
}

export function LoadingBar({ duration = 4000, onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 50));
        if (newProgress >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Contenedor de la barra oscurecido para resaltar el blanco */}
      <div className="relative bg-black/60 rounded-full h-3 overflow-hidden border border-white/20 backdrop-blur-sm shadow-md">
        {/* Background glow sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

        {/* Progress bar blanca brillando */}
        <div
          className="h-full bg-white relative transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing effect blanco */}
          <div className="absolute inset-0 bg-white animate-pulse opacity-90" />
          
          {/* Moving shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-[shimmer_2s_ease-in-out_infinite] transform -skew-x-12" />
        </div>
      </div>
      
      {/* Progress text con sombras */}
      <div className="flex justify-between items-center mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span className="text-white font-medium text-sm">Loading...</span>
        <span className="text-white font-bold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}