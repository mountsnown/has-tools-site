#!/usr/bin/env node

/**
 * 自动拉取百度统计最近 N 天的 PV/UV/IP 数据
 *
 * 首次使用前需要获取 refresh_token（只需做一次，脚本会自动保存）：
 *   1. 打开 https://developer.baidu.com/ → 创建应用 → 获取 API Key / Secret Key
 *   2. 将 API_KEY 和 SECRET_KEY 填入下方配置
 *   3. 配置你的百度统计 site_id（在 百度统计 → 管理 → 网站列表中查看）
 *   4. 运行 node scripts/stats.mjs login → 浏览器授权 → 自动保存 refresh_token
 *
 * 日常使用：
 *   node scripts/stats.mjs           # 最近 10 天
 *   node scripts/stats.mjs 30        # 最近 30 天
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// ── 配置 ───────────────────────────────────────────
const CONFIG = {
  apiKey: "请替换为你的API Key",
  secretKey: "请替换为你的Secret Key",
  siteId: "请替换为你的百度统计site_id（纯数字）",
};

const DAYS = parseInt(process.argv[2] || "10", 10);
const TOKEN_FILE = join(import.meta.dirname, ".baidu_token.json");

// ── Token 管理 ──────────────────────────────────────

async function getAccessToken() {
  if (process.argv[2] === "login") {
    return await doOAuthLogin();
  }

  if (existsSync(TOKEN_FILE)) {
    const saved = JSON.parse(readFileSync(TOKEN_FILE, "utf-8"));
    // 提前 1 天刷新避免边缘失败
    if (Date.now() < saved.expires_at - 86400000) {
      return saved.access_token;
    }
    return await refreshToken(saved.refresh_token);
  }

  console.error("❌ 未找到保存的 token，请先运行: node scripts/stats.mjs login");
  process.exit(1);
}

async function doOAuthLogin() {
  const authUrl =
    `https://openapi.baidu.com/oauth/2.0/authorize` +
    `?response_type=code` +
    `&client_id=${CONFIG.apiKey}` +
    `&redirect_uri=oob` +
    `&scope=basic` +
    `&display=page`;

  console.log("📋 请用浏览器打开以下链接并授权：");
  console.log(`\n  ${authUrl}\n`);
  console.log("授权后会得到一个授权码（code），请输入：");

  const code = await promptInput("授权码: ");
  const token = await exchangeCodeForToken(code);
  saveToken(token);
  console.log("✅ Token 已保存，可以开始拉取数据了！\n");

  // 立即拉一次数据
  return token.access_token;
}

async function exchangeCodeForToken(code) {
  const res = await fetch("https://openapi.baidu.com/oauth/2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CONFIG.apiKey,
      client_secret: CONFIG.secretKey,
      redirect_uri: "oob",
    }),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`换取 token 失败: ${data.error_description || data.error}`);
  }
  return data;
}

async function refreshToken(refreshToken) {
  console.log("🔄 正在刷新 access_token...");
  const res = await fetch("https://openapi.baidu.com/oauth/2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CONFIG.apiKey,
      client_secret: CONFIG.secretKey,
    }),
  });
  const data = await res.json();
  if (data.error) {
    console.error("❌ 刷新 token 失败，请重新登录: node scripts/stats.mjs login");
    process.exit(1);
  }
  saveToken(data);
  return data.access_token;
}

function saveToken(data) {
  writeFileSync(
    TOKEN_FILE,
    JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (data.expires_in || 2592000) * 1000,
    }),
    "utf-8"
  );
}

// ── 数据拉取 ────────────────────────────────────────

async function fetchStats(accessToken) {
  const endDate = formatDate(new Date());
  const startDate = formatDate(
    new Date(Date.now() - (DAYS - 1) * 86400000)
  );

  console.log(`📊 拉取 ${startDate} ~ ${endDate} 的统计数据...\n`);

  const res = await fetch(
    "https://openapi.baidu.com/rest/2.0/tongji/report/getData",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: accessToken,
        site_id: CONFIG.siteId,
        method: "overview/getTimeTrendRpt",
        start_date: startDate,
        end_date: endDate,
        metrics: "pv_count,visitor_count,ip_count,average_stay_time,bounce_ratio",
        gran: "day",
      }),
    }
  );

  const result = await res.json();
  if (result.error_code && result.error_code !== 0) {
    throw new Error(`API 错误: ${result.message} (code: ${result.error_code})`);
  }
  return result;
}

function printReport(data) {
  const items = data.result?.items || [];
  if (items.length === 0) {
    console.log("⚠️ 没有数据返回，请确认 site_id 是否正确");
    return;
  }

  // items[0] = 日期数组, items[1] = PV, items[2] = UV, items[3] = IP, items[4] = 平均停留, items[5] = 跳出率
  const [dates, pvs, uvs, ips, stays, bounces] = items;

  let totalPv = 0, totalUv = 0;

  console.log("┌────────────┬──────────┬──────────┬──────────┬──────────┬──────────┐");
  console.log("│    日期    │    PV    │    UV    │    IP    │ 平均停留 │  跳出率  │");
  console.log("├────────────┼──────────┼──────────┼──────────┼──────────┼──────────┤");

  for (let i = 0; i < dates.length; i++) {
    const pv = parseInt(pvs[i] || "0", 10);
    const uv = parseInt(uvs[i] || "0", 10);
    totalPv += pv;
    totalUv += uv;
    const dateStr = dates[i].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
    const stay = stays[i] ? `${Math.round(parseInt(stays[i], 10) / 60)}m` : "-";
    const bounce = bounces[i] ? `${parseFloat(bounces[i]).toFixed(1)}%` : "-";
    console.log(
      `│ ${dateStr} │ ${pad(pv, 8)} │ ${pad(uv, 8)} │ ${pad(ips[i] || "0", 8)} │ ${pad(stay, 8)} │ ${pad(bounce, 8)} │`
    );
  }

  console.log("├────────────┼──────────┼──────────┼──────────┼──────────┼──────────┤");
  console.log(
    `│ ${DAYS}天合计   │ ${pad(totalPv, 8)} │ ${pad(totalUv, 8)} │          │          │          │`
  );
  console.log("└────────────┴──────────┴──────────┴──────────┴──────────┴──────────┘");
  console.log();
  console.log(`📈 日均 PV: ${Math.round(totalPv / DAYS)}  |  日均 UV: ${Math.round(totalUv / DAYS)}`);
}

// ── 辅助 ────────────────────────────────────────────

function formatDate(d) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function pad(v, w) {
  return String(v).padStart(w);
}

function promptInput(hint) {
  return new Promise((resolve) => {
    process.stdout.write(hint + " ");
    process.stdin.once("data", (d) => resolve(d.toString().trim()));
  });
}

// ── 主流程 ──────────────────────────────────────────

(async () => {
  try {
    const accessToken = await getAccessToken();
    const data = await fetchStats(accessToken);
    printReport(data);
  } catch (err) {
    console.error("❌", err.message);
    process.exit(1);
  }
})();
