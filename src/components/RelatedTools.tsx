import { tools, Tool } from "@/lib/tools";
import ToolCard from "./ToolCard";

export default function RelatedTools({ currentId }: { currentId: string }) {
  const current = tools.find((t) => t.id === currentId);
  if (!current) return null;

  // 同分类工具 + 随机补充，去重后取4个
  const sameCat = tools.filter((t) => t.id !== currentId && t.category === current.category);
  const other = tools.filter((t) => t.id !== currentId && t.category !== current.category);

  const related: Tool[] = [];
  // 优先同分类的 popular 工具
  const popular = sameCat.filter((t) => t.popular);
  related.push(...popular.slice(0, 2));

  // 补充同分类
  if (related.length < 4) {
    const rest = sameCat.filter((t) => !related.includes(t));
    related.push(...rest.slice(0, 4 - related.length));
  }

  // 补充其他分类
  if (related.length < 4) {
    const rest = other.filter((t) => !related.includes(t));
    // 随机打乱取
    const shuffled = rest.sort(() => Math.random() - 0.5);
    related.push(...shuffled.slice(0, 4 - related.length));
  }

  if (related.length === 0) return null;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h3 className="text-sm font-medium text-gray-500 mb-3">🔗 相关工具推荐</h3>
      <div className="grid grid-cols-2 gap-3">
        {related.slice(0, 4).map((tool) => (
          <ToolCard key={tool.id} tool={tool} compact />
        ))}
      </div>
    </div>
  );
}
