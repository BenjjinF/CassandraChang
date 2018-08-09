<template>
  <div>
    <TheNavbar></TheNavbar>
    <nuxt/>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
  import TheNavbar from '~/components/TheNavbar/TheNavbar.vue'
  import TheFooter from '~/components/TheFooter/TheFooter.vue'

  export default {
    methods: {
      handleScroll () {
        if (process.browser) {
          this.$store.state.scroll = window.scrollY;
        }
      },
    },
    mounted () {
      if (process.browser) {
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    beforeDestroy () {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    components: {
      TheNavbar,
      TheFooter
    }
  }
</script>


<style lang="scss">
  .subpage {
    padding: $spacer;
    padding-top: $spacer + 5.15rem;
    min-height: 100vh;
    @include media-breakpoint-only(md) {
      padding: $spacer * 1.5;
      padding-top: $spacer * 1.5 + 5.15rem;
    }
    @include media-breakpoint-up(lg) {
      padding: $spacer * 3;
      padding-top: $spacer * 3 + 5.15rem;
    }
    .container {
      padding: 0;
    }
    .cc-meta {
      color: $gray-500;
      margin-bottom: $spacer;
      display: flex;
      flex-wrap: wrap;
      span {
        white-space: nowrap;
        &:not(:last-child) {
          margin-right: $spacer;
        }
        > i, > .badge {
          margin-right: $spacer/2;
        }
      }
    }
  }
</style>
