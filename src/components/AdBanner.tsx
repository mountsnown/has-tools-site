import { getDirectAd } from '@/lib/ads'

export default function AdBanner({ className = '' }: { className?: string }) {
  const ad = getDirectAd()

  if (!ad) {
    return (
      <div className={`${className} w-full`}>
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center text-xs text-gray-300">
          广告位 — 达到流量门槛后可接入 Google AdSense
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} w-full`}>
      <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
        {/* 广告标签 */}
        <span className="absolute top-1.5 right-2 text-[10px] text-amber-400/60">
          广告
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {ad.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {ad.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {ad.contact.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1 rounded-full bg-white/80 border border-amber-200 px-2.5 py-1 text-xs"
              >
                <span className="text-gray-400">{c.label}:</span>
                <span className="text-gray-700 font-medium">{c.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
