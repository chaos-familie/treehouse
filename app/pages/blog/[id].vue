<style scoped>
img,
canvas {
  border-radius: 12px;
}
</style>

<template>
  <LoadingComponent v-if="isLoading" />
  <Transition>
    <div v-if="!isLoading">
      <NuxtImg
        format="webp"
        :src="openerImage?.filename_disk!"
        provider="directus"
        v-slot="{ src, isLoaded, imgAttrs }"
        :custom="true"
      >
        <TransitionGroup :duration="2000" persisted>
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

          <BlurHashCanvas
            :hash="openerImage!.blurhash"
            :width="openerImage!.width ?? 0"
            :height="openerImage!.height ?? 0"
            v-else
          />
        </TransitionGroup>
      </NuxtImg>

      <h1>{{ data!.title }}</h1>
      <div v-html="data!.post"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import BlurHashCanvas from "@/components/BlurHashCanvas.vue";
import {
  Directus,
  type BlogScheme,
  type CustomDirectusFile,
  type DirectusRestError,
} from "~/directus";
import { readFile, readItem } from "@directus/sdk";
import { ref } from "vue";

const route = useRoute();
const isLoading = ref(true);
const data = ref<BlogScheme>();
const openerImage = ref<CustomDirectusFile>();

async function init() {
  try {
    data.value = await Directus.request<BlogScheme>(
      readItem("blog", Number(route.params["id"]))
    );

    openerImage.value = await Directus.request<CustomDirectusFile>(
      readFile(data.value.opener_image)
    );

    isLoading.value = false;
  } catch (err) {
    const error = err as DirectusRestError;

    console.error(error);
  }
}

init();
</script>
