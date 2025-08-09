import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

function BodyDecal() {
  const decalTexture = useTexture('/textures/george.png');

  return (
    <Decal
      position={[0, 1, 3]} // Slightly offset from surface
      rotation={[0, 0, 0]}
      scale={5}
    >
      <meshBasicMaterial map={decalTexture} transparent alphaTest={0.1} polygonOffset polygonOffsetFactor={-1} />
    </Decal>
  );
}

function Crown({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF('/models/crown.glb');
  const clonedScene = scene.clone(true);
  return <primitive object={clonedScene} position={position} scale={scale} rotation={rotation} />;
}

function Mustache({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF('/models/mustache.glb');
  const clonedScene = scene.clone(true);
  return <primitive object={clonedScene} position={position} scale={scale} rotation={rotation} />;
}

export function George() {
  return (
    <>
      <Crown scale={0.35} position={[-0.35, 4.75, 0.125]} rotation={[0, 0, 0.25]} />
      <Mustache scale={1} position={[0, 3, 1]} rotation={[0, 0, 0]} />

      <PlayerBody>
        <BodyDecal />
      </PlayerBody>
    </>
  );
}
