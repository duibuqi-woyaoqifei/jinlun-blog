<template>
  <div class="about-view">
    <div class="background-decor">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <header class="page-header">
      <div class="header-content">
        <h1>关于 <span class="gradient-text">我</span></h1>
        <p class="tagline">学习 | 创作 | 思考</p>
      </div>
      <div class="header-illustration">
        <img src="/about_page_illustration.png" alt="Illustration" class="hero-img" />
      </div>
    </header>

    <section class="bio-section">
      <div class="card bio-card">
        <div class="quote-icon">“</div>
        <p>
          拿起你的武器，捍卫你的权利。
        </p>
      </div>
    </section>

    <section class="team-section">
      <h2 class="section-title">核心团队</h2>
      <TeamMembers :members="members" size="medium" />
    </section>

    <section class="contact-section">
      <h2 class="section-title">保持联系</h2>
      <div class="contact-grid">
        <a href="https://github.com/duibuqi-woyaoqifei" target="_blank" class="contact-card">
          <div class="contact-icon github">
            <Github :size="32" />
          </div>
          <div class="contact-info">
            <h3>GitHub</h3>
            <p>@duibuqi-woyaoqifei</p>
          </div>
        </a>
        <a href="mailto:827752284@qq.com" class="contact-card">
          <div class="contact-icon email">
            <Mail :size="32" />
          </div>
          <div class="contact-info">
            <h3>Email</h3>
            <p>827752284@qq.com</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TeamMembers from '../components/TeamMembers.vue'
import { Github, Mail } from 'lucide-vue-next'

const members = [
  {
    avatar: 'https://www.github.com/duibuqi-woyaoqifei.png',
    name: 'Lior',
    title: '创始人 & 开发者',
    links: [
      { icon: 'github', link: 'https://github.com/duibuqi-woyaoqifei' },
      { icon: 'mail', link: '827752284@qq.com' }
    ]
  }
]
</script>

<style scoped>
.about-view {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;
}

/* Background Decorations */
.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: var(--accent);
  top: -100px;
  right: -100px;
}

.blob-2 {
  width: 300px;
  height: 300px;
  background: #3b82f6;
  bottom: 20%;
  left: -100px;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 6rem;
}

.header-content {
  flex: 1;
}

.page-header h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.tagline {
  font-size: 1.5rem;
  color: var(--text);
  font-style: italic;
  opacity: 0.8;
}

.header-illustration {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(var(--accent-rgb), 0.2));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

/* Bio Section */
.bio-section {
  margin-bottom: 8rem;
}

.card {
  background: rgba(var(--bg-rgb), 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 4rem;
  position: relative;
}

.bio-card {
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--text);
}

.quote-icon {
  font-size: 8rem;
  position: absolute;
  top: -2rem;
  left: 2rem;
  opacity: 0.05;
  font-family: serif;
}

.bio-card p {
  margin-bottom: 2rem;
}

.bio-card p:last-child {
  margin-bottom: 0;
}

/* Team Section */
.team-section {
  margin-bottom: 8rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
}

/* Contact Section */
.contact-section {
  margin-bottom: 4rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: scale(1.02);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.contact-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: white;
}

.contact-icon.github {
  background: #333;
}

.contact-icon.email {
  background: var(--accent);
}

.contact-info h3 {
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
}

.contact-info p {
  color: var(--text);
  font-size: 1.1rem;
}

@media (max-width: 968px) {
  .page-header {
    flex-direction: column;
    text-align: center;
  }

  .page-header h1 {
    font-size: 3.5rem;
  }

  .card {
    padding: 2rem;
  }
}
</style>
