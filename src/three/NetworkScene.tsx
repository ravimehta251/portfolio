import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Html, Line, RoundedBox } from '@react-three/drei'
import { Group, Mesh, Vector3 } from 'three'

type Point = [number, number, number]
const nodes: { label: string; sub: string; position: Point; color: string }[] = [
  { label: 'API GATEWAY', sub: 'Spring Cloud', position: [0, 1.45, 0], color: '#f4a06f' },
  { label: 'SERVICES', sub: 'Spring Boot', position: [-2.15, 0.1, 0.1], color: '#8bd6bb' },
  { label: 'AI / RAG', sub: 'Spring AI', position: [2.1, 0.4, -0.3], color: '#a4b2db' },
  { label: 'REDIS', sub: 'Lock · Pub/Sub', position: [-1.7, -1.25, 1.2], color: '#8bd6bb' },
  { label: 'POSTGRESQL', sub: 'Data · Vectors', position: [1.3, -1.4, 1.25], color: '#8bd6bb' },
  { label: 'KAFKA', sub: 'Event streaming', position: [0.1, -0.35, -1.75], color: '#8bd6bb' },
]
const connections = [[0, 1], [0, 2], [1, 3], [1, 4], [1, 5], [2, 4], [5, 4], [5, 2]]

function ServiceNode({ node, index }: { node: typeof nodes[number]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return <group position={node.position}>
    <group rotation={[0, Math.PI / 4, 0]}>
      <RoundedBox args={[index === 0 ? 0.85 : 0.58, 0.42, index === 0 ? 0.85 : 0.58]} radius={0.045} smoothness={2} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial color={hovered ? node.color : '#17352f'} metalness={0.55} roughness={0.25} emissive={node.color} emissiveIntensity={hovered ? 0.45 : index === 0 ? 0.17 : 0.04} />
        <Edges color={node.color} lineWidth={1.2} />
      </RoundedBox>
      <mesh position={[0, -0.35, 0]}><boxGeometry args={[0.95, 0.025, 0.95]} /><meshStandardMaterial color="#1a302b" transparent opacity={0.6} /><Edges color="#38584b" /></mesh>
      <mesh position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.14, 0.14]} /><meshBasicMaterial color={node.color} /></mesh>
    </group>
    <Html position={[0, -0.68, 0]} center style={{ pointerEvents: 'none' }}><div className={`node-label ${hovered ? 'node-hovered' : ''}`}><strong>{node.label}</strong><span>{node.sub}</span></div></Html>
  </group>
}
function Packet({ start, end, offset, active }: { start: Point; end: Point; offset: number; active: boolean }) {
  const mesh = useRef<Mesh>(null)
  const phase = useRef(offset)
  const [from, to] = useMemo(() => [new Vector3(...start), new Vector3(...end)], [start, end])
  useFrame((_, delta) => {
    if (!mesh.current || !active) return
    phase.current = (phase.current + Math.min(delta, 0.04) * 0.24) % 1
    mesh.current.position.lerpVectors(from, to, phase.current)
  })
  return <mesh ref={mesh} position={start}><sphereGeometry args={[0.035, 6, 6]} /><meshBasicMaterial color="#b8f1d8" /></mesh>
}
function Network({ active }: { active: boolean }) {
  const group = useRef<Group>(null)
  const elapsed = useRef(0)
  useFrame(({ pointer }, delta) => {
    if (!group.current || !active) return
    elapsed.current += Math.min(delta, 0.04)
    group.current.rotation.y += (pointer.x * 0.18 - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-pointer.y * 0.08 - group.current.rotation.x) * 0.04
    group.current.position.y = Math.sin(elapsed.current * 0.55) * 0.07 - Math.min(window.scrollY / 6000, 0.12)
  })
  return <group ref={group}>
    {connections.map(([a, b], i) => <group key={`${a}-${b}`}><Line points={[nodes[a].position, nodes[b].position]} color="#456d5c" transparent opacity={0.6} lineWidth={1} /><Packet start={nodes[a].position} end={nodes[b].position} offset={i / 8} active={active} /></group>)}
    {nodes.map((node, i) => <ServiceNode key={node.label} node={node} index={i} />)}
    <gridHelper args={[11, 22, '#294139', '#1a2924']} position={[0, -2.35, 0]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}><planeGeometry args={[18, 18]} /><meshBasicMaterial color="#0c1411" transparent opacity={0.65} /></mesh>
  </group>
}
export default function NetworkScene({ active }: { active: boolean }) {
  return <Canvas camera={{ position: [4.2, 3.2, 7.8], fov: 42 }} dpr={[1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} aria-label="Interactive distributed service network">
    <ambientLight intensity={1.4} /><directionalLight position={[3, 5, 4]} intensity={3} color="#b7efda" /><pointLight position={[-3, 1, 2]} intensity={12} color="#e59262" />
    <fog attach="fog" args={['#0b110f', 9, 19]} /><Network active={active} />
  </Canvas>
}
