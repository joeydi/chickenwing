import { Suspense, useMemo } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Decal, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PlayerBody } from './PlayerBody';

function Test() {
  return (
    <mesh position={[-0.125, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
      <Decal
        position={[0, 0, 0.5]} // [x, y, z] on front of egg
        rotation={[0, 0, 0]} // flat-on front
        scale={1}
        map={useTexture('/textures/wiggles.png')}
        depthTest={false}
      />
    </mesh>
  );
}

export function Wiggles() {
  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* <Sunglasses scale={0.35} position={[-1.2, 3, 1.25]} rotation={[Math.PI / -2, 0, 0]} /> */}
        {/* <Decal
          position={[0, 0.1, 0.45]} // [x, y, z] on front of egg
          rotation={[0, 0, 0]} // flat-on front
          scale={0.3}
          map={useTexture('/textures/wiggles.png')}
          flatShading
        /> */}
        <PlayerBody>{/* <Test /> */}</PlayerBody>

        <OrbitControls target={[0, 2, 0]} />
      </Suspense>
    </Canvas>
  );
}
