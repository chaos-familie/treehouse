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

          <iframe
            v-if="lastVideo != ''"
            :src="
              'https://www.youtube-nocookie.com/embed/' +
              lastVideo +
              '?vq=hd1080&modestbranding=1&rel=0'
            "
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
            class="rounded-lg"
          ></iframe>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { readItem, readItems } from "@directus/sdk";
import BlogPostComponent from "~/components/BlogPostComponent.vue";
import { Directus, type BlogScheme } from "~/directus";

const lastBlog = ref<BlogScheme>();
const lastVideo = ref<string>("");

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

  const lastVideoReq = await Directus.request<{ video_id: string }>(
    readItem("last_youtube_video", 0)
  );

  lastVideo.value = lastVideoReq.video_id;
  lastBlog.value = entries[0];
}

init();
</script>
