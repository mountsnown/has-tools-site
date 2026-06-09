export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p className="mb-1">
          <span className="font-bold text-gray-500">888工具站</span> — 你的免费在线工具箱
        </p>
        <p>
          © {new Date().getFullYear()} has88888888.com All Rights Reserved
        </p>
        <p className="mt-2">
          本站所有工具永久免费，无需注册，即开即用
        </p>
      </div>
    </footer>
  );
}
