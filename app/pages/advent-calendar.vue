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

  <UModal
    :open="isOpen"
    :dismissible="false"
    :fullscreen="data.video !== null || data.image !== null"
  >
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
          class="rounded-lg"
          style="width: 50%"
          controls
          controlslist="nodownload noremoteplayback"
          playsinline
          v-if="data.video"
        />

        <p v-else-if="data.text" class="text-center">
          {{ data.text }}
        </p>

        <NuxtImg
          v-if="data.image"
          :src="data.image"
          class="rounded-lg w-96"
          format="webp"
        />

        <iframe
          v-if="data.yt_link"
          :src="
            'https://www.youtube-nocookie.com/embed/' +
            data.yt_link!.split('watch?v=')[1] +'?vq=hd1080&modestbranding=1&rel=0'
          "
          frameborder="0"
          allowfullscreen
          class="rounded-lg w-full"
        ></iframe>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import AdventCalendarComponent from "~/components/AdventCalendarComponent.vue";

const store = useAdventStore();

const { data, isOpen } = storeToRefs(store);
</script>
