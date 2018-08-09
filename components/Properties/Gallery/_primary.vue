<template lang="html">
  <div class="cc-gallery-item content" v-b-modal.cc-gallery-lightbox>
    <i class="fa fa-eye"></i>
    <div class="cc-gallery-image" :style="backgroundImage(image.image)"></div>
  </div>
</template>
<script>
  export default {
    props: ['image'],
    methods: {
      backgroundImage(image) {
        return {
          backgroundImage: 'url(' + this.resizeImage(image, '720x0') + ')'
        }
      }
    }
  }
</script>
<style lang="scss">

</style>