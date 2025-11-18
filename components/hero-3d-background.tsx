'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function AIRobot({ position, color = "#7c3aed", eyeColor = "#06b6d4", name, version = "v2.0" }: { 
  position: [number, number, number]
  color?: string
  eyeColor?: string
  name: string
  version?: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      const offset = name.length * 0.5
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + offset) * 0.4
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + offset) * 0.4
      groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3 + offset) * 0.2
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.7}>
      <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Robot Head */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial 
            color={hovered ? "#a855f7" : color} 
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.3}
          />
        </mesh>
        
        {/* Robot Eyes - Glowing */}
        <mesh position={[-0.3, 0.2, 0.61]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.3, 0.2, 0.61]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3} />
        </mesh>
        
        {/* Smile */}
        <mesh position={[0, -0.1, 0.61]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.3, 0.05, 8, 16, Math.PI]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.5} />
        </mesh>
        
        {/* Antenna with pulsing light */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.7} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2} />
        </mesh>
        
        {/* Robot Body */}
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[1.5, 1.2, 0.8]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Arms - Animated waving */}
        <mesh position={[-1, -0.8, 0]} rotation={[0, 0, hovered ? -0.9 : 0.5]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[1, -0.8, 0]} rotation={[0, 0, hovered ? 0.9 : -0.5]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.7} roughness={0.3} />
        </mesh>
        
        <Text
          fontSize={0.25}
          position={[0, 2.3, 0]}
          color="#22d3ee"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        <mesh position={[0, 1.9, 0]}>
          <planeGeometry args={[0.8, 0.3]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Text
          fontSize={0.12}
          position={[0, 1.9, 0.01]}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {version}
        </Text>
      </group>
    </Float>
  )
}

function FloatingText({ text, position }: { text: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Text
        ref={meshRef}
        fontSize={0.6}
        position={position}
        color="#06b6d4"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  )
}

function PurpleOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="#7c3aed"
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.7}
          emissive="#7c3aed"
          emissiveIntensity={0.6}
        />
      </Sphere>
    </Float>
  )
}

function SpeechBubble({ position, text }: { position: [number, number, number]; text: string }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1 + position[0]) * 0.15
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      meshRef.current.scale.y = 1 + Math.cos(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial 
            color="#e0e7ff" 
            transparent
            opacity={0.95}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        <mesh position={[-0.3, -0.5, 0]} rotation={[0, 0, 0.5]}>
          <coneGeometry args={[0.2, 0.3, 3]} />
          <meshStandardMaterial color="#e0e7ff" />
        </mesh>
        
        <Text
          fontSize={0.16}
          position={[0, 0, 0.3]}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

export function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 14], fov: 55 }}>
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#ffffff', 8, 30]} />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#06b6d4" />
        <spotLight position={[0, 15, 5]} angle={0.4} penumbra={1} intensity={1.5} color="#ec4899" />
        <spotLight position={[10, 5, 10]} angle={0.3} penumbra={0.8} intensity={1} color="#10b981" />
        
        <Environment preset="city" />
        
        <AIRobot position={[-5, 2, -3]} color="#7c3aed" eyeColor="#06b6d4" name="GPT" version="v4.5" />
        <AIRobot position={[5, 1, -3]} color="#10b981" eyeColor="#fbbf24" name="Grok" version="v2.1" />
        <AIRobot position={[-2, -2, -2]} color="#ef4444" eyeColor="#22d3ee" name="DeepSeek" version="v3.0" />
        <AIRobot position={[3, -2, -2]} color="#f59e0b" eyeColor="#a78bfa" name="Claude" version="v3.7" />
        <AIRobot position={[0, 3, -4]} color="#ec4899" eyeColor="#34d399" name="Gemini" version="v2.5" />
        <AIRobot position={[-4, -1, -1]} color="#06b6d4" eyeColor="#fb7185" name="Llama" version="v3.3" />
        
        <SpeechBubble position={[-5, 4.5, -2]} text="Hey team!" />
        <SpeechBubble position={[5, 3.5, -2]} text="What's new?" />
        <SpeechBubble position={[-2, 0.5, -1]} text="v3.0 here!" />
        <SpeechBubble position={[3, 0.5, -1]} text="Running smooth!" />
        <SpeechBubble position={[0, 5.5, -3]} text="Let's chat!" />
        <SpeechBubble position={[-4, 1, 0]} text="All updated!" />
        
        {/* Brand Labels */}
        <FloatingText text="OpenAI" position={[-5, 5.5, -5]} />
        <FloatingText text="xAI" position={[5, -4, -5]} />
        <FloatingText text="DeepSeek" position={[-2, -4.5, -4]} />
        <FloatingText text="Anthropic" position={[4, -4.5, -4]} />
        
        <PurpleOrb position={[-2, -2, -4]} />
        <PurpleOrb position={[3, 2, -3]} />
        <PurpleOrb position={[-4, 0, -5]} />
        <PurpleOrb position={[0, 4, -4]} />
        <PurpleOrb position={[6, 0, -6]} />
        <PurpleOrb position={[-6, 2, -6]} />
        <PurpleOrb position={[2, -3, -5]} />
        <PurpleOrb position={[-3, 4, -6]} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
