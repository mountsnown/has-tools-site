'use client';

import { useState, useCallback } from 'react';

type Step = 'location' | 'nature' | 'symptoms' | 'pattern' | 'result';

const questions = {
  location: {
    title: '头痛部位？',
    step: 1,
    options: [
      { value: 'unilateral', label: '单侧头痛', desc: '主要在一侧太阳穴或眼眶周围' },
      { value: 'bilateral', label: '双侧头痛', desc: '两侧同时疼痛' },
      { value: 'whole', label: '全头部', desc: '整个头部都疼' },
      { value: 'occipital', label: '后枕部', desc: '后脑勺和颈项部' },
      { value: 'orbital', label: '眼眶周围', desc: '眼球周围和眼后方' },
    ],
  },
  nature: {
    title: '疼痛性质？',
    step: 2,
    options: [
      { value: 'pulsating', label: '搏动性跳痛', desc: '一阵一阵像脉搏一样跳动' },
      { value: 'dull', label: '持续性钝痛', desc: '闷闷的持续的疼痛' },
      { value: 'tight', label: '紧箍样压迫感', desc: '像被带子勒紧一样' },
      { value: 'stabbing', label: '针刺样', desc: '尖锐的刺痛' },
      { value: 'burning', label: '烧灼样', desc: '灼热感' },
    ],
  },
  symptoms: {
    title: '伴随症状？',
    step: 3,
    options: [
      { value: 'nausea', label: '恶心呕吐', desc: '' },
      { value: 'photophobia', label: '畏光畏声', desc: '怕光、怕声音' },
      { value: 'blurred', label: '视力模糊', desc: '看东西不清楚' },
      { value: 'tearing', label: '流泪鼻塞', desc: '同侧流泪、鼻塞/流涕' },
      { value: 'stiffneck', label: '颈部僵硬', desc: '脖子僵硬活动受限' },
    ],
  },
  pattern: {
    title: '发作特点？',
    step: 4,
    options: [
      { value: 'recurrent', label: '反复发作', desc: '以前也这样痛过多次' },
      { value: 'firsttime', label: '首次发作', desc: '以前从未有过类似头痛' },
      { value: 'hours', label: '持续数小时', desc: '疼4-72小时' },
      { value: 'days', label: '持续数天', desc: '持续超过一天' },
      { value: 'morning', label: '晨间加重', desc: '早上起床时最重' },
    ],
  },
};

const results: Record<string, { name: string; desc: string; duration: string; triggers: string; care: string }> = {
  migraine: {
    name: '偏头痛',
    desc: '一种常见的原发性头痛，以单侧搏动性中重度头痛为特征，常伴恶心、畏光、畏声。女性多见，发病高峰为20-50岁。',
    duration: '一般持续4-72小时，未经治疗可更长。',
    triggers: '常见诱因：月经（雌激素波动）、压力、睡眠不足、特定食物（巧克力、红酒、奶酪）、强光、天气变化。',
    care: '发作期在暗室休息、冷敷前额。急性期可用布洛芬等止痛药（早期用药效果更好）。如发作频繁（每月>4次）需就医评估预防性治疗。',
  },
  tension: {
    name: '紧张性头痛',
    desc: '最常见的原发性头痛，以双侧紧箍样或压迫性钝痛为特征。通常为轻中度疼痛，不因日常活动加重。',
    duration: '发作性可持续30分钟到数天；慢性者每月≥15天。',
    triggers: '常见诱因：精神压力、焦虑、长时间低头工作、颈肩肌肉紧张、睡眠不足。',
    care: '适当休息、热敷颈肩部、按摩放松。可用对乙酰氨基酚或布洛芬缓解。改善工作姿势，定时活动颈肩。如慢性化需就医。',
  },
  cluster: {
    name: '丛集性头痛',
    desc: '一种剧烈的原发性头痛，以单侧眼眶周围剧痛为特征，伴同侧自主神经症状（流泪、鼻塞等）。男性多见。',
    duration: '每次发作15-180分钟，可每日发作1-8次。"丛集期"持续数周至数月后自发缓解。',
    triggers: '丛集期内酒精可诱发。其他诱因：硝酸甘油、组胺、强烈气味。',
    care: '需到神经内科就诊。急性期高流量吸氧（12-15L/min）或曲普坦类药物。预防性治疗包括维拉帕米等。不建议普通止痛药（效果差）。',
  },
  cervicogenic: {
    name: '颈源性头痛',
    desc: '由颈椎病变引起的继发性头痛，疼痛从后枕部开始向前放射。常伴颈部活动受限和同侧肩臂疼痛。',
    duration: '可持续数小时到数天。反复发作，与颈部姿势和活动相关。',
    triggers: '长时间低头、颈部外伤史（如挥鞭伤）、不良睡姿、颈椎退行性变。',
    care: '纠正不良姿势，使用合适高度的枕头。颈部理疗、按摩可缓解。如持续需到骨科或康复科评估颈椎状况。',
  },
  sinus: {
    name: '鼻窦性头痛',
    desc: '由鼻窦炎（急性或慢性）引起的头痛，疼痛位于前额、面颊、眼周。通常伴鼻塞、流脓涕、嗅觉减退。晨间头痛加重是特征之一。',
    duration: '与鼻窦炎持续时长相符。急性鼻窦炎一般<4周。',
    triggers: '感冒、过敏性鼻炎、鼻腔结构异常（鼻中隔偏曲、鼻息肉）均可诱发。',
    care: '生理盐水洗鼻可缓解。急性细菌性鼻窦炎需抗生素治疗（需耳鼻喉科评估）。过敏性原因可使用抗组胺药和鼻用激素。',
  },
};

const redFlags = [
  { symptom: '突剧烈头痛（雷击样），几秒内达峰', desc: '需紧急排除蛛网膜下腔出血' },
  { symptom: '头痛伴高热 + 颈部僵硬', desc: '需排除脑膜炎' },
  { symptom: '头痛伴意识障碍、肢体无力或言语不清', desc: '需排除脑卒中' },
];

export default function HeadacheCheckPage() {
  const [step, setStep] = useState<Step>('location');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState('');

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);

    if (step === 'location') setStep('nature');
    else if (step === 'nature') setStep('symptoms');
    else if (step === 'symptoms') setStep('pattern');
    else if (step === 'pattern') {
      // Decision logic
      const loc = newAnswers['location'];
      const nat = newAnswers['nature'];
      const sym = newAnswers['symptoms'];
      const pat = newAnswers['pattern'];

      if ((loc === 'unilateral' || loc === 'orbital') && nat === 'pulsating' && (sym === 'nausea' || sym === 'photophobia') && (pat === 'recurrent' || pat === 'hours')) {
        setDiagnosis('migraine');
      } else if (loc === 'orbital' && (sym === 'tearing') && (pat === 'hours')) {
        setDiagnosis('cluster');
      } else if (loc === 'occipital' && (nat === 'dull' || nat === 'tight') && (pat === 'days')) {
        setDiagnosis('cervicogenic');
      } else if ((loc === 'bilateral' || loc === 'whole') && (nat === 'tight' || nat === 'dull') && pat !== 'hours') {
        setDiagnosis('tension');
      } else if ((loc === 'whole' || loc === 'bilateral') && pat === 'morning') {
        setDiagnosis('sinus');
      } else if (loc === 'unilateral' && nat === 'pulsating') {
        setDiagnosis('migraine');
      } else if (nat === 'tight' || nat === 'dull') {
        setDiagnosis('tension');
      } else if (loc === 'occipital') {
        setDiagnosis('cervicogenic');
      } else {
        setDiagnosis('tension');
      }
      setStep('result');
    }
  }, [step, answers]);

  const reset = () => {
    setStep('location');
    setAnswers({});
    setDiagnosis('');
  };

  const currentQuestion = questions[step as keyof typeof questions];
  const result = results[diagnosis];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-2">
            🤕 头痛鉴别
          </h1>
          <p className="text-gray-500">根据头痛特征帮助区分不同类型头痛</p>
        </div>

        {step !== 'result' && currentQuestion && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                步骤 {currentQuestion.step}/4
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 to-amber-400 transition-all"
                style={{ width: `${(currentQuestion.step / 4) * 100}%` }}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{currentQuestion.title}</h2>
            <div className="space-y-2">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  <div className="font-medium text-gray-800">{opt.label}</div>
                  {opt.desc && <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>}
                </button>
              ))}
            </div>
            {currentQuestion.step > 1 && (
              <button
                onClick={() => {
                  const steps: Step[] = ['location', 'nature', 'symptoms', 'pattern'];
                  const idx = steps.indexOf(step);
                  if (idx > 0) setStep(steps[idx - 1]);
                }}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← 返回上一步
              </button>
            )}
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 鉴别结果</h3>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-3">
                <div className="text-xl font-extrabold text-red-600 mb-1">{result.name}</div>
                <p className="text-sm text-gray-600">{result.desc}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">⏱ 持续时间：</span>
                  <span className="text-gray-600">{result.duration}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">🔍 常见诱因：</span>
                  <span className="text-gray-600">{result.triggers}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <span className="font-medium text-blue-800">💡 自我管理：</span>
                  <span className="text-blue-700">{result.care}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-red-600 mb-3 text-lg">🔴 紧急就医提示</h3>
              <div className="space-y-2 text-sm">
                {redFlags.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-red-50 border border-red-100">
                    <div className="font-medium text-red-700">{f.symptom}</div>
                    <div className="text-red-500 text-xs mt-0.5">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={reset}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 transition-all">
              重新评估
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          ⚠️ 本工具仅供健康科普参考，不能替代医生诊断。如有不适请及时就医。
        </p>
      </div>
    </div>
  );
}
