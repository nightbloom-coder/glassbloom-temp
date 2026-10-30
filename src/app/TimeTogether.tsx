import React, { useEffect, useState } from 'react';

/* ════════════════════════════════════════════════════════════
   SYSTEM UPTIME / NEUTRAL START DATE
   ════════════════════════════════════════════════════════════ */
const START = new Date(2024, 0, 1, 0, 0, 0);
const START_LABEL = 'January 1, 2024';

const LABEL_COLOR = '#9db8ff';

const pad = (n: number) => String(n).padStart(2, '0');

export function TimeTogether() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((now - START.getTime()) / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const units: [string, string][] = [
    ['Days', String(days)],
    ['Hours', pad(hours)],
    ['Minutes', pad(minutes)],
    ['Seconds', pad(seconds)],
  ];

  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">
        System Uptime since {START_LABEL}
      </p>

      <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
        {units.map(([label, value]) => (
          <div
            key={label}
            className="flex min-w-[78px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md md:min-w-[96px] md:px-6 md:py-4"
          >
            <span
              className="text-4xl leading-none tabular-nums text-white md:text-5xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {value}
            </span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: LABEL_COLOR }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeTogether;