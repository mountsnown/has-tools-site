'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'love-languages',
    title: '爱的五种语言测试',
    emoji: '💌',
    subtitle: '发现你表达和接收爱的方式',
    description: '爱的五种语言由盖瑞·查普曼博士提出，全球超过 3000 万人使用。了解你的爱之语，能帮你更好地表达爱意、改善亲密关系。五种语言：肯定的言语、精心的时刻、接受礼物、服务的行动、身体的接触。',
    infoCards: [
      { emoji: '📋', text: '15道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '💝', text: '5种爱语' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业情感咨询。',
  },
  questions: [
    { id: 1, text: '哪种更让你感到被爱？', options: ['伴侣对你说"我爱你"', '伴侣给你一个拥抱'], dimension: 'A' },
    { id: 2, text: '哪种更让你开心？', options: ['收到一封手写的情书', '收到一份精心准备的礼物'], dimension: 'A' },
    { id: 3, text: '哪种更能安慰你？', options: ['"一切都会好的"', '伴侣默默帮你处理事情'], dimension: 'A' },
    { id: 4, text: '你更珍惜：', options: ['和伴侣一起专心聊天的时间', '收到伴侣送的有心意的小礼物'], dimension: 'B' },
    { id: 5, text: '你更喜欢：', options: ['周末一起去散步', '伴侣帮你做家务'], dimension: 'B' },
    { id: 6, text: '约会时最重要的是：', options: ['深入交流，心无旁骛', '牵手拥抱等亲密互动'], dimension: 'B' },
    { id: 7, text: '哪种更让你感动？', options: ['伴侣出差带回的小礼物', '伴侣说"你真棒"'], dimension: 'C' },
    { id: 8, text: '纪念日时你更看重：', options: ['收到精心准备的礼物', '共同度过一整天'], dimension: 'C' },
    { id: 9, text: '表达爱的方式：', options: ['送小惊喜', '经常拥抱和牵手'], dimension: 'C' },
    { id: 10, text: '最让你感动的是：', options: ['伴侣主动做了你不想做的家务', '伴侣认真听你讲烦心事'], dimension: 'D' },
    { id: 11, text: '你需要帮助时：', options: ['伴侣二话不说出手帮忙', '伴侣温柔地鼓励你'], dimension: 'D' },
    { id: 12, text: '哪个更让你有安全感？', options: ['伴侣帮你解决了实际问题', '伴侣为你准备了一份礼物'], dimension: 'D' },
    { id: 13, text: '你更享受：', options: ['看电视时靠着伴侣', '伴侣为你做饭'], dimension: 'E' },
    { id: 14, text: '安慰伴侣时你倾向于：', options: ['抱住对方', '说温柔鼓励的话'], dimension: 'E' },
    { id: 15, text: '恋爱中最重要的是：', options: ['亲密的肢体接触', '深入的灵魂交流'], dimension: 'E' },
  ],
  calculateResult: (answers) => {
    const scores = { A: answers.A || 0, B: answers.B || 0, C: answers.C || 0, D: answers.D || 0, E: answers.E || 0 };
    const max = Math.max(scores.A, scores.B, scores.C, scores.D, scores.E);
    const top = Object.entries(scores).filter(([, v]) => v === max).map(([k]) => k);
    return top[0];
  },
  resultMap: {
    A: { emoji: '💬', name: '肯定的言语', traits: '你通过话语来感受和表达爱。"我爱你""你真棒""有你在真好"这些看似简单的话对你来说胜过千言万语。', career: '—', love: '你需要伴侣经常用言语表达爱意。请告诉对方：你最需要的是听到他说爱你、夸你、肯定你。' },
    B: { emoji: '⏳', name: '精心的时刻', traits: '把全部注意力给到你，比什么都重要。心不在焉的陪伴对你来说是最大的伤害。', career: '—', love: '你需要高质量的陪伴时间。请告诉伴侣：一起散步、认真聊天、放下手机的专属时光对你最重要。' },
    C: { emoji: '🎁', name: '接受礼物', traits: '礼物对你来说是爱的具象化。重要的不是价格，而是对方在挑选礼物时想着你的心意。', career: '—', love: '你喜欢通过礼物感受爱。请告诉伴侣：小惊喜和用心的小礼物能让你感受满满爱意。' },
    D: { emoji: '🛠️', name: '服务的行动', traits: '行动比语言更打动你。对方帮你分担家务、修好东西、解决实际问题时，你觉得被深深爱着。', career: '—', love: '你需要对方用行动来证明爱。请告诉伴侣：帮你做事就是他表达爱的最好方式。' },
    E: { emoji: '🤗', name: '身体的接触', traits: '拥抱、牵手、亲吻对你来说是爱的氧气。缺乏肢体接触会让你感觉不到被爱。', career: '—', love: '你需要充分的身体接触。请告诉伴侣：多抱抱你、牵你的手，这能让你感到安心和被爱。' },
  },
  share: {
    title: '我发现了我的爱之语！',
    textFn: (result, info) => `我的爱之语是「${info.name}」，快来测测你接受和表达爱的方式！`,
  },
};

export default function LoveLanguagesPage() {
  return <TestEngine config={config} />;
}
