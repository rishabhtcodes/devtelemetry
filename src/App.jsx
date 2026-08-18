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
    <div className={`min-h-screen font-sans selection:bg-blue-500/20 selection:text-blue-300 relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300 ${
      darkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Subtle, Sophisticated Enterprise Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Modern Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(150,150,150,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(150,150,150,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Easter Egg Overlay Toast */}
      {easterEggActive && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-xl text-white">
          <Terminal className="text-blue-400" size={22} />
          <div>
            <p className="text-xs font-mono font-bold text-blue-400">BONUS PROTOCOL UNLOCKED</p>
            <p className="text-[11px] text-slate-300">Konami Sequence verified: Root compute telemetry active.</p>
          </div>
        </div>
      )}

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm">
              <Cpu size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight font-mono text-base dark:text-white text-slate-900">
                  DevTelemetry
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="https://github.com/rishabhtcodes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 mb-6 backdrop-blur-md shadow-sm">
            <Radio size={13} className="text-blue-500" />
            <span>Deterministic Edge Observability • Zero Daemons</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
            Visualizing Intelligence in <br />
            <span className="font-cursive-hollow text-5xl sm:text-7xl md:text-8xl inline-block mt-2">
              Three-Dimensional Space.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Eliminate bulky runtime agent daemons. Probe microsecond endpoint latencies, 5xx outages, and quantum compute topologies in real-time WebGL space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demo-live"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 font-semibold shadow-md transition font-mono text-sm flex items-center justify-center gap-2"
            >
              <Zap size={16} /> Test Live Sandbox
            </a>

            <button
              onClick={copyCurl}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {copiedCode ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span className="truncate max-w-[240px]">curl -s https://devtelemetry.io/probe</span>
            </button>
          </div>
        </section>

        {/* Section 1: Live Interactive Product Demo (The Real Product) */}
        <section id="demo-live" className="scroll-mt-24">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Terminal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 pl-2 border-l border-slate-300 dark:border-slate-800">
                  edge-probe-cluster // live-stream
                </span>
              </div>

              {/* Stress Ingestion Trigger Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={triggerLatencySpike}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-mono hover:bg-amber-100 dark:hover:bg-amber-900/40 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play size={12} /> Inject Latency
                </button>
                <button
                  onClick={trigger500Outage}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-700/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-mono hover:bg-rose-100 dark:hover:bg-rose-900/40 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <AlertTriangle size={12} /> Force 500 Outage
                </button>
                <button
                  onClick={resetAll}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw size={12} className={isInjectingProbe ? 'animate-spin' : ''} /> Reset
                </button>
              </div>
            </div>

            {/* Split Console Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
              
              {/* Left Column: Monitored Endpoints List */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Observed Targets ({endpoints.length})
                </p>
                {endpoints.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setSelectedEndpointId(ep.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      selectedEndpointId === ep.id
                        ? 'border-blue-500/60 bg-blue-500/5 dark:bg-blue-500/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          ep.method === 'POST'
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                            : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
                        }`}>
                          {ep.method}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{ep.name}</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500">{ep.path}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        ep.status === 200
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                      }`}>
                        {ep.status === 200 ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                        {ep.status}
                      </span>
                      <p className={`text-[11px] font-mono ${ep.latency > 300 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'}`}>
                        {ep.latency}ms
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Deep Inspector Panel */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                        <Server size={14} className="text-blue-500" />
                        {activeEndpoint.path}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Region: <span className="font-mono text-slate-700 dark:text-slate-300">{activeEndpoint.region}</span> | Payload: <span className="font-mono text-slate-700 dark:text-slate-300">{activeEndpoint.payload}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">RTT Latency</p>
                      <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{activeEndpoint.latency} ms</p>
                    </div>
                  </div>

                  {/* Latency History Waveform */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs text-slate-500 font-mono mb-2">
                      <span>Latency History (Last 6 Probes)</span>
                      <span>SLA: &lt;100ms</span>
                    </div>
                    <div className="h-20 w-full flex items-end gap-2 bg-slate-100 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      {activeEndpoint.history.map((val, idx) => {
                        const heightPct = Math.min(100, Math.max(15, (val / 900) * 100));
                        const isHigh = val > 300;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-sm transition-all duration-300 ${
                                isHigh ? 'bg-amber-500' : 'bg-blue-500'
                              }`}
                            ></div>
                            <span className="text-[9px] font-mono text-slate-400">{val}m</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Realtime Event Stream */}
                  <div className="mt-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Terminal size={12} /> Live Audit Log
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1.5">
                      {eventLogs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                          <span className="text-slate-400 dark:text-slate-500">[{log.time}]</span>
                          <span className="truncate max-w-[200px] sm:max-w-xs">{log.msg}</span>
                          <span className={log.status === '200 OK' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Synthetics Active
                  </span>
                  <span>Zero Memory Overhead</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: 3D Quantum Topology & WebGL Engine */}
        <section id="3d-core" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              Interactive 3D WebGL Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Hardware-accelerated vertex shaders dynamically reacting to network entropy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* 3D Canvas */}
            <div className="lg:col-span-8 space-y-4">
              <NeuralCanvas loadFactor={loadFactor} isWarped={isWarped} topology={topology} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                    <TrendingUp size={12} className="text-blue-500" /> Token Velocity
                  </p>
                  <p className="text-base font-mono font-bold dark:text-white text-slate-900 mt-1">{tps} <span className="text-xs text-slate-400 font-normal">tps</span></p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                    <Activity size={12} className="text-indigo-500" /> Edge Latency
                  </p>
                  <p className="text-base font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">{latency} <span className="text-xs text-slate-400 font-normal">ms</span></p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                    <Disc size={12} className="text-slate-400" /> Mesh Geometry
                  </p>
                  <p className="text-base font-mono font-bold dark:text-white text-slate-900 mt-1 capitalize">{topology}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                    <ShieldCheck size={12} className={isWarped ? "text-rose-500" : "text-emerald-500"} /> Core Health
                  </p>
                  <p className={`text-base font-mono font-bold mt-1 ${isWarped ? "text-rose-500" : "text-emerald-500"}`}>
                    {isWarped ? "OVERLOAD" : "NOMINAL"}
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Controls */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <Sliders size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">Shader Controls</h3>
                      <p className="text-[11px] text-slate-500">Parametric Modulation</p>
                    </div>
                  </div>
                </div>

                {/* Topology Switching */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-700 dark:text-slate-300">Topology Shape</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTopology('sphere')}
                      className={`py-2 px-3 rounded-lg font-mono text-xs border transition flex items-center justify-center gap-2 cursor-pointer ${
                        topology === 'sphere'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Boxes size={14} /> Quantum Sphere
                    </button>

                    <button
                      onClick={() => setTopology('knot')}
                      className={`py-2 px-3 rounded-lg font-mono text-xs border transition flex items-center justify-center gap-2 cursor-pointer ${
                        topology === 'knot'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Disc size={14} /> Torus Knot
                    </button>
                  </div>
                </div>

                {/* Tensor Load Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5"><Zap size={13} className="text-blue-500" /> Tensor Load</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">{loadFactor}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={loadFactor}
                    onChange={(e) => setLoadFactor(Number(e.target.value))}
                    className="w-full accent-blue-600 bg-slate-200 dark:bg-slate-950 h-2 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-800"
                  />
                </div>

                {/* Stress Inject Action */}
                <button
                  onClick={trigger3DOverload}
                  disabled={isWarped}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 text-white text-xs font-mono font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Flame size={16} /> Inject Matrix Overload Stress
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Architecture Pillars */}
        <section id="architecture" className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold font-mono text-slate-900 dark:text-white">Architectural Principles</h2>
            <p className="text-xs text-slate-500 mt-1">Direct deterministic telemetry without marketing noise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 w-fit mb-4">
                <Layers size={22} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 font-mono flex items-center justify-between">
                <span>Agentless External Ingestion</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Health probes fire externally from multi-region cloud edge zones without injecting heavy daemon binaries or intrusive packages into your codebase.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl">
              <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 w-fit mb-4">
                <Sparkles size={22} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 font-mono flex items-center justify-between">
                <span>Zero Payload Leakage</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stateless inspections ensure customer cookies, authorization tokens, and private database payloads are never recorded or stored.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 w-fit mb-4">
                <Code2 size={22} />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 font-mono flex items-center justify-between">
                <span>WebGL 3D Topology</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct Three.js parametric mesh and particle rendering running asynchronously on the GPU without blocking the React state thread.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 DevTelemetry // Crafted for Acdyon Technologies Frontend Challenge.</p>
          <p className="text-slate-600 dark:text-slate-400">Bonus Keybind: Press ↑ ↑ ↓ ↓ ← → ← → B A on keyboard.</p>
        </div>
      </footer>
    </div>
  );
}