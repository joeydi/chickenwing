import { Suspense, useMemo, type ReactNode } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Decal, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EggFromSVGProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
}

export function EggFromSVG({ url, position = [0, 0, 0], scale = 0.01 }: EggFromSVGProps) {
  const svgData = useLoader(SVGLoader, url);

  const geometry = useMemo(() => {
    // 1️⃣ Convert first SVG path to Vector2 points
    const path = svgData.paths[0];
    const shapePoints = path.subPaths[0].getSpacedPoints(100);

    const points: THREE.Vector2[] = shapePoints.map(p => new THREE.Vector2(p.x * scale, p.y * scale));

    // 2️⃣ Generate LatheGeometry
    const geo = new THREE.LatheGeometry(points, 64);

    // 3️⃣ Compute bounding box & center vertically
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    if (box) {
      const centerY = (box.max.y + box.min.y) / 2;
      geo.translate(0, -centerY, 0);
    }

    return geo;
  }, [svgData, scale]);

  const decalTexture = useTexture('/textures/wiggles.png');

  return (
    <mesh position={position} scale={0.375}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="#FFAF00" side={THREE.DoubleSide} />
      <Decal
        position={[0, -1, 0.5]} // [x, y, z] on front of egg
        rotation={[0, 0, 0]} // flat-on front
        scale={1}
        map={decalTexture}
        // depthTest={false}
      />
    </mesh>
  );
}

function Cylinder({
  position = [0, 0, 0],
  radiusTop = 0.4,
  radiusBottom = 0.4,
  height = 1,
  radialSegments = 32,
}: {
  position?: [number, number, number];
  radiusTop?: number;
  radiusBottom?: number;
  height?: number;
  radialSegments?: number;
}) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

export function PlayerBody({ children }: { children: ReactNode }) {
  return (
    <>
      <EggFromSVG url="/egg-profile.svg" position={[0, 3, 0]} />
      <Cylinder height={2} position={[0, 1, 0]} />

      <mesh position={[-0.125, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.125, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {children}
    </>
  );
}
