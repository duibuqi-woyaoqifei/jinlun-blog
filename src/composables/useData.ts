import { ref, onMounted } from 'vue'

/**
 * 通用的 JSON 数据加载 composable。
 * 从 public/api/v1/ 下的静态 JSON 文件异步加载数据。
 * 内置内存缓存，同一数据只请求一次。
 */
const cache = new Map<string, any>()

export function useData<T>(endpoint: string) {
  const data = ref<T | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
    const url = `${baseUrl}/api/v1/${endpoint}.json`

    // 命中缓存则直接返回
    if (cache.has(url)) {
      data.value = cache.get(url)
      loading.value = false
      return
    }

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      cache.set(url, json)
      data.value = json
    } catch (e: any) {
      error.value = e.message
      console.error(`[useData] Failed to load ${url}:`, e)
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
