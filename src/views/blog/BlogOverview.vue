<template>
  <div class="grid grid-cols-3 gap-4">
    <TransitionGroup>
      <UBlogPost
        v-for="item of data"
        :key="item.blog.id"
        :title="item.blog.title"
        description="ich bin ein Test blog eintrag, der euch viele tolle dinge Zeigen und erklären möchte - ja lol ey. ich habe keine ahnung was ich schreiben soll also schreibe ich"
        :date="item.blog.date_updated"
        :to="'/blog/' + item.blog.id"
      >
        <template #header>
          <img
            :src="ASSETS_URL + item.blog.opener_image"
            :onload="() => (item.imageLoaded = true)"
            :style="{ display: item.imageLoaded ? 'unset' : 'none' }"
          />
          <BlurHashCanvas
            v-if="!item.imageLoaded"
            :hash="item.image?.metadata?.hash"
            :width="item.image?.width ?? 0"
            :height="item.image?.height ?? 0"
          />
        </template>
      </UBlogPost>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import BlurHashCanvas from '@/components/BlurHashCanvas.vue'
import { ASSETS_URL, Directus, type BlogScheme } from '@/plugins/directus'
import { readFile, readItems, type DirectusFile } from '@directus/sdk'
import { ref } from 'vue'

const data = ref<{ blog: BlogScheme; imageLoaded: boolean; image: DirectusFile }[]>([])

async function init() {
  const entries = await Directus.request<BlogScheme[]>(
    readItems('blog', {
      sort: ['-date_created'],
      filter: {
        is_released: {
          _eq: true,
        },
      },
    }),
  )

  for (const entry of entries) {
    const image = await Directus.request<DirectusFile>(readFile(entry.opener_image))

    data.value.push({ blog: entry, imageLoaded: false, image: image })
  }
}

init()
</script>
