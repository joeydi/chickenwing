import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';

type Vec3 = [number, number, number];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Maps a number from one range to another.
 *
 * @param value   The input number
 * @param inMin   Lower bound of the input range
 * @param inMax   Upper bound of the input range
 * @param outMin  Lower bound of the output range
 * @param outMax  Upper bound of the output range
 */
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function PlayerSelect({ number, background, children }: { number: number; background: string; children: ReactNode }) {
  const [rotation, setRotation] = useState<Vec3>([0, 0, 0]);

  const { rx, ry, rz } = useSpring({
    rx: rotation[0],
    ry: rotation[1],
    rz: rotation[2],
    config: { tension: 100, friction: 20 },
  });

  useEffect(() => {
    const id = setInterval(() => {
      setRotation([getRandom(-0.25, 0.25), getRandom(-0.75, 0.75), 0]);
    }, getRandom(3000, 5000));

    return () => clearInterval(id);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.x) / rect.width;
    const yRatio = (e.clientY - rect.y) / rect.height;

    setRotation([mapRange(yRatio, 0, 1, -0.5, 0.5), mapRange(xRatio, 0, 1, -0.75, 0.75), 0]);
  };

  return (
    <div className="w-[25%] flex flex-col gap-8">
      <div className="border aspect-2/3 rounded-lg" style={{ backgroundColor: background }}>
        <Canvas camera={{ position: [0, 3, 7], fov: 50 }} onPointerMove={handlePointerMove} onPointerLeave={() => setRotation([0, 0, 0])}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            <a.group rotation-x={rx} rotation-y={ry} rotation-z={rz}>
              {children}
            </a.group>

            <OrbitControls target={[0, 2.5, 0]} />
          </Suspense>
        </Canvas>
      </div>
      <p className="p-4 border rounded-lg text-2xl text-center bg-white/10">Player {number}</p>
    </div>
  );
}
