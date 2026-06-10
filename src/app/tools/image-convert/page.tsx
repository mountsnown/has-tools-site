'use client';

import { useState, useRef, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface FileItem {
  file: File;
  id: string;
  originalUrl: string;
  convertedUrl: string;
  convertedBlob: Blob | null;
  convertedSize: number;
  status: 'idle' | 'converting' | 'done' | 'error';
  errorMsg: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFormatLabel(mime: OutputFormat): string {
  switch (mime) {
    case 'image/png': return 'PNG';
    case 'image/jpeg': return 'JPG';
    case 'image/webp': return 'WebP';
  }
}

function getFileExtension(mime: OutputFormat): string {
  switch (mime) {
    case 'image/png': return 'png';
    case 'image/jpeg': return 'jpg';
    case 'image/webp': return 'webp';
  }
}

export default function ImageConvertPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState(0.92);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const items: FileItem[] = [];
    for (const f of newFiles) {
      if (!f.type.match(/image\/(jpeg|png|webp)/)) {
        continue;
      }
      items.push({
        file: f,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        originalUrl: URL.createObjectURL(f),
        convertedUrl: '',
        convertedBlob: null,
        convertedSize: 0,
        status: 'idle',
        errorMsg: '',
      });
    }
    if (items.length === 0) {
      alert('仅支持 JPEG、PNG、WebP 格式的图片');
      return;
    }
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) {
        URL.revokeObjectURL(item.originalUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setFiles([]);
  }, [files]);

  const convertFile = useCallback(
    (item: FileItem) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: 'converting' as const } : f))
      );

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, status: 'error' as const, errorMsg: '无法创建 Canvas 上下文' }
                : f
            )
          );
          return;
        }
        ctx.drawImage(img, 0, 0);

        // Handle transparency when converting to JPEG (fill white background)
        if (outputFormat === 'image/jpeg') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const hasAlpha = imageData.data.some(
            (_: number, idx: number) => idx % 4 === 3 && imageData.data[idx] < 255
          );
          if (hasAlpha) {
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(img, 0, 0);
          }
        }

        const qualityArg = outputFormat === 'image/png' ? undefined : quality;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === item.id
                    ? {
                        ...f,
                        convertedUrl: url,
                        convertedBlob: blob,
                        convertedSize: blob.size,
                        status: 'done' as const,
                      }
                    : f
                )
              );
            } else {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === item.id
                    ? { ...f, status: 'error' as const, errorMsg: '转换失败，浏览器不支持该格式输出' }
                    : f
                )
              );
            }
          },
          outputFormat,
          qualityArg
        );
      };
      img.onerror = () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: 'error' as const, errorMsg: '图片加载失败，文件可能已损坏' }
              : f
          )
        );
      };
      img.src = item.originalUrl;
    },
    [outputFormat, quality]
  );

  const convertAll = useCallback(() => {
    files.forEach((item) => {
      if (item.status === 'idle' || item.status === 'error') {
        convertFile(item);
      }
    });
  }, [files, convertFile]);

  const downloadFile = useCallback((item: FileItem) => {
    if (!item.convertedUrl) return;
    const origName = item.file.name.replace(/\.[^.]+$/, '');
    const ext = getFileExtension(outputFormat);
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = `${origName}_converted.${ext}`;
    a.click();
  }, [outputFormat]);

  const downloadAll = useCallback(() => {
    files.forEach((item) => {
      if (item.status === 'done' && item.convertedUrl) {
        setTimeout(() => downloadFile(item), 100);
      }
    });
  }, [files, downloadFile]);

  const pendingCount = files.filter((f) => f.status === 'idle' || f.status === 'error').length;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const totalConvertedSize = files.reduce((sum, f) => sum + f.convertedSize, 0);

  return (
    <div className="tool-container">
      <h1 className="tool-title">{'图片格式转换器'}</h1>
      <p className="tool-subtitle">{'免费在线图片格式转换，PNG / JPG / WebP 互转，纯浏览器端处理，安全快捷'}</p>

      <AdBanner className="mb-8" />

      <div className="max-w-lg mx-auto space-y-4">
        {/* Upload Area */}
        <div className="card">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-red-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
            <p className="text-4xl mb-3">{'🖼️'}</p>
            <p className="text-gray-500 font-medium">{'点击或拖拽图片到此处'}</p>
            <p className="text-xs text-gray-400 mt-1">{'支持 JPEG / PNG / WebP，可批量上传'}</p>
          </div>

          {/* Output Format Selector */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{'输出格式'}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['image/png', 'image/jpeg', 'image/webp'] as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setOutputFormat(fmt)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                    outputFormat === fmt
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {getFormatLabel(fmt)}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider (not for PNG) */}
          {outputFormat !== 'image/png' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {'输出质量'}: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={Math.round(quality * 100)}
                onChange={(e) => setQuality(Number(e.target.value) / 100)}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{'小文件'}</span>
                <span>{'高质量'}</span>
              </div>
            </div>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                {'已添加'} {files.length} {'个文件'}
                {doneCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-green-600">
                    ({doneCount} {'个已完成'})
                  </span>
                )}
              </h3>
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                {'清空全部'}
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={item.convertedUrl || item.originalUrl}
                      alt={item.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate" title={item.file.name}>
                      {item.file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatSize(item.file.size)}
                      {item.status === 'done' && item.convertedSize > 0 && (
                        <span className="ml-2 text-green-500">
                          {'→'} {formatSize(item.convertedSize)}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Actions / Status */}
                  <div className="flex-shrink-0">
                    {item.status === 'idle' && (
                      <button
                        onClick={() => convertFile(item)}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        {'转换'}
                      </button>
                    )}
                    {item.status === 'converting' && (
                      <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {'转换中...'}
                      </span>
                    )}
                    {item.status === 'done' && (
                      <button
                        onClick={() => downloadFile(item)}
                        className="btn-secondary text-xs py-1.5 px-3"
                      >
                        {'下载'}
                      </button>
                    )}
                    {item.status === 'error' && (
                      <span className="text-xs text-red-500" title={item.errorMsg}>
                        {'转换失败'}
                      </span>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(item.id)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 text-sm transition-colors"
                    title={'移除'}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            {/* Batch Actions */}
            {files.length > 0 && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                {pendingCount > 0 && (
                  <button onClick={convertAll} className="btn-primary flex-1 text-sm">
                    {'一键转换'} ({pendingCount})
                  </button>
                )}
                {doneCount > 0 && (
                  <button onClick={downloadAll} className="btn-secondary flex-1 text-sm">
                    {'一键下载'} ({doneCount})
                  </button>
                )}
              </div>
            )}

            {/* Total summary */}
            {doneCount > 0 && totalConvertedSize > 0 && (
              <p className="text-center text-xs text-gray-400 mt-3">
                {'转换完成'} {doneCount}/{files.length} {'个文件'}
              </p>
            )}
          </div>
        )}

        {/* Info card */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-2">{'格式转换说明'}</h3>
          <ul className="text-sm text-gray-500 space-y-1.5">
            <li><strong className="text-gray-700">PNG</strong> {'— 无损格式，支持透明背景，适合图标和截图'}</li>
            <li><strong className="text-gray-700">JPG</strong> {'— 有损压缩，文件体积小，适合照片和复杂图像'}</li>
            <li><strong className="text-gray-700">WebP</strong> {'— 现代格式，兼顾无损/有损，体积更小'}</li>
            <li className="text-green-600 mt-2 text-xs">
              {'所有转换均在浏览器本地完成，不会上传到服务器，请放心使用'}
            </li>
          </ul>
        </div>
      </div>

      <AdBanner className="mt-8" />
    </div>
  );
}
