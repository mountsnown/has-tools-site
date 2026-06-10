'use client';

import { useState } from 'react';

export default function GoutRiskPage() {
  const [uricAcid, setUricAcid] = useState('');
  const [gender, setGender] = useState('');
  const [jointPain, setJointPain] = useState('');
  const [tophi, setTophi] = useState('');
  const [diet, setDiet] = useState('');
  const [drinking, setDrinking] = useState('');
  const [bmi, setBmi] = useState('');
  const [result, setResult] = useState<null | {
    riskLevel: string;
    riskColor: string;
    riskScore: number;
    interpretation: string;
    suggestion: string;
    uricLevel: string;
  }>(null);

  const calculate = () => {
    const uaVal = parseFloat(uricAcid);
    const bmiVal = parseFloat(bmi);

    if (isNaN(uaVal) || !gender || !jointPain || !tophi || !diet || !drinking || isNaN(bmiVal)) {
      alert('请填写所有字段');
      return;
    }

    let score = 0;

    // Uric acid by gender
    let uricLevel: string;
    if (gender === 'male') {
      if (uaVal > 540) { score += 8; uricLevel = '严重升高'; }
      else if (uaVal > 480) { score += 6; uricLevel = '显著升高'; }
      else if (uaVal > 420) { score += 4; uricLevel = '偏高'; }
      else if (uaVal > 360) { score += 2; uricLevel = '正常高值'; }
      else { score += 0; uricLevel = '正常'; }
    } else {
      if (uaVal > 480) { score += 8; uricLevel = '严重升高'; }
      else if (uaVal > 420) { score += 6; uricLevel = '显著升高'; }
      else if (uaVal > 360) { score += 4; uricLevel = '偏高'; }
      else if (uaVal > 300) { score += 2; uricLevel = '正常高值'; }
      else { score += 0; uricLevel = '正常'; }
    }

    // Joint symptoms
    if (jointPain === 'yes') score += 5;
    else if (jointPain === 'sometimes') score += 2;

    // Tophi
    if (tophi === 'yes') score += 5;

    // Diet
    if (diet === 'high') score += 4;
    else if (diet === 'moderate') score += 2;

    // Drinking
    if (drinking === 'often') score += 3;
    else if (drinking === 'sometimes') score += 1;

    // BMI
    if (bmiVal >= 30) score += 4;
    else if (bmiVal >= 25) score += 2;
    else if (bmiVal >= 24) score += 1;

    let riskLevel: string;
    let riskColor: string;
    let interpretation: string;
    let suggestion: string;

    if (score >= 20) {
      riskLevel = '极高风险';
      riskColor = 'text-red-700 bg-red-100 border-red-300';
      interpretation = '您的血尿酸水平显著升高，合并多重危险因素，痛风发作风险极高。如已出现痛风石，表明已进入慢性痛风期。';
      suggestion = '强烈建议尽快到风湿免疫科就诊。可能需要降尿酸药物治疗（如别嘌醇、非布司他）。严格控制饮食：避免高嘌呤食物（内脏、海鲜、浓肉汤）、戒酒、多饮水（>2000ml/天）、控制体重。';
    } else if (score >= 13) {
      riskLevel = '高风险';
      riskColor = 'text-red-600 bg-red-50 border-red-200';
      interpretation = '血尿酸偏高，合并较多危险因素，痛风发作风险较高。';
      suggestion = '建议到风湿免疫科或内分泌科就诊，评估是否需要降尿酸治疗。严格控制饮食：限制高嘌呤食物、戒酒或严格限酒、每日饮水>2000ml。如有急性关节炎发作应及时就医。';
    } else if (score >= 7) {
      riskLevel = '中风险';
      riskColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
      interpretation = '存在一定的高尿酸血症和痛风风险因素，需要关注。';
      suggestion = '建议3-6个月复查血尿酸。调整饮食：减少高嘌呤食物摄入、少喝含糖饮料和啤酒、多饮水、适当减重。如出现关节红肿热痛及时就医。';
    } else {
      riskLevel = '低风险';
      riskColor = 'text-green-600 bg-green-50 border-green-200';
      interpretation = '目前痛风风险较低。';
      suggestion = '保持健康饮食和生活方式，多饮水，适度运动。建议每年体检包含血尿酸检测。';
    }

    setResult({ riskLevel, riskColor, riskScore: score, interpretation, suggestion, uricLevel });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🦶 痛风风险评估
          </h1>
          <p className="text-gray-500">综合血尿酸水平、关节症状和生活方式，评估痛风发作风险</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 输入您的信息</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">血尿酸 (μmol/L)</label>
              <input type="number" value={uricAcid} onChange={(e) => setUricAcid(e.target.value)} placeholder="如 480"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
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
              <label className="block text-sm font-medium text-gray-600 mb-1">关节红肿热痛发作</label>
              <select value={jointPain} onChange={(e) => setJointPain(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有（确诊或疑似痛风发作）</option>
                <option value="sometimes">偶尔关节不适</option>
                <option value="no">无</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">痛风石</label>
              <select value={tophi} onChange={(e) => setTophi(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="yes">有</option>
                <option value="no">无</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">高嘌呤饮食</label>
              <select value={diet} onChange={(e) => setDiet(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="high">经常（海鲜/内脏/浓汤）</option>
                <option value="moderate">偶尔</option>
                <option value="low">很少</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">饮酒频率</label>
              <select value={drinking} onChange={(e) => setDrinking(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors bg-white">
                <option value="">请选择</option>
                <option value="often">经常（≥3次/周）</option>
                <option value="sometimes">偶尔</option>
                <option value="no">从不</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">BMI</label>
              <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="如 26" step="0.1"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-colors" />
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

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">血尿酸水平</div>
                  <div className={`text-xl font-extrabold ${uricAcid && parseFloat(uricAcid) > 420 ? 'text-red-600' : 'text-green-600'}`}>
                    {result.uricLevel}
                  </div>
                </div>
                <div className={`rounded-xl p-4 text-center border ${result.riskColor}`}>
                  <div className="text-sm opacity-70 mb-1">风险等级</div>
                  <div className="text-xl font-extrabold">{result.riskLevel}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800 mb-3">
                <span className="font-bold">📋 分析：</span>{result.interpretation}
              </div>

              <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
                <span className="font-bold">💡 建议：</span>{result.suggestion}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📋 血尿酸参考范围</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">
                  <div className="font-medium text-gray-800 mb-1">男性</div>
                  <div className="text-gray-500">正常：150-420 μmol/L</div>
                  <div className="text-yellow-600">偏高：＞420 μmol/L</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <div className="font-medium text-gray-800 mb-1">女性（绝经前）</div>
                  <div className="text-gray-500">正常：90-360 μmol/L</div>
                  <div className="text-yellow-600">偏高：＞360 μmol/L</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                高尿酸血症诊断标准：非同日2次空腹血尿酸＞420 μmol/L
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
