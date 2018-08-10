<template lang="html">
    <b-card :img-src="image"
      :img-alt="advice.imageAltTags"
      img-top
      :id="advice.id"
      :title="advice.title"
      class="cc-preview"
      @click="push"
      :class="{placeholder: !advice.id}"
      >
      <p class="card-text" v-html="previewText">
      </p>
      <b-badge pill variant="secondary" v-if="advice.category">{{advice.category}}</b-badge>
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
      },
      push() {
        this.advice.id ?  this.$router.push(this.advice.id == 'cc-home-evaluation-card' ? 'homeEvaluation/' : 'advice/' + this.advice.id) : ''
      }
    },
    computed: {
      previewText() {
        return this.advice.id ? this.advice.previewText : `<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>`
      },
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