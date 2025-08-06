import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, OrbitControls, useTexture } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

function WigglesDecal() {
  const decalTexture = useTexture('/textures/wiggles.png');

  return (
    <Decal
      debug
      position={[0, 1, 3]} // Slightly offset from surface
      rotation={[0, 0, 0]}
      scale={5}
    >
      <meshBasicMaterial map={decalTexture} transparent alphaTest={0.1} polygonOffset polygonOffsetFactor={-1} />
    </Decal>
  );
}

export function Wiggles() {
  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <PlayerBody>
          <WigglesDecal />
        </PlayerBody>

        <OrbitControls target={[0, 2, 0]} />
      </Suspense>
    </Canvas>
  );
}
