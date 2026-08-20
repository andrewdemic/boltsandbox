import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Part = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  title: string;
  description: string;
  funFact: string;
};

const PARTS: Part[] = [
  {
    id: 'periscope',
    label: 'Periscope',
    cx: 400,
    cy: 168,
    title: 'Periscope',
    description:
      'A telescoping tube with mirrors that lets the crew see above the surface while the submarine stays safely submerged. Modern periscopes are being replaced by photonic masts with cameras.',
    funFact: 'The first periscope was invented in 1854 by Hippolyte Marie-Davy.',
  },
  {
    id: 'conning-tower',
    label: 'Conning Tower',
    cx: 400,
    cy: 230,
    title: 'Conning Tower / Sail',
    description:
      'The tower-like structure on top of the submarine. It houses the periscope, antennas, and snorkel. Underwater it has no hydrodynamic role — it exists for surface navigation.',
    funFact: 'On modern subs the "sail" is mostly empty space and ballast.',
  },
  {
    id: 'porthole',
    label: 'Porthole',
    cx: 290,
    cy: 290,
    title: 'Porthole',
    description:
      'A thick acrylic window reinforced with steel rings. On military submarines these are rarely present below the sail, but research subs use them for observation.',
    funFact: 'A porthole on a deep-diving sub can withstand pressure of over 400 atmospheres.',
  },
  {
    id: 'ballast',
    label: 'Ballast Tanks',
    cx: 500,
    cy: 300,
    title: 'Ballast Tanks',
    description:
      'Tanks that can be filled with water to make the submarine sink, or filled with compressed air to make it rise. This is how the submarine controls its depth.',
    funFact: 'A submarine is effectively a balloon that swaps water for air.',
  },
  {
    id: 'sonar',
    label: 'Sonar Dome',
    cx: 200,
    cy: 310,
    title: 'Sonar Dome',
    description:
      'A dome-shaped housing at the bow containing the sonar array. It sends out sound pulses and listens for echoes to detect other vessels, terrain, and marine life.',
    funFact: 'Sound travels 4.5x faster in water than in air — about 1,500 m/s.',
  },
  {
    id: 'propeller',
    label: 'Propeller',
    cx: 660,
    cy: 295,
    title: 'Propeller',
    description:
      'A precision-machined screw that pushes the submarine through the water. Submarine propellers are highly classified to prevent acoustic fingerprinting.',
    funFact: 'The shape of a sub propeller is a state secret in most navies.',
  },
  {
    id: 'hatch',
    label: 'Hatch',
    cx: 430,
    cy: 200,
    title: 'Hatch',
    description:
      'The entry and exit point for the crew. Hatches are heavy, watertight doors sealed with a wheel-like locking mechanism called a dogs system.',
    funFact: 'A single submarine hatch can weigh over 100 kg.',
  },
];

export default function Submarine() {
  const [activePart, setActivePart] = useState<Part | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeIndex = activePart ? PARTS.findIndex((p) => p.id === activePart.id) : -1;

  const goToPart = (direction: number) => {
    if (activeIndex < 0) return;
    const next = (activeIndex + direction + PARTS.length) % PARTS.length;
    setActivePart(PARTS[next]);
  };

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        className={`transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cyan-100">
            Deep Sea Explorer
          </h2>
          <p className="mt-3 text-cyan-200/60 leading-relaxed max-w-md mx-auto">
            Click the glowing hotspots on the submarine to learn about each part.
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: '800 / 400' }}>
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
          >
            {/* Submarine body */}
            <defs>
              <linearGradient id="hullGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="30%" stopColor="#475569" />
                <stop offset="70%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="sailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="propGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <radialGradient id="portGradient">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="60%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#164e63" />
              </radialGradient>
              <radialGradient id="windowGradient">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Main hull */}
            <path
              d="M 120 300 Q 120 220 220 210 L 580 210 Q 680 220 680 300 Q 680 380 580 385 L 220 385 Q 120 380 120 300 Z"
              fill="url(#hullGradient)"
              stroke="#1e293b"
              strokeWidth="2"
            />

            {/* Conning tower / sail */}
            <path
              d="M 340 210 L 340 160 Q 350 150 360 150 L 440 150 Q 450 150 460 160 L 460 210 Z"
              fill="url(#sailGradient)"
              stroke="#1e293b"
              strokeWidth="2"
            />

            {/* Periscope */}
            <line x1="400" y1="150" x2="400" y2="120" stroke="#94a3b8" strokeWidth="3" />
            <rect x="394" y="112" width="12" height="10" rx="2" fill="#64748b" stroke="#1e293b" strokeWidth="1" />

            {/* Antenna */}
            <line x1="420" y1="150" x2="420" y2="110" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="420" cy="108" r="3" fill="#cbd5e1" />

            {/* Hatch on sail */}
            <circle cx="400" cy="185" r="14" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            <circle cx="400" cy="185" r="10" fill="#475569" />
            <line x1="392" y1="185" x2="408" y2="185" stroke="#1e293b" strokeWidth="1.5" />

            {/* Porthole windows */}
            <circle cx="250" cy="280" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <circle cx="250" cy="280" r="17" fill="url(#windowGradient)" />
            <circle cx="244" cy="274" r="5" fill="rgba(255,255,255,0.3)" />

            <circle cx="310" cy="280" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <circle cx="310" cy="280" r="17" fill="url(#windowGradient)" />
            <circle cx="304" cy="274" r="5" fill="rgba(255,255,255,0.3)" />

            <circle cx="490" cy="280" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <circle cx="490" cy="280" r="17" fill="url(#windowGradient)" />
            <circle cx="484" cy="274" r="5" fill="rgba(255,255,255,0.3)" />

            <circle cx="550" cy="280" r="22" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
            <circle cx="550" cy="280" r="17" fill="url(#windowGradient)" />
            <circle cx="544" cy="274" r="5" fill="rgba(255,255,255,0.3)" />

            {/* Sonar dome at bow */}
            <ellipse cx="150" cy="310" rx="35" ry="25" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            <circle cx="145" cy="305" r="6" fill="#22d3ee" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Ballast tank vents */}
            <g opacity="0.6">
              {[480, 500, 520, 540].map((x) => (
                <rect key={x} x={x} y={215} width="6" height="4" rx="1" fill="#1e293b" />
              ))}
            </g>

            {/* Propeller */}
            <g transform="translate(680, 295)">
              <circle cx="0" cy="0" r="8" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
              {[0, 120, 240].map((angle) => (
                <ellipse
                  key={angle}
                  cx="0"
                  cy="0"
                  rx="40"
                  ry="8"
                  fill="url(#propGradient)"
                  stroke="#1e293b"
                  strokeWidth="1"
                  transform={`rotate(${angle})`}
                  style={{ transformOrigin: 'center' }}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`${angle} 0 0`}
                    to={`${angle + 360} 0 0`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </ellipse>
              ))}
            </g>

            {/* Fins */}
            <path d="M 620 385 L 640 395 L 660 385 Z" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M 140 385 L 120 395 L 100 385 Z" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />

            {/* Highlight stripe */}
            <path
              d="M 140 235 Q 140 230 150 230 L 660 230 Q 670 230 670 235"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />

            {/* Interactive hotspots */}
            {PARTS.map((part) => (
              <g
                key={part.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePart(part)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                {/* Pulse ring */}
                <circle
                  cx={part.cx}
                  cy={part.cy}
                  r="18"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  opacity={hoveredPart === part.id ? 0.8 : 0.4}
                >
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Core dot */}
                <circle
                  cx={part.cx}
                  cy={part.cy}
                  r={hoveredPart === part.id ? 8 : 6}
                  fill={activePart?.id === part.id ? '#06b6d4' : '#22d3ee'}
                  stroke="#fff"
                  strokeWidth="1.5"
                  style={{ transition: 'r 0.2s' }}
                />
                {/* Label on hover */}
                {hoveredPart === part.id && (
                  <g>
                    <rect
                      x={part.cx - part.label.length * 3.5 - 8}
                      y={part.cy - 32}
                      width={part.label.length * 7 + 16}
                      height="20"
                      rx="4"
                      fill="#0c4a6e"
                      stroke="#22d3ee"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <text
                      x={part.cx}
                      y={part.cy - 18}
                      textAnchor="middle"
                      fill="#e0f2fe"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {part.label}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Info panel */}
        {activePart && (
          <div className="max-w-lg mx-auto mt-8">
            <div
              className="relative rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md p-6"
              style={{ animation: 'submarine-panel-in 0.3s ease-out' }}
            >
              <button
                onClick={() => setActivePart(null)}
                className="absolute top-4 right-4 text-cyan-400/60 hover:text-cyan-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                  {activePart.label}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-cyan-50 mb-2">{activePart.title}</h3>
              <p className="text-sm text-cyan-100/70 leading-relaxed mb-4">{activePart.description}</p>
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3">
                <p className="text-xs text-cyan-300/80 leading-relaxed">
                  <span className="font-semibold text-cyan-300">Did you know? </span>
                  {activePart.funFact}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => goToPart(-1)}
                  className="flex items-center gap-1 text-sm text-cyan-400/70 hover:text-cyan-300 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-xs text-cyan-500/50">
                  {activeIndex + 1} / {PARTS.length}
                </span>
                <button
                  onClick={() => goToPart(1)}
                  className="flex items-center gap-1 text-sm text-cyan-400/70 hover:text-cyan-300 transition"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Part selector dots */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg mx-auto">
          {PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => setActivePart(part)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                activePart?.id === part.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300'
              }`}
            >
              {part.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
