<template>
  <UBlogPost
    v-if="data"
    :title="data!.blog.title"
    :description="data!.blog.description"
    :date="data!.blog.date_updated"
    :to="'/blog/' + data!.blog.id"
    :authors="data!.authors"
  >
    <template #header>
      <NuxtImg
        :width="data!.image?.width! /2"
        :height="data!.image?.height! /2"
        format="webp"
        :src="data!.blog.opener_image"
        provider="directus"
        v-slot="{ src, isLoaded, imgAttrs }"
        :custom="true"
      >
        <TransitionGroup :duration="2000" persisted>
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

          <BlurHashCanvas
            :hash="data!.image?.blurhash"
            :width="data!.image?.width ?? 0"
            :height="data!.image?.height ?? 0"
            v-else
          />
        </TransitionGroup>
      </NuxtImg>
    </template>
  </UBlogPost>
</template>

<script setup lang="ts">
import BlurHashCanvas from "@/components/BlurHashCanvas.vue";
import { readFile, readUser } from "@directus/sdk";
import {
  Directus,
  type Author,
  type BlogPost,
  type CustomDirectusFile,
  type CustomDirectusUser,
} from "~/directus";

const data = ref<BlogPost>();
const { post } = defineProps(["post"]);

async function init() {
  const image = await Directus.request<CustomDirectusFile>(
    readFile(post!.opener_image)
  );
  const author = await Directus.request<CustomDirectusUser>(
    readUser(post!.user_created)
  );

  const authors: Author = [
    {
      avatar: { src: String(author.avatar) },
      name:
        author.first_name + (author.last_name ? " " + author.last_name : ""),
      target: "_self",
      to: "/m/" + author.member_id,
    },
  ];
  /*
  if (post!.user_updated != post!.user_created) {
    const author2 = await Directus.request<CustomDirectusUser>(
      readUser(post!.user_updated)
    );

    authors.push({
      avatar: { src: String(author2.avatar) },
      name:
        author2.first_name + (author2.last_name ? " " + author2.last_name : ""),
      target: "_self",
      to: "/m/" + author2.member_id,
    });
  }*/

  data.value = { blog: post!, image: image, authors: authors };
}

init();
</script>
