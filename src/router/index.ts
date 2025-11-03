import BlogOverview from '@/views/blog/BlogOverviewView.vue'
import BlogPage from '@/views/blog/BlogView.vue'
import FamilyTreeView from '@/views/FamilyTreeView.vue'
import HomeView from '@/views/HomeView.vue'
import ImpressView from '@/views/legal/ImpressView.vue'
import PrivacyView from '@/views/legal/PrivacyView.vue'
import MemberListView from '@/views/members/MemberListView.vue'
import MembersView from '@/views/members/MemberView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'start', component: HomeView },

    { path: '/blog', name: 'blog_overview', component: BlogOverview },
    { path: '/blog/:id', name: 'blog_page', component: BlogPage },

    { path: '/family-tree', name: 'family_tree', component: FamilyTreeView },
    { path: '/m/:name', name: 'member', component: MembersView },
    { path: '/members', name: 'member_list', component: MemberListView },

    { path: '/legal/privacy', name: 'privacy', component: PrivacyView },
    { path: '/legal/impress', name: 'impress', component: ImpressView },

    { path: '/:pathMatch(.*)', redirect: '/' },
  ],
})

export default router
