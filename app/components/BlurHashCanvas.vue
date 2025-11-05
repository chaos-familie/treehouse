<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script setup lang="ts">
import { decode } from "blurhash";

const props = defineProps({
  hash: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 32,
  },
  height: {
    type: Number,
    default: 32,
  },
});

const canvas = ref();

const drawBlurhash = () => {
  if (!canvas.value) return;

  const pixels = decode(props.hash, props.width, props.height);

  const ctx = canvas.value.getContext("2d");

  if (ctx) {
    const imageData = ctx.createImageData(props.width, props.height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
  }
};

onMounted(() => {
  drawBlurhash();
});
</script>

<style scoped>
canvas {
  width: 100%;
  object-fit: cover;
  display: block;
}
</style>
