<template lang="html">
  <div class="cc-gallery-item content" :class="{extra: additionalPhotos, empty: !image}" v-b-modal.cc-gallery-lightbox>
    <div v-if="additionalPhotos" class="additional-photos">+ {{additionalPhotos}}</div><i v-if="!additionalPhotos && image" class="fa fa-eye"></i>
    <div class="cc-gallery-image" :style="backgroundImage()"></div>
  </div>
</template>
<script>
  export default {
    props: ['image', 'additionalPhotos'],
    methods: {
      backgroundImage() {
        let img = this.image ? this.image.image : "//a.storyblok.com/f/46035/4168x4168/499870a5c3/propertydefault.png"
        return {
          backgroundImage: 'url(' + this.resizeImage(img, '250x0') + ')'
        }
      }
    }
  }
</script>
<style lang="scss">

</style>