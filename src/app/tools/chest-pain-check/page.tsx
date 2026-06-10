'use client';

import { useState, useCallback } from 'react';

type Step = 'location' | 'nature' | 'trigger' | 'symptoms' | 'result';

const questions = {
  location: {
    title: '胸痛部位？',
    step: 1,
    options: [
      { value: 'retrosternal', label: '胸骨后', desc: '胸口正中位置' },
      { value: 'left', label: '左胸', desc: '偏向左侧胸部' },
      { value: 'right', label: '右胸', desc: '偏向右侧胸部' },
      { value: 'whole', label: '全胸部', desc: '整个胸部都疼' },
      { value: 'epigastric', label: '上腹部', desc: '心窝或剑突下' },
    ],
  },
  nature: {
    title: '疼痛性质？',
    step: 2,
    options: [
      { value: 'pressure', label: '压迫性闷痛', desc: '像有重物压在胸口' },
      { value: 'sharp', label: '尖锐刺痛', desc: '针扎一样的锐痛' },
      { value: 'burning', label: '烧灼感', desc: '胸口烧心的感觉' },
      { value: 'tearing', label: '撕裂样剧痛', desc: '撕心裂肺一样的剧痛' },
      { value: 'pleuritic', label: '随呼吸加重', desc: '深呼吸或咳嗽时加重' },
    ],
  },
  trigger: {
    title: '诱发因素？',
    step: 3,
    options: [
      { value: 'exertion', label: '活动/运动时加重', desc: '走路、上楼、体力劳动时更疼' },
      { value: 'eating', label: '进食后加重', desc: '吃饭后或躺下时更明显' },
      { value: 'tender', label: '按压痛', desc: '按到痛点时更疼' },
      { value: 'emotion', label: '情绪激动时发作', desc: '生气、紧张、激动时出现' },
      { value: 'none', label: '无明显诱因', desc: '不知道什么时候就开始了' },
    ],
  },
  symptoms: {
    title: '伴随症状？',
    step: 4,
    options: [
      { value: 'dyspnea', label: '呼吸困难', desc: '喘不过气' },
      { value: 'sweating', label: '大汗淋漓', desc: '突然出很多冷汗' },
      { value: 'reflux', label: '反酸嗳气', desc: '酸水往上涌、打嗝' },
      { value: 'cough', label: '咳嗽发热', desc: '有咳嗽或发烧' },
      { value: 'syncope', label: '晕厥/濒死感', desc: '感觉快要不行了' },
    ],
  },
};

const results: Record<string, { name: string; desc: string; scenario: string; action: string }> = {
  angina: {
    name: '心绞痛 / 心梗可能',
    desc: '由冠状动脉供血不足引起的胸痛。典型表现为胸骨后压迫性闷痛，活动或情绪激动时诱发，休息或含服硝酸甘油可缓解。如持续>15分钟不缓解需警惕心肌梗死。',
    scenario: '中老年、有高血压/糖尿病/高血脂/吸烟等冠心病危险因素者多见。',
    action: '立即停止活动、休息。如休息3-5分钟不缓解，或疼痛剧烈伴大汗/呼吸困难，立即拨打120急救电话。等待时保持安静半卧位，可嚼服阿司匹林300mg（如无禁忌）。',
  },
  gerd: {
    name: '胃食管反流 (GERD)',
    desc: '胃酸反流至食管引起的胸骨后烧灼感。常在进食后、躺下时加重。可伴反酸、嗳气。是最常见的非心源性胸痛原因之一。',
    scenario: '进食后、平躺时明显，与体位有关。肥胖、妊娠者多见。',
    action: '调整饮食：避免过饱、减少油腻/辛辣/酸性食物。睡前3小时不进食。抬高床头15-20cm。如反复发作可就医评估，使用抑酸药（如奥美拉唑）。',
  },
  neuralgia: {
    name: '肋间神经痛',
    desc: '由肋间神经受压或炎症引起的胸壁疼痛。常为尖锐刺痛，有明确压痛点，咳嗽、转身、深呼吸时加重。按压胸壁局部可诱发相同疼痛。',
    scenario: '各年龄段均可发生。常有胸壁外伤、带状疱疹史或长时间不良姿势。',
    action: '注意休息，避免剧烈运动和扭转躯干。局部热敷可缓解。疼痛明显可用布洛芬等消炎止痛药。如伴皮疹（水疱）需考虑带状疱疹。通常1-2周自行缓解。',
  },
  pleurisy: {
    name: '胸膜炎',
    desc: '胸膜炎症引起的胸痛，典型特点为随呼吸或咳嗽加重的尖锐刺痛。常伴发热、咳嗽等呼吸道症状。可由肺炎、肺结核、病毒感染等引起。',
    scenario: '近期有呼吸道感染史。深呼吸或咳嗽时疼痛明显加重是核心特征。',
    action: '需到呼吸内科就诊，明确病因（可能需要胸部X光/CT检查）。细菌性肺炎需抗生素治疗。休息、充分饮水。发热可用退热药。',
  },
  anxiety: {
    name: '焦虑相关胸痛',
    desc: '焦虑、紧张引起的胸痛。可表现为胸部闷痛、心悸感，常伴呼吸急促、手麻。通常在休息时或情绪紧张时发作，活动时反而缓解（与心绞痛相反）。',
    scenario: '年轻人群多见，常与精神压力大、焦虑情绪相关。体检和辅助检查通常无异常发现。',
    action: '尝试缓慢深呼吸（吸气4秒-屏气4秒-呼出6秒）。转移注意力。如反复发作影响生活，可到心理科/精神科评估。排除器质性心脏病后再考虑此诊断。',
  },
};

const redFlags = [
  { symptom: '持续>15分钟的压榨样胸痛 + 大汗 + 濒死感', desc: '高度怀疑急性心肌梗死，立即拨打120！' },
  { symptom: '撕裂样剧烈胸痛向背部放射', desc: '需紧急排除主动脉夹层' },
  { symptom: '突发胸痛 + 呼吸困难 + 咯血', desc: '需排除肺栓塞' },
];

export default function ChestPainCheckPage() {
  const [step, setStep] = useState<Step>('location');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState('');

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);

    if (step === 'location') setStep('nature');
    else if (step === 'nature') setStep('trigger');
    else if (step === 'trigger') setStep('symptoms');
    else if (step === 'symptoms') {
      const loc = newAnswers['location'];
      const nat = newAnswers['nature'];
      const trig = newAnswers['trigger'];
      const sym = newAnswers['symptoms'];

      if (sym === 'sweating' || sym === 'syncope' || (nat === 'pressure' && (trig === 'exertion' || trig === 'emotion')) || nat === 'tearing') {
        setDiagnosis('angina');
      } else if (nat === 'burning' && (trig === 'eating' || sym === 'reflux')) {
        setDiagnosis('gerd');
      } else if (trig === 'tender' || nat === 'sharp') {
        setDiagnosis('neuralgia');
      } else if (nat === 'pleuritic' || sym === 'cough') {
        setDiagnosis('pleurisy');
      } else if (trig === 'emotion' || trig === 'none') {
        setDiagnosis('anxiety');
      } else {
        setDiagnosis('neuralgia');
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
            💔 胸痛鉴别
          </h1>
          <p className="text-gray-500">根据胸痛特征帮助区分不同原因</p>
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
                  const steps: Step[] = ['location', 'nature', 'trigger', 'symptoms'];
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
                  <span className="font-medium text-gray-800">👤 常见人群：</span>
                  <span className="text-gray-600">{result.scenario}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <span className="font-medium text-blue-800">💡 建议：</span>
                  <span className="text-blue-700">{result.action}</span>
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
