'use client';

import { useState, useMemo } from 'react';

type PS = '' | '0-2' | '3-4';
type ChildPugh = '' | 'A/B' | 'C';
type YesNo = '' | '无' | '有';
type TumorCount = '' | '1' | '2-3' | '>=4';
type TumorSize = '' | '<=3cm' | '<=5cm' | '>3cm' | '>5cm';

interface StageResult {
  stage: string;
  stageDesc: string;
  treatment: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  prognosis: string;
}

function determineStage(
  ps: PS,
  childPugh: ChildPugh,
  extrahepatic: YesNo,
  vascularInvasion: YesNo,
  tumorCount: TumorCount,
  tumorSize: TumorSize,
): StageResult | null {
  if (!ps || !childPugh || !extrahepatic || !vascularInvasion || !tumorCount) return null;
  if (tumorCount !== '>=4' && !tumorSize) return null;

  // CNLC Stage IV: PS 3-4
  if (ps === '3-4') {
    return {
      stage: 'Ⅳ期',
      stageDesc: '终末期肝癌',
      treatment: ['对症支持治疗', '舒缓疗护', '肝移植评估（符合条件者）'],
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300',
      prognosis: '中位生存期约3-6个月，以改善生活质量为主要目标',
    };
  }

  // CNLC Stage IIIb: Child-Pugh C (without PS 3-4)
  if (childPugh === 'C') {
    return {
      stage: 'Ⅲb期',
      stageDesc: '肝功能失代偿或肝外转移的晚期肝癌',
      treatment: ['系统抗肿瘤治疗（靶向+免疫）', 'TACE（慎用）', '放疗（选择性）', '最佳支持治疗'],
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      prognosis: '需综合评估肝功能，Child-Pugh C级预后较差',
    };
  }

  // CNLC Stage IIIb: Extrahepatic metastasis
  if (extrahepatic === '有') {
    return {
      stage: 'Ⅲb期',
      stageDesc: '已发生肝外转移的晚期肝癌',
      treatment: ['系统抗肿瘤治疗（靶向+免疫联合）', 'TACE（肝内病灶控制）', '放疗（转移灶）', '对症支持治疗'],
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      prognosis: '系统治疗可延长生存期，靶向+免疫联合方案中位OS约20个月',
    };
  }

  // CNLC Stage IIIa: Vascular invasion
  if (vascularInvasion === '有') {
    return {
      stage: 'Ⅲa期',
      stageDesc: '合并血管侵犯但无肝外转移',
      treatment: ['TACE（肝动脉化疗栓塞）', '系统抗肿瘤治疗（靶向+免疫）', '手术切除评估（部分患者）', '放疗'],
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      prognosis: '综合治疗可改善预后，TACE联合系统治疗是主要方案',
    };
  }

  // CNLC Stage IIb: ≥4 tumors
  if (tumorCount === '>=4') {
    return {
      stage: 'Ⅱb期',
      stageDesc: '多发性肝癌（≥4个肿瘤）',
      treatment: ['TACE（肝动脉化疗栓塞）', '系统抗肿瘤治疗', '手术切除评估（选择性）', 'TACE联合消融'],
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      prognosis: 'TACE是主要治疗手段，联合系统治疗可延长生存期',
    };
  }

  // CNLC Stage IIa: 2-3 tumors, max diameter >3cm
  if (tumorCount === '2-3' && tumorSize === '>3cm') {
    return {
      stage: 'Ⅱa期',
      stageDesc: '2-3个肿瘤，最大直径>3cm',
      treatment: ['手术切除（首选）', 'TACE', '手术联合消融 / TACE联合消融', '肝移植评估'],
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      prognosis: '手术切除5年生存率40-60%，不适合手术者可选TACE联合消融',
    };
  }

  // CNLC Stage Ib: single tumor >5cm OR 2-3 tumors ≤3cm (CORRECTED)
  if (tumorCount === '2-3' && tumorSize === '<=3cm') {
    return {
      stage: 'Ⅰb期',
      stageDesc: '单个肿瘤>5cm 或 2-3个肿瘤最大直径≤3cm',
      treatment: ['手术切除（首选）', 'TACE', '消融 / TACE联合消融', '肝移植评估'],
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      prognosis: '手术切除5年生存率50-70%，综合治疗效果良好',
    };
  }

  if (tumorCount === '1' && tumorSize === '>5cm') {
    return {
      stage: 'Ⅰb期',
      stageDesc: '单个肿瘤>5cm 或 2-3个肿瘤最大直径≤3cm',
      treatment: ['手术切除（首选）', 'TACE', '消融 / TACE联合消融', '肝移植评估'],
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      prognosis: '手术切除5年生存率50-70%，综合治疗效果良好',
    };
  }

  // CNLC Stage Ia: single tumor ≤5cm
  if (tumorCount === '1' && tumorSize === '<=5cm') {
    return {
      stage: 'Ⅰa期',
      stageDesc: '单个肿瘤直径≤5cm的早期肝癌',
      treatment: ['手术切除（首选根治性治疗）', '局部消融（射频/微波）', '肝移植（符合米兰标准者）'],
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      prognosis: '5年生存率可达60-80%，早期发现治疗效果极佳',
    };
  }

  return null;
}

const psOptions = [
  { value: '0-2', label: 'PS 0-2分', desc: '能自由活动 / 能自理 / 卧床时间<50%' },
  { value: '3-4', label: 'PS 3-4分', desc: '卧床时间>50% / 完全卧床不起' },
];

const childPughOptions = [
  { value: 'A/B', label: 'Child-Pugh A/B级', desc: '肝功能代偿良好或轻度失代偿' },
  { value: 'C', label: 'Child-Pugh C级', desc: '肝功能严重失代偿' },
];

const yesNoOptions = [
  { value: '无', label: '无', desc: '' },
  { value: '有', label: '有', desc: '' },
];

const tumorCountOptions = [
  { value: '1', label: '1个', desc: '单发肿瘤' },
  { value: '2-3', label: '2-3个', desc: '多发肿瘤（≤3个）' },
  { value: '>=4', label: '≥4个', desc: '多发肿瘤（≥4个）' },
];

export default function LiverCancerStagingPage() {
  const [ps, setPs] = useState<PS>('');
  const [childPugh, setChildPugh] = useState<ChildPugh>('');
  const [extrahepatic, setExtrahepatic] = useState<YesNo>('');
  const [vascularInvasion, setVascularInvasion] = useState<YesNo>('');
  const [tumorCount, setTumorCount] = useState<TumorCount>('');
  const [tumorSize, setTumorSize] = useState<TumorSize>('');

  const result = useMemo(
    () => determineStage(ps, childPugh, extrahepatic, vascularInvasion, tumorCount, tumorSize),
    [ps, childPugh, extrahepatic, vascularInvasion, tumorCount, tumorSize],
  );

  const showTumorSize = tumorCount === '1' || tumorCount === '2-3';

  const tumorSizeOptions: { value: TumorSize; label: string; desc: string }[] = useMemo(() => {
    if (tumorCount === '1') {
      return [
        { value: '<=5cm', label: '≤5cm', desc: '单个肿瘤直径不超过5厘米' },
        { value: '>5cm', label: '>5cm', desc: '单个肿瘤直径超过5厘米' },
      ];
    }
    if (tumorCount === '2-3') {
      return [
        { value: '<=3cm', label: '最大直径≤3cm', desc: '最大肿瘤直径不超过3厘米' },
        { value: '>3cm', label: '最大直径>3cm', desc: '最大肿瘤直径超过3厘米' },
      ];
    }
    return [];
  }, [tumorCount]);

  const reset = () => {
    setPs('');
    setChildPugh('');
    setExtrahepatic('');
    setVascularInvasion('');
    setTumorCount('');
    setTumorSize('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
            🏥 肝癌CNLC分期自测
          </h1>
          <p className="text-gray-500">
            基于《原发性肝癌诊疗指南（2024版）》CNLC分期系统，输入临床指标即可获取分期和治疗建议
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">📋 请输入以下临床指标</h2>

          {/* PS Score */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              1. 体力活动状态（PS评分）
            </label>
            <div className="grid grid-cols-2 gap-3">
              {psOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPs(opt.value as PS)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    ps === opt.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Child-Pugh */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              2. 肝功能分级（Child-Pugh）
            </label>
            <div className="grid grid-cols-2 gap-3">
              {childPughOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setChildPugh(opt.value as ChildPugh)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    childPugh === opt.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Extrahepatic Metastasis */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              3. 肝外转移
            </label>
            <div className="grid grid-cols-2 gap-3">
              {yesNoOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExtrahepatic(opt.value as YesNo)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    extrahepatic === opt.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Vascular Invasion */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              4. 血管侵犯
            </label>
            <div className="grid grid-cols-2 gap-3">
              {yesNoOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setVascularInvasion(opt.value as YesNo)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    vascularInvasion === opt.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tumor Count */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              5. 肿瘤数量
            </label>
            <div className="grid grid-cols-3 gap-3">
              {tumorCountOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setTumorCount(opt.value as TumorCount);
                    setTumorSize('');
                  }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    tumorCount === opt.value
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tumor Size - Conditional */}
          {showTumorSize && (
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                6. 肿瘤大小
              </label>
              <div className="grid grid-cols-2 gap-3">
                {tumorSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTumorSize(opt.value as TumorSize)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      tumorSize === opt.value
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reset */}
          {result && (
            <button
              onClick={reset}
              className="w-full py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              重新评估
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {/* Stage Result */}
            <div className={`rounded-2xl shadow-sm border-2 ${result.borderColor} ${result.bgColor} p-6`}>
              <h3 className="font-bold text-gray-800 mb-4 text-lg">📊 分期结果</h3>
              <div className="text-center mb-4">
                <div className={`text-6xl font-extrabold ${result.color}`}>
                  {result.stage}
                </div>
                <div className="text-sm text-gray-500 mt-2">{result.stageDesc}</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/60">
                <span className="text-sm font-medium text-gray-600">预后参考</span>
                <span className="text-sm text-gray-800">{result.prognosis}</span>
              </div>
            </div>

            {/* Treatment */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">💊 推荐治疗方案</h3>
              <div className="space-y-2">
                {result.treatment.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CNLC Reference */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📖 CNLC分期速查表</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-1 text-left font-semibold">分期</th>
                      <th className="py-2 px-1 text-left font-semibold">PS</th>
                      <th className="py-2 px-1 text-left font-semibold">肝功能</th>
                      <th className="py-2 px-1 text-left font-semibold">肿瘤情况</th>
                      <th className="py-2 px-1 text-left font-semibold">血管侵犯</th>
                      <th className="py-2 px-1 text-left font-semibold">肝外转移</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-emerald-700">Ⅰa</td><td>0-2</td><td>A/B</td><td>单个≤5cm</td><td>无</td><td>无</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-green-700">Ⅰb</td><td>0-2</td><td>A/B</td><td>单个&gt;5cm 或 2-3个≤3cm</td><td>无</td><td>无</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-yellow-700">Ⅱa</td><td>0-2</td><td>A/B</td><td>2-3个&gt;3cm</td><td>无</td><td>无</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-amber-700">Ⅱb</td><td>0-2</td><td>A/B</td><td>≥4个</td><td>无</td><td>无</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-orange-700">Ⅲa</td><td>0-2</td><td>A/B</td><td>不限</td><td>有</td><td>无</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1.5 px-1 font-medium text-red-700">Ⅲb</td><td>0-2</td><td>A/B/C</td><td>不限</td><td>不限</td><td>有 / C级</td></tr>
                    <tr><td className="py-1.5 px-1 font-medium text-gray-700">Ⅳ</td><td>3-4</td><td>不限</td><td>不限</td><td>不限</td><td>不限</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          ⚠️ 本工具仅供医学专业人员临床参考和公众健康科普，不能替代医生诊断和治疗决策。具体诊疗方案请咨询主治医师。
        </p>
      </div>
    </div>
  );
}
