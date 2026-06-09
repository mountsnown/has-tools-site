'use client';

import { useState } from 'react';

export default function ShareButton({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = { title, text, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // fallback to copy
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${title}\n${text}\n${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="btn-primary gap-2"
    >
      {copied ? '✅ 已复制' : '📤 分享给朋友'}
    </button>
  );
}
