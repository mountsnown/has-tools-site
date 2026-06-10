'use client';

import { useState } from 'react';

export default function EgfrPage() {
  const [creatinine, setCreatinine] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState<null | {
    egfr: number;
    stage: string;
    stageLabel: string;
    color: string;
    interpretation: string;
    suggestion: string;
  }>(null);

  const ckdStages = [
    { stage: 'G1', min: 90, label: '正常或偏高', color: 'text-green-600 bg-green-50', desc: '肾小球滤过率正常，但可能存在肾脏结构损伤（如蛋白尿、血尿）。', suggestion: '如存在蛋白尿、血尿或肾结构异常，需明确病因。建议每年复查肾功能和尿常规。' },
    { stage: 'G2', min: 60, label: '轻度下降', color: 'text-green-600 bg-green-50', desc: '肾功能轻度下降，大致相当于正常衰老水平。', suggestion: '如有蛋白尿或基础肾病（如糖尿病、高血压），需积极控制原发病。建议每6-12个月复查。' },
    { stage: 'G3a', min: 45, label: '轻中度下降', color: 'text-yellow-600 bg-yellow-50', desc: '慢性肾脏病3a期，肾功能中度下降。', suggestion: '建议到肾内科就诊，评估CKD病因。积极控制血压(目标<130/80)、血糖。避免肾毒性药物（如NSAIDs类止痛药）。' },
    { stage: 'G3b', min: 30, label: '中重度下降', color: 'text-orange-600 bg-orange-50', desc: '慢性肾脏病3b期，肾功能已明显受损。', suggestion: '必须肾内科随访。严格控制血压、血糖、血脂。可能需要低蛋白饮食。评估贫血、钙磷代谢等并发症。' },
    { stage: 'G4', min: 15, label: '重度下降', color: 'text-red-600 bg-red-50', desc: '慢性肾脏病4期，肾功能严重下降，接近肾衰竭。', suggestion: '需肾内科密切随访（每1-3月）。开始肾脏替代治疗（透析或移植）准备。严格控制饮食（限钾、磷、蛋白）。建立血管通路。' },
    { stage: 'G5', min: 0, label: '肾衰竭', color: 'text-red-800 bg-red-100', desc: '慢性肾脏病5期，肾衰竭阶段。', suggestion: '通常需要开始肾脏替代治疗（血液透析、腹膜透析或肾移植）。肾内科制定个体化治疗方案。' },
  ];

  const calculate = () => {
    const crVal = parseFloat(creatinine);
    const ageVal = parseInt(age);

    if (isNaN(crVal) || isNaN(ageVal) || !gender) {
      alert('请填写所有字段');
      return;
    }
    if (crVal < 10 || crVal > 1500) {
      alert('请输入合理的血肌酐值（10-1500 μmol/L）');
      return;
    }
    if (ageVal < 18 || ageVal > 120) {
      alert('本工具适用于18-120岁成人');
      return;
    }

    // Convert μmol/L to mg/dL for formula
    const crMgDl = crVal / 88.4;

    // CKD-EPI 2021 formula (without race coefficient)
    let kappa: number;
    let alpha: number;
    let sexCoeff: number;

    if (gender === 'female') {
      kappa = 0.7;
      alpha = crMgDl <= kappa ? -0.241 : -1.200;
      sexCoeff = 1.012;
    } else {
      kappa = 0.9;
      alpha = crMgDl <= kappa ? -0.302 : -1.200;
      sexCoeff = 1.0;
    }

    const ratio = crMgDl / kappa;
    let egfrVal = 142 * Math.pow(ratio, alpha) * Math.pow(0.9938, ageVal) * sexCoeff;

    // Clamp
    egfrVal = Math.round(egfrVal);

    // Find CKD stage
    let stageInfo = ckdStages[ckdStages.length - 1];
    for (let i = 0; i < ckdStages.length; i++) {
      if (egfrVal >= ckdStages[i].min) {
        stageInfo = ckdStages[i];
        break;
      }
    }

    setResult({
      egfr: egfrVal,
      stage: stageInfo.stage,
      stageLabel: stageInfo.label,
      color: stageInfo.color,
      interpretation: stageInfo.desc,
      suggestion: stageInfo.suggestion,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🫘 eGFR 肾小球滤过率计算
          </h1>
          <p className="text-gray-500">基于 CKD-EPI 2021 公式，评估肾脏功能分期</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入检测指标</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">血肌酐 (μmol/L)</label>
              <input type="number" value={creatinine} onChange={(e) => setCreatinine(e.target.value)} placeholder="如 88"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">年龄 (岁)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="如 50"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">性别</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2.5 rounded-xl border font-medium transition-all ${gender === 'male' ? 'border-red-400 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >男</button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2.5 rounded-xl border font-medium transition-all ${gender === 'female' ? 'border-red-400 bg-red-50 text-red-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >女</button>
            </div>
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            计算 eGFR
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 计算结果</h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.egfr}
                </div>
                <div className="text-sm text-gray-400 mt-1">eGFR (mL/min/1.73m²)</div>
              </div>

              <div className={`p-4 rounded-xl ${result.color} mb-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">CKD分期：</span>
                  <span className="text-lg font-extrabold">{result.stage} — {result.stageLabel}</span>
                </div>
                <p className="text-sm mt-2 opacity-80">{result.interpretation}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-bold">💡 建议：</span>{result.suggestion}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 CKD分期参考 (KDIGO 2024)</h3>
              <div className="space-y-2 text-sm">
                {ckdStages.map((s) => (
                  <div key={s.stage} className={`flex items-center justify-between p-2 rounded-lg ${s.color} ${result.stage === s.stage ? 'ring-2 ring-offset-1 ring-red-400' : ''}`}>
                    <span className="font-medium">{s.stage}期</span>
                    <span className="text-xs opacity-70">{s.min === 0 ? '<15' : `≥${s.min}`} mL/min</span>
                    <span>{s.label}</span>
                  </div>
                ))}
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
