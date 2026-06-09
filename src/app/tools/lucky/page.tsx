'use client';

import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

function generateLuckyNumbers(name: string, birthDate: string) {
  let seed = 0;
  const combined = name + birthDate;
  for (let i = 0; i < combined.length; i++) {
    seed += combined.charCodeAt(i);
  }

  const rng = (max: number, offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return Math.floor((x - Math.floor(x)) * max) + 1;
  };

  return {
    luckyNumbers: Array.from({ length: 6 }, (_, i) => rng(49, i * 7 + 1)),
    mainNumber: rng(9, 0),
    luckyColor: ['红色', '金色', '蓝色', '绿色', '紫色', '白色', '黑色', '橙色'][rng(8, 99) - 1],
    luckyDirection: ['东方', '南方', '西方', '北方', '东南', '西南', '东北', '西北'][rng(8, 199) - 1],
    luckyElement: ['金', '木', '水', '火', '土'][rng(5, 299) - 1],
    fortuneScore: rng(100, 399),
  };
}

export default function LuckyPage() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<ReturnType<typeof generateLuckyNumbers> | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!name.trim()) {
      setError('请输入你的姓名');
      return;
    }
    if (!birthDate) {
      setError('请选择你的出生日期');
      return;
    }
    setError('');
    setResult(generateLuckyNumbers(name, birthDate));
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">🍀 幸运数字生成器</h1>
      <p className="tool-subtitle">输入姓名和生日，生成你的专属幸运数字</p>

      <AdBanner className="mb-8" />

      {!result ? (
        <div className="card max-w-lg mx-auto">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">你的姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="请输入姓名"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">出生日期</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => { setBirthDate(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleGenerate} className="btn-primary w-full text-lg py-4">
              🎱 生成幸运数字
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto space-y-4 animate-fade-in">
          {/* Main Lucky Number */}
          <div className="card text-center">
            <p className="text-sm text-gray-400 mb-2">你的幸运数字</p>
            <div className="text-7xl font-extrabold bg-gradient-to-r from-red-600 via-amber-500 to-red-600 bg-clip-text text-transparent animate-pulse-gold rounded-full inline-block p-8">
              {result.mainNumber}
            </div>
          </div>

          {/* Lucky Numbers Grid */}
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-3 text-center">🎰 幸运号码组合</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {result.luckyNumbers.map((n, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-lg"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>

          {/* Fortune Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <p className="text-2xl mb-1">🎨</p>
              <p className="text-xs text-gray-400">幸运色</p>
              <p className="font-bold text-gray-700">{result.luckyColor}</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl mb-1">🧭</p>
              <p className="text-xs text-gray-400">幸运方位</p>
              <p className="font-bold text-gray-700">{result.luckyDirection}</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl mb-1">⭐</p>
              <p className="text-xs text-gray-400">五行属性</p>
              <p className="font-bold text-gray-700">{result.luckyElement}</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl mb-1">📊</p>
              <p className="text-xs text-gray-400">运势指数</p>
              <p className="font-bold text-gray-700">{result.fortuneScore}%</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ShareButton
              title="我的幸运数字出来了！"
              text={`我的幸运数字是 ${result.mainNumber}，运势指数${result.fortuneScore}%！来看看你的幸运数字是什么？`}
            />
            <button onClick={() => setResult(null)} className="btn-secondary">
              🔄 重新生成
            </button>
          </div>
        </div>
      )}

      <AdBanner className="mt-8" />
    </div>
  );
}
