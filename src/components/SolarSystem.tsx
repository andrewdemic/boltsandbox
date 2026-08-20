import { useState } from 'react';
import { X } from 'lucide-react';

type Planet = {
  id: string;
  name: string;
  size: number;
  orbit: number;
  duration: number;
  facts: string[];
  type: string;
  moons: number;
  distance: string;
  diameter: string;
  dayLength: string;
  yearLength: string;
  temp: string;
  hasRings?: boolean;
  hasMoon?: boolean;
};

const PLANETS: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    size: 18,
    orbit: 90,
    duration: 8,
    type: 'Terrestrial planet',
    moons: 0,
    distance: '57.9 million km',
    diameter: '4,879 km',
    dayLength: '59 Earth days',
    yearLength: '88 Earth days',
    temp: '-173°C to 427°C',
    facts: [
      'The smallest planet in our solar system',
      'Has no atmosphere to retain heat',
      'Its surface is covered in craters, like our Moon',
      'A day on Mercury is longer than its year',
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    size: 28,
    orbit: 135,
    duration: 14,
    type: 'Terrestrial planet',
    moons: 0,
    distance: '108.2 million km',
    diameter: '12,104 km',
    dayLength: '243 Earth days',
    yearLength: '225 Earth days',
    temp: '465°C (hottest planet)',
    facts: [
      'The hottest planet despite not being closest to the Sun',
      'Rotates backwards compared to most planets',
      'Its thick atmosphere is mostly carbon dioxide',
      'Surface pressure is 90 times that of Earth',
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    size: 30,
    orbit: 185,
    duration: 20,
    type: 'Terrestrial planet',
    moons: 1,
    distance: '149.6 million km',
    diameter: '12,742 km',
    dayLength: '24 hours',
    yearLength: '365.25 days',
    temp: '-88°C to 58°C',
    hasMoon: true,
    facts: [
      'The only known planet with life',
      '71% of its surface is covered by water',
      'Has a protective magnetic field',
      'Its atmosphere is 78% nitrogen, 21% oxygen',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    size: 24,
    orbit: 235,
    duration: 28,
    type: 'Terrestrial planet',
    moons: 2,
    distance: '227.9 million km',
    diameter: '6,779 km',
    dayLength: '24.6 hours',
    yearLength: '687 Earth days',
    temp: '-87°C to -5°C',
    facts: [
      'Known as the Red Planet due to iron oxide dust',
      'Home to Olympus Mons, the largest volcano in the solar system',
      'Has polar ice caps made of water and dry ice',
      'Its two moons are named Phobos and Deimos',
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    size: 64,
    orbit: 310,
    duration: 40,
    type: 'Gas giant',
    moons: 95,
    distance: '778.5 million km',
    diameter: '139,820 km',
    dayLength: '9.9 hours',
    yearLength: '11.9 Earth years',
    temp: '-145°C',
    facts: [
      'The largest planet in our solar system',
      'The Great Red Spot is a storm that has raged for centuries',
      'Could fit over 1,300 Earths inside it',
      'Has the shortest day of all planets',
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    size: 54,
    orbit: 390,
    duration: 55,
    type: 'Gas giant',
    moons: 146,
    distance: '1.43 billion km',
    diameter: '116,460 km',
    dayLength: '10.7 hours',
    yearLength: '29.5 Earth years',
    temp: '-178°C',
    hasRings: true,
    facts: [
      'Famous for its spectacular ring system',
      'Its rings are made of ice and rock particles',
      'Is less dense than water — it would float',
      'Has the most moons of any planet',
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    size: 38,
    orbit: 455,
    duration: 70,
    type: 'Ice giant',
    moons: 27,
    distance: '2.87 billion km',
    diameter: '50,724 km',
    dayLength: '17.2 hours',
    yearLength: '84 Earth years',
    temp: '-224°C',
    hasRings: true,
    facts: [
      'Rotates on its side, at a 98° tilt',
      'The coldest planet in the solar system',
      'Its blue-green color comes from methane in its atmosphere',
      'Has 13 known rings',
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    size: 36,
    orbit: 515,
    duration: 85,
    type: 'Ice giant',
    moons: 14,
    distance: '4.5 billion km',
    diameter: '49,244 km',
    dayLength: '16.1 hours',
    yearLength: '165 Earth years',
    temp: '-214°C',
    facts: [
      'The windiest planet, with winds up to 2,100 km/h',
      'Discovered through mathematical predictions',
      'Its largest moon, Triton, orbits backwards',
      'One Neptune year equals 165 Earth years',
    ],
  },
];

function Crater({ size, top, left, opacity }: { size: string; top: string; left: string; opacity: number }) {
  return (
    <div className="absolute rounded-full" style={{
      width: size, height: size, top, left,
      background: `radial-gradient(circle, rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity * 0.3}) 60%, transparent 80%)`,
    }}>
      <div className="absolute rounded-full" style={{
        inset: '15%',
        background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,${opacity * 0.15}), transparent 60%)`,
      }} />
    </div>
  );
}

function PlanetSphere({ planet }: { planet: Planet }) {
  const s = planet.size;
  const highlight = `inset ${Math.max(1, s * 0.06)}px ${Math.max(1, s * 0.06)}px ${Math.max(2, s * 0.12)}px rgba(255,255,255,0.12)`;
  const shadow = `inset -${Math.max(2, s * 0.12)}px -${Math.max(2, s * 0.12)}px ${Math.max(4, s * 0.25)}px rgba(0,0,0,0.55)`;

  switch (planet.id) {
    case 'mercury':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #c4bcb0, #9a9088 35%, #6a6058 65%, #4a4238 90%)',
            boxShadow: `${shadow}, ${highlight}, 0 0 12px rgba(180,170,160,0.3)`,
          }}
        >
          <Crater size="22%" top="18%" left="52%" opacity={0.28} />
          <Crater size="16%" top="52%" left="22%" opacity={0.22} />
          <Crater size="14%" top="38%" left="12%" opacity={0.25} />
          <Crater size="11%" top="68%" left="58%" opacity={0.18} />
          <Crater size="9%" top="30%" left="68%" opacity={0.15} />
          <Crater size="8%" top="78%" left="35%" opacity={0.2} />
          <Crater size="7%" top="12%" left="30%" opacity={0.16} />
          <div className="absolute rounded-full" style={{ width: '18%', height: '6%', top: '45%', left: '40%', background: 'rgba(200,190,180,0.12)', filter: 'blur(1px)' }} />
        </div>
      );

    case 'venus':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #fae0a8, #ecb868 35%, #d08838 65%, #a85818 90%)',
            boxShadow: `${shadow}, 0 0 18px rgba(240,180,80,0.45)`,
          }}
        >
          {/* Thick cloud bands */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(12deg, transparent, transparent 2px, rgba(255,240,200,0.18) 2px, rgba(255,240,200,0.18) 4px)',
          }} />
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(-8deg, transparent, transparent 5px, rgba(200,140,60,0.12) 5px, rgba(200,140,60,0.12) 7px)',
          }} />
          {/* Swirling cloud formations */}
          <div className="absolute rounded-full" style={{ width: '45%', height: '14%', top: '25%', left: '15%', background: 'rgba(255,230,170,0.25)', filter: 'blur(2px)' }} />
          <div className="absolute rounded-full" style={{ width: '38%', height: '12%', top: '55%', left: '35%', background: 'rgba(255,220,150,0.2)', filter: 'blur(2px)' }} />
          <div className="absolute rounded-full" style={{ width: '30%', height: '10%', top: '42%', left: '55%', background: 'rgba(240,200,130,0.15)', filter: 'blur(2px)' }} />
          {/* Atmospheric rim glow */}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 8px rgba(255,220,150,0.2)' }} />
        </div>
      );

    case 'earth':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #7ec4f8, #3a8fe0 35%, #1e6fc8 65%, #0a4e98 90%)',
            boxShadow: `${shadow}, 0 0 18px rgba(80,160,240,0.45)`,
          }}
        >
          {/* Continents — North America shape */}
          <div className="absolute rounded-full" style={{ width: '28%', height: '22%', top: '22%', left: '12%', background: 'rgba(34,139,34,0.75)', filter: 'blur(0.5px)' }} />
          {/* South America */}
          <div className="absolute rounded-full" style={{ width: '14%', height: '24%', top: '48%', left: '22%', background: 'rgba(60,140,40,0.7)', filter: 'blur(0.5px)' }} />
          {/* Africa/Europe */}
          <div className="absolute rounded-full" style={{ width: '22%', height: '28%', top: '28%', left: '48%', background: 'rgba(50,130,35,0.7)', filter: 'blur(0.5px)' }} />
          {/* Asia */}
          <div className="absolute rounded-full" style={{ width: '18%', height: '16%', top: '18%', left: '62%', background: 'rgba(45,125,30,0.65)', filter: 'blur(0.5px)' }} />
          {/* Australia */}
          <div className="absolute rounded-full" style={{ width: '10%', height: '8%', top: '68%', left: '60%', background: 'rgba(55,135,40,0.6)', filter: 'blur(0.5px)' }} />
          {/* Polar ice */}
          <div className="absolute rounded-full" style={{ width: '50%', height: '10%', top: '-2%', left: '25%', background: 'rgba(255,255,255,0.5)', filter: 'blur(1px)' }} />
          <div className="absolute rounded-full" style={{ width: '40%', height: '8%', bottom: '-1%', left: '30%', background: 'rgba(255,255,255,0.4)', filter: 'blur(1px)' }} />
          {/* Cloud swirls */}
          <div className="absolute rounded-full" style={{ width: '40%', height: '7%', top: '33%', left: '45%', background: 'rgba(255,255,255,0.3)', filter: 'blur(1.5px)' }} />
          <div className="absolute rounded-full" style={{ width: '30%', height: '5%', top: '62%', left: '12%', background: 'rgba(255,255,255,0.25)', filter: 'blur(1.5px)' }} />
          <div className="absolute rounded-full" style={{ width: '25%', height: '4%', top: '50%', left: '60%', background: 'rgba(255,255,255,0.2)', filter: 'blur(1.5px)' }} />
          {/* Atmospheric rim */}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 6px rgba(150,200,255,0.25)' }} />
        </div>
      );

    case 'mars':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #e8855a, #c8502e 35%, #9a3018 65%, #6a1e0e 90%)',
            boxShadow: `${shadow}, 0 0 14px rgba(210,90,55,0.4)`,
          }}
        >
          {/* Dark surface regions */}
          <div className="absolute rounded-full" style={{ width: '32%', height: '18%', top: '38%', left: '18%', background: 'rgba(80,20,5,0.4)', filter: 'blur(1.5px)' }} />
          <div className="absolute rounded-full" style={{ width: '22%', height: '14%', top: '58%', left: '52%', background: 'rgba(70,15,5,0.35)', filter: 'blur(1.5px)' }} />
          <div className="absolute rounded-full" style={{ width: '16%', height: '10%', top: '28%', left: '60%', background: 'rgba(90,25,8,0.3)', filter: 'blur(1px)' }} />
          {/* Olympus Mons hint */}
          <div className="absolute rounded-full" style={{ width: '10%', height: '8%', top: '45%', left: '45%', background: 'rgba(160,60,30,0.3)', filter: 'blur(0.5px)' }} />
          {/* Valley/canyon line */}
          <div className="absolute rounded-full" style={{ width: '25%', height: '3%', top: '52%', left: '30%', background: 'rgba(100,30,10,0.3)', filter: 'blur(0.5px)' }} />
          {/* Polar ice caps */}
          <div className="absolute rounded-full" style={{ width: '45%', height: '14%', top: '-3%', left: '28%', background: 'rgba(255,255,255,0.65)', filter: 'blur(1px)' }} />
          <div className="absolute rounded-full" style={{ width: '38%', height: '11%', bottom: '-2%', left: '33%', background: 'rgba(255,255,255,0.55)', filter: 'blur(1px)' }} />
          {/* Dust storm hint */}
          <div className="absolute rounded-full" style={{ width: '15%', height: '8%', top: '20%', left: '35%', background: 'rgba(220,140,80,0.15)', filter: 'blur(2px)' }} />
        </div>
      );

    case 'jupiter':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'linear-gradient(to bottom, #d8b090 0%, #c89060 6%, #e0b888 12%, #b87848 18%, #d4a070 24%, #a86838 30%, #d8a870 36%, #c08850 42%, #e0b080 48%, #b87848 54%, #d4a070 60%, #a86838 66%, #d8a870 72%, #c08850 78%, #e0b080 84%, #b87848 90%, #d4a070 100%)',
            boxShadow: `${shadow}, 0 0 22px rgba(220,160,100,0.4)`,
          }}
        >
          {/* Turbulence bands */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(255,230,190,0.1) 4px, rgba(255,230,190,0.1) 6px)',
          }} />
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 9px, rgba(160,90,40,0.08) 9px, rgba(160,90,40,0.08) 11px)',
          }} />
          {/* Great Red Spot — blended into surrounding bands */}
          <div className="absolute rounded-full" style={{
            width: '26%', height: '14%', top: '49%', left: '21%',
            background: 'radial-gradient(ellipse at 45% 40%, rgba(180,70,50,0.55), rgba(150,50,35,0.35) 50%, rgba(120,40,25,0.1) 75%, transparent 90%)',
            filter: 'blur(2px)',
          }} />
          <div className="absolute rounded-full" style={{
            width: '18%', height: '9%', top: '52%', left: '24%',
            background: 'radial-gradient(ellipse at 45% 40%, rgba(200,90,60,0.4), rgba(170,60,40,0.2) 60%, transparent 85%)',
            filter: 'blur(1.5px)',
          }} />
          {/* Small white storms */}
          <div className="absolute rounded-full" style={{ width: '8%', height: '4%', top: '32%', left: '55%', background: 'rgba(255,250,230,0.25)', filter: 'blur(1px)' }} />
          <div className="absolute rounded-full" style={{ width: '6%', height: '3%', top: '70%', left: '60%', background: 'rgba(255,250,230,0.2)', filter: 'blur(1px)' }} />
          {/* Equatorial band emphasis */}
          <div className="absolute inset-x-0 rounded-full" style={{ height: '6%', top: '46%', background: 'rgba(255,220,170,0.08)' }} />
        </div>
      );

    case 'saturn':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'linear-gradient(to bottom, #ecdca8 0%, #d8c480 8%, #f0dca0 16%, #c8ac60 24%, #e8d090 32%, #d4b870 40%, #f0dca0 48%, #c8ac60 56%, #e8d090 64%, #d4b870 72%, #f0dca0 80%, #d4be7c 88%, #e8d498 100%)',
            boxShadow: `${shadow}, 0 0 18px rgba(230,200,130,0.4)`,
          }}
        >
          {/* Fine band striations */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(255,240,200,0.12) 3px, rgba(255,240,200,0.12) 5px)',
          }} />
          {/* Subtle storm zones */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(180,150,80,0.06) 10px, rgba(180,150,80,0.06) 12px)',
          }} />
          {/* Light zone highlight */}
          <div className="absolute inset-x-0 rounded-full" style={{ height: '8%', top: '38%', background: 'rgba(255,245,210,0.1)' }} />
          {/* Polar hexagon hint */}
          <div className="absolute rounded-full" style={{ width: '25%', height: '8%', top: '5%', left: '37%', background: 'rgba(200,180,120,0.12)', filter: 'blur(1px)' }} />
        </div>
      );

    case 'uranus':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #b8f0e8, #7cd8d0 35%, #4ca8a0 65%, #2a8880 90%)',
            boxShadow: `${shadow}, 0 0 16px rgba(120,220,210,0.4)`,
          }}
        >
          {/* Vertical bands (Uranus is tilted) */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(200,255,250,0.1) 5px, rgba(200,255,250,0.1) 7px)',
          }} />
          {/* Subtle methane haze layers */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(100,200,200,0.06) 12px, rgba(100,200,200,0.06) 14px)',
          }} />
          {/* Polar lightening */}
          <div className="absolute rounded-full" style={{ width: '30%', height: '20%', top: '10%', left: '35%', background: 'rgba(200,255,250,0.12)', filter: 'blur(2px)' }} />
          {/* Atmospheric rim */}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 6px rgba(180,240,235,0.2)' }} />
        </div>
      );

    case 'neptune':
      return (
        <div
          className="rounded-full relative overflow-hidden"
          style={{
            width: s, height: s,
            background: 'radial-gradient(circle at 32% 28%, #6090f0, #3050d0 35%, #1830a0 65%, #0a1868 90%)',
            boxShadow: `${shadow}, 0 0 16px rgba(60,100,220,0.4)`,
          }}
        >
          {/* Wind bands */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(150,180,255,0.08) 4px, rgba(150,180,255,0.08) 6px)',
          }} />
          <div className="absolute inset-0 rounded-full" style={{
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 11px, rgba(40,60,160,0.06) 11px, rgba(40,60,160,0.06) 13px)',
          }} />
          {/* Great Dark Spot */}
          <div className="absolute rounded-full" style={{
            width: '22%', height: '15%', top: '38%', left: '28%',
            background: 'radial-gradient(ellipse at 45% 40%, rgba(15,25,70,0.7), rgba(20,30,80,0.3) 60%, transparent 80%)',
            filter: 'blur(1px)',
          }} />
          {/* Scooter cloud */}
          <div className="absolute rounded-full" style={{
            width: '12%', height: '5%', top: '55%', left: '55%',
            background: 'rgba(200,220,255,0.2)',
            filter: 'blur(1px)',
          }} />
          {/* Small white cirrus */}
          <div className="absolute rounded-full" style={{ width: '8%', height: '3%', top: '25%', left: '50%', background: 'rgba(220,235,255,0.2)', filter: 'blur(1px)' }} />
          <div className="absolute rounded-full" style={{ width: '6%', height: '2%', top: '68%', left: '40%', background: 'rgba(200,220,255,0.15)', filter: 'blur(1px)' }} />
          {/* Atmospheric rim */}
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 6px rgba(100,150,255,0.2)' }} />
        </div>
      );

    default:
      return <div className="rounded-full bg-slate-600" style={{ width: s, height: s }} />;
  }
}

function PlanetWithRings({ planet }: { planet: Planet }) {
  const isSaturn = planet.id === 'saturn';
  const ringDiameter = planet.size * 2.6;
  const ringSquash = isSaturn ? 0.3 : 0.24;
  const ringRotate = isSaturn ? -18 : 78;

  const ringGradient = isSaturn
    ? `radial-gradient(circle,
        transparent 55%,
        rgba(200,185,140,0.3) 57%, rgba(200,185,140,0.3) 62%,
        rgba(235,215,155,0.7) 64%, rgba(248,232,175,0.88) 72%,
        rgba(210,190,130,0.55) 77%, rgba(165,145,85,0.1) 79%,
        rgba(165,145,85,0.1) 82%,
        rgba(225,205,145,0.6) 84%, rgba(235,215,155,0.5) 90%,
        rgba(200,180,120,0.2) 92%, rgba(200,180,120,0.2) 95%,
        transparent 97%)`
    : `radial-gradient(circle,
        transparent 60%,
        rgba(130,210,210,0.2) 63%, rgba(130,210,210,0.2) 70%,
        rgba(150,230,230,0.3) 73%, rgba(150,230,230,0.3) 83%,
        rgba(100,190,190,0.12) 86%, rgba(100,190,190,0.12) 90%,
        transparent 93%)`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: ringDiameter, height: ringDiameter }}>
      {/* Back half of rings (behind planet, dimmer — in shadow) */}
      <div className="absolute" style={{
        width: ringDiameter,
        height: ringDiameter,
        borderRadius: '50%',
        background: ringGradient,
        transform: `scaleY(${ringSquash}) rotate(${ringRotate}deg)`,
        clipPath: 'inset(0 0 50% 0)',
        opacity: 0.6,
      }} />

      {/* Planet body */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PlanetSphere planet={planet} />
      </div>

      {/* Front half of rings (in front of planet, full brightness) */}
      <div className="absolute" style={{
        width: ringDiameter,
        height: ringDiameter,
        borderRadius: '50%',
        background: ringGradient,
        transform: `scaleY(${ringSquash}) rotate(${ringRotate}deg)`,
        clipPath: 'inset(50% 0 0 0)',
      }} />
    </div>
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

export default function SolarSystem() {
  const [selected, setSelected] = useState<Planet | null>(null);

  return (
    <div className="relative">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">Interactive Solar System</h2>
        <p className="text-sm text-slate-400 mt-1">Click a planet to explore its details</p>
      </div>

      <div
        className="relative w-full mx-auto flex items-center justify-center"
        style={{ height: '1100px', maxHeight: '72vh' }}
      >
        <div className="relative" style={{ width: '1100px', height: '1100px', transform: 'scale(var(--scale))', transformOrigin: 'center' }}>
          {/* Sun */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 40% 35%, #fff5d0, #ffc840 30%, #ff7820 70%, #e04010 100%)',
                  boxShadow: '0 0 80px 30px rgba(255,160,40,0.35), inset -6px -6px 16px rgba(180,40,0,0.3)',
                }}
              />
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-orange-400/20 animate-ping" />
              <div className="absolute rounded-full" style={{
                width: '120px', height: '120px', top: '-20px', left: '-20px',
                background: 'radial-gradient(circle, rgba(255,180,60,0.15), transparent 60%)',
              }} />
            </div>
          </div>

          {/* Orbit rings + planets */}
          {PLANETS.map((planet) => (
            <div key={planet.id}>
              {/* Orbit ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/30 pointer-events-none"
                style={{ width: `${planet.orbit * 2}px`, height: `${planet.orbit * 2}px` }}
              />

              {/* Planet on orbit */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: `${planet.orbit * 2}px`,
                  height: `${planet.orbit * 2}px`,
                  animation: `orbit-rotate ${planet.duration}s linear infinite`,
                }}
              >
                <button
                  onClick={() => setSelected(planet)}
                  className="absolute top-0 left-1/2 -translate-x-1/2 group pointer-events-auto"
                  style={{ animation: `orbit-counter-rotate ${planet.duration}s linear infinite` }}
                >
                  <div className="group-hover:scale-125 group-hover:ring-2 group-hover:ring-white/40 transition-all duration-300 cursor-pointer">
                    {planet.hasRings ? (
                      <PlanetWithRings planet={planet} />
                    ) : (
                      <PlanetSphere planet={planet} />
                    )}
                  </div>

                  {/* Earth's moon */}
                  {planet.hasMoon && (
                    <div
                      className="absolute rounded-full bg-slate-300"
                      style={{
                        width: '6px', height: '6px',
                        top: '50%', left: '120%',
                        boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4), 0 0 4px rgba(200,200,200,0.3)',
                        animation: `orbit-rotate ${planet.duration / 4}s linear infinite`,
                      }}
                    />
                  )}

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    <span className="text-xs text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                      {planet.name}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Planet detail modal */}
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
                <div className="shrink-0">
                  {selected.hasRings ? (
                    <PlanetWithRings planet={selected} />
                  ) : (
                    <PlanetSphere planet={selected} />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">{selected.name}</h3>
                  <p className="text-sm text-slate-400">{selected.type}</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4">
              <div className="grid grid-cols-2 gap-2.5">
                <Stat label="Distance from Sun" value={selected.distance} />
                <Stat label="Diameter" value={selected.diameter} />
                <Stat label="Day Length" value={selected.dayLength} />
                <Stat label="Year Length" value={selected.yearLength} />
                <Stat label="Moons" value={String(selected.moons)} />
                <Stat label="Temperature" value={selected.temp} />
              </div>
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
