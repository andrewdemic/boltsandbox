import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Cloud, CloudRain, CloudLightning, ChevronLeft, ChevronRight } from 'lucide-react';

type CloudType = {
  id: string;
  name: string;
  altitude: string;
  altitudeRange: string;
  description: string;
  facts: string[];
  hotspots: { id: string; cx: number; cy: number; label: string; detail: string }[];
  svg: (active: boolean) => React.ReactNode;
  icon: React.ReactNode;
};

const CLOUD_TYPES: CloudType[] = [
  {
    id: 'cumulus',
    name: 'Cumulus',
    altitude: '1,000 m',
    altitudeRange: 'Low-level clouds',
    description: 'Fluffy, cotton-like clouds with flat bases. They form when warm air rises and cools, causing water vapor to condense. On fair-weather days, they drift peacefully across the sky.',
    facts: [
      'Name means "heap" or "pile" in Latin',
      'Often called "fair-weather clouds"',
      'Can grow into cumulonimbus (thunderstorm) clouds',
    ],
    hotspots: [
      { id: 'top', cx: 150, cy: 55, label: 'Dome top', detail: 'The rounded top forms where rising air reaches its condensation level.' },
      { id: 'base', cx: 150, cy: 155, label: 'Flat base', detail: 'The flat bottom marks the altitude where condensation begins — the lifting condensation level.' },
    ],
    icon: <Cloud className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="cumulus-grad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>
          <filter id="cumulus-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 0.5 : 1.5} />
          </filter>
        </defs>
        <g filter="url(#cumulus-blur)">
          <ellipse cx="150" cy="110" rx="110" ry="50" fill="url(#cumulus-grad)" />
          <ellipse cx="95" cy="90" rx="50" ry="42" fill="url(#cumulus-grad)" />
          <ellipse cx="195" cy="85" rx="55" ry="45" fill="url(#cumulus-grad)" />
          <ellipse cx="140" cy="68" rx="42" ry="36" fill="url(#cumulus-grad)" />
          <ellipse cx="220" cy="100" rx="38" ry="32" fill="url(#cumulus-grad)" />
          <ellipse cx="70" cy="105" rx="30" ry="25" fill="url(#cumulus-grad)" />
          <rect x="40" y="125" width="220" height="40" rx="20" fill="url(#cumulus-grad)" />
          <ellipse cx="80" cy="150" rx="40" ry="16" fill="#94a3b8" opacity="0.25" />
          <ellipse cx="220" cy="150" rx="40" ry="16" fill="#94a3b8" opacity="0.25" />
          <ellipse cx="150" cy="155" rx="50" ry="14" fill="#94a3b8" opacity="0.2" />
        </g>
      </svg>
    ),
  },
  {
    id: 'cirrus',
    name: 'Cirrus',
    altitude: '8,000 m',
    altitudeRange: 'High-level clouds',
    description: 'Thin, wispy filaments streaking across the upper atmosphere. Made entirely of ice crystals, they form at high altitudes where temperatures are far below freezing. Their delicate streaks often signal an approaching weather change.',
    facts: [
      'Name means "curl of hair" in Latin',
      'Composed entirely of ice crystals',
      'Often indicate a warm front is approaching',
    ],
    hotspots: [
      { id: 'filament', cx: 140, cy: 70, label: 'Wispy filaments', detail: 'These streaks are shaped by strong high-altitude winds blowing ice crystals into thin trails.' },
      { id: 'fall', cx: 220, cy: 120, label: 'Virga trails', detail: 'Ice crystals falling from the cloud often evaporate before reaching the ground, creating these trailing streaks.' },
    ],
    icon: <Cloud className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="cirrus-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.3" />
          </linearGradient>
          <filter id="cirrus-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 0.3 : 1} />
          </filter>
        </defs>
        <g filter="url(#cirrus-blur)" opacity={active ? 1 : 0.85}>
          <path d="M 30 65 Q 70 50 110 68 Q 150 55 190 72 Q 230 60 275 78" fill="none" stroke="url(#cirrus-grad)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 45 88 Q 85 75 125 92 Q 165 80 205 95" fill="none" stroke="url(#cirrus-grad)" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
          <path d="M 65 110 Q 105 100 145 112 Q 185 105 225 118" fill="none" stroke="url(#cirrus-grad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          <path d="M 95 48 Q 135 40 175 52" fill="none" stroke="#f0f9ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 155 132 Q 195 125 235 138" fill="none" stroke="url(#cirrus-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M 75 142 Q 115 135 155 148" fill="none" stroke="url(#cirrus-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <path d="M 200 55 Q 230 50 260 60" fill="none" stroke="#f0f9ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </g>
      </svg>
    ),
  },
  {
    id: 'cumulonimbus',
    name: 'Cumulonimbus',
    altitude: '12,000 m',
    altitudeRange: 'Vertical development',
    description: 'Towering giants of the sky, these massive clouds can span from near ground level up to the top of the troposphere. Their anvil-shaped tops are the engine behind thunderstorms, heavy rain, hail, and sometimes tornadoes.',
    facts: [
      'Can reach heights of over 10 km',
      'The anvil top is shaped by upper-level winds',
      'Can produce tornadoes, hail, and flash floods',
    ],
    hotspots: [
      { id: 'anvil', cx: 200, cy: 35, label: 'Anvil top', detail: 'The spreading anvil forms when the rising cloud hits the tropopause and can no longer go up, so it spreads sideways.' },
      { id: 'core', cx: 130, cy: 105, label: 'Updraft core', detail: 'Strong updrafts in the center can exceed 100 km/h, pushing moisture to the top of the troposphere.' },
      { id: 'rain', cx: 95, cy: 170, label: 'Rain shaft', detail: 'Heavy precipitation falls from the lower portion, sometimes as hail or torrential rain.' },
    ],
    icon: <CloudLightning className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="cb-light" cx="35%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>
          <radialGradient id="cb-dark" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          <filter id="cb-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 0.5 : 1.2} />
          </filter>
        </defs>
        <g filter="url(#cb-blur)">
          {/* Anvil top */}
          <ellipse cx="200" cy="32" rx="90" ry="20" fill="url(#cb-light)" opacity="0.8" />
          <ellipse cx="225" cy="25" rx="55" ry="15" fill="#e2e8f0" opacity="0.6" />
          {/* Towering body */}
          <ellipse cx="130" cy="88" rx="65" ry="55" fill="url(#cb-light)" />
          <ellipse cx="95" cy="72" rx="42" ry="36" fill="url(#cb-light)" opacity="0.9" />
          <ellipse cx="165" cy="65" rx="48" ry="40" fill="url(#cb-light)" opacity="0.9" />
          <ellipse cx="140" cy="48" rx="38" ry="32" fill="#e2e8f0" opacity="0.6" />
          {/* Lower dark body */}
          <ellipse cx="120" cy="135" rx="75" ry="42" fill="url(#cb-dark)" />
          <ellipse cx="85" cy="125" rx="38" ry="30" fill="url(#cb-dark)" opacity="0.9" />
          <ellipse cx="155" cy="125" rx="42" ry="32" fill="url(#cb-dark)" opacity="0.9" />
          {/* Rain shaft */}
          <rect x="65" y="155" width="55" height="38" rx="6" fill="#1e293b" opacity="0.55" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={75 + i * 8} y1="160" x2={73 + i * 8} y2="190" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
          ))}
          {/* Lightning */}
          <path d="M 135 130 L 122 152 L 138 152 L 125 178" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.7}>
            {active && <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />}
          </path>
        </g>
      </svg>
    ),
  },
  {
    id: 'stratus',
    name: 'Stratus',
    altitude: '1,500 m',
    altitudeRange: 'Low-level clouds',
    description: 'Flat, gray layers that blanket the sky like a high fog. They form when moist air is gently lifted over a large area, creating uniform overcast conditions. They rarely produce precipitation, but can cause light drizzle.',
    facts: [
      'Name means "layer" or "spread out" in Latin',
      'Essentially fog that does not reach the ground',
      'Can cover the sky for days at a time',
    ],
    hotspots: [
      { id: 'layer', cx: 150, cy: 80, label: 'Uniform layer', detail: 'The flat, featureless structure forms when air is lifted gently and evenly over a wide area.' },
      { id: 'edge', cx: 255, cy: 95, label: 'Diffuse edge', detail: 'The edges blend gradually into the sky, with no sharp boundaries — unlike puffy cumulus clouds.' },
    ],
    icon: <Cloud className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="stratus-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.6" />
          </linearGradient>
          <filter id="stratus-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 1 : 2.5} />
          </filter>
        </defs>
        <g filter="url(#stratus-blur)">
          <rect x="10" y="45" width="280" height="85" rx="20" fill="url(#stratus-grad)" />
          <rect x="25" y="38" width="250" height="70" rx="15" fill="#cbd5e1" opacity="0.4" />
          <rect x="45" y="55" width="210" height="50" rx="12" fill="#e2e8f0" opacity="0.35" />
          <ellipse cx="75" cy="50" rx="45" ry="14" fill="#e2e8f0" opacity="0.4" />
          <ellipse cx="225" cy="50" rx="45" ry="14" fill="#e2e8f0" opacity="0.4" />
          <ellipse cx="150" cy="45" rx="55" ry="12" fill="#e2e8f0" opacity="0.3" />
          <rect x="10" y="120" width="280" height="15" rx="7" fill="#94a3b8" opacity="0.3" />
        </g>
      </svg>
    ),
  },
  {
    id: 'altocumulus',
    name: 'Altocumulus',
    altitude: '4,000 m',
    altitudeRange: 'Mid-level clouds',
    description: 'Patches or rolls of small clouds arranged in regular patterns, often creating a "mackerel sky" of rippled bands. They form at middle altitudes and can signal approaching instability or thunderstorms later in the day.',
    facts: [
      'Often called "mackerel sky" clouds',
      'Form at mid-altitudes between low and high clouds',
      'Can indicate thunderstorms later in the day',
    ],
    hotspots: [
      { id: 'cells', cx: 95, cy: 75, label: 'Cloud cells', detail: 'The small individual puffs form when convection occurs in a stable layer of moist air.' },
      { id: 'pattern', cx: 205, cy: 115, label: 'Rippled bands', detail: 'The organized wave-like pattern is created by air currents moving in regular patterns at this altitude.' },
    ],
    icon: <Cloud className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="ac-grad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <filter id="ac-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 0.4 : 1} />
          </filter>
        </defs>
        <g filter="url(#ac-blur)">
          {[
            [55, 55], [105, 50], [155, 55], [205, 50], [255, 55],
            [80, 90], [130, 85], [180, 90], [230, 85],
            [55, 125], [105, 120], [155, 125], [205, 120], [255, 125],
          ].map(([cx, cy], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx="26" ry="16" fill="url(#ac-grad)" opacity={0.75 + (i % 3) * 0.07} />
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: 'nimbostratus',
    name: 'Nimbostratus',
    altitude: '2,000 m',
    altitudeRange: 'Low to mid-level',
    description: 'Dark, featureless gray layers that block out the sun and produce steady, continuous rain. These are the clouds of gloomy, rainy days — they are thick enough to obscure the sun completely and can rain for hours.',
    facts: [
      '"Nimbo" means "rain" in Latin',
      'Produces steady, continuous precipitation',
      'Dark enough to completely block the sun',
    ],
    hotspots: [
      { id: 'thickness', cx: 150, cy: 75, label: 'Deep layer', detail: 'The thick, dark layer is dense with water droplets, blocking most light from passing through.' },
      { id: 'rain', cx: 150, cy: 165, label: 'Steady rain', detail: 'Unlike cumulonimbus downpours, nimbostratus produces consistent, moderate rain that can last for hours.' },
    ],
    icon: <CloudRain className="w-5 h-5" />,
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="ns-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#334155" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
          </linearGradient>
          <filter id="ns-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={active ? 0.5 : 1.5} />
          </filter>
        </defs>
        <g filter="url(#ns-blur)">
          <rect x="10" y="35" width="280" height="95" rx="18" fill="url(#ns-grad)" />
          <rect x="25" y="28" width="250" height="80" rx="14" fill="#475569" opacity="0.4" />
          <rect x="45" y="45" width="210" height="60" rx="12" fill="#64748b" opacity="0.3" />
          <ellipse cx="80" cy="40" rx="45" ry="12" fill="#64748b" opacity="0.35" />
          <ellipse cx="225" cy="40" rx="45" ry="12" fill="#64748b" opacity="0.35" />
          <ellipse cx="150" cy="35" rx="55" ry="10" fill="#64748b" opacity="0.25" />
          {/* Rain */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 25 + i * 28;
            return active ? (
              <line key={i} x1={x} y1="130" x2={x - 4} y2="185" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5">
                <animate attributeName="y1" values="130;185" dur="0.8s" repeatCount="indefinite" begin={`${i * 0.08}s`} />
                <animate attributeName="y2" values="160;210" dur="0.8s" repeatCount="indefinite" begin={`${i * 0.08}s`} />
                <animate attributeName="opacity" values="0;0.5;0" dur="0.8s" repeatCount="indefinite" begin={`${i * 0.08}s`} />
              </line>
            ) : (
              <line key={i} x1={x} y1="130" x2={x - 4} y2="170" stroke="#38bdf8" strokeWidth="1.5" opacity="0.25" />
            );
          })}
        </g>
      </svg>
    ),
  },
];

const POSITIONS = [
  { x: 12, y: 18, size: 170 },
  { x: 72, y: 14, size: 150 },
  { x: 28, y: 48, size: 180 },
  { x: 78, y: 52, size: 160 },
  { x: 18, y: 82, size: 155 },
  { x: 68, y: 85, size: 175 },
];

export default function CloudTypes() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeCloud = CLOUD_TYPES.find((c) => c.id === activeId) || null;
  const activeIndex = activeCloud ? CLOUD_TYPES.findIndex((c) => c.id === activeCloud.id) : -1;

  const goToCloud = useCallback((direction: number) => {
    if (activeIndex < 0) return;
    const next = (activeIndex + direction + CLOUD_TYPES.length) % CLOUD_TYPES.length;
    setActiveId(CLOUD_TYPES[next].id);
    setActiveHotspot(null);
  }, [activeIndex]);

  const activeHotspotData = activeCloud?.hotspots.find((h) => h.id === activeHotspot) || null;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        className={`transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Up in the Clouds
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Cloud Types of the Sky
          </h2>
          <p className="mt-3 text-sky-100/60 leading-relaxed max-w-lg mx-auto">
            Each cloud tells a story about the weather. Click any cloud to explore what makes it unique.
          </p>
        </div>

        {/* Interactive sky scene */}
        <div
          className="relative w-full max-w-5xl mx-auto"
          style={{ height: '520px' }}
        >
          {/* Floating cloud cards */}
          {CLOUD_TYPES.map((cloud, i) => {
            const isHovered = hoveredId === cloud.id;
            const isSelected = activeId === cloud.id;
            const pos = POSITIONS[i];
            return (
              <div
                key={cloud.id}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `min(${pos.size}px, 42vw)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  style={{
                    animation: `cloud-float-${i} ${6 + i * 0.8}s ease-in-out infinite alternate`,
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveId(cloud.id);
                      setActiveHotspot(null);
                    }}
                    onMouseEnter={() => setHoveredId(cloud.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="block w-full transition-all duration-300 group relative"
                    style={{
                      transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                      filter: isHovered || isSelected
                        ? 'drop-shadow(0 4px 24px rgba(255,255,255,0.35))'
                        : 'drop-shadow(0 2px 10px rgba(255,255,255,0.12))',
                      opacity: 1,
                      transition: 'filter 0.3s, transform 0.3s',
                    }}
                  >
                    <div className="aspect-[3/2]">{cloud.svg(isHovered || isSelected)}</div>
                    {/* Name tag on hover */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -bottom-1 whitespace-nowrap transition-all duration-200"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                      }}
                    >
                      <div className="px-2.5 py-1 rounded-full bg-sky-900/80 border border-sky-400/40 text-xs font-medium text-sky-200 backdrop-blur-sm">
                        {cloud.name}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Altitude markers */}
          <div className="absolute left-3 top-4 bottom-4 flex flex-col justify-between pointer-events-none">
            <div className="text-[10px] font-mono text-sky-300/40">High</div>
            <div className="text-[10px] font-mono text-sky-300/40">Mid</div>
            <div className="text-[10px] font-mono text-sky-300/40">Low</div>
          </div>

          {/* Hint */}
          {!activeId && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs text-sky-200/50 animate-pulse">
                Hover to identify — click to explore
              </p>
            </div>
          )}
        </div>

        {/* Detail modal */}
        {activeCloud && (
          <>
            <div
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => {
                setActiveId(null);
                setActiveHotspot(null);
              }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div
                className="relative w-full max-w-3xl rounded-3xl border border-sky-400/30 bg-sky-950/95 backdrop-blur-xl p-6 sm:p-8 pointer-events-auto"
                style={{ animation: 'submarine-panel-in 0.3s ease-out' }}
              >
                <button
                  onClick={() => {
                    setActiveId(null);
                    setActiveHotspot(null);
                  }}
                  className="absolute top-4 right-4 text-sky-300/60 hover:text-sky-200 transition z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation */}
                <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                  <button
                    onClick={() => goToCloud(-1)}
                    className="p-1.5 rounded-lg bg-sky-900/60 border border-sky-700/50 text-sky-300 hover:bg-sky-800/60 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToCloud(1)}
                    className="p-1.5 rounded-lg bg-sky-900/60 border border-sky-700/50 text-sky-300 hover:bg-sky-800/60 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Interactive cloud view */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl p-4">
                      <div className="aspect-[3/2] relative">
                        {activeCloud.svg(true)}

                        {/* Hotspots */}
                        {activeCloud.hotspots.map((spot) => {
                          const isActive = activeHotspot === spot.id;
                          return (
                            <div
                              key={spot.id}
                              className="absolute"
                              style={{
                                left: `${(spot.cx / 300) * 100}%`,
                                top: `${(spot.cy / 200) * 100}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <button
                                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                                className="relative flex items-center justify-center"
                                style={{ width: '28px', height: '28px' }}
                              >
                                <span
                                  className="absolute rounded-full border-2"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    borderColor: isActive ? '#38bdf8' : 'rgba(56,189,248,0.5)',
                                    animation: 'hotspot-pulse 2s ease-out infinite',
                                  }}
                                />
                                <span
                                  className="rounded-full transition-all"
                                  style={{
                                    width: isActive ? '12px' : '10px',
                                    height: isActive ? '12px' : '10px',
                                    background: isActive ? '#38bdf8' : 'rgba(56,189,248,0.7)',
                                    boxShadow: isActive ? '0 0 12px #38bdf8' : '0 0 6px rgba(56,189,248,0.5)',
                                  }}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Altitude badge */}
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className="text-xs font-mono text-sky-400">{activeCloud.altitude}</span>
                        <span className="text-sky-800">·</span>
                        <span className="text-xs text-sky-300/60">{activeCloud.altitudeRange}</span>
                      </div>
                    </div>

                    {/* Hotspot chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeCloud.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                            activeHotspot === spot.id
                              ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                              : 'bg-sky-950/50 border-sky-800/50 text-sky-300/60 hover:border-sky-500/40 hover:text-sky-300'
                          }`}
                        >
                          {spot.label}
                        </button>
                      ))}
                    </div>

                    {/* Hotspot detail */}
                    {activeHotspotData && (
                      <div
                        className="mt-3 rounded-xl bg-sky-500/10 border border-sky-500/20 px-4 py-3 text-sm text-sky-100/80 leading-relaxed"
                        style={{ animation: 'submarine-panel-in 0.2s ease-out' }}
                      >
                        <span className="font-medium text-sky-300">{activeHotspotData.label}: </span>
                        {activeHotspotData.detail}
                      </div>
                    )}
                  </div>

                  {/* Info panel */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300">
                        {activeCloud.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{activeCloud.name}</h3>
                        <p className="text-xs text-sky-400/70">{activeCloud.altitudeRange}</p>
                      </div>
                    </div>

                    <p className="text-sm text-sky-100/70 leading-relaxed mb-5">
                      {activeCloud.description}
                    </p>

                    <div className="mt-auto space-y-2">
                      <h4 className="text-xs font-semibold text-sky-400/80 uppercase tracking-wider">Did you know?</h4>
                      <ul className="space-y-2">
                        {activeCloud.facts.map((fact, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-sky-100/60">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400/60 flex-shrink-0" />
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cloud type navigation dots */}
                <div className="flex justify-center gap-2 mt-6 pt-5 border-t border-sky-800/50">
                  {CLOUD_TYPES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveId(c.id);
                        setActiveHotspot(null);
                      }}
                      className={`transition-all rounded-full ${
                        c.id === activeId
                          ? 'w-6 h-2 bg-sky-400'
                          : 'w-2 h-2 bg-sky-700/50 hover:bg-sky-600/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
