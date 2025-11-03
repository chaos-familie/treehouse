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

img {
  border-radius: 12px;
}
</style>

<template>
  <div v-if="isLoading" class="felx flex-col self-center">
    <div class="flex flex-row items-center gap-3">
      <UIcon name="svg-spinners:ring-resize" class="size-12" />
      <h3>Loading...</h3>
    </div>
  </div>
  <div v-if="!isLoading">
    <img :src="ASSETS_URL + data!.opener_image" />
    <h1>{{ data!.title }}</h1>
    <div v-html="data!.post"></div>
  </div>
</template>

<script setup lang="ts">
import { ASSETS_URL, Directus, type BlogScheme, type DirectusRestError } from '@/plugins/directus'
import router from '@/router'
import { readItem } from '@directus/sdk'
import { ref } from 'vue'

const isLoading = ref(true)
const data = ref<BlogScheme>()

async function init() {
  try {
    data.value = await Directus.request<BlogScheme>(
      readItem('blog', Number(router.currentRoute.value.params['id'])),
    )

    isLoading.value = false
  } catch (err) {
    const error = err as DirectusRestError

    console.error(error)
  }
}

init()
</script>
