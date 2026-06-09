'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

function getBMIInfo(bmi: number) {
  if (bmi < 18.5) return { category: '偏瘦', color: 'text-blue-600', bg: 'bg-blue-50', advice: '可以适当增重，注意均衡营养' };
  if (bmi < 24) return { category: '正常', color: 'text-green-600', bg: 'bg-green-50', advice: '体重正常，请继续保持健康生活方式' };
  if (bmi < 28) return { category: '偏胖', color: 'text-yellow-600', bg: 'bg-yellow-50', advice: '建议控制饮食，增加运动量' };
  if (bmi < 32) return { category: '肥胖', color: 'text-orange-600', bg: 'bg-orange-50', advice: '需要制定减肥计划，关注健康' };
  return { category: '重度肥胖', color: 'text-red-600', bg: 'bg-red-50', advice: '建议咨询医生，制定科学的减重方案' };
}

export default function BMIPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calc = () => {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    setBmi(Math.round((w / (h * h)) * 10) / 10);
  };

  const info = bmi ? getBMIInfo(bmi) : null;

  return (
    <div className="tool-container">
      <h1 className="tool-title">⚖️ BMI 计算器</h1>
      <p className="tool-subtitle">身体质量指数（BMI）在线计算，了解你的体重健康状况</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="例如: 170"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="例如: 65"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none text-sm"
            />
          </div>
          <button onClick={calc} className="btn-primary w-full text-lg py-4">计算 BMI</button>
        </div>

        {bmi !== null && info && (
          <div className={`card text-center animate-fade-in ${info.bg}`}>
            <p className="text-4xl font-bold mb-2">{bmi}</p>
            <p className={`text-lg font-bold ${info.color} mb-2`}>{info.category}</p>
            <p className="text-sm text-gray-500">{info.advice}</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-600 rounded-full"
                   style={{ width: `${Math.min(bmi / 40 * 100, 100)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>16</span><span>18.5</span><span>24</span><span>28</span><span>32</span><span>40</span>
            </div>
            <p className="text-xs text-gray-400 mt-3">中国成人标准 (18.5-23.9为正常范围)</p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
