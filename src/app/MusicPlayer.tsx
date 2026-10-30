import React, { useEffect, useRef, useState } from 'react';
import { GlassPanel } from './GlassPanel';

/* ════════════════════════════════════════════════════════════
   CONFIGURACIÓN DEL REPRODUCTOR INSTRUMENTAL
   ════════════════════════════════════════════════════════════ */
const SECTION_TITLE = 'Instrumental Ambient Player';
const SECTION_TEXT =
  'Immerse yourself in soothing ambient soundscapes. Press play to start.';

/* ════════════════════════════════════════════════════════════
   CANCIONES LOCALES + PORTADAS AUTOMÁTICAS
   ════════════════════════════════════════════════════════════ */
const audioFiles = import.meta.glob('../assets/music/*.{mp3,wav,ogg,m4a,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const coverFiles = import.meta.glob('../assets/music/covers/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

type Track = { id: string; title: string; artist: string; src: string; cover?: string };

const baseName = (path: string) =>
  decodeURIComponent(path.split('/').pop() ?? '').replace(/\.[^.]+$/, '');

const localCovers: Record<string, string> = Object.fromEntries(
  Object.entries(coverFiles).map(([p, url]) => [baseName(p), url]),
);

const TRACKS: Track[] = Object.entries(audioFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const base = baseName(path);
    const clean = base.replace(/^\d+[\s._-]+/, '');
    const [first, ...rest] = clean.split(' - ');
    const hasArtist = rest.length > 0;
    return {
      id: base,
      src,
      cover: localCovers[base],
      title: (hasArtist ? rest.join(' - ') : clean).replace(/_/g, ' ').trim(),
      artist: hasArtist ? first.replace(/_/g, ' ').trim() : '',
    };
  });

const FALLBACKS = [
  'linear-gradient(135deg,#7c3aed,#1e1b4b)',
  'linear-gradient(135deg,#ec4899,#4c0519)',
  'linear-gradient(135deg,#06b6d4,#0c4a6e)',
  'linear-gradient(135deg,#f59e0b,#7c2d12)',
  'linear-gradient(135deg,#10b981,#064e3b)',
  'linear-gradient(135deg,#f43f5e,#3b0764)',
];

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const Icon = ({ d, fill = false, className = 'h-5 w-5' }: { d: string; fill?: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={fill ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const PLAY = 'M8 5v14l11-7z';
const PAUSE = 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z';
const PREV = 'M6 5h2v14H6zM20 5v14L9 12z';
const NEXT = 'M16 5h2v14h-2zM4 5v14l11-7z';
const SHUFFLE = 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5';
const REPEAT1 = 'M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3M11 10h1v4';
const VOL = 'M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14';
const MUTE = 'M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6';
const NOTE = 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z';

function Slider({
  value, max, step = 0.1, onChange, label, disabled,
}: { value: number; max: number; step?: number; onChange: (v: number) => void; label: string; disabled?: boolean }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <input
      type="range"
      aria-label={label}
      min={0}
      max={max || 0}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ background: `linear-gradient(to right,#fff ${pct}%,rgba(255,255,255,.2) ${pct}%)` }}
      className="h-1 w-full cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed disabled:opacity-40
        [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
        [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
    />
  );
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startAfterLoad = useRef(false);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [coverError, setCoverError] = useState(false);

  const [autoCovers, setAutoCovers] = useState<Record<string, string>>({});

  const hasTracks = TRACKS.length > 0;
  const track = hasTracks ? TRACKS[index] : undefined;

  useEffect(() => {
    let cancelled = false;

    async function fetchMissingCovers() {
      for (const t of TRACKS) {
        if (t.cover || autoCovers[t.id]) continue;
        const query = encodeURIComponent(`${t.artist} ${t.title}`.trim());
        try {
          const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
          if (!res.ok) continue;
          const data = await res.json();
          const artwork = data?.results?.[0]?.artworkUrl100;
          if (artwork && !cancelled) {
            const hdCover = artwork.replace('100x100bb', '600x600bb');
            setAutoCovers((prev) => ({ ...prev, [t.id]: hdCover }));
          }
        } catch {
          // ignore
        }
      }
    }

    fetchMissingCovers();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    setCurrent(0);
    setDuration(0);
    setLoadError(false);
    setCoverError(false);
    const a = audioRef.current;
    if (a && startAfterLoad.current) a.play().catch(() => setPlaying(false));
  }, [index]);

  const goTo = (i: number, autoplay: boolean) => {
    startAfterLoad.current = autoplay;
    setIndex(i);
  };

  const next = (autoplay = playing) => {
    if (!hasTracks) return;
    if (shuffle && TRACKS.length > 1) {
      let r = index;
      while (r === index) r = Math.floor(Math.random() * TRACKS.length);
      goTo(r, autoplay);
    } else {
      goTo((index + 1) % TRACKS.length, autoplay);
    }
  };

  const prev = () => {
    const a = audioRef.current;
    if (!hasTracks || !a) return;
    if (a.currentTime > 3) {
      a.currentTime = 0;
    } else {
      goTo((index - 1 + TRACKS.length) % TRACKS.length, playing);
    }
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !track) return;
    if (a.paused) {
      startAfterLoad.current = true;
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  };

  const seek = (t: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = t;
    setCurrent(t);
  };

  const handleEnded = () => {
    const a = audioRef.current;
    if (repeatOne && a) {
      a.currentTime = 0;
      a.play().catch(() => undefined);
    } else {
      next(true);
    }
  };

  const activeCoverUrl = track ? (track.cover || autoCovers[track.id]) : undefined;
  const showCover = Boolean(activeCoverUrl && !coverError);
  const fallback = FALLBACKS[index % FALLBACKS.length];
  const ctrl = 'flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:text-white disabled:opacity-30 disabled:hover:text-gray-300';

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col items-center px-4 py-24 pb-36">
      <div className="text-center mb-8 space-y-2">
        <h3
          className="text-4xl font-normal leading-tight text-white md:text-5xl"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {SECTION_TITLE}
        </h3>
        <p className="text-xs leading-relaxed text-gray-400">{SECTION_TEXT}</p>
      </div>

      <GlassPanel className="w-full" innerClassName="w-full p-8 md:p-10 flex flex-col gap-6">
        {/* Cover / Player Header */}
        <div className="flex flex-col gap-6">
          <div className="group relative h-[300px] w-full overflow-hidden rounded-xl">
            {showCover ? (
              <img
                src={activeCoverUrl}
                alt={track!.title}
                onError={() => setCoverError(true)}
                className={`h-full w-full object-cover brightness-75 transition-transform duration-700 ${playing ? 'scale-105' : ''}`}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center" style={{ background: fallback }}>
                <Icon d={NOTE} className="h-20 w-20 text-white/40" />
              </div>
            )}

            <button
              type="button"
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={togglePlay}
              disabled={!hasTracks}
              className="absolute inset-0 flex items-center justify-center disabled:cursor-not-allowed"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-black/40 text-white backdrop-blur-sm transition-all group-hover:scale-110 ${
                  playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                <Icon d={playing ? PAUSE : PLAY} fill className="h-6 w-6" />
              </span>
            </button>
          </div>

          {/* Current Track Info */}
          <div className="min-h-[40px] text-center">
            <p className="truncate text-base font-semibold text-white">
              {track ? track.title : 'No tracks available'}
            </p>
            <p className="truncate text-xs text-gray-400 mt-1">
              {loadError
                ? 'Failed to load audio file'
                : track?.artist || (hasTracks ? 'Ambient Instrumental' : 'Add audio files to assets/music/')}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <Slider value={current} max={duration} onChange={seek} label="Progress" disabled={!hasTracks || !duration} />
            <div className="flex justify-between text-[11px] tabular-nums text-gray-400">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-4">
            <button
              type="button"
              aria-label="Shuffle"
              aria-pressed={shuffle}
              onClick={() => setShuffle((v) => !v)}
              className={`${ctrl} ${shuffle ? '!text-white' : ''}`}
            >
              <Icon d={SHUFFLE} className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <button type="button" aria-label="Previous" onClick={prev} disabled={!hasTracks} className={ctrl}>
                <Icon d={PREV} fill />
              </button>
              <button
                type="button"
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={togglePlay}
                disabled={!hasTracks}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] transition hover:scale-105 hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              >
                <Icon d={playing ? PAUSE : PLAY} fill />
              </button>
              <button type="button" aria-label="Next" onClick={() => next()} disabled={!hasTracks} className={ctrl}>
                <Icon d={NEXT} fill />
              </button>
            </div>

            <button
              type="button"
              aria-label="Repeat"
              aria-pressed={repeatOne}
              onClick={() => setRepeatOne((v) => !v)}
              className={`${ctrl} ${repeatOne ? '!text-white' : ''}`}
            >
              <Icon d={REPEAT1} className="h-4 w-4" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              aria-label={muted ? 'Unmute' : 'Mute'}
              onClick={() => setMuted((m) => !m)}
              className="text-gray-400 transition hover:text-white"
            >
              <Icon d={muted || volume === 0 ? MUTE : VOL} className="h-4 w-4" />
            </button>
            <div className="w-36">
              <Slider
                value={muted ? 0 : volume}
                max={1}
                step={0.01}
                label="Volume"
                onChange={(v) => {
                  setVolume(v);
                  setMuted(false);
                }}
              />
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track?.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleEnded}
        onError={() => {
          if (track) setLoadError(true);
        }}
      />
    </section>
  );
}

export default MusicPlayer;