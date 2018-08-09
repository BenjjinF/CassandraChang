import Vue from 'vue'
import axios from 'axios'
const credentials = require('../credentials.js')

const GeocoderVue = {
  install (Vue, options) {
    const geocoder = { 
      apiKey: options.apiKey,
        get (address) {
        const encodedAddress = encodeURI(address)
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=' + this.apiKey
        return axios.get(url)
      }
    }
    Vue.$geocoder = Vue.prototype.$geocoder = geocoder
  }
}

Vue.use(GeocoderVue, {
  apiKey: credentials.googleMaps.apiKey
})

export default GeocoderVue
