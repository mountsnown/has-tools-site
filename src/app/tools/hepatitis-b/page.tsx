'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

type ResultType = 'big-three' | 'small-three' | 'normal' | null;

const resultConfig: Record<NonNullable<ResultType>, { label: string; color: string; bg: string; desc: string }> = {
  'big-three': {
    label: '大三阳',
    color: 'text-red-700',
    bg: 'bg-red-50',
    desc: 'HBsAg(+)、HBeAg(+)、HBcAb(+) — 病毒复制活跃，传染性强，建议及时就医进一步检查HBV-DNA和肝功能。',
  },
  'small-three': {
    label: '小三阳',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    desc: 'HBsAg(+)、HBeAb(+)、HBcAb(+) — 病毒复制较低，但仍需定期复查肝功能和HBV-DNA，遵医嘱管理。',
  },
  normal: {
    label: '未感染 / 非携带者',
    color: 'text-green-700',
    bg: 'bg-green-50',
    desc: 'HBsAg(-) — 未检测到乙肝表面抗原，建议确认是否接种过乙肝疫苗，必要时检查抗体滴度。',
  },
};

export default function HepatitisBPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<ResultType>(null);

  const handleHBsAg = (positive: boolean) => {
    if (!positive) {
      setResult('normal');
      setStep(0);
    } else {
      setStep(2);
    }
  };

  const handleHBeAg = (positive: boolean) => {
    setResult(positive ? 'big-three' : 'small-three');
    setStep(0);
  };

  const restart = () => {
    setStep(1);
    setResult(null);
  };

  const info = result ? resultConfig[result] : null;

  return (
    <div className="tool-container">
      <h1 className="tool-title">🩺 乙肝大小三阳自测</h1>
      <p className="tool-subtitle">根据乙肝五项检测结果，快速判定大三阳/小三阳/未感染</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {step === 1 && (
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-gray-800">第一步：查看 HBsAg（乙肝表面抗原）</h2>
            <p className="text-sm text-gray-500">你的检测结果是？</p>
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

        {step === 2 && (
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-gray-800">第二步：查看 HBeAg（乙肝e抗原）</h2>
            <p className="text-sm text-gray-500">你的检测结果是？</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => handleHBeAg(true)} className="btn-primary flex-1 max-w-40">
                阳性 (+)
              </button>
              <button onClick={() => handleHBeAg(false)} className="flex-1 max-w-40 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                阴性 (−)
              </button>
            </div>
          </div>
        )}

        {info && (
          <div className={`card text-center animate-fade-in ${info.bg}`}>
            <p className={`text-3xl font-extrabold mb-2 ${info.color}`}>{info.label}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{info.desc}</p>
            <button onClick={restart} className="mt-5 px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
              重新测试
            </button>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-gray-600 leading-relaxed">
        <p className="font-bold text-amber-800 mb-1">⚕️ 免责声明</p>
        <p>本工具仅用于健康知识科普参考，不能替代专业医疗诊断。如有疑问，请咨询正规医疗机构。</p>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
