import { useGLTF } from '@react-three/drei';
import { PlayerBody } from './PlayerBody';

type Vec3 = [number, number, number];

function Sunglasses({ ...props }: { position?: Vec3; rotation?: Vec3; scale?: number }) {
  const { scene } = useGLTF('/models/sunglasses.glb');
  return <primitive object={scene} {...props} />;
}

export function Jeff() {
  return (
    <>
      <Sunglasses scale={0.35} position={[-1.2, 2.875, 1.25]} rotation={[Math.PI / -2, 0, 0]} />
      <PlayerBody />
    </>
  );
}
