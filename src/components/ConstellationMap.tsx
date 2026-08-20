import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

type ConstStar = {
  x: number;
  y: number;
  mag: number;
  name?: string;
};

type Constellation = {
  id: string;
  name: string;
  type: string;
  cx: number;
  cy: number;
  scale: number;
  stars: ConstStar[];
  lines: [number, number][];
  brightestStar: string;
  bestVisible: string;
  hemisphere: string;
  starCount: string;
  description: string;
  facts: string[];
};

const CONSTELLATIONS: Constellation[] = [
  {
    id: 'orion',
    name: 'Orion',
    type: 'Equatorial constellation',
    cx: 240,
    cy: 175,
    scale: 1.8,
    stars: [
      { x: 50, y: 18, mag: 0.5, name: 'Betelgeuse' },
      { x: 38, y: 22, mag: 1.6, name: 'Bellatrix' },
      { x: 44, y: 42, mag: 1.7, name: 'Mintaka' },
      { x: 50, y: 44, mag: 1.7, name: 'Alnilam' },
      { x: 56, y: 46, mag: 1.8, name: 'Alnitak' },
      { x: 62, y: 68, mag: 0.1, name: 'Rigel' },
      { x: 42, y: 72, mag: 2.1, name: 'Saiph' },
      { x: 48, y: 52, mag: 3, name: 'Hatsya' },
      { x: 52, y: 56, mag: 3.5 },
      { x: 46, y: 58, mag: 3.5 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [2, 9], [3, 8], [4, 7], [7, 8], [8, 9], [7, 9]],
    brightestStar: 'Rigel (0.1 mag)',
    bestVisible: 'November – March',
    hemisphere: 'Both hemispheres',
    starCount: '7 major stars',
    description: 'Orion the Hunter is one of the most recognizable constellations in the night sky, visible across most of the world.',
    facts: [
      'Betelgeuse is a red supergiant so large that, if placed at the center of our solar system, it would engulf Jupiter',
      "Orion's Belt — three evenly spaced stars — is the easiest way to locate the constellation",
      'The Orion Nebula (M42) sits below the belt and is one of the brightest nebulae, visible to the naked eye',
      'Orion is visible from November to March in the Northern Hemisphere',
    ],
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    type: 'Northern constellation',
    cx: 720,
    cy: 130,
    scale: 1.5,
    stars: [
      { x: 15, y: 30, mag: 1.8, name: 'Dubhe' },
      { x: 28, y: 36, mag: 2.4, name: 'Merak' },
      { x: 40, y: 32, mag: 2.4, name: 'Phecda' },
      { x: 52, y: 38, mag: 3.3, name: 'Megrez' },
      { x: 64, y: 30, mag: 1.8, name: 'Alioth' },
      { x: 76, y: 34, mag: 2.3, name: 'Mizar' },
      { x: 88, y: 40, mag: 1.9, name: 'Alkaid' },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 3]],
    brightestStar: 'Alioth (1.8 mag)',
    bestVisible: 'Year-round (circumpolar)',
    hemisphere: 'Northern',
    starCount: '7 major stars',
    description: 'Ursa Major, the Great Bear, contains the Big Dipper — one of the most famous asterisms in the sky.',
    facts: [
      'The Big Dipper is not a constellation itself but an asterism within Ursa Major',
      'The two stars at the front of the dipper (Dubhe and Merak) point toward Polaris, the North Star',
      'Mizar and Alcor, a famous double star pair, sit in the handle and can be resolved with the naked eye',
      'Ursa Major is circumpolar — it never sets below the horizon for most Northern Hemisphere observers',
    ],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    type: 'Northern constellation',
    cx: 880,
    cy: 330,
    scale: 1.4,
    stars: [
      { x: 15, y: 40, mag: 2.2, name: 'Caph' },
      { x: 35, y: 20, mag: 2.2, name: 'Schedar' },
      { x: 52, y: 45, mag: 2.5, name: 'Gamma Cas' },
      { x: 70, y: 22, mag: 2.7, name: 'Ruchbah' },
      { x: 88, y: 42, mag: 3.4, name: 'Segin' },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    brightestStar: 'Schedar (2.2 mag)',
    bestVisible: 'Year-round (circumpolar)',
    hemisphere: 'Northern',
    starCount: '5 major stars',
    description: 'Cassiopeia is a distinctive W-shaped constellation, named after the vain queen in Greek mythology.',
    facts: [
      'Its distinctive W shape makes it one of the easiest constellations to spot in the Northern sky',
      'Cassiopeia is circumpolar for most of the Northern Hemisphere and never sets',
      'It sits directly opposite the Big Dipper across Polaris',
      'Tycho Brahe observed a famous supernova in Cassiopeia in 1572, visible in daylight for two weeks',
    ],
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    type: 'Northern constellation',
    cx: 440,
    cy: 370,
    scale: 1.7,
    stars: [
      { x: 50, y: 12, mag: 1.3, name: 'Deneb' },
      { x: 50, y: 38, mag: 2.2, name: 'Sadr' },
      { x: 25, y: 40, mag: 2.5, name: 'Gienah' },
      { x: 75, y: 40, mag: 2.9, name: 'Delta Cyg' },
      { x: 50, y: 72, mag: 3.0, name: 'Albireo' },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]],
    brightestStar: 'Deneb (1.3 mag)',
    bestVisible: 'June – December',
    hemisphere: 'Northern',
    starCount: '5 major stars',
    description: 'Cygnus the Swan flies along the Milky Way, its wings outstretched in a distinctive cross shape.',
    facts: [
      'Cygnus is also known as the Northern Cross due to its shape',
      'Deneb, at the tail of the swan, is one of the most luminous stars known — about 200,000 times brighter than the Sun',
      'Albireo, at the head of the swan, is a famous double star with striking blue and gold contrasting colors',
      'The constellation lies in a dense band of the Milky Way, making it rich with nebulae and star clusters',
    ],
  },
  {
    id: 'leo',
    name: 'Leo',
    type: 'Zodiac constellation',
    cx: 165,
    cy: 470,
    scale: 1.4,
    stars: [
      { x: 20, y: 25, mag: 1.4, name: 'Regulus' },
      { x: 28, y: 18, mag: 3.5, name: 'Eta Leo' },
      { x: 35, y: 14, mag: 2.0, name: 'Algieba' },
      { x: 40, y: 10, mag: 3.4, name: 'Adhafera' },
      { x: 44, y: 20, mag: 3.0, name: 'Ras Elased' },
      { x: 55, y: 45, mag: 2.6, name: 'Chertan' },
      { x: 70, y: 38, mag: 2.1, name: 'Zosma' },
      { x: 82, y: 55, mag: 2.1, name: 'Denebola' },
      { x: 60, y: 58, mag: 3.3, name: 'Mu Leo' },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1], [0, 5], [5, 6], [6, 7], [7, 8], [8, 5]],
    brightestStar: 'Regulus (1.4 mag)',
    bestVisible: 'February – May',
    hemisphere: 'Both hemispheres',
    starCount: '9 major stars',
    description: 'Leo the Lion is a zodiac constellation whose brightest star, Regulus, sits almost on the ecliptic.',
    facts: [
      'Regulus means "little king" in Latin and is one of the brightest stars in the sky',
      "The sickle-shaped asterism at the front of Leo represents the lion's mane and head",
      'Leo is one of the 12 zodiac constellations, meaning the Sun passes through it each year',
      'The Leonid meteor shower radiates from Leo every November, peaking roughly every 33 years',
    ],
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    type: 'Zodiac constellation',
    cx: 680,
    cy: 500,
    scale: 1.5,
    stars: [
      { x: 15, y: 22, mag: 2.6, name: 'Acrab' },
      { x: 20, y: 30, mag: 2.9, name: 'Dschubba' },
      { x: 22, y: 38, mag: 2.3, name: 'Pi Sco' },
      { x: 30, y: 45, mag: 1.0, name: 'Antares' },
      { x: 38, y: 52, mag: 3.0, name: 'Tau Sco' },
      { x: 45, y: 60, mag: 2.8, name: 'Epsilon Sco' },
      { x: 55, y: 68, mag: 3.3, name: 'Mu Sco' },
      { x: 68, y: 72, mag: 2.4, name: 'Shaula' },
      { x: 75, y: 64, mag: 2.7, name: 'Lesath' },
      { x: 70, y: 52, mag: 3.3, name: 'Sargas' },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [7, 9]],
    brightestStar: 'Antares (1.0 mag)',
    bestVisible: 'June – August',
    hemisphere: 'Southern / Equatorial',
    starCount: '10 major stars',
    description: 'Scorpius the Scorpion is a striking S-shaped constellation with the red giant Antares at its heart.',
    facts: [
      'Antares means "rival of Mars" due to its reddish color, similar to the planet Mars',
      'Antares is a red supergiant with a diameter roughly 700 times that of our Sun',
      'Scorpius is one of the 12 zodiac constellations and is best visible in the summer sky',
      'The curved tail of the scorpion ends in Shaula and Lesath, sometimes called the "cat\'s eyes"',
    ],
  },
];

const MAP_W = 1000;
const MAP_H = 650;

function magToRadius(mag: number): number {
  return Math.max(1.2, 4.5 - mag * 0.7);
}

function magToOpacity(mag: number): number {
  return Math.max(0.4, Math.min(1, 1.2 - mag * 0.15));
}

function generateBgStars(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * MAP_W,
    y: rand() * MAP_H,
    r: rand() < 0.85 ? 0.5 + rand() * 0.5 : 1 + rand() * 0.5,
    opacity: 0.15 + rand() * 0.35,
  }));
}

function starMapPos(c: Constellation, s: ConstStar) {
  return {
    x: c.cx + (s.x - 50) * c.scale,
    y: c.cy + (s.y - 50) * c.scale,
  };
}

function ConstellationSvg({
  constellation,
  hovered,
  onHover,
  onClick,
  showLabels,
}: {
  constellation: Constellation;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (c: Constellation) => void;
  showLabels: boolean;
}) {
  const strokeColor = hovered ? 'rgba(56,189,248,0.6)' : 'rgba(100,116,139,0.25)';
  const strokeWidth = hovered ? 1.2 : 0.7;

  return (
    <g
      onMouseEnter={() => onHover(constellation.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(constellation)}
      style={{ cursor: 'pointer' }}
    >
      {/* Lines */}
      {constellation.lines.map(([a, b], i) => {
        const sa = starMapPos(constellation, constellation.stars[a]);
        const sb = starMapPos(constellation, constellation.stars[b]);
        return (
          <line
            key={`line-${i}`}
            x1={sa.x}
            y1={sa.y}
            x2={sb.x}
            y2={sb.y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
          />
        );
      })}

      {/* Stars */}
      {constellation.stars.map((s, i) => {
        const pos = starMapPos(constellation, s);
        const r = magToRadius(s.mag) * (constellation.scale / 1.5);
        return (
          <g key={`star-${i}`}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={r * 2.2}
              fill={hovered ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.06)'}
              style={{ transition: 'fill 0.3s ease' }}
            />
            <circle
              cx={pos.x}
              cy={pos.y}
              r={r}
              fill={hovered ? '#fff' : '#e2e8f0'}
              opacity={magToOpacity(s.mag)}
              style={{ transition: 'fill 0.3s ease' }}
            />
          </g>
        );
      })}

      {/* Star name labels on hover */}
      {showLabels && hovered && constellation.stars.map((s, i) => {
        if (!s.name) return null;
        const pos = starMapPos(constellation, s);
        return (
          <text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y - 6}
            fill="rgba(186,230,253,0.9)"
            fontSize="7"
            fontFamily="sans-serif"
            textAnchor="middle"
            style={{ pointerEvents: 'none' }}
          >
            {s.name}
          </text>
        );
      })}
    </g>
  );
}

function SingleConstellationSvg({ constellation }: { constellation: Constellation }) {
  const strokeColor = 'rgba(56,189,248,0.5)';
  return (
    <svg viewBox="-10 -10 120 120" className="w-full h-full" style={{ overflow: 'visible' }}>
      {constellation.lines.map(([a, b], i) => {
        const sa = constellation.stars[a];
        const sb = constellation.stars[b];
        return (
          <line
            key={`line-${i}`}
            x1={sa.x}
            y1={sa.y}
            x2={sb.x}
            y2={sb.y}
            stroke={strokeColor}
            strokeWidth={0.5}
            strokeLinecap="round"
          />
        );
      })}
      {constellation.stars.map((s, i) => {
        const r = magToRadius(s.mag);
        return (
          <g key={`star-${i}`}>
            <circle cx={s.x} cy={s.y} r={r * 2} fill="rgba(255,255,255,0.08)" />
            <circle cx={s.x} cy={s.y} r={r} fill="#e2e8f0" opacity={magToOpacity(s.mag)} />
          </g>
        );
      })}
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/50">
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
      <div className="text-sm text-slate-200 font-medium mt-0.5">{value}</div>
    </div>
  );
}

export default function ConstellationMap() {
  const [selected, setSelected] = useState<Constellation | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const bgStars = useMemo(() => generateBgStars(120, 42), []);

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">Interactive Constellation Map</h2>
        <p className="text-sm text-slate-400 mt-1">Click a constellation to explore its details</p>
      </div>

      <div
        className="relative w-full mx-auto flex items-center justify-center"
        style={{ height: '650px', maxHeight: '72vh' }}
      >
        <div
          className="relative"
          style={{ width: `${MAP_W}px`, height: `${MAP_H}px`, transform: 'scale(var(--scale))', transformOrigin: 'center' }}
        >
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="absolute inset-0 w-full h-full"
            style={{ overflow: 'visible' }}
          >
            {/* Background stars */}
            {bgStars.map((s, i) => (
              <circle
                key={`bg-${i}`}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#fff"
                opacity={s.opacity}
              />
            ))}

            {/* Constellations */}
            {CONSTELLATIONS.map((c) => (
              <ConstellationSvg
                key={c.id}
                constellation={c}
                hovered={hovered === c.id}
                onHover={setHovered}
                onClick={setSelected}
                showLabels={true}
              />
            ))}
          </svg>

          {/* Hover tooltips (HTML overlay) */}
          {CONSTELLATIONS.map((c) => {
            if (hovered !== c.id) return null;
            return (
              <div
                key={`tooltip-${c.id}`}
                className="absolute pointer-events-none whitespace-nowrap"
                style={{
                  left: `${c.cx}px`,
                  top: `${c.cy - 80}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="text-sm text-slate-200 bg-slate-900/80 px-2.5 py-1 rounded-md border border-sky-500/30">
                  {c.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 pb-4">
              <div className="flex flex-col items-center gap-3">
                <div className="shrink-0 w-40 h-40">
                  <SingleConstellationSvg constellation={selected} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">{selected.name}</h3>
                  <p className="text-sm text-slate-400">{selected.type}</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4">
              <div className="grid grid-cols-2 gap-2.5">
                <Stat label="Brightest Star" value={selected.brightestStar} />
                <Stat label="Stars" value={selected.starCount} />
                <Stat label="Best Visible" value={selected.bestVisible} />
                <Stat label="Hemisphere" value={selected.hemisphere} />
              </div>
            </div>

            <div className="px-6 pb-4">
              <p className="text-sm text-slate-400 leading-relaxed">{selected.description}</p>
            </div>

            <div className="px-6 pb-6">
              <h4 className="text-sm font-medium text-slate-300 mb-2">Did you know?</h4>
              <ul className="space-y-2">
                {selected.facts.map((fact, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <span className="text-sky-400 mt-1 shrink-0">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
