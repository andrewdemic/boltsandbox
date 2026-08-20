import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, configError } from '@/lib/supabase';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(configError);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let listenerHasSession = false;

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (cancelled) return;
      if (newSession) listenerHasSession = true;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (cancelled) return;
        if (sessionError) {
          setError('Unable to reach the account service. Please try again.');
        } else if (!listenerHasSession) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) setError('Unable to reach the account service. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    if (!supabase) return { error: 'Connection not available. Please refresh the page.' };
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) return { error: mapAuthError(authError.message) };
    if (!data.session && !data.user?.email_confirmed_at) {
      return { error: 'Please confirm your email address before signing in. Check your inbox for a verification link.' };
    }
    return { error: null };
  }

  async function signUp(email: string, password: string) {
    if (!supabase) return { error: 'Connection not available. Please refresh the page.' };
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) return { error: mapAuthError(authError.message) };
    const needsConfirmation = !data.session && !data.user?.email_confirmed_at;
    return { error: null, needsConfirmation };
  }

  async function signInWithGoogle() {
    if (!supabase) return { error: 'Connection not available. Please refresh the page.' };
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    return { error: authError ? authError.message : null };
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, error, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function mapAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('invalid login')) return 'The email or password is incorrect.';
  if (lower.includes('already registered')) return 'An account with this email already exists.';
  if (lower.includes('password should be at least 6 characters')) {
    return 'Password must be at least 6 characters.';
  }
  return message;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
