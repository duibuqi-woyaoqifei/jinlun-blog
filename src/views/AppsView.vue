<template>
  <div class="apps-view">
    <header class="page-header">
      <h1>我的 <span class="gradient-text">应用程序</span></h1>
    </header>

    <div class="apps-container">
      <section v-for="app in apps" :key="app.name" :id="app.id" class="app-showcase">
        <div class="app-image">
          <img :src="app.icon" :alt="app.name" class="app-showcase-img" />
        </div>
        <div class="app-info">
          <div class="app-badge">{{ app.category }}</div>
          <h2>{{ app.name }}</h2>
          <p class="app-description">{{ app.description }}</p>
          <h3>功能特点</h3>
          <ul class="feature-list">
            <li v-for="feature in app.features" :key="feature">{{ feature }}</li>
          </ul>
          <div class="app-actions">
            <a :href="app.link" class="btn btn-primary">下载</a>
            <span class="backend-badge">Android</span>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useData } from '../composables/useData'

const { data: apps, loading } = useData<any[]>('apps')
</script>

<style scoped>
.apps-view {
  padding-bottom: 6rem;
}

.page-header {
  text-align: center;
  margin-bottom: 5rem;
}

.page-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #ff3be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.apps-container {
  display: flex;
  flex-direction: column;
  gap: 8rem;
}

.app-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.app-showcase:nth-child(even) {
  direction: rtl;
}

.app-showcase:nth-child(even) .app-info {
  direction: ltr;
}

.app-image {
  background: var(--code-bg);
  border-radius: 24px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.app-showcase-img {
  width: 160px;
  height: 160px;
  border-radius: 32px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.app-showcase:hover .app-showcase-img {
  transform: scale(1.05);
}

.app-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.app-info h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.app-info h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-h);
}

.app-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
}

.feature-list li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.8rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

.app-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.backend-badge {
  font-size: 0.9rem;
  color: #42b883;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.backend-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #42b883;
  border-radius: 50%;
  box-shadow: 0 0 8px #42b883;
}

.backend-services {
  margin-top: 10rem;
  background: var(--code-bg);
  padding: 6rem 4rem;
  border-radius: 32px;
  border: 1px solid var(--border);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.service-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.service-card p {
  color: var(--text);
  line-height: 1.6;
}

@media (max-width: 968px) {
  .app-showcase {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .app-showcase:nth-child(even) {
    direction: ltr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
