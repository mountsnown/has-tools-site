'use client';

import { useState, useMemo, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';

// ================================================================
// Types
// ================================================================

type FieldMode = 'every' | 'specific' | 'range' | 'step' | 'list';

interface FieldState {
  mode: FieldMode;
  value: number;
  rangeFrom: number;
  rangeTo: number;
  stepBase: string;
  stepValue: number;
  listValues: number[];
}

// ================================================================
// Constants
// ================================================================

const DAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const DAY_VALUES = [0, 1, 2, 3, 4, 5, 6];

const MODE_LABELS: { mode: FieldMode; label: string }[] = [
  { mode: 'every', label: '每' },
  { mode: 'specific', label: '指定' },
  { mode: 'range', label: '区间' },
  { mode: 'step', label: '步进' },
  { mode: 'list', label: '列表' },
];

const FIELD_CONFIGS = [
  { key: 'minute', label: '分钟', min: 0, max: 59 },
  { key: 'hour', label: '小时', min: 0, max: 23 },
  { key: 'dom', label: '日', min: 1, max: 31 },
  { key: 'month', label: '月', min: 1, max: 12 },
  { key: 'dow', label: '周', min: 0, max: 6 },
] as const;

const PRESETS = [
  { label: '每分钟', expr: '* * * * *' },
  { label: '每小时', expr: '0 * * * *' },
  { label: '每天午夜', expr: '0 0 * * *' },
  { label: '工作日早9点', expr: '0 9 * * 1-5' },
  { label: '每周一', expr: '0 0 * * 1' },
  { label: '每月1号', expr: '0 0 1 * *' },
  { label: '每5分钟', expr: '*/5 * * * *' },
  { label: '每30分钟', expr: '*/30 * * * *' },
  { label: '每天早8点', expr: '0 8 * * *' },
  { label: '每周日', expr: '0 0 * * 0' },
];

// ================================================================
// Field helpers
// ================================================================

function defaultFieldState(min: number, max: number): FieldState {
  return {
    mode: 'every',
    value: min,
    rangeFrom: min,
    rangeTo: max,
    stepBase: '*',
    stepValue: 1,
    listValues: [],
  };
}

function fieldStateToString(state: FieldState): string {
  switch (state.mode) {
    case 'every':
      return '*';
    case 'specific':
      return String(state.value);
    case 'range':
      return `${state.rangeFrom}-${state.rangeTo}`;
    case 'step':
      if (state.stepValue <= 1) return '*';
      return state.stepBase === '*'
        ? `*/${state.stepValue}`
        : `${state.stepBase}/${state.stepValue}`;
    case 'list':
      return state.listValues.length > 0 ? state.listValues.join(',') : '*';
    default:
      return '*';
  }
}

function parseFieldToState(
  field: string,
  min: number,
  max: number
): FieldState {
  const base = defaultFieldState(min, max);
  if (field === '*' || field === '') return base;

  // Step: */N or M/N
  const stepMatch = field.match(/^(\*|\d+)\/(\d+)$/);
  if (stepMatch) {
    return {
      ...base,
      mode: 'step',
      stepBase: stepMatch[1],
      stepValue: parseInt(stepMatch[2]),
    };
  }

  // Range: N-M
  const rangeMatch = field.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    return {
      ...base,
      mode: 'range',
      rangeFrom: parseInt(rangeMatch[1]),
      rangeTo: parseInt(rangeMatch[2]),
    };
  }

  // Comma-separated list
  if (field.includes(',')) {
    const vals = field
      .split(',')
      .map(Number)
      .filter((n) => !isNaN(n));
    return { ...base, mode: 'list', listValues: vals };
  }

  // Specific number
  const num = parseInt(field);
  if (!isNaN(num)) {
    return { ...base, mode: 'specific', value: num };
  }

  return base;
}

function buildCronExpr(fields: Record<string, FieldState>): string {
  return ['minute', 'hour', 'dom', 'month', 'dow']
    .map((k) => fieldStateToString(fields[k]))
    .join(' ');
}

// ================================================================
// Cron parsing & matching
// ================================================================

/** Expand a single cron field into the set of values it matches. */
function expandField(field: string, min: number, max: number): Set<number> {
  const result = new Set<number>();

  if (field === '*') {
    for (let i = min; i <= max; i++) result.add(i);
    return result;
  }

  // Step: */N or M/N — iterate from the base value by step
  const stepMatch = field.match(/^(\*|\d+)\/(\d+)$/);
  if (stepMatch) {
    const base = stepMatch[1] === '*' ? min : parseInt(stepMatch[1]);
    const step = parseInt(stepMatch[2]);
    if (step > 0) {
      for (let i = base; i <= max; i += step) result.add(i);
    }
    return result;
  }

  // Handle comma-separated parts (each may be a range or a single value)
  const parts = field.split(',');
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = Math.max(parseInt(rangeMatch[1]), min);
      const end = Math.min(parseInt(rangeMatch[2]), max);
      for (let i = start; i <= end; i++) result.add(i);
    } else {
      const num = parseInt(part);
      if (!isNaN(num) && num >= min && num <= max) result.add(num);
    }
  }

  return result;
}

interface ParsedCron {
  mins: Set<number>;
  hours: Set<number>;
  doms: Set<number>;
  months: Set<number>;
  dows: Set<number>;
  domRestricted: boolean;
  dowRestricted: boolean;
}

function parseCron(expr: string): ParsedCron | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;

  const [minF, hourF, domF, monthF, dowF] = parts;

  return {
    mins: expandField(minF, 0, 59),
    hours: expandField(hourF, 0, 23),
    doms: expandField(domF, 1, 31),
    months: expandField(monthF, 1, 12),
    dows: expandField(dowF, 0, 6),
    domRestricted: domF !== '*',
    dowRestricted: dowF !== '*',
  };
}

function matchesCron(date: Date, parsed: ParsedCron): boolean {
  const m = date.getMinutes();
  const h = date.getHours();
  const d = date.getDate();
  const mo = date.getMonth() + 1;
  const dw = date.getDay();

  if (!parsed.mins.has(m)) return false;
  if (!parsed.hours.has(h)) return false;
  if (!parsed.months.has(mo)) return false;

  // Day matching — cron uses OR logic when both dom and dow are restricted
  if (parsed.domRestricted && parsed.dowRestricted) {
    if (!parsed.doms.has(d) && !parsed.dows.has(dw)) return false;
  } else if (parsed.domRestricted) {
    if (!parsed.doms.has(d)) return false;
  } else if (parsed.dowRestricted) {
    if (!parsed.dows.has(dw)) return false;
  }

  return true;
}

// ================================================================
// Next executions
// ================================================================

function getNextExecutions(expr: string, count: number = 5): Date[] {
  const parsed = parseCron(expr);
  if (!parsed) return [];

  const results: Date[] = [];

  // Start from the next whole minute
  const now = new Date();
  const current = new Date(now);
  current.setMilliseconds(0);
  current.setSeconds(0);
  current.setMinutes(current.getMinutes() + 1);

  // Upper bound: 5 years of minutes
  const maxIter = 5 * 365 * 24 * 60;
  let iter = 0;

  while (results.length < count && iter < maxIter) {
    iter++;

    if (matchesCron(current, parsed)) {
      results.push(new Date(current));
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  return results;
}

// ================================================================
// Human-readable Chinese description
// ================================================================

function describeSingleDow(dowF: string): string {
  const rangeM = dowF.match(/^(\d)-(\d)$/);
  if (rangeM) {
    const a = parseInt(rangeM[1]);
    const b = parseInt(rangeM[2]);
    return `每周${DAY_NAMES[a]}至${DAY_NAMES[b]}`;
  }
  if (/^\d$/.test(dowF)) {
    return `每周${DAY_NAMES[parseInt(dowF)]}`;
  }
  if (dowF.includes(',')) {
    const names = dowF
      .split(',')
      .map((d) => DAY_NAMES[parseInt(d)] || d)
      .join('、');
    return `每周${names}`;
  }
  return '每周指定日';
}

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return '无效的 Cron 表达式';

  const [minF, hourF, domF, monthF, dowF] = parts;

  // ---- exact common patterns ----

  if (expr === '* * * * *') return '每分钟执行';

  // */N * * * *
  const minStep = minF.match(/^\*\/(\d+)$/);
  if (
    minStep &&
    hourF === '*' &&
    domF === '*' &&
    monthF === '*' &&
    dowF === '*'
  ) {
    return `每隔 ${minStep[1]} 分钟执行`;
  }

  // N * * * *  (specific minute only)
  if (
    /^\d+$/.test(minF) &&
    hourF === '*' &&
    domF === '*' &&
    monthF === '*' &&
    dowF === '*'
  ) {
    return minF === '0'
      ? '每小时整点执行'
      : `每小时第 ${minF} 分执行`;
  }

  // * H * * *  (specific hour only, every minute)
  if (
    minF === '*' &&
    /^\d+$/.test(hourF) &&
    domF === '*' &&
    monthF === '*' &&
    dowF === '*'
  ) {
    return `每天 ${hourF.padStart(2, '0')}:00 起每分钟执行`;
  }

  // ---- general description ----

  // Time part
  let timeStr: string;
  if (/^\d+$/.test(hourF) && /^\d+$/.test(minF)) {
    timeStr = `${hourF.padStart(2, '0')}:${minF.padStart(2, '0')}`;
  } else {
    timeStr = `${hourF}:${minF}`;
  }

  // Frequency part
  const freqParts: string[] = [];

  if (monthF !== '*') {
    const m = parseInt(monthF);
    freqParts.push(!isNaN(m) ? `${m}月` : '指定月份');
  }

  if (domF !== '*' && dowF !== '*') {
    // Both restricted — OR logic
    const dStr = /^\d+$/.test(domF) ? `${domF}日` : '指定日期';
    freqParts.push(`${dStr} 或 ${describeSingleDow(dowF)}`);
  } else if (domF !== '*') {
    const dStr = /^\d+$/.test(domF) ? `${domF}日` : '指定日期';
    freqParts.push(monthF !== '*' ? dStr : `每月${dStr}`);
  } else if (dowF !== '*') {
    freqParts.push(describeSingleDow(dowF));
  }

  const freqStr = freqParts.join('');

  if (!freqStr && domF === '*' && monthF === '*' && dowF === '*') {
    return `每天 ${timeStr} 执行`;
  }

  return `${freqStr} ${timeStr} 执行`;
}

// ================================================================
// Formatters
// ================================================================

function formatDateTime(date: Date): string {
  const y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  const dw = DAY_NAMES[date.getDay()];
  return `${y}-${M}-${d} ${h}:${m}:${s} ${dw}`;
}

// ================================================================
// Sub-components
// ================================================================

function DaySelect({
  selected,
  onChange,
}: {
  selected: number;
  onChange: (value: number) => void;
}) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="px-2 py-1 rounded border border-gray-200 text-sm focus:border-red-300 focus:outline-none bg-white"
    >
      {DAY_VALUES.map((d) => (
        <option key={d} value={d}>
          {DAY_NAMES[d]}
        </option>
      ))}
    </select>
  );
}

/** Renders mode-specific inputs for a single cron field. */
function FieldInputs({
  cfg,
  state,
  onChange,
}: {
  cfg: { key: string; label: string; min: number; max: number };
  state: FieldState;
  onChange: (update: Partial<FieldState>) => void;
}) {
  const isDow = cfg.key === 'dow';

  if (state.mode === 'specific') {
    if (isDow) {
      return (
        <DaySelect
          selected={state.value}
          onChange={(v) => onChange({ value: v })}
        />
      );
    }
    return (
      <input
        type="number"
        min={cfg.min}
        max={cfg.max}
        value={state.value}
        onChange={(e) => {
          const v = parseInt(e.target.value);
          if (!isNaN(v) && v >= cfg.min && v <= cfg.max) onChange({ value: v });
        }}
        className="w-20 px-2 py-1 rounded border border-gray-200 text-sm text-center focus:border-red-300 focus:outline-none"
      />
    );
  }

  if (state.mode === 'range') {
    if (isDow) {
      return (
        <div className="flex items-center gap-1.5">
          <DaySelect
            selected={state.rangeFrom}
            onChange={(v) => onChange({ rangeFrom: v })}
          />
          <span className="text-xs text-gray-400">至</span>
          <DaySelect
            selected={state.rangeTo}
            onChange={(v) => onChange({ rangeTo: v })}
          />
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={cfg.min}
          max={cfg.max}
          value={state.rangeFrom}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (!isNaN(v) && v >= cfg.min) onChange({ rangeFrom: v });
          }}
          className="w-20 px-2 py-1 rounded border border-gray-200 text-sm text-center focus:border-red-300 focus:outline-none"
        />
        <span className="text-xs text-gray-400">至</span>
        <input
          type="number"
          min={cfg.min}
          max={cfg.max}
          value={state.rangeTo}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (!isNaN(v) && v <= cfg.max) onChange({ rangeTo: v });
          }}
          className="w-20 px-2 py-1 rounded border border-gray-200 text-sm text-center focus:border-red-300 focus:outline-none"
        />
      </div>
    );
  }

  if (state.mode === 'step') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">每隔</span>
        <input
          type="number"
          min={1}
          max={cfg.max - cfg.min || 1}
          value={state.stepValue}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (!isNaN(v) && v >= 1) onChange({ stepValue: v });
          }}
          className="w-20 px-2 py-1 rounded border border-gray-200 text-sm text-center focus:border-red-300 focus:outline-none"
        />
        <span className="text-xs text-gray-500">
          个{cfg.key === 'dow' ? '天' : cfg.label}
        </span>
      </div>
    );
  }

  if (state.mode === 'list') {
    if (isDow) {
      return (
        <div className="flex gap-1.5 flex-wrap">
          {DAY_VALUES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                const next = state.listValues.includes(v)
                  ? state.listValues.filter((x) => x !== v)
                  : [...state.listValues, v].sort((a, b) => a - b);
                onChange({ listValues: next });
              }}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                state.listValues.includes(v)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {DAY_NAMES[v]}
            </button>
          ))}
        </div>
      );
    }
    return (
      <input
        type="text"
        placeholder="例如 1,15,30"
        value={state.listValues.join(',')}
        onChange={(e) => {
          const vals = e.target.value
            .split(',')
            .map((s) => parseInt(s.trim()))
            .filter((n) => !isNaN(n) && n >= cfg.min && n <= cfg.max);
          onChange({ listValues: vals });
        }}
        className="w-full px-3 py-1.5 rounded border border-gray-200 text-sm focus:border-red-300 focus:outline-none"
      />
    );
  }

  // "every" mode — nothing extra
  return null;
}

// ================================================================
// Main page component
// ================================================================

export default function CrontabPage() {
  const [mode, setMode] = useState<'visual' | 'advanced'>('visual');
  const [fields, setFields] = useState<Record<string, FieldState>>(() => {
    const f: Record<string, FieldState> = {};
    for (const cfg of FIELD_CONFIGS) {
      f[cfg.key] = defaultFieldState(cfg.min, cfg.max);
    }
    return f;
  });
  const [advancedInput, setAdvancedInput] = useState('* * * * *');
  const [copied, setCopied] = useState(false);

  // ---- derived values ----

  const cronExpr = useMemo(() => {
    if (mode === 'visual') return buildCronExpr(fields);
    return advancedInput.trim() || '* * * * *';
  }, [mode, fields, advancedInput]);

  const isValid = useMemo(() => {
    return cronExpr.trim().split(/\s+/).length === 5;
  }, [cronExpr]);

  const description = useMemo(() => {
    if (!isValid) return '';
    return describeCron(cronExpr);
  }, [cronExpr, isValid]);

  const nextRuns = useMemo(() => {
    if (!isValid) return [];
    return getNextExecutions(cronExpr, 5);
  }, [cronExpr, isValid]);

  // ---- handlers ----

  const updateField = useCallback(
    (key: string, partial: Partial<FieldState>) => {
      setFields((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...partial },
      }));
    },
    []
  );

  const applyPreset = useCallback((expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return;
    const newFields: Record<string, FieldState> = {};
    FIELD_CONFIGS.forEach((cfg, i) => {
      newFields[cfg.key] = parseFieldToState(parts[i], cfg.min, cfg.max);
    });
    setFields(newFields);
    setMode('visual');
  }, []);

  const handleModeSwitch = useCallback(
    (m: 'visual' | 'advanced') => {
      if (m === 'advanced') {
        const expr =
          mode === 'visual' ? buildCronExpr(fields) : advancedInput;
        setAdvancedInput(expr);
      } else {
        // Parse advanced input back into field states
        const parts = advancedInput.trim().split(/\s+/);
        if (parts.length === 5) {
          const newFields: Record<string, FieldState> = {};
          FIELD_CONFIGS.forEach((cfg, i) => {
            newFields[cfg.key] = parseFieldToState(
              parts[i],
              cfg.min,
              cfg.max
            );
          });
          setFields(newFields);
        }
      }
      setMode(m);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, fields, advancedInput]
  );

  const copyExpr = useCallback(async () => {
    await navigator.clipboard.writeText(cronExpr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cronExpr]);

  // ---- render ----

  return (
    <div className="tool-container">
      <h1 className="tool-title">⏰ Crontab 表达式生成器</h1>
      <p className="tool-subtitle">
        免费在线Cron定时表达式生成器，可视化配置定时任务
      </p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {/* ---- Mode toggle ---- */}
        <div className="flex gap-2 justify-center">
          {(['visual', 'advanced'] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeSwitch(m)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === m
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {m === 'visual' ? '可视化模式' : '高级模式'}
            </button>
          ))}
        </div>

        {/* ---- Preset chips ---- */}
        <div>
          <p className="text-xs text-gray-400 mb-2 text-center">常用预设</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {PRESETS.map((p) => (
              <button
                key={p.expr}
                onClick={() => applyPreset(p.expr)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  cronExpr === p.expr
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Visual builder ---- */}
        {mode === 'visual' && (
          <div className="card space-y-3">
            {FIELD_CONFIGS.map((cfg) => {
              const state = fields[cfg.key];
              const fieldStr = fieldStateToString(state);

              return (
                <div key={cfg.key} className="space-y-1.5">
                  {/* Row: label + mode pills + preview */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 w-10 shrink-0">
                      {cfg.label}
                    </span>
                    <span className="text-[10px] text-gray-300 w-14 shrink-0">
                      {cfg.min}-{cfg.max}
                    </span>

                    <div className="flex gap-0.5 shrink-0">
                      {MODE_LABELS.map(({ mode: fm, label }) => (
                        <button
                          key={fm}
                          type="button"
                          onClick={() => updateField(cfg.key, { mode: fm })}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                            state.mode === fm
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <code className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono ml-auto shrink-0">
                      {fieldStr}
                    </code>
                  </div>

                  {/* Mode-specific inputs */}
                  <div className="pl-[72px]">
                    <FieldInputs
                      cfg={cfg}
                      state={state}
                      onChange={(update) => updateField(cfg.key, update)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---- Advanced text input ---- */}
        {mode === 'advanced' && (
          <div className="card space-y-3">
            <p className="text-sm text-gray-500">
              手动输入5位 Cron 表达式（分钟 小时 日 月 周）
            </p>
            <input
              type="text"
              value={advancedInput}
              onChange={(e) => setAdvancedInput(e.target.value)}
              placeholder="* * * * *"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none font-mono text-lg text-center tracking-wider"
            />
            <div className="text-center">
              <pre className="text-[10px] text-gray-400 font-mono leading-relaxed inline-block text-left">
                {'┌─ 分钟 (0-59)\n│ ┌─ 小时 (0-23)\n│ │ ┌─ 日   (1-31)\n│ │ │ ┌─ 月   (1-12)\n│ │ │ │ ┌─ 周   (0-6, 0=周日)\n│ │ │ │ │\n* * * * *'}
              </pre>
            </div>
          </div>
        )}

        {/* ---- Result: expression + description + copy ---- */}
        <div className="card animate-fade-in space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Cron 表达式</span>
              <button
                onClick={copyExpr}
                className="text-xs text-red-600 hover:text-red-700"
              >
                {copied ? '已复制' : '复制'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center font-mono text-lg text-gray-800 tracking-wider select-all">
              {cronExpr}
            </div>
          </div>

          {isValid && description && (
            <div>
              <span className="text-xs text-gray-400">含义</span>
              <p className="mt-1 text-sm text-gray-700 bg-red-50 rounded-lg px-3 py-2">
                {description}
              </p>
            </div>
          )}

          {!isValid && (
            <p className="text-sm text-red-500">
              请输入有效的5位Cron表达式（分 时 日 月 周）
            </p>
          )}
        </div>

        {/* ---- Next 5 execution times ---- */}
        {isValid && nextRuns.length > 0 && (
          <div className="card animate-fade-in">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              接下来的 {nextRuns.length} 次执行时间
            </h3>
            <div className="space-y-1.5">
              {nextRuns.map((date, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-700 flex items-center gap-2"
                >
                  <span className="text-xs text-red-400 font-medium w-5 shrink-0">
                    {i + 1}.
                  </span>
                  <span>{formatDateTime(date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isValid && nextRuns.length === 0 && (
          <div className="card text-center">
            <p className="text-sm text-gray-400">
              未找到接下来的执行时间（可能在较远的未来）
            </p>
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
