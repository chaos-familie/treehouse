<template>
  <TolgeeProvider>
    <UTooltipProvider>
      <UToaster>
        <UApp>
          <UContainer class="gap-4 min-h-screen flex flex-col">
              <RouterView />
          </UContainer>
        </UApp>
        </UToaster>
      </UTooltipProvider>
  </TolgeeProvider>
</template>
