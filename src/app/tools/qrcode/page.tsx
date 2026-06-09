'use client';

import { useState, useRef, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';

export default function QRCodePage() {
  const [text, setText] = useState('');
  const [qrData, setQrData] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(() => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text.trim());
    setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`);
  }, [text, size, fgColor, bgColor]);

  const downloadQR = () => {
    if (!qrData) return;
    const link = document.createElement('a');
    link.href = qrData;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">📱 二维码生成器</h1>
      <p className="tool-subtitle">免费在线生成二维码，支持自定义颜色</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入网址或文本内容
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://has88888888.com"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">前景色</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">背景色</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">{bgColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                尺寸: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            <button onClick={generateQR} className="btn-primary w-full">
              生成二维码
            </button>
          </div>
        </div>

        {qrData && (
          <div className="card text-center animate-fade-in">
            <div className="bg-gray-50 rounded-xl p-6 inline-block mb-4">
              <img src={qrData} alt="QR Code" className="max-w-full" />
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={downloadQR} className="btn-primary">
                💾 下载二维码
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              使用 QR Server API 生成，建议测试后使用
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
