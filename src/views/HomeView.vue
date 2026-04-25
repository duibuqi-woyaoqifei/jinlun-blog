<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">为 <span class="gradient-text">创新思维</span> 构建工具</h1>
      <p class="hero-subtitle">
        我是 Lior，为你建立新世界。
      </p>
      <div class="hero-actions">
        <router-link to="/apps" class="btn btn-primary">探索我的应用</router-link>
        <router-link to="/columns" class="btn btn-secondary">阅读专栏</router-link>
      </div>
    </section>

    <section class="featured-docs" v-if="docs">
      <div class="section-header">
        <h2 class="section-title">知识库</h2>
        <p>系统化的学习笔记与技术方案</p>
      </div>
      <div class="docs-preview-grid">
        <router-link v-for="doc in docs" :key="doc.id" :to="doc.link" class="doc-preview-card">
          <div class="doc-preview-icon">{{ doc.icon }}</div>
          <div class="doc-preview-info">
            <h3>{{ doc.short_name }}</h3>
            <p>{{ doc.short_desc }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <section class="featured-apps" v-if="apps">
      <h2 class="section-title">精选作品</h2>
      <div class="app-grid">
        <div v-for="app in apps" :key="app.name" class="app-card">
          <img :src="app.icon" :alt="app.name" class="app-icon-img" />
          <h3>{{ app.name }}</h3>
          <p>{{ app.short_desc }}</p>
          <router-link :to="'/apps#' + app.id" class="learn-more">了解更多 →</router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useData } from '../composables/useData'

const { data: apps } = useData<any[]>('apps')
const { data: docs } = useData<any[]>('docs')
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text);
  max-width: 800px;
  margin: 0 auto 3rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--accent);
  color: white;
  box-shadow: 0 4px 14px rgba(170, 59, 255, 0.4);
}

.btn-secondary {
  background: var(--social-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.app-card {
  background: var(--code-bg);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
}

.app-icon-img {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  object-fit: cover;
}

.app-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.app-card p {
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.learn-more {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header p {
  color: var(--text);
  font-size: 1.1rem;
}

.docs-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.doc-preview-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.doc-preview-card:hover {
  border-color: var(--accent-border);
  transform: translateX(5px);
  background: var(--accent-bg);
}

.doc-preview-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  border-radius: 12px;
}

.doc-preview-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  color: var(--text-h);
}

.doc-preview-info p {
  font-size: 0.9rem;
  color: var(--text);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }
}
</style>
