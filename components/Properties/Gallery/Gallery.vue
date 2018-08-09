<template lang="html">
  <div class="cc-gallery container" v-if="images.length > 0">
    <div class="row">
      <div class="col-lg-6 cc-gallery-section primary">
        <Primary :image="images[0]" ></Primary>
      </div>
      <div class="col-lg-6 cc-gallery-section secondary" :class="{empty: images.length < 2}">
        <div class="row">
          <div class="col-6">
            <Secondary :image="images[1]" :slideIndex="1"></Secondary>
          </div>
          <div class="col-6">
            <Secondary :image="images[2]" :slideIndex="2"></Secondary>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <Secondary :image="images[3]" :slideIndex="3"></Secondary>
          </div>
          <div class="col-6">
            <Secondary :image="images[4]" :slideIndex="4" :additionalPhotos="additionalPhotos"></Secondary>
          </div>
        </div>
      </div>
    </div>
    <Lightbox :images="images" :address="address"></Lightbox>
  </div>
</template>
<script>
  import Primary from '~/components/Properties/Gallery/_primary.vue'
  import Secondary from '~/components/Properties/Gallery/_secondary.vue'
  import Lightbox from '~/components/Properties/Gallery/Lightbox.vue'

  export default {
    props: ['images', 'address'],
    computed: {
      additionalPhotos() {
        let additionalPhotos = this.images.length - 5
        if (additionalPhotos > 0 ) {
          return additionalPhotos
        } else {
          return false
        }
      }
    },
    components: {
      Primary,
      Secondary,
      Lightbox
    }
  }
</script>
<style lang="scss">

.cc-gallery.container {

  $primary-height-sm-down: $grid-gutter-width * 9;
  $primary-height-md-up: $grid-gutter-width * 13;
  $secondary-height-sm-down: ($primary-height-sm-down - $grid-gutter-width)/2;
  $secondary-height-md-up: ($primary-height-md-up - $grid-gutter-width)/2;
  padding: 0;
  
  .cc-gallery-section {

    &.primary {
      .cc-gallery-item {
        height: $primary-height-sm-down;
        margin-bottom: $grid-gutter-width;
        @include media-breakpoint-up(md) {
          height: $primary-height-md-up;
        }
        @include media-breakpoint-up(lg) {
          margin-bottom: 0;
        }
      }
    }
    &.secondary {
      
      .cc-gallery-item {
        height: $secondary-height-sm-down;
        @include media-breakpoint-up(md) {
          height: $secondary-height-md-up;
        }
      }
      .row:first-child {
        margin-bottom: $grid-gutter-width;
      }
      @include media-breakpoint-down(md) {
        &.empty {
          display: none;
        }
      }
    }
  
    .cc-gallery-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $border-radius;
      overflow: hidden;
      i, .additional-photos {
        position: absolute;
        font-size: $grid-gutter-width *1.5;
        z-index: 1;
      }

      &.content {
        background-color: $orange;
        cursor: pointer;
        * {
          transition: 0.75s;
        }
        i, .additional-photos {
          color: transparent;
        }
        .cc-gallery-image {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          height: 100%;
          width: 100%;
        }
        &:not(.empty):hover {
          i {
            color: $yellow;
          }
          .cc-gallery-image {
            opacity: .3;
          }
        }
      }
      &.empty {
        cursor: default;
      }
      &.extra {
        .cc-gallery-image {
          opacity: .3;
        }
        .additional-photos {
          color: $yellow;
        }
        &:hover {
          i {
            color: $yellow;
          }
          .cc-gallery-image {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>