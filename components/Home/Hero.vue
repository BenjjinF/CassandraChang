<template lang="html">
  <div class="cc-hero" :style="{backgroundImage: 'url(//img2.storyblok.com/1000x0/f/46035/2830x1853/431f99e307/home_optomized.jpg)'}">
    <div class="cc-hero-overlay">
      <div class="cc-hero-content" :class="{hide: !displayContent}">
        <img class="cc-hero-logo" src="~static/cassandra_chang_logo_white.svg" alt="Cassandra Chang">
        <div class="cc-hero-slogan">
          <p class="text-green text-center">
            <strong>
              <i class="fa fa-key" aria-hidden="true"></i> Cassandra Chang, your key to the right space
            </strong>
          </p>
        </div>
      </div>
      <i class="fa fa-chevron-down scroll-indicator" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
  export default {
    // props: ['heroImage', 'slogan'],
    data() {
      return {
        isMounted: false,
        done: false
      }
    },
    computed: {
      displayContent() {
        if (process.browser && this.isMounted ) {
          let scroll = this.$store.state.scroll
          if (scroll < 50) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      },
    },
    mounted() {
      this.isMounted = true
    },
  }
</script>
<style scoped lang="scss">

  @keyframes fadeIn {
    0% {
      color: $green;
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .cc-hero {
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .cc-hero-overlay {
      background-color: hsla(140, 29%, 70%, .8);
      height: 100%;
      width: 100%;
      .cc-hero-content {
        filter: none;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 1s;
        &.hide {
          opacity: 0;
        }
        .cc-hero-logo {
          width: 70%;
          max-width: 375px;
        }
        .cc-hero-slogan {
          margin-top: $spacer;
          max-width: 80%;
          background-color: $white;
          border-radius: $border-radius;
          // mix-blend-mode: screen; //this breaks on opacity transitions
          p {
            color:$green;
            margin: $spacer/1.75;
          }
        }
      }

      @keyframes pulse {
        0% {
          opacity: 0;
        }
        50% {
          opacity: .5;
        }
        100% {
          opacity: 0;
        }
      }
      .scroll-indicator {
        animation: pulse 5s infinite;
        color: white;
        position: absolute;
        bottom: $spacer/2;
        text-align: center;
        left: 0; 
        right: 0;
        font-size: 2em;
      }
    }
  }

</style>