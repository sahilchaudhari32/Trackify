import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, GradientTexture } from '@react-three/drei';

const FloatingObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = Math.sin(t / 4) / 8;
    meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.4}>
        <MeshDistortMaterial
          color="#10b981"
          speed={3}
          distort={0.4}
          radius={1}
        >
          <GradientTexture
            stops={[0, 1]}
            colors={['#10b981', '#00f0ff']}
          />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  );
};

const CoinAnimation = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <FloatingObject />
      </Canvas>
    </div>
  );
};

export default CoinAnimation;
