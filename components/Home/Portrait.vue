<template lang="html">
  <div class="rounded cc-portrait-home pb-3 pb-sm-0" :style="style"></div>
</template>
<script>
  export default {
    props: ['portrait'],
    data() {
      return {
        style: {
          backgroundImage: 'url(' + this.resizeImage(this.portrait, '350x0') + ')'
        } 
      }
    }
  }
</script>
<style lang="scss">
  .cc-portrait-home {
    height: $spacer * 15;
    background-size: cover;
    background-position: top;
    @include media-breakpoint-down(sm) {
      margin-bottom: $spacer;
    }
  }
</style>