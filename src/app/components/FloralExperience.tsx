import { useState } from "react";

// Importamos las flores PNG
import flower1 from "../../assets/illus/flower-1.png";
import flower2 from "../../assets/illus/flower-2.png";
import flower3 from "../../assets/illus/flower-3.png";
import flower4 from "../../assets/illus/flower-4.png";
import flower5 from "../../assets/illus/flower-5.png";
import flower6 from "../../assets/illus/flower-6.png";

const reasons = [
  {
    number: "01",
    title: "Modular Architecture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "#ff8a24",
  },
  {
    number: "02",
    title: "Glassmorphism UI",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    accent: "#ffd265",
  },
  {
    number: "03",
    title: "Real-time Sync",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    accent: "#f1a47a",
  },
  {
    number: "04",
    title: "Secure Endpoints",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    accent: "#e57373", 
  },
  {
    number: "05",
    title: "High Performance",
    description:
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
    accent: "#ba68c8", 
  },
  {
    number: "06",
    title: "Scalable Core",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    accent: "#64b5f6", 
  },
];

const flowers = [
  {
    src: flower1,
    className: "flower-drift-a -left-24 top-20 w-64 sm:-left-20 sm:w-80 lg:-left-24 lg:top-16 lg:w-[30rem]",
  },
  {
    src: flower2,
    className: "flower-drift-b -right-24 top-8 w-56 sm:-right-14 sm:w-72 lg:-right-20 lg:top-2 lg:w-[27rem]",
  },
  {
    src: flower3,
    className: "flower-drift-c -left-28 bottom-10 w-60 sm:-left-16 sm:w-72 lg:-left-20 lg:bottom-6 lg:w-[24rem]",
  },
  {
    src: flower4,
    className: "flower-drift-d -right-24 bottom-10 w-64 sm:-right-16 sm:w-80 lg:-right-20 lg:bottom-2 lg:w-[25rem]",
  },
  {
    src: flower5,
    className: "flower-drift-e left-[12%] top-[48%] hidden w-44 opacity-35 lg:block",
  },
  {
    src: flower6,
    className: "flower-drift-f right-[10%] top-[40%] hidden w-48 opacity-30 lg:block",
  },
];

export default function FloralExperience() {
  const [activeReason, setActiveReason] = useState(0);

  return (
    <section className="relative isolate flex min-h-[90vh] w-full overflow-visible px-5 py-16 sm:px-8 lg:px-12 text-white">
      {/* Fondo decorativo con las flores flotantes */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70 overflow-visible" aria-hidden="true">
        <div className="absolute left-1/2 top-[42%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#dd5b0a]/10 blur-[140px]" />

        {flowers.map((flower, index) => (
          <img
            key={flower.src}
            src={flower.src}
            alt=""
            draggable={false}
            className={`pointer-events-none absolute z-0 max-w-none object-contain ${flower.className}`}
            style={{ animationDelay: `${index * -1.15}s` }}
          />
        ))}
      </div>

      {/* Contenido interactivo */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col items-center justify-center pb-16 text-center">
          <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.38em] text-[#ffb15f]">
            System Features & Highlights
          </p>

          <h2 className="max-w-4xl text-balance text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            While one is alive,
            <span className="block text-white/45 mt-2">
              one must love as much as possible
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-pretty text-sm leading-6 text-white/55 sm:text-base">
            And these are just a few reasons...
          </p>
        </div>

        {/* LAS 6 CASILLAS (GRID) */}
        <div className="grid gap-4 pb-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const isActive = activeReason === index;

            return (
              <button
                key={reason.title}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveReason(index)}
                className={`group relative z-10 min-h-48 overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-xl transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-6 ${
                  isActive
                    ? "border-white/35 bg-white/[0.13]"
                    : "border-white/15 bg-white/[0.055] hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.09]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500"
                  style={{
                    backgroundColor: reason.accent,
                    transform: `scaleX(${isActive ? 1 : 0})`,
                  }}
                />

                <span className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.24em] text-white/40">
                    {reason.number}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`grid size-8 place-items-center rounded-full border text-sm transition-all duration-500 ${
                      isActive
                        ? "rotate-45 border-white/50 bg-white text-black"
                        : "border-white/20 text-white/60 group-hover:border-white/50"
                    }`}
                  >
                    +
                  </span>
                </span>

                <span className="mt-5 block text-2xl tracking-[-0.03em]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  {reason.title}
                </span>

                <span
                  className={`mt-2 block max-w-xs text-sm leading-relaxed text-white/50 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-65"
                  }`}
                >
                  {reason.description}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}