<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">Lior</router-link>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/docs">学习文档</router-link>
        <router-link to="/apps">应用</router-link>
        <router-link to="/columns">专栏</router-link>
        <router-link to="/about">关于</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(var(--bg-rgb), 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-h);
  background: linear-gradient(135deg, var(--accent), #ff3be0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent);
}
</style>
