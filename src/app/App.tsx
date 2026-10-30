import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { NotFound } from './NotFound';

/**
 * Verifica si la ruta actual es la raíz o index.html
 */
const isHomePath = () => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const path = window.location.pathname.slice(base.length).replace(/^\/+|\/+$/g, '');
  return path === '' || path === 'index.html';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHome, setIsHome] = useState(isHomePath());

  useEffect(() => {
    const handlePopState = () => setIsHome(isHomePath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (!isHome) {
    return <NotFound />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return <LandingPage onGoHome={() => setIsLoading(true)} />;
}