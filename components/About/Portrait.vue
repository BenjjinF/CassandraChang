<template lang="html">
  <b-img class="cc-portrait-about" v-if="portrait" :src="resizedPortrait"></b-img>
  <img class="cc-portrait-about" v-else src="blank.svg" alt="placeholder portrait">
</template>
<script>
  export default {
    props: ['portrait'],
    computed: {
      resizedPortrait() {
        return "https:" + this.resizeImage(this.portrait, '350x0')
      }
    }
  }
</script>
<style lang="scss">
  .cc-portrait-about {
    border-radius: $border-radius;
    width: 100%;
    height: auto;
    background-color: $gray-300;
    @include media-breakpoint-down(sm) {
      margin-bottom: $spacer;
    }
  }
</style>