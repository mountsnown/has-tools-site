'use client';

import TestEngine from '@/components/TestEngine';
import type { TestConfig } from '@/components/TestEngine';

const config: TestConfig = {
  meta: {
    id: 'dark-triad',
    title: '暗黑人格测试',
    emoji: '🕶',
    subtitle: '探索你性格中的暗黑面',
    description: '暗黑人格三合一（Dark Triad）测试评估三种暗黑人格特质：自恋(Narcissism)、马基雅维利主义(Machiavellianism)和精神病态(Psychopathy)。了解这些特质能帮你在职场和社交中更好地认识自己和他人。',
    infoCards: [
      { emoji: '📋', text: '18道题' },
      { emoji: '⏱️', text: '约3分钟' },
      { emoji: '🔬', text: '三大维度' },
      { emoji: '💯', text: '完全免费' },
    ],
    disclaimer: '⚠️ 本测试为趣味自测工具，不能替代专业心理评估。高暗黑特质不代表心理疾病。',
  },
  questions: [
    // Narcissism
    { id: 1, text: '你认为自己比大多数人：', options: ['更优秀更有魅力', '和大多数人差不多'], dimension: 'N' },
    { id: 2, text: '别人夸奖你时，你通常觉得：', options: ['理所当然，我确实很厉害', '有点不好意思'], dimension: 'N' },
    { id: 3, text: '在团队中，你希望：', options: ['成为中心人物', '和大家平起平坐'], dimension: 'N' },
    { id: 4, text: '拍照修图时，你：', options: ['很在意自己的形象是否完美', '差不多就行了，自然就好'], dimension: 'N' },
    { id: 5, text: '对权力和地位：', options: ['非常渴望，想成为有影响力的人', '不太在意，开心就好'], dimension: 'N' },
    { id: 6, text: '看到别人比自己优秀时：', options: ['有些不爽，希望自己是最好的', '为对方高兴，没有比较心'], dimension: 'N' },
    // Machiavellianism
    { id: 7, text: '为了达成目标，你会：', options: ['策略性地利用人际关系', '坚持诚实透明，不走捷径'], dimension: 'M' },
    { id: 8, text: '你对人际关系的看法：', options: ['很多关系都是利益关系', '关系应该是真诚无条件的'], dimension: 'M' },
    { id: 9, text: '在竞争中，你：', options: ['可以接受一些灰色手段', '必须公平竞争'], dimension: 'M' },
    { id: 10, text: '你认为成功的秘诀是：', options: ['知道怎么影响和利用人', '能力和努力'], dimension: 'M' },
    { id: 11, text: '对于别人的秘密，你：', options: ['会记住，说不定以后有用', '不会多想，尊重隐私'], dimension: 'M' },
    { id: 12, text: '谈判时，你更倾向于：', options: ['隐藏真实意图来获得优势', '坦诚相待，建立信任'], dimension: 'M' },
    // Psychopathy
    { id: 13, text: '看到感人视频，你通常：', options: ['没什么感觉，有点假', '很容易被感动到'], dimension: 'P' },
    { id: 14, text: '对于冒险行为：', options: ['我喜欢刺激和冒险', '我更喜欢安全可靠的事'], dimension: 'P' },
    { id: 15, text: '冲动做事的频率：', options: ['经常想到就做，不考虑后果', '会想清楚再行动'], dimension: 'P' },
    { id: 16, text: '做错事后你的感觉：', options: ['不太会内疚，过去就好了', '会自责很久'], dimension: 'P' },
    { id: 17, text: '对规则的看法：', options: ['规则是束缚，我喜欢打破它', '规则很重要，维持秩序'], dimension: 'P' },
    { id: 18, text: '伤害了别人你会：', options: ['不太在乎，对方太敏感了吧', '感到很抱歉，会主动道歉'], dimension: 'P' },
  ],
  calculateResult: (answers) => {
    const highest = Math.max(answers.N || 0, answers.M || 0, answers.P || 0);
    if (answers.N === highest && answers.M === highest) return 'NM';
    if (answers.M === highest && answers.P === highest) return 'MP';
    if (answers.N === highest && answers.P === highest) return 'NP';
    if (answers.N === highest) return 'N';
    if (answers.M === highest) return 'M';
    if (answers.P === highest) return 'P';
    return 'B';
  },
  resultMap: {
    B: { emoji: '😇', name: '光明型', traits: '暗黑特质总体偏低，你待人真诚、富有同理心。你的性格偏阳光。', career: '社会工作、教育、医疗等助人领域', love: '真诚温暖，值得信赖的伴侣' },
    N: { emoji: '🪞', name: '自恋倾向型', traits: '自信且善于展示自己，对赞美有需求。适度自恋有益职场发展，注意不要过于自我中心。', career: '娱乐圈、销售、领导岗位、社交媒体', love: '需要被崇拜和认可，给足面子很重要' },
    M: { emoji: '♟️', name: '策略型', traits: '善于观察和影响他人，懂策略懂人心。在商场上这是优势，但要警惕在亲密关系中过于算计。', career: '商业谈判、政治、策略咨询、管理', love: '善于经营关系，但有时显得不够真诚' },
    P: { emoji: '🎢', name: '冒险型', traits: '追求刺激、不受约束、活在当下。你可能是个"酷"的人，但注意冲动行为和同理心不足。', career: '极限运动员、特种兵、急救人员、自由职业', love: '刺激有趣的伴侣，但稳定性较差' },
    NM: { emoji: '👑', name: '领袖暗黑型', traits: '自信且有手腕，天生的领导者和策略家。你可能在职场所向披靡，但亲密关系需要放下盔甲。', career: 'CEO、政治家、战略家、创业者', love: '魅力十足但有掌控欲，需要学会示弱' },
    MP: { emoji: '🎭', name: '危险魅力型', traits: '冷酷且迷人，善于操控且爱冒险。你需要警惕伤害身边的人，即使是无意的。', career: '谈判专家、高风险行业', love: '令人着迷但危险，真心被层层包裹' },
    NP: { emoji: '🐺', name: '独狼型', traits: '自信且冲动，不按套路出牌。你不在乎别人看法，活得肆意潇洒，但社交关系可能受影响。', career: '独立艺术家、自由职业、冒险家', love: '难以驯服，只有真正理解的人才能靠近' },
  },
  share: {
    title: '我测出了暗黑人格特质！',
    textFn: (result, info) => `我的暗黑人格是 ${info.name}，快来测测你的性格暗黑面！`,
  },
};

export default function DarkTriadPage() {
  return <TestEngine config={config} />;
}
