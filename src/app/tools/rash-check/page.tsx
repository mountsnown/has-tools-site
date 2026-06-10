'use client';

import { useState, useCallback } from 'react';

type Step = 'morphology' | 'location' | 'sensation' | 'systemic' | 'result';

const questions = {
  morphology: {
    title: '皮疹形态？',
    step: 1,
    options: [
      { value: 'macule', label: '斑疹', desc: '平坦的红色或褐色斑点，不高出皮肤' },
      { value: 'papule', label: '丘疹', desc: '高出皮肤的小疙瘩（<1cm）' },
      { value: 'vesicle', label: '水疱', desc: '内含清亮液体的小疱' },
      { value: 'pustule', label: '脓疱', desc: '内含黄色脓液的疱' },
      { value: 'wheal', label: '风团', desc: '高出皮肤的片状隆起，边界清楚，时起时消' },
      { value: 'scale', label: '鳞屑', desc: '皮肤表面脱屑，银白色或灰白色' },
      { value: 'nodule', label: '结节', desc: '较深的皮下硬块（>1cm）' },
    ],
  },
  location: {
    title: '分布部位？',
    step: 2,
    options: [
      { value: 'face', label: '面部', desc: '' },
      { value: 'trunk', label: '躯干（胸/背/腹）', desc: '' },
      { value: 'extensor', label: '四肢伸侧（外侧）', desc: '手臂外侧、腿前侧' },
      { value: 'flexor', label: '四肢屈侧（内侧）', desc: '肘窝、膝后、手腕内侧' },
      { value: 'palmsole', label: '掌跖（手掌/脚掌）', desc: '' },
      { value: 'diffuse', label: '全身弥漫', desc: '全身广泛分布' },
    ],
  },
  sensation: {
    title: '伴随感觉？',
    step: 3,
    options: [
      { value: 'severe_itch', label: '剧烈瘙痒', desc: '难以忍受的痒' },
      { value: 'mild_itch', label: '轻微瘙痒', desc: '有时痒' },
      { value: 'pain', label: '疼痛', desc: '皮疹处灼痛或刺痛' },
      { value: 'none', label: '无自觉症状', desc: '不痛不痒' },
    ],
  },
  systemic: {
    title: '伴随全身症状？',
    step: 4,
    options: [
      { value: 'fever', label: '发热', desc: '' },
      { value: 'arthralgia', label: '关节痛', desc: '' },
      { value: 'fatigue', label: '乏力/不适', desc: '' },
      { value: 'ulcer', label: '口腔溃疡', desc: '嘴里同时长了溃疡' },
      { value: 'lymph', label: '淋巴结肿大', desc: '脖子、腋下、腹股沟摸到肿块' },
      { value: 'none', label: '无全身症状', desc: '' },
    ],
  },
};

const results: Record<string, { name: string; desc: string; appearance: string; cause: string; care: string }> = {
  urticaria: {
    name: '荨麻疹（风疹块）',
    desc: '一种常见的过敏性皮肤病，以突发大小不等、形态不一的风团为特征。风团可在数小时内自行消退，不留痕迹，但会反复出现新皮疹。超过6周为慢性。',
    appearance: '红色或肤色片状隆起的风团，边界清楚，时起时消。搔抓后皮疹增多（皮肤划痕症）。',
    cause: '食物（海鲜、坚果、鸡蛋）、药物（抗生素、阿司匹林）、感染、物理因素（冷、热、压力）、精神压力。约50%原因不明（特发性）。',
    care: '口服抗组胺药（如氯雷他定、西替利嗪）大多有效。避免已知诱因。如出现呼吸困难、喉头水肿、血压下降需立即急诊（过敏休克！）。慢性荨麻疹需皮肤科长期管理。',
  },
  eczema: {
    name: '湿疹（特应性皮炎）',
    desc: '一种慢性、复发性、瘙痒性皮肤病，以皮肤干燥、红斑丘疹、渗出结痂、苔藓化为特征。常于婴儿期发病，部分持续至成年。',
    appearance: '屈侧（肘窝、膝后、颈项、手腕）好发。急性期：红斑、丘疹、水疱、渗出。慢性期：皮肤增厚、苔藓化、色素沉着。',
    cause: '遗传因素（皮肤屏障功能缺陷）、环境过敏原（尘螨、花粉）、食物过敏、皮肤菌群失调（金葡菌定植）。',
    care: '保湿是核心：每日多次使用无香精保湿霜。外用糖皮质激素（遵医嘱）。避免过度洗澡、热水烫洗。穿棉质衣物。中重度需皮肤科就诊，可能需免疫调节剂或生物制剂。',
  },
  herpes_zoster: {
    name: '带状疱疹',
    desc: '由潜伏的水痘-带状疱疹病毒再激活引起。沿神经节分布，单侧出现簇集性水疱，伴明显神经痛（灼痛或刺痛）。皮疹出现前常有乏力、低热。',
    appearance: '单侧沿神经分布的成簇水疱，疱液清亮后可变浑浊。胸背部（肋间神经）最多见，其次为头面部（三叉神经）、腰部。不超过身体中线。',
    cause: '免疫力下降时潜伏病毒再激活：年龄>50岁、劳累、精神压力、免疫抑制状态（如化疗、器官移植、长期用激素）。',
    care: '发疹72小时内开始抗病毒治疗（如伐昔洛韦、泛昔洛韦）可缩短病程和减少后遗神经痛。止痛治疗。如发生在眼部（三叉神经第一支）需紧急眼科会诊。>50岁可接种带状疱疹疫苗预防。',
  },
  psoriasis: {
    name: '银屑病（牛皮癣）',
    desc: '一种慢性、免疫介导的皮肤病，以边界清楚的红色斑块上覆银白色鳞屑为特征。可有指甲改变（顶针样凹陷、甲剥离）和关节损害（银屑病关节炎）。',
    appearance: '四肢伸侧（肘、膝）、头皮、腰骶部好发。典型皮损：边界清楚的红色斑块 + 银白色厚鳞屑。刮除鳞屑可见薄膜现象和点状出血（Auspitz征）。',
    cause: '遗传（30%有家族史）+ 环境诱因（链球菌感染、压力、外伤、某些药物如锂剂、β受体阻滞剂）。免疫介导的慢性炎症。',
    care: '需皮肤科长期管理。轻中度：外用糖皮质激素 + 维生素D3衍生物、光疗（窄谱UVB）。中重度：系统性治疗（甲氨蝶呤、环孢素、生物制剂如IL-17/IL-23抑制剂）。戒烟限酒、控制体重。',
  },
  contact_dermatitis: {
    name: '接触性皮炎',
    desc: '皮肤接触外界物质后出现的炎症反应。分两种：刺激性（直接损伤皮肤屏障）和过敏性（IV型迟发型超敏反应）。皮疹通常限于接触部位。',
    appearance: '境界清楚的片状红斑、丘疹或水疱，与接触物形状一致。急性期可有大疱和渗出，慢性期皮肤增厚皲裂。',
    cause: '常见过敏原：镍（首饰、皮带扣）、化纤、橡胶、化妆品、染发剂、外用抗生素（新霉素）、毒葛/漆树。刺激性：频繁洗手、清洁剂、酸碱性化学物。',
    care: '脱离接触物是首要措施。急性渗出期用硼酸溶液或生理盐水冷湿敷。外用糖皮质激素。口服抗组胺药止痒。严重者需皮肤科就诊。职业性接触性皮炎可影响工作能力。',
  },
  hfmd: {
    name: '手足口病',
    desc: '由肠道病毒（柯萨奇A16、肠病毒71型等）引起的急性传染病。好发于5岁以下幼儿，但成人也可感染。夏秋季高发。',
    appearance: '手掌、脚掌、口腔黏膜出现散在的红色丘疹或小水疱（手足口三部曲）。口腔疱疹破溃后形成溃疡（疼痛影响进食）。臀部也可出疹。',
    cause: '肠道病毒经粪-口途径、呼吸道飞沫、接触疱疹液传播。幼儿聚集场所（托幼机构）易流行。',
    care: '大多数7-10天自愈。多饮水防脱水。口腔疼痛可冷流质饮食。发热用退热药。注意隔离（症状消失后1周）。如出现持续高热、精神差、肢体抖动、呼吸急促需立即就诊（警惕重症EV71脑干脑炎）。',
  },
  drug_eruption: {
    name: '药疹（药物性皮炎）',
    desc: '药物经口服、注射、外用等途径进入体内后引起的皮肤黏膜反应。形态多样，轻者为散在红斑丘疹，重者可为Stevens-Johnson综合征/TEN（重症大疱性表皮松解坏死型）。',
    appearance: '最常见为麻疹样药疹（弥漫性红斑丘疹始于躯干后扩散至四肢）。固定性药疹（每次同一部位出现暗红色斑）。重症型：皮肤大面积红斑/水疱/表皮剥脱、口腔眼黏膜糜烂。',
    cause: '常见致敏药：抗生素（青霉素类、磺胺类、头孢类）、解热镇痛药（布洛芬、对乙酰氨基酚）、抗癫痫药（卡马西平、拉莫三嗪）、别嘌醇。用药后1-3周出现（再次用药可1-3天出现）。',
    care: '立即停用可疑药物是关键！轻症停药后多自行消退。中重度需皮肤科急诊就诊。如出现口腔眼结膜糜烂、大面积水疱/表皮剥脱需立即急诊（警惕SJS/TEN！）。记录过敏药物并终身避免再使用。',
  },
};

const redFlags = [
  { symptom: '高热 + 皮肤大面积红皮/水疱/表皮剥脱', desc: '需紧急排除重症药疹（SJS/TEN）、中毒性休克综合征' },
  { symptom: '口腔、眼结膜和生殖器黏膜大面积糜烂', desc: '需排除Stevens-Johnson综合征（SJS）—— 药物过敏的急重症' },
  { symptom: '皮疹为紫红色瘀点/瘀斑、按压不褪色', desc: '需排除紫癜、脑膜炎球菌败血症（可迅速恶化）' },
];

export default function RashCheckPage() {
  const [step, setStep] = useState<Step>('morphology');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState('');

  const handleAnswer = useCallback((value: string) => {
    const newAnswers = { ...answers, [step]: value };
    setAnswers(newAnswers);

    if (step === 'morphology') setStep('location');
    else if (step === 'location') setStep('sensation');
    else if (step === 'sensation') setStep('systemic');
    else if (step === 'systemic') {
      const mor = newAnswers['morphology'];
      const loc = newAnswers['location'];
      const sen = newAnswers['sensation'];
      const sys = newAnswers['systemic'];

      if (mor === 'wheal' || (sen === 'severe_itch' && loc !== 'extensor')) {
        setDiagnosis('urticaria');
      } else if (loc === 'flexor' && (sen === 'severe_itch' || sen === 'mild_itch')) {
        setDiagnosis('eczema');
      } else if (mor === 'vesicle' && sen === 'pain') {
        setDiagnosis('herpes_zoster');
      } else if (mor === 'scale' || (loc === 'extensor' && mor === 'papule')) {
        setDiagnosis('psoriasis');
      } else if (loc === 'palmsole' && (mor === 'papule' || mor === 'vesicle')) {
        setDiagnosis('hfmd');
      } else if ((sys === 'fever' || sys === 'ulcer') && mor !== 'wheal' && loc === 'diffuse') {
        setDiagnosis('drug_eruption');
      } else if (loc === 'face' || loc === 'trunk') {
        setDiagnosis('contact_dermatitis');
      } else if (sen === 'severe_itch') {
        setDiagnosis('eczema');
      } else if (sys === 'fever') {
        setDiagnosis('hfmd');
      } else {
        setDiagnosis('contact_dermatitis');
      }
      setStep('result');
    }
  }, [step, answers]);

  const reset = () => {
    setStep('morphology');
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
            🔴 皮疹鉴别
          </h1>
          <p className="text-gray-500">按皮疹形态分类帮助区分不同皮肤病</p>
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
                  const steps: Step[] = ['morphology', 'location', 'sensation', 'systemic'];
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
                  <span className="font-medium text-gray-800">🔍 外观特征：</span>
                  <span className="text-gray-600">{result.appearance}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="font-medium text-gray-800">📋 常见原因：</span>
                  <span className="text-gray-600">{result.cause}</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <span className="font-medium text-blue-800">💡 处理建议：</span>
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
