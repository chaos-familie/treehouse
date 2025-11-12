<template>
  <div class="grid grid-cols-2 grid-rows-3 gap-4">
    <div class="col-span-2">
      <p class="text-center">Startseite ist WIP</p>
      <NuxtImg provider="directus" format="webp" src=""></NuxtImg>
    </div>
    <div class="row-start-2">
      <UCard variant="subtle">
        <template #header>
          <h3 style="margin: 0">Letzer Blog Beitrag</h3>
        </template>

        <BlogPostComponent :post="lastBlog" v-if="lastBlog" />
      </UCard>
    </div>
    <div class="row-start-2">
      <div class="row-start-2">
        <UCard variant="subtle">
          <template #header>
            <h3 style="margin: 0">Letztes YouTube Video</h3>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { readItems } from "@directus/sdk";
import BlogPostComponent from "~/components/BlogPostComponent.vue";
import { Directus, type BlogScheme } from "~/directus";

const lastBlog = ref<BlogScheme>();

async function init() {
  const entries = await Directus.request<BlogScheme[]>(
    readItems("blog", {
      sort: ["-date_created"],
      limit: 1,
      filter: {
        is_released: {
          _eq: true,
        },
      },
    })
  );

  lastBlog.value = entries[0];
}

init();
</script>
