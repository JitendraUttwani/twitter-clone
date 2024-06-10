export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@vesp/nuxt-fontawesome','@pinia/nuxt'
  ],
  fontawesome: {
    icons: {
      solid: ['cog','ellipsis','heart','thumbs-up'],
    }
  }
})
