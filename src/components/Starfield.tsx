import { useMemo } from 'react';

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
};

type Nebula = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
};

function generateStars(count: number, seed: number): Star[] {
  const stars: Star[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    const sizeRoll = rand();
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      size: sizeRoll < 0.7 ? 1 : sizeRoll < 0.92 ? 2 : 3,
      opacity: 0.3 + rand() * 0.7,
      twinkleDuration: 2 + rand() * 4,
      twinkleDelay: rand() * 5,
    });
  }
  return stars;
}

function generateNebulae(seed: number): Nebula[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const colors = [
    'rgba(56,189,248,0.06)',
    'rgba(16,185,129,0.05)',
    'rgba(168,85,247,0.04)',
    'rgba(244,114,182,0.03)',
  ];
  const nebulae: Nebula[] = [];
  for (let i = 0; i < 4; i++) {
    nebulae.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 300 + rand() * 400,
      color: colors[i],
      opacity: 0.5 + rand() * 0.5,
    });
  }
  return nebulae;
}

export default function Starfield() {
  const stars = useMemo(() => generateStars(200, 42), []);
  const brightStars = useMemo(() => generateStars(30, 99), []);
  const nebulae = useMemo(() => generateNebulae(7), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #0a0e1a 0%, #060810 60%, #020308 100%)',
        }}
      />

      {/* Nebula clouds */}
      {nebulae.map((n, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: `${n.size}px`,
            height: `${n.size}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${n.color}, transparent 70%)`,
            opacity: n.opacity,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Background stars */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate`,
          }}
        />
      ))}

      {/* Brighter stars with glow */}
      {brightStars.map((star, i) => (
        <div
          key={`bright-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size + 1}px`,
            height: `${star.size + 1}px`,
            opacity: star.opacity,
            boxShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(200,220,255,0.4)',
            animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
