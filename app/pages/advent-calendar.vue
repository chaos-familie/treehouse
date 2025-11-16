<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import AdventCalendarComponent from "~/components/AdventCalendarComponent.vue";
</script>

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
</template>
