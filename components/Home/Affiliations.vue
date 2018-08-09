<template lang="html">
  <div class="cc-affiliations">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="cc-affiliations-logos">
            <b-img v-for="(logo, index) in logos" v-if="load && logo" :key="index" :src="resizeImage(logo.image, '0x100')"></b-img>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
  export default {
    props: ['logos'],
    data() {
      return {
        imagesLoaded: false
      }
    },
    methods: {
      loaded() {
        this.imagesLoaded = true
      }
    },
    computed: {
      load() {
          if (this.imagesLoaded) {
            return true
          } else {
            if (this.$store.state.scroll > 100) {
              this.loaded()
              true
            } else {
              return false
            }
          }
      }
    }
  }
</script>
<style lang="scss">
  .cc-affiliations {
    background-color: $yellow;
    padding: $spacer;
    .cc-affiliations-logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      @include media-breakpoint-only(xs) {
        flex-direction: column;
        justify-content: center;
      }
      img {
        opacity: .5;
        margin: $spacer 0;
      }
      
    }
  }
</style>