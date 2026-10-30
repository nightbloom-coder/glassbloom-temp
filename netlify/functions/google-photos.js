// Archivo: netlify/functions/google-photos.js

// Link de tu álbum de Google Photos
const ALBUM_URL = 'https://photos.app.goo.gl/tupQxK381WDCzAjS7';

export const handler = async () => {
  try {
    if (!ALBUM_URL || ALBUM_URL.includes('PEGA_AQUI')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ photos: [], message: 'Falta configurar el link del álbum' }),
      };
    }

    const response = await fetch(ALBUM_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = await response.text();

    // Extrae todas las URLs de imágenes de los servidores de Google Photos (lh3.googleusercontent.com)
    const regex = /https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9\-_]+/g;
    const matches = html.match(regex) || [];

    // Elimina duplicados y formatea a resolución 800px de ancho para carga rápida en el carrusel
    const uniquePhotos = [...new Set(matches)].map((url) => `${url}=w800-h900-no`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cachea por 30 minutos para que cargue volando y siempre renueve los enlaces antes de que caduquen
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=600',
      },
      body: JSON.stringify({ photos: uniquePhotos }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ photos: [], error: error.message }),
    };
  }
};