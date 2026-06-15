'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'disc',
    title: 'DISC 性格测试',
    emoji: '🔴',
    subtitle: '了解你的行为风格',
    description: 'DISC 是全球企业最常用的行为风格测评工具之一。通过 16 道题评估你在支配力(D)、影响力(I)、稳健性(S)和谨慎性(C)四个维度的倾向，帮你在职场和生活中发挥优势。',
    infoCards: [
      { emoji: '📋', text: '16道题' },
      { emoji: '⏱️', text: '约2分钟' },
      { emoji: '🏢', text: '企业广泛使用' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业测评。',
  },
  questions: [
    // D: Dominance
    { id: 1, text: '在团队讨论时，你通常：', options: ['主导发言，推动决策', '先听大家说，再表达看法'], dimension: 'D' },
    { id: 2, text: '面对挑战时，你的反应是：', options: ['兴奋，迫不及待要攻克', '谨慎，先评估再行动'], dimension: 'D' },
    { id: 3, text: '做决策的速度：', options: ['快速果断，不喜欢拖延', '需要时间，希望考虑周全'], dimension: 'D' },
    { id: 4, text: '竞争对你来说：', options: ['让我充满动力！', '不太喜欢，更注重合作'], dimension: 'D' },
    // I: Influence
    { id: 5, text: '在社交场合中，你：', options: ['是活跃气氛的人', '更喜欢安静观察'], dimension: 'I' },
    { id: 6, text: '表达情感时，你：', options: ['外露直接，喜形于色', '内敛含蓄，不轻易表露'], dimension: 'I' },
    { id: 7, text: '你对社交媒体的态度：', options: ['非常活跃，喜欢分享', '偶尔看看，很少发布'], dimension: 'I' },
    { id: 8, text: '说服别人时，你依靠：', options: ['热情和感染力', '数据和逻辑'], dimension: 'I' },
    // S: Steadiness
    { id: 9, text: '面对突如其来的变化，你：', options: ['感到不安，希望保持稳定', '适应力强，享受变化'], dimension: 'S' },
    { id: 10, text: '你的工作节奏是：', options: ['稳重持续，不喜欢赶时间', '节奏多变，可以同时处理多件事'], dimension: 'S' },
    { id: 11, text: '做事情时你更喜欢：', options: ['按部就班，一次做一件事', '灵活多变，多线程并行'], dimension: 'S' },
    { id: 12, text: '在朋友中，你通常是：', options: ['稳定可靠的倾听者', '活跃气氛的开心果'], dimension: 'S' },
    // C: Conscientiousness
    { id: 13, text: '做决定时，你更看重：', options: ['数据和事实', '直觉和感受'], dimension: 'C' },
    { id: 14, text: '对规则和流程的态度：', options: ['严格遵守，规则很重要', '灵活变通，规则是参考'], dimension: 'C' },
    { id: 15, text: '你做事更注重：', options: ['质量和准确性', '速度和效率'], dimension: 'C' },
    { id: 16, text: '指出别人的错误时，你：', options: ['会直接指出，准确很重要', '会委婉或不指出，关系更重要'], dimension: 'C' },
  ],
  calculateResult: (answers) => {
    const scores = { D: answers.D || 0, I: answers.I || 0, S: answers.S || 0, C: answers.C || 0 };
    const max = Math.max(scores.D, scores.I, scores.S, scores.C);
    const top = Object.entries(scores).filter(([, v]) => v === max);
    return top[0][0];
  },
  resultMap: {
    D: { emoji: '🔥', name: 'D 型 — 支配者 / 指挥型', traits: '果断自信、结果导向、敢于冒险、有领导力', career: 'CEO、创业者、军官、销售总监', love: '主导型恋人，喜欢掌控节奏，需要被崇拜' },
    I: { emoji: '🌟', name: 'I 型 — 影响者 / 社交型', traits: '热情乐观、善于沟通、有感染力、人脉广泛', career: '主持人、公关、营销、培训师', love: '浪漫热情的表达者，是朋友圈里的甜蜜担当' },
    S: { emoji: '🕊️', name: 'S 型 — 稳健者 / 支持型', traits: '温和耐心、忠诚可靠、善于倾听、团队稳定器', career: '护士、教师、客服、行政、HR', love: '默默付出型，最可靠最温暖的伴侣' },
    C: { emoji: '📐', name: 'C 型 — 谨慎者 / 思考型', traits: '严谨细致、逻辑清晰、追求精准、高标准', career: '工程师、会计师、研究员、数据分析师', love: '理性克制，用事实说话，爱得很认真' },
  },
  share: {
    title: '我测出了DISC性格类型！',
    textFn: (result, info) => `我的 DISC 行为风格是 ${info.name}，快来测测你的职场性格！`,
  },
};

export default function DISCPage() {
  return <TestEngine config={config} />;
}
