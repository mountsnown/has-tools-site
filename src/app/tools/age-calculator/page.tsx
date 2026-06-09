'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  nextBirthday: string;
  nextBirthdayDays: number;
  zodiac: string;
}

const zodiacAnimals = ['🐵 猴', '🐔 鸡', '🐶 狗', '🐷 猪', '🐭 鼠', '🐮 牛', '🐯 虎', '🐰 兔', '🐲 龙', '🐍 蛇', '🐴 马', '🐏 羊'];

function calcAge(birthDate: string): AgeResult | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const now = new Date();
  if (isNaN(birth.getTime()) || birth > now) return null;

  const diffMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const zodiac = zodiacAnimals[birth.getFullYear() % 12];

  return { years, months, days, totalDays, totalWeeks, nextBirthday: nextBirthday.toLocaleDateString('zh-CN'), nextBirthdayDays, zodiac };
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);

  const handleCalc = () => setResult(calcAge(birthDate));

  return (
    <div className="tool-container">
      <h1 className="tool-title">📅 年龄计算器</h1>
      <p className="tool-subtitle">输入出生日期，精确计算周岁、天数、生肖、下次生日</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">出生日期</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none text-sm"
            />
          </div>
          <button onClick={handleCalc} className="btn-primary w-full text-lg py-4">计算年龄</button>
        </div>

        {result && (
          <div className="card animate-fade-in space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-red-600">{result.years}</p>
                <p className="text-xs text-gray-400 mt-1">周岁</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-amber-600">{result.months % 12}</p>
                <p className="text-xs text-gray-400 mt-1">月</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-blue-600">{result.days}</p>
                <p className="text-xs text-gray-400 mt-1">天</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">出生总天数</span>
                <span className="font-bold text-gray-800">{result.totalDays.toLocaleString()} 天</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">出生总周数</span>
                <span className="font-bold text-gray-800">{result.totalWeeks.toLocaleString()} 周</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">生肖</span>
                <span className="font-bold text-gray-800">{result.zodiac}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">下次生日</span>
                <span className="font-bold text-gray-800">{result.nextBirthday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">距下次生日</span>
                <span className="font-bold text-red-600">还有 {result.nextBirthdayDays} 天</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
