<template>
  <TresCanvas
    alpha
    :clear-alpha="0"
    antialias
    power-preference="low-power"
    :shadows="false"
    window-size
  >
    <AdventCalendarComponent />
  </TresCanvas>

  <UModal :open="isOpen" :dismissible="false" :fullscreen="data.video !== null">
    <template #title> {{ data.member }}'s Türchen </template>

    <template #close>
      <UButton
        icon="lucide:x"
        variant="link"
        color="neutral"
        @click="store.setOpen(!isOpen)"
        class="absolute top-4 end-4"
      />
    </template>

    <template #body>
      <div class="w-full h-full flex flex-col items-center justify-center">
        <video
          :src="'https://cms.chaos-familie.de/assets/' + data.video"
          class="rounded-xl"
          style="height: 80%; aspect-ratio: 16 / 9"
          controls
          controlslist="nodownload noremoteplayback"
          playsinline
          v-if="data.video"
        />

        <audio
          :src="'https://cms.chaos-familie.de/assets/' + data.audio"
          controlslist="nodownload noremoteplayback"
          controls
          v-if="data.audio"
        />

        <VueShowdown
          style="margin-top: -30px"
          :markdown="data.text"
          :options="{
            backslashEscapesHTMLTags: true,
            simpleLineBreaks: true,
          }"
          v-else-if="data.text"
        />

        <NuxtImg
          v-if="data.image"
          :src="data.image"
          class="rounded-xl w-96"
          format="webp"
        />

        <iframe
          v-if="data.yt_link"
          :src="
            'https://www.youtube-nocookie.com/embed/' +
            data.yt_link!.split('watch?v=')[1] +
            '?vq=hd1080&modestbranding=1&rel=0'
          "
          frameborder="0"
          allowfullscreen
          class="rounded-xl w-full aspect-video"
        ></iframe>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { VueShowdown } from "vue-showdown";
import AdventCalendarComponent from "~/components/AdventCalendarComponent.vue";

const store = useAdventStore();

const { data, isOpen } = storeToRefs(store);

useSeoMeta({
  title: "Adventskalendar",
  ogDescription: "Der Chaos-Familien Adventskalendar",
  ogImage:
    "http://cms.chaos-familie.de/assets/08e24028-3fac-4948-87c6-fabc44b72b7a",
  twitterCard: "summary_large_image",
});
</script>
