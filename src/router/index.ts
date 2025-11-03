import BlogOverview from '@/views/blog/BlogOverview.vue'
import BlogPage from '@/views/blog/BlogPage.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'start', component: HomeView },

    { path: '/blog', name: 'blog_overview', component: BlogOverview },
    { path: '/blog/:id', name: 'blog_page', component: BlogPage },

    { path: '/:pathMatch(.*)', redirect: '/' },
  ],
})

export default router
