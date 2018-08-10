<template lang="html">
    <b-card :img-src="image"
      :img-alt="blog.imageAltTags"
      img-top
      :title="blog.title"
      class="cc-preview"
      @click="push"
      :class="{placeholder: !blog.id}"
      >
      <p class="card-text" v-html="previewText">
      </p>
    </b-card>
</template>
<script>
  export default {
    props: ['blog', 'lazy'],
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
        this.blog.id ?  this.$router.push('blog/' + this.blog.id) : ''
      }
    },
    computed: {
      previewText() {
        return this.blog.id ? this.blog.previewText : `<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>`
      },
      image() {
        if (this.blog.image) {
          if (this.imageLoaded || !this.lazy) {
            return this.resizeImage(this.blog.image, '355x0')
          } else {
            if (this.$store.state.scroll > 100) {
              this.loaded()
              return this.resizeImage(this.blog.image, '355x0')
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss">

</style>