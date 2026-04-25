<template>
  <div class="promotion-view">
    <div class="status-badge" :class="{ 'status-ok': data }">
      {{ data ? 'API 服务正常运行' : '正在获取数据...' }}
    </div>

    <header class="promo-header">
      <h1>App <span class="gradient-text">服务中枢</span></h1>
      <p>版本: {{ data?.version || '---' }} | 最后更新: {{ data ? formatDate(data.updated_at) : '---' }}</p>
    </header>

    <div class="grid" v-if="data">
      <section class="config-section">
        <h2>应用配置</h2>
        <div class="config-card">
          <div class="config-item">
            <span>显示广告:</span>
            <span class="val">{{ data.config.show_ads ? '开启' : '关闭' }}</span>
          </div>
          <div class="config-item">
            <span>最低版本:</span>
            <span class="val">{{ data.config.min_version }}</span>
          </div>
        </div>
      </section>

      <section class="ads-section">
        <h2>当前广告</h2>
        <div v-for="ad in data.ads" :key="ad.id" class="ad-item">
          <h3>{{ ad.title }}</h3>
          <p class="url">{{ ad.action_url }}</p>
        </div>
      </section>

      <section class="affiliate-section">
        <h2>带货/合作</h2>
        <div v-for="item in data.affiliates" :key="item.id" class="aff-card">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <div class="code" v-if="item.promo_code">优惠码: {{ item.promo_code }}</div>
        </div>
      </section>
    </div>

    <div class="raw-data">
      <h3>原始 API 响应 (带宽优化版)</h3>
      <pre><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from '../composables/useData'

const { data } = useData<any>('promos')

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('zh-CN')
}
</script>

<style scoped>
.promotion-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: #ff4444;
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.status-ok {
  background: #42b883;
}

.promo-header {
  margin-bottom: 3rem;
}

.promo-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.config-card, .ad-item, .aff-card {
  background: var(--code-bg);
  border: 1px solid var(--border);
  padding: 1.5rem;
  border-radius: 12px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.val {
  color: var(--accent);
  font-weight: 700;
}

.ad-item h3, .aff-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.url {
  font-size: 0.8rem;
  color: var(--text);
  word-break: break-all;
}

.code {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 4px;
  font-family: monospace;
}

.raw-data {
  margin-top: 5rem;
  opacity: 0.5;
}

.raw-data pre {
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  overflow-x: auto;
}
</style>
