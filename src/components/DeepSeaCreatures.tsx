import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';

type Hotspot = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  description: string;
};

type Creature = {
  id: string;
  name: string;
  depth: string;
  depthRange: string;
  description: string;
  funFact: string;
  floatX: number;
  floatY: number;
  floatDuration: number;
  bobDuration: number;
  svg: (active: boolean) => JSX.Element;
  hotspots: Hotspot[];
};

const CREATURES: Creature[] = [
  {
    id: 'anglerfish',
    name: 'Anglerfish',
    depth: '1,000m',
    depthRange: 'Bathypelagic Zone',
    description:
      'A fearsome predator of the deep that uses a bioluminescent lure dangling from its head to attract prey in the darkness. Its enormous jaws and expandable stomach allow it to swallow prey larger than itself.',
    funFact: 'The male anglerfish is tiny and fuses permanently to the female, sharing her bloodstream.',
    floatX: 15,
    floatY: 25,
    floatDuration: 12,
    bobDuration: 4,
    hotspots: [
      { id: 'lure', label: 'Bioluminescent Lure', cx: 185, cy: 33, description: 'A glowing esca powered by symbiotic bacteria. It attracts curious prey close enough to swallow whole.' },
      { id: 'jaws', label: 'Expandable Jaws', cx: 85, cy: 122, description: 'Hinged jaws that open impossibly wide, lined with translucent fangs that curve inward to prevent escape.' },
      { id: 'eye', label: 'Tubular Eyes', cx: 110, cy: 100, description: 'Directed upward to spot the silhouettes of prey against the faint light above — a common adaptation in the deep.' },
    ],
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="angler-body">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <radialGradient id="lure-glow">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="rgba(252,211,77,0)" />
          </radialGradient>
        </defs>
        <path d="M 150 60 Q 170 45 185 35" stroke="#334155" strokeWidth="2" fill="none" />
        <circle cx="185" cy="33" r={active ? "16" : "12"} fill="url(#lure-glow)" opacity={active ? 0.9 : 0.6}>
          {active && <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="185" cy="33" r="5" fill="#fde047" />
        <ellipse cx="140" cy="110" rx="70" ry="45" fill="url(#angler-body)" stroke="#475569" strokeWidth="1.5" />
        <path d="M 80 115 Q 70 125 85 130 L 100 125 Q 95 118 90 115 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${82 + i * 4} 118 L ${84 + i * 4} 124 L ${86 + i * 4} 118`} fill="#e2e8f0" />
        ))}
        <circle cx="110" cy="100" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
        <circle cx="108" cy="98" r="2" fill="#fef08a" opacity={active ? 0.8 : 0.4} />
        <path d="M 210 110 L 250 85 L 240 110 L 250 135 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        <path d="M 140 70 L 155 50 L 165 70 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <path d="M 130 155 L 145 170 L 155 155 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'jellyfish',
    name: 'Jellyfish',
    depth: '2,000m',
    depthRange: 'Abyssopelagic Zone',
    description:
      'Many deep sea jellyfish produce their own light through bioluminescence. Some can flash bright blue light to startle predators, while others use glowing tentacles to lure small prey.',
    funFact: 'The comb jelly refracts light into rainbow shimmer — it is not bioluminescence but pure optical beauty.',
    floatX: 65,
    floatY: 15,
    floatDuration: 16,
    bobDuration: 5,
    hotspots: [
      { id: 'bell', label: 'Translucent Bell', cx: 150, cy: 80, description: 'A gelatinous dome that pulses to propel the jellyfish through the water. It is 95% water with no brain, heart, or bones.' },
      { id: 'tentacles', label: 'Stinging Tentacles', cx: 150, cy: 160, description: 'Nematocyst-lined tentacles that fire tiny harpoons on contact, paralyzing prey before digestion begins.' },
      { id: 'photophores', label: 'Bioluminescent Spots', cx: 130, cy: 70, description: 'Light-producing cells that can flash to startle predators or create a dazzling decoy display.' },
    ],
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="jelly-bell">
            <stop offset="0%" stopColor={active ? "#7dd3fc" : "#475569"} stopOpacity="0.7" />
            <stop offset="70%" stopColor={active ? "#0ea5e9" : "#334155"} stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="80" rx="60" ry="45" fill="url(#jelly-bell)" stroke={active ? "#7dd3fc" : "#475569"} strokeWidth="1.5" />
        <ellipse cx="135" cy="65" rx="20" ry="12" fill="rgba(255,255,255,0.15)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M ${100 + i * 14} 115 Q ${105 + i * 14} ${150 + (i % 3) * 10} ${98 + i * 14} ${180 + (i % 2) * 10}`}
            stroke={active ? "#7dd3fc" : "#475569"}
            strokeWidth="1.5"
            fill="none"
            opacity={active ? 0.6 : 0.4}
          >
            {active && <animateTransform attributeName="transform" type="translate" values={`0 0; 0 ${3 + (i % 2) * 2}; 0 0`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />}
          </path>
        ))}
        {active && [
          { x: 130, y: 70 },
          { x: 165, y: 85 },
          { x: 150, y: 95 },
        ].map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="3" fill="#7dd3fc" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    ),
  },
  {
    id: 'giant-squid',
    name: 'Giant Squid',
    depth: '3,000m',
    depthRange: 'Abyssopelagic Zone',
    description:
      'One of the largest invertebrates on Earth, reaching up to 13 meters in length. It has the largest eyes of any animal — up to 27cm across — to detect the faint silhouettes of prey in the darkness.',
    funFact: 'A giant squid eye is the size of a dinner plate — the largest in the animal kingdom.',
    floatX: 40,
    floatY: 50,
    floatDuration: 14,
    bobDuration: 6,
    hotspots: [
      { id: 'eye', label: 'Dinner-Plate Eyes', cx: 110, cy: 95, description: 'The largest eyes in the animal kingdom at 27cm across. They detect tiny amounts of light from bioluminescent prey at great distances.' },
      { id: 'tentacles', label: 'Armed Tentacles', cx: 130, cy: 175, description: 'Two long feeding tentacles with hundreds of suction cups armed with sharp rings of chitin to grip struggling prey.' },
      { id: 'mantle', label: 'Muscular Mantle', cx: 130, cy: 80, description: 'The main body cavity that contracts to expel water through a siphon, jet-propelling the squid through the deep.' },
    ],
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="squid-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M 120 40 Q 100 45 95 80 Q 90 120 100 150 L 160 150 Q 170 120 165 80 Q 160 45 140 40 Z" fill="url(#squid-body)" stroke="#6d28d9" strokeWidth="1.5" />
        <ellipse cx="105" cy="50" rx="20" ry="10" fill="#5b21b6" opacity="0.6" />
        <ellipse cx="155" cy="50" rx="20" ry="10" fill="#5b21b6" opacity="0.6" />
        <circle cx="110" cy="95" r="10" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="107" cy="92" r="4" fill={active ? "#a78bfa" : "#6d28d9"} opacity={active ? 0.9 : 0.5} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M ${105 + i * 11} 150 Q ${100 + i * 11} ${165 + (i % 2) * 10} ${95 + i * 11} ${185 + (i % 3) * 5}`}
            stroke="#6d28d9"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          >
            {active && <animateTransform attributeName="transform" type="translate" values={`0 0; ${i % 2 ? 3 : -3} 0; 0 0`} dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />}
          </path>
        ))}
        <ellipse cx="100" cy="190" rx="6" ry="12" fill="#5b21b6" opacity="0.5" />
        <ellipse cx="155" cy="190" rx="6" ry="12" fill="#5b21b6" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'viperfish',
    name: 'Viperfish',
    depth: '4,000m',
    depthRange: 'Abyssopelagic Zone',
    description:
      'A terrifying predator with fang-like teeth so long they do not fit inside its mouth. It uses a glowing lure on its dorsal spine to attract small fish, then impales them on its teeth.',
    funFact: 'A viperfish can go over a month without eating — meals are rare in the deep.',
    floatX: 20,
    floatY: 65,
    floatDuration: 10,
    bobDuration: 3.5,
    hotspots: [
      { id: 'fangs', label: 'Hinged Fangs', cx: 52, cy: 108, description: 'Teeth so long they curve outside the mouth. They interlock to trap prey, and the skull hinges backward to swallow large catches.' },
      { id: 'lure', label: 'Dorsal Lure', cx: 90, cy: 53, description: 'A glowing photophore on a modified dorsal ray that waves over the fish\'s head, drawing curious prey into striking range.' },
      { id: 'photophores', label: 'Ventral Photophores', cx: 180, cy: 105, description: 'Rows of light organs on the belly that match the faint light from above, making the fish invisible to predators below.' },
    ],
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="viper-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <path d="M 60 100 Q 80 85 200 90 Q 240 95 250 100 Q 240 105 200 110 Q 80 115 60 100 Z" fill="url(#viper-body)" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="65" cy="100" rx="20" ry="18" fill="#0f1e35" stroke="#334155" strokeWidth="1.5" />
        <path d="M 50 108 Q 45 115 50 122 L 75 112 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${48 + i * 5} 95 L ${50 + i * 5} 108 L ${52 + i * 5} 95`} fill="#e2e8f0" />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${50 + i * 6} 120 L ${52 + i * 6} 108 L ${54 + i * 6} 120`} fill="#e2e8f0" />
        ))}
        <circle cx="62" cy="92" r="5" fill="#020617" stroke="#475569" strokeWidth="1" />
        <circle cx="60" cy="90" r="2" fill={active ? "#67e8f9" : "#155e75"} opacity={active ? 0.9 : 0.5} />
        <path d="M 100 90 Q 95 70 90 55" stroke="#334155" strokeWidth="1.5" fill="none" />
        <circle cx="90" cy="53" r={active ? "8" : "5"} fill={active ? "#67e8f9" : "#155e75"} opacity={active ? 0.8 : 0.4}>
          {active && <animate attributeName="r" values="5;9;5" dur="1.5s" repeatCount="indefinite" />}
        </circle>
        <path d="M 250 100 L 280 80 L 270 100 L 280 120 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <path d="M 180 110 L 190 130 L 210 110 Z" fill="#0f1e35" stroke="#334155" strokeWidth="1" />
        {active && [0, 1, 2, 3].map((i) => (
          <circle key={i} cx={120 + i * 30} cy="105" r="1.5" fill="#67e8f9" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    ),
  },
  {
    id: 'dragonfish',
    name: 'Black Dragonfish',
    depth: '5,000m',
    depthRange: 'Hadal Zone',
    description:
      'A stealthy predator that is nearly invisible in the dark. It can produce red light from a bioluminescent organ below its eye — a wavelength most deep sea creatures cannot see, giving it a secret spotlight.',
    funFact: 'The dragonfish sees in red light — invisible to almost every other creature in the deep.',
    floatX: 70,
    floatY: 60,
    floatDuration: 11,
    bobDuration: 4,
    hotspots: [
      { id: 'barbel', label: 'Chin Barbel', cx: 45, cy: 142, description: 'A whisker-like appendage tipped with a glowing lure that dangles in front of the mouth, tempting prey within range.' },
      { id: 'red-eye', label: 'Red Photophore', cx: 60, cy: 95, description: 'A rare organ that emits red light — invisible to most deep sea life. The dragonfish can see its own red beam, giving it a private spotlight.' },
      { id: 'photophores', label: 'Body Photophores', cx: 160, cy: 100, description: 'Tiny light organs along the body that produce a faint glow for counter-illumination, erasing the silhouette from predators below.' },
    ],
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <path d="M 50 100 Q 80 88 220 92 Q 245 96 250 100 Q 245 104 220 108 Q 80 112 50 100 Z" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
        <ellipse cx="55" cy="100" rx="18" ry="16" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M 50 110 Q 40 125 45 140" stroke="#334155" strokeWidth="1.5" fill="none" />
        <circle cx="45" cy="142" r={active ? "7" : "4"} fill={active ? "#ef4444" : "#7f1d1d"} opacity={active ? 0.9 : 0.5}>
          {active && <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="60" cy="95" r="3" fill={active ? "#ef4444" : "#7f1d1d"} opacity={active ? 0.8 : 0.3} />
        <circle cx="55" cy="93" r="4" fill="#020617" stroke="#334155" strokeWidth="1" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${45 + i * 4} 103 L ${46 + i * 4} 110 L ${47 + i * 4} 103`} fill="#94a3b8" />
        ))}
        <path d="M 250 100 L 280 75 L 272 100 L 280 125 Z" fill="#020617" stroke="#1e293b" strokeWidth="1" />
        <path d="M 120 92 L 130 70 L 145 92 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={100 + i * 22} cy="100" r="1.5" fill={active ? "#f87171" : "#1e293b"} opacity={active ? 0.6 : 0.2}>
            {active && <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />}
          </circle>
        ))}
      </svg>
    ),
  },
];

export default function DeepSeaCreatures() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [spotlightActive, setSpotlightActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const activeCreature = CREATURES.find((c) => c.id === activeId) || null;
  const activeIndex = activeCreature ? CREATURES.findIndex((c) => c.id === activeCreature.id) : -1;

  const goToCreature = (direction: number) => {
    if (activeIndex < 0) return;
    const next = (activeIndex + direction + CREATURES.length) % CREATURES.length;
    setActiveId(CREATURES[next].id);
    setActiveHotspot(null);
  };

  const activeHotspotData = activeCreature?.hotspots.find((h) => h.id === activeHotspot) || null;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        className={`transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Descending into the Abyss
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cyan-50">
            Creatures of the Deep
          </h2>
          <p className="mt-3 text-cyan-200/50 leading-relaxed max-w-lg mx-auto">
            Move your cursor through the darkness to discover creatures. Click any one to explore its anatomy.
          </p>
        </div>

        {/* Interactive dark scene */}
        <div
          className="relative w-full max-w-4xl mx-auto"
          style={{
            height: '460px',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setSpotlightActive(true)}
          onMouseLeave={() => setSpotlightActive(false)}
        >
          {/* Cursor spotlight overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: spotlightActive ? 1 : 0,
              background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(34,211,238,0.08) 0%, transparent 70%)`,
            }}
          />

          {/* Bioluminescent particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                width: '2px',
                height: '2px',
                background: '#22d3ee',
                opacity: 0.15 + (i % 3) * 0.1,
                animation: `creature-fade-in ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
              }}
            />
          ))}

          {/* Floating creatures */}
          {CREATURES.map((creature, i) => {
            const isHovered = hoveredId === creature.id;
            const isSelected = activeId === creature.id;
            return (
              <div
                key={creature.id}
                className="absolute"
                style={{
                  left: `${creature.floatX}%`,
                  top: `${creature.floatY}%`,
                  width: 'min(180px, 45vw)',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  style={{
                    animation: `deep-drift-${i} ${creature.floatDuration}s ease-in-out infinite alternate`,
                  }}
                >
                  <div
                    style={{
                      animation: `deep-bob-${i} ${creature.bobDuration}s ease-in-out infinite alternate`,
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveId(creature.id);
                        setActiveHotspot(null);
                      }}
                      onMouseEnter={() => setHoveredId(creature.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="block w-full transition-all duration-300 group relative"
                      style={{
                        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                        filter: isHovered || isSelected
                          ? 'drop-shadow(0 0 20px rgba(34,211,238,0.4))'
                          : `drop-shadow(0 0 8px rgba(34,211,238,0.1))`,
                        opacity: spotlightActive && !isHovered ? 0.4 : 1,
                        transition: 'filter 0.3s, opacity 0.3s, transform 0.3s',
                      }}
                    >
                      <div className="aspect-[3/2]">{creature.svg(isHovered || isSelected)}</div>
                      {/* Name tag on hover */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -bottom-1 whitespace-nowrap transition-all duration-200"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                        }}
                      >
                        <div className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-xs font-medium text-cyan-200 backdrop-blur-sm">
                          {creature.name}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Depth markers on the side */}
          <div className="absolute right-3 top-4 bottom-4 flex flex-col justify-between pointer-events-none">
            {CREATURES.map((c) => (
              <div key={c.id} className="text-right">
                <div className="text-[10px] font-mono text-cyan-500/40">{c.depth}</div>
              </div>
            ))}
          </div>

          {/* Hint */}
          {!activeId && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs text-cyan-500/40 animate-pulse">
                Hover to illuminate — click to explore
              </p>
            </div>
          )}
        </div>

        {/* Detail modal */}
        {activeCreature && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => {
                setActiveId(null);
                setActiveHotspot(null);
              }}
            />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div
                className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-xl p-6 sm:p-8 pointer-events-auto"
                style={{ animation: 'submarine-panel-in 0.3s ease-out' }}
              >
                <button
                  onClick={() => {
                    setActiveId(null);
                    setActiveHotspot(null);
                  }}
                  className="absolute top-4 right-4 text-cyan-400/60 hover:text-cyan-300 transition z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Interactive creature view */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className="relative rounded-2xl p-4"
                    >
                      {/* Ambient particles in detail view */}
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-cyan-400"
                          style={{
                            left: `${(i * 31) % 100}%`,
                            top: `${(i * 47) % 100}%`,
                            width: '2px',
                            height: '2px',
                            opacity: 0.1 + (i % 3) * 0.08,
                            animation: `creature-fade-in ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite alternate`,
                          }}
                        />
                      ))}

                      <div className="aspect-[3/2] relative">
                        {activeCreature.svg(true)}

                        {/* Hotspots */}
                        {activeCreature.hotspots.map((spot) => {
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
                                {/* Pulse ring */}
                                <span
                                  className="absolute rounded-full border-2"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    borderColor: isActive ? '#22d3ee' : 'rgba(34,211,238,0.5)',
                                    animation: 'hotspot-pulse 2s ease-out infinite',
                                  }}
                                />
                                {/* Core */}
                                <span
                                  className="rounded-full transition-all"
                                  style={{
                                    width: isActive ? '12px' : '10px',
                                    height: isActive ? '12px' : '10px',
                                    background: isActive ? '#22d3ee' : 'rgba(34,211,238,0.7)',
                                    boxShadow: isActive ? '0 0 12px #22d3ee' : '0 0 6px rgba(34,211,238,0.5)',
                                  }}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Depth badge */}
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <span className="text-xs font-mono text-cyan-400">{activeCreature.depth}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs text-slate-500">{activeCreature.depthRange}</span>
                      </div>
                    </div>

                    {/* Hotspot chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeCreature.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                            activeHotspot === spot.id
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                              : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300'
                          }`}
                        >
                          <Info className="w-3 h-3" />
                          {spot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                        Deep Sea Creature
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-cyan-50 mb-3">{activeCreature.name}</h3>

                    {activeHotspotData ? (
                      <div
                        className="flex-1 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4"
                        style={{ animation: 'submarine-panel-in 0.25s ease-out' }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
                            {activeHotspotData.label}
                          </span>
                        </div>
                        <p className="text-sm text-cyan-100/80 leading-relaxed">
                          {activeHotspotData.description}
                        </p>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="mt-3 text-xs text-cyan-400/60 hover:text-cyan-300 transition"
                        >
                          Back to overview
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-cyan-100/70 leading-relaxed mb-4">
                          {activeCreature.description}
                        </p>
                        <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-4 py-3">
                          <p className="text-xs text-cyan-300/80 leading-relaxed">
                            <span className="font-semibold text-cyan-300">Did you know? </span>
                            {activeCreature.funFact}
                          </p>
                        </div>
                        <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                          Click the glowing dots on the creature or the labels below to explore its anatomy in detail.
                        </p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800">
                      <button
                        onClick={() => goToCreature(-1)}
                        className="flex items-center gap-1 text-sm text-cyan-400/70 hover:text-cyan-300 transition"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      <span className="text-xs text-cyan-500/50">
                        {activeIndex + 1} / {CREATURES.length}
                      </span>
                      <button
                        onClick={() => goToCreature(1)}
                        className="flex items-center gap-1 text-sm text-cyan-400/70 hover:text-cyan-300 transition"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
