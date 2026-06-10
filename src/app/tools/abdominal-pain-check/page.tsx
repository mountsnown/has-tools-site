'use client';

import { useState, useCallback } from 'react';

type Step = 'location' | 'nature' | 'symptoms' | 'factor' | 'result';

const questions = {
  location: {
    title: '疼痛部位？',
    step: 1,
    options: [
      { value: 'ruq', label: '右上腹', desc: '右侧肋缘下' },
      { value: 'epigastric', label: '中上腹', desc: '心口窝位置' },
      { value: 'luq', label: '左上腹', desc: '左侧肋缘下' },
      { value: 'rlq', label: '右下腹', desc: '右侧下腹部' },
      { value: 'periumbilical', label: '脐周', desc: '肚脐周围' },
      { value: 'llq', label: '左下腹', desc: '左侧下腹部' },
      { value: 'lower', label: '下腹部', desc: '耻骨上区域' },
      { value: 'diffuse', label: '弥漫性', desc: '整个腹部都疼' },
    ],
  },
  nature: {
    title: '疼痛性质？',
    step: 2,
    options: [
      { value: 'continuous', label: '持续性钝痛', desc: '一直闷闷地疼' },
      { value: 'colic', label: '阵发性绞痛', desc: '一阵一阵剧烈疼，间歇期可缓解' },
      { value: 'burning', label: '烧灼样', desc: '胃部灼热感' },
      { value: 'bloating', label: '胀痛', desc: '肚子胀鼓鼓的疼' },
      { value: 'severe', label: '刀割样剧痛', desc: '剧烈难忍的持续性疼痛' },
    ],
  },
  symptoms: {
    title: '伴随症状？',
    step: 3,
    options: [
      { value: 'nausea', label: '恶心呕吐', desc: '' },
      { value: 'diarrhea', label: '腹泻', desc: '' },
      { value: 'constipation', label: '便秘/停止排气排便', desc: '' },
      { value: 'fever', label: '发热', desc: '' },
      { value: 'jaundice', label: '黄疸/尿黄', desc: '皮肤眼白发黄' },
      { value: 'bloody', label: '血便/黑便', desc: '大便带血或柏油样' },
      { value: 'urinary', label: '尿频尿痛', desc: '小便时有不适' },
    ],
  },
  factor: {
    title: '加重/缓解因素？',
    step: 4,
    options: [
      { value: 'eating_worse', label: '进食后加重', desc: '吃饭后更疼' },
      { value: 'fasting_better', label: '空腹时加重，进食缓解', desc: '饿了更疼' },
      { value: 'bowel_relief', label: '排便后缓解', desc: '拉完肚子就好了' },
      { value: 'gas_relief', label: '排气后缓解', desc: '放屁后胀痛减轻' },
      { value: 'none', label: '无明显变化', desc: '' },
    ],
  },
};

const results: Record<string, { name: string; desc: string; scenario: string; action: string }> = {
  cholecystitis: {
    name: '胆囊炎/胆结石',
    desc: '右上腹持续性钝痛或绞痛，常在进食油腻后诱发或加重。疼痛可向右肩背部放射。急性胆囊炎可伴发热、Murphy征阳性。',
    scenario: '中年肥胖女性多见（"4F"：Female, Forty, Fat, Fertile）。高脂饮食后好发。',
    action: '建议到肝胆外科或消化内科就诊，空腹行腹部B超检查。急性期需禁食、抗感染、必要时手术。平时低脂饮食，控制体重。',
  },
  gastritis: {
    name: '胃炎/胃溃疡',
    desc: '中上腹烧灼样或钝痛。胃溃疡常在餐后加重（餐后痛），十二指肠溃疡常在空腹时加重、进食后缓解（饥饿痛）。',
    scenario: '饮食不规律、压力大、饮酒、服用NSAIDs类止痛药、幽门螺杆菌感染者多见。',
    action: '规律进食，避免辛辣刺激、酒精、咖啡。如反复发作建议消化内科就诊，行胃镜检查和幽门螺杆菌检测。不要滥用止痛药（尤其布洛芬、阿司匹林类）。',
  },
  pancreatitis: {
    name: '胰腺炎',
    desc: '中上腹或左上腹持续性剧烈疼痛，常向背部放射，蜷曲位可稍缓解。常伴恶心呕吐、发热。重症胰腺炎可危及生命。',
    scenario: '胆结石、大量饮酒、高甘油三酯血症是主要病因。暴饮暴食后好发。',
    action: '需立即就医（消化内科或急诊科）。确诊需查血淀粉酶/脂肪酶和腹部CT。急性期严格禁食、补液、止痛。',
  },
  appendicitis: {
    name: '阑尾炎',
    desc: '典型表现为疼痛起于脐周或中上腹，数小时后转移并固定在右下腹（麦氏点）。持续性钝痛，伴恶心、低热。',
    scenario: '各年龄段均可发生，10-30岁最多见。',
    action: '需立即到普外科或急诊科就诊。不要自行服用止痛药（会掩盖症状）。确诊后通常需行阑尾切除术（腹腔镜微创为主）。',
  },
  ibs: {
    name: '肠易激综合征 (IBS)',
    desc: '反复发作的腹痛和排便习惯改变（腹泻/便秘/混合型）。疼痛多为脐周或下腹部胀痛或绞痛，排便后缓解。无器质性病变。',
    scenario: '年轻女性多见。与精神压力、焦虑、特定食物（FODMAPs）相关。',
    action: '记录饮食日记找出诱因。尝试低FODMAP饮食。增加膳食纤维（便秘型）。避免产气食物（豆类、洋葱等）。如持续影响生活到消化内科就诊。',
  },
  stone: {
    name: '泌尿系结石',
    desc: '腰腹部剧烈绞痛，阵发性发作，向会阴部或大腿内侧放射。常伴血尿、尿频尿痛。疼痛剧烈但间歇期可完全缓解。',
    scenario: '男性多于女性，20-50岁多见。饮水少、高温环境工作者好发。',
    action: '多饮水（>2500ml/天）。疼痛不缓解需到泌尿外科或急诊就诊，行B超或CT检查。小结石（<5mm）多可自行排出。大结石或梗阻性结石需体外碎石或腔镜取石。',
  },
  gynecology: {
    name: '妇科相关问题',
    desc: '下腹部钝痛或坠胀痛。需考虑痛经、卵巢囊肿、盆腔炎、异位妊娠（如有停经史需高度警惕！）。',
    scenario: '育龄期女性。需结合月经史、性生活史综合判断。',
    action: '到妇科就诊，行B超检查。如伴停经+腹痛+阴道流血需立即就诊排除异位妊娠（可能危及生命！）。盆腔炎需规范抗感染治疗。',
  },
};

const redFlags = [
  { symptom: '突剧烈腹痛持续不缓解，疼痛难忍', desc: '需紧急排除急性胰腺炎、脏器穿孔、肠系膜缺血' },
  { symptom: '腹部板状硬、拒按（腹膜炎体征）', desc: '需紧急排除消化道穿孔、急性弥漫性腹膜炎' },
  { symptom: '伴呕血/黑便/大量血便', desc: '需紧急排除上消化道出血或下消化道大出血' },
  { symptom: '伴高热(>39°C)+黄疸+意识改变', desc: '需紧急排除急性化脓性胆管炎' },
];

export default function AbdominalPainCheckPage() {
  const [step, setStep] = useState<Step>('location');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState('');

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);

    if (step === 'location') setStep('nature');
    else if (step === 'nature') setStep('symptoms');
    else if (step === 'symptoms') setStep('factor');
    else if (step === 'factor') {
      const loc = newAnswers['location'];
      const nat = newAnswers['nature'];
      const sym = newAnswers['symptoms'];
      const fac = newAnswers['factor'];

      if (nat === 'severe' && (loc === 'epigastric' || loc === 'luq')) {
        setDiagnosis('pancreatitis');
      } else if (loc === 'ruq' || sym === 'jaundice') {
        setDiagnosis('cholecystitis');
      } else if (loc === 'rlq' || (loc === 'periumbilical' && nat === 'continuous')) {
        setDiagnosis('appendicitis');
      } else if (sym === 'urinary') {
        setDiagnosis('stone');
      } else if (loc === 'lower' || loc === 'llq') {
        setDiagnosis('gynecology');
      } else if (fac === 'bowel_relief' || sym === 'diarrhea' || sym === 'constipation') {
        setDiagnosis('ibs');
      } else if ((nat === 'burning' || nat === 'colic') && loc === 'epigastric') {
        setDiagnosis('gastritis');
      } else if (sym === 'bloody') {
        setDiagnosis('gastritis');
      } else if (loc === 'diffuse' && fac === 'gas_relief') {
        setDiagnosis('ibs');
      } else {
        setDiagnosis('ibs');
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
            🔽 腹痛鉴别
          </h1>
          <p className="text-gray-500">按疼痛部位和性质帮助区分腹痛原因</p>
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
                  const steps: Step[] = ['location', 'nature', 'symptoms', 'factor'];
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
                  <span className="font-medium text-gray-800">👤 常见情况：</span>
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
