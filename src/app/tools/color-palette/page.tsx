'use client';

import { useState, useMemo } from 'react';
import AdBanner from '@/components/AdBanner';

function generatePalette(seed: number) {
  const rng = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * 256);
  };
  return Array.from({ length: 5 }, (_, i) => {
    const r = rng(i * 3);
    const g = rng(i * 3 + 1);
    const b = rng(i * 3 + 2);
    return { r, g, b, hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}` };
  });
}

const presetSeeds = [
  { name: '落日余晖', seed: 888 },
  { name: '海洋微风', seed: 420 },
  { name: '森林漫步', seed: 777 },
  { name: '樱花季', seed: 1024 },
  { name: '赛博朋克', seed: 404 },
  { name: '莫兰迪', seed: 333 },
];

export default function ColorPalettePage() {
  const [seed, setSeed] = useState(888);
  const palette = useMemo(() => generatePalette(seed), [seed]);
  const [copiedColor, setCopiedColor] = useState('');

  const copyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(''), 1500);
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🎨 配色方案生成器</h1>
      <p className="tool-subtitle">一键生成好看的配色方案</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card">
          <div className="flex flex-wrap gap-2 mb-6">
            {presetSeeds.map((p) => (
              <button
                key={p.seed}
                onClick={() => setSeed(p.seed)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  seed === p.seed
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={() => setSeed(Date.now())}
              className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              🎲 随机
            </button>
          </div>

          <div className="flex rounded-xl overflow-hidden h-32 mb-4">
            {palette.map((c, i) => (
              <div
                key={i}
                className="flex-1 flex items-end justify-center pb-2 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: c.hex }}
                onClick={() => copyColor(c.hex)}
              >
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded bg-black/20"
                  style={{ color: (c.r * 0.299 + c.g * 0.587 + c.b * 0.114) > 128 ? '#333' : '#fff' }}
                >
                  {c.hex}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {palette.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                  onClick={() => copyColor(c.hex)}
                />
                <div>
                  <p className="font-mono text-sm font-medium">{c.hex.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">RGB({c.r}, {c.g}, {c.b})</p>
                </div>
                <button
                  onClick={() => copyColor(c.hex)}
                  className="ml-auto text-xs text-gray-400 hover:text-red-600"
                >
                  {copiedColor === c.hex ? '✅' : '📋'}
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => setSeed(Date.now())} className="btn-primary w-full mt-4">
            🎲 换一组配色
          </button>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
