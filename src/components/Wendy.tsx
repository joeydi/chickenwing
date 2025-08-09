import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

function BodyDecal() {
  const decalTexture = useTexture('/textures/wendy.png');

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

function Bow({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const { scene } = useGLTF('/models/bow.glb');
  const clonedScene = scene.clone(true);
  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale}
      rotation={rotation}
      onUpdate={obj => {
        obj.traverse(child => {
          if (child.isMesh) {
            child.material.color.set('#FF6242');
          }
        });
      }}
    />
  );
}

export function Wendy() {
  return (
    <>
      <Bow scale={0.35} position={[-0.25, 4.25, 0.75]} rotation={[Math.PI / -4, 0, 0.25]} />
      <PlayerBody>
        <BodyDecal />
      </PlayerBody>
    </>
  );
}
