import { LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import SolarSystem from '@/components/SolarSystem';
import ConstellationMap from '@/components/ConstellationMap';
import Submarine from '@/components/Submarine';
import DeepSeaCreatures from '@/components/DeepSeaCreatures';
import CloudTypes from '@/components/CloudTypes';
import Birds from '@/components/Birds';
import NYCStreet from '@/components/NYCStreet';
import SubwayStation from '@/components/SubwayStation';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const skyRef = useRef<HTMLDivElement>(null);
  const [skyVisible, setSkyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSkyVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (skyRef.current) observer.observe(skyRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Andrew's Sandbox</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            You&apos;re signed in
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Explore the Solar System
          </h1>
          <p className="mt-3 text-slate-400 leading-relaxed">
            An interactive map of our solar system. Click any planet to learn about it.
          </p>
        </div>

        <SolarSystem />

        <div className="h-32" aria-hidden="true" />

        <div data-ocean-trigger>
          <ConstellationMap />
        </div>

        <div className="h-[150vh] flex flex-col items-center justify-start pt-24" aria-hidden="true">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cyan-100">
              The Cosmic Ocean
            </h2>
            <p className="mt-3 text-cyan-200/60 leading-relaxed max-w-md">
              Where the stars meet the sea. Keep scrolling to dive deeper into the depths below.
            </p>
          </div>
        </div>

        <div className="h-32" aria-hidden="true" />

        <Submarine />

        <div className="h-32" aria-hidden="true" />

        <div data-deep-sea-trigger>
          <DeepSeaCreatures />
        </div>

        <div className="h-40" aria-hidden="true" />

        <div data-sky-trigger ref={skyRef}>
          <div className="h-[80vh] flex flex-col items-center justify-center text-center">
            <div
              className="transition-all duration-1000"
              style={{
                opacity: skyVisible ? 1 : 0,
                transform: skyVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Rising to the Surface
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
                Back to the Sky
              </h2>
              <p className="text-lg text-sky-100/70 leading-relaxed max-w-md mx-auto">
                From the darkest depths of the ocean, we rise back into the light — past the clouds and into the open sky.
              </p>
            </div>
          </div>

          <div className="h-24" aria-hidden="true" />

          <CloudTypes />

          <div className="h-32" aria-hidden="true" />

          <Birds />

          <div className="h-40" aria-hidden="true" />
        </div>
      </main>

      <NYCStreet />

      <SubwayStation />
    </div>
  );
}
