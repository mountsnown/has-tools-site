'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'big-five',
    title: '大五人格测试',
    emoji: '🔮',
    subtitle: '探索你的五大性格维度',
    description: '大五人格（Big Five / OCEAN）是全球心理学界最认可的性格模型，通过 20 道题评估你外向性、宜人性、尽责性、神经质和开放性五个核心维度。',
    infoCards: [
      { emoji: '📋', text: '20道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🔬', text: 'OCEAN模型' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    // 外向性 Extraversion
    { id: 1, text: '在社交聚会中，你通常：', options: ['充满活力，乐于结识新朋友', '倾向于和少数熟人深入交流'], dimension: 'E' },
    { id: 2, text: '独处时你的感受是？', options: ['感到无聊，想找事情做', '享受独处的宁静时光'], dimension: 'E' },
    { id: 3, text: '和一大群人在一起后，你：', options: ['感到精力充沛', '感觉疲惫，需要独处充电'], dimension: 'E' },
    { id: 4, text: '你更喜欢的沟通方式是：', options: ['面对面聊天或打电话', '文字消息或邮件'], dimension: 'E' },
    // 宜人性 Agreeableness
    { id: 5, text: '朋友找你帮忙搬家，你会：', options: ['爽快答应并主动安排', '看情况，自己有事可能会拒绝'], dimension: 'A' },
    { id: 6, text: '和人有分歧时，你倾向于：', options: ['寻找共同的立场，避免冲突升级', '坚持自己的立场，该争就争'], dimension: 'A' },
    { id: 7, text: '看到陌生人遇到困难，你通常会：', options: ['主动上前帮忙', '等对方求助或别人先行动'], dimension: 'A' },
    { id: 8, text: '你认为大多数人是：', options: ['善良可信的', '需要小心对待的'], dimension: 'A' },
    // 尽责性 Conscientiousness
    { id: 9, text: '对于计划和安排，你：', options: ['喜欢提前规划好一切', '随性而为，不喜欢被计划束缚'], dimension: 'C' },
    { id: 10, text: '你的房间或工作台通常：', options: ['整洁有序，物品各就各位', '有点乱但我知道东西在哪'], dimension: 'C' },
    { id: 11, text: '面对截止日期，你通常：', options: ['提前很多天就开始准备', '最后关头冲刺完成'], dimension: 'C' },
    { id: 12, text: '对于承诺过的事情，你：', options: ['说到做到，很可靠', '有时会忘记或改变主意'], dimension: 'C' },
    // 神经质 Neuroticism
    { id: 13, text: '遇到压力时，你通常：', options: ['容易焦虑，想很多', '保持冷静，从容应对'], dimension: 'N' },
    { id: 14, text: '别人批评你时，你会：', options: ['耿耿于怀，反复回想', '很快就能释怀'], dimension: 'N' },
    { id: 15, text: '面对不确定的未来，你：', options: ['经常担忧和焦虑', '顺其自然，不必太担心'], dimension: 'N' },
    { id: 16, text: '你的情绪波动程度：', options: ['情绪起伏较大，容易受影响', '情绪比较稳定平和'], dimension: 'N' },
    // 开放性 Openness
    { id: 17, text: '对于新鲜事物和体验，你：', options: ['非常好奇，喜欢尝试新东西', '更喜欢熟悉的套路和方式'], dimension: 'O' },
    { id: 18, text: '你对艺术和美的感受：', options: ['容易被艺术和美感打动', '不太关注这些，觉得实用更重要'], dimension: 'O' },
    { id: 19, text: '在思维方式上，你：', options: ['喜欢天马行空，发挥想象力', '注重实际，讲求逻辑'], dimension: 'O' },
    { id: 20, text: '对于不同的文化和价值观，你：', options: ['很有兴趣了解，觉得开阔眼界', '尊重但不太会主动去了解'], dimension: 'O' },
  ],
  calculateResult: (answers) => {
    const e = answers.E <= 0 ? 'I' : 'E';
    const a = answers.A <= 0 ? 'L' : 'A';
    const c = answers.C <= 0 ? 'U' : 'C';
    const n = answers.N <= 0 ? 'S' : 'N';
    const o = answers.O <= 0 ? 'T' : 'O';
    return e + a + c + n + o;
  },
  resultMap: {
    EACST: { name: '社交达人', traits: '外向热情、善解人意、稳重大方', career: '销售经理、公关顾问、活动策划', love: '主动热情，善于表达，重视另一半感受' },
    EACNT: { name: '魅力领袖', traits: '外向果断、富有感染力、敢于冒险', career: '企业家、创业者、演讲家', love: '充满激情和魅力，喜欢主导关系节奏' },
    EACSO: { name: '阳光使者', traits: '乐观开朗、亲和力强、富有创造力', career: '教师、主持人、创意总监', love: '温暖阳光，积极营造甜蜜关系' },
    EACNO: { name: '全能型', traits: '综合素质极高、情绪敏感但坚韧、创意爆棚', career: 'CEO、艺术家、战略顾问', love: '情感丰富且投入，追求深度连接' },
    ELCSO: { name: '理性务实', traits: '内向外向平衡、踏实认真、思维开放', career: '工程师、分析师、律师', love: '慢热但专一，行动胜过言语' },
    ELCTO: { name: '安静努力型', traits: '内向稳重、尽职尽责、传统保守', career: '公务员、会计、研究员', love: '不善表达但可靠踏实，最有安全感' },
    EUCNO: { name: '随性自由', traits: '情绪敏感、好奇心强、随心所欲', career: '自由职业者、艺术家、作家', love: '浪漫不羁，享受当下的美好' },
    ILUST: { name: '深思内省型', traits: '内向安静、自由奔放、情绪稳定', career: '程序员、数据分析师、图书管理员', love: '不主动但深情，需要对方多给空间' },
  },
  share: {
    title: '我测出了大五人格类型！',
    textFn: (result, info) => `我的大五人格是 ${result}（${info.name}），快来测测你的五大性格维度！`,
  },
};

export default function BigFivePage() {
  return <TestEngine config={config} />;
}
