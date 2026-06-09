'use client';

import { useState, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

interface IPInfo {
  ip: string;
  type: string;
  country?: string;
  city?: string;
  org?: string;
  timezone?: string;
  loading: boolean;
  error: string;
}

export default function IPLookupPage() {
  const [info, setInfo] = useState<IPInfo>({ ip: '', type: '', loading: true, error: '' });

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    setInfo({ ip: '', type: '', loading: true, error: '' });
    try {
      // 先获取 IPv4
      const v4Res = await fetch('https://api.ipify.org?format=json');
      const v4Data = await v4Res.json();
      const ip = v4Data.ip;

      // 获取IP详细信息 (ipapi.co 免费额度 1000次/天)
      let details = {};
      try {
        const infoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        if (infoRes.ok) details = await infoRes.json();
      } catch {
        // 忽略详细信息获取失败
      }

      setInfo({
        ip,
        type: ip.includes(':') ? 'IPv6' : 'IPv4',
        country: (details as Record<string, string>).country_name,
        city: (details as Record<string, string>).city,
        org: (details as Record<string, string>).org,
        timezone: (details as Record<string, string>).timezone,
        loading: false,
        error: '',
      });
    } catch {
      setInfo({ ip: '', type: '', loading: false, error: '获取IP信息失败，请检查网络连接后重试' });
    }
  };

  const copyIP = () => navigator.clipboard.writeText(info.ip);

  return (
    <div className="tool-container">
      <h1 className="tool-title">🌐 IP 地址查询</h1>
      <p className="tool-subtitle">查询你的公网IP地址和基本信息</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {info.loading ? (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4 animate-pulse">🔍</div>
            <p className="text-gray-400">正在查询你的IP地址...</p>
          </div>
        ) : info.error ? (
          <div className="card text-center py-12">
            <p className="text-red-500 mb-4">{info.error}</p>
            <button onClick={fetchIP} className="btn-primary">🔄 重新查询</button>
          </div>
        ) : (
          <>
            {/* IP 地址卡片 */}
            <div className="card text-center animate-fade-in">
              <p className="text-sm text-gray-400 mb-2">你的公网IP地址</p>
              <p className="text-4xl font-mono font-bold text-red-600 mb-2 select-all">{info.ip}</p>
              <button onClick={copyIP} className="text-xs text-red-600 hover:text-red-700 mb-4">📋 复制IP</button>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {info.type && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">IP类型</p>
                    <p className="font-bold text-gray-700">{info.type}</p>
                  </div>
                )}
                {info.country && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">所在国家</p>
                    <p className="font-bold text-gray-700">{info.country}</p>
                  </div>
                )}
                {info.city && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">城市</p>
                    <p className="font-bold text-gray-700">{info.city}</p>
                  </div>
                )}
                {info.org && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">运营商</p>
                    <p className="font-bold text-gray-700">{info.org}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={fetchIP} className="btn-secondary text-sm">🔄 刷新查询</button>
            </div>
          </>
        )}

        <div className="card text-xs text-gray-400 space-y-1">
          <p>💡 IP 地址是你在互联网上的唯一标识，本工具显示的是你的公网出口IP。</p>
          <p>📝 数据由 ipapi.co 提供，每天可免费查询 1000 次。</p>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
