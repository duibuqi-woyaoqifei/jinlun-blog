<template>
  <div class="post-view" v-if="post">
    <header class="post-header">
      <router-link to="/columns" class="back-link">← 返回专栏</router-link>
      <div class="post-meta">
        <span class="post-category">{{ post.category }}</span>
        <span class="post-date">{{ post.date }}</span>
        <span class="post-author">{{ post.author }}</span>
      </div>
      <h1>{{ post.title }}</h1>
    </header>

    <article class="post-body">
      <template v-for="(block, i) in post.content" :key="i">
        <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
        <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
        <pre v-else-if="block.type === 'code'"><code>{{ block.text }}</code></pre>
      </template>
    </article>

    <footer class="post-footer">
      <router-link to="/columns" class="back-link">← 返回专栏列表</router-link>
    </footer>
  </div>

  <div class="post-loading" v-else-if="loading">
    <p>正在加载文章...</p>
  </div>

  <div class="post-error" v-else>
    <h1>文章未找到</h1>
    <p>这篇文章可能已被移除或链接有误。</p>
    <router-link to="/columns" class="back-link">返回专栏 →</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  const slug = route.params.slug as string
  try {
    const res = await fetch(`/api/v1/posts/${slug}.json`)
    if (!res.ok) throw new Error('Not found')
    post.value = await res.json()
  } catch (e) {
    console.error('Failed to load post', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.post-view {
  max-width: 780px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 4rem;
}

.back-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 2rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text);
}

.post-category {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.post-header h1 {
  font-size: 3rem;
  line-height: 1.2;
}

.post-body {
  font-size: 1.15rem;
  line-height: 1.9;
  color: var(--text);
}

.post-body h2 {
  font-size: 1.8rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-h);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.post-body p {
  margin-bottom: 1.8rem;
}

.post-body pre {
  background: var(--code-bg);
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  border: 1px solid var(--border);
}

.post-footer {
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
}

.post-loading,
.post-error {
  text-align: center;
  padding: 6rem 0;
}

.post-error h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 2rem;
  }
}
</style>
