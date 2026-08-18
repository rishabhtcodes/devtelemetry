import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

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
function ParticleMatrix({ isWarped }) {
  const pointsRef = useRef();

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const colorA = new THREE.Color(isWarped ? "#f87171" : "#94a3b8");
    const colorB = new THREE.Color(isWarped ? "#ef4444" : "#cbd5e1");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const mixedColor = colorA.clone().lerp(colorB, PARTICLE_RANDOMS[i]);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return col;
  }, [isWarped]);

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
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
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
          opacity={0.45}
          roughness={0.4}
        />
      </Torus>
    </group>
  );
}

// Elegant Wireframe Core (Sphere Topology)
function QuantumSphere({ loadFactor, isWarped }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speedMult = isWarped ? 2.5 : 0.8 + (loadFactor / 100);
      meshRef.current.rotation.x += delta * 0.25 * speedMult;
      meshRef.current.rotation.y += delta * 0.35 * speedMult;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.7, 48, 48]} scale={1.1}>
        <MeshDistortMaterial
          color={isWarped ? "#f87171" : "#e2e8f0"}
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
function TorusTopology({ loadFactor, isWarped }) {
  const knotRef = useRef();

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.35 * (1 + loadFactor / 90);
      knotRef.current.rotation.y += delta * 0.45 * (1 + loadFactor / 90);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.9} floatIntensity={1.3}>
      <mesh ref={knotRef} scale={1.05}>
        <torusKnotGeometry args={[1.15, 0.3, 100, 24]} />
        <MeshWobbleMaterial
          color={isWarped ? "#f87171" : "#cbd5e1"}
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
function SingularityCore({ isWarped }) {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <Sphere ref={coreRef} args={[0.7, 32, 32]}>
      <meshStandardMaterial
        color={isWarped ? "#dc2626" : "#334155"}
        wireframe={false}
        roughness={0.4}
        metalness={0.7}
      />
    </Sphere>
  );
}

export default function NeuralCanvas({ loadFactor, isWarped, topology = 'sphere' }) {
  return (
    <div className="w-full h-[460px] sm:h-[520px] cursor-grab active:cursor-grabbing relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-900/60 dark:bg-slate-950/80 shadow-lg group transition">
      
      {/* HUD Top Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700/80 backdrop-blur-md shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isWarped ? 'bg-rose-400' : 'bg-blue-400'} animate-pulse`}></span>
          <span>GPU Compute Viewport • Interactive</span>
        </div>

        <div className="font-mono text-[10px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md hidden sm:block">
          Drag: Orbit • Scroll: Zoom
        </div>
      </div>

      {/* Clean Studio Lighting Context */}
      <Canvas camera={{ position: [0, 0, 5.0], fov: 46 }} className="w-full h-full">
        {/* Soft, warm & cool key lights (Studio photography lighting style) */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#f8fafc" />
        <directionalLight position={[-6, -4, -3]} intensity={0.6} color="#94a3b8" />

        {/* Ambient Subtle Particles */}
        <ParticleMatrix isWarped={isWarped} />

        {/* Outer Orbital Telemetry Rings */}
        <OrbitalRing radius={2.5} speed={0.25} color={isWarped ? "#fca5a5" : "#64748b"} tilt={0.6} />
        <OrbitalRing radius={2.8} speed={-0.2} color={isWarped ? "#f87171" : "#475569"} tilt={-0.5} />

        {/* Chosen Dynamic Topology */}
        {topology === 'knot' ? (
          <TorusTopology loadFactor={loadFactor} isWarped={isWarped} />
        ) : (
          <QuantumSphere loadFactor={loadFactor} isWarped={isWarped} />
        )}

        {/* Center Core */}
        <SingularityCore isWarped={isWarped} />

        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={isWarped ? 1.8 : 0.6} />
      </Canvas>
    </div>
  );
}
