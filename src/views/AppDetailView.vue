<template>
  <div class="app-detail-container" v-if="app">
    <!-- 背景装饰 -->
    <div class="bg-glow"></div>

    <div class="detail-card glass-morphism">
      <header class="detail-header">
        <div class="app-icon-wrapper">
          <img :src="assetUrl(app.icon)" :alt="app.name" class="app-icon" />
        </div>
        <div class="header-info">
          <h1>{{ app.name }}</h1>
          <div class="meta-tags">
            <span class="tag category">{{ app.category }}</span>
            <span class="tag version">v{{ app.version }}</span>
            <span class="tag platform">{{ app.platform }}</span>
          </div>
        </div>
      </header>

      <div class="detail-grid">
        <!-- 左侧：应用介绍 -->
        <div class="detail-main">
          <section class="info-section">
            <h2>应用简介</h2>
            <p class="description">{{ app.description }}</p>
          </section>

          <section class="info-section">
            <h2>功能亮点</h2>
            <ul class="feature-pills">
              <li v-for="f in app.features" :key="f">{{ f }}</li>
            </ul>
          </section>

        </div>

        <!-- 右侧：下载与奖励 -->
        <div class="detail-side">
          <div class="action-card">
            <div class="reward-notice" v-if="app.invite_reward_mins">
              <div class="gift-icon">🎁</div>
              <div class="reward-text">
                <strong>专属拉新奖励</strong>
                <span>下载并安装，最高可得 {{ Math.round(app.invite_reward_mins / 1440) }} 天会员</span>
              </div>
            </div>

            <button :id="'btn-download-' + app.id" @click="handleDownload" class="download-btn-premium">
              <span class="btn-content">
                <span class="main-text">立即下载安装</span>
                <span class="sub-text">安全无毒 · 官方原版</span>
              </span>
              <div class="btn-glow"></div>
            </button>

            <div class="password-tip">
              <span class="tip-icon">🔐</span>
              <span>温馨提示：云盘提取码为 <strong class="pwd">123</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-full">
    <div class="spinner"></div>
    <p>正在加载应用详情...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useData } from '../composables/useData'
import { assetUrl } from '../composables/useAsset'

const route = useRoute()
const { data: apps } = useData<any[]>('apps')
const app = computed(() => apps.value?.find(a => a.id === route.params.id))

declare const UMLink: any

const initUMLink = () => {
  if (typeof UMLink === 'undefined' || !app.value || !app.value.umlink_id) return

  UMLink.load({
    id: app.value.umlink_id,
    data: {
      invite_code: route.query.invite_code || '',
      from: 'detail_page'
    },
    selector: `#btn-download-${app.value.id}`,
    useClipboard: true,
    onready: (ctx: any) => {
      console.log('UMLink Detail Ready', ctx)
    }
  })
}

const handleDownload = () => {
  if (app.value?.link) {
    // 如果由于某种原因 U-Link 未能拦截点击（比如 SDK 还没加载完），我们手动跳转作为兜底
    setTimeout(() => {
        window.location.href = app.value.link
    }, 500)
  }
}

onMounted(() => {
  initUMLink()
})

watch(app, (newVal) => {
  if (newVal) initUMLink()
})
</script>

<style scoped>
.app-detail-container {
  min-height: 80vh;
  padding: 4rem 1rem;
  position: relative;
}

.bg-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--accent-bg) 0%, transparent 70%);
  filter: blur(80px);
  z-index: -1;
  opacity: 0.4;
}

.detail-card {
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 32px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.app-icon-wrapper {
  width: 120px;
  height: 120px;
  background: #1a1a1a;
  border-radius: 28px;
  padding: 10px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.app-icon {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.header-info h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.meta-tags {
  display: flex;
  gap: 1rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(255,255,255,0.05);
}

.category { color: var(--accent); }
.version { color: #888; }
.platform { color: #42b883; }

.detail-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
}

.info-section {
  margin-bottom: 3rem;
}

.info-section h2 {
  font-size: 1.2rem;
  color: var(--text-h);
  margin-bottom: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text);
}

.feature-pills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.feature-pills li {
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
}

.update-box {
  background: #000;
  padding: 1.5rem;
  border-radius: 12px;
  font-family: monospace;
  font-size: 0.9rem;
  color: #aaa;
  white-space: pre-wrap;
}

/* 右侧侧边栏 */
.action-card {
  position: sticky;
  top: 2rem;
}

.reward-notice {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 16px;
  padding: 1.2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
}

.gift-icon { font-size: 2rem; }

.reward-text strong { display: block; font-size: 1.1rem; color: #fff; }
.reward-text span { font-size: 0.85rem; color: rgba(255,255,255,0.8); }

.download-btn-premium {
  width: 100%;
  position: relative;
  background: var(--accent);
  border: none;
  border-radius: 16px;
  padding: 1.2rem;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-bottom: 2.5rem;
}

.download-btn-premium:hover {
  transform: translateY(-5px);
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.main-text { font-size: 1.25rem; font-weight: 700; }
.sub-text { font-size: 0.8rem; opacity: 0.7; margin-top: 0.2rem; }

.btn-glow {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: transform 0.6s ease;
  transform: translateX(-100%);
}

.download-btn-premium:hover .btn-glow {
  transform: translateX(100%);
}

.rules-section h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #888;
}

.rules-content {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #666;
  white-space: pre-wrap;
  background: rgba(0,0,0,0.1);
  padding: 1rem;
  border-radius: 8px;
}

.password-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 0.9rem;
}

.tip-icon {
  font-size: 1.1rem;
}

.pwd {
  color: var(--accent);
  font-family: monospace;
  font-size: 1.1rem;
  margin-left: 0.2rem;
}

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .detail-header { flex-direction: column; text-align: center; }
  .detail-card { padding: 1.5rem; }
}


.loading-full {
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
