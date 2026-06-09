import Link from 'next/link';
import type { Tool } from '@/lib/tools';

export default function ToolCard({ tool, compact }: { tool: Tool; compact?: boolean }) {
  return (
    <Link
      href={tool.href}
      className={`group card hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col items-center text-center ${
        compact ? 'p-4 gap-1' : 'p-6'
      }`}
    >
      <span className={`${compact ? 'text-2xl' : 'text-4xl'} mb-1 group-hover:scale-110 transition-transform duration-300`}>
        {tool.icon}
      </span>
      <h3 className={`font-semibold text-gray-800 group-hover:text-red-600 transition-colors ${compact ? 'text-sm' : ''}`}>
        {tool.name}
      </h3>
      {!compact && (
        <p className="text-sm text-gray-400 leading-relaxed">
          {tool.description}
        </p>
      )}
      {tool.popular && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
          🔥 热门
        </span>
      )}
    </Link>
  );
}
