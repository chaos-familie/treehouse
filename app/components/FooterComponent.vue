<style>
.footer_fixed {
  position: fixed;
  bottom: 10px;
  width: 100%;
  left: 0px;
}
</style>

<template>
  <UFooter :class="{ footer_fixed: fixed }">
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="fa7-brands:youtube"
        color="neutral"
        variant="ghost"
        to="https://youtube.com/@chaos-familie-de"
        target="_blank"
        aria-label="YouTube"
      />
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
import type { NavigationMenuItem } from "@nuxt/ui";

const fixed = ref(false);
const router = useRouter();

function checkRoute() {
  fixed.value = router.currentRoute.value.path === "/advent-calendar";
}

checkRoute();

router.afterEach(checkRoute);

const items: NavigationMenuItem[] = [
  {
    label: "Datenschutz",
    to: "/legal/privacy",
  },
  {
    label: "Impressum",
    to: "/legal/impress",
  },
];
</script>
