'use client';

import { useState, useCallback } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

export interface Question {
  id: number;
  text: string;
  options: [string, string];
  dimension: string;
}

export interface ResultEntry {
  name: string;
  traits: string;
  career: string;
  love: string;
  emoji?: string;
}

export interface TestMeta {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  infoCards: { emoji: string; text: string }[];
  disclaimer?: string;
}

export interface TestConfig {
  meta: TestMeta;
  questions: Question[];
  resultMap: Record<string, ResultEntry>;
  calculateResult: (answers: Record<string, number>) => string;
  share: {
    title: string;
    textFn: (result: string, info: ResultEntry) => string;
  };
}

export default function TestEngine({ config }: { config: TestConfig }) {
  const { meta, questions, resultMap, calculateResult, share } = config;
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string>('');

  const handleStart = () => {
    const init: Record<string, number> = {};
    questions.forEach((q) => { init[q.dimension] = 0; });
    setAnswers(init);
    setCurrentQ(0);
    setStep('test');
  };

  const handleAnswer = (optionIndex: number) => {
    const q = questions[currentQ];
    const newAnswers = { ...answers };
    newAnswers[q.dimension] = (newAnswers[q.dimension] || 0) + (optionIndex === 0 ? -1 : 1);
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      const r = calculateResult(newAnswers);
      setResult(r);
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      const q = questions[currentQ - 1];
      const newAnswers = { ...answers };
      newAnswers[q.dimension] = (newAnswers[q.dimension] || 0) - (answers[q.dimension] > 0 ? 1 : -1);
      setAnswers(newAnswers);
      setCurrentQ((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQ(0);
    setResult('');
  };

  // Intro
  if (step === 'intro') {
    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            {meta.emoji} {meta.title}
          </h1>
          <p className="tool-subtitle">{meta.subtitle}</p>

          <AdBanner className="mb-8" />

          <div className="card max-w-lg mx-auto text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              {meta.description}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-500">
              {meta.infoCards.map((card, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  {card.emoji} {card.text}
                </div>
              ))}
            </div>
            <button onClick={handleStart} className="btn-primary w-full text-lg py-4">
              开始测试
            </button>
          </div>

          <AdBanner className="mt-8" />

          {meta.disclaimer && (
            <p className="text-center text-xs text-gray-400 mt-4">{meta.disclaimer}</p>
          )}
        </div>
      </div>
    );
  }

  // Test
  if (step === 'test') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
        <div className="max-w-lg mx-auto">
          <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            {meta.emoji} {meta.title}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>第 {currentQ + 1}/{questions.length} 题</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="card mb-4">
            <h2 className="text-lg font-medium text-gray-800 mb-6">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-red-300 hover:bg-red-50 transition-all text-gray-700"
                >
                  <span className="inline-block w-7 h-7 rounded-full bg-gray-100 text-center leading-7 text-sm mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {currentQ > 0 && (
            <button onClick={handlePrev} className="text-sm text-gray-400 hover:text-gray-600">
              ← 上一题
            </button>
          )}
        </div>
      </div>
    );
  }

  // Result
  const info = resultMap[result];
  if (!info) return null;

  return (
    <div className="tool-container min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
      <div className="max-w-lg mx-auto">
        <h1 className="tool-title bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
          🎉 测试结果
        </h1>
        <p className="tool-subtitle">{meta.subtitle}</p>

        <AdBanner className="mb-8" />

        <div className="card max-w-lg mx-auto text-center animate-fade-in">
          <div className="text-7xl mb-4">{meta.emoji}</div>
          {info.emoji && <div className="text-5xl mb-2">{info.emoji}</div>}
          <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            {result}
          </div>
          <div className="text-xl font-bold text-gray-700 mb-6">
            {info.name}
          </div>

          <div className="grid grid-cols-1 gap-4 text-left mb-8">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="font-semibold text-red-700 mb-1">✨ 性格特点</div>
              <p className="text-sm text-gray-600">{info.traits}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="font-semibold text-amber-700 mb-1">💼 适合职业</div>
              <p className="text-sm text-gray-600">{info.career}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="font-semibold text-pink-700 mb-1">💕 情感风格</div>
              <p className="text-sm text-gray-600">{info.love}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ShareButton
              title={share.title}
              text={share.textFn(result, info)}
            />
            <button onClick={handleRestart} className="btn-secondary">
              🔄 重新测试
            </button>
          </div>
        </div>

        <AdBanner className="mt-8" />

        {meta.disclaimer && (
          <p className="text-center text-xs text-gray-400 mt-4">{meta.disclaimer}</p>
        )}
      </div>
    </div>
  );
}
