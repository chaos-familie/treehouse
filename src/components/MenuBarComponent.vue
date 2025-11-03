<template>
  <UHeader>
    <template #title> Chaos Familie </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>

<script lang="ts" setup>
import router from '@/router'
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Start',
    to: '/',
    active: router.currentRoute.value.path === '/',
  },
  {
    label: 'Blog',
    to: '/blog',
    active: router.currentRoute.value.path.startsWith('/blog'),
  },
  {
    label: 'Stammbaum',
    to: '/family-tree',
    active: router.currentRoute.value.path.startsWith('/family-tree'),
  },
  {
    label: 'Mitglieder',
    to: '/members',
    active: router.currentRoute.value.path === '/member',
  },
])
</script>
