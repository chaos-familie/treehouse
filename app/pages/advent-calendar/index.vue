<script setup lang="ts">
import AdventCalendarComponent from "~/components/AdventCalendarComponent.vue";
</script>

<template>
  <TresCanvas
    alpha
    clear-color="#00000000"
    antialias
    power-preference="high-performance"
    :shadows="false"
    window-size
  >
    <AdventCalendarComponent />
  </TresCanvas>
</template>
