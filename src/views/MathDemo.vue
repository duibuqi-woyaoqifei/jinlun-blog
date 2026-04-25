<template>
  <div class="docs-view">
    <header class="page-header">
      <h1>学习 <span class="gradient-text">文档</span></h1>
      <p>沉淀知识，记录成长。这里是我在不同领域的学习笔记与技术总结。</p>
    </header>

    <div class="docs-grid" v-if="docs">
      <section v-for="doc in docs" :key="doc.id" class="doc-card">
        <div class="doc-icon">{{ doc.icon }}</div>
        <div class="doc-content">
          <h2>{{ doc.name }}</h2>
          <p>{{ doc.description }}</p>
          <div class="doc-tags">
            <span v-for="tag in doc.tags" :key="tag">{{ tag }}</span>
          </div>
          <router-link :to="doc.link" class="doc-link">进入学习 →</router-link>
        </div>
      </section>
    </div>

    <div v-else-if="loading" class="loading-state">
      <p>正在加载文档...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from '../composables/useData'

const { data: docs, loading } = useData<any[]>('docs')
</script>

<style scoped>
.docs-view {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.page-header h1 {
  font-size: 3.5rem;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  margin-bottom: 6rem;
}

.doc-card {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  gap: 2rem;
  transition: all 0.3s ease;
}

.doc-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.doc-icon {
  font-size: 3.5rem;
  background: var(--accent-bg);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: var(--accent);
  flex-shrink: 0;
}

.doc-content h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: var(--text-h);
}

.doc-content p {
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.doc-tags {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.doc-tags span {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  border-radius: 6px;
  font-weight: 600;
}

.doc-link {
  font-weight: 700;
  color: var(--text-h);
  text-decoration: none;
}

.doc-link:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .doc-card {
    flex-direction: column;
    padding: 2rem;
  }
}
</style>
