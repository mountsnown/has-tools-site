'use client';

import { useState, useRef, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';

export default function ImageCompressPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [compressing, setCompressing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      alert('仅支持 JPEG、PNG、WebP 格式的图片');
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedUrl('');
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const compress = useCallback(() => {
    if (!originalFile) return;
    setCompressing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setCompressedSize(blob.size);
          }
          setCompressing(false);
        },
        originalFile.type || 'image/jpeg',
        quality / 100
      );
    };
    img.src = originalUrl;
  }, [originalFile, originalUrl, quality]);

  const downloadCompressed = () => {
    if (!compressedUrl || !originalFile) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    const ext = originalFile.name.split('.').pop();
    a.download = originalFile.name.replace(`.${ext}`, `_compressed.${ext}`);
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const reduction = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <div className="tool-container">
      <h1 className="tool-title">🖼️ 图片压缩工具</h1>
      <p className="tool-subtitle">免费在线压缩图片，减小体积不失真</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        <div className="card">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {originalUrl ? (
              <img src={originalUrl} alt="原图" className="max-h-48 mx-auto rounded-lg" />
            ) : (
              <>
                <p className="text-4xl mb-3">📁</p>
                <p className="text-gray-500 font-medium">点击或拖拽图片到此处</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPEG / PNG / WebP</p>
              </>
            )}
          </div>

          {originalFile && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  压缩质量: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <button
                onClick={compress}
                disabled={compressing}
                className="btn-primary w-full mt-4"
              >
                {compressing ? '⏳ 压缩中...' : '🗜️ 开始压缩'}
              </button>
            </>
          )}
        </div>

        {(originalFile || compressedUrl) && (
          <div className="card animate-fade-in">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">原始大小</p>
                <p className="font-bold text-gray-700">{formatSize(originalSize)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">压缩后</p>
                <p className="font-bold text-green-600">
                  {compressedSize ? formatSize(compressedSize) : '—'}
                </p>
              </div>
            </div>
            {compressedUrl && (
              <>
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                    🎉 减小了 {reduction}%
                  </span>
                </div>
                {compressedUrl && (
                  <div className="mt-3">
                    <img src={compressedUrl} alt="压缩后" className="max-h-48 mx-auto rounded-lg" />
                  </div>
                )}
                <button onClick={downloadCompressed} className="btn-primary w-full mt-4">
                  💾 下载压缩后的图片
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
