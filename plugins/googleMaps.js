import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { googleMaps } from '../credentials.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: googleMaps.apiKey,
    libraries: 'places'
  },
})