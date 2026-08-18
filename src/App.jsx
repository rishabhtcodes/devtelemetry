import { useState, useEffect, useMemo } from 'react';
import NeuralCanvas from './NeuralCanvas';
import {
  Cpu,
  Terminal,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Flame,
  Radio,
  Sliders,
  ShieldCheck,
  Disc,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Play,
  Sun,
  Moon,
  Copy,
  Check,
  Code2
} from 'lucide-react';

const INITIAL_ENDPOINTS = [
  { id: 1, name: 'Auth Gateway Session', method: 'GET', path: '/api/v1/auth/session', status: 200, latency: 22, history: [19, 22, 24, 21, 23, 22], payload: '1.2 KB', region: 'iad-1' },
  { id: 2, name: 'Payment Settlement', method: 'POST', path: '/api/v1/payments/settle', status: 200, latency: 78, history: [74, 82, 80, 76, 79, 78], payload: '4.8 KB', region: 'fra-1' },
  { id: 3, name: 'Vector Search Ingestion', method: 'POST', path: '/api/v1/embeddings/query', status: 200, latency: 38, history: [35, 41, 39, 42, 37, 38], payload: '14.2 KB', region: 'sfo-1' },
  { id: 4, name: 'Timeline Cache Layer', method: 'GET', path: '/api/v1/feed/cache', status: 200, latency: 16, history: [14, 18, 15, 17, 16, 16], payload: '2.1 KB', region: 'sin-1' },
];

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  // 3D Matrix & Compute State
  const [loadFactor, setLoadFactor] = useState(45);
  const [topology, setTopology] = useState('sphere');
  const [isWarped, setIsWarped] = useState(false);
  const [tps, setTps] = useState(1840);
  const [latency, setLatency] = useState(14.2);

  // Live Endpoints State
  const [endpoints, setEndpoints] = useState(INITIAL_ENDPOINTS);
  const [selectedEndpointId, setSelectedEndpointId] = useState(1);
  const [isInjectingProbe, setIsInjectingProbe] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Real-time Event Stream
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: '00:04:12', msg: 'Probe TLS handshake verified (TLS 1.3)', status: '200 OK', region: 'iad-1' },
    { id: 2, time: '00:04:14', msg: 'Zero-daemon HTTP status audit completed', status: '200 OK', region: 'fra-1' },
    { id: 3, time: '00:04:18', msg: 'Synthetic latency baseline within p95 SLA', status: '200 OK', region: 'sfo-1' },
  ]);

  // Bonus: Konami Code Easter Egg
  const [easterEggActive, setEasterEggActive] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Konami Code Listener (↑ ↑ ↓ ↓ ← → ← → B A)
  useEffect(() => {
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === sequence[idx]) {
        idx++;
        if (idx === sequence.length) {
          setEasterEggActive(true);
          idx = 0;
          setTimeout(() => setEasterEggActive(false), 5500);
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeEndpoint = useMemo(
    () => endpoints.find((e) => e.id === selectedEndpointId) || endpoints[0],
    [endpoints, selectedEndpointId]
  );

  // Micro-interaction 1: Inject Latency Regression
  const triggerLatencySpike = () => {
    setIsInjectingProbe(true);
    const spikeValue = 890;
    setEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === selectedEndpointId
          ? {
              ...ep,
              latency: spikeValue,
              history: [...ep.history.slice(1), spikeValue]
            }
          : ep
      )
    );
    setEventLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: `SLA Breached: High latency on ${activeEndpoint.path} (>500ms)`,
        status: 'DEGRADED',
        region: activeEndpoint.region
      },
      ...prev.slice(0, 4)
    ]);
    setTimeout(() => setIsInjectingProbe(false), 450);
  };

  // Micro-interaction 2: Inject HTTP 500 Outage
  const trigger500Outage = () => {
    setIsInjectingProbe(true);
    setEndpoints((prev) =>
      prev.map((ep) =>
        ep.id === selectedEndpointId
          ? {
              ...ep,
              status: 500,
              latency: 12,
              history: [...ep.history.slice(1), 12]
            }
          : ep
      )
    );
    setEventLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: `CRITICAL: 500 Internal Server Error detected on ${activeEndpoint.path}`,
        status: 'DOWN',
        region: activeEndpoint.region
      },
      ...prev.slice(0, 4)
    ]);
    setTimeout(() => setIsInjectingProbe(false), 450);
  };

  // 3D Overload Matrix Simulation
  const trigger3DOverload = () => {
    setIsWarped(true);
    setLoadFactor(100);
    setTps(5680);
    setLatency(186.4);
    setTimeout(() => {
      setIsWarped(false);
      setLoadFactor(45);
      setTps(1840);
      setLatency(14.2);
    }, 4500);
  };

  const resetAll = () => {
    setIsInjectingProbe(true);
    setIsWarped(false);
    setLoadFactor(45);
    setTopology('sphere');
    setTps(1840);
    setLatency(14.2);
    setEndpoints(INITIAL_ENDPOINTS);
    setEventLogs([
      { id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Telemetry probe pipeline re-synchronized to edge mesh', status: '200 OK', region: 'cluster-all' }
    ]);
    setTimeout(() => setIsInjectingProbe(false), 300);
  };

  const copyCurl = () => {
    navigator.clipboard?.writeText('curl -s https://devtelemetry.io/v1/ping/sandbox -H "X-Probe-Key: live_demo"');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[350px] bg-pink-500/10 dark:bg-pink-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Easter Egg Overlay Toast */}
      {easterEggActive && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/80 shadow-2xl shadow-cyan-500/30 flex items-center gap-3 animate-bounce backdrop-blur-xl text-white">
          <Terminal className="text-cyan-400" size={22} />
          <div>
            <p className="text-xs font-mono font-bold text-cyan-300">BONUS PROTOCOL UNLOCKED</p>
            <p className="text-[11px] text-slate-300">Konami Sequence verified: Hyper-compute 3D shaders enabled.</p>
          </div>
        </div>
      )}

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 backdrop-blur-2xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-500 dark:text-cyan-400 shadow-sm">
              <Cpu size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight font-mono text-base dark:text-white text-slate-900 bg-clip-text">
                  DevTelemetry
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800/80">
                  Agentless Edge
                </span>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6">
            <a href="#demo-live" className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              Live Sandbox
            </a>
            <a href="#3d-core" className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
              3D Quantum Engine
            </a>
            <a href="#architecture" className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition hidden md:inline">
              Architecture
            </a>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="https://github.com/rishabhtcodes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>

    </div>
  );
}