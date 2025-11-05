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
          <NuxtImg
            :width="item.image?.width! /2"
            :height="item.image?.height! /2"
            format="webp"
            :src="item.blog.opener_image"
            provider="directus"
            v-slot="{ src, isLoaded, imgAttrs }"
            :custom="true"
          >
            <TransitionGroup :duration="2000" persisted>
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <BlurHashCanvas
                :hash="item.image?.blurhash"
                :width="item.image?.width ?? 0"
                :height="item.image?.height ?? 0"
                v-else
              />
            </TransitionGroup>
          </NuxtImg>
        </template>
      </UBlogPost>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import BlurHashCanvas from "@/components/BlurHashCanvas.vue";
import { Directus, type BlogScheme, type CustomDirectusFile } from "~/directus";
import { readFile, readItems } from "@directus/sdk";
import { ref, TransitionGroup } from "vue";

const data = ref<{ blog: BlogScheme; image: CustomDirectusFile }[]>([]);

async function init() {
  const entries = await Directus.request<BlogScheme[]>(
    readItems("blog", {
      sort: ["-date_created"],
      filter: {
        is_released: {
          _eq: true,
        },
      },
    })
  );

  for (const entry of entries) {
    const image = await Directus.request<CustomDirectusFile>(
      readFile(entry.opener_image)
    );

    data.value.push({ blog: entry, image: image });
  }
}

init();
</script>
