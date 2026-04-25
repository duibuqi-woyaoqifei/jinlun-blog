<template>
  <div class="blog-view">
    <header class="page-header">
      <h1>我的 <span class="gradient-text">专栏</span></h1>
    </header>

    <div class="posts-list">
      <article v-for="post in posts" :key="post.slug" class="post-card">
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <router-link :to="'/columns/' + post.slug" class="read-more">阅读文章 →</router-link>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from '../composables/useData'

const { data: posts, loading } = useData<any[]>('posts')
</script>

<style scoped>
.blog-view {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.page-header h1 {
  font-size: 3.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #ff3be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.post-card {
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--border);
}

.post-card:last-child {
  border-bottom: none;
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 500;
}

.post-category {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.post-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.post-excerpt {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
}

.read-more {
  font-weight: 600;
  color: var(--text-h);
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: var(--accent);
}
</style>
