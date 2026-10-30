import React, { useState, useEffect } from 'react';

// 1. Imágenes Locales
const localPhotos = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const LOCAL_IMAGES = Object.values(localPhotos);

// 2. Fotos de respaldo
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=600&auto=format&fit=crop",
];

// Tiempo extendido a 5.5 segundos para que los GIFs tengan tiempo de reproducirse
const AUTOPLAY_MS = 5500;

export function CoverflowCarousel() {
  const [images, setImages] = useState<string[]>(
    LOCAL_IMAGES.length > 0 ? LOCAL_IMAGES : FALLBACK_IMAGES
  );
  const [active, setActive] = useState(Math.min(2, images.length - 1));

  useEffect(() => {
    console.log("🔍 Intentando buscar fotos en Google Photos...");

    fetch('/.netlify/functions/google-photos')
      .then(async (res) => {
        if (!res.ok) {
          console.warn(`⚠️ Error del servidor Netlify: ${res.status}. (Si estás en localhost:5173 con npm run dev, es normal que falle. Debes subirlo a Netlify).`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.photos && Array.isArray(data.photos) && data.photos.length > 0) {
          console.log(`✅ Éxito: Se encontraron ${data.photos.length} fotos en Google Photos.`);
          
          // Sumamos las fotos locales + las de Google Photos
          const combinedImages = [...LOCAL_IMAGES, ...data.photos];
          
          setImages(combinedImages);
          // Centramos el carrusel a la mitad
          setActive(Math.floor(combinedImages.length / 2));
        } else if (data) {
          console.log("ℹ️ El álbum se leyó, pero parece estar vacío o el link no es público.");
        }
      })
      .catch((err) => {
        console.error("❌ Error de red al buscar Google Photos:", err);
      });
  }, []);

  // Autoplay
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % images.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div 
      className="relative w-full h-[450px] flex items-center justify-center overflow-hidden" 
      style={{ perspective: '1000px' }}
    >
      {images.map((src, i) => {
        const offset = i - active;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;
        const sign = Math.sign(offset);

        // Cálculos 3D para el Coverflow
        const rotateY = isActive ? 0 : sign * -35; 
        const translateZ = isActive ? 150 : -120 * absOffset;
        const translateX = sign * 160 * absOffset;
        const zIndex = 20 - absOffset;
        const opacity = absOffset > 2 ? 0 : 1;

        return (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="absolute transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            style={{
              width: '300px',
              height: '350px',
              zIndex,
              opacity,
              transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
            }}
          >
            <img src={src} alt={`Recuerdo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            
            {/* Overlay oscuro para las fotos de los lados */}
            {!isActive && <div className="absolute inset-0 bg-black/50 transition-colors duration-500" />}
          </div>
        );
      })}
    </div>
  );
}