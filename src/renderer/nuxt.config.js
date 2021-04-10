/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
require('dotenv').config()

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'vault',
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i|Rubik:300,400,500,700,900&display=swap'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/feather.css',
    '@/assets/scss/main.scss'
  ],
  loading: false,
  plugins: [
    '~plugins/i18n',
    '~plugins/v-tooltip',
    '~plugins/filters',
    '~plugins/pusher'
  ],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/moment',
      {
        defaultLocale: 'en-gb',
        locales: ['en-gb']
      }
    ],
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'en',
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            flag: 'us',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/_app.variables.scss',
      '~/assets/scss/_app.mixins.scss'
    ]
  },
  axios: {
    baseURL: 'https://openapi.nkn.org/api/v1'
  },
  build: {
    vendor: ['v-tooltip']
  }
}
