import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Sun, 
  Moon, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [endpoints, setEndpoints] = useState([
    { id: 1, method: 'GET', path: '/api/v1/auth/session', status: 200, latency: 28, health: 'nominal' },
    { id: 2, method: 'POST', path: '/api/v1/payments/intent', status: 200, latency: 114, health: 'nominal' },
    { id: 3, method: 'GET', path: '/api/v1/users/profile', status: 200, latency: 45, health: 'nominal' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Konami Code listener (Easter Egg)
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiSequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          setEasterEggFound(true);
          currentIndex = 0;
          setTimeout(() => setEasterEggFound(false), 5000);
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const simulateLatencySpike = () => {
    setIsSimulating(true);
    setEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === 2 ? { ...ep, latency: 1420, health: 'degraded' } : ep
      )
    );
    setTimeout(() => setIsSimulating(false), 600);
  };

  const simulateError = () => {
    setIsSimulating(true);
    setEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === 1 ? { ...ep, status: 500, health: 'down' } : ep
      )
    );
    setTimeout(() => setIsSimulating(false), 600);
  };

  const resetEndpoints = () => {
    setIsSimulating(true);
    setEndpoints([
      { id: 1, method: 'GET', path: '/api/v1/auth/session', status: 200, latency: 28, health: 'nominal' },
      { id: 2, method: 'POST', path: '/api/v1/payments/intent', status: 200, latency: 114, health: 'nominal' },
      { id: 3, method: 'GET', path: '/api/v1/users/profile', status: 200, latency: 45, health: 'nominal' },
    ]);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased font-sans flex flex-col justify-between">
      {/* Bonus Easter Egg Toast */}
      {easterEggFound && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
          <Terminal size={20} />
          <span className="text-sm font-semibold">Bonus unlocked: Konami code detected!</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold tracking-tight text-lg">
            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>DevTelemetry</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <a href="#demo" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              Live Demo
            </a>
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              Architecture
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
            <Zap size={14} /> Edge Telemetry for Modern Backend Stacks
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Instant API observability. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Zero agents required.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Eliminate bulky server daemons. Monitor endpoint latencies, 5xx outages, and uptime regressions using zero-overhead edge probes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demo"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition text-center"
            >
              Test Live Sandbox
            </a>
            <a
              href="https://github.com/rishabhtcodes"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold rounded-lg flex items-center justify-center gap-2 transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View GitHub Source
            </a>
          </div>
        </section>

        {/* Interactive Showcase Section */}
        <section id="demo" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold">Interactive Endpoint Monitor</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Click triggers to simulate real-time production anomalies</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={simulateLatencySpike}
                  disabled={isSimulating}
                  className="px-3 py-1.5 text-xs font-medium border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded hover:bg-amber-100 dark:hover:bg-amber-900/50 transition cursor-pointer flex items-center gap-1"
                >
                  <Play size={12} /> Inject Latency
                </button>
                <button
                  onClick={simulateError}
                  disabled={isSimulating}
                  className="px-3 py-1.5 text-xs font-medium border border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded hover:bg-rose-100 dark:hover:bg-rose-900/50 transition cursor-pointer flex items-center gap-1"
                >
                  <Play size={12} /> Force 500 Outage
                </button>
                <button
                  onClick={resetEndpoints}
                  disabled={isSimulating}
                  className="px-3 py-1.5 text-xs font-medium border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw size={12} className={isSimulating ? "animate-spin" : ""} /> Reset
                </button>
              </div>
            </div>

            {/* Live Endpoints Display */}
            <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800/60 overflow-x-auto">
              {endpoints.map((ep) => (
                <div key={ep.id} className="py-3.5 flex items-center justify-between gap-4 min-w-[320px]">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      ep.method === 'POST' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs sm:text-sm">{ep.path}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono ${ep.latency > 500 ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {ep.latency} ms
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      ep.status === 200 
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {ep.status === 200 ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {ep.status} {ep.status === 200 ? 'OK' : 'ERR'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <Terminal className="h-6 w-6 text-indigo-500 mb-4" />
              <h3 className="font-bold text-base mb-2">Agentless Ping Probes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Probe endpoints externally across multi-region networks without injecting heavy runtime packages into your codebase.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <Zap className="h-6 w-6 text-indigo-500 mb-4" />
              <h3 className="font-bold text-base mb-2">Instant Degradation Alerts</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Dispatch webhooks to Slack, Discord, or custom endpoints the millisecond consecutive requests cross SLA thresholds.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <ShieldCheck className="h-6 w-6 text-indigo-500 mb-4" />
              <h3 className="font-bold text-base mb-2">Zero Payload Overhead</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Operates entirely on standard HTTP status inspections, requiring zero access to internal application memory or database records.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 DevTelemetry. Built with React & Tailwind CSS.</p>
        <p className="mt-1">Bonus: Press ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard.</p>
      </footer>
    </div>
  );
}