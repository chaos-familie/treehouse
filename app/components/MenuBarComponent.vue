<template>
  <UHeader
    mode="drawer"
    class="rounded-xl"
    :menu="{ direction: 'right', handle: false, inset: true }"
  >
    <template #title>
      <div class="flex gap-4">
        <NuxtImg
          style="width: 40px; height: 40px"
          preload
          format="webp"
          src="/65b73958-b497-4b77-b1cb-ce5971107c7c"
          provider="directus"
          :width="256"
        />

        <p class="self-center">Chaos Familie</p>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" />
    </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed } from "vue";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    icon: "lucide:house",
    label: "Start",
    to: "/",
    active: route.path === "/",
  },
  {
    icon: "lucide:calendar",
    label: "Adventskalender",
    to: "/advent-calendar",
    active: route.path === "/advent-calendar",
  },
  {
    icon: "lucide:newspaper",
    label: "Blog",
    to: "/blog",
    active: route.path.startsWith("/blog"),
  },
  {
    icon: "lucide:images",
    label: "Galerie",
    to: "/gallery",
    active: route.path.startsWith("/gallery"),
  },
  {
    icon: "lucide:tree-deciduous",
    label: "Stammbaum",
    to: "/family-tree",
    active: route.path.startsWith("/family-tree"),
  },
  {
    icon: "lucide:users",
    label: "Mitglieder",
    to: "/members",
    active: route.path === "/members" || route.path.startsWith("/m/"),
  },
]);
</script>
