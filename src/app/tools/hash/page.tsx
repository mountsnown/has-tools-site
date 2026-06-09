'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

type Algo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

// Pure JS MD5 implementation
function md5(str: string): string {
  function rotateLeft(n: number, s: number) { return (n << s) | (n >>> (32 - s)); }
  function addUnsigned(x: number, y: number) { return (x + y) & 0xffffffff; }

  const s = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
             5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
             4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
             6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  }

  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 0x80) { bytes.push(c); }
    else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
    else if (c < 0xd800 || c >= 0xe000) { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
    else {
      i++;
      const cc = 0x10000 + ((c & 0x3ff) << 10) + (str.charCodeAt(i) & 0x3ff);
      bytes.push(0xf0 | (cc >> 18), 0x80 | ((cc >> 12) & 0x3f), 0x80 | ((cc >> 6) & 0x3f), 0x80 | (cc & 0x3f));
    }
  }

  const ml = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length + 8) % 64 !== 0) bytes.push(0);
  for (let i = 0; i < 8; i++) bytes.push((ml >>> (i * 8)) & 0xff);

  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  for (let i = 0; i < bytes.length; i += 64) {
    const M = new Uint32Array(16);
    for (let j = 0; j < 16; j++) {
      M[j] = bytes[i + j * 4] | (bytes[i + j * 4 + 1] << 8) | (bytes[i + j * 4 + 2] << 16) | (bytes[i + j * 4 + 3] << 24);
    }
    let A = a, B = b, C = c, D = d;
    for (let j = 0; j < 64; j++) {
      let F: number, g: number;
      if (j < 16) { F = (B & C) | (~B & D); g = j; }
      else if (j < 32) { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
      else if (j < 48) { F = B ^ C ^ D; g = (3 * j + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * j) % 16; }
      F = addUnsigned(addUnsigned(addUnsigned(F, A), K[j]), M[g]);
      A = D; D = C; C = B; B = addUnsigned(B, rotateLeft(F, s[j]));
    }
    a = addUnsigned(a, A); b = addUnsigned(b, B); c = addUnsigned(c, C); d = addUnsigned(d, D);
  }

  const hex = (x: number) => { const s = x.toString(16); return (s.length < 8 ? '0'.repeat(8 - s.length) : '') + s; };
  return hex(a) + hex(b) + hex(c) + hex(d);
}

export default function HashPage() {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState<Algo>('MD5');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const computeHash = async () => {
    if (!input) return;
    if (algo === 'MD5') {
      setHash(md5(input));
      return;
    }
    const enc = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest(algo, enc);
    setHash(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const algos: Algo[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔒 哈希计算器</h1>
      <p className="tool-subtitle">MD5/SHA在线加密，支持多种哈希算法</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div className="flex flex-wrap gap-2">
            {algos.map((a) => (
              <button
                key={a}
                onClick={() => { setAlgo(a); setHash(''); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  algo === a ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setHash(''); }}
            placeholder="输入要计算哈希值的文本..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none resize-none font-mono text-sm"
          />
          <button onClick={computeHash} className="btn-primary w-full">计算 {algo}</button>
        </div>

        {hash && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{algo}</span>
              <button onClick={copy} className="text-xs text-red-600 hover:text-red-700">
                {copied ? '✅ 已复制' : '📋 复制'}
              </button>
            </div>
            <p className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 break-all select-all">{hash}</p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
