// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@tresjs/nuxt"],
  css: ["~/assets/main.css"],
  app: {
    head: {
      link: [
        {
          type: "image/webp",
          href: "https://cms.chaos-familie.de/assets/65b73958-b497-4b77-b1cb-ce5971107c7c?width=64&format=webp",
          rel: "icon",
          sizes: "64x64",
        },
        {
          type: "image/png",
          href: "https://cms.chaos-familie.de/assets/65b73958-b497-4b77-b1cb-ce5971107c7c?width=64&format=png",
          rel: "icon",
          sizes: "64x64",
        },
        {
          type: "image/webp",
          href: "https://cms.chaos-familie.de/assets/65b73958-b497-4b77-b1cb-ce5971107c7c?width=32&format=webp",
          rel: "icon",
          sizes: "32x32",
        },
        {
          type: "image/png",
          href: "https://cms.chaos-familie.de/assets/65b73958-b497-4b77-b1cb-ce5971107c7c?width=32&format=png",
          rel: "icon",
          sizes: "32x32",
        },
      ],
      title: "Chaos Familie",
    },
  },
  colorMode: {
    storage: "localStorage",
    storageKey: "color-mode",
    fallback: "dark",
  },
  image: {
    provider: "directus",
    format: ["webp"],
    quality: 80,
    directus: {
      baseURL: "https://cms.chaos-familie.de/assets",
    },
  },
});
