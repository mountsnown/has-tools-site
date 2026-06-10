'use client';

import { useState } from 'react';

const riskFactors = [
  { id: 'chf', label: '充血性心衰/左室功能不全', score: 1, desc: 'LVEF ≤40% 或有心衰症状' },
  { id: 'htn', label: '高血压', score: 1, desc: '已诊断高血压或正在服用降压药' },
  { id: 'age75', label: '年龄 ≥ 75岁', score: 2, desc: '' },
  { id: 'dm', label: '糖尿病', score: 1, desc: '已诊断糖尿病' },
  { id: 'stroke', label: '卒中/TIA/血栓栓塞史', score: 2, desc: '既往脑梗死、短暂性脑缺血发作或外周动脉栓塞' },
  { id: 'vascular', label: '血管疾病', score: 1, desc: '既往心梗、外周动脉疾病、主动脉斑块' },
  { id: 'age65', label: '年龄 65-74岁', score: 1, desc: '' },
  { id: 'female', label: '性别女性', score: 1, desc: '' },
];

export default function Cha2ds2VascPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<null | {
    totalScore: number;
    riskLevel: string;
    riskColor: string;
    annualStrokeRisk: string;
    recommendation: string;
    recommendationDetail: string;
  }>(null);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculate = () => {
    let score = 0;
    riskFactors.forEach((f) => {
      if (checked[f.id]) score += f.score;
    });

    // Annual stroke risk based on score
    const riskMap: Record<number, string> = {
      0: '~0.2%',
      1: '~0.6%',
      2: '~1.5%',
      3: '~2.9%',
      4: '~4.3%',
      5: '~6.5%',
      6: '~9.7%',
      7: '~11.2%',
      8: '~12.5%',
      9: '~15.2%',
    };

    const annualRisk = riskMap[score] || '>15%';

    const isFemale = checked['female'];

    let riskLevel: string;
    let riskColor: string;
    let recommendation: string;
    let recommendationDetail: string;

    if (isFemale) {
      if (score <= 1) {
        riskLevel = '低风险';
        riskColor = 'text-green-600 bg-green-50 border-green-200';
        recommendation = '无需抗凝治疗';
        recommendationDetail = '女性CHA₂DS₂-VASc评分≤1分，年卒中风险<1%，不建议口服抗凝药。建议管理高血压等可干预危险因素。';
      } else if (score === 2) {
        riskLevel = '中风险';
        riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
        recommendation = '考虑口服抗凝治疗';
        recommendationDetail = '女性评分2分，年卒中风险约1.5%，建议综合考虑出血风险和患者意愿后决定是否使用口服抗凝药（如华法林或新型口服抗凝药NOAC）。';
      } else {
        riskLevel = '高风险';
        riskColor = 'text-red-600 bg-red-50 border-red-200';
        recommendation = '推荐口服抗凝治疗';
        recommendationDetail = `女性评分≥3分，年卒中风险较高（${annualRisk}/年），明确推荐口服抗凝治疗。优先考虑新型口服抗凝药（NOAC如达比加群、利伐沙班等），需评估出血风险和肾功能。`;
      }
    } else {
      if (score === 0) {
        riskLevel = '低风险';
        riskColor = 'text-green-600 bg-green-50 border-green-200';
        recommendation = '无需抗凝治疗';
        recommendationDetail = '男性CHA₂DS₂-VASc评分0分，年卒中风险约0.2%，不建议口服抗凝药。';
      } else if (score === 1) {
        riskLevel = '中风险';
        riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
        recommendation = '考虑口服抗凝治疗';
        recommendationDetail = '男性评分1分，年卒中风险约0.6%，建议综合评估后考虑是否使用口服抗凝药。';
      } else {
        riskLevel = '高风险';
        riskColor = 'text-red-600 bg-red-50 border-red-200';
        recommendation = '推荐口服抗凝治疗';
        recommendationDetail = `男性评分≥2分，年卒中风险较高（${annualRisk}/年），明确推荐口服抗凝治疗。优先考虑NOAC，需评估出血风险。`;
      }
    }

    setResult({
      totalScore: score,
      riskLevel,
      riskColor,
      annualStrokeRisk: annualRisk,
      recommendation,
      recommendationDetail,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            💓 CHA₂DS₂-VASc 卒中评分
          </h1>
          <p className="text-gray-500">房颤患者卒中风险评估，指导抗凝治疗决策（ACC/AHA/ESC指南推荐）</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 勾选存在的危险因素</h2>

          <div className="space-y-2 mb-4">
            {riskFactors.map((f) => (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  checked[f.id]
                    ? 'border-red-400 bg-red-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <span className={`font-medium ${checked[f.id] ? 'text-red-600' : 'text-gray-700'}`}>
                    {f.label}
                  </span>
                  {f.desc && <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${checked[f.id] ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                    +{f.score}分
                  </span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    checked[f.id] ? 'border-red-500 bg-red-500' : 'border-gray-300'
                  }`}>
                    {checked[f.id] && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button onClick={calculate}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all shadow-lg shadow-red-200">
            计算评分
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 评分结果</h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-amber-600">{result.totalScore}</div>
                  <div className="text-xs text-gray-500 mt-1">总分 (0-9)</div>
                </div>
                <div className={`rounded-xl p-4 text-center border ${result.riskColor}`}>
                  <div className="text-lg font-extrabold">{result.riskLevel}</div>
                  <div className="text-xs opacity-70 mt-1">风险等级</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-lg font-extrabold text-gray-700">{result.annualStrokeRisk}</div>
                  <div className="text-xs text-gray-500 mt-1">年卒中风险</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800 mb-3">
                <span className="font-bold">💡 {result.recommendation}</span>
                <p className="mt-1">{result.recommendationDetail}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 评分参考</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 rounded-xl bg-green-50">
                  <span className="font-medium text-green-700">男性0分 / 女性≤1分</span>
                  <span className="text-gray-500 ml-2">— 低风险，不建议抗凝</span>
                </div>
                <div className="p-3 rounded-xl bg-yellow-50">
                  <span className="font-medium text-yellow-700">男性1分 / 女性2分</span>
                  <span className="text-gray-500 ml-2">— 中风险，可考虑抗凝</span>
                </div>
                <div className="p-3 rounded-xl bg-red-50">
                  <span className="font-medium text-red-600">男性≥2分 / 女性≥3分</span>
                  <span className="text-gray-500 ml-2">— 高风险，推荐抗凝</span>
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
