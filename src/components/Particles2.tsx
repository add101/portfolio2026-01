import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ mouse }) {
  const particlesRef = useRef();
  const count = 1000;
  
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { pos, vel };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Current position
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];
      
      // Calculate distance to mouse
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Gentle gravitation toward cursor
      if (dist > 0.1) {
        const force = 0.015 / (dist + 1);
        particles.vel[i3] += dx * force;
        particles.vel[i3 + 1] += dy * force;
      }
      
      // Apply velocity with damping
      x += particles.vel[i3];
      y += particles.vel[i3 + 1];
      z += particles.vel[i3 + 2];
      
      particles.vel[i3] *= 0.98;
      particles.vel[i3 + 1] *= 0.98;
      particles.vel[i3 + 2] *= 0.98;
      
      // Boundary wrapping
      if (x > 5) x = -5;
      if (x < -5) x = 5;
      if (y > 5) y = -5;
      if (y < -5) y = 5;
      if (z > 2) z = -2;
      if (z < -2) z = 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CursorTrail({ mouse, trail }) {
  const trailRef = useRef();
  
  useFrame(() => {
    if (!trailRef.current || trail.length === 0) return;
    
    const positions = new Float32Array(trail.length * 3);
    
    trail.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = 0;
    });
    
    trailRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  });

  return (
    <points ref={trailRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.15}
        color="#ff00ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const maxTrailLength = 30;

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    setMouse({ x: x * 5, y: y * 5 });
    
    setTrail((prev) => {
      const newTrail = [...prev, { x: x * 5, y: y * 5 }];
      if (newTrail.length > maxTrailLength) {
        newTrail.shift();
      }
      return newTrail;
    });
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Particles mouse={mouse} />
      <CursorTrail mouse={mouse} trail={trail} />
    </>
  );
}

export default function Particles2() {
  return (
    <div style={{ width: '50%', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}