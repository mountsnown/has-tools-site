'use client';

import { useState, useRef, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';

const templates = [
  { name: '熊猫人', emoji: '🐼' },
  { name: '狗头', emoji: '🐶' },
  { name: '猫猫', emoji: '🐱' },
  { name: '哭泣', emoji: '😭' },
  { name: '震惊', emoji: '😱' },
  { name: '无语', emoji: '😅' },
  { name: '生气', emoji: '😤' },
  { name: '爱心', emoji: '❤️' },
];

export default function MemePage() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const generateMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const fontSize = Math.max(img.width / 15, 20);
      ctx.font = `bold ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 8;
      ctx.lineJoin = 'round';

      if (topText) {
        ctx.strokeText(topText, img.width / 2, fontSize * 1.2);
        ctx.fillText(topText, img.width / 2, fontSize * 1.2);
      }
      if (bottomText) {
        ctx.strokeText(bottomText, img.width / 2, img.height - fontSize * 0.4);
        ctx.fillText(bottomText, img.width / 2, img.height - fontSize * 0.4);
      }
    };
    img.src = image;
  }, [image, topText, bottomText]);

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="tool-container">
      <h1 className="tool-title">😂 表情包生成器</h1>
      <p className="tool-subtitle">上传图片，添加文字，制作你的专属表情包</p>
      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card space-y-4">
          <div
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-red-300 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {image ? (
              <img src={image} alt="meme" className="max-h-48 mx-auto rounded-lg" />
            ) : (
              <>
                <p className="text-4xl mb-3">📸</p>
                <p className="text-gray-500">点击上传图片</p>
              </>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="上方文字（可选）"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all"
            />
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="下方文字（可选）"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all"
            />
          </div>

          <button onClick={generateMeme} disabled={!image} className="btn-primary w-full">
            🎨 生成表情包
          </button>

          <canvas ref={canvasRef} className="hidden" />

          {image && (
            <button onClick={downloadMeme} className="btn-secondary w-full">
              💾 下载表情包
            </button>
          )}
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
