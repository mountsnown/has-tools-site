'use client';

import { useState, useMemo } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number;
  domain: string;
}

const questions: Question[] = [
  // 逻辑推理 (Logic)
  { id: 1, text: '如果所有的狗都是动物，小白是狗，那么：', options: ['小白不一定是动物', '小白一定是动物', '小白一定不是动物', '无法判断'], answer: 1, domain: '逻辑推理' },
  { id: 2, text: '找出规律：2, 4, 8, 16, ？', options: ['18', '24', '32', '30'], answer: 2, domain: '逻辑推理' },
  { id: 3, text: '小明比小红高，小红比小刚高，谁最高？', options: ['小红', '小刚', '小明', '无法判断'], answer: 2, domain: '逻辑推理' },
  { id: 4, text: '一个盒子里有红球和蓝球共10个，红球比蓝球多4个，红球有几个？', options: ['5个', '6个', '7个', '8个'], answer: 2, domain: '逻辑推理' },

  // 图形规律 (Pattern)
  { id: 5, text: '○ △ □ ○ △ □ ○ △ ？ 下一个是什么？', options: ['○', '△', '□', '☆'], answer: 2, domain: '图形规律' },
  { id: 6, text: '如果 ★ + ★ = 10，★ × ● = 15，那么 ● = ？', options: ['2', '3', '4', '5'], answer: 1, domain: '图形规律' },
  { id: 7, text: '下面哪个与其他三个不是同一类？', options: ['苹果', '香蕉', '西红柿', '汽车'], answer: 3, domain: '图形规律' },
  { id: 8, text: '数字规律：1, 1, 2, 3, 5, 8, ？', options: ['10', '11', '13', '15'], answer: 2, domain: '图形规律' },

  // 数学能力 (Math)
  { id: 9, text: '25 × 4 = ？', options: ['80', '90', '100', '110'], answer: 2, domain: '数学能力' },
  { id: 10, text: '一个蛋糕切成8块，吃了3块，还剩几分之几？', options: ['3/8', '5/8', '1/2', '3/5'], answer: 1, domain: '数学能力' },
  { id: 11, text: '小华有15元，买书花了7元，买笔花了3元，还剩多少？', options: ['3元', '4元', '5元', '6元'], answer: 2, domain: '数学能力' },
  { id: 12, text: '正方形的周长是20厘米，边长是多少？', options: ['4厘米', '5厘米', '6厘米', '10厘米'], answer: 1, domain: '数学能力' },

  // 语言理解 (Verbal)
  { id: 13, text: '"兴高采烈"的意思是：', options: ['非常生气', '非常高兴', '非常难过', '非常紧张'], answer: 1, domain: '语言理解' },
  { id: 14, text: '"守株待兔"这个成语告诉我们：', options: ['要坚持不懈', '不能心存侥幸', '要勤劳勇敢', '要诚实守信'], answer: 1, domain: '语言理解' },
  { id: 15, text: '下面哪组词的关系与"医生:医院"相同？', options: ['学生:操场', '老师:学校', '工人:机器', '农民:粮食'], answer: 1, domain: '语言理解' },
  { id: 16, text: '反义词："炎热"的反义词是？', options: ['温暖', '凉爽', '寒冷', '干燥'], answer: 2, domain: '语言理解' },

  // 空间想象 (Spatial)
  { id: 17, text: '一个正方体有几个面？', options: ['4个', '5个', '6个', '8个'], answer: 2, domain: '空间想象' },
  { id: 18, text: '将一张纸对折两次后，剪去一个角，展开后有几个洞？', options: ['1个', '2个', '4个', '8个'], answer: 2, domain: '空间想象' },
  { id: 19, text: '从上面看一个圆柱体，看到的形状是：', options: ['长方形', '圆形', '三角形', '正方形'], answer: 1, domain: '空间想象' },
  { id: 20, text: '镜子里看到的时间是3:00，实际时间是几点？', options: ['3:00', '9:00', '12:00', '6:00'], answer: 1, domain: '空间想象' },
];

const domains = [
  { key: '逻辑推理', label: '逻辑推理', icon: '🧩' },
  { key: '图形规律', label: '图形规律', icon: '🔮' },
  { key: '数学能力', label: '数学能力', icon: '🔢' },
  { key: '语言理解', label: '语言理解', icon: '📖' },
  { key: '空间想象', label: '空间想象', icon: '🌐' },
];

function calcIQ(rawScore: number, total: number): { iq: number; level: string; desc: string; color: string; percentile: number } {
  // Standard IQ scale: mean=100, SD=15
  const pct = rawScore / total;
  // Map percentile to IQ using z-score approach (simplified)
  const iq = Math.round(70 + pct * 75); // Range 70-145

  let level: string, desc: string, color: string;
  if (iq >= 140) {
    level = '天才级';
    desc = '你的孩子展现出非凡的智力天赋，在逻辑推理和抽象思维方面表现极为出色';
    color = 'text-purple-700';
  } else if (iq >= 130) {
    level = '非常优秀';
    desc = '你的孩子智力水平远超同龄人，具备出色的学习和分析能力';
    color = 'text-indigo-700';
  } else if (iq >= 120) {
    level = '优秀';
    desc = '你的孩子智力水平高于大部分同龄人，学习能力较强';
    color = 'text-blue-700';
  } else if (iq >= 110) {
    level = '中上';
    desc = '你的孩子智力水平处于同龄人中上水平，各方面发展均衡';
    color = 'text-cyan-700';
  } else if (iq >= 90) {
    level = '中等';
    desc = '你的孩子智力水平与大多数同龄人相当，属于正常发展范围';
    color = 'text-green-700';
  } else if (iq >= 80) {
    level = '中下';
    desc = '你的孩子可能需要更多关注和引导，建议在薄弱领域加强练习';
    color = 'text-yellow-700';
  } else {
    level = '待提高';
    desc = '建议关注孩子的学习情况，必要时可咨询专业机构进行详细评估';
    color = 'text-orange-700';
  }

  const percentile = Math.round(pct * 99 + 1);
  return { iq, level, desc, color, percentile: Math.min(percentile, 99) };
}

export default function ChildIQTestPage() {
  const [ageGroup, setAgeGroup] = useState<'' | '6-8' | '9-11' | '12-14' | '15-16'>('');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    if (!ageGroup) return;
    setStarted(true);
  };

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIdx;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    }
  };

  const handleFinish = () => {
    if (answers.includes(-1)) {
      alert('请回答所有题目后再查看结果');
      return;
    }
    setShowResult(true);
  };

  const result = useMemo(() => {
    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0), 0);
    const domainScores: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!domainScores[q.domain]) domainScores[q.domain] = { correct: 0, total: 0 };
      domainScores[q.domain].total++;
      if (answers[i] === q.answer) domainScores[q.domain].correct++;
    });
    return { score, total: questions.length, ...calcIQ(score, questions.length), domainScores };
  }, [answers]);

  const reset = () => {
    setAgeGroup('');
    setStarted(false);
    setCurrentQ(0);
    setAnswers(new Array(questions.length).fill(-1));
    setShowResult(false);
  };

  // Age selection
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
              🧒 儿童智商测试
            </h1>
            <p className="text-gray-500 text-sm">适用于6-16岁儿童的趣味智力测评，包含逻辑、数学、语言、空间等维度</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4 text-lg">请选择孩子年龄组</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { value: '6-8', label: '6-8岁', desc: '低年级', icon: '🌈' },
                { value: '9-11', label: '9-11岁', desc: '中年级', icon: '🎒' },
                { value: '12-14', label: '12-14岁', desc: '初中', icon: '📚' },
                { value: '15-16', label: '15-16岁', desc: '高中', icon: '🎓' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAgeGroup(opt.value as typeof ageGroup)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    ageGroup === opt.value
                      ? 'border-purple-500 bg-purple-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{opt.icon}</div>
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-xs text-gray-400">{opt.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              disabled={!ageGroup}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                ageGroup
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              开始测试（共{questions.length}题）
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
            <h3 className="font-bold text-gray-800 mb-3">📋 测试说明</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 共{questions.length}道选择题，涵盖5个智力维度</li>
              <li>• 每题只有一个正确答案，选择后自动进入下一题</li>
              <li>• 请在安静环境下独立完成，不要查阅资料</li>
              <li>• 本测试为趣味测评，结果仅供参考</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Quiz
  if (!showResult) {
    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;
    const answered = answers[currentQ] !== -1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
        <div className="max-w-lg mx-auto px-4">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>第 {currentQ + 1}/{questions.length} 题</span>
              <span>{q.domain}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
            <p className="text-lg font-medium text-gray-800 mb-6">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = answers[currentQ] === i;
                return (
                  <button
                    key={i}
                    onClick={() => !answered && handleAnswer(i)}
                    disabled={answered}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-200'
                    } ${answered && !isSelected ? 'opacity-50' : ''}`}
                  >
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + i)}. {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentQ === questions.length - 1 && answered && (
              <button
                onClick={handleFinish}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg transition-all"
              >
                查看结果
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
            🧒 测试结果
          </h1>
          <p className="text-gray-500 text-sm">年龄组：{ageGroup}岁</p>
        </div>

        {/* IQ Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 text-center">
          <div className={`text-6xl font-extrabold ${result.color} mb-2`}>{result.iq}</div>
          <div className="text-lg font-bold text-gray-800">{result.level}</div>
          <div className="text-sm text-gray-500 mt-1">
            正确率 {result.score}/{result.total} · 超过 {result.percentile}% 的同龄儿童
          </div>
          <p className="text-sm text-gray-600 mt-4 bg-gray-50 rounded-xl p-3">
            {result.desc}
          </p>
        </div>

        {/* Domain breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📊 各维度表现</h3>
          <div className="space-y-3">
            {domains.map((d) => {
              const ds = result.domainScores[d.key];
              const pct = ds ? Math.round((ds.correct / ds.total) * 100) : 0;
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{d.icon} {d.label}</span>
                    <span className="text-gray-500">{ds.correct}/{ds.total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-blue-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IQ Scale Reference */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">📖 IQ分数参考</h3>
          <div className="space-y-2 text-xs">
            {[
              { range: '140+', label: '天才级', c: 'text-purple-600' },
              { range: '130-139', label: '非常优秀', c: 'text-indigo-600' },
              { range: '120-129', label: '优秀', c: 'text-blue-600' },
              { range: '110-119', label: '中上', c: 'text-cyan-600' },
              { range: '90-109', label: '中等', c: 'text-green-600' },
              { range: '80-89', label: '中下', c: 'text-yellow-600' },
              { range: '70-79', label: '待提高', c: 'text-orange-600' },
            ].map((r) => (
              <div key={r.range} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-gray-50">
                <span className="font-medium">{r.range}</span>
                <span className={r.c}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Retry */}
        <button
          onClick={reset}
          className="w-full py-3 rounded-xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          重新测试
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          ⚠️ 本测试为趣味自测工具，不能替代专业智力评估。如需专业测评，请咨询儿童心理或教育机构。
        </p>
      </div>
    </div>
  );
}
