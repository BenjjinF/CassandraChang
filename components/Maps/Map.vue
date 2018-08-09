<template lang="html">
    <GmapMap
      v-if="coordinates"
      :center="coordinates"
      :zoom="14"
      :options="{
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        disableDoubleClickZoom: true
      }"
      style="">
      <GmapMarker
        :position="coordinates"
        :clickable="false"
        :draggable="false"
        @click="center=coordinates"/>
    </GmapMap>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['address'],
    data() {
      return {
        coordinates: false
      }
    },
    async mounted() {
      const geocode = await this.$geocoder.get(this.address)
      this.coordinates = {
        lat: geocode.data.results[0].geometry.location.lat,
        lng: geocode.data.results[0].geometry.location.lng
      }
    }
  }
</script>
<style lang="scss">
  .vue-map-container {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    overflow: hidden;
    height: 400px;
  }
</style>