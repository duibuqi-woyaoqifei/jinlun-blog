<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="layout">
    <Navbar />
    <main class="content-wrapper">
      <router-view />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2026 Lior. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<style>
#layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
}
</style>
