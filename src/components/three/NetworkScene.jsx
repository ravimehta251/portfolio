import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const services = [
  ['Gateway', [-2.6, 0.8, 0]], ['Spring', [-0.8, 1.5, -0.6]], ['Kafka', [1.2, 1, 0.3]],
  ['Redis', [2.5, -0.2, -0.5]], ['Postgres', [0.7, -1.4, 0.2]], ['WebSocket', [-1.8, -1, 0.5]],
];
const connections = [[0, 1], [1, 2], [2, 3], [1, 4], [1, 5], [5, 0], [3, 4]];

function Packet({ from, to, offset }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.12 + offset) % 1;
    ref.current.position.lerpVectors(new THREE.Vector3(...from), new THREE.Vector3(...to), t);
  });
  return <mesh ref={ref}><sphereGeometry args={[0.055, 10, 10]} /><meshBasicMaterial color="#67e8f9" /></mesh>;
}

function Network() {
  const group = useRef();
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.035 + pointer.x * 0.09;
    group.current.rotation.x = pointer.y * 0.05;
  });
  return (
    <group ref={group}>
      {connections.map(([a, b], i) => (
        <group key={`${a}-${b}`}>
          <Line points={[services[a][1], services[b][1]]} color="#2676d9" transparent opacity={0.35} lineWidth={0.6} />
          <Packet from={services[a][1]} to={services[b][1]} offset={i / connections.length} />
        </group>
      ))}
      {services.map(([name, position], index) => (
        <group position={position} key={name}>
          <mesh>
            <icosahedronGeometry args={[index === 1 ? 0.3 : 0.22, 1]} />
            <meshStandardMaterial color={index === 1 ? '#8b5cf6' : '#1d4ed8'} emissive={index === 1 ? '#6d28d9' : '#0e7490'} emissiveIntensity={1.2} roughness={0.35} />
          </mesh>
          <mesh scale={1.8}><sphereGeometry args={[0.28, 16, 16]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.035} /></mesh>
        </group>
      ))}
    </group>
  );
}

export default function NetworkScene() {
  const [visible, setVisible] = useState(true);
  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio, 1.5)], []);
  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
  return (
    <Canvas frameloop={visible ? 'always' : 'never'} dpr={dpr} camera={{ position: [0, 0, 6.7], fov: 44 }} gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}>
      <ambientLight intensity={0.45} /><pointLight position={[3, 3, 4]} intensity={10} color="#60a5fa" />
      <Network /><OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
