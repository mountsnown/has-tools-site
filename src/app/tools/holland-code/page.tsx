'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'holland-code',
    title: '霍兰德职业兴趣测试',
    emoji: '🏗',
    subtitle: '发现你的职业兴趣类型',
    description: '霍兰德职业兴趣测试（Holland Code / RIASEC）是全球最广泛使用的职业测评工具，将职业兴趣分为六种类型。了解你的霍兰德代码，帮你找到真正热爱的工作方向。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🧭', text: '6种类型' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业职业咨询。',
  },
  questions: [
    // R: Realistic
    { id: 1, text: '你更喜欢：', options: ['动手操作，修理或搭建东西', '分析思考，解决抽象问题'], dimension: 'R' },
    { id: 2, text: '户外工作 vs 室内工作：', options: ['喜欢户外或动手的工作', '喜欢室内或脑力的工作'], dimension: 'R' },
    { id: 3, text: '你对机械和工具：', options: ['很感兴趣，喜欢拆装东西', '不太感兴趣，更关注概念和想法'], dimension: 'R' },
    // I: Investigative
    { id: 4, text: '遇到不懂的事，你：', options: ['刨根问底，要搞清楚原理', '了解大概就行，不必深究'], dimension: 'I' },
    { id: 5, text: '你对科学研究：', options: ['非常着迷，喜欢探索未知', '不太感冒，觉得太理论化'], dimension: 'I' },
    { id: 6, text: '解决问题的方式：', options: ['逻辑分析，理性推理', '凭经验和直觉'], dimension: 'I' },
    // A: Artistic
    { id: 7, text: '你对艺术和创作：', options: ['充满兴趣，喜欢自我表达', '不太擅长，更喜欢实际有用的东西'], dimension: 'A' },
    { id: 8, text: '你的思维方式更：', options: ['天马行空，发散思维', '有规律有逻辑，线性思维'], dimension: 'A' },
    { id: 9, text: '工作环境你更喜欢：', options: ['自由不拘，有创造力发挥空间', '规则明确，流程清晰'], dimension: 'A' },
    // S: Social
    { id: 10, text: '和人打交道时你：', options: ['感到兴奋，乐在其中', '消耗能量，更喜欢独处做事'], dimension: 'S' },
    { id: 11, text: '你想做的改变：', options: ['帮助他人、推动社会进步', '技术创新、提高效率'], dimension: 'S' },
    { id: 12, text: '你更擅长：', options: ['倾听和沟通', '分析和计算'], dimension: 'S' },
    // E: Enterprising
    { id: 13, text: '对于领导和说服：', options: ['我很享受，这是我擅长的', '不太喜欢，更喜欢配合他人'], dimension: 'E' },
    { id: 14, text: '你对金钱和商业：', options: ['很有兴趣，喜欢琢磨赚钱', '觉得够用就行，更看重其他'], dimension: 'E' },
    { id: 15, text: '在团队中你希望：', options: ['成为决策者和推动者', '成为可靠的执行者和专家'], dimension: 'E' },
    // C: Conventional
    { id: 16, text: '对于数据和记录：', options: ['我喜欢整理和有条理的工作', '觉得枯燥，更喜欢灵活'], dimension: 'C' },
    { id: 17, text: '做事风格：', options: ['严谨细致，按流程来', '灵活变通，不拘小节'], dimension: 'C' },
    { id: 18, text: '你对细节的态度：', options: ['注重细节，力求准确', '抓大放小，不拘泥于细枝末节'], dimension: 'C' },
  ],
  calculateResult: (answers) => {
    const dims = { R: answers.R || 0, I: answers.I || 0, A: answers.A || 0, S: answers.S || 0, E: answers.E || 0, C: answers.C || 0 };
    const sorted = Object.entries(dims).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(([k]) => k).join('');
  },
  resultMap: {
    RIA: { emoji: '🔧', name: 'RIA — 实用创新者', traits: '动手能力强且有创造力，喜欢建造和创新', career: '建筑师、工程师、工业设计师、飞行员', love: '—' },
    RIS: { emoji: '🔬', name: 'RIS — 研究探索者', traits: '科学严谨且乐于助人，喜欢解决实际问题', career: '医生、药剂师、生物学家、法医', love: '—' },
    RIE: { emoji: '⚙️', name: 'RIE — 技术驱动者', traits: '技术精湛且有领导力，喜欢主导项目', career: '工程经理、技术总监、项目经理', love: '—' },
    RAI: { emoji: '🎨', name: 'RAI — 创意工匠', traits: '手巧且审美出众，能把想法变成作品', career: '建筑师、景观设计师、珠宝设计师', love: '—' },
    RSE: { emoji: '🏗', name: 'RSE — 实干推动者', traits: '务实且有社交能力，能把想法落地', career: '项目经理、销售工程师、采购经理', love: '—' },
    IAS: { emoji: '🧪', name: 'IAS — 科学助人者', traits: '智力突出且有社会责任感，追求真理', career: '医生、教授、环境科学家、营养师', love: '—' },
    IAR: { emoji: '🔭', name: 'IAR — 理论创造者', traits: '逻辑严密且艺术气息，打破学科界限', career: '天文学家、人类学家、科学作家', love: '—' },
    AIR: { emoji: '🎭', name: 'AIR — 艺术思想家', traits: '创造力强且有智慧深度，情感丰富', career: '作家、记者、艺术评论家、策展人', love: '—' },
    AIS: { emoji: '📖', name: 'AIS — 人文关怀者', traits: '富有创意且善于共情，艺术的温度', career: '作家、心理咨询师、教育工作者', love: '—' },
    SAI: { emoji: '🫂', name: 'SAI — 智慧助人者', traits: '富有同理心且智慧，服务与思考结合', career: '心理咨询师、医生、社会工作者、牧师', love: '—' },
    SEA: { emoji: '🌟', name: 'SEA — 社会领导者', traits: '善于社交且果断，正义感和创造力强', career: '政治家、公益组织负责人、法官', love: '—' },
    SEC: { emoji: '🏛', name: 'SEC — 社会管理者', traits: '善于沟通且有条理，管理协调能力出众', career: '公务员、行政主管、酒店经理', love: '—' },
    EAS: { emoji: '💼', name: 'EAS — 创意企业家', traits: '商业头脑且审美出色，创意与商业结合', career: '创意总监、广告人、经纪人', love: '—' },
    ESC: { emoji: '📊', name: 'ESC — 商业领导者', traits: '领导力强且条理清晰，谈判高手', career: 'CEO、销售总监、投资人、律师', love: '—' },
    CRI: { emoji: '📐', name: 'CRI — 精确分析者', traits: '严谨细致且有逻辑头脑，保证零误差', career: '精算师、数据分析师、质检专家', love: '—' },
    CSI: { emoji: '📑', name: 'CSI — 系统管理者', traits: '条理清晰且有一定助人意愿，环境稳定器', career: '会计、审计、行政总监、IT经理', love: '—' },
  },
  share: {
    title: '我测出了霍兰德职业类型！',
    textFn: (result, info) => `我的霍兰德职业代码是 ${info.name}，快来测测你的职业兴趣方向！`,
  },
};

export default function HollandCodePage() {
  return <TestEngine config={config} />;
}
