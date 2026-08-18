import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate deterministic particle field positions once outside render
const PARTICLE_COUNT = 800;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const PARTICLE_RANDOMS = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Deterministic spherical distribution using Fibonacci lattice / math
  const u = (i + 0.5) / PARTICLE_COUNT;
  const phi = Math.acos(1 - 2 * u);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const radius = 3.6 + ((i * 37) % 100) / 40; // Deterministic radius variance

  PARTICLE_POSITIONS[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  PARTICLE_POSITIONS[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  PARTICLE_POSITIONS[i * 3 + 2] = radius * Math.cos(phi);
  PARTICLE_RANDOMS[i] = ((i * 73) % 100) / 100;
}

// Particle Galaxy Cloud
function ParticleMatrix({ isWarped }) {
  const pointsRef = useRef();

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const colorA = new THREE.Color(isWarped ? "#f43f5e" : "#06b6d4");
    const colorB = new THREE.Color("#6366f1");

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
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x -= delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={PARTICLE_POSITIONS} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Orbital Telemetry Ring
function OrbitalRing({ radius, speed, color, tilt = 0 }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
      ringRef.current.rotation.x += delta * (speed * 0.5);
    }
  });

  return (
    <group rotation={[tilt, tilt * 0.5, 0]}>
      <Torus ref={ringRef} args={[radius, 0.012, 16, 100]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
          wireframe={true}
          transparent
          opacity={0.7}
        />
      </Torus>
    </group>
  );
}

// Quantum Holographic Core (Sphere Topology)
function QuantumSphere({ loadFactor, isWarped }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speedMult = isWarped ? 3.5 : 1 + (loadFactor / 60);
      meshRef.current.rotation.x += delta * 0.3 * speedMult;
      meshRef.current.rotation.y += delta * 0.45 * speedMult;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.4} floatIntensity={1.8}>
      <Sphere ref={meshRef} args={[1.75, 64, 64]} scale={1.15}>
        <MeshDistortMaterial
          color={isWarped ? "#f43f5e" : "#22d3ee"}
          attach="material"
          distort={isWarped ? 0.95 : 0.32 + (loadFactor / 220)}
          speed={isWarped ? 6.0 : 2.5}
          roughness={0.1}
          metalness={0.95}
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
      knotRef.current.rotation.x += delta * 0.5 * (1 + loadFactor / 50);
      knotRef.current.rotation.y += delta * 0.7 * (1 + loadFactor / 50);
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.6} floatIntensity={2}>
      <mesh ref={knotRef} scale={1.1}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        <MeshWobbleMaterial
          color={isWarped ? "#fb7185" : "#818cf8"}
          attach="material"
          factor={isWarped ? 1.2 : 0.4 + loadFactor / 200}
          speed={isWarped ? 7.0 : 3.0}
          wireframe={true}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Inner Singularity
function SingularityCore({ isWarped }) {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.8;
      coreRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <Sphere ref={coreRef} args={[0.75, 32, 32]}>
      <meshStandardMaterial
        color={isWarped ? "#e11d48" : "#4f46e5"}
        emissive={isWarped ? "#ff0055" : "#3b82f6"}
        emissiveIntensity={isWarped ? 3.0 : 2.0}
        wireframe={false}
        roughness={0.2}
      />
    </Sphere>
  );
}

export default function NeuralCanvas({ loadFactor, isWarped, topology = 'sphere' }) {
  return (
    <div className="w-full h-[460px] sm:h-[540px] cursor-grab active:cursor-grabbing relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl group">
      
      {/* HUD Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/30 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>WebGL 2.0 // Interactive 3D Hologram</span>
        </div>

        <div className="font-mono text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md hidden sm:block">
          FPS: 60 • Orbit: Drag • Zoom: Scroll
        </div>
      </div>

      {/* 3D Canvas Context */}
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }} className="w-full h-full">
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[-10, -10, -5]} intensity={2.5} color="#ec4899" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#818cf8" />

        {/* Ambient Space Particles */}
        <ParticleMatrix isWarped={isWarped} />

        {/* Outer Orbital Telemetry Rings */}
        <OrbitalRing radius={2.6} speed={0.4} color={isWarped ? "#fb7185" : "#22d3ee"} tilt={0.8} />
        <OrbitalRing radius={2.9} speed={-0.3} color={isWarped ? "#e11d48" : "#818cf8"} tilt={-0.6} />

        {/* Chosen Dynamic Topology */}
        {topology === 'knot' ? (
          <TorusTopology loadFactor={loadFactor} isWarped={isWarped} />
        ) : (
          <QuantumSphere loadFactor={loadFactor} isWarped={isWarped} />
        )}

        {/* Center Glowing Singularity */}
        <SingularityCore isWarped={isWarped} />

        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={isWarped ? 2.5 : 0.8} />
      </Canvas>

      {/* Cyber Grid Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-950/80"></div>
    </div>
  );
}