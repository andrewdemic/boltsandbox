import { Loader2, AlertCircle } from 'lucide-react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import Starfield from '@/components/Starfield';
import BackgroundManager from '@/components/BackgroundManager';

function AppContent() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 relative">
        <Starfield />
        <Loader2 className="w-6 h-6 text-sky-400 animate-spin relative z-10" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative">
        <Starfield />
        <div className="max-w-md text-center relative z-10">
          <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
          <h1 className="text-lg font-semibold text-white mb-2">Connection problem</h1>
          <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {user ? <BackgroundManager /> : <Starfield />}
      <div className="relative z-10">
        {user ? <Dashboard /> : <AuthScreen />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
