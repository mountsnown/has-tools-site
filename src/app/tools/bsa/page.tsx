'use client';

import { useState } from 'react';

export default function BsaPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<null | {
    mosteller: number;
    dubois: number;
    haycock: number;
    avg: number;
  }>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w)) {
      alert('请输入身高和体重');
      return;
    }
    if (h < 50 || h > 250) {
      alert('请输入合理的身高（50-250 cm）');
      return;
    }
    if (w < 20 || w > 300) {
      alert('请输入合理的体重（20-300 kg）');
      return;
    }

    const mosteller = Math.sqrt((h * w) / 3600);
    const dubois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
    const haycock = 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964);
    const avg = (mosteller + dubois + haycock) / 3;

    setResult({
      mosteller: Math.round(mosteller * 100) / 100,
      dubois: Math.round(dubois * 100) / 100,
      haycock: Math.round(haycock * 100) / 100,
      avg: Math.round(avg * 100) / 100,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            📐 体表面积 BSA 计算
          </h1>
          <p className="text-gray-500">支持 Mosteller / DuBois / Haycock 三种公式，用于化疗剂量和心输出量计算</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入身体参数</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">身高 (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="如 170"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">体重 (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="如 65"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            计算 BSA
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 计算结果</h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.mosteller}
                </div>
                <div className="text-sm text-gray-400 mt-1">体表面积 (m²) — Mosteller 公式</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-500 font-medium">公式</th>
                      <th className="text-right py-2 text-gray-500 font-medium">结果 (m²)</th>
                      <th className="text-right py-2 text-gray-500 font-medium hidden sm:table-cell">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium text-gray-800">Mosteller</td>
                      <td className="py-2 text-right font-bold text-red-600">{result.mosteller}</td>
                      <td className="py-2 text-right text-gray-400 text-xs hidden sm:table-cell">最常用</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium text-gray-800">DuBois &amp; DuBois</td>
                      <td className="py-2 text-right text-gray-700">{result.dubois}</td>
                      <td className="py-2 text-right text-gray-400 text-xs hidden sm:table-cell">经典公式</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium text-gray-800">Haycock</td>
                      <td className="py-2 text-right text-gray-700">{result.haycock}</td>
                      <td className="py-2 text-right text-gray-400 text-xs hidden sm:table-cell">儿童适用</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-400">平均值</td>
                      <td className="py-2 text-right text-gray-400">{result.avg}</td>
                      <td className="py-2 text-right hidden sm:table-cell"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">💡 临床应用</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">化疗药物剂量：</span>
                  许多化疗药物（如卡铂、顺铂）按体表面积计算剂量
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">心输出量标准化：</span>
                  心指数 = 心输出量 / BSA，便于不同体型间比较
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">肾小球滤过率校正：</span>
                  eGFR 通常以 1.73m² 标准体表面积校正
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          ⚠️ 本工具仅供健康科普参考，不能替代医生诊断。如有不适请及时就医。
        </p>
      </div>
    </div>
  );
}
