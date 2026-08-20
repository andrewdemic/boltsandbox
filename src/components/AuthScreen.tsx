import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Lock, Mail, KeyRound, Loader2, ShieldCheck, MailCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UFO from '@/components/UFO';

function GoogleIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

type Mode = 'signin' | 'signup';

export default function AuthScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [beaming, setBeaming] = useState(false);
  const beamTimerRef = useRef<number | null>(null);

  const ufoRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.6, y: 0.35 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const el = ufoRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elW = el.offsetWidth;
      const elH = el.offsetHeight;
      const padX = 40;
      const padTop = 30;
      const padBottom = 100;

      const pos = posRef.current;
      const vel = velRef.current;

      pos.x += vel.x;
      pos.y += vel.y;

      if (pos.x <= padX) { pos.x = padX; vel.x = Math.abs(vel.x); }
      if (pos.x >= w - elW - padX) { pos.x = w - elW - padX; vel.x = -Math.abs(vel.x); }
      if (pos.y <= padTop) { pos.y = padTop; vel.y = Math.abs(vel.y); }
      if (pos.y >= h - elH - padBottom) { pos.y = h - elH - padBottom; vel.y = -Math.abs(vel.y); }

      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (beamTimerRef.current) clearTimeout(beamTimerRef.current);
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    if (mode === 'signup') {
      const { error: authError, needsConfirmation } = await signUp(email.trim(), password);
      setSubmitting(false);
      if (authError) {
        setError(authError);
        return;
      }
      if (needsConfirmation) {
        setPendingEmail(email.trim());
      } else {
        const { error: signInError } = await signIn(email.trim(), password);
        if (signInError) {
          setMode('signin');
          setNotice('Your account is ready. Please sign in.');
        }
      }
    } else {
      const { error: authError } = await signIn(email.trim(), password);
      setSubmitting(false);
      if (authError) {
        setError(authError);
        return;
      }
    }
  }

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    setGoogleLoading(true);
    const { error: googleError } = await signInWithGoogle();
    setGoogleLoading(false);
    if (googleError) setError(googleError);
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    setPendingEmail(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.06),transparent_40%)]" />

      {/* UFO floating freely around the screen */}
      <div
        ref={ufoRef}
        className="absolute cursor-pointer"
        style={{ top: 0, left: 0, zIndex: 1, willChange: 'transform' }}
        onClick={() => {
          setBeaming(true);
          if (beamTimerRef.current) clearTimeout(beamTimerRef.current);
          beamTimerRef.current = window.setTimeout(() => setBeaming(false), 1800);
        }}
        title="Click the UFO!"
      >
        <div style={{ animation: 'ufo-bob 3s ease-in-out infinite alternate' }}>
          <UFO beaming={beaming} />
        </div>
      </div>

      <div className="relative w-full max-w-md" style={{ zIndex: 2 }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-slate-400 text-center leading-relaxed">
            {mode === 'signin'
              ? 'Sign in to enter the members area.'
              : 'Set up an account to get access.'}
          </p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {pendingEmail ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                <MailCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                We sent a verification link to <span className="text-slate-200 font-medium">{pendingEmail}</span>. Click the link in the email to confirm your account, then sign in below.
              </p>
              <button
                onClick={() => {
                  setPendingEmail(null);
                  setMode('signin');
                  setNotice('Email confirmed? You can sign in now.');
                }}
                className="mt-6 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium hover:from-sky-400 hover:to-emerald-400 transition"
              >
                Continue to sign in
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg bg-white text-slate-700 font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon className="w-5 h-5" />}
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      id="password"
                      type="password"
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                  </div>
                  {mode === 'signup' && (
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      Must be at least 6 characters. For a stronger password, include a mix of uppercase and lowercase letters, numbers, and symbols.
                    </p>
                  )}
                </div>

                {error && (
                  <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
                {notice && (
                  <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                    {notice}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium hover:from-sky-400 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-800 text-center text-sm text-slate-400">
                {mode === 'signin' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => switchMode('signup')}
                      className="text-sky-400 hover:text-sky-300 font-medium transition"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => switchMode('signin')}
                      className="text-sky-400 hover:text-sky-300 font-medium transition"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5" />
          Your credentials are kept private and secure.
        </p>
      </div>
    </div>
  );
}
