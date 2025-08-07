import type { ReactNode } from 'react';
import { Jeff } from '../components/Jeff';
import { Wiggles } from '../components/Wiggles';

function PlayerSelect({ number, background, children }: { number: number; background: string; children: ReactNode }) {
  return (
    <div className="w-[25%] flex flex-col gap-8">
      <div className="border aspect-2/3 rounded-lg" style={{ backgroundColor: background }}>
        {children}
      </div>
      <p className="p-4 border rounded-lg text-2xl text-center bg-white/10">Player {number}</p>
    </div>
  );
}

export function Home() {
  return (
    <div className="p-12 w-screen h-screen flex flex-col items-center gap-12 bg-gray-900 text-white">
      <h1 className="font-display text-[100px] text-center text-amber-300">The Last Chicken Wing</h1>
      <p className="text-2xl">To get started choose your players.</p>

      <div className="flex gap-12 w-full">
        <PlayerSelect number={1} background="#FF6242">
          <Jeff />
        </PlayerSelect>
        <PlayerSelect number={2} background="#00B8F0">
          <Wiggles />
        </PlayerSelect>
        <PlayerSelect number={3} />
        <PlayerSelect number={4} />
      </div>
    </div>
  );
}
