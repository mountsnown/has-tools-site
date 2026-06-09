import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="tool-container text-center py-20">
      <p className="text-8xl mb-6">🔮</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">页面走丢了</h1>
      <p className="text-gray-400 mb-8">
        这个页面不存在，也许它去了一个更幸运的地方...
      </p>
      <Link href="/" className="btn-primary">
        🏠 回到首页
      </Link>
    </div>
  );
}
