'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

type Tab = 'upload' | 'camera';

export default function QRDecodePage() {
  const [tab, setTab] = useState<Tab>('upload');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<{ content: string; isUrl: boolean } | null>(null);
  const [status, setStatus] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [jsQrReady, setJsQrReady] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [cameraLoading, setCameraLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const jsQrRef = useRef<any>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).jsQR !== 'undefined') {
        jsQrRef.current = (window as any).jsQR;
        setJsQrReady(true);
      }
    };
    script.onerror = () => setStatus('二维码解码库加载失败，请刷新页面重试');
    document.body.appendChild(script);
    return () => { stopCamera(); if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const stopCamera = useCallback(() => {
    if (scanIntervalRef.current) { clearInterval(scanIntervalRef.current); scanIntervalRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setCameraActive(false);
  }, []);

  const decodeImage = useCallback((file: File) => {
    if (!jsQrReady || !jsQrRef.current) { setStatus('解码库尚未加载完成，请稍候'); return; }
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
      setStatus('不支持的图片格式，请上传 PNG、JPG、WebP 或 GIF'); return;
    }
    if (file.size > 10 * 1024 * 1024) { setStatus('图片大小不能超过 10MB'); return; }

    setIsDecoding(true);
    setResult(null);
    setStatus('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageSrc(dataUrl);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) { setStatus('画布初始化失败'); setIsDecoding(false); return; }
        let w = img.naturalWidth, h = img.naturalHeight;
        const maxDim = 1024;
        if (w > maxDim || h > maxDim) { const r = Math.min(maxDim / w, maxDim / h); w = Math.round(w * r); h = Math.round(h * r); }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { setStatus('画布上下文获取失败'); setIsDecoding(false); return; }
        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const qrResult = jsQrRef.current(imageData.data, w, h);
        if (qrResult?.data) {
          const content = qrResult.data.trim();
          setResult({ content, isUrl: /^https?:\/\//i.test(content) });
        } else {
          setStatus('未检测到二维码，请确认图片中包含清晰的二维码');
        }
        setIsDecoding(false);
      };
      img.onerror = () => { setStatus('图片加载失败，请重试'); setIsDecoding(false); };
      img.src = dataUrl;
    };
    reader.onerror = () => { setStatus('文件读取失败'); setIsDecoding(false); };
    reader.readAsDataURL(file);
  }, [jsQrReady]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files[0]) decodeImage(e.dataTransfer.files[0]);
  }, [decodeImage]);

  const startCamera = useCallback(async () => {
    if (!jsQrReady) { setCameraError('解码库尚未加载完成，请稍候'); return; }
    setCameraLoading(true); setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setCameraActive(true); setCameraLoading(false);
      scanIntervalRef.current = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState < 2) return;
        const vw = video.videoWidth, vh = video.videoHeight;
        if (vw === 0 || vh === 0) return;
        const sw = Math.min(vw, 640), sh = Math.round((vh / vw) * sw);
        canvas.width = sw; canvas.height = sh;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, sw, sh);
        const imageData = ctx.getImageData(0, 0, sw, sh);
        const qrResult = jsQrRef.current(imageData.data, sw, sh);
        if (qrResult?.data) {
          const content = qrResult.data.trim();
          setResult({ content, isUrl: /^https?:\/\//i.test(content) });
          stopCamera();
        }
      }, 400);
    } catch (err: any) {
      setCameraLoading(false);
      if (err.name === 'NotAllowedError') setCameraError('摄像头权限被拒绝，请在浏览器设置中允许访问摄像头');
      else if (err.name === 'NotFoundError') setCameraError('未检测到摄像头设备');
      else if (err.name === 'NotReadableError') setCameraError('摄像头被其他应用占用，请关闭后重试');
      else setCameraError(`摄像头启动失败: ${err.message || '未知错误'}`);
    }
  }, [jsQrReady, stopCamera]);

  const reset = () => { setResult(null); setStatus(''); setImageSrc(null); };

  return (
    <div className="tool-container">
      <h1 className="tool-title">📷 二维码解码器</h1>
      <p className="tool-subtitle">免费在线二维码解码，上传图片或使用摄像头扫描，纯浏览器端处理</p>
      <AdBanner className="mb-8" />
      <div className="max-w-lg mx-auto space-y-4">
        <div className="card">
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            {(['upload', 'camera'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); if (t === 'camera') reset(); else stopCamera(); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t === 'upload' ? '📁 上传图片' : '📸 摄像头扫描'}
              </button>
            ))}
          </div>

          {tab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragging ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'}`}
              >
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => e.target.files?.[0] && decodeImage(e.target.files[0])} className="hidden" />
                <div className="text-4xl mb-3 opacity-60">{isDragging ? '📥' : '📁'}</div>
                <p className="text-gray-600 font-medium mb-1">{isDragging ? '松开文件开始识别' : '拖拽二维码图片到这里，或点击选择'}</p>
                <p className="text-xs text-gray-400">支持 PNG、JPG、WebP、GIF，最大 10MB</p>
              </div>

              {imageSrc && (
                <div className="bg-gray-50 rounded-xl p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">已上传图片</span>
                    <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500">清除</button>
                  </div>
                  <div className="flex justify-center">
                    <img src={imageSrc} alt="Uploaded" className="max-h-64 rounded-lg object-contain" />
                  </div>
                </div>
              )}

              {isDecoding && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    正在识别二维码...
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'camera' && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3]">
                {!cameraActive && !cameraLoading && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-5xl mb-3 opacity-50">📷</div>
                    <p className="text-sm opacity-60">点击下方按钮启动摄像头</p>
                  </div>
                )}
                {cameraLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <svg className="animate-spin h-8 w-8 mb-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-sm opacity-60">正在启动摄像头...</p>
                  </div>
                )}
                {cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <div className="text-4xl mb-3">⚠️</div>
                    <p className="text-sm opacity-80">{cameraError}</p>
                    <button onClick={() => { setCameraError(''); startCamera(); }} className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm">重试</button>
                  </div>
                )}
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
                {cameraActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-[15%] border-2 border-red-500/60 rounded-2xl">
                      <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-xl" />
                      <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-xl" />
                      <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-xl" />
                      <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-xl" />
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <span className="text-xs text-white/70 bg-black/40 rounded-full px-4 py-1.5">将二维码对准框内自动识别</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 justify-center">
                {!cameraActive ? (
                  <button onClick={startCamera} disabled={cameraLoading} className="btn-primary">启动摄像头</button>
                ) : (
                  <button onClick={stopCamera} className="btn-secondary">停止扫描</button>
                )}
              </div>
            </div>
          )}

          {status && (
            <div className={`mt-4 text-sm text-center py-3 rounded-xl animate-fade-in ${status.includes('失败') || status.includes('不支持') || status.includes('不能') ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
              {status}
            </div>
          )}
        </div>

        {result && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">解码结果</h3>
              <button
                onClick={async () => { try { await navigator.clipboard.writeText(result.content); setStatus('已复制到剪贴板'); } catch { setStatus('复制失败，请手动复制'); } }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                📋 复制
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 break-all">
              {result.isUrl ? (
                <a href={result.content} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 underline font-medium">{result.content}</a>
              ) : (
                <p className="text-gray-800 text-sm font-medium">{result.content}</p>
              )}
            </div>
            {result.isUrl && <p className="mt-3 text-xs text-gray-400 text-center">检测到链接，点击可直接打开</p>}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <AdBanner className="mt-8" />
    </div>
  );
}
