'use client';

import { useState } from 'react';

const peFactors = [
  { id: 'pe_dvt', label: 'DVT临床症状和体征', score: 3, desc: '下肢肿胀、疼痛、沿深静脉压痛' },
  { id: 'pe_alt', label: 'PE可能性大于其他诊断', score: 3, desc: '临床表现更符合肺栓塞而非其他疾病' },
  { id: 'pe_hr', label: '心率 > 100次/分', score: 1.5, desc: '' },
  { id: 'pe_immob', label: '制动或外科手术 < 4周', score: 1.5, desc: '近4周内有卧床≥3天、全麻手术或下肢骨折石膏固定' },
  { id: 'pe_history', label: '既往DVT/PE史', score: 1.5, desc: '曾确诊深静脉血栓或肺栓塞' },
  { id: 'pe_hemoptysis', label: '咯血', score: 1, desc: '咳嗽带血或痰中带血' },
  { id: 'pe_cancer', label: '恶性肿瘤（活动期）', score: 1, desc: '6个月内接受治疗或姑息治疗中的恶性肿瘤' },
];

const dvtFactors = [
  { id: 'dvt_cancer', label: '活动性癌症', score: 1, desc: '6个月内治疗或姑息治疗中' },
  { id: 'dvt_paralysis', label: '下肢麻痹/瘫痪/石膏固定', score: 1, desc: '' },
  { id: 'dvt_bed', label: '卧床 > 3天或大手术 < 12周', score: 1, desc: '' },
  { id: 'dvt_tenderness', label: '沿深静脉走行局部压痛', score: 1, desc: '' },
  { id: 'dvt_swelling', label: '全腿肿胀', score: 1, desc: '患侧明显 > 健侧' },
  { id: 'dvt_calf', label: '小腿肿胀 > 健侧3cm', score: 1, desc: '胫骨粗隆下10cm处测量' },
  { id: 'dvt_edema', label: '患肢凹陷性水肿', score: 1, desc: '有症状侧明显' },
  { id: 'dvt_collateral', label: '浅静脉侧支循环', score: 1, desc: '患肢浅表静脉扩张（非静脉曲张）' },
  { id: 'dvt_history', label: '既往DVT史', score: 1, desc: '' },
  { id: 'dvt_alt', label: '其他诊断可能性 ≥ DVT', score: -2, desc: '如贝克囊肿、淋巴水肿、肌肉损伤等可解释症状' },
];

export default function WellsScorePage() {
  const [activeTab, setActiveTab] = useState<'pe' | 'dvt'>('pe');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<null | {
    totalScore: number;
    probability: string;
    probabilityColor: string;
    interpretation: string;
    suggestion: string;
  }>(null);

  const factors = activeTab === 'pe' ? peFactors : dvtFactors;

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const switchTab = (tab: 'pe' | 'dvt') => {
    setActiveTab(tab);
    setChecked({});
    setResult(null);
  };

  const calculate = () => {
    let score = 0;
    factors.forEach((f) => {
      if (checked[f.id]) score += f.score;
    });

    let probability: string;
    let probabilityColor: string;
    let interpretation: string;
    let suggestion: string;

    if (activeTab === 'pe') {
      if (score > 4) {
        probability = '高概率（PE likely）';
        probabilityColor = 'text-red-700 bg-red-100 border-red-300';
        interpretation = 'Wells PE评分 > 4分，肺栓塞临床高概率。';
        suggestion = '建议立即行CTPA（CT肺动脉造影）明确诊断。如CTPA有禁忌或不能及时完成，可先行下肢静脉加压超声。在等待确诊期间如高度可疑可考虑经验性抗凝。';
      } else if (score > 0) {
        probability = '低概率（PE unlikely）';
        probabilityColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
        interpretation = `Wells PE评分 ≤ 4分（${score}分），肺栓塞临床低概率。`;
        suggestion = '建议检测D-二聚体。如D-二聚体正常可基本排除PE（PEP研究 ≥ 4分为阳性界值的不作此推荐）；如D-二聚体升高则行CTPA进一步评估。';
      } else {
        probability = '低概率（PE unlikely）';
        probabilityColor = 'text-green-600 bg-green-50 border-green-200';
        interpretation = `Wells PE评分 ${score}分，肺栓塞临床低概率。`;
        suggestion = '建议检测D-二聚体。如D-二聚体正常可基本排除PE。如D-二聚体升高再考虑CTPA。';
      }
    } else {
      if (score >= 2) {
        probability = '高概率（DVT likely）';
        probabilityColor = 'text-red-700 bg-red-100 border-red-300';
        interpretation = `Wells DVT评分 ≥ 2分（${score}分），深静脉血栓临床高概率。`;
        suggestion = '建议尽快行下肢静脉加压超声（CUS）检查。可同时检测D-二聚体。在等待确诊期间如高度可疑，可考虑经验性抗凝。';
      } else {
        probability = '低概率（DVT unlikely）';
        probabilityColor = 'text-green-600 bg-green-50 border-green-200';
        interpretation = `Wells DVT评分 < 2分（${score}分），深静脉血栓临床低概率。`;
        suggestion = '建议检测D-二聚体。如D-二聚体正常可基本排除DVT；如升高则行下肢静脉加压超声。';
      }
    }

    setResult({ totalScore: score, probability, probabilityColor, interpretation, suggestion });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🫧 Wells 肺栓塞/DVT评分
          </h1>
          <p className="text-gray-500">评估深静脉血栓和肺栓塞临床概率，辅助诊断与D-二聚体检测决策</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => switchTab('pe')}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'pe' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              PE 肺栓塞评分
            </button>
            <button
              onClick={() => switchTab('dvt')}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'dvt' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              DVT 深静脉血栓评分
            </button>
          </div>

          <h2 className="font-bold text-gray-800 mb-4 text-lg">
            📋 {activeTab === 'pe' ? 'PE Wells 评分标准' : 'DVT Wells 评分标准'}
          </h2>

          <div className="space-y-2 mb-4">
            {factors.map((f) => (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  checked[f.id]
                    ? 'border-red-400 bg-red-50 shadow-sm'
                    : f.score < 0
                    ? 'border-blue-200 hover:border-blue-300'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-1">
                  <span className={`font-medium text-sm ${checked[f.id] ? 'text-red-600' : 'text-gray-700'}`}>
                    {f.label}
                  </span>
                  {f.desc && <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                    f.score < 0
                      ? 'bg-blue-100 text-blue-600'
                      : checked[f.id]
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {f.score > 0 ? '+' : ''}{f.score}分
                  </span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
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

              <div className="text-center mb-4">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                  {result.totalScore}
                </div>
                <div className="text-sm text-gray-400 mt-1">总评分</div>
              </div>

              <div className={`p-4 rounded-xl border ${result.probabilityColor} mb-3`}>
                <span className="font-bold">{result.probability}</span>
                <p className="text-sm mt-1 opacity-80">{result.interpretation}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-bold">💡 下一步建议：</span>{result.suggestion}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 评分界值</h3>
              <div className="space-y-2 text-sm">
                {activeTab === 'pe' ? (
                  <>
                    <div className="p-3 rounded-xl bg-green-50">
                      <span className="font-medium text-green-700">≤ 4分 — PE低概率</span>
                      <span className="text-gray-500 ml-2">→ 测D-二聚体</span>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50">
                      <span className="font-medium text-red-600">{'>'} 4分 — PE高概率</span>
                      <span className="text-gray-500 ml-2">→ 直接CTPA</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-green-50">
                      <span className="font-medium text-green-700">{'<'} 2分 — DVT低概率</span>
                      <span className="text-gray-500 ml-2">→ 测D-二聚体</span>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50">
                      <span className="font-medium text-red-600">≥ 2分 — DVT高概率</span>
                      <span className="text-gray-500 ml-2">→ 加压超声检查</span>
                    </div>
                  </>
                )}
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
