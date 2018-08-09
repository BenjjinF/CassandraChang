<template lang="html">
  <div class="cc-quote-container rounded">
    <i class="fa fa-quote-left"></i>
    <p class="text-center">
      {{quote}}
    </p>
    <i class="fa fa-quote-right"></i>
  </div>
</template>
<script>
  export default {
    props: ['quote']
  }
</script>
<style scoped lang="scss">
  .cc-quote-container {
    background-color: $green;
    // height: $spacer * 7;
    color: white;
    padding: $spacer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    i {
      font-size: 1.75rem;
      @include media-breakpoint-only(md) {
        font-size: 2rem;
      }
      @include media-breakpoint-up(lg) {
        font-size: 3rem;
      }
    }
    p {
      margin: $spacer 0;
      @include media-breakpoint-up(lg) {
        font-size: 1.5em;
      }
    }
    @include media-breakpoint-up(md) {
      height: $spacer * 11.7;
    }
    .fa-quote-right {
      text-align: right;
    }
  }
</style>