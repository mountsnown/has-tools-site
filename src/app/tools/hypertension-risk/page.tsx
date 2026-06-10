'use client';

import { useState } from 'react';

export default function HypertensionRiskPage() {
  const [sbp, setSbp] = useState('');
  const [dbp, setDbp] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [smoking, setSmoking] = useState('');
  const [drinking, setDrinking] = useState('');
  const [result, setResult] = useState<null | {
    bpLevel: string;
    bpColor: string;
    riskLevel: string;
    riskColor: string;
    riskScore: number;
    advice: string;
  }>(null);

  const bpClassification = [
    { range: '<120 / <80', systolic: '<120', diastolic: '<80', level: '理想血压', color: 'text-green-600 bg-green-50' },
    { range: '120-139 / 80-89', systolic: '120-139', diastolic: '80-89', level: '正常高值', color: 'text-yellow-600 bg-yellow-50' },
    { range: '140-159 / 90-99', systolic: '140-159', diastolic: '90-99', level: '高血压1级（轻度）', color: 'text-orange-600 bg-orange-50' },
    { range: '160-179 / 100-109', systolic: '160-179', diastolic: '100-109', level: '高血压2级（中度）', color: 'text-red-600 bg-red-50' },
    { range: '≥180 / ≥110', systolic: '≥180', diastolic: '≥110', level: '高血压3级（重度）', color: 'text-red-800 bg-red-100' },
  ];

  const getBPLevel = (sbpVal: number, dbpVal: number) => {
    if (sbpVal >= 180 || dbpVal >= 110) return bpClassification[4];
    if (sbpVal >= 160 || dbpVal >= 100) return bpClassification[3];
    if (sbpVal >= 140 || dbpVal >= 90) return bpClassification[2];
    if (sbpVal >= 120 || dbpVal >= 80) return bpClassification[1];
    return bpClassification[0];
  };

  const calculate = () => {
    const sbpVal = parseFloat(sbp);
    const dbpVal = parseFloat(dbp);
    const ageVal = parseInt(age);
    const bmiVal = parseFloat(bmi);

    if (isNaN(sbpVal) || isNaN(dbpVal) || isNaN(ageVal) || isNaN(bmiVal) || !familyHistory || !smoking || !drinking) {
      alert('请填写所有字段');
      return;
    }
    if (sbpVal < 60 || sbpVal > 260 || dbpVal < 30 || dbpVal > 150) {
      alert('请输入合理的血压值（收缩压60-260，舒张压30-150 mmHg）');
      return;
    }

    const bp = getBPLevel(sbpVal, dbpVal);

    let riskScore = 0;
    if (sbpVal >= 140 || dbpVal >= 90) riskScore += 4;
    else if (sbpVal >= 130 || dbpVal >= 85) riskScore += 2;
    if (ageVal >= 55) riskScore += 2;
    else if (ageVal >= 45) riskScore += 1;
    if (bmiVal >= 28) riskScore += 3;
    else if (bmiVal >= 24) riskScore += 1;
    if (familyHistory === 'yes') riskScore += 2;
    if (smoking === 'yes') riskScore += 2;
    if (drinking === 'often') riskScore += 2;
    else if (drinking === 'sometimes') riskScore += 1;

    let riskLevel: string;
    let riskColor: string;
    let advice: string;
    if (riskScore >= 10) {
      riskLevel = '极高风险';
      riskColor = 'text-red-700 bg-red-100 border-red-300';
      advice = '您的血压水平和危险因素较多，心血管事件风险极高。强烈建议尽快到心内科就诊，可能需要立即开始药物治疗，并严格控制生活方式。';
    } else if (riskScore >= 7) {
      riskLevel = '高风险';
      riskColor = 'text-red-600 bg-red-50 border-red-200';
      advice = '您的综合风险较高，建议前往医院心内科评估，可能需开始降压治疗。同时应低盐低脂饮食、控制体重、戒烟限酒、规律运动。';
    } else if (riskScore >= 4) {
      riskLevel = '中风险';
      riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
      advice = '建议3-6个月内复查血压，改善生活方式：限盐（<6g/天）、控制体重、增加运动、戒烟限酒。如血压持续升高应及时就医。';
    } else {
      riskLevel = '低风险';
      riskColor = 'text-green-600 bg-green-50 border-green-200';
      advice = '目前风险较低，保持健康生活方式：低盐饮食、规律运动、控制体重、避免吸烟和过量饮酒。建议每年至少测量一次血压。';
    }

    setResult({
      bpLevel: bp.level,
      bpColor: bp.color,
      riskLevel,
      riskColor,
      riskScore,
      advice,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🫀 高血压风险评估
          </h1>
          <p className="text-gray-500">参考《中国高血压防治指南》，综合评估高血压风险等级</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入您的健康指标</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">收缩压 (mmHg)</label>
              <input type="number" value={sbp} onChange={(e) => setSbp(e.target.value)} placeholder="如 135"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">舒张压 (mmHg)</label>
              <input type="number" value={dbp} onChange={(e) => setDbp(e.target.value)} placeholder="如 85"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">年龄 (岁)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="如 45"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">BMI (体重kg/身高m²)</label>
              <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="如 24.5" step="0.1"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">高血压家族史</label>
              <select value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有</option>
                <option value="no">无</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-600 mb-1">饮酒</label>
              <select value={drinking} onChange={(e) => setDrinking(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="often">经常（≥3次/周）</option>
                <option value="sometimes">偶尔</option>
                <option value="no">从不</option>
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
              <div className={`p-4 rounded-xl ${result.bpColor} mb-3`}>
                <span className="font-bold">血压分级：</span>{result.bpLevel}
              </div>
              <div className={`p-4 rounded-xl border ${result.riskColor} mb-3`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">综合风险等级：</span>
                  <span className="text-lg font-extrabold">{result.riskLevel}</span>
                </div>
                <p className="text-sm mt-2 opacity-80">风险评分：{result.riskScore} 分</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-bold">💡 建议：</span>{result.advice}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 血压分级参考</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-500 font-medium">分级</th>
                      <th className="text-left py-2 text-gray-500 font-medium">收缩压 (mmHg)</th>
                      <th className="text-left py-2 text-gray-500 font-medium">舒张压 (mmHg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bpClassification.map((item) => (
                      <tr key={item.level} className={`border-b border-gray-100 ${item.level === result.bpLevel ? 'font-bold' : ''}`}>
                        <td className={`py-2 px-1 rounded ${item.level === result.bpLevel ? item.color : 'text-gray-700'}`}>
                          {item.level}
                        </td>
                        <td className="py-2 text-gray-600">{item.systolic}</td>
                        <td className="py-2 text-gray-600">{item.diastolic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
