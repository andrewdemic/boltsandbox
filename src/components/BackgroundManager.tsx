import { useEffect, useState, useRef } from 'react';
import Starfield from '@/components/Starfield';
import OceanBackground from '@/components/Ocean';
import SkyBackground from '@/components/Sky';

export default function BackgroundManager() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkness, setDarkness] = useState(0);
  const [skyProgress, setSkyProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const trigger = document.querySelector('[data-ocean-trigger]');
        const deepTrigger = document.querySelector('[data-deep-sea-trigger]');
        const skyTrigger = document.querySelector('[data-sky-trigger]');
        if (trigger) {
          const rect = trigger.getBoundingClientRect();
          const triggerBottom = rect.bottom + window.scrollY;
          const start = triggerBottom - window.innerHeight * 0.5;
          const end = start + window.innerHeight * 0.5;
          const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
          setScrollProgress(progress);
        }
        if (deepTrigger) {
          const rect = deepTrigger.getBoundingClientRect();
          const deepTop = rect.top + window.scrollY;
          const darkStart = deepTop - window.innerHeight;
          const darkEnd = deepTop + window.innerHeight * 0.5;
          const darkProgress = Math.max(0, Math.min(1, (window.scrollY - darkStart) / (darkEnd - darkStart)));
          setDarkness(darkProgress);
        }
        if (skyTrigger) {
          const rect = skyTrigger.getBoundingClientRect();
          const skyTop = rect.top + window.scrollY;
          const skyStart = skyTop - window.innerHeight;
          const skyEnd = skyTop + window.innerHeight * 0.3;
          const skyProg = Math.max(0, Math.min(1, (window.scrollY - skyStart) / (skyEnd - skyStart)));
          setSkyProgress(skyProg);
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    const initialTimer = setTimeout(handleScroll, 100);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: (1 - scrollProgress) * (1 - skyProgress) }}
      >
        <Starfield />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: scrollProgress * (1 - skyProgress) }}
      >
        <OceanBackground />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: '#000',
          opacity: darkness * 0.75 * (1 - skyProgress),
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: skyProgress }}
      >
        <SkyBackground />
      </div>
    </>
  );
}
