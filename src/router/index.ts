import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/MathDemo.vue')
    },
    {
      path: '/apps',
      name: 'apps',
      component: () => import('../views/AppsView.vue')
    },
    {
      path: '/columns',
      name: 'columns',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/columns/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/app-services',
      name: 'app-services',
      component: () => import('../views/PromotionView.vue')
    }
  ]
})

export default router
