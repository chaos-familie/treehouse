<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="fa7-brands:github"
        color="neutral"
        variant="ghost"
        to="https://github.com/chaos-familie/treehouse"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Datenschutz',
    to: '/legal/privacy',
  },
  {
    label: 'Impressum',
    to: '/legal/impress',
  },
]
</script>
