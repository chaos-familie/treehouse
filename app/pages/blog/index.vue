<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
    <TransitionGroup>
      <UBlogPost
        v-for="item of data"
        :key="item.blog.id"
        :title="item.blog.title"
        :description="item.blog.description"
        :date="item.blog.date_updated"
        :to="'/blog/' + item.blog.id"
        :authors="item.authors"
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
import {
  ASSETS_URL,
  Directus,
  type Author,
  type BlogScheme,
  type CustomDirectusFile,
} from "@/directus";
import {
  readFile,
  readItems,
  readUser,
  type DirectusUser,
} from "@directus/sdk";
import { ref, TransitionGroup } from "vue";

const data = ref<
  {
    blog: BlogScheme;
    image: CustomDirectusFile;
    authors: Author;
  }[]
>([]);

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
    const author = await Directus.request<DirectusUser>(
      readUser(entry.user_created)
    );

    const authors: Author = [
      {
        avatar: { src: String(author.avatar) },
        name:
          author.first_name + (author.last_name ? " " + author.last_name : ""),
        target: "_self",
        to: "/m/",
      },
    ];

    if (entry.user_updated != entry.user_created) {
      const author2 = await Directus.request<DirectusUser>(
        readUser(entry.user_updated)
      );

      authors.push({
        avatar: { src: String(author2.avatar) },
        name:
          author2.first_name +
          (author2.last_name ? " " + author2.last_name : ""),
        target: "_self",
        to: "/m/",
      });
    }

    data.value.push({ blog: entry, image: image, authors: authors });
  }
}

init();
</script>
