import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, PerspectiveCamera } from '@react-three/drei';

const Bar = ({ position, height, color, delay }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const factor = Math.sin(t + delay) * 0.2 + 1;
    meshRef.current.scale.y = factor;
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[0.5, height, 0.5]}
      radius={0.05}
      smoothness={4}
      position={position}
    >
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </RoundedBox>
  );
};

const SpendingChart3D = () => {
  const data = [
    { height: 2, color: '#10b981', delay: 0 },
    { height: 3, color: '#00f0ff', delay: 0.5 },
    { height: 1.5, color: '#8b5cf6', delay: 1 },
    { height: 2.5, color: '#f43f5e', delay: 1.5 },
    { height: 2.2, color: '#10b981', delay: 2 },
  ];

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <group position={[-2, 0, 0]}>
          {data.map((d, i) => (
            <Bar 
              key={i} 
              position={[i * 1.2, d.height / 2, 0]} 
              height={d.height} 
              color={d.color}
              delay={d.delay}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default SpendingChart3D;
