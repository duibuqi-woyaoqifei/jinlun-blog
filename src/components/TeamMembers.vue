<template>
  <div class="team-members" :class="size">
    <div v-for="member in members" :key="member.name" class="member-card">
      <div class="avatar-wrapper">
        <img :src="member.avatar" :alt="member.name" class="avatar" />
      </div>
      <div class="member-info">
        <h3 class="name">{{ member.name }}</h3>
        <p class="title">{{ member.title }}</p>
        <div class="links">
          <a 
            v-for="link in member.links" 
            :key="link.link" 
            :href="formatLink(link.icon, link.link)" 
            target="_blank" 
            class="link-icon"
            :title="link.icon"
          >
            <component :is="getIcon(link.icon)" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, Twitter, Globe, Linkedin, Mail } from 'lucide-vue-next'

defineProps<{
  members: Array<{
    avatar: string
    name: string
    title: string
    links: Array<{ icon: string; link: string }>
  }>
  size?: 'small' | 'medium'
}>()

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github': return Github
    case 'twitter': return Twitter
    case 'globe': return Globe
    case 'linkedin': return Linkedin
    case 'mail': return Mail
    default: return Globe
  }
}

const formatLink = (icon: string, link: string) => {
  if (icon.toLowerCase() === 'mail' && !link.startsWith('mailto:')) {
    return `mailto:${link}`
  }
  return link
}
</script>

<style scoped>
.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin: 2rem 0;
}

.team-members.small {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.member-card {
  background: rgba(var(--bg-rgb), 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.member-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.member-card:hover::before {
  opacity: 1;
}

.avatar-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; /* Organic shape */
  object-fit: cover;
  border: 4px solid var(--accent-bg);
  transition: all 0.5s ease;
}

.member-card:hover .avatar {
  border-color: var(--accent);
  border-radius: 50%;
  transform: scale(1.05);
}

.name {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: var(--text-h);
}

.title {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.links {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}

.link-icon {
  background: var(--social-bg);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--text);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.link-icon:hover {
  color: var(--accent);
  background: var(--accent-bg);
  border-color: var(--accent-border);
  transform: translateY(-3px);
}

@media (max-width: 640px) {
  .team-members {
    grid-template-columns: 1fr;
  }
}
</style>
