// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vesp/nuxt-fontawesome'],
  app: { viewTransition: { name: 'page', mode: 'out-in' } },
  experimental: {
    viewTransition: true,
  },
})
