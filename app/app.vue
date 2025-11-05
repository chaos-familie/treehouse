<template>
  <UToaster>
    <UApp>
      <UContainer class="gap-4 flex flex-col">
        <MenuBarComponent />

        <NuxtPage />

        <FooterComponent />
      </UContainer>
    </UApp>
  </UToaster>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  margin-left: 5px;
}
</style>
