<template lang="html">
    <b-card :img-src="image"
      :img-alt="blog.imageAltTags"
      img-top
      :title="blog.title"
      class="cc-preview"
      @click="$router.push('blog/' + blog.id)"
      >
      <p class="card-text">
        {{blog.previewText}}
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
      }
    },
    computed: {
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