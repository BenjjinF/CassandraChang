<template lang="html">
  <div>
    <b-modal
      id="cc-gallery-lightbox"
      :title="address"
      size="lg"
      img-width="1024"
      img-height="480"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #888;"
      centered
      lazy
      hide-footer
      header-bg-variant="secondary">

      <b-carousel
        id="cc-gallery-lightbox-carousel"
        controls
        indicators
        :interval="6000">

        <b-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :img-src="resizeImage(image.image, '1024x650')"
          :caption="image.caption">
        </b-carousel-slide>

      </b-carousel>

    </b-modal>

  </div>
</template>
<script>
  export default {
    props: ['images', 'address']
  }
</script>
<style lang="scss">
  .carousel.slide {
    border-radius: $border-radius;
    overflow: hidden;
  }
</style>