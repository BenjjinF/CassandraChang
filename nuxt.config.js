const axios = require('axios')
const credentials = require('./credentials.js')

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Cassandra Chang',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Real Estate Website' },
      { name: 'msapplication-TileColor', content: '#6e997e' },
      { name: 'theme-color', content: '#6e997e' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:500|Raleway:300,700' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1c3144' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#F56218' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/styles.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/firebase',
      ssr: false
    },
    {
      src: '~plugins/geocoderVue',
      ssr: true,
    },
    {
      src: '~plugins/googleMaps',
      ssr: false
    },
    {
      src: '~plugins/mixins',
      ssr: true
    },
    {
      src: '~plugins/moment',
      ssr: true
    },
    {
      src: '~plugins/nav',
      ssr: false
    }
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true,
    vendor: [
      'babel-polyfill',
      'marked',
      'axios'
    ]
  },
  modules: [
    ['@nuxtjs/axios'],
    ['storyblok-nuxt', 
      {
        accessToken: process.env.NODE_ENV == 'production' ? credentials.storyblok.production : credentials.storyblok.development,
        cacheProvider: 'memory',
        storyId: 46035
      }
    ],
    ['nuxt-sass-resources-loader', '~/assets/styles/1-helpers/_1-helpers.scss'],
    ['@nuxtjs/pwa', {
      onesignal: false,
      icon: false
    }],
    ['bootstrap-vue/nuxt', { css: false }],
  ],
  generate: {
    routes: async () => {

      const blogData = await axios.get(
        "https://api.storyblok.com/v1/cdn/stories?version=published&token=" + credentials.storyblok.production + "&starts_with=blog&cv=" +
          Math.floor(Date.now() / 1e3)
      )
      const blog = blogData.data.stories.map(p => p.full_slug)

      const propertiesData = await axios.get(
        "https://api.storyblok.com/v1/cdn/stories?version=published&token=" + credentials.storyblok.production + "&starts_with=properties&cv=" +
          Math.floor(Date.now() / 1e3)
      )
      const properties = propertiesData.data.stories.map(p => p.full_slug)

      const adviceData = await axios.get(
        "https://api.storyblok.com/v1/cdn/stories?version=published&token=" + credentials.storyblok.production + "&starts_with=advice&cv=" +
          Math.floor(Date.now() / 1e3)
      )
      const advice = adviceData.data.stories.map(p => p.full_slug)

      return [
        '/',
        '/blog',
        '/contact',
        '/about',
        '/homeEvaluation',
        ...blog,
        ...properties,
        ...advice
      ]
    }
  },
}
