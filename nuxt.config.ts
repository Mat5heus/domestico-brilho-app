// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxtjs/ionic', 'nuxt-vuefire', "@nuxtjs/i18n", 'nuxt-swiper'],

  i18n: {
    locales: [
      {
        code: 'pt',
        file: 'pt-BR.json'
      },
      {
        code: 'en',
        file: 'en-US.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'pt'

  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },

  css: [
    '~/assets/css/colors-standard.css',
    '~/assets/css/text-standard.css',
    '~/assets/css/searchBar.css',
    '~/assets/css/product.css'
  ],

  ssr: false,
  compatibilityDate: '2024-08-06',
})