import { useState, useRef, useEffect } from 'react';
import { X, MapPin, Building2 } from 'lucide-react';
import { CloudShape, Bird } from '@/components/Sky';
import UFO from '@/components/UFO';

type Landmark = {
  id: string;
  name: string;
  year: string;
  height: string;
  description: string;
  facts: string[];
};

const LANDMARKS: Record<string, Landmark> = {
  esb: {
    id: 'esb',
    name: 'Empire State Building',
    year: '1931',
    height: '1,454 ft (with antenna)',
    description:
      'An Art Deco icon of the New York skyline, the Empire State Building was the tallest building in the world for nearly 40 years. Its spire changes color for holidays and events.',
    facts: [
      'Tallest building in the world from 1931 to 1970',
      'Has its own ZIP code: 10118',
      'Lightning strikes the antenna about 25 times per year',
      'The lobby is a designated landmark, restored to its original Art Deco glory',
    ],
  },
  chrysler: {
    id: 'chrysler',
    name: 'Chrysler Building',
    year: '1930',
    height: '1,046 ft',
    description:
      'A masterpiece of Art Deco architecture with a distinctive stainless-steel crown. The Chrysler Building was briefly the tallest building in the world before the Empire State Building surpassed it.',
    facts: [
      'Built for the Chrysler automobile corporation',
      'The stainless-steel crown has triangular windows',
      'Gargoyles shaped like Chrysler eagle hood ornaments adorn the 61st floor',
      'Secretly raised its spire in a surprise move to beat 40 Wall Street',
    ],
  },
  wtc: {
    id: 'wtc',
    name: 'One World Trade Center',
    year: '2014',
    height: '1,776 ft',
    description:
      'The tallest building in the Western Hemisphere, built on the site of the original Twin Towers. Its height of 1,776 feet is a deliberate reference to the year of American independence.',
    facts: [
      'Tallest building in the Western Hemisphere',
      'Height of 1,776 ft references the Declaration of Independence',
      'The glass facade tapers as it rises, creating a kaleidoscopic effect',
      'The observatory is on the 100th–102nd floor',
    ],
  },
  flatiron: {
    id: 'flatiron',
    name: 'Flatiron Building',
    year: '1902',
    height: '285 ft',
    description:
      'One of New York\'s most photographed buildings, the Flatiron\'s triangular wedge shape was dictated by the intersection of Broadway and Fifth Avenue. Its unusual form created a wind tunnel effect on the street.',
    facts: [
      'Originally called the Fuller Building',
      'One of the first buildings to use a steel skeleton',
      'The wedge shape comes from the angle of Broadway',
      'Street-level winds once made it famous for lifting skirts — police assigned officers to the corner',
    ],
  },
  rock: {
    id: 'rock',
    name: 'Rockefeller Center',
    year: '1939',
    height: '850 ft (complex)',
    description:
      'A 19-building Art Deco complex in the heart of Midtown. Home to NBC Studios, the famous ice skating rink, and the annual Rockefeller Center Christmas Tree.',
    facts: [
      '19 commercial buildings covering 22 acres',
      'The famous Christmas tree has been a tradition since 1931',
      'Top of the Rock observation deck offers views of the Empire State Building',
      'Built by the Rockefeller family during the Great Depression',
    ],
  },
  bank: {
    id: 'bank',
    name: '40 Wall Street',
    year: '1930',
    height: '927 ft',
    description:
      'Also known as the Trump Building, this Manhattan skyscraper was briefly the tallest building in the world — until the Chrysler Building secretly raised its spire to win the title.',
    facts: [
      'Briefly the tallest building in the world in 1930',
      'Lost the title to the Chrysler Building within weeks',
      'A pyramid crown tops the tower',
      'Located in the heart of the Financial District',
    ],
  },
};

type Building = {
  id: string;
  landmark: string;
  x: number;
  width: number;
  height: number;
  color: string;
  windowColor: string;
  style: 'esb' | 'chrysler' | 'wtc' | 'flatiron' | 'rock' | 'bank' | 'generic';
};

const BUILDINGS: Building[] = [
  { id: 'b1', landmark: 'bank', x: 2, width: 90, height: 300, color: '#4b5563', windowColor: '#fcd34d', style: 'bank' },
  { id: 'b2', landmark: '', x: 10, width: 100, height: 220, color: '#374151', windowColor: '#fde68a', style: 'generic' },
  { id: 'b3', landmark: 'flatiron', x: 18, width: 85, height: 190, color: '#6b7280', windowColor: '#fef3c7', style: 'flatiron' },
  { id: 'b4', landmark: '', x: 26, width: 95, height: 260, color: '#4b5563', windowColor: '#fcd34d', style: 'generic' },
  { id: 'b5', landmark: 'chrysler', x: 34, width: 100, height: 370, color: '#52525b', windowColor: '#fde68a', style: 'chrysler' },
  { id: 'b6', landmark: '', x: 42, width: 88, height: 240, color: '#3f3f46', windowColor: '#fef3c7', style: 'generic' },
  { id: 'b7', landmark: 'esb', x: 50, width: 95, height: 440, color: '#6b7280', windowColor: '#fcd34d', style: 'esb' },
  { id: 'b8', landmark: '', x: 58, width: 90, height: 280, color: '#4b5563', windowColor: '#fde68a', style: 'generic' },
  { id: 'b9', landmark: 'rock', x: 66, width: 105, height: 320, color: '#52525b', windowColor: '#fef3c7', style: 'rock' },
  { id: 'b10', landmark: '', x: 75, width: 82, height: 230, color: '#3f3f46', windowColor: '#fcd34d', style: 'generic' },
  { id: 'b11', landmark: 'wtc', x: 83, width: 100, height: 500, color: '#64748b', windowColor: '#dbeafe', style: 'wtc' },
  { id: 'b12', landmark: '', x: 92, width: 92, height: 250, color: '#4b5563', windowColor: '#fde68a', style: 'generic' },
];

function BuildingShape({
  building,
  onHover,
  onLeave,
  onClick,
  isHovered,
}: {
  building: Building;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
}) {
  const { x, width, height, color, windowColor, style, landmark } = building;
  const isInteractive = !!landmark;

  return (
    <div
      className={`absolute bottom-0 ${isInteractive ? 'cursor-pointer' : ''}`}
      style={{
        left: `${x}%`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `translateX(-50%)`,
        transition: 'transform 0.3s ease, filter 0.3s ease',
        filter: isHovered && isInteractive ? 'brightness(1.25)' : 'none',
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={isInteractive ? onClick : undefined}
    >
      {/* Building body */}
      <div
        className="absolute bottom-0 w-full"
        style={{
          height: '100%',
          background: `linear-gradient(to right, ${color}, ${color}dd)`,
          borderRadius: style === 'wtc' ? '4px 4px 0 0' : '0',
          transform: isHovered && isInteractive ? 'translateY(-6px)' : 'none',
        }}
      >
        {/* Windows */}
        <Windows width={width} height={height} windowColor={windowColor} style={style} isLit={isHovered} />

        {/* Style-specific crowns */}
        {style === 'esb' && <ESBCrown width={width} />}
        {style === 'chrysler' && <ChryslerCrown width={width} />}
        {style === 'wtc' && <WTCCrown width={width} />}
        {style === 'flatiron' && <FlatironTop width={width} />}
        {style === 'rock' && <RockCrown width={width} />}
        {style === 'bank' && <BankCrown width={width} />}
      </div>

      {/* Hover label */}
      {isHovered && isInteractive && (
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs font-medium text-amber-200 border border-amber-500/30"
          style={{ bottom: `${height + 12}px`, pointerEvents: 'none' }}
        >
          {LANDMARKS[landmark].name}
        </div>
      )}
    </div>
  );
}

function Windows({
  width,
  height,
  windowColor,
  style,
  isLit,
}: {
  width: number;
  height: number;
  windowColor: string;
  style: string;
  isLit: boolean;
}) {
  const cols = Math.max(2, Math.floor(width / 12));
  const rows = Math.max(3, Math.floor(height / 14));
  const windowW = 5;
  const windowH = 7;
  const gapX = (width - cols * windowW) / (cols + 1);
  const gapY = 10;

  const windows: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Pseudo-random lit pattern based on position
      const seed = (r * 7 + c * 13 + r * c) % 10;
      const lit = seed < 6;
      const left = gapX + c * (windowW + gapX);
      const top = gapY + r * (windowH + gapY);
      if (top + windowH > height - 10) break;
      windows.push(
        <div
          key={`w-${r}-${c}`}
          className="absolute rounded-sm"
          style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${windowW}px`,
            height: `${windowH}px`,
            background: lit ? windowColor : 'rgba(0,0,0,0.25)',
            opacity: lit ? (isLit ? 0.95 : 0.7) : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />,
      );
    }
  }
  return <>{windows}</>;
}

function ESBCrown({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-50px' }}>
      {/* Mooring mast / antenna */}
      <div className="mx-auto" style={{ width: '6px', height: '50px', background: 'linear-gradient(to bottom, #d1d5db, #6b7280)' }} />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '30px', width: `${width * 0.5}px`, height: '20px', background: '#6b7280', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
    </div>
  );
}

function ChryslerCrown({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/22" style={{ top: '-40px', width: `${width * 0.7}px` }}>
      {/* Stacked arches - Art Deco crown */}
      <div style={{ width: '100%', height: '14px', background: '#71717a', borderRadius: '7px 7px 0 0' }} />
      <div className="mx-auto" style={{ width: '80%', height: '12px', background: '#a1a1aa', borderRadius: '6px 6px 0 0' }} />
      <div className="mx-auto" style={{ width: '60%', height: '10px', background: '#d4d4d8', borderRadius: '5px 5px 0 0' }} />
      <div className="mx-auto" style={{ width: '40%', height: '8px', background: '#e4e4e7', borderRadius: '4px 4px 0 0' }} />
      {/* Spire */}
      <div className="mx-auto" style={{ width: '3px', height: '24px', background: '#d4d4d8' }} />
    </div>
  );
}

function WTCCrown({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-30px' }}>
      {/* Tapered glass top */}
      <div style={{ width: `${width * 0.8}px`, height: '20px', background: 'linear-gradient(to bottom, #cbd5e1, #64748b)', clipPath: 'polygon(20% 100%, 80% 100%, 65% 0, 35% 0)' }} />
      {/* Antenna spire */}
      <div className="mx-auto" style={{ width: '4px', height: '30px', background: 'linear-gradient(to bottom, #e2e8f0, #94a3b8)' }} />
    </div>
  );
}

function FlatironTop({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-16px' }}>
      <div style={{ width: `${width * 0.7}px`, height: '16px', background: '#9ca3af', borderRadius: '3px 3px 0 0' }} />
      <div className="mx-auto" style={{ width: '3px', height: '14px', background: '#9ca3af' }} />
    </div>
  );
}

function RockCrown({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-20px' }}>
      <div style={{ width: `${width * 0.85}px`, height: '20px', background: '#71717a', clipPath: 'polygon(0 100%, 100% 100%, 85% 0, 15% 0)' }} />
    </div>
  );
}

function BankCrown({ width }: { width: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-24px' }}>
      <div style={{ width: `${width * 0.6}px`, height: '18px', background: '#6b7280', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
      <div className="mx-auto" style={{ width: '3px', height: '8px', background: '#9ca3af' }} />
    </div>
  );
}

export default function NYCStreet() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [beaming, setBeaming] = useState(false);
  const [ufoX, setUfoX] = useState(-200);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const selected = selectedId ? LANDMARKS[selectedId] : null;

  useEffect(() => {
    if (beaming) {
      lastTimeRef.current = 0;
      return;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const speed = (window.innerWidth + 400) / 25;
      setUfoX((prev) => {
        const next = prev + speed * delta;
        if (next > window.innerWidth + 200) return -200;
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [beaming]);

  const handleUFOClick = () => {
    if (beaming) return;
    setBeaming(true);
    setTimeout(() => setBeaming(false), 3000);
  };

  return (
    <section className="relative w-full">
      {/* Full-screen street scene */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', background: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(12,74,110,0.3) 40%, rgba(3,105,161,0.5) 55%, rgba(2,132,199,0.65) 70%, rgba(56,189,248,0.5) 85%, rgba(125,211,252,0.4) 100%)' }}
      >
        {/* Title overlay */}
        <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-16 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-4">
            <Building2 className="w-3.5 h-3.5" />
            The City Streets
          </div>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-amber-100 drop-shadow-lg">
            New York, New York
          </h2>
          <p className="mt-4 text-lg text-amber-200/70 leading-relaxed max-w-lg mx-auto text-center drop-shadow">
            Descending from the sky to the streets below. Hover over the skyline to discover the landmarks that define the city.
          </p>
        </div>

        {/* Atmospheric haze */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '60%', background: 'linear-gradient(to bottom, transparent, rgba(30,58,95,0.4) 60%, rgba(15,23,42,0.5))' }} />

        {/* Drifting clouds bridging from the sky above */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '40%' }}>
          {[
            { top: '8%', scale: 1.1, duration: 80, delay: 0, opacity: 0.5, direction: 'right' as const },
            { top: '18%', scale: 0.8, duration: 100, delay: 20, opacity: 0.4, direction: 'left' as const },
            { top: '5%', scale: 0.9, duration: 90, delay: 45, opacity: 0.35, direction: 'right' as const },
            { top: '25%', scale: 1.0, duration: 110, delay: 10, opacity: 0.3, direction: 'left' as const },
          ].map((c, i) => (
            <div
              key={`street-cloud-${i}`}
              className="absolute"
              style={{
                top: `${c.top}%`,
                left: '0',
                opacity: c.opacity,
                animation: `cloud-drift-${c.direction} ${c.duration}s linear ${c.delay}s infinite`,
              }}
            >
              <div style={{ transform: `scale(${c.scale})` }}>
                <CloudShape scale={1} />
              </div>
            </div>
          ))}
        </div>

        {/* Small birds flying across for continuity with the sky above */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '35%' }}>
          {[
            { top: '12%', size: 14, duration: 30, delay: 2, direction: 'right' as const },
            { top: '22%', size: 11, duration: 35, delay: 12, direction: 'left' as const },
            { top: '8%', size: 13, duration: 28, delay: 18, direction: 'right' as const },
          ].map((b, i) => (
            <div
              key={`street-bird-${i}`}
              className="absolute"
              style={{
                top: `${b.top}%`,
                left: '0',
                animation: `cloud-drift-${b.direction} ${b.duration}s linear ${b.delay}s infinite`,
              }}
            >
              <div style={{ animation: 'bird-bob 3s ease-in-out infinite alternate' }}>
                <Bird size={b.size} direction={b.direction} />
              </div>
            </div>
          ))}
        </div>

        {/* UFO fly-by above the buildings - click to send down a beam */}
        <div
          className="absolute"
          style={{
            top: '30%',
            left: `${ufoX}px`,
            pointerEvents: 'auto',
            cursor: beaming ? 'default' : 'pointer',
            zIndex: 25,
          }}
          onClick={handleUFOClick}
          title={beaming ? undefined : 'Click the UFO!'}
        >
          <div style={{ animation: beaming ? 'none' : 'ufo-bob 2.5s ease-in-out infinite alternate' }}>
            <UFO />
          </div>
          {/* Light beam - extends down to the ground */}
          {beaming && (
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: '48px',
                width: '60px',
                height: '50vh',
                background: 'linear-gradient(to bottom, rgba(253,224,71,0.45) 0%, rgba(253,224,71,0.25) 50%, rgba(253,224,71,0.05) 100%)',
                clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0% 100%)',
                animation: 'ufo-beam-in 0.4s ease-out forwards',
                pointerEvents: 'none',
              }}
            />
          )}
          {/* Swirling particles in the beam */}
          {beaming && (
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '48px', width: '60px', height: '50vh', pointerEvents: 'none' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={`beam-particle-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#fef9c3',
                    boxShadow: '0 0 6px #fde047',
                    animation: `beam-particle 1.2s linear ${i * 0.24}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Distant skyline layer (smaller, paler) */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: '55%', opacity: 0.4 }}>
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path
              d="M 0 300 L 0 220 L 40 200 L 80 230 L 120 190 L 160 210 L 200 170 L 240 200 L 280 180 L 320 150 L 360 190 L 400 160 L 440 200 L 480 140 L 520 180 L 560 160 L 600 130 L 640 170 L 680 150 L 720 190 L 760 160 L 800 140 L 840 180 L 880 150 L 920 190 L 960 160 L 1000 200 L 1040 170 L 1080 210 L 1120 180 L 1160 220 L 1200 200 L 1200 300 Z"
              fill="#1e293b"
            />
          </svg>
        </div>

        {/* Mid-distance buildings */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: '65%', opacity: 0.6 }}>
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path
              d="M 0 300 L 0 180 L 60 160 L 120 200 L 180 140 L 240 170 L 300 130 L 360 160 L 420 110 L 480 150 L 540 120 L 600 90 L 660 130 L 720 100 L 780 140 L 840 110 L 900 150 L 960 120 L 1020 160 L 1080 130 L 1140 170 L 1200 150 L 1200 300 Z"
              fill="#0f172a"
            />
          </svg>
        </div>

        {/* Main skyline - interactive buildings */}
        <div className="absolute inset-0">
          {BUILDINGS.map((b) => (
            <BuildingShape
              key={b.id}
              building={b}
              isHovered={hoveredId === b.id}
              onHover={() => setHoveredId(b.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => b.landmark && setSelectedId(b.landmark)}
            />
          ))}
        </div>

        {/* Ground / street level */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '120px', background: 'linear-gradient(to bottom, #334155, #1e293b)' }}>
          {/* Street line */}
          <div className="absolute top-0 left-0 right-0" style={{ height: '2px', background: '#475569' }} />
          {/* Sidewalk texture */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 42px)' }} />
          {/* Street lamps */}
          {[10, 28, 46, 64, 82].map((lx) => (
            <div key={`lamp-${lx}`} className="absolute" style={{ left: `${lx}%`, bottom: '80px' }}>
              <div style={{ width: '3px', height: '36px', background: '#475569' }} />
              <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-14px', width: '12px', height: '12px', borderRadius: '50%', background: '#fde68a', boxShadow: '0 0 16px 6px rgba(253,230,138,0.4)' }} />
            </div>
          ))}
          {/* Road */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '50px', background: '#1e293b' }}>
            {/* Lane markings */}
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, #fbbf24 30px, #fbbf24 50px)' }} />
          </div>
        </div>

        {/* Subtle traffic */}
        <div className="absolute bottom-12 left-0 w-full overflow-hidden pointer-events-none" style={{ height: '20px' }}>
          <div className="absolute" style={{ animation: 'swim-right 18s linear infinite', bottom: '0' }}>
            <div style={{ width: '28px', height: '10px', background: '#ef4444', borderRadius: '3px 8px 8px 3px', boxShadow: '0 0 12px rgba(239,68,68,0.5)' }} />
          </div>
          <div className="absolute" style={{ animation: 'swim-left 22s linear 5s infinite', bottom: '0' }}>
            <div style={{ width: '28px', height: '10px', background: '#fbbf24', borderRadius: '8px 3px 3px 8px', boxShadow: '0 0 12px rgba(251,191,36,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
          <div
            className="relative max-w-lg w-full rounded-2xl border border-amber-500/30 bg-slate-900/95 p-6 shadow-2xl"
            style={{ animation: 'submarine-panel-in 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-100">{selected.name}</h3>
                <p className="text-sm text-amber-300/60 mt-0.5">
                  Completed {selected.year} &middot; {selected.height}
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">{selected.description}</p>
            <div className="space-y-2">
              {selected.facts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-amber-400 mt-1 flex-shrink-0">&bull;</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
