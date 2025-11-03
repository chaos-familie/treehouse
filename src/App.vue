<script setup lang="ts">
import FooterComponent from './components/FooterComponent.vue'
import MenuBarComponent from './components/MenuBarComponent.vue'
</script>

<template>
  <UToaster>
    <UApp>
      <UContainer class="gap-4 flex flex-col">
        <MenuBarComponent />

        <RouterView />

        <FooterComponent />
      </UContainer>
    </UApp>
  </UToaster>
</template>
