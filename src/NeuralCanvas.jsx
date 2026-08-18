import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Reactively updates WebGL clear color when darkMode/isWarped changes
function CanvasBackground({ darkMode, isWarped }) {
  const { gl } = useThree();
  useEffect(() => {
    let color;
    if (isWarped) color = '#080010';
    else if (darkMode) color = '#080e1c';
    else color = '#0d1117'; // deep graphite (GitHub dark) for light mode canvas
    gl.setClearColor(color, 1);
  }, [gl, darkMode, isWarped]);
  return null;
}

// Generate deterministic subtle particle field positions once outside render
const PARTICLE_COUNT = 450;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const PARTICLE_RANDOMS = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const u = (i + 0.5) / PARTICLE_COUNT;
  const phi = Math.acos(1 - 2 * u);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const radius = 3.2 + ((i * 37) % 100) / 45;

  PARTICLE_POSITIONS[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  PARTICLE_POSITIONS[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  PARTICLE_POSITIONS[i * 3 + 2] = radius * Math.cos(phi);
  PARTICLE_RANDOMS[i] = ((i * 73) % 100) / 100;
}

// Minimalist Refined Particle Constellation
function ParticleMatrix({ isWarped, darkMode }) {
  const pointsRef = useRef();

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    let colorA, colorB;
    if (isWarped) {
      colorA = new THREE.Color('#f87171');
      colorB = new THREE.Color('#ef4444');
    } else if (darkMode) {
      colorA = new THREE.Color('#94a3b8');
      colorB = new THREE.Color('#cbd5e1');
    } else {
      // Light mode: muted steel-blue particles (less saturated)
      colorA = new THREE.Color('#6895c8');
      colorB = new THREE.Color('#7b7ec4');
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mixedColor = colorA.clone().lerp(colorB, PARTICLE_RANDOMS[i]);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return col;
  }, [isWarped, darkMode]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={PARTICLE_POSITIONS} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.028}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={darkMode ? 0.65 : 0.55}
      />
    </Points>
  );
}

// Clean Enterprise Telemetry Orbital Ring
function OrbitalRing({ radius, speed, color, tilt = 0 }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
      ringRef.current.rotation.x += delta * (speed * 0.4);
    }
  });

  return (
    <group rotation={[tilt, tilt * 0.4, 0]}>
      <Torus ref={ringRef} args={[radius, 0.008, 16, 120]}>
        <meshStandardMaterial
          color={color}
          wireframe={false}
          transparent
          opacity={0.55}
          roughness={0.4}
        />
      </Torus>
    </group>
  );
}

// Elegant Wireframe Core (Sphere Topology)
function QuantumSphere({ loadFactor, isWarped, darkMode }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speedMult = isWarped ? 2.5 : 0.8 + (loadFactor / 100);
      meshRef.current.rotation.x += delta * 0.25 * speedMult;
      meshRef.current.rotation.y += delta * 0.35 * speedMult;
    }
  });

  // Light mode: muted steel-blue wireframe; dark mode: slate-white
  const meshColor = isWarped ? '#f87171' : (darkMode ? '#e2e8f0' : '#6895c8');

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.7, 48, 48]} scale={1.1}>
        <MeshDistortMaterial
          color={meshColor}
          attach="material"
          distort={isWarped ? 0.65 : 0.22 + (loadFactor / 350)}
          speed={isWarped ? 3.5 : 1.6}
          roughness={0.2}
          metalness={0.6}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

// Torus Knot Topology
function TorusTopology({ loadFactor, isWarped, darkMode }) {
  const knotRef = useRef();

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.35 * (1 + loadFactor / 90);
      knotRef.current.rotation.y += delta * 0.45 * (1 + loadFactor / 90);
    }
  });

  const meshColor = isWarped ? '#f87171' : (darkMode ? '#cbd5e1' : '#7b7ec4');

  return (
    <Float speed={2} rotationIntensity={0.9} floatIntensity={1.3}>
      <mesh ref={knotRef} scale={1.05}>
        <torusKnotGeometry args={[1.15, 0.3, 100, 24]} />
        <MeshWobbleMaterial
          color={meshColor}
          attach="material"
          factor={isWarped ? 0.8 : 0.25 + loadFactor / 300}
          speed={isWarped ? 4.0 : 1.8}
          wireframe={true}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

// Subtle Internal Core
function SingularityCore({ isWarped, darkMode }) {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.5;
    }
  });

  const coreColor = isWarped ? '#dc2626' : (darkMode ? '#334155' : '#2d4a82');

  return (
    <Sphere ref={coreRef} args={[0.7, 32, 32]}>
      <meshStandardMaterial
        color={coreColor}
        wireframe={false}
        roughness={0.4}
        metalness={0.7}
      />
    </Sphere>
  );
}

export default function NeuralCanvas({ loadFactor, isWarped, topology = 'sphere', darkMode = true }) {
  const ringColorA = isWarped ? '#fca5a5' : (darkMode ? '#64748b' : '#5a7ea8');
  const ringColorB = isWarped ? '#f87171' : (darkMode ? '#475569' : '#6a6aac');

  return (
    <div
      className="w-full h-[460px] sm:h-[520px] cursor-grab active:cursor-grabbing relative rounded-2xl overflow-hidden shadow-lg group transition"
      style={{ border: `1px solid ${darkMode ? '#1e293b' : '#1c2333'}` }}
    >
      
      {/* HUD Top Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className={`flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-lg border backdrop-blur-md shadow-sm ${
          darkMode
            ? 'text-slate-300 bg-slate-900/90 border-slate-700/80'
            : 'text-slate-700 bg-white/90 border-slate-300'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isWarped ? 'bg-rose-400' : 'bg-blue-500'} animate-pulse`}></span>
          <span>GPU Compute Viewport • Interactive</span>
        </div>

        <div className={`font-mono text-[10px] px-3 py-1.5 rounded-lg border backdrop-blur-md hidden sm:block ${
          darkMode
            ? 'text-slate-400 bg-slate-900/90 border-slate-800'
            : 'text-slate-500 bg-white/90 border-slate-300'
        }`}>
          Drag: Orbit • Scroll: Zoom
        </div>
      </div>

      {/* Canvas with reactive background updater */}
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 46 }}
        className="w-full h-full"
        gl={{ alpha: false }}
      >
        {/* Reactive background — updates on every darkMode toggle */}
        <CanvasBackground darkMode={darkMode} isWarped={isWarped} />

        {/* Adaptive Studio Lighting */}
        <ambientLight intensity={darkMode ? 0.9 : 1.6} />
        <directionalLight position={[6, 8, 5]} intensity={darkMode ? 1.5 : 2.2} color={darkMode ? '#f8fafc' : '#ffffff'} />
        <directionalLight position={[-6, -4, -3]} intensity={darkMode ? 0.6 : 1.0} color={darkMode ? '#94a3b8' : '#c7d2fe'} />

        {/* Ambient Subtle Particles */}
        <ParticleMatrix isWarped={isWarped} darkMode={darkMode} />

        {/* Outer Orbital Telemetry Rings */}
        <OrbitalRing radius={2.5} speed={0.25} color={ringColorA} tilt={0.6} />
        <OrbitalRing radius={2.8} speed={-0.2} color={ringColorB} tilt={-0.5} />

        {/* Chosen Dynamic Topology */}
        {topology === 'knot' ? (
          <TorusTopology loadFactor={loadFactor} isWarped={isWarped} darkMode={darkMode} />
        ) : (
          <QuantumSphere loadFactor={loadFactor} isWarped={isWarped} darkMode={darkMode} />
        )}

        {/* Center Core */}
        <SingularityCore isWarped={isWarped} darkMode={darkMode} />

        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={isWarped ? 1.8 : 0.6} />
      </Canvas>
    </div>
  );
}