'use client';

import { useState } from 'react';

export default function StrokeRiskPage() {
  const [age, setAge] = useState('');
  const [sbp, setSbp] = useState('');
  const [onTreatment, setOnTreatment] = useState('');
  const [diabetes, setDiabetes] = useState('');
  const [smoking, setSmoking] = useState('');
  const [cvd, setCvd] = useState('');
  const [afib, setAfib] = useState('');
  const [lvh, setLvh] = useState('');
  const [result, setResult] = useState<null | {
    riskPercent: number;
    riskLevel: string;
    riskColor: string;
    interpretation: string;
    suggestion: string;
  }>(null);

  const calculate = () => {
    const ageVal = parseInt(age);
    const sbpVal = parseInt(sbp);

    if (isNaN(ageVal) || isNaN(sbpVal) || !onTreatment || !diabetes || !smoking || !cvd || !afib || !lvh) {
      alert('请填写所有字段');
      return;
    }
    if (ageVal < 20 || ageVal > 100) {
      alert('年龄范围为20-100岁');
      return;
    }

    // Framingham Stroke Risk Score (simplified)
    let score = 0;

    // Age
    if (ageVal >= 85) score += 10;
    else if (ageVal >= 75) score += 7;
    else if (ageVal >= 65) score += 4;
    else if (ageVal >= 55) score += 2;
    else score += 0;

    // SBP (untreated)
    if (onTreatment === 'no') {
      if (sbpVal >= 160) score += 6;
      else if (sbpVal >= 140) score += 4;
      else if (sbpVal >= 120) score += 2;
      else score += 0;
    } else {
      // Treated
      if (sbpVal >= 160) score += 8;
      else if (sbpVal >= 140) score += 6;
      else if (sbpVal >= 120) score += 4;
      else score += 2;
    }

    // Diabetes
    if (diabetes === 'yes') score += 3;

    // Smoking
    if (smoking === 'yes') score += 2;

    // CVD history
    if (cvd === 'yes') score += 4;

    // Atrial fibrillation
    if (afib === 'yes') score += 4;

    // LVH
    if (lvh === 'yes') score += 3;

    // Convert score to 10-year risk percentage (approximate mapping)
    let riskPercent: number;
    if (score >= 30) riskPercent = 85;
    else if (score >= 25) riskPercent = 65;
    else if (score >= 20) riskPercent = 42;
    else if (score >= 15) riskPercent = 22;
    else if (score >= 12) riskPercent = 15;
    else if (score >= 9) riskPercent = 8;
    else if (score >= 6) riskPercent = 4;
    else if (score >= 3) riskPercent = 2;
    else riskPercent = 1;

    let riskLevel: string;
    let riskColor: string;
    let interpretation: string;
    let suggestion: string;

    if (riskPercent > 20) {
      riskLevel = '高危';
      riskColor = 'text-red-700 bg-red-100 border-red-300';
      interpretation = `10年卒中风险约为 ${riskPercent}%，属于高危人群。`;
      suggestion = '建议尽快到神经内科或心内科就诊，需要严格控制血压、血糖、血脂，可能需要抗血小板或抗凝治疗。严格戒烟，积极管理所有危险因素。';
    } else if (riskPercent >= 10) {
      riskLevel = '中危';
      riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
      interpretation = `10年卒中风险约为 ${riskPercent}%，属于中危人群。`;
      suggestion = '建议定期体检监测血压、血糖、血脂。积极改善生活方式：低盐低脂饮食、戒烟、规律运动、控制体重。如合并房颤需评估抗凝治疗。';
    } else {
      riskLevel = '低危';
      riskColor = 'text-green-600 bg-green-50 border-green-200';
      interpretation = `10年卒中风险约为 ${riskPercent}%，风险较低。`;
      suggestion = '保持健康生活方式：均衡饮食、规律运动、控制血压在正常范围、不吸烟。建议每年常规体检。';
    }

    setResult({ riskPercent, riskLevel, riskColor, interpretation, suggestion });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🧠 中风风险评估
          </h1>
          <p className="text-gray-500">基于改良 Framingham 卒中风险评分，评估10年卒中风险</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入您的信息</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">年龄 (岁)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="如 60"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">收缩压 (mmHg)</label>
              <input type="number" value={sbp} onChange={(e) => setSbp(e.target.value)} placeholder="如 140"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">正在服用降压药</label>
              <select value={onTreatment} onChange={(e) => setOnTreatment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">糖尿病</label>
              <select value={diabetes} onChange={(e) => setDiabetes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有</option>
                <option value="no">无</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">吸烟</label>
              <select value={smoking} onChange={(e) => setSmoking(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">心血管病史</label>
              <select value={cvd} onChange={(e) => setCvd(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有（心梗/心绞痛/冠脉支架等）</option>
                <option value="no">无</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">心房颤动</label>
              <select value={afib} onChange={(e) => setAfib(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有</option>
                <option value="no">无</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">左心室肥厚</label>
              <select value={lvh} onChange={(e) => setLvh(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有</option>
                <option value="no">无/不详</option>
              </select>
            </div>
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            计算风险
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 评估结果</h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.riskPercent}%
                </div>
                <div className="text-sm text-gray-400 mt-1">10年卒中风险</div>
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
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 风险等级参考</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                  <span>＜10%</span>
                  <span className="font-medium text-green-700">低危</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <span>10%-20%</span>
                  <span className="font-medium text-yellow-700">中危</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50">
                  <span>＞20%</span>
                  <span className="font-medium text-red-600">高危</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                参考：改良 Framingham 卒中风险评分（D&apos;Agostino et al., Stroke 1994）
              </p>
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
