'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import AdBanner from '@/components/AdBanner';

interface Frame {
  id: string;
  url: string;
  name: string;
  width: number;
  height: number;
}

let frameIdCounter = 0;

function formatSize(kb: number): string {
  if (kb < 1) return '< 1 KB';
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function GifMakerPage() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [delay, setDelay] = useState(500);
  const [customWidth, setCustomWidth] = useState(400);
  const [useOriginalSize, setUseOriginalSize] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gifUrl, setGifUrl] = useState('');
  const [gifSize, setGifSize] = useState(0);
  const [gifLibLoaded, setGifLibLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [dragFromIdx, setDragFromIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [generatingProgress, setGeneratingProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<number>(0);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const urlsRef = useRef<Set<string>>(new Set());
  const framesRef = useRef<Frame[]>([]);
  const dimsRef = useRef({
    useOriginalSize: true,
    maxW: 400,
    maxH: 300,
    customWidth: 400,
  });

  // Keep refs in sync
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  const maxW = frames.length > 0 ? Math.max(...frames.map((f) => f.width)) : 400;
  const maxH = frames.length > 0 ? Math.max(...frames.map((f) => f.height)) : 300;
  const outputWidth = useOriginalSize ? Math.min(maxW, 800) : customWidth;
  const outputHeight = Math.round(outputWidth * (maxH / (maxW || 1)));

  useEffect(() => {
    dimsRef.current = { useOriginalSize, maxW, maxH, customWidth };
  }, [useOriginalSize, maxW, maxH, customWidth]);

  // Load GIF library from CDN
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).GIF) {
      setGifLibLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/gif.js.optimized@2.0.1/dist/gif.umd.js';
    script.onload = () => setGifLibLoaded(true);
    document.head.appendChild(script);
    return () => {
      const el = document.head.querySelector(
        `script[src="${script.src}"]`,
      );
      if (el) el.remove();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Estimate file size
  const estimatedSizeKb =
    frames.length > 0
      ? (outputWidth * outputHeight * frames.length * 0.35) / 1024
      : 0;

  // --- Upload handling ---

  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const imageFiles = Array.from(fileList).filter((f) =>
      f.type.match(/image\/(png|jpeg|webp)/),
    );
    if (imageFiles.length === 0 && fileList.length > 0) {
      alert('仅支持 PNG、JPG、WebP 格式的图片');
      return;
    }

    for (const file of imageFiles) {
      const url = URL.createObjectURL(file);
      urlsRef.current.add(url);

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`加载失败: ${file.name}`));
        image.src = url;
      });

      const id = `f${++frameIdCounter}`;
      imagesRef.current.set(id, img);
      setFrames((prev) => [
        ...prev,
        { id, url, name: file.name, width: img.width, height: img.height },
      ]);

      setCustomWidth((prev) => Math.max(prev, Math.min(img.width, 800)));
    }
  }, []);

  const onUploadDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onUploadDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onUploadDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles],
  );

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
        e.target.value = '';
      }
    },
    [processFiles],
  );

  // --- Frame management ---

  const removeFrame = useCallback((index: number) => {
    setFrames((prev) => {
      const frame = prev[index];
      imagesRef.current.delete(frame.id);
      setTimeout(() => {
        URL.revokeObjectURL(frame.url);
        urlsRef.current.delete(frame.url);
      }, 100);
      return prev.filter((_, i) => i !== index);
    });
    setGifUrl('');
    if (isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = 0;
      }
      setIsPlaying(false);
    }
  }, []);

  const moveFrame = useCallback((index: number, dir: -1 | 1) => {
    const newIdx = index + dir;
    if (newIdx < 0) return;
    setFrames((prev) => {
      if (newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[index], arr[newIdx]] = [arr[newIdx], arr[index]];
      return arr;
    });
    setGifUrl('');
  }, []);

  const clearAll = useCallback(() => {
    imagesRef.current.clear();
    setFrames([]);
    setGifUrl('');
    setIsPlaying(false);
    setPreviewIdx(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = 0;
    }
  }, []);

  // --- Drag-to-reorder ---

  const onFrameDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDragFromIdx(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    },
    [],
  );

  const onFrameDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIdx(index);
    },
    [],
  );

  const onFrameDragLeave = useCallback(() => {
    setDragOverIdx(null);
  }, []);

  const onFrameDrop = useCallback(
    (e: React.DragEvent, dropIdx: number) => {
      e.preventDefault();
      setDragOverIdx(null);
      if (dragFromIdx === null || dragFromIdx === dropIdx) {
        setDragFromIdx(null);
        return;
      }
      setFrames((prev) => {
        const arr = [...prev];
        const [item] = arr.splice(dragFromIdx, 1);
        arr.splice(dropIdx, 0, item);
        return arr;
      });
      setDragFromIdx(null);
      setGifUrl('');
    },
    [dragFromIdx],
  );

  const onFrameDragEnd = useCallback(() => {
    setDragFromIdx(null);
    setDragOverIdx(null);
  }, []);

  // --- Canvas drawing helper (reads from refs for safety in intervals) ---

  const drawFrameToCanvas = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement, w: number, h: number) => {
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      const scale = Math.min(w / img.width, h / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    },
    [],
  );

  const drawPreviewFrame = useCallback(
    (idx: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const fs = framesRef.current;
      if (fs.length === 0) return;
      const i = ((idx % fs.length) + fs.length) % fs.length;
      const frame = fs[i];
      const img = imagesRef.current.get(frame.id);
      if (!img) return;

      const d = dimsRef.current;
      const w = d.useOriginalSize ? Math.min(d.maxW, 800) : d.customWidth;
      const h = Math.round(w * (d.maxH / (d.maxW || 1)));

      drawFrameToCanvas(canvas, img, w, h);
    },
    [drawFrameToCanvas],
  );

  // Draw first frame when frames change and not playing
  useEffect(() => {
    if (frames.length > 0 && !isPlaying) {
      drawPreviewFrame(0);
      setPreviewIdx(0);
    }
  }, [frames.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Redraw on dimension changes
  useEffect(() => {
    if (!isPlaying && frames.length > 0) {
      drawPreviewFrame(previewIdx);
    }
  }, [outputWidth, outputHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Preview playback ---

  const togglePlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = 0;
      setIsPlaying(false);
      return;
    }
    if (frames.length === 0) return;

    setIsPlaying(true);
    let idx = 0;
    setPreviewIdx(0);
    drawPreviewFrame(0);

    timerRef.current = window.setInterval(() => {
      const len = framesRef.current.length;
      if (len === 0) {
        clearInterval(timerRef.current!);
        timerRef.current = 0;
        setIsPlaying(false);
        return;
      }
      idx = (idx + 1) % len;
      setPreviewIdx(idx);
      drawPreviewFrame(idx);
    }, delay);
  }, [frames.length, delay, drawPreviewFrame]);

  // Stop playback if all frames removed
  useEffect(() => {
    if (frames.length === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = 0;
      setIsPlaying(false);
    }
  }, [frames.length]);

  // --- GIF Generation ---

  const generateGif = useCallback(() => {
    if (frames.length === 0 || !gifLibLoaded) return;
    setIsGenerating(true);
    setGeneratingProgress(0);

    const currentFrames = [...frames];
    const d = dimsRef.current;
    const w = d.useOriginalSize ? Math.min(d.maxW, 800) : d.customWidth;
    const h = Math.round(w * (d.maxH / (d.maxW || 1)));

    const GIF = (window as any).GIF;
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: w,
      height: h,
      workerScript:
        'https://cdn.jsdelivr.net/npm/gif.js.optimized@2.0.1/dist/gif.worker.js',
    });

    for (const frame of currentFrames) {
      const img = imagesRef.current.get(frame.id);
      if (!img) continue;

      const canvas = document.createElement('canvas');
      drawFrameToCanvas(canvas, img, w, h);
      gif.addFrame(canvas, { delay, copy: true });
    }

    gif.on('progress', (p: number) => {
      setGeneratingProgress(Math.round(p * 100));
    });

    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setGifSize(blob.size);
      setIsGenerating(false);
    });

    gif.render();
  }, [frames, gifLibLoaded, delay, drawFrameToCanvas]);

  const downloadGif = useCallback(() => {
    if (!gifUrl) return;
    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = 'animated.gif';
    a.click();
  }, [gifUrl]);

  // --- Render ---

  return (
    <div className="tool-container">
      <h1 className="tool-title">GIF 制作器</h1>
      <p className="tool-subtitle">
        免费在线GIF动图制作工具，多张图片合成动态GIF
      </p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {/* Upload Area */}
        <div className="card">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 hover:border-red-300'
            }`}
            onDragOver={onUploadDragOver}
            onDragLeave={onUploadDragLeave}
            onDrop={onUploadDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={onFileInputChange}
            />
            <p className="text-4xl mb-3">🎞️</p>
            <p className="text-gray-500 font-medium">
              点击或拖拽图片到此处
            </p>
            <p className="text-xs text-gray-400 mt-1">支持 PNG / JPG / WebP，可多选</p>
            {frames.length > 0 && (
              <p className="text-sm text-red-500 mt-2">
                已添加 {frames.length} 帧，点击继续添加
              </p>
            )}
          </div>
        </div>

        {/* Frame List */}
        {frames.length > 0 && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">
                帧列表 ({frames.length} 帧)
              </h3>
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                清空全部
              </button>
            </div>

            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {frames.map((frame, i) => {
                const isDragOver = dragOverIdx === i;
                const isDragging = dragFromIdx === i;
                return (
                  <div
                    key={frame.id}
                    draggable
                    onDragStart={(e) => onFrameDragStart(e, i)}
                    onDragOver={(e) => onFrameDragOver(e, i)}
                    onDragLeave={onFrameDragLeave}
                    onDrop={(e) => onFrameDrop(e, i)}
                    onDragEnd={onFrameDragEnd}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all select-none ${
                      isDragOver
                        ? 'border-red-300 bg-red-50'
                        : isDragging
                          ? 'border-gray-200 opacity-50'
                          : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {/* Drag handle */}
                    <span className="text-gray-300 cursor-grab text-sm shrink-0">
                      ⠿
                    </span>

                    {/* Frame number */}
                    <span className="text-xs text-gray-400 w-6 text-center shrink-0 font-mono">
                      {i + 1}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      <img
                        src={frame.url}
                        alt={frame.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* File name */}
                    <span className="flex-1 text-sm text-gray-600 truncate min-w-0">
                      {frame.name}
                    </span>

                    {/* Move up */}
                    <button
                      onClick={() => moveFrame(i, -1)}
                      disabled={i === 0}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors shrink-0"
                      title="上移"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>

                    {/* Move down */}
                    <button
                      onClick={() => moveFrame(i, 1)}
                      disabled={i === frames.length - 1}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors shrink-0"
                      title="下移"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => removeFrame(i)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                      title="删除"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings */}
        {frames.length > 0 && (
          <div className="card animate-fade-in space-y-5">
            <h3 className="font-semibold text-gray-700">动画设置</h3>

            {/* Frame delay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                帧延迟: {delay} ms
                <span className="text-xs text-gray-400 ml-1">
                  ({(delay / 1000).toFixed(2)}s)
                </span>
              </label>
              <input
                type="range"
                min={50}
                max={3000}
                step={50}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>快 (50ms)</span>
                <span>慢 (3000ms)</span>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                输出尺寸
              </label>
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setUseOriginalSize(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    useOriginalSize
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  原始尺寸
                </button>
                <button
                  onClick={() => setUseOriginalSize(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !useOriginalSize
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  自定义宽度
                </button>
              </div>
              {!useOriginalSize && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={100}
                    max={1200}
                    step={10}
                    value={customWidth}
                    onChange={(e) =>
                      setCustomWidth(
                        Math.min(1200, Math.max(100, Number(e.target.value) || 100)),
                      )
                    }
                    className="w-28 px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-red-300 focus:outline-none transition-all text-center text-sm"
                  />
                  <span className="text-sm text-gray-400">px 宽度</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">帧数</p>
                <p className="font-bold text-gray-700">{frames.length}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">输出尺寸</p>
                <p className="font-bold text-gray-700">
                  {outputWidth} x {outputHeight}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">预估大小</p>
                <p className="font-bold text-gray-700">
                  ~{formatSize(estimatedSizeKb)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        {frames.length > 0 && (
          <div className="card animate-fade-in">
            <h3 className="font-semibold text-gray-700 mb-3">动画预览</h3>

            <div className="bg-gray-50 rounded-xl p-2 flex items-center justify-center min-h-[120px]">
              <canvas
                ref={previewCanvasRef}
                className="max-w-full rounded-lg"
                style={{
                  maxHeight: '320px',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={togglePlay}
                className="btn-secondary flex-1"
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    停止预览
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    播放预览
                  </>
                )}
              </button>
              {frames.length > 1 && (
                <span className="text-xs text-gray-400">
                  {isPlaying
                    ? `当前帧: ${previewIdx + 1} / ${frames.length}`
                    : `共 ${frames.length} 帧`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Generate + Download */}
        {frames.length >= 1 && (
          <div className="card animate-fade-in space-y-3">
            {!gifLibLoaded && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 text-center">
                正在加载 GIF 编码库...
              </p>
            )}

            <button
              onClick={generateGif}
              disabled={isGenerating || !gifLibLoaded}
              className="btn-primary w-full"
            >
              {isGenerating ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  生成中{generatingProgress > 0 ? ` ${generatingProgress}%` : '...'}
                </span>
              ) : (
                <>生成 GIF</>
              )}
            </button>

            {!gifLibLoaded && (
              <p className="text-xs text-gray-400 text-center">
                GIF 编码库从 CDN 加载，请稍候...
              </p>
            )}

            {gifUrl && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <img
                    src={gifUrl}
                    alt="生成的 GIF"
                    className="max-w-full mx-auto rounded-lg"
                    style={{ maxHeight: '300px' }}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    文件大小: {formatSize(gifSize / 1024)}
                  </p>
                </div>

                <button onClick={downloadGif} className="btn-primary w-full">
                  下载 GIF
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
