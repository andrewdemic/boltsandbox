import { useMemo } from 'react';

type Fish = {
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  finColor: string;
  direction: 'left' | 'right';
  bobDuration: number;
};

const FISH_COLORS: { body: string; fin: string }[] = [
  { body: '#f59e0b', fin: '#d97706' },
  { body: '#ef4444', fin: '#b91c1c' },
  { body: '#3b82f6', fin: '#1d4ed8' },
  { body: '#10b981', fin: '#047857' },
  { body: '#ec4899', fin: '#be185d' },
  { body: '#eab308', fin: '#a16207' },
  { body: '#06b6d4', fin: '#0e7490' },
  { body: '#f97316', fin: '#c2410c' },
];

function generateFish(count: number, seed: number): Fish[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => {
    const palette = FISH_COLORS[Math.floor(rand() * FISH_COLORS.length)];
    return {
      y: 8 + rand() * 84,
      size: 18 + rand() * 28,
      duration: 12 + rand() * 16,
      delay: -(rand() * 28),
      color: palette.body,
      finColor: palette.fin,
      direction: rand() > 0.5 ? 'left' : 'right',
      bobDuration: 2 + rand() * 2,
    };
  });
}

function generateBubbles(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    size: 3 + rand() * 8,
    duration: 6 + rand() * 8,
    delay: rand() * 10,
    opacity: 0.1 + rand() * 0.2,
  }));
}

function FishShape({ fish }: { fish: Fish }) {
  const s = fish.size;
  return (
    <div
      className="relative"
      style={{
        width: `${s * 1.6}px`,
        height: `${s}px`,
        transform: fish.direction === 'right' ? 'scaleX(-1)' : 'none',
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: `${s * 1.2}px`,
          height: `${s * 0.7}px`,
          top: '15%',
          left: '0',
          background: `radial-gradient(circle at 30% 30%, ${fish.color}, ${fish.finColor})`,
          boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.2), 0 0 6px ${fish.color}40`,
        }}
      />
      <div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          top: '20%',
          right: '0',
          borderTop: `${s * 0.35}px solid transparent`,
          borderBottom: `${s * 0.35}px solid transparent`,
          borderLeft: `${s * 0.4}px solid ${fish.finColor}`,
          filter: 'drop-shadow(-1px 0 1px rgba(0,0,0,0.15))',
        }}
      />
      <div
        className="absolute rounded-t-full"
        style={{
          width: `${s * 0.35}px`,
          height: `${s * 0.3}px`,
          top: '0%',
          left: '35%',
          background: `linear-gradient(to bottom, ${fish.finColor}, ${fish.color})`,
        }}
      />
      <div
        className="absolute rounded-full bg-slate-900"
        style={{
          width: `${Math.max(2, s * 0.08)}px`,
          height: `${Math.max(2, s * 0.08)}px`,
          top: '35%',
          left: '12%',
        }}
      >
        <div
          className="absolute rounded-full bg-white"
          style={{ width: '40%', height: '40%', top: '15%', left: '15%' }}
        />
      </div>
    </div>
  );
}

export default function OceanBackground() {
  const fish = useMemo(() => generateFish(14, 13), []);
  const bubbles = useMemo(() => generateBubbles(30, 77), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Ocean gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0a1628 0%, #0c2a4a 15%, #0d3a5e 35%, #0e4a6e 60%, #0f5a7a 85%, #0e6885 100%)',
        }}
      />

      {/* Light rays from above */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(95deg, transparent, transparent 80px, rgba(180,220,255,0.04) 80px, rgba(180,220,255,0.04) 120px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 50%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 50%)',
        }}
      />

      {/* Caustic shimmer at top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '40%',
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(180,220,255,0.08), transparent 60%), radial-gradient(ellipse at 70% 0%, rgba(180,220,255,0.06), transparent 50%)',
        }}
      />

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            bottom: '0',
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: 'rgba(200,230,255,0.3)',
            border: '1px solid rgba(200,230,255,0.2)',
            opacity: b.opacity,
            animation: `bubble-rise ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        />
      ))}

      {/* Fish */}
      {fish.map((f, i) => (
        <div
          key={`fish-${i}`}
          className="absolute"
          style={{
            top: `${f.y}%`,
            left: '0',
            animation: `swim-${f.direction} ${f.duration}s linear ${f.delay}s infinite`,
          }}
        >
          <div style={{ animation: `fish-bob ${f.bobDuration}s ease-in-out infinite alternate` }}>
            <FishShape fish={f} />
          </div>
        </div>
      ))}

      {/* Seaweed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around pointer-events-none" style={{ height: '120px' }}>
        {[...Array(10)].map((_, i) => (
          <div
            key={`seaweed-${i}`}
            className="rounded-t-full"
            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${40 + (i % 4) * 25}px`,
              background: 'linear-gradient(to top, #064e3b, #047857 60%, #059669)',
              opacity: 0.7,
              transformOrigin: 'bottom center',
              animation: `sway ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Sandy bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '30px',
          background: 'linear-gradient(to bottom, transparent, #1c1917 40%, #292524)',
        }}
      />
    </div>
  );
}
