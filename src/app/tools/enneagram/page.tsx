'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'enneagram',
    title: '九型人格测试',
    emoji: '🎭',
    subtitle: '发现你的核心人格类型',
    description: '九型人格（Enneagram）是一种古老的性格分类系统，将人分为 9 种类型。每种类型都有独特的世界观、核心动机和行为模式。全球数百万人通过九型人格更好地了解自己和他人。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🎯', text: '9种人格' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。',
  },
  questions: [
    { id: 1, text: '做事情时，你更注重：', options: ['追求完美和正确，注重细节', '追求效率和结果，差不多就行'], dimension: 'T1' },
    { id: 2, text: '看到别人做事马虎，你会：', options: ['忍不住想指出并纠正', '觉得那是他的事，无所谓'], dimension: 'T1' },
    { id: 3, text: '帮助别人时你的心态是：', options: ['很享受被需要的感觉，愿意付出', '帮助是互相的，不会无条件付出'], dimension: 'T2' },
    { id: 4, text: '你对人际关系的看法：', options: ['关系是最重要的，愿意为他人付出', '保持独立，不轻易依赖或被依赖'], dimension: 'T2' },
    { id: 5, text: '在社交媒体上，你：', options: ['喜欢展示自己的成就和高光时刻', '不太在意外在形象，真实就好'], dimension: 'T3' },
    { id: 6, text: '成功的定义对你来说是：', options: ['获得外界的认可和赞赏', '内心的满足和成长'], dimension: 'T3' },
    { id: 7, text: '你对自我表达的态度：', options: ['追求独特，不喜欢和别人一样', '随大流也挺好的，不必太特别'], dimension: 'T4' },
    { id: 8, text: '情绪低落时，你会：', options: ['沉浸在情绪中，觉得有种美感', '迅速找方法让自己好起来'], dimension: 'T4' },
    { id: 9, text: '面对新领域，你：', options: ['渴望深入了解，刨根问底', '了解够用就好，不会深钻'], dimension: 'T5' },
    { id: 10, text: '社交对你来说：', options: ['消耗能量，更喜欢独处钻研', '充电的方式，喜欢和人交流'], dimension: 'T5' },
    { id: 11, text: '对于安全感，你：', options: ['非常看重，对未来有很多担忧', '不太焦虑，相信一切都会好的'], dimension: 'T6' },
    { id: 12, text: '做重要决定前，你：', options: ['反复权衡各种可能性，想到最坏情况', '相信直觉，想到就去做'], dimension: 'T6' },
    { id: 13, text: '你对新鲜体验的态度：', options: ['生活就是一场冒险，永远在寻找新刺激', '喜欢稳定的生活，偶尔来点变化'], dimension: 'T7' },
    { id: 14, text: '面对困难时，你倾向于：', options: ['快速转向有趣的新事物', '坚持到底，咬紧牙关'], dimension: 'T7' },
    { id: 15, text: '面对不公平时，你通常会：', options: ['直接站出来对抗，保护弱者', '保持低调，不想惹麻烦'], dimension: 'T8' },
    { id: 16, text: '在团队中你倾向于：', options: ['自然而然成为主导者', '配合他人，做好分内事'], dimension: 'T8' },
    { id: 17, text: '处理冲突时，你通常：', options: ['尽量调解，维持和谐氛围', '该吵就吵，直面问题'], dimension: 'T9' },
    { id: 18, text: '做决定时，你：', options: ['比较纠结，难以下定决心', '果断迅速，不拖泥带水'], dimension: 'T9' },
  ],
  calculateResult: (answers) => {
    const scores = Object.entries(answers).map(([key, val]) => ({ type: key, score: val }));
    scores.sort((a, b) => b.score - a.score);
    return scores[0].type;
  },
  resultMap: {
    T1: { emoji: '⚖️', name: '1号 完美主义者 / 改革者', traits: '有原则、自律、追求完美、有强烈的是非观', career: '法官、审计、质检、编辑、教师', love: '忠诚专一，对伴侣有高要求，希望关系"正确"' },
    T2: { emoji: '💝', name: '2号 助人者 / 给予者', traits: '温暖贴心、慷慨大方、善解人意、乐于助人', career: '护士、社工、心理咨询师、HR', love: '无微不至的关怀，但需注意不要过度牺牲自我' },
    T3: { emoji: '🏆', name: '3号 成就者 / 实干家', traits: '目标导向、适应力强、充满魅力、追求成功', career: 'CEO、销售、明星、创业者', love: '用成功来证明爱，需要伴侣理解其事业心' },
    T4: { emoji: '🎨', name: '4号 个人主义者 / 浪漫主义者', traits: '独特敏感、富有创意、情感丰富、追求意义', career: '艺术家、作家、设计师、音乐家', love: '追求灵魂深处的连接，爱得深沉且戏剧化' },
    T5: { emoji: '🔬', name: '5号 探索者 / 观察者', traits: '理性冷静、好奇钻研、独立自足、注重隐私', career: '科学家、程序员、研究员、工程师', love: '慢热克制，需要大量个人空间，但爱得深入' },
    T6: { emoji: '🛡️', name: '6号 忠诚者 / 怀疑论者', traits: '忠诚可靠、谨慎警觉、有责任心、未雨绸缪', career: '公务员、安保、审核、项目管理', love: '需要很多安全感，一旦信任则无比忠诚' },
    T7: { emoji: '🎪', name: '7号 热情者 / 享乐主义者', traits: '乐观活泼、充满能量、多才多艺、追求快乐', career: '旅行博主、活动策划、创业者、主持人', love: '热情洋溢，给伴侣带来无限欢乐，但怕束缚' },
    T8: { emoji: '🦁', name: '8号 挑战者 / 保护者', traits: '勇敢果断、有领导力、保护欲强、直率坦诚', career: '企业家、军官、律师、运动教练', love: '强势但深情，是伴侣最坚实的依靠' },
    T9: { emoji: '☮️', name: '9号 和平缔造者 / 调停者', traits: '温和包容、善于倾听、追求和谐、随和淡定', career: '调解员、顾问、外交官、行政人员', love: '平和包容，不愿起冲突，是最温和的恋人' },
  },
  share: {
    title: '我测出了九型人格类型！',
    textFn: (result, info) => `我的九型人格是 ${info.name}，快来测测你的核心人格类型！`,
  },
};

export default function EnneagramPage() {
  return <TestEngine config={config} />;
}
