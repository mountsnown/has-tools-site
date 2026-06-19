'use client';

import AdBanner from '@/components/AdBanner';
import RelatedTools from '@/components/RelatedTools';

const sections = [
  {
    title: '核心说明',
    items: [
      { type: 'blue', label: '适用范围：', text: '各类急慢性肝炎活动期（乙肝、丙肝、药物性肝损伤、脂肪肝NASH、胆汁淤积性肝损伤）' },
      { type: 'blue', label: '核心总则：', text: '病因治疗优先，抗炎保肝仅为辅助；均为成人常规剂量，老人、肝肾功能不全者酌情减量' },
    ],
  },
  {
    title: '炎症分级标准',
    items: [
      { text: '▪ 轻度：ALT/AST 1～3倍上限（无黄疸、无症状）' },
      { text: '▪ 中度：ALT/AST 3～10倍上限（轻微乏力、无黄疸）' },
      { text: '▪ 重度：ALT/AST＞10倍上限（伴黄疸、乏力纳差）' },
      { text: '▪ 重症：酶胆分离、凝血异常、腹水、肝性脑病（肝衰竭）' },
    ],
  },
  {
    title: '一、轻度肝炎用药（单药单用）',
    subtitle: '原则：无需联合，单药温和降酶抗炎',
    items: [
      { type: 'green', label: '1. 双环醇片（首选防反弹）' },
      { text: '▪ 剂量：50mg/次，每日3次 口服' },
      { text: '▪ 疗程：肝功正常后巩固2～4周' },
      { text: '▪ 减量：3次→2次(1周)→1次(1周)→停药' },
      { type: 'green', label: '2. 复方甘草酸苷片' },
      { text: '▪ 剂量：2～3片/次，每日3次 口服' },
      { text: '▪ 注意：长期服用监测血压、血钾' },
      { type: 'green', label: '3. 水飞蓟宾胶囊' },
      { text: '▪ 剂量：105mg/次，每日3次 口服' },
      { text: '▪ 适用：脂肪肝轻症长期养护' },
    ],
  },
  {
    title: '二、中度肝炎用药（标准双联）',
    subtitle: '原则：抗炎+肝细胞膜修复联合治疗',
    items: [
      { type: 'green', label: '方案A 常规首选' },
      { text: '▪ 甘草酸二铵胶囊：150mg/次，每日3次' },
      { text: '▪ 多烯磷脂酰胆碱：2粒/次，每日3次' },
      { type: 'green', label: '方案B 转氨酶波动' },
      { text: '▪ 复方甘草酸苷：3片/次，每日3次' },
      { text: '▪ 双环醇片：50mg/次，每日3次' },
      { type: 'blue', label: '胆汁淤积追加：', text: '熊去氧胆酸250mg 睡前每日1次' },
      { text: '疗程：肝功正常巩固4周，阶梯减量停药' },
    ],
  },
  {
    title: '三、重度肝炎用药（静脉三联强化）',
    subtitle: '原则：住院治疗，静脉强效抗炎+口服辅助',
    items: [
      { type: 'green', label: '核心静脉三联' },
      { text: '▪ 异甘草酸镁：100～150mg+5%GS250ml 静滴qd，重症200mg/日' },
      { text: '▪ 谷胱甘肽：1.2g静滴qd，重度1.8g/日' },
      { text: '▪ 多烯磷脂酰胆碱：10ml静滴qd，重症20ml/日' },
      { type: 'blue', label: '黄疸追加：', text: '腺苷蛋氨酸1000mg 静滴qd' },
      { type: 'blue', label: '口服叠加：', text: '双环醇50mg tid' },
      { text: '转归：黄疸消退、ALT回落，转口服双联巩固' },
    ],
  },
  {
    title: '四、重症肝炎/肝衰竭方案',
    subtitle: '原则：专科ICU治疗，抑制炎症风暴、防治并发症',
    items: [
      { text: '1. 异甘草酸镁 200mg/日 静滴' },
      { text: '2. 谷胱甘肽+N-乙酰半胱氨酸 联合解毒' },
      { text: '3. 腺苷蛋氨酸1000mg/日 强力退黄' },
      { text: '4. 门冬氨酸鸟氨酸10g/日 降血氨' },
      { text: '5. 酌情短期小剂量激素（早期炎症风暴）' },
      { text: '6. 对症：白蛋白、血浆、人工肝支持' },
    ],
  },
  {
    title: '五、各类肝病专属方案',
    items: [
      { type: 'blue', label: '1. 慢乙肝活动期' },
      { text: '▪ 基础：ETV/TAF终身抗病毒' },
      { text: '▪ 轻度：双环醇50mg tid' },
      { text: '▪ 中重度：异甘草酸镁静滴+多烯磷脂酰胆碱' },
      { type: 'blue', label: '2. 药物性肝损伤' },
      { text: '▪ 停药+谷胱甘肽1.2g+异甘草酸镁100mg静滴' },
      { text: '▪ 淤积加：腺苷蛋氨酸+UDCA250mg qn' },
      { type: 'blue', label: '3. 脂肪肝NASH' },
      { text: '▪ 多烯磷脂酰胆碱2粒tid+水飞蓟宾105mg tid' },
      { type: 'blue', label: '4. 自身免疫性肝炎' },
      { text: '▪ 核心：激素+硫唑嘌呤免疫治疗' },
      { text: '▪ 辅助：复方甘草酸苷3片tid' },
      { type: 'blue', label: '5. PBC胆汁性肝病' },
      { text: '▪ UDCA 13～15mg/kg/日 睡前顿服' },
    ],
  },
  {
    title: '六、监测与停药规范（防反弹）',
    items: [
      { type: 'green', label: '监测频次' },
      { text: '▪ 静脉用药：3-5天复查肝功、电解质、血压血钾' },
      { text: '▪ 口服用药：每2周复查，稳定后每月复查' },
      { type: 'green', label: '标准停药流程' },
      { text: '① 肝功转氨酶、胆红素完全正常' },
      { text: '② 巩固治疗≥4周' },
      { text: '③ 先停辅助保肝药' },
      { text: '④ 核心药物阶梯减量≥2周' },
      { type: 'warn', label: '⚠️ 严禁肝功正常立即停药，易反弹' },
    ],
  },
  {
    title: '七、极速诊疗流程图',
    items: [
      { text: '肝功能异常 → 病因治疗 → 分级用药' },
      { text: '▪ 轻度：单药口服' },
      { text: '▪ 中度：双联口服' },
      { text: '▪ 重度：静脉三联强化' },
      { text: '▪ 重症：四联强化+支持治疗' },
      { text: '好转 → 静转口服 → 巩固4周 → 阶梯停药 → 长期管理' },
    ],
  },
  {
    title: '八、禁忌与注意事项',
    items: [
      { type: 'warn', label: '1. 甘草酸制剂：高血压、低钾、心衰慎用' },
      { type: 'warn', label: '2. 双环醇禁止骤然停药，必须阶梯减量' },
      { type: 'warn', label: '3. 保肝药仅辅助，不可替代病因治疗' },
      { type: 'warn', label: '4. 孕妇、儿童、肾异常人群需个体化调量遵医嘱' },
    ],
  },
];

function renderItem(item: (typeof sections)[number]['items'][number], idx: number) {
  const colorMap = {
    blue: 'text-blue-600 font-semibold',
    green: 'text-green-600 font-semibold',
    warn: 'text-red-600 font-semibold',
  };

  if (item.type) {
    return (
      <div key={idx} className={`leading-relaxed py-0.5 ${item.type === 'warn' ? 'text-red-600 font-semibold' : ''}`}>
        {item.type !== 'warn' && (
          <span className={colorMap[item.type as 'blue' | 'green']}>{item.label}</span>
        )}
        {item.type === 'warn' && item.label}
        {item.text && <span>{item.text}</span>}
      </div>
    );
  }

  return (
    <div key={idx} className="leading-relaxed py-0.5 text-gray-700">
      {item.text}
    </div>
  );
}

export default function HepatitisMedGuidePage() {
  return (
    <div className="tool-container">
      <h1 className="tool-title">💊 肝炎抗炎保肝用药指南</h1>
      <p className="tool-subtitle">临床快速查阅 · 分级明确 · 适合手机查阅</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-3">
        {sections.map((section, si) => (
          <div
            key={si}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
          >
            <h2 className="text-base font-bold text-[#1677ff] mb-2.5 pl-2.5 border-l-[3px] border-[#1677ff]">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-sm text-gray-500 mb-2 leading-relaxed">{section.subtitle}</p>
            )}
            <div className="text-[15px] space-y-0.5">
              {section.items.map((item, idx) => renderItem(item, idx))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-lg mx-auto mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-gray-600 leading-relaxed">
        <p className="font-bold text-amber-800 mb-1">⚕️ 免责声明</p>
        <p>本指南仅供临床快速查阅参考，不能替代专业医疗判断。具体用药请结合患者个体情况，遵医嘱执行。</p>
      </div>

      <AdBanner className="mt-8" />

      <RelatedTools currentId="hepatitis-med-guide" />
    </div>
  );
}
