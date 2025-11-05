<style>
h1 {
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
}

h2 {
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
}

h3 {
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
}

h4 {
  font-size: 1em;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
}

h5 {
  font-size: 0.83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
}

h6 {
  font-size: 0.67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  display: block;
}

img,
canvas {
  border-radius: 12px;
}
</style>

<template>
  <div v-if="isLoading" class="flex flex-col self-center">
    <div class="flex flex-row items-center gap-3">
      <UIcon name="svg-spinners:ring-resize" class="size-12" />
      <h3>Lade...</h3>
    </div>
  </div>
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
const openerLoading = ref(true);
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
