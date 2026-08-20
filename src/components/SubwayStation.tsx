import { useState, useEffect, useRef } from 'react';
import { Train, ArrowDown, Info } from 'lucide-react';

const R_LINE_COLOR = '#fccc0b';
const R_LINE_DARK = '#c9a800';

const FACTS = [
  'The R train runs local along the BMT Broadway Line, from Forest Hills-71st Ave in Queens to Bay Ridge-95th St in Brooklyn.',
  'The R fleet uses R160 class cars, built by Kawasaki and Alstom between 2005 and 2010, each car 60 feet long.',
  'The R train\'s signature color is yellow — one of 28 distinct route colors in the NYC Subway system.',
  'The R passes through 45 stations across its 19.6-mile route, including a crossing of the Manhattan Bridge.',
  'During late nights, the R becomes a shuttle between Bay Ridge and 36th Street in Brooklyn.',
  'The R160 cars feature the FIND (Flexible Information and Notice Display) system — LCD screens showing station info and news.',
];

function StationColumn({ left, visible }: { left: number; visible: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: '0',
        bottom: '140px',
        width: '28px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}
    >
      {/* I-beam column */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)',
          boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        }}
      />
      {/* Rivets */}
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((p) => (
        <div
          key={`rivet-${p}`}
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: `${p * 100}%`,
            width: '4px',
            height: '4px',
            background: '#4b5563',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3)',
          }}
        />
      ))}
      {/* R line sign on column */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full font-bold"
        style={{
          top: '20px',
          width: '22px',
          height: '22px',
          background: R_LINE_COLOR,
          color: '#1a1a1a',
          fontSize: '13px',
          border: '2px solid rgba(0,0,0,0.15)',
        }}
      >
        R
      </div>
    </div>
  );
}

function Bench({ left, visible }: { left: number; visible: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        bottom: '142px',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.8s ease 0.5s`,
      }}
    >
      {/* Seat slats */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={`slat-${i}`}
            style={{
              width: '10px',
              height: '32px',
              background: 'linear-gradient(to bottom, #78350f, #92400e 50%, #78350f)',
              borderRadius: '1px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
      {/* Legs */}
      <div className="flex justify-between" style={{ marginTop: '-2px' }}>
        <div style={{ width: '4px', height: '18px', background: '#4b5563' }} />
        <div style={{ width: '4px', height: '18px', background: '#4b5563' }} />
      </div>
    </div>
  );
}

function TrashCan({ left, visible }: { left: number; visible: boolean }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        bottom: '142px',
        opacity: visible ? 0.9 : 0,
        transition: 'opacity 0.8s ease 0.6s',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '28px',
          background: 'linear-gradient(to bottom, #374151, #1f2937)',
          borderRadius: '2px 2px 0 0',
          border: '1px solid #4b5563',
        }}
      >
        {/* Mesh holes */}
        <div
          className="absolute inset-1"
          style={{
            backgroundImage:
              'radial-gradient(circle 1px at 4px 4px, rgba(0,0,0,0.4) 1px, transparent 1px), radial-gradient(circle 1px at 12px 4px, rgba(0,0,0,0.4) 1px, transparent 1px), radial-gradient(circle 1px at 4px 12px, rgba(0,0,0,0.4) 1px, transparent 1px), radial-gradient(circle 1px at 12px 12px, rgba(0,0,0,0.4) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>
    </div>
  );
}

function Passenger({ left, h, w, visible, delay }: { left: number; h: number; w: number; visible: boolean; delay: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        bottom: '10px',
        width: `${w}px`,
        height: `${h}px`,
        opacity: visible ? 0.8 : 0,
        transition: `opacity 0.8s ease ${delay}s`,
      }}
    >
      {/* Head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: '-11px',
          width: '13px',
          height: '13px',
          background: 'linear-gradient(to bottom, #475569, #334155)',
        }}
      />
      {/* Body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #334155, #1e293b)',
          borderRadius: '6px 6px 2px 2px',
        }}
      />
    </div>
  );
}

export default function SubwayStation() {
  const [trainOffset, setTrainOffset] = useState(-900);
  const [activeFact, setActiveFact] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const tick = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const speed = 320;
      setTrainOffset((prev) => {
        const next = prev + speed * delta;
        if (next > window.innerWidth + 500) return -900;
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % FACTS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [visible]);

  const stationName = 'CITY HALL';
  const columns = [8, 24, 40, 56, 72, 88];

  return (
    <section ref={sectionRef} className="relative w-full" data-subway-trigger>
      {/* Transition: stairs descending from street level */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '60vh',
          background: 'linear-gradient(to bottom, #1e293b 0%, #0f172a 40%, #1a1a2e 70%, #161616 100%)',
        }}
      >
        {/* Street-level light fading above */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: '50%',
            background: 'linear-gradient(to bottom, rgba(56,189,248,0.10), transparent)',
          }}
        />

        {/* Stairwell */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: 'min(380px, 80vw)', height: '100%' }}>
            {/* Left wall with subway tiles */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: '22%',
                background: `
                  linear-gradient(to right, #1e293b, #334155),
                  repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(0,0,0,0.08) 14px, rgba(0,0,0,0.08) 15px),
                  repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(0,0,0,0.06) 20px, rgba(0,0,0,0.06) 21px)
                `,
                transform: 'perspective(400px) rotateY(25deg)',
                transformOrigin: 'left center',
              }}
            />
            {/* Right wall with subway tiles */}
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: '22%',
                background: `
                  linear-gradient(to left, #1e293b, #334155),
                  repeating-linear-gradient(0deg, transparent 0px, transparent 14px, rgba(0,0,0,0.08) 14px, rgba(0,0,0,0.08) 15px),
                  repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(0,0,0,0.06) 20px, rgba(0,0,0,0.06) 21px)
                `,
                transform: 'perspective(400px) rotateY(-25deg)',
                transformOrigin: 'right center',
              }}
            />
            {/* Steps receding into darkness */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={`step-${i}`}
                  className="relative"
                  style={{
                    width: `${56 - i * 2.5}%`,
                    height: '8px',
                    background: 'linear-gradient(to bottom, #475569, #334155)',
                    borderRadius: '2px 2px 0 0',
                    marginBottom: '1px',
                    opacity: 1 - i * 0.07,
                    boxShadow: '0 -1px 3px rgba(0,0,0,0.5)',
                  }}
                />
              ))}
            </div>
            {/* R line sign at bottom of stairs */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ bottom: '16px', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}
            >
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: '32px',
                  height: '32px',
                  background: R_LINE_COLOR,
                  color: '#1a1a1a',
                  fontSize: '18px',
                  border: '2px solid rgba(0,0,0,0.15)',
                  boxShadow: '0 0 20px 4px rgba(252,204,11,0.3)',
                }}
              >
                R
              </div>
            </div>
          </div>
        </div>

        {/* Descent label */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-600/40 text-slate-300 text-xs font-medium">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            Descending Underground
          </div>
        </div>
      </div>

      {/* Platform scene */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: '100vh',
          background: 'linear-gradient(to bottom, #1a1a1a 0%, #141414 25%, #1a1a1a 50%, #161616 75%, #121212 100%)',
        }}
      >
        {/* Ceiling structure */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '90px',
            background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
            borderBottom: '3px solid #3a3a3a',
          }}
        >
          {/* Ceiling beams */}
          {[5, 18, 31, 44, 57, 70, 83, 96].map((lx) => (
            <div
              key={`beam-${lx}`}
              className="absolute"
              style={{
                left: `${lx}%`,
                top: '0',
                width: '3px',
                height: '100%',
                background: 'linear-gradient(to right, #3a3a3a, #4a4a4a, #3a3a3a)',
              }}
            />
          ))}
          {/* Fluorescent light fixtures */}
          {[12, 35, 58, 81].map((lx) => (
            <div
              key={`light-${lx}`}
              className="absolute"
              style={{
                left: `${lx}%`,
                top: '20px',
                width: '120px',
                height: '12px',
                background: 'linear-gradient(to bottom, #fefce8, #fef08a)',
                borderRadius: '2px',
                boxShadow: '0 0 50px 15px rgba(254,240,138,0.2), 0 6px 25px rgba(254,240,138,0.12)',
              }}
            />
          ))}
        </div>

        {/* Light glow from ceiling */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '250px',
            background: 'linear-gradient(to bottom, rgba(254,240,138,0.05), transparent)',
          }}
        />

        {/* Tiled wall background - realistic white subway tiles with grout */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '90px',
            bottom: '140px',
            backgroundColor: '#d4d4d8',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent 0px, transparent 13px, #a1a1aa 13px, #a1a1aa 14px),
              repeating-linear-gradient(90deg, transparent 0px, transparent 26px, #a1a1aa 26px, #a1a1aa 27px)
            `,
          }}
        >
          {/* Grime/dirt overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(30,30,30,0.08) 40%, rgba(20,20,20,0.15) 70%, rgba(15,15,15,0.25) 100%)',
            }}
          />
          {/* Water stains */}
          <div
            className="absolute"
            style={{
              left: '15%',
              top: '20%',
              width: '60px',
              height: '120px',
              background: 'radial-gradient(ellipse, rgba(120,100,60,0.12), transparent 70%)',
            }}
          />
          <div
            className="absolute"
            style={{
              right: '20%',
              top: '10%',
              width: '80px',
              height: '160px',
              background: 'radial-gradient(ellipse, rgba(100,90,50,0.10), transparent 70%)',
            }}
          />
        </div>

        {/* I-beam columns with R signs */}
        {columns.map((c) => (
          <StationColumn key={`col-${c}`} left={c} visible={visible} />
        ))}

        {/* Station name mosaic - authentic style */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '120px' }}>
          <div
            className="flex gap-1"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}
          >
            {stationName.split('').map((ch, i) =>
              ch === ' ' ? (
                <div key={`sp-${i}`} style={{ width: '8px' }} />
              ) : (
                <div
                  key={`ch-${i}`}
                  className="flex items-center justify-center font-bold"
                  style={{
                    width: '30px',
                    height: '38px',
                    background: 'linear-gradient(135deg, #e4e4e7, #d4d4d8)',
                    border: '2px solid #a1a1aa',
                    borderRadius: '2px',
                    fontSize: '18px',
                    color: '#27272a',
                    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  {ch}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Station sign - R line info board */}
        <div className="absolute z-10" style={{ top: '175px', left: '5%' }}>
          <div
            className="flex items-center gap-2 rounded px-3 py-2"
            style={{ background: 'rgba(15,15,15,0.85)', border: '1px solid #3a3a3a' }}
          >
            <div
              className="flex items-center justify-center rounded-full font-bold"
              style={{
                width: '26px',
                height: '26px',
                background: R_LINE_COLOR,
                color: '#1a1a1a',
                fontSize: '14px',
                border: '2px solid rgba(0,0,0,0.15)',
              }}
            >
              R
            </div>
            <div className="flex flex-col">
              <span className="text-slate-300 text-xs font-medium">Broadway Local</span>
              <span className="text-slate-500 text-[10px]">Manhattan &amp; Brooklyn</span>
            </div>
          </div>
        </div>

        {/* Opposite-side station sign */}
        <div className="absolute z-10" style={{ top: '175px', right: '5%' }}>
          <div
            className="flex items-center gap-2 rounded px-3 py-2"
            style={{ background: 'rgba(15,15,15,0.85)', border: '1px solid #3a3a3a' }}
          >
            <span className="text-slate-500 text-[10px]">Next Train</span>
            <div
              className="flex items-center justify-center rounded-full font-bold"
              style={{
                width: '26px',
                height: '26px',
                background: R_LINE_COLOR,
                color: '#1a1a1a',
                fontSize: '14px',
                border: '2px solid rgba(0,0,0,0.15)',
              }}
            >
              R
            </div>
            <span className="text-slate-300 text-xs font-medium">3 min</span>
          </div>
        </div>

        {/* Benches */}
        <Bench left={14} visible={visible} />
        <Bench left={68} visible={visible} />

        {/* Trash cans */}
        <TrashCan left={30} visible={visible} />
        <TrashCan left={84} visible={visible} />

        {/* Platform floor */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '140px',
            background: 'linear-gradient(to bottom, #525252, #404040 30%, #2a2a2a 70%, #1a1a1a)',
          }}
        >
          {/* Yellow tactile warning strip */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: '16px',
              background: 'repeating-linear-gradient(90deg, #d4a017 0px, #d4a017 24px, #1a1a1a 24px, #1a1a1a 30px)',
              borderBottom: '1px solid #525252',
            }}
          />
          {/* Platform surface texture - scuffed concrete */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.06) 40px, rgba(0,0,0,0.06) 42px)',
            }}
          />
          {/* Scuff marks */}
          <div
            className="absolute"
            style={{ left: '20%', top: '30%', width: '80px', height: '3px', background: 'rgba(0,0,0,0.15)', transform: 'rotate(5deg)' }}
          />
          <div
            className="absolute"
            style={{ left: '55%', top: '50%', width: '60px', height: '2px', background: 'rgba(0,0,0,0.12)', transform: 'rotate(-3deg)' }}
          />

          {/* Waiting passengers */}
          <Passenger left={12} h={54} w={20} visible={visible} delay={0.2} />
          <Passenger left={22} h={48} w={17} visible={visible} delay={0.3} />
          <Passenger left={38} h={58} w={22} visible={visible} delay={0.4} />
          <Passenger left={50} h={50} w={18} visible={visible} delay={0.5} />
          <Passenger left={62} h={56} w={20} visible={visible} delay={0.6} />
          <Passenger left={78} h={46} w={16} visible={visible} delay={0.7} />
          <Passenger left={90} h={52} w={19} visible={visible} delay={0.8} />
        </div>

        {/* Track bed */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '50px',
            background: 'linear-gradient(to bottom, #0a0a0a, #050505)',
          }}
        >
          {/* Rails - two tracks */}
          <div className="absolute top-3 left-0 right-0" style={{ height: '3px', background: 'linear-gradient(to bottom, #8a8a8a, #6a6a6a)', opacity: 0.6, boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
          <div className="absolute top-7 left-0 right-0" style={{ height: '3px', background: 'linear-gradient(to bottom, #8a8a8a, #6a6a6a)', opacity: 0.6, boxShadow: '0 1px 2px rgba(0,0,0,0.5)' }} />
          {/* Wooden ties */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 20px, #3d2817 20px, #3d2817 24px)',
            }}
          />
          {/* Third rail cover */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '8px', background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)' }}
          />
        </div>

        {/* Passing R train - R160 style */}
        <div
          className="absolute"
          style={{
            bottom: '50px',
            left: `${trainOffset}px`,
            height: '100px',
            width: '800px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {/* Train body - R160 silver/blue livery */}
          <div
            className="relative h-full"
            style={{
              background: 'linear-gradient(to bottom, #c0c0c8 0%, #a0a0a8 15%, #808088 50%, #686870 80%, #505058 100%)',
              borderRadius: '8px 8px 0 0',
              boxShadow: '0 -6px 25px rgba(0,0,0,0.5), inset 0 -4px 8px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.15)',
              border: '1px solid #404048',
            }}
          >
            {/* Blue stripe along the top - R160 signature */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: '0',
                height: '14px',
                background: 'linear-gradient(to bottom, #1e3a5f, #0c4a6e)',
                borderRadius: '8px 8px 0 0',
              }}
            />

            {/* R line bullet on front */}
            <div
              className="absolute left-4 top-5 flex items-center justify-center rounded-full font-bold"
              style={{
                width: '30px',
                height: '30px',
                background: R_LINE_COLOR,
                color: '#1a1a1a',
                fontSize: '16px',
                border: '3px solid #1a1a1a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              R
            </div>

            {/* Windows - tinted glass */}
            <div className="absolute top-6 left-0 right-0 flex justify-around px-12">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={`win-${i}`}
                  style={{
                    width: '54px',
                    height: '26px',
                    background: 'linear-gradient(to bottom, #1a2a3a 0%, #0c1a2a 50%, #0a1520 100%)',
                    borderRadius: '2px',
                    border: '2px solid #404048',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Window reflection */}
                  <div
                    style={{
                      width: '100%',
                      height: '40%',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* FIND display (LCD info screen) */}
            <div
              className="absolute"
              style={{
                left: '44px',
                top: '40px',
                width: '50px',
                height: '14px',
                background: 'linear-gradient(to bottom, #0a1a0a, #051005)',
                border: '1px solid #1a3a1a',
                borderRadius: '1px',
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: '6px', color: '#22c55e', fontFamily: 'monospace' }}
              >
                CITY HALL
              </div>
            </div>

            {/* Doors with windows above */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-around px-10">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`door-${i}`} className="flex flex-col items-center">
                  {/* Door window */}
                  <div
                    style={{
                      width: '36px',
                      height: '16px',
                      background: 'linear-gradient(to bottom, #1a2a3a, #0c1a2a)',
                      border: '2px solid #404048',
                      borderRadius: '1px',
                    }}
                  />
                  {/* Door body */}
                  <div
                    style={{
                      width: '36px',
                      height: '28px',
                      background: 'linear-gradient(to bottom, #707078, #505058)',
                      border: '2px solid #404048',
                      borderRadius: '1px',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Headlight glow on front car */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(254,240,138,0.5), transparent 65%)',
              }}
            />

            {/* Car separator lines */}
            {[200, 400, 600].map((x) => (
              <div
                key={`sep-${x}`}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                }}
              />
            ))}
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute top-0 left-0 right-0 z-30 flex flex-col items-center pt-24 pointer-events-none">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4"
            style={{
              background: 'rgba(15,15,15,0.7)',
              borderColor: 'rgba(252,204,11,0.3)',
              color: R_LINE_COLOR,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <Train className="w-3.5 h-3.5" />
            R Train · Broadway Local
          </div>
          <p
            className="mt-4 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto text-center"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}
          >
            Below the streets of New York, the subway never sleeps. Watch the R train roll through.
          </p>
        </div>

        {/* Rotating fact panel */}
        <div
          className="absolute z-30 rounded-xl border p-4 max-w-sm"
          style={{
            bottom: '170px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15,15,15,0.85)',
            borderColor: 'rgba(252,204,11,0.25)',
            backdropFilter: 'blur(8px)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: R_LINE_COLOR }} />
            <p key={activeFact} className="text-sm text-slate-300 leading-relaxed" style={{ animation: 'submarine-panel-in 0.5s ease-out' }}>
              {FACTS[activeFact]}
            </p>
          </div>
          {/* Fact dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {FACTS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === activeFact ? '16px' : '5px',
                  height: '5px',
                  background: i === activeFact ? R_LINE_COLOR : 'rgba(71,71,85,0.5)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
