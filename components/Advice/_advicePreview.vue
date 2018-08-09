<template lang="html">
    <b-card :img-src="image"
      :img-alt="advice.imageAltTags"
      img-top
      :id="advice.id"
      :title="advice.title"
      class="cc-preview"
      @click="$router.push(advice.id == 'cc-home-evaluation-card' ? 'homeEvaluation/' : 'advice/' + advice.id)"
      >
      <p class="card-text">
        {{advice.previewText}}
      </p>
      <b-badge pill variant="secondary">{{advice.category}}</b-badge>
    </b-card>
</template>
<script>
  export default {
    props: ['advice', 'lazy'],
    data() {
      return {
        imageLoaded: false,
      }
    },
    methods: {
      loaded() {
        this.imageLoaded = true
      }
    },
    computed: {
      image() {
        if (this.advice.image) {
          if (this.imageLoaded || !this.lazy) {
            return this.resizeImage(this.advice.image, '355x0')
          } else {
            if (this.$store.state.scroll > 100) {
              this.loaded()
              return this.resizeImage(this.advice.image, '355x0')
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss">

</style>