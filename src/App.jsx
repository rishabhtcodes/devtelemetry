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

// Central theme tokens — derive all colors from darkMode boolean
function useTheme(darkMode) {
  return {
    bg: darkMode ? '#0b0f19' : '#f8faff',
    text: darkMode ? '#f1f5f9' : '#0f172a',
    subtext: darkMode ? '#94a3b8' : '#475569',
    muted: darkMode ? '#64748b' : '#94a3b8',
    card: darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200',
    cardSolid: darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    cardInner: darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200',
    header: darkMode ? 'bg-[#0b0f19]/85 border-slate-800/80' : 'bg-white/92 border-slate-200/80 shadow-sm',
    divide: darkMode ? 'divide-slate-800' : 'divide-slate-200',
    border: darkMode ? 'border-slate-800' : 'border-slate-200',
    borderTop: darkMode ? 'border-t border-slate-800' : 'border-t border-slate-200',
    label: darkMode ? 'text-slate-400' : 'text-slate-500',
    heading: darkMode ? 'text-white' : 'text-slate-900',
    bodyText: darkMode ? 'text-slate-300' : 'text-slate-600',
  };
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loadFactor, setLoadFactor] = useState(45);
  const [topology, setTopology] = useState('sphere');
  const [isWarped, setIsWarped] = useState(false);
  const [tps, setTps] = useState(1840);
  const [latency, setLatency] = useState(14.2);
  const [endpoints, setEndpoints] = useState(INITIAL_ENDPOINTS);
  const [selectedEndpointId, setSelectedEndpointId] = useState(1);
  const [isInjectingProbe, setIsInjectingProbe] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: '00:04:12', msg: 'Probe TLS handshake verified (TLS 1.3)', status: '200 OK', region: 'iad-1' },
    { id: 2, time: '00:04:14', msg: 'Zero-daemon HTTP status audit completed', status: '200 OK', region: 'fra-1' },
    { id: 3, time: '00:04:18', msg: 'Synthetic latency baseline within p95 SLA', status: '200 OK', region: 'sfo-1' },
  ]);

  const t = useTheme(darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Konami Code Easter Egg
  useEffect(() => {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === sequence[idx]) { idx++; if (idx === sequence.length) { setEasterEggActive(true); idx = 0; setTimeout(() => setEasterEggActive(false), 5500); } }
      else idx = 0;
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeEndpoint = useMemo(
    () => endpoints.find((e) => e.id === selectedEndpointId) || endpoints[0],
    [endpoints, selectedEndpointId]
  );

  const triggerLatencySpike = () => {
    setIsInjectingProbe(true);
    const spikeValue = 890;
    setEndpoints((prev) => prev.map((ep) => ep.id === selectedEndpointId ? { ...ep, latency: spikeValue, history: [...ep.history.slice(1), spikeValue] } : ep));
    setEventLogs((prev) => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `SLA Breached: High latency on ${activeEndpoint.path} (>500ms)`, status: 'DEGRADED', region: activeEndpoint.region }, ...prev.slice(0, 4)]);
    setTimeout(() => setIsInjectingProbe(false), 450);
  };

  const trigger500Outage = () => {
    setIsInjectingProbe(true);
    setEndpoints((prev) => prev.map((ep) => ep.id === selectedEndpointId ? { ...ep, status: 500, latency: 12, history: [...ep.history.slice(1), 12] } : ep));
    setEventLogs((prev) => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `CRITICAL: 500 Internal Server Error detected on ${activeEndpoint.path}`, status: 'DOWN', region: activeEndpoint.region }, ...prev.slice(0, 4)]);
    setTimeout(() => setIsInjectingProbe(false), 450);
  };

  const trigger3DOverload = () => {
    setIsWarped(true); setLoadFactor(100); setTps(5680); setLatency(186.4);
    setTimeout(() => { setIsWarped(false); setLoadFactor(45); setTps(1840); setLatency(14.2); }, 4500);
  };

  const resetAll = () => {
    setIsInjectingProbe(true); setIsWarped(false); setLoadFactor(45); setTopology('sphere'); setTps(1840); setLatency(14.2);
    setEndpoints(INITIAL_ENDPOINTS);
    setEventLogs([{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Telemetry probe pipeline re-synchronized to edge mesh', status: '200 OK', region: 'cluster-all' }]);
    setTimeout(() => setIsInjectingProbe(false), 300);
  };

  const copyCurl = () => {
    navigator.clipboard?.writeText('curl -s https://devtelemetry.io/v1/ping/sandbox -H "X-Probe-Key: live_demo"');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="min-h-screen font-sans relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300"
      style={{ background: t.bg, color: t.text }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full blur-[160px] pointer-events-none transition-all duration-500"
        style={{ background: darkMode ? 'rgba(59,130,246,0.09)' : 'rgba(99,102,241,0.07)' }}
      />
      <div
        className="absolute top-[60%] right-0 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: darkMode ? 'rgba(99,102,241,0.05)' : 'rgba(59,130,246,0.06)' }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: darkMode
            ? 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)'
            : 'radial-gradient(rgba(15,23,42,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%)',
        }}
      />

      {/* Easter Egg Toast */}
      {easterEggActive && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-xl text-white max-w-[320px]">
          <Terminal className="text-blue-400 shrink-0" size={20} />
          <div>
            <p className="text-xs font-mono font-bold text-blue-400">BONUS PROTOCOL UNLOCKED</p>
            <p className="text-[11px] text-slate-300">Konami Sequence verified: Root compute telemetry active.</p>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${t.header}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 shadow-sm">
              <Cpu size={17} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight font-mono text-sm sm:text-base" style={{ color: t.heading }}>
                  DevTelemetry
                </span>
                <span
                  className="hidden sm:inline text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-md border"
                  style={{ background: darkMode ? '#1e293b' : '#f1f5f9', color: t.subtext, borderColor: darkMode ? '#334155' : '#e2e8f0' }}
                >
                  Agentless Edge
                </span>
              </div>
            </div>
          </div>

          {/* Nav links + actions */}
          <nav className="flex items-center gap-2 sm:gap-5">
            <a href="#demo-live" className="hidden sm:block text-sm font-medium transition hover:opacity-80" style={{ color: t.subtext }}>
              Live Sandbox
            </a>
            <a href="#3d-core" className="hidden md:block text-sm font-medium transition hover:opacity-80" style={{ color: t.subtext }}>
              3D Engine
            </a>
            <a href="#architecture" className="hidden lg:block text-sm font-medium transition hover:opacity-80" style={{ color: t.subtext }}>
              Architecture
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border transition cursor-pointer hover:opacity-80"
              style={{ background: darkMode ? '#1e293b' : '#f1f5f9', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext }}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/rishabhtcodes/devtelemetry"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition hover:opacity-80 shadow-sm"
              style={{ background: darkMode ? '#0f172a' : '#ffffff', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 sm:py-16 space-y-16 sm:space-y-24">

        {/* ── HERO ── */}
        <section className="text-center max-w-4xl mx-auto">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border mb-6 backdrop-blur-md shadow-sm"
            style={{ background: darkMode ? 'rgba(30,41,59,0.8)' : 'rgba(241,245,249,0.9)', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext }}
          >
            <Radio size={12} className="text-blue-500" />
            <span>Deterministic Edge Observability • Zero Daemons</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.15]" style={{ color: t.heading }}>
            Visualizing Intelligence in <br />
            <span className="font-cursive-hollow text-5xl sm:text-7xl md:text-8xl inline-block mt-2">
              Three-Dimensional Space.
            </span>
          </h1>

          <p className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: t.bodyText }}>
            Eliminate bulky runtime agent daemons. Probe microsecond endpoint latencies, 5xx outages, and quantum compute topologies in real-time WebGL space.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="#demo-live"
              className="px-7 py-3.5 rounded-xl font-semibold shadow-lg transition font-mono text-sm flex items-center justify-center gap-2 text-white hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: darkMode ? '#2563eb' : '#0f172a' }}
            >
              <Zap size={16} /> Test Live Sandbox
            </a>
            <button
              onClick={copyCurl}
              className="px-5 py-3.5 rounded-xl border font-mono text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: darkMode ? '#0f172a' : '#ffffff', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext }}
            >
              {copiedCode ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span className="truncate max-w-[220px] sm:max-w-xs">curl -s https://devtelemetry.io/probe</span>
            </button>
          </div>
        </section>

        {/* ── LIVE DEMO ── */}
        <section id="demo-live" className="scroll-mt-24">
          <div
            className={`rounded-3xl border shadow-xl overflow-hidden ${t.card}`}
          >
            {/* Terminal header bar */}
            <div
              className={`px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${t.border}`}
              style={{ background: darkMode ? 'rgba(2,6,23,0.85)' : '#f8fafc' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono pl-2 border-l font-semibold" style={{ color: t.subtext, borderColor: darkMode ? '#334155' : '#cbd5e1' }}>
                  edge-probe-cluster // live-stream
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={triggerLatencySpike}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border"
                  style={{ background: darkMode ? 'rgba(120,53,15,0.3)' : '#fffbeb', borderColor: darkMode ? '#92400e' : '#fcd34d', color: darkMode ? '#fbbf24' : '#92400e' }}
                >
                  <Play size={11} /> Inject Latency
                </button>
                <button
                  onClick={trigger500Outage}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border"
                  style={{ background: darkMode ? 'rgba(127,29,29,0.3)' : '#fff1f2', borderColor: darkMode ? '#991b1b' : '#fca5a5', color: darkMode ? '#f87171' : '#b91c1c' }}
                >
                  <AlertTriangle size={11} /> Force 500 Outage
                </button>
                <button
                  onClick={resetAll}
                  disabled={isInjectingProbe}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border"
                  style={{ background: darkMode ? '#1e293b' : '#f1f5f9', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext }}
                >
                  <RotateCcw size={11} className={isInjectingProbe ? 'animate-spin' : ''} /> Reset
                </button>
              </div>
            </div>

            {/* Console grid */}
            <div className={`grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x ${t.divide}`}>

              {/* Left: Endpoint list */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider font-semibold mb-3" style={{ color: t.muted }}>
                  Observed Targets ({endpoints.length})
                </p>
                {endpoints.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setSelectedEndpointId(ep.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedEndpointId === ep.id ? 'border-blue-500' : ''
                    }`}
                    style={{
                      background: selectedEndpointId === ep.id
                        ? darkMode ? 'rgba(30,58,138,0.25)' : 'rgba(239,246,255,0.9)'
                        : darkMode ? 'rgba(15,23,42,0.5)' : 'rgba(248,250,252,0.8)',
                      borderColor: selectedEndpointId === ep.id ? '#3b82f6' : darkMode ? '#1e293b' : '#e2e8f0',
                      boxShadow: selectedEndpointId === ep.id ? '0 0 0 1px rgba(59,130,246,0.2)' : 'none',
                    }}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 border"
                          style={ep.method === 'POST'
                            ? { background: darkMode ? '#1e293b' : '#f1f5f9', color: darkMode ? '#cbd5e1' : '#475569', borderColor: darkMode ? '#334155' : '#e2e8f0' }
                            : { background: darkMode ? 'rgba(30,58,138,0.3)' : '#eff6ff', color: darkMode ? '#93c5fd' : '#1d4ed8', borderColor: darkMode ? '#1e3a8a' : '#bfdbfe' }
                          }
                        >
                          {ep.method}
                        </span>
                        <span className="text-xs font-semibold truncate" style={{ color: t.heading }}>{ep.name}</span>
                      </div>
                      <p className="text-[11px] font-mono truncate" style={{ color: t.muted }}>{ep.path}</p>
                    </div>

                    <div className="text-right space-y-1 shrink-0 ml-2">
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                        style={ep.status === 200
                          ? { background: darkMode ? 'rgba(5,46,22,0.6)' : '#f0fdf4', color: darkMode ? '#6ee7b7' : '#15803d', borderColor: darkMode ? '#166534' : '#bbf7d0' }
                          : { background: darkMode ? 'rgba(69,10,10,0.6)' : '#fff1f2', color: darkMode ? '#fca5a5' : '#b91c1c', borderColor: darkMode ? '#7f1d1d' : '#fca5a5' }
                        }
                      >
                        {ep.status === 200 ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                        {ep.status}
                      </span>
                      <p
                        className="text-[11px] font-mono font-medium"
                        style={{ color: ep.latency > 300 ? '#f59e0b' : t.muted }}
                      >
                        {ep.latency}ms
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: Inspector panel */}
              <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-start justify-between pb-4 border-b gap-4" style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold font-mono flex items-center gap-2 truncate" style={{ color: t.heading }}>
                        <Server size={13} className="text-blue-500 shrink-0" />
                        {activeEndpoint.path}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: t.label }}>
                        Region: <span className="font-mono font-medium" style={{ color: t.heading }}>{activeEndpoint.region}</span>
                        {' '}| Payload: <span className="font-mono font-medium" style={{ color: t.heading }}>{activeEndpoint.payload}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs" style={{ color: t.muted }}>RTT Latency</p>
                      <p className="text-lg font-mono font-bold text-blue-500">{activeEndpoint.latency} ms</p>
                    </div>
                  </div>

                  {/* Latency waveform */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-mono mb-2" style={{ color: t.label }}>
                      <span>Latency History (Last 6 Probes)</span>
                      <span>SLA: &lt;100ms</span>
                    </div>
                    <div
                      className="h-20 w-full flex items-end gap-1.5 p-3 rounded-xl border"
                      style={{ background: darkMode ? 'rgba(2,6,23,0.6)' : '#f8fafc', borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
                    >
                      {activeEndpoint.history.map((val, idx) => {
                        const heightPct = Math.min(100, Math.max(15, (val / 900) * 100));
                        const isHigh = val > 300;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                            <div
                              style={{ height: `${heightPct}%`, background: isHigh ? '#f59e0b' : '#3b82f6' }}
                              className="w-full rounded-sm transition-all duration-300"
                            />
                            <span className="text-[9px] font-mono" style={{ color: t.muted }}>{val}m</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live audit log */}
                  <div className="mt-5">
                    <p className="text-xs font-mono uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5" style={{ color: t.label }}>
                      <Terminal size={11} /> Live Audit Log
                    </p>
                    <div
                      className="p-3 rounded-xl border font-mono text-[11px] space-y-2"
                      style={{ background: darkMode ? '#020617' : '#f8fafc', borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
                    >
                      {eventLogs.map((log) => (
                        <div key={log.id} className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span className="shrink-0" style={{ color: t.muted }}>[{log.time}]</span>
                          <span className="truncate flex-1" style={{ color: t.subtext }}>{log.msg}</span>
                          <span
                            className="shrink-0 font-semibold"
                            style={{ color: log.status === '200 OK' ? (darkMode ? '#34d399' : '#15803d') : (darkMode ? '#f87171' : '#b91c1c') }}
                          >
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-4 border-t" style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0', color: t.muted }}>
                  <span className="flex items-center gap-1.5" style={{ color: darkMode ? '#34d399' : '#15803d' }}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Synthetics Active
                  </span>
                  <span>Zero Memory Overhead</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3D ENGINE ── */}
        <section id="3d-core" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: t.heading }}>
              Interactive 3D WebGL Engine
            </h2>
            <p className="text-xs sm:text-sm mt-2" style={{ color: t.bodyText }}>
              Hardware-accelerated vertex shaders dynamically reacting to network entropy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Canvas + stats */}
            <div className="lg:col-span-8 space-y-4">
              <NeuralCanvas loadFactor={loadFactor} isWarped={isWarped} topology={topology} darkMode={darkMode} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <TrendingUp size={11} className="text-blue-500" />, label: 'Token Velocity', value: tps, unit: 'tps', color: t.heading },
                  { icon: <Activity size={11} className="text-indigo-500" />, label: 'Edge Latency', value: latency, unit: 'ms', color: '#3b82f6' },
                  { icon: <Disc size={11} style={{ color: t.muted }} />, label: 'Mesh Geometry', value: topology, unit: '', color: t.heading, capitalize: true },
                  { icon: <ShieldCheck size={11} className={isWarped ? 'text-rose-500' : 'text-emerald-500'} />, label: 'Core Health', value: isWarped ? 'OVERLOAD' : 'NOMINAL', unit: '', color: isWarped ? '#ef4444' : (darkMode ? '#34d399' : '#15803d') },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border shadow-sm"
                    style={{ background: darkMode ? 'rgba(15,23,42,0.7)' : '#ffffff', borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
                  >
                    <p className="text-[10px] font-mono uppercase flex items-center gap-1 mb-1" style={{ color: t.muted }}>
                      {stat.icon} {stat.label}
                    </p>
                    <p className="text-base font-mono font-bold" style={{ color: stat.color }}>
                      {stat.value}{stat.unit && <span className="text-xs font-normal ml-1" style={{ color: t.muted }}>{stat.unit}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls panel */}
            <div className="lg:col-span-4">
              <div
                className="p-5 sm:p-6 rounded-2xl border shadow-md space-y-6"
                style={{ background: darkMode ? 'rgba(15,23,42,0.85)' : '#ffffff', borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
              >
                <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Sliders size={15} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-mono" style={{ color: t.heading }}>Shader Controls</h3>
                    <p className="text-[11px]" style={{ color: t.muted }}>Parametric Modulation</p>
                  </div>
                </div>

                {/* Topology selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold" style={{ color: t.subtext }}>Topology Shape</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'sphere', label: 'Quantum Sphere', icon: <Boxes size={13} /> },
                      { key: 'knot', label: 'Torus Knot', icon: <Disc size={13} /> },
                    ].map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => setTopology(key)}
                        className="py-2 px-3 rounded-lg font-mono text-xs border transition flex items-center justify-center gap-1.5 cursor-pointer"
                        style={topology === key
                          ? { background: darkMode ? 'rgba(37,99,235,0.2)' : '#eff6ff', borderColor: '#3b82f6', color: darkMode ? '#93c5fd' : '#1d4ed8', fontWeight: 600 }
                          : { background: darkMode ? 'rgba(2,6,23,0.5)' : '#f8fafc', borderColor: darkMode ? '#1e293b' : '#e2e8f0', color: t.muted }
                        }
                      >
                        {icon} {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tensor load slider */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono" style={{ color: t.subtext }}>
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-blue-500" /> Tensor Load</span>
                    <span className="text-blue-500 font-bold">{loadFactor}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={loadFactor}
                    onChange={(e) => setLoadFactor(Number(e.target.value))}
                    className="w-full h-2 rounded-lg cursor-pointer accent-blue-500"
                    style={{ background: darkMode ? '#0f172a' : '#e2e8f0' }}
                  />
                </div>

                {/* Overload button */}
                <button
                  onClick={trigger3DOverload}
                  disabled={isWarped}
                  className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 text-white hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: darkMode ? '#dc2626' : '#0f172a' }}
                >
                  <Flame size={15} /> Inject Matrix Overload Stress
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE ── */}
        <section id="architecture" className="scroll-mt-24 pt-8 border-t" style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: t.heading }}>Architectural Principles</h2>
            <p className="text-xs sm:text-sm mt-2" style={{ color: t.bodyText }}>Direct deterministic telemetry without marketing noise.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: <Layers size={20} />,
                iconStyle: { background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.25)', color: '#3b82f6' },
                title: 'Agentless External Ingestion',
                body: 'Health probes fire externally from multi-region cloud edge zones without injecting heavy daemon binaries or intrusive packages into your codebase.',
              },
              {
                icon: <Sparkles size={20} />,
                iconStyle: { background: darkMode ? '#1e293b' : '#f1f5f9', borderColor: darkMode ? '#334155' : '#e2e8f0', color: t.subtext },
                title: 'Zero Payload Leakage',
                body: 'Stateless inspections ensure customer cookies, authorization tokens, and private database payloads are never recorded or stored.',
              },
              {
                icon: <Code2 size={20} />,
                iconStyle: { background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', color: '#6366f1' },
                title: 'WebGL 3D Topology',
                body: 'Direct Three.js parametric mesh and particle rendering running asynchronously on the GPU without blocking the React state thread.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border shadow-sm backdrop-blur-sm transition hover:scale-[1.01]"
                style={{ background: darkMode ? 'rgba(15,23,42,0.6)' : '#ffffff', borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
              >
                <div className="p-3 rounded-xl border w-fit mb-4" style={card.iconStyle}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-base font-mono mb-2 flex items-center justify-between" style={{ color: t.heading }}>
                  <span>{card.title}</span>
                  <ArrowUpRight size={14} style={{ color: t.muted }} />
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: t.bodyText }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-8 text-center text-xs font-mono transition-colors"
        style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0', background: darkMode ? '#020617' : '#ffffff', color: t.muted }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 DevTelemetry // Crafted for Acdyon Technologies Frontend Challenge.</p>
          <p style={{ color: t.label }}>Bonus: Press ↑ ↑ ↓ ↓ ← → ← → B A</p>
        </div>
      </footer>
    </div>
  );
}