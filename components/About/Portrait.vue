<template lang="html">
  <b-img class="cc-portrait-about" :src="resizedPortrait"></b-img>
</template>
<script>
  export default {
    props: ['portrait'],
    data() {
      return {
        resizedPortrait: "https:" + this.resizeImage(this.portrait, '350x0')
      }
    }
  }
</script>
<style lang="scss">
  .cc-portrait-about {
    border-radius: $border-radius;
    width: 100%;
    height: auto;
    @include media-breakpoint-down(sm) {
      margin-bottom: $spacer;
    }
  }
</style>