/**
 * 将 JSON 中以 "/" 开头的静态资源路径转换为带 BASE_URL 前缀的完整路径。
 * 用于解决 GitHub Pages 子目录部署时的资源路径偏移问题。
 *
 * 示例：
 *   assetUrl('/images/apps/icon.webp')
 *   → 本地: '/images/apps/icon.webp'
 *   → 生产: '/jinlun-blog/images/apps/icon.webp'
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  // 避免双斜杠：如果 path 已经以 base 开头则直接返回
  if (path.startsWith(base)) return path
  return `${base}${path}`
}
