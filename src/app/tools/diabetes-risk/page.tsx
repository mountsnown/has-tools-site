'use client';

import { useState } from 'react';

const ageGroups = [
  { label: '20-24岁', value: '20-24', score: 0 },
  { label: '25-34岁', value: '25-34', score: 4 },
  { label: '35-39岁', value: '35-39', score: 8 },
  { label: '40-44岁', value: '40-44', score: 11 },
  { label: '45-49岁', value: '45-49', score: 12 },
  { label: '50-54岁', value: '50-54', score: 13 },
  { label: '55-59岁', value: '55-59', score: 15 },
  { label: '60-64岁', value: '60-64', score: 16 },
  { label: '65岁及以上', value: '65+', score: 18 },
];

export default function DiabetesRiskPage() {
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const [waist, setWaist] = useState('');
  const [bmi, setBmi] = useState('');
  const [sbp, setSbp] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [result, setResult] = useState<null | {
    totalScore: number;
    riskLevel: string;
    riskColor: string;
    interpretation: string;
    suggestion: string;
  }>(null);

  const calculate = () => {
    const waistVal = parseFloat(waist);
    const bmiVal = parseFloat(bmi);
    const sbpVal = parseFloat(sbp);

    if (!ageGroup || !gender || isNaN(waistVal) || isNaN(bmiVal) || isNaN(sbpVal) || !familyHistory) {
      alert('请填写所有字段');
      return;
    }

    let score = 0;

    // Age score
    const ageItem = ageGroups.find((a) => a.value === ageGroup);
    if (ageItem) score += ageItem.score;

    // Waist circumference
    if (gender === 'male') {
      if (waistVal < 75) score += 0;
      else if (waistVal < 80) score += 3;
      else if (waistVal < 85) score += 5;
      else if (waistVal < 90) score += 7;
      else score += 9;
    } else {
      if (waistVal < 70) score += 0;
      else if (waistVal < 75) score += 3;
      else if (waistVal < 80) score += 5;
      else if (waistVal < 85) score += 7;
      else score += 9;
    }

    // BMI
    if (bmiVal < 22) score += 0;
    else if (bmiVal < 24) score += 2;
    else if (bmiVal < 28) score += 4;
    else score += 6;

    // SBP
    if (sbpVal < 110) score += 0;
    else if (sbpVal < 120) score += 1;
    else if (sbpVal < 130) score += 3;
    else if (sbpVal < 140) score += 6;
    else score += 8;

    // Family history
    if (familyHistory === 'yes') score += 6;

    // Gender bonus (male slightly higher risk)
    if (gender === 'male') score += 1;

    let riskLevel: string;
    let riskColor: string;
    let interpretation: string;
    let suggestion: string;

    if (score >= 35) {
      riskLevel = '极高风险';
      riskColor = 'text-red-700 bg-red-100 border-red-300';
      interpretation = '您的糖尿病风险评分很高，患2型糖尿病的可能性较大。';
      suggestion = '强烈建议尽快到内分泌科就诊，进行空腹血糖、OGTT（口服葡萄糖耐量试验）和HbA1c检查。同时应立即开始生活方式干预：控制饮食、减重、增加运动。';
    } else if (score >= 25) {
      riskLevel = '高风险';
      riskColor = 'text-red-600 bg-red-50 border-red-200';
      interpretation = '您属于糖尿病高危人群，建议进行OGTT筛查。';
      suggestion = '建议前往医院内分泌科进行OGTT筛查。开始生活方式干预：控制总热量摄入、每周至少150分钟中等强度运动、减重5-10%。定期监测血糖。';
    } else if (score >= 15) {
      riskLevel = '中风险';
      riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
      interpretation = '存在一定的糖尿病危险因素，需关注。';
      suggestion = '建议每年体检时关注空腹血糖。保持健康饮食、规律运动、控制腰围。如有条件可测HbA1c了解近3月平均血糖水平。';
    } else {
      riskLevel = '低风险';
      riskColor = 'text-green-600 bg-green-50 border-green-200';
      interpretation = '目前糖尿病风险较低。';
      suggestion = '保持健康生活方式：均衡饮食、规律运动、维持健康体重。建议每年常规体检包含空腹血糖检测。';
    }

    setResult({ totalScore: score, riskLevel, riskColor, interpretation, suggestion });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🩸 糖尿病风险评估
          </h1>
          <p className="text-gray-500">基于《中国2型糖尿病防治指南》风险评分表，评估患病风险</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入您的健康指标</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">年龄</label>
              <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                {ageGroups.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">性别</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">腰围 (cm)</label>
              <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="如 85"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">BMI (kg/m²)</label>
              <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="如 24.5" step="0.1"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">收缩压 (mmHg)</label>
              <input type="number" value={sbp} onChange={(e) => setSbp(e.target.value)} placeholder="如 130"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">糖尿病家族史</label>
              <select value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有（父母/兄弟姐妹/子女）</option>
                <option value="no">无</option>
              </select>
            </div>
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            开始评估
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 评估结果</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.totalScore}
                </div>
                <div className="text-sm text-gray-400 mt-1">风险评分总分</div>
              </div>
              <div className={`p-4 rounded-xl border ${result.riskColor} mb-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">风险等级：</span>
                  <span className="text-lg font-extrabold">{result.riskLevel}</span>
                </div>
                <p className="text-sm mt-2 opacity-80">{result.interpretation}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-bold">💡 建议：</span>{result.suggestion}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 风险评分解读</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                  <span>＜15分</span><span className="font-medium text-green-700">低风险</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <span>15-24分</span><span className="font-medium text-yellow-700">中风险</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                  <span>25-34分</span><span className="font-medium text-red-600">高风险（建议OGTT筛查）</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-100">
                  <span>≥35分</span><span className="font-medium text-red-700">极高风险</span>
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
