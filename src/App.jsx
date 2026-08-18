import { useState, useEffect } from 'react';
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
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [loadFactor, setLoadFactor] = useState(48);
  const [topology, setTopology] = useState('sphere');
  const [isWarped, setIsWarped] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [tps, setTps] = useState(1840);
  const [latency, setLatency] = useState(14.2);
  const [activeTab, setActiveTab] = useState('live');

  // Konami Code Easter Egg Listener
  useEffect(() => {
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === sequence[idx]) {
        idx++;
        if (idx === sequence.length) {
          setEasterEggActive(true);
          idx = 0;
          setTimeout(() => setEasterEggActive(false), 5000);
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const triggerOverload = () => {
    setIsWarped(true);
    setLoadFactor(100);
    setTps(5280);
    setLatency(142.8);
    setTimeout(() => {
      setIsWarped(false);
      setLoadFactor(48);
      setTps(1840);
      setLatency(14.2);
    }, 4500);
  };

  const resetParams = () => {
    setIsWarped(false);
    setLoadFactor(48);
    setTopology('sphere');
    setTps(1840);
    setLatency(14.2);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[350px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Easter Egg Overlay Toast */}
      {easterEggActive && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/60 shadow-2xl shadow-cyan-500/30 flex items-center gap-3 animate-bounce backdrop-blur-xl">
          <Terminal className="text-cyan-400" size={22} />
          <div>
            <p className="text-xs font-mono font-bold text-cyan-300">EASTER EGG PROTOCOL UNLOCKED</p>
            <p className="text-[11px] text-slate-300">Konami Sequence verified: Hyper-compute shaders enabled.</p>
          </div>
        </div>
      )}

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white font-mono text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-200">
                  NeuralMesh
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
                  v3.0 Ultra
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">Hardware Accelerated Neural Substrate</p>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6">
            <div className="flex bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => setActiveTab('live')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'live' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                3D Viewport
              </button>
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'matrix' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Specs & Engine
              </button>
            </div>

            <a
              href="https://github.com/rishabhtcodes"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-xs font-mono font-medium text-slate-300 hover:border-slate-700 hover:text-white transition shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 sm:py-12">
        
        {/* Top Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 mb-5 backdrop-blur-md shadow-sm">
            <Radio size={13} className="animate-pulse text-cyan-400" />
            <span>Interactive WebGL 3D Quantum Topology</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.15]">
            Visualizing Intelligence in <br />
            <span className="font-cursive-hollow text-5xl sm:text-7xl md:text-8xl inline-block mt-2 transform -rotate-1 hover:rotate-0 transition duration-300">
              Three-Dimensional Space.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Direct GPU parametric mesh deformation. Inspect realtime cluster compute matrices, token speed, and stress warp mechanics in WebGL space.
          </p>
        </div>

        {/* 3D Showcase Split Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Center 3D WebGL Canvas Viewport */}
          <div className="lg:col-span-8 space-y-4">
            <NeuralCanvas loadFactor={loadFactor} isWarped={isWarped} topology={topology} />

            {/* Quick Canvas Actions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <TrendingUp size={12} className="text-cyan-400" /> Token Velocity
                </p>
                <p className="text-base sm:text-lg font-mono font-bold text-white mt-1">{tps} <span className="text-xs text-slate-400 font-normal">tps</span></p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <Activity size={12} className="text-indigo-400" /> Edge Latency
                </p>
                <p className="text-base sm:text-lg font-mono font-bold text-cyan-300 mt-1">{latency} <span className="text-xs text-slate-400 font-normal">ms</span></p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <Disc size={12} className="text-pink-400" /> Active Mesh
                </p>
                <p className="text-base sm:text-lg font-mono font-bold text-white mt-1 capitalize">{topology}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
                <p className="text-[10px] font-mono uppercase text-slate-500 flex items-center gap-1">
                  <ShieldCheck size={12} className={isWarped ? "text-rose-400" : "text-emerald-400"} /> Health
                </p>
                <p className={`text-base sm:text-lg font-mono font-bold mt-1 ${isWarped ? "text-rose-400" : "text-emerald-400"}`}>
                  {isWarped ? "STRESS" : "NOMINAL"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Control & Parameter Deck */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">Neural Control Hub</h3>
                    <p className="text-[11px] text-slate-400">Live Parametric Modulation</p>
                  </div>
                </div>

                <button
                  onClick={resetParams}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="Reset Parameters"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Topology Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Topology Geometry</span>
                  <span className="text-[10px] text-cyan-400 font-mono">3D Shader Model</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTopology('sphere')}
                    className={`py-2.5 px-3 rounded-xl font-mono text-xs border transition flex items-center justify-center gap-2 cursor-pointer ${
                      topology === 'sphere'
                        ? 'border-cyan-500/60 bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Boxes size={14} /> Quantum Sphere
                  </button>

                  <button
                    onClick={() => setTopology('knot')}
                    className={`py-2.5 px-3 rounded-xl font-mono text-xs border transition flex items-center justify-center gap-2 cursor-pointer ${
                      topology === 'knot'
                        ? 'border-indigo-500/60 bg-indigo-500/20 text-indigo-300 shadow-md shadow-indigo-500/10'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Disc size={14} /> Torus Knot
                  </button>
                </div>
              </div>

              {/* Tensor Load Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5"><Zap size={13} className="text-cyan-400" /> Tensor Mesh Distortion</span>
                  <span className="text-cyan-400 font-bold font-mono">{loadFactor}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={loadFactor}
                  onChange={(e) => setLoadFactor(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-950 h-2.5 rounded-lg cursor-pointer border border-slate-800"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10% (Low Noise)</span>
                  <span>100% (High Entropy)</span>
                </div>
              </div>

              {/* Stress Inject Action */}
              <div className="pt-2">
                <button
                  onClick={triggerOverload}
                  disabled={isWarped}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs font-mono font-bold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-rose-500/25 disabled:opacity-50"
                >
                  <Flame size={16} /> Inject Matrix Overload Stress
                </button>
              </div>

              {/* Live Shaders Telemetry Log */}
              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>GL Context</span>
                  <span className="text-cyan-400">WebGL 2.0 (Active)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shader Pass</span>
                  <span className="text-indigo-400">Additive Wireframe</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>FPS Buffer</span>
                  <span className="text-emerald-400">60.0 FPS Sync</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Grid / Architectural Pillars */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold font-mono text-white">Engine Architecture</h2>
            <p className="text-xs text-slate-400 mt-1">Built with WebGL, Three.js, React Fiber, and Tailwind CSS.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl hover:border-cyan-500/40 transition group">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition">
                <Layers size={22} />
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-mono flex items-center justify-between">
                <span>Multi-Layer Topology</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-cyan-400 transition" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamlessly renders nested outer orbital telemetry rings, particle cloud nebulae, and high-frequency inner cores.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl hover:border-indigo-500/40 transition group">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit mb-4 group-hover:scale-110 transition">
                <Sparkles size={22} />
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-mono flex items-center justify-between">
                <span>Particle Field Shaders</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400 transition" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware-accelerated additive blending point particles with dynamic spherical distribution and continuous rotational inertia.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl hover:border-pink-500/40 transition group">
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 w-fit mb-4 group-hover:scale-110 transition">
                <Terminal size={22} />
              </div>
              <h3 className="font-bold text-base text-white mb-2 font-mono flex items-center justify-between">
                <span>Real-Time Stress Sim</span>
                <ArrowUpRight size={14} className="text-slate-500 group-hover:text-pink-400 transition" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Triggers parametric deformation distortions and color shifts dynamically across materials during cluster stress.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Futuristic Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 NeuralMesh // 3D Quantum Telemetry Core.</p>
          <p className="text-slate-400">Bonus: Press ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard.</p>
        </div>
      </footer>
    </div>
  );
}