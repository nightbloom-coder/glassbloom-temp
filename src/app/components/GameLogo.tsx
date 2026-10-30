import React from 'react';

export function GameLogo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Logo */}
      <div className="relative">
        {/* Glow effect background */}
        <h1 className="absolute inset-0 text-6xl md:text-8xl font-bold text-white blur-md opacity-60 animate-pulse">
          BLACKOUT
        </h1>
        
        {/* Main text */}
        <h1 className="relative text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          System Glass
        </h1>
        
        {/* Underline accent */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-2 animate-pulse" />
      </div>
      
      
      {/* Decorative elements */}
      <div className="flex space-x-2 opacity-80 mt-2">
        <div className="w-2 h-2 bg-white rounded-full animate-ping drop-shadow-md" />
        <div className="w-2 h-2 bg-white rounded-full animate-ping animation-delay-200 drop-shadow-md" />
        <div className="w-2 h-2 bg-white rounded-full animate-ping animation-delay-400 drop-shadow-md" />
      </div>
    </div>
  );
}