'use client';

import { useState, useMemo } from 'react';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

// ====================== Data ======================
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_ELEMENTS = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
const BRANCH_ELEMENTS = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];

const STEM_ANIMALS: Record<string, string> = {
  '子': '🐭', '丑': '🐮', '寅': '🐯', '卯': '🐰', '辰': '🐲', '巳': '🐍',
  '午': '🐴', '未': '🐑', '申': '🐵', '酉': '🐔', '戌': '🐶', '亥': '🐷',
};

const ELEMENT_COLORS: Record<string, string> = {
  '木': '#22c55e', '火': '#ef4444', '土': '#f59e0b', '金': '#fbbf24', '水': '#3b82f6',
};

const STEM_MEANINGS: Record<string, string> = {
  '甲': '栋梁之木，正直刚强，领导力强',
  '乙': '花草之木，柔韧灵活，适应力强',
  '丙': '太阳之火，热情奔放，光明磊落',
  '丁': '灯烛之火，细腻温和，内心明亮',
  '戊': '城墙之土，厚重沉稳，信守承诺',
  '己': '田园之土，温和包容，善于培育',
  '庚': '斧钺之金，刚毅果断，勇于变革',
  '辛': '珠宝之金，精致细腻，追求完美',
  '壬': '江河之水，智慧流动，胸怀宽广',
  '癸': '雨露之水，细腻敏感，润物无声',
};

const BRANCH_MEANINGS: Record<string, string> = {
  '子': '鼠相，水旺，聪明机敏，善于变通',
  '丑': '牛相，土藏金水，踏实稳重，有韧性',
  '寅': '虎相，木火生发，勇敢自信，开创力强',
  '卯': '兔相，纯木，温和优雅，心思细腻',
  '辰': '龙相，土含水木，气度不凡，有担当',
  '巳': '蛇相，火旺，智慧深沉，洞察力强',
  '午': '马相，火旺，热情奔放，行动迅速',
  '未': '羊相，土藏火木，温顺包容，内藏热情',
  '申': '猴相，金旺，机灵多变，好奇心强',
  '酉': '鸡相，纯金，精致讲究，追求完美',
  '戌': '狗相，土含金火，忠诚可靠，有正义感',
  '亥': '猪相，水旺，善良豁达，福气深厚',
};

const SOLAR_TERMS_2025 = [
  { m: 2, d: 3 },  // 立春
  { m: 3, d: 5 },  // 惊蛰
  { m: 4, d: 4 },  // 清明
  { m: 5, d: 5 },  // 立夏
  { m: 6, d: 5 },  // 芒种
  { m: 7, d: 7 },  // 小暑
  { m: 8, d: 7 },  // 立秋
  { m: 9, d: 7 },  // 白露
  { m: 10, d: 8 }, // 寒露
  { m: 11, d: 7 }, // 立冬
  { m: 12, d: 7 }, // 大雪
  { m: 1, d: 5 },  // 小寒
];

const PILLAR_LABELS = [
  { key: 'year', label: '年柱', icon: '🏠', desc: '代表祖业、根基、早年运势' },
  { key: 'month', label: '月柱', icon: '👨‍👩‍👧', desc: '代表父母、家庭、青年运势' },
  { key: 'day', label: '日柱', icon: '👤', desc: '代表自身、婚姻、中年运势' },
  { key: 'hour', label: '时柱', icon: '⏰', desc: '代表子女、事业、晚年运势' },
] as const;

// ====================== Algorithm ======================
function daysBetween(y1: number, m1: number, d1: number, y2: number, m2: number, d2: number): number {
  const date1 = new Date(y1, m1 - 1, d1);
  const date2 = new Date(y2, m2 - 1, d2);
  return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

function getSolarTermMonth(year: number, month: number, day: number): number {
  // Simplified solar term calculation using approximate dates
  // Accurate enough for most dates; exact calculation needs astronomical data
  const solarTerms = [
    { m: 2, d: 4 },  // 立春 (month 1 starts)
    { m: 3, d: 6 },  // 惊蛰 (month 2)
    { m: 4, d: 5 },  // 清明 (month 3)
    { m: 5, d: 6 },  // 立夏 (month 4)
    { m: 6, d: 6 },  // 芒种 (month 5)
    { m: 7, d: 7 },  // 小暑 (month 6)
    { m: 8, d: 8 },  // 立秋 (month 7)
    { m: 9, d: 8 },  // 白露 (month 8)
    { m: 10, d: 8 }, // 寒露 (month 9)
    { m: 11, d: 8 }, // 立冬 (month 10)
    { m: 12, d: 7 }, // 大雪 (month 11)
    { m: 1, d: 6 },  // 小寒 (month 12)
  ];

  // Adjust feb for leap years
  const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  const adjust = isLeap(year) ? 1 : 0;

  const dateVal = month * 100 + day;

  // Check each period
  for (let i = 0; i < 12; i++) {
    const st = solarTerms[i];
    const nextSt = solarTerms[(i + 1) % 12];
    const stVal = st.m * 100 + st.d + (st.m === 2 ? adjust : 0);
    let nextVal = nextSt.m * 100 + nextSt.d + (nextSt.m === 2 ? adjust : 0);
    if (nextSt.m < st.m) nextVal += 1200; // wrap around for 小寒->立春

    const adjustedDate = dateVal + (dateVal < 200 ? 1200 : 0); // normalize for Jan dates

    if (adjustedDate >= stVal && adjustedDate < (nextVal > 1200 ? nextVal : nextVal + (nextVal < stVal ? 1200 : 0))) {
      return i + 1;
    }
  }
  return 12; // default
}

function getHourBranch(hour: number, minute: number): number {
  // Chinese 时辰: 子 23-1, 丑 1-3, 寅 3-5, ...
  const totalMinutes = hour * 60 + minute;
  if (totalMinutes >= 1380 || totalMinutes < 60) return 0;  // 子 23:00-01:00
  if (totalMinutes < 180) return 1;   // 丑 01:00-03:00
  if (totalMinutes < 300) return 2;   // 寅 03:00-05:00
  if (totalMinutes < 420) return 3;   // 卯 05:00-07:00
  if (totalMinutes < 540) return 4;   // 辰 07:00-09:00
  if (totalMinutes < 660) return 5;   // 巳 09:00-11:00
  if (totalMinutes < 780) return 6;   // 午 11:00-13:00
  if (totalMinutes < 900) return 7;   // 未 13:00-15:00
  if (totalMinutes < 1020) return 8;  // 申 15:00-17:00
  if (totalMinutes < 1140) return 9;  // 酉 17:00-19:00
  if (totalMinutes < 1260) return 10; // 戌 19:00-21:00
  if (totalMinutes < 1380) return 11; // 亥 21:00-23:00
  return 0; // fallback
}

interface Pillar {
  stem: string;
  branch: string;
  stemIndex: number;
  branchIndex: number;
  stemElement: string;
  branchElement: string;
}

interface BaziResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

function calcBazi(year: number, month: number, day: number, hour: number, minute: number): BaziResult {
  // 1. Year Pillar
  const yearStemIdx = ((year - 4) % 10 + 10) % 10;
  const yearBranchIdx = ((year - 4) % 12 + 12) % 12;

  // 2. Month Pillar
  const monthBranchIdx = getSolarTermMonth(year, month, day) - 1; // 0-indexed, 寅=0
  // 五虎遁: month stem = (year stem * 2 + month branch) % 10
  const monthStemIdx = (yearStemIdx * 2 + monthBranchIdx) % 10;

  // 3. Day Pillar - using 1900-01-01 = 甲戌 (index 10 in 60-cycle)
  const refYear = 1900, refMonth = 1, refDay = 1;
  const refCycleIndex = 10; // 1900-01-01 was 甲戌 = index 10
  const daysDiff = daysBetween(refYear, refMonth, refDay, year, month, day);
  const dayCycleIndex = ((daysDiff % 60) + refCycleIndex + 60) % 60;
  const dayStemIdx = dayCycleIndex % 10;
  const dayBranchIdx = dayCycleIndex % 12;

  // 4. Hour Pillar
  const hourBranchIdx = getHourBranch(hour, minute);
  // 五鼠遁: hour stem = (day stem * 2 + hour branch) % 10
  const hourStemIdx = (dayStemIdx * 2 + hourBranchIdx) % 10;

  const makePillar = (si: number, bi: number): Pillar => ({
    stem: HEAVENLY_STEMS[si],
    branch: EARTHLY_BRANCHES[bi],
    stemIndex: si,
    branchIndex: bi,
    stemElement: STEM_ELEMENTS[si],
    branchElement: BRANCH_ELEMENTS[bi],
  });

  return {
    year: makePillar(yearStemIdx, yearBranchIdx),
    month: makePillar(monthStemIdx, monthBranchIdx),
    day: makePillar(dayStemIdx, dayBranchIdx),
    hour: makePillar(hourStemIdx, hourBranchIdx),
  };
}

function getGenderLabel(bazi: BaziResult): string {
  const dayStem = bazi.day.stem;
  const yangStems = ['甲', '丙', '戊', '庚', '壬'];
  return yangStems.includes(dayStem) ? '阳' : '阴';
}

// ====================== Component ======================
export default function BaziPage() {
  const now = new Date();
  const [birthYear, setBirthYear] = useState(2000);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [birthHour, setBirthHour] = useState(12);
  const [birthMinute, setBirthMinute] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<BaziResult | null>(null);

  const handleCalculate = () => {
    setResult(calcBazi(birthYear, birthMonth, birthDay, birthHour, birthMinute));
    setCalculated(true);
  };

  // Generate years array
  const years = useMemo(() => {
    const arr = [];
    for (let y = now.getFullYear(); y >= 1900; y--) arr.push(y);
    return arr;
  }, [now.getFullYear()]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const maxDay = useMemo(() => new Date(birthYear, birthMonth, 0).getDate(), [birthYear, birthMonth]);

  const shareText = useMemo(() => {
    if (!result) return '来看看你的四柱八字是什么？';
    const p = (p: Pillar) => `${p.stem}${p.branch}`;
    return `我的八字：${p(result.year)}年 ${p(result.month)}月 ${p(result.day)}日 ${p(result.hour)}时，来看看是什么命？`;
  }, [result]);

  return (
    <div className="tool-container">
      <h1 className="tool-title">🎱 四柱预测（八字测算）</h1>
      <p className="tool-subtitle">输入出生日期，了解你的先天命理格局</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto animate-fade-in space-y-6">
        {/* Input Form */}
        <div className="card space-y-4">
          <h3 className="font-semibold text-gray-700 text-lg">📅 出生日期</h3>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">年</label>
              <select
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(Number(e.target.value));
                  setCalculated(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 bg-white"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">月</label>
              <select
                value={birthMonth}
                onChange={(e) => {
                  setBirthMonth(Number(e.target.value));
                  setCalculated(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 bg-white"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">日</label>
              <select
                value={birthDay}
                onChange={(e) => {
                  setBirthDay(Number(e.target.value));
                  setCalculated(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 bg-white"
              >
                {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">时</label>
              <select
                value={birthHour}
                onChange={(e) => {
                  setBirthHour(Number(e.target.value));
                  setCalculated(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 bg-white"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">分</label>
              <select
                value={birthMinute}
                onChange={(e) => {
                  setBirthMinute(Number(e.target.value));
                  setCalculated(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 bg-white"
              >
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m}>{m.toString().padStart(2, '0')}分</option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={handleCalculate} className="btn-primary w-full text-lg">
            🔮 开始测算
          </button>
        </div>

        {/* Results */}
        {calculated && result && (
          <div className="space-y-5 animate-fade-in">
            {/* Four Pillars Card */}
            <div className="card">
              <h3 className="font-semibold text-gray-700 text-lg mb-4 text-center">
                📋 你的四柱八字
              </h3>

              {/* Pillars Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {PILLAR_LABELS.map(({ key, label }) => {
                  const p = result[key];
                  const isDay = key === 'day';
                  return (
                    <div key={key} className="text-center">
                      <p className="text-xs text-gray-400 mb-2">{label}</p>
                      <div className={`rounded-xl p-3 ${isDay ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50 border border-gray-200'}`}>
                        <p className="text-2xl font-bold text-gray-800">{p.stem}{p.branch}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {ELEMENT_COLORS[p.stemElement] && (
                            <span style={{ color: ELEMENT_COLORS[p.stemElement] }}>●</span>
                          )}{p.stemElement}
                          {' '}
                          {ELEMENT_COLORS[p.branchElement] && (
                            <span style={{ color: ELEMENT_COLORS[p.branchElement] }}>●</span>
                          )}{p.branchElement}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-amber-50 to-red-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">
                  命格：<span className="font-bold text-gray-800">
                    {result.day.stem}{result.day.branch} 日主 · {getGenderLabel(result)}命
                  </span>
                  <span className="mx-2">|</span>
                  生肖：<span className="font-bold text-gray-800">
                    {STEM_ANIMALS[result.year.branch] || result.year.branch} {result.year.branch}年
                  </span>
                </p>
              </div>
            </div>

            {/* Detail Cards */}
            {PILLAR_LABELS.map(({ key, label, icon, desc }) => {
              const p = result[key];
              return (
                <div key={key} className="card">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-700">{label}</h4>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-center bg-gray-50 rounded-xl px-4 py-2">
                      <span className="text-3xl font-bold text-gray-800">{p.stem}</span>
                      <p className="text-xs text-gray-500 mt-0.5">天干</p>
                    </div>
                    <span className="text-gray-300 text-lg">+</span>
                    <div className="text-center bg-gray-50 rounded-xl px-4 py-2">
                      <span className="text-3xl font-bold text-gray-800">
                        {p.branch} {STEM_ANIMALS[p.branch] || ''}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">地支</p>
                    </div>
                    <span className="text-gray-300 text-lg">→</span>
                    <div className="text-center bg-amber-50 rounded-xl px-4 py-2">
                      <span className="text-2xl font-bold text-gray-800">{p.stem}{p.branch}</span>
                      <p className="text-xs text-gray-500 mt-0.5">组合</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                      style={{ backgroundColor: ELEMENT_COLORS[p.stemElement] || '#999' }}
                    >
                      天干{p.stemElement}
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                      style={{ backgroundColor: ELEMENT_COLORS[p.branchElement] || '#999' }}
                    >
                      地支{p.branchElement}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1 pl-4 border-l-2 border-gray-200">
                    <p>天干{p.stem}：{STEM_MEANINGS[p.stem]}</p>
                    <p>地支{p.branch}：{BRANCH_MEANINGS[p.branch]}</p>
                  </div>
                </div>
              );
            })}

            {/* Wuxing Analysis */}
            <div className="card">
              <h4 className="font-semibold text-gray-700 mb-3">🎨 五行分布</h4>
              <div className="space-y-2">
                {(function() {
                  if (!result) return null;
                  const allElements = [
                    result.year.stemElement, result.year.branchElement,
                    result.month.stemElement, result.month.branchElement,
                    result.day.stemElement, result.day.branchElement,
                    result.hour.stemElement, result.hour.branchElement,
                  ];
                  const elementCount: Record<string, number> = {
                    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0,
                  };
                  allElements.forEach((e) => { elementCount[e]++; });
                  const maxCount = Math.max(...Object.values(elementCount), 1);

                  return (Object.entries(elementCount) as [string, number][]).map(([element, count]) => (
                    <div key={element} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">{element}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(count / maxCount) * 100}%`,
                            backgroundColor: ELEMENT_COLORS[element] || '#999',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-12 text-right">
                        {count} / 8
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            <ShareButton title="四柱预测结果" text={shareText} />

            <p className="text-center text-xs text-gray-300 pb-4">
              * 四柱预测内容仅供娱乐参考，请勿过度解读 😊
            </p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
