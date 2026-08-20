import { useMemo } from 'react';

type Cloud = {
  y: number;
  scale: number;
  duration: number;
  delay: number;
  opacity: number;
  direction: 'left' | 'right';
};

function generateClouds(count: number, seed: number): Cloud[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    y: 5 + rand() * 70,
    scale: 0.6 + rand() * 0.8,
    duration: 30 + rand() * 40,
    delay: -(rand() * 70),
    opacity: 0.3 + rand() * 0.4,
    direction: rand() > 0.5 ? 'left' : 'right',
  }));
}

function generateBirds(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    y: 10 + rand() * 50,
    duration: 18 + rand() * 12,
    delay: -(rand() * 30),
    size: 12 + rand() * 8,
    direction: rand() > 0.5 ? 'left' : 'right',
  }));
}

export function CloudShape({ scale = 1 }: { scale?: number }) {
  const w = 120 * scale;
  const h = 50 * scale;
  return (
    <div className="relative" style={{ width: `${w}px`, height: `${h}px` }}>
      <div
        className="absolute rounded-full bg-white"
        style={{ width: `${h * 1.2}px`, height: `${h * 1.2}px`, top: '0', left: '15%' }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{ width: `${h * 1.6}px`, height: `${h * 1.6}px`, top: `${-h * 0.2}px`, left: '30%' }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{ width: `${h}px`, height: `${h}px`, top: `${h * 0.1}px`, left: '55%' }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{ width: `${h * 1.3}px`, height: `${h * 0.9}px`, bottom: '0', left: '20%', right: '10%' }}
      />
    </div>
  );
}

export function Bird({ size, direction }: { size: number; direction: 'left' | 'right' }) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 40 16"
      style={{ transform: direction === 'right' ? 'scaleX(-1)' : 'none' }}
    >
      <path
        d="M 2 10 Q 8 2 14 10 Q 20 2 26 10"
        fill="none"
        stroke="rgba(30,41,59,0.5)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values="M 2 10 Q 8 2 14 10 Q 20 2 26 10; M 2 8 Q 8 14 14 8 Q 20 14 26 8; M 2 10 Q 8 2 14 10 Q 20 2 26 10"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default function SkyBackground() {
  const clouds = useMemo(() => generateClouds(12, 42), []);
  const birds = useMemo(() => generateBirds(5, 99), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #0c4a6e 0%, #0369a1 15%, #0284c7 35%, #38bdf8 60%, #7dd3fc 80%, #bae6fd 100%)',
        }}
      />

      {/* Sun glow */}
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '12%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254,240,138,0.6) 0%, rgba(254,240,138,0.15) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '14%',
          right: '16%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fef9c3 0%, #fde047 50%, rgba(253,224,71,0.3) 100%)',
          boxShadow: '0 0 60px rgba(253,224,71,0.4)',
        }}
      />

      {/* Clouds */}
      {clouds.map((c, i) => (
        <div
          key={`cloud-${i}`}
          className="absolute"
          style={{
            top: `${c.y}%`,
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

      {/* Birds */}
      {birds.map((b, i) => (
        <div
          key={`bird-${i}`}
          className="absolute"
          style={{
            top: `${b.y}%`,
            left: '0',
            animation: `cloud-drift-${b.direction} ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          <div style={{ animation: 'bird-bob 3s ease-in-out infinite alternate' }}>
            <Bird size={b.size} direction={b.direction} />
          </div>
        </div>
      ))}

      {/* Distant mountains */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '25%' }}
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 300 L 0 200 L 150 120 L 280 180 L 400 80 L 550 160 L 700 100 L 850 180 L 1000 130 L 1200 200 L 1200 300 Z"
          fill="#1e293b"
          opacity="0.6"
        />
        <path
          d="M 0 300 L 0 250 L 100 200 L 250 230 L 380 180 L 500 220 L 650 190 L 800 240 L 950 200 L 1100 250 L 1200 220 L 1200 300 Z"
          fill="#0f172a"
          opacity="0.8"
        />
      </svg>

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '40px',
          background: 'linear-gradient(to bottom, #15803d, #166534)',
        }}
      />
    </div>
  );
}
