import { Decal, useTexture } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

function WigglesDecal() {
  const decalTexture = useTexture('/textures/wiggles.png');

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

export function Wiggles() {
  return (
    <>
      <PlayerBody>
        <WigglesDecal />
      </PlayerBody>

      <group rotation={[0, 0, -0.25]} position={[-0.875, 0.1, 0]}>
        <mesh position={[0, 5, 0]} scale={0.5}>
          <coneGeometry args={[1, 2, 32]} />
          <meshStandardMaterial color="#FF6242" />
        </mesh>

        <mesh position={[0, 5.5, 0]}>
          <sphereGeometry args={[0.125, 16, 16]} />
          <meshStandardMaterial color="#ffd230" />
        </mesh>
      </group>
    </>
  );
}
