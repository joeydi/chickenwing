import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

function Sunglasses({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF('/models/sunglasses.glb');
  const clonedScene = scene.clone(true);
  return <primitive object={clonedScene} position={position} scale={scale} rotation={rotation} />;
}

export function Jeff() {
  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Sunglasses scale={0.35} position={[-1.2, 2.875, 1.25]} rotation={[Math.PI / -2, 0, 0]} />
        <PlayerBody />

        <OrbitControls target={[0, 2, 0]} />
      </Suspense>
    </Canvas>
  );
}
