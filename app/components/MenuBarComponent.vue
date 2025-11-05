<template>
  <UHeader>
    <template #title> Chaos Familie </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed } from "vue";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Start",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Blog",
    to: "/blog",
    active: route.path.startsWith("/blog"),
  },
  {
    label: "Stammbaum",
    to: "/family-tree",
    active: route.path.startsWith("/family-tree"),
  },
  {
    label: "Mitglieder",
    to: "/members",
    active: route.path === "/member",
  },
]);
</script>
