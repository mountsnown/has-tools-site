'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

function generatePassword(length: number, options: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }) {
  const chars = [
    ...(options.upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''),
    ...(options.lower ? 'abcdefghijklmnopqrstuvwxyz' : ''),
    ...(options.numbers ? '0123456789' : ''),
    ...(options.symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : ''),
  ].join('');

  if (!chars) return '';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join('');
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle = (key: keyof typeof options) => {
    const next = { ...options, [key]: !options[key] };
    if (Object.values(next).some(Boolean)) setOptions(next);
  };

  const strength =
    length >= 16 && options.upper && options.lower && options.numbers && options.symbols
      ? '🟢 非常强'
      : length >= 12 && Object.values(options).filter(Boolean).length >= 3
      ? '🟡 较强'
      : '🔴 较弱';

  return (
    <div className="tool-container">
      <h1 className="tool-title">🔐 密码生成器</h1>
      <p className="tool-subtitle">生成高强度随机密码，保护你的账号安全</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-5">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密码长度: <span className="text-red-600 font-bold">{length}</span>
            </label>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>6</span><span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">包含字符</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'upper' as const, label: '大写字母 (A-Z)' },
                { key: 'lower' as const, label: '小写字母 (a-z)' },
                { key: 'numbers' as const, label: '数字 (0-9)' },
                { key: 'symbols' as const, label: '特殊符号 (!@#...)' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                    options[key]
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-gray-100 text-gray-400'
                  }`}
                >
                  {options[key] ? '✅' : '⬜'} {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate} className="btn-primary w-full text-lg py-4">
            🎲 生成密码
          </button>
        </div>

        {password && (
          <div className="card text-center animate-fade-in">
            <div className="bg-gray-900 rounded-xl p-4 mb-3">
              <p className="text-green-400 font-mono text-lg break-all select-all">{password}</p>
            </div>
            <p className="text-sm text-gray-400 mb-4">密码强度: {strength}</p>
            <button onClick={handleCopy} className="btn-primary w-full">
              {copied ? '✅ 已复制' : '📋 复制密码'}
            </button>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
