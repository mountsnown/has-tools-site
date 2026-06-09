'use client';

import { useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

const DATA: Record<string, Record<number, Record<string, Array<{ title: string; drugs: string; level: string; note?: string }>>>> = {
  nsclc: {
    1: {
      unk: [
        { title: "首选：解剖性肺叶切除 + 纵隔淋巴结清扫", drugs: "手术入路：胸腔镜/微创优先", level: "1", note: "纯磨玻璃/≤2cm 可考虑肺段或楔形切除" },
        { title: "不耐受手术：立体定向放疗 (SBRT)", drugs: "立体定向体部放疗", level: "1", note: "老老年或合并症无法手术者" },
        { title: "术后辅助（ⅠA期）", drugs: "定期随访观察，无需辅助治疗", level: "1" },
        { title: "术后辅助（ⅠB期高危）", drugs: "化疗：培美曲塞/吉西他滨/多西他赛 + 顺铂/卡铂", level: "2B", note: "EGFR突变：奥希替尼或埃克替尼（1类）" },
        { title: "术后辅助（Ⅱ期）", drugs: "非鳞：培美曲塞+顺铂/卡铂；鳞癌：吉西他滨/多西他赛+顺铂/卡铂", level: "1", note: "EGFR突变：奥希替尼（1类）；PD-L1阳性可加阿替利珠单抗（2A）" },
        { title: "切缘阳性（R1/R2）", drugs: "再次手术 ± 辅助放化疗", level: "2A", note: "首选再次切除" }
      ],
      egfr: [{ title: "术后辅助靶向治疗", drugs: "奥希替尼 / 埃克替尼", level: "1", note: "ⅠB-ⅢA期 EGFR 突变患者" }],
      alk: [], ros1: [], ret: [], braf: [], met: [], neg: []
    },
    2: {
      unk: [
        { title: "首选：解剖性肺叶切除 + 纵隔淋巴结清扫", drugs: "手术入路：胸腔镜/微创优先", level: "1" },
        { title: "不耐受手术：立体定向放疗 (SBRT)", drugs: "SBRT", level: "1" },
        { title: "术后辅助化疗（非鳞）", drugs: "培美曲塞 + 顺铂/卡铂", level: "1" },
        { title: "术后辅助化疗（鳞癌）", drugs: "吉西他滨/多西他赛 + 顺铂/卡铂", level: "1" },
        { title: "术后辅助靶向（EGFR+）", drugs: "奥希替尼", level: "1" },
        { title: "术后辅助免疫（PD-L1+）", drugs: "阿替利珠单抗", level: "2A" }
      ],
      egfr: [{ title: "术后辅助靶向", drugs: "奥希替尼", level: "1" }],
      alk: [], ros1: [], ret: [], braf: [], met: [], neg: []
    },
    3: {
      unk: [
        { title: "【可切除】术前新辅助化疗 ± 免疫", drugs: "纳武利尤单抗 + 含铂双药", level: "2B", note: "部分ⅢA/少数ⅢB" },
        { title: "【可切除】术后辅助化疗 ± 靶向/免疫", drugs: "规范淋巴结清扫，术后辅助治疗", level: "2A" },
        { title: "【不可切除】标准：根治性同步放化疗", drugs: "顺铂/卡铂 + 依托泊苷/培美曲塞（非鳞）", level: "1", note: "大部分ⅢB/ⅢC" },
        { title: "【不可切除】不耐受同步：序贯放化疗", drugs: "化疗 → 放疗", level: "2A" },
        { title: "【不可切除】巩固治疗：度伐利尤单抗", drugs: "同步放化疗后用度伐利尤单抗", level: "1", note: "III期不可切除NSCLC标准" }
      ],
      egfr: [{ title: "同步放化疗后巩固靶向", drugs: "度伐利尤单抗（1类）", level: "1", note: "EGFR突变者仍可用度伐利尤单抗" }],
      alk: [], ros1: [], ret: [], braf: [], met: [], neg: []
    },
    4: {
      unk: [
        { title: "驱动基因阳性 → 靶向优先（见下方）", drugs: "", level: "1" },
        { title: "驱动基因阴性（非鳞）一线：免疫+化疗", drugs: "帕博利珠单抗/卡瑞利珠单抗/信迪利单抗 + 培美曲塞 + 铂类", level: "1" },
        { title: "驱动基因阴性（非鳞）：抗血管+化疗", drugs: "贝伐珠单抗 + 培美曲塞 + 铂类", level: "1" },
        { title: "驱动基因阴性（非鳞）：单纯化疗", drugs: "培美曲塞 + 顺铂/卡铂", level: "1" },
        { title: "驱动基因阴性（鳞癌）一线：免疫+化疗", drugs: "帕博利珠单抗/卡瑞利珠单抗 + 紫杉醇/吉西他滨 + 铂类", level: "1" },
        { title: "驱动基因阴性（鳞癌）：单纯化疗", drugs: "吉西他滨/多西他赛 + 顺铂/卡铂", level: "1" },
        { title: "PS 3-4：最佳支持治疗", drugs: "对症支持、营养、疼痛管理", level: "1" }
      ],
      egfr: [
        { title: "一线优先：奥希替尼", drugs: "奥希替尼（优先）、吉非替尼、厄洛替尼、阿法替尼", level: "1", note: "敏感突变（L858R/19del）" },
        { title: "EGFR ex20ins：莫博替尼 / 埃万妥单抗", drugs: "莫博替尼 / 埃万妥单抗", level: "2A" },
        { title: "T790M阳性耐药：奥希替尼", drugs: "奥希替尼", level: "1" },
        { title: "其他耐药：阿美替尼 / 伏美替尼", drugs: "阿美替尼、伏美替尼 或 换用化疗", level: "2A" }
      ],
      alk: [{ title: "一线优先：阿来替尼", drugs: "阿来替尼（优先）、塞瑞替尼、克唑替尼", level: "1" }],
      ros1: [{ title: "一线：克唑替尼 / 恩曲替尼", drugs: "克唑替尼、恩曲替尼", level: "1" }],
      ret: [{ title: "一线：塞尔帕替尼 / 普拉替尼", drugs: "塞尔帕替尼、普拉替尼", level: "1" }],
      braf: [{ title: "一线：达拉非尼 + 曲美替尼", drugs: "达拉非尼 + 曲美替尼", level: "1" }],
      met: [{ title: "一线：卡马替尼 / 特泊替尼", drugs: "卡马替尼、特泊替尼", level: "1" }],
      neg: [
        { title: "非鳞一线：免疫+化疗", drugs: "帕博利珠单抗/卡瑞利珠单抗/信迪利单抗 + 培美曲塞 + 铂类", level: "1" },
        { title: "鳞癌一线：免疫+化疗", drugs: "帕博利珠单抗/卡瑞利珠单抗 + 紫杉醇/吉西他滨 + 铂类", level: "1" },
        { title: "二线化疗", drugs: "多西他赛、培美曲塞（非鳞）", level: "1" },
        { title: "三线：安罗替尼", drugs: "安罗替尼", level: "1" },
        { title: "后线：免疫单药", drugs: "纳武利尤单抗 等 PD-1/PD-L1 单抗", level: "2A" },
        { title: "寡转移：全身 + 局部", drugs: "全身治疗 + 手术/SBRT/局部放疗", level: "2A" }
      ]
    }
  },
  sclc: {
    1: { unk: [
      { title: "可手术(T1~2N0)：肺叶切除 + 辅助化疗", drugs: "依托泊苷 + 顺铂/卡铂（EP/EC）", level: "2A", note: "术后辅助化疗" },
      { title: "不可手术：同步放化疗", drugs: "EP/EC方案", level: "1", note: "放疗尽早介入" },
      { title: "缓解后：预防性脑放疗(PCI)", drugs: "酌情PCI", level: "2A" }
    ]},
    2: { unk: [] },
    3: { unk: [
      { title: "广泛期一线：化疗 + 免疫", drugs: "阿替利珠单抗/度伐利尤单抗 + EP", level: "1" },
      { title: "广泛期一线：EP/EC/IP", drugs: "EP：依托泊苷+顺铂；EC：依托泊苷+卡铂；IP：伊立替康+顺铂", level: "1", note: "IP为2A类" },
      { title: "局部并发症：对症放化疗", drugs: "上腔静脉综合征、骨转移、脑转移", level: "2A" },
      { title: "巩固：胸部放疗（病灶控制后）", drugs: "酌情胸部放疗", level: "2A", note: "谨慎选择PCI" }
    ]},
    4: { unk: [
      { title: "< 6个月复发：拓扑替康 / 伊立替康 / 氨柔比星", drugs: "拓扑替康、伊立替康、氨柔比星", level: "2A" },
      { title: "> 6个月复发：复用原一线方案", drugs: "复用EP/EC方案", level: "2A" },
      { title: "三线：安罗替尼", drugs: "安罗替尼", level: "1" }
    ]}
  }
};

const stageNames: Record<number, string> = { 1: "Ⅰ期（早期）", 2: "Ⅱ期", 3: "Ⅲ期（局部晚期）", 4: "Ⅳ期（晚期/转移性）" };
const typeNames: Record<string, string> = { nsclc: "非小细胞肺癌 (NSCLC)", sclc: "小细胞肺癌 (SCLC)" };
const geneNames: Record<string, string> = { unk: "未知/待检测", egfr: "EGFR突变+", alk: "ALK融合+", ros1: "ROS1融合+", ret: "RET融合+", braf: "BRAF V600E+", met: "MET 14跳跃+", neg: "驱动基因阴性" };

const IO_DRUGS = ['帕博利珠单抗', '卡瑞利珠单抗', '信迪利单抗', '纳武利尤单抗', '阿替利珠单抗', '度伐利尤单抗', '阿美替尼', '伏美替尼', '奥希替尼', '埃克替尼', '吉非替尼', '厄洛替尼', '阿法替尼', '阿来替尼', '塞瑞替尼', '克唑替尼', '恩曲替尼', '塞尔帕替尼', '普拉替尼', '达拉非尼', '曲美替尼', '卡马替尼', '特泊替尼', '莫博替尼', '埃万妥单抗', '安罗替尼', '拓扑替康', '伊立替康', '氨柔比星'];

export default function LungCancerPage() {
  const render = () => {
    const typeSel = (document.getElementById('typeSel') as HTMLSelectElement)?.value || 'nsclc';
    const stageSel = (document.getElementById('stageSel') as HTMLSelectElement)?.value || '1';
    const geneSel = (document.getElementById('geneSel') as HTMLSelectElement)?.value || 'unk';
    const psSel = (document.getElementById('psSel') as HTMLSelectElement)?.value || '0-1';

    const type = typeSel;
    const stage = parseInt(stageSel);
    const gene = geneSel;
    const ps = psSel;

    let items: Array<{ title: string; drugs: string; level: string; note?: string }> = [];
    const d = DATA[type][stage];
    if (type === 'nsclc') {
      if (gene === 'unk') {
        items = d.unk;
      } else if (gene === 'neg') {
        items = d.neg;
      } else {
        items = (d[gene] && d[gene].length) ? d[gene] : [];
        if (!items.length && stage === 4) {
          items = d.unk.filter(i => i.title.includes('靶向') || i.title.includes('驱动基因'));
        }
      }
      if (ps === '3-4' && stage !== 4) {
        items = items.filter(i => !i.title.includes('化疗'));
      }
    } else {
      items = d.unk;
    }

    const typeColor = type === 'nsclc' ? 'nsclc' : 'sclc';

    let html = `<div class="content-grid">`;
    html += `<div class="card">`;
    html += `<span class="card-title ${typeColor}">${typeNames[type]} · ${stageNames[stage]}${gene !== 'unk' ? ' · ' + geneNames[gene] : ''}</span>`;

    if (items.length === 0) {
      html += `<div class="empty-msg">暂无推荐方案<br /><small>（请调整筛选条件）</small></div>`;
    } else {
      items.forEach(item => {
        html += `<div class="rec-item level${item.level === '1' ? '1' : item.level === '2A' ? '2a' : item.level === '2B' ? '2b' : '3'}">`;
        html += `<span class="rec-label l${item.level === '1' ? '1' : item.level === '2A' ? '2a' : '2b'}">${item.level}类</span>`;
        html += `<div class="rec-title">${item.title}</div>`;
        if (item.drugs) {
          const drugParts = item.drugs.split(/[/+]/);
          let drugsHtml = '';
          drugParts.forEach(drug => {
            drug = drug.trim();
            if (!drug) return;
            const isIO = IO_DRUGS.some(x => drug.includes(x));
            const isTarget = drug.includes('替尼') || drug.includes('单抗');
            drugsHtml += `<span class="drug-tag ${isIO ? 'io' : isTarget ? 'target' : ''}">${drug}</span>`;
          });
          html += `<div class="rec-drugs">${drugsHtml}</div>`;
        }
        if (item.note) {
          html += `<div class="note">${item.note}</div>`;
        }
        html += `</div>`;
      });
    }
    html += `</div>`;

    // Right side: key tips
    html += `<div class="card">`;
    html += `<span class="card-title nsclc">关键提示</span>`;

    if (type === 'nsclc') {
      if (stage === 4) {
        html += `<div class="section-header">驱动基因检测要求</div>`;
        html += `<div class="gene-list" style="margin-bottom:12px;">`;
        ['EGFR', 'ALK', 'ROS1', 'RET', 'BRAF', 'MET 14跳跃', 'KRAS G12C', 'HER2', 'NTRK'].forEach(g => {
          html += `<span class="gene-chip">${g}</span>`;
        });
        html += `</div>`;
        html += `<div class="note">所有IV期NSCLC确诊时均应进行分子检测，指导靶向治疗方案</div>`;
        html += `<div class="divider"></div>`;
        html += `<div class="section-header">后线治疗（化疗/免疫进展后）</div>`;
        html += `<div class="rec-item level1"><span class="rec-label l1">1类</span><div class="rec-title">三线：安罗替尼</div><div class="rec-drugs"><span class="drug-tag target">安罗替尼</span></div></div>`;
        html += `<div class="rec-item level2a"><span class="rec-label l2a">2A类</span><div class="rec-title">后线：纳武利尤单抗等PD-1/PD-L1单药</div></div>`;
        html += `<div class="rec-item level2a"><span class="rec-label l2a">2A类</span><div class="rec-title">寡转移：全身+局部治疗</div><div class="rec-drugs"><span class="drug-tag">手术/SBRT/局部放疗</span></div></div>`;
      } else if (stage === 1 || stage === 2) {
        html += `<div class="section-header">术后辅助参考</div>`;
        html += `<div class="rec-item level1"><span class="rec-label l1">1类</span><div class="rec-title">EGFR突变：奥希替尼辅助靶向</div></div>`;
        html += `<div class="rec-item level2b"><span class="rec-label l2b">2B类</span><div class="rec-title">ⅠB期高危：辅助化疗（培美曲塞/吉西他滨/多西他赛+铂类）</div></div>`;
        html += `<div class="rec-item level2a"><span class="rec-label l2a">2A类</span><div class="rec-title">PD-L1阳性：阿替利珠单抗辅助</div></div>`;
        html += `<div class="note">高危因素：低分化、脉管侵犯、楔形切除、脏层胸膜受累、淋巴结采样不足</div>`;
      } else if (stage === 3) {
        html += `<div class="section-header">III期关键决策点</div>`;
        html += `<div class="rec-item level1"><span class="rec-label l1">1类</span><div class="rec-title">不可切除：同步放化疗后度伐利尤单抗巩固</div></div>`;
        html += `<div class="rec-item level2b"><span class="rec-label l2b">2B类</span><div class="rec-title">可切除：新辅助化疗 ± 免疫（纳武利尤单抗+含铂）</div></div>`;
        html += `<div class="note">III期综合治疗需多学科讨论（MDT）决定手术可能性</div>`;
      }
    } else {
      html += `<div class="section-header">SCLC治疗特点</div>`;
      html += `<div class="rec-item level1"><span class="rec-label l1">1类</span><div class="rec-title">广泛期：化疗+免疫（阿替利珠单抗/度伐利尤单抗+EP）</div></div>`;
      html += `<div class="rec-item level2a"><span class="rec-label l2a">2A类</span><div class="rec-title">局限期可手术：肺叶切除+EP/EC辅助化疗</div></div>`;
      html += `<div class="rec-item level2a"><span class="rec-label l2a">2A类</span><div class="rec-title">PCI：缓解后酌情考虑（老年/体能差者谨慎）</div></div>`;
      html += `<div class="note">SCLC对化疗/放疗敏感但易早期转移/复发，靶向治疗选择有限</div>`;
    }

    html += `<div class="divider"></div>`;
    html += `<div class="section-header">重要辅助支持</div>`;
    html += `<div class="rec-item level2a"><span class="rec-label l2a">支持</span><div class="rec-title">骨髓抑制预防</div><div class="rec-drugs"><span class="drug-tag">G-CSF（粒细胞集落刺激因子）预防性使用</span></div></div>`;
    html += `<div class="rec-item level2a"><span class="rec-label l2a">支持</span><div class="rec-title">骨转移</div><div class="rec-drugs"><span class="drug-tag">双膦酸盐 / 地舒单抗 + 局部放疗</span></div></div>`;
    html += `<div class="rec-item level2a"><span class="rec-label l2a">支持</span><div class="rec-title">疼痛管理 & 营养支持</div><div class="rec-drugs"><span class="drug-tag">全程对症支持</span></div></div>`;

    html += `</div></div>`;

    const contentArea = document.getElementById('contentArea');
    if (contentArea) contentArea.innerHTML = html;
  };

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .lung-cancer-page { font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif; background: #f0f2f5; color: #1a1a2e; }
        .container { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }

        .page-header { text-align: center; margin-bottom: 28px; }
        .page-header h1 { font-size: 26px; font-weight: 700; color: #1a1a2e; letter-spacing: 1px; }
        .page-header p { font-size: 13px; color: #888; margin-top: 6px; }

        .selector-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; background: #fff; border-radius: 14px; padding: 18px 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }
        .selector-group { display: flex; flex-direction: column; gap: 6px; }
        .selector-group label { font-size: 12px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 0.5px; }
        .selector-group select { padding: 9px 14px; border: 1.5px solid #e0e4ec; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fafbfc; cursor: pointer; min-width: 160px; transition: border-color 0.2s; }
        .selector-group select:hover { border-color: #5b8dee; }
        .selector-group select:focus { outline: none; border-color: #5b8dee; box-shadow: 0 0 0 3px rgba(91,141,238,0.15); }

        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 700px) { .content-grid { grid-template-columns: 1fr; } }

        .card { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .card-title { font-size: 14px; font-weight: 700; color: #fff; padding: 6px 14px; border-radius: 20px; display: inline-block; margin-bottom: 14px; }
        .card-title.nsclc { background: linear-gradient(135deg, #4f7fe8, #6b52d4); }
        .card-title.sclc { background: linear-gradient(135deg, #e8844f, #d45c3a); }
        .card-title.surgery { background: linear-gradient(135deg, #3dbd8a, #27a06e); }
        .card-title.adjuvant { background: linear-gradient(135deg, #8e44ad, #6c3483); }
        .card-title.evidence { background: linear-gradient(135deg, #2c3e50, #34495e); font-size: 11px; }

        .section-header { font-size: 15px; font-weight: 600; color: #2c3e50; margin: 14px 0 8px 0; padding-bottom: 5px; border-bottom: 2px solid #eef0f4; }
        .section-header:first-child { margin-top: 0; }

        .drug-tag { display: inline-block; background: #edf2ff; color: #3b5bdb; border-radius: 5px; padding: 2px 8px; font-size: 13px; font-weight: 600; margin: 2px; }
        .drug-tag.oral { background: #e8f5e9; color: #2e7d32; }
        .drug-tag.io { background: #fce4ec; color: #c62828; }
        .drug-tag.target { background: #fff3e0; color: #e65100; }

        .rec-item { padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #ddd; background: #fafbfc; }
        .rec-item.level1 { border-left-color: #27ae60; }
        .rec-item.level2a { border-left-color: #3498db; }
        .rec-item.level2b { border-left-color: #7f8c8d; }
        .rec-item.level3 { border-left-color: #95a5a6; }

        .rec-label { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px; display: inline-block; margin-bottom: 5px; }
        .rec-label.l1 { background: #27ae60; color: #fff; }
        .rec-label.l2a { background: #3498db; color: #fff; }
        .rec-label.l2b { background: #7f8c8d; color: #fff; }
        .rec-label.l3 { background: #95a5a6; color: #fff; }

        .rec-title { font-size: 13px; font-weight: 600; color: #2c3e50; margin-bottom: 4px; }
        .rec-drugs { font-size: 13px; color: #555; line-height: 1.6; }

        .divider { height: 1px; background: #eef0f4; margin: 16px 0; }

        .gene-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
        .gene-chip { background: #fff3e0; color: #e65100; border: 1px solid #ffcc80; border-radius: 5px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
        .gene-chip.mut { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }

        .note { font-size: 11px; color: #999; margin-top: 8px; line-height: 1.5; background: #fffde7; padding: 8px 12px; border-radius: 6px; border: 1px solid #fff59d; }

        .quick-ref { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); margin-top: 18px; }
        .quick-ref h3 { font-size: 15px; font-weight: 700; color: #2c3e50; margin-bottom: 14px; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th { background: #2c3e50; color: #fff; padding: 9px 12px; text-align: left; }
        td { padding: 8px 12px; border-bottom: 1px solid #eef0f4; vertical-align: top; }
        tr:nth-child(even) td { background: #fafbfc; }
        tr:hover td { background: #f0f4ff; }

        .badge { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 700; color: #fff; }
        .badge.green { background: #27ae60; }
        .badge.blue { background: #3498db; }
        .badge.gray { background: #7f8c8d; }

        .empty-msg { text-align: center; color: #aaa; font-size: 14px; padding: 40px 0; }
      `}</style>
      <div className="lung-cancer-page">
        <div className="container">
          <div className="page-header">
            <h1>肺癌综合治疗方案速查工具</h1>
            <p>基于指南分期 · 驱动基因 · 证据级别 · 仅供参考</p>
          </div>

          <AdBanner className="mb-6" />

          <div className="selector-bar">
            <div className="selector-group">
              <label>病理类型</label>
              <select id="typeSel" onChange={render}>
                <option value="nsclc">非小细胞肺癌 (NSCLC)</option>
                <option value="sclc">小细胞肺癌 (SCLC)</option>
              </select>
            </div>
            <div className="selector-group">
              <label>临床分期</label>
              <select id="stageSel" onChange={render}>
                <option value="1">Ⅰ期（早期）</option>
                <option value="2">Ⅱ期</option>
                <option value="3">Ⅲ期（局部晚期）</option>
                <option value="4">Ⅳ期（晚期/转移性）</option>
              </select>
            </div>
            <div className="selector-group">
              <label>分子检测状态</label>
              <select id="geneSel" onChange={render}>
                <option value="unk">未知/待检测</option>
                <option value="egfr">EGFR 突变 (+)</option>
                <option value="alk">ALK 融合 (+)</option>
                <option value="ros1">ROS1 融合 (+)</option>
                <option value="ret">RET 融合 (+)</option>
                <option value="braf">BRAF V600E (+)</option>
                <option value="met">MET 14跳跃 (+)</option>
                <option value="neg">驱动基因阴性</option>
              </select>
            </div>
            <div className="selector-group">
              <label>ECOG体能评分</label>
              <select id="psSel" onChange={render}>
                <option value="0-1">PS 0-1（可耐受标准治疗）</option>
                <option value="2">PS 2（需减量/调整方案）</option>
                <option value="3-4">PS 3-4（最佳支持治疗）</option>
              </select>
            </div>
          </div>

          <div id="contentArea" />

          <div className="quick-ref">
            <h3>证据等级速查</h3>
            <table>
              <thead>
                <tr><th>等级</th><th>含义</th><th>颜色标识</th></tr>
              </thead>
              <tbody>
                <tr><td><span className="badge green">1类</span></td><td>高证据水平，强烈推荐</td><td>绿色边线</td></tr>
                <tr><td><span className="badge blue">2A类</span></td><td>较低证据但临床认可</td><td>蓝色边线</td></tr>
                <tr><td><span className="badge gray">2B类</span></td><td>低级别证据，可选方案</td><td>灰色边线</td></tr>
                <tr><td><span className="badge gray">3类</span></td><td>专家共识或低级别证据</td><td>浅灰边线</td></tr>
              </tbody>
            </table>
          </div>

          <div className="quick-ref" style={{ marginTop: 18 }}>
            <h3>必检驱动基因（NSCLC IV期）</h3>
            <div className="gene-list">
              <span className="gene-chip mut">EGFR</span>
              <span className="gene-chip mut">ALK</span>
              <span className="gene-chip mut">ROS1</span>
              <span className="gene-chip mut">RET</span>
              <span className="gene-chip mut">BRAF</span>
              <span className="gene-chip mut">MET 14外显子跳跃</span>
              <span className="gene-chip mut">KRAS G12C</span>
              <span className="gene-chip mut">HER2</span>
              <span className="gene-chip mut">NTRK</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-gray-600 leading-relaxed">
            <p className="font-bold text-amber-800 mb-1">免责声明</p>
            <p>本工具仅用于医学知识科普参考，基于公开指南整理，不能替代专业医疗诊断。治疗方案请务必遵从主治医生医嘱。</p>
          </div>

          <AdBanner className="mt-8" />
        </div>
      </div>
    </>
  );
}
