// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui"],
  css: ["~/assets/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    viewTransition: "always",
    head: {
      link: [
        {
          type: "image/png",
          href: "/favicon.png",
          rel: "icon",
          sizes: "64x64",
        },
      ],
      title: "Chaos Familie",
    },
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
