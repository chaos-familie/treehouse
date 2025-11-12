<template>
  <div
    class="flex flex-col gap-1 max-w-full items-center text-2xl"
    style="font-weight: bold"
    v-if="data.length === 0 && !loading"
  >
    <p>Hier gibt es nichts zusehen!</p>
    <p>¯\_(ツ)_/¯</p>
  </div>

  <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
    <TransitionGroup>
      <BlogPostComponent v-for="item of data" :post="item" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Directus, type BlogScheme } from "~/directus";
import { readItems } from "@directus/sdk";
import { ref, TransitionGroup } from "vue";

const data = ref<BlogScheme[]>([]);
const loading = ref(true);

async function init() {
  loading.value = true;

  data.value = await Directus.request<BlogScheme[]>(
    readItems("blog", {
      sort: ["-date_created"],
      filter: {
        is_released: {
          _eq: true,
        },
      },
    })
  );

  loading.value = false;
}

init();
</script>
