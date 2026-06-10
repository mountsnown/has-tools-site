'use client';

import { useState } from 'react';

export default function DueDatePage() {
  const [lmp, setLmp] = useState('');
  const [result, setResult] = useState<null | {
    edd: string;
    gestationalWeeks: number;
    gestationalDays: number;
    daysElapsed: number;
    daysRemaining: number;
    progressPercent: number;
    trimester: string;
    trimesterColor: string;
  }>(null);

  const calculate = () => {
    if (!lmp) {
      alert('请选择末次月经第一天日期');
      return;
    }

    const lmpDate = new Date(lmp + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lmpDate > today) {
      alert('末次月经日期不能在未来');
      return;
    }

    // Naegele's rule: EDD = LMP + 280 days
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280);

    const diffMs = today.getTime() - lmpDate.getTime();
    const daysElapsed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(daysElapsed / 7);
    const gestationalDays = daysElapsed % 7;

    const remainingMs = eddDate.getTime() - today.getTime();
    const daysRemaining = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60 * 24)));

    const totalPregnancyDays = 280;
    const elapsedDays = Math.min(daysElapsed, totalPregnancyDays);
    const progressPercent = Math.min(100, Math.round((elapsedDays / totalPregnancyDays) * 100));

    let trimester: string;
    let trimesterColor: string;
    if (gestationalWeeks < 13) {
      trimester = '孕早期（第一孕期）';
      trimesterColor = 'text-yellow-600 bg-yellow-50';
    } else if (gestationalWeeks < 28) {
      trimester = '孕中期（第二孕期）';
      trimesterColor = 'text-green-600 bg-green-50';
    } else {
      trimester = '孕晚期（第三孕期）';
      trimesterColor = 'text-red-600 bg-red-50';
    }

    // Format EDD
    const eddStr = `${eddDate.getFullYear()}年${eddDate.getMonth() + 1}月${eddDate.getDate()}日`;

    setResult({
      edd: eddStr,
      gestationalWeeks,
      gestationalDays,
      daysElapsed,
      daysRemaining,
      progressPercent,
      trimester,
      trimesterColor,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            👶 预产期计算器
          </h1>
          <p className="text-gray-500">输入末次月经第一天，自动推算预产期和当前孕周</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入日期</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">末次月经第一天 (LMP)</label>
            <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            计算预产期
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 计算结果</h3>

              <div className="text-center mb-4">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.edd}
                </div>
                <div className="text-sm text-gray-400 mt-1">预产期（Naegele 规则）</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-amber-600">{result.gestationalWeeks}周+{result.gestationalDays}天</div>
                  <div className="text-xs text-gray-500 mt-1">当前孕周</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-blue-600">{result.daysRemaining}</div>
                  <div className="text-xs text-gray-500 mt-1">距离预产期 (天)</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>LMP</span>
                  <span>孕期进度 {result.progressPercent}%</span>
                  <span>EDD</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-400 to-amber-400 transition-all duration-500"
                    style={{ width: `${result.progressPercent}%` }}
                  />
                </div>
              </div>

              <div className={`p-3 rounded-xl ${result.trimesterColor} text-center`}>
                <span className="font-bold">{result.trimester}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 孕期阶段参考</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <span className="font-medium">孕早期</span>
                  <span className="text-gray-500">0-13周</span>
                  <span className="text-xs text-gray-400">器官形成期，注意补充叶酸</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                  <span className="font-medium">孕中期</span>
                  <span className="text-gray-500">14-27周</span>
                  <span className="text-xs text-gray-400">可开始胎动，需产前筛查</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                  <span className="font-medium">孕晚期</span>
                  <span className="text-gray-500">28周至分娩</span>
                  <span className="text-xs text-gray-400">准备分娩，定期产检</span>
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
