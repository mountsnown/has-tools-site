'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import RelatedTools from '@/components/RelatedTools';

type Step = 1 | 2 | 3;
type ResultType = 'need-treatment' | 'optional-treatment' | 'no-treatment' | 'normal' | null;

const resultConfig: Record<NonNullable<ResultType>, { label: string; color: string; bg: string; desc: string }> = {
  'need-treatment': {
    label: '需要抗病毒治疗',
    color: 'text-red-700',
    bg: 'bg-red-50',
    desc: '根据检测结果，您需要开始抗病毒治疗。建议尽快咨询专科医生制定治疗方案。',
  },
  'optional-treatment': {
    label: '可考虑抗病毒治疗',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    desc: '高敏HBV DNA检测阳性，可考虑抗病毒治疗。建议咨询专科医生评估是否需要治疗。',
  },
  'no-treatment': {
    label: '不需要抗病毒治疗',
    color: 'text-green-700',
    bg: 'bg-green-50',
    desc: '高敏HBV DNA检测阴性，目前不需要抗病毒治疗。建议定期复查。',
  },
  normal: {
    label: '非乙肝携带者 / 未感染',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    desc: 'HBsAg阴性，表示您不是乙肝病毒携带者或未感染乙肝病毒。',
  },
};

export default function HepatitisBtreatmentPage() {
  const [step, setStep] = useState<Step>(1);
  const [result, setResult] = useState<ResultType>(null);

  const handleHBsAg = (positive: boolean) => {
    if (!positive) {
      setResult('normal');
    } else {
      setStep(2);
    }
  };

  const handleHBVDna = (positive: boolean) => {
    if (positive) {
      setResult('need-treatment');
    } else {
      setStep(3);
    }
  };

  const handleHighSensDna = (positive: boolean) => {
    setResult(positive ? 'optional-treatment' : 'no-treatment');
  };

  const restart = () => {
    setStep(1);
    setResult(null);
  };

  const info = result ? resultConfig[result] : null;

  return (
    <div className="tool-container">
      <h1 className="tool-title">💊 乙肝是否需要抗病毒治疗</h1>
      <p className="tool-subtitle">根据HBsAg和HBV DNA检测结果，快速判定是否需要抗病毒治疗</p>

      <AdBanner className="mb-8" />

      {/* Progress bar */}
      {!result && (
        <div className="max-w-lg mx-auto mb-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-4 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0" />
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    s <= step ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                >
                  {s}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {['HBsAg', 'HBV DNA', '高敏DNA', '结果'][s - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto space-y-4">
        {/* Step 1: HBsAg */}
        {step === 1 && !result && (
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-gray-800">第一步：HBsAg（乙肝表面抗原）检测</h2>
            <p className="text-sm text-gray-500">请根据您的化验单结果选择：</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => handleHBsAg(true)} className="btn-primary flex-1 max-w-40">
                阳性 (+)
              </button>
              <button onClick={() => handleHBsAg(false)} className="flex-1 max-w-40 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                阴性 (−)
              </button>
            </div>
          </div>
        )}

        {/* Step 2: HBV DNA */}
        {step === 2 && !result && (
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-gray-800">第二步：HBV DNA（乙肝病毒数）检测</h2>
            <p className="text-sm text-gray-500">请根据您的化验单结果选择：</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => handleHBVDna(true)} className="btn-primary flex-1 max-w-40">
                阳性 (+)
              </button>
              <button onClick={() => handleHBVDna(false)} className="flex-1 max-w-40 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                阴性 (−)
              </button>
            </div>
          </div>
        )}

        {/* Step 3: High-sensitivity HBV DNA */}
        {step === 3 && !result && (
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-gray-800">第三步：高敏HBV DNA检测</h2>
            <p className="text-sm text-gray-500">请根据您的高灵敏度HBV DNA检测结果选择：</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => handleHighSensDna(true)} className="btn-primary flex-1 max-w-40">
                阳性 (+)
              </button>
              <button onClick={() => handleHighSensDna(false)} className="flex-1 max-w-40 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                阴性 (−)
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {info && (
          <div className={`card text-center animate-fade-in ${info.bg}`}>
            <p className={`text-3xl font-extrabold mb-2 ${info.color}`}>{info.label}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{info.desc}</p>
            <button onClick={restart} className="mt-5 px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
              重新开始
            </button>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-gray-600 leading-relaxed">
        <p className="font-bold text-amber-800 mb-1">⚕️ 免责声明</p>
        <p>本工具仅用于健康知识科普参考，不能替代专业医疗诊断。是否需要抗病毒治疗需由医生根据完整检查结果综合判断。如有疑问，请咨询正规医疗机构。</p>
      </div>

      <AdBanner className="mt-8" />

      <RelatedTools currentId="hepatitis-b-treatment" />
    </div>
  );
}
