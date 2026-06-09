'use client';

import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

function calculateScore(name: string) {
  let score = 0;
  for (let i = 0; i < name.length; i++) {
    const code = name.charCodeAt(i);
    if (code >= 0x4e00 && code <= 0x9fff) {
      score += (code % 100);
    } else {
      score += (code % 50);
    }
  }
  score = (score % 50) + 50; // 50-99
  return score;
}

function getComment(score: number) {
  if (score >= 95) return { emoji: '👑', text: '天选之名！这个名字简直就是命中注定的好名字！' };
  if (score >= 90) return { emoji: '🌟', text: '非常好听的名字！一听就有福气！' };
  if (score >= 85) return { emoji: '✨', text: '很不错的的名字，给人印象深刻！' };
  if (score >= 80) return { emoji: '👍', text: '名字不错，中上水平，有辨识度！' };
  if (score >= 75) return { emoji: '😊', text: '中规中矩的好名字，简单大气！' };
  if (score >= 70) return { emoji: '🙂', text: '名字还行，虽然普通但很顺口。' };
  if (score >= 65) return { emoji: '🤔', text: '需要加点创意哦，这名字太普通了！' };
  if (score >= 60) return { emoji: '😅', text: '嗯...换个名可能运势更好？' };
  return { emoji: '💀', text: '建议改名！这个名字可能会拖累你的运势！' };
}

export default function NameScorePage() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ score: number; emoji: string; text: string } | null>(null);

  const handleScore = () => {
    if (!name.trim()) return;
    const score = calculateScore(name.trim());
    setResult({ score, ...getComment(score) });
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">⭐ 姓名打分器</h1>
      <p className="tool-subtitle">输入名字，看看你的名字能打多少分！</p>
      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto">
        {!result ? (
          <div className="card space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScore()}
              placeholder="请输入姓名"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all text-center text-lg"
            />
            <button onClick={handleScore} className="btn-primary w-full text-lg py-4">
              ⭐ 开始打分
            </button>
          </div>
        ) : (
          <div className="card text-center animate-fade-in space-y-4">
            <p className="text-4xl">{result.emoji}</p>
            <div>
              <p className="text-sm text-gray-400 mb-1">{name} 的得分</p>
              <p className="text-6xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                {result.score}
              </p>
              <p className="text-xs text-gray-300">满分 99 分</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-red-500 to-amber-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(result.score / 99) * 100}%` }}
              />
            </div>
            <p className="text-gray-600">{result.text}</p>
            <div className="flex flex-col gap-3">
              <ShareButton
                title={`${name}的名字打了${result.score}分！`}
                text={`我输入"${name}"得了${result.score}分！${result.text} 快来测测你的名字多少分？`}
              />
              <button onClick={() => setResult(null)} className="btn-secondary">
                🔄 再测一个
              </button>
            </div>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
